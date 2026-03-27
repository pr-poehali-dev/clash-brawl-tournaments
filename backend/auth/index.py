import json
import os
import psycopg2

SCHEMA = os.environ["MAIN_DB_SCHEMA"]


def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])


def handler(event: dict, context) -> dict:
    """Регистрация и вход игроков через тег игры (CR или BS)."""
    headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Content-Type": "application/json",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": headers, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action")  # "login" | "register"
    game = body.get("game")
    tag = (body.get("tag") or "").strip().upper()
    name = (body.get("name") or "").strip()

    if not action or not game or not tag:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Заполните все поля"})}

    if game not in ("CR", "BS"):
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неверная игра"})}

    conn = get_conn()
    cur = conn.cursor()

    if action == "login":
        cur.execute(
            f"SELECT id, name, game FROM {SCHEMA}.players WHERE game = %s AND tag = %s",
            (game, tag),
        )
        row = cur.fetchone()
        cur.close()
        conn.close()
        if not row:
            return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Игрок не найден. Сначала зарегистрируйся."})}
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"id": row[0], "name": row[1], "game": row[2], "tag": tag})}

    if action == "register":
        if not name:
            return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Укажите имя на платформе"})}
        cur.execute(
            f"SELECT id FROM {SCHEMA}.players WHERE game = %s AND tag = %s",
            (game, tag),
        )
        if cur.fetchone():
            cur.close()
            conn.close()
            return {"statusCode": 409, "headers": headers, "body": json.dumps({"error": "Этот тег уже зарегистрирован"})}
        cur.execute(
            f"INSERT INTO {SCHEMA}.players (game, tag, name) VALUES (%s, %s, %s) RETURNING id",
            (game, tag, name),
        )
        new_id = cur.fetchone()[0]
        conn.commit()
        cur.close()
        conn.close()
        return {"statusCode": 200, "headers": headers, "body": json.dumps({"id": new_id, "name": name, "game": game, "tag": tag})}

    return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Неизвестное действие"})}
