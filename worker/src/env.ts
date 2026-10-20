export interface Env {
  DB: D1Database;
  /** Service binding to the planary-auth Worker, which confirms sign-in tokens. */
  AUTH: Fetcher;
  /** Accounts that may read the numbers, comma separated emails. */
  ADMIN_EMAILS?: string;
  /** Local development only: ask planary-auth over the internet instead of the service binding. */
  AUTH_API_URL?: string;
}
