DROP DATABASE IF EXISTS notification_subscription;
CREATE DATABASE notification_subscription;

DROP TABLE IF EXISTS subscriptions;

\c notification_subscription;

CREATE TABLE subscriptions (
  id SERIAL,
  endpoint TEXT,
  subscription JSON
);