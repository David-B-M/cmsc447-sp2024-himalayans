CREATE TABLE IF NOT EXISTS users (
  user_id integer NOT NULL UNIQUE AUTOINCREMENT,
  username varchar(5) NOT NULL UNIQUE,
  levelReached integer NOT NULL DEFAULT 1 CHECK (levelReached >= 1 AND levelReached <= 3), -- attempt at keeping it within 1 our number of levels
  PRIMARY KEY (id, username),
);

CREATE TABLE IF NOT EXISTS leaderboard (
  rank integer NOT NULL -- won't force unique because I guess two people could be in top place if they have the same score
  user_id integer NOT NULL UNIQUE,
  username varchar(5) NOT NULL UNIQUE,
  score integer NOT NULL, -- maybe we can just store their cumulative score across levels.
  FOREIGN KEY (user_id, username) references users
);
