CREATE TABLE t_p5953386_clash_brawl_tourname.players (
    id SERIAL PRIMARY KEY,
    game VARCHAR(2) NOT NULL CHECK (game IN ('CR', 'BS')),
    tag VARCHAR(20) NOT NULL,
    name VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE (game, tag)
);