-- One row per page view. visitor is a hash of IP, browser and site with a salt that only
-- lives for one day, so it counts unique visitors per day and can't follow anyone across days.
CREATE TABLE views (
  id INTEGER PRIMARY KEY,
  day TEXT NOT NULL,          -- YYYY-MM-DD, UTC
  site TEXT NOT NULL,         -- host, e.g. planary.ch
  path TEXT NOT NULL,
  ref TEXT NOT NULL DEFAULT '', -- referring host only, '' for direct or internal
  country TEXT NOT NULL DEFAULT '',
  device TEXT NOT NULL,       -- mobile | tablet | desktop
  visitor TEXT NOT NULL
);
CREATE INDEX views_site_day ON views (site, day);

-- The salt of the current day. Older ones are deleted by the daily cron.
CREATE TABLE salts (
  day TEXT PRIMARY KEY,
  salt TEXT NOT NULL
);
