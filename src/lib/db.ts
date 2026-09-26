import { createClient, type Client, type InArgs } from "@libsql/client";
import { randomUUID } from "crypto";

// Turso (libSQL) connection. When TURSO_URL is unset every helper below no-ops
// and reports saved: false, so the free assessment still works locally.
let client: Client | null = null;

function getClient(): Client {
  if (client) return client;
  const url = process.env.TURSO_URL;
  if (!url) throw new Error("TURSO_URL is not configured");
  client = createClient({ url, authToken: process.env.TURSO_TOKEN });
  return client;
}

async function execute(sql: string, args: InArgs = []) {
  return getClient().execute({ sql, args });
}

let schemaEnsured = false;

async function ensureSchema() {
  if (schemaEnsured) return;
  try {
    await getClient().batch(
      [
        `CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT,
          email TEXT NOT NULL,
          consent INTEGER NOT NULL,
          answers TEXT,
          source TEXT,
          created_at TEXT DEFAULT (datetime('now'))
        )`,
        `CREATE UNIQUE INDEX IF NOT EXISTS leads_session_email_idx ON leads (session_id, email)`,
        `CREATE TABLE IF NOT EXISTS answers (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT NOT NULL,
          email TEXT,
          answers TEXT NOT NULL,
          source TEXT,
          created_at TEXT DEFAULT (datetime('now'))
        )`,
        `CREATE INDEX IF NOT EXISTS answers_session_idx ON answers (session_id)`,
        `CREATE TABLE IF NOT EXISTS plan_logs (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          session_id TEXT,
          email TEXT,
          plan_html TEXT NOT NULL,
          source TEXT,
          created_at TEXT DEFAULT (datetime('now'))
        )`,
        `CREATE INDEX IF NOT EXISTS plan_logs_session_idx ON plan_logs (session_id)`,
        `CREATE TABLE IF NOT EXISTS payments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          stripe_session_id TEXT NOT NULL,
          app_session_id TEXT,
          email TEXT,
          status TEXT NOT NULL,
          insight TEXT,
          emailed_at TEXT,
          created_at TEXT DEFAULT (datetime('now'))
        )`,
        `CREATE UNIQUE INDEX IF NOT EXISTS payments_stripe_session_idx ON payments (stripe_session_id)`,
      ],
      "write"
    );
    schemaEnsured = true;
  } catch (err) {
    // If DB is not configured yet, fail gracefully. We'll no-op in save functions.
    console.warn("[db] ensureSchema skipped or failed (is Turso configured?)", err);
  }
}

export async function saveAnswers(params: {
  answers: Record<string, any>;
  sessionId?: string;
  email?: string;
  source?: string;
}): Promise<{ sessionId: string; saved: boolean }> {
  const { answers, sessionId, email, source } = params;
  const sid = sessionId || randomUUID();

  try {
    await ensureSchema();
    const answersJson = JSON.stringify(answers);
    await execute(
      `INSERT INTO answers (session_id, email, answers, source) VALUES (?, ?, ?, ?)`,
      [sid, email ?? null, answersJson, source ?? null]
    );
    return { sessionId: sid, saved: true };
  } catch (err) {
    console.warn("[db] saveAnswers fallback (no DB)", err);
    return { sessionId: sid, saved: false };
  }
}

export async function saveLead(params: {
  email: string;
  consent: boolean;
  answers?: Record<string, any>;
  sessionId?: string;
  source?: string;
}): Promise<{ sessionId: string; saved: boolean }> {
  const { email, consent, answers, sessionId, source } = params;
  const sid = sessionId || randomUUID();

  try {
    await ensureSchema();
    const answersJson = answers ? JSON.stringify(answers) : null;
    await execute(
      `INSERT INTO leads (session_id, email, consent, answers, source)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT (session_id, email)
       DO UPDATE SET
         consent = excluded.consent,
         answers = COALESCE(excluded.answers, leads.answers),
         source = COALESCE(excluded.source, leads.source),
         created_at = datetime('now')`,
      [sid, email, consent ? 1 : 0, answersJson, source ?? null]
    );
    return { sessionId: sid, saved: true };
  } catch (err) {
    console.warn("[db] saveLead fallback (no DB)", err);
    return { sessionId: sid, saved: false };
  }
}

export async function getAnswersBySessionId(sessionId: string): Promise<Record<string, any> | null> {
  try {
    await ensureSchema();
    const result = await execute(
      `SELECT answers FROM answers WHERE session_id = ? ORDER BY id DESC LIMIT 1`,
      [sessionId]
    );
    if (result.rows.length === 0) return null;
    return JSON.parse(String(result.rows[0].answers)) as Record<string, any>;
  } catch (err) {
    console.warn("[db] getAnswersBySessionId failed", err);
    return null;
  }
}

export async function savePlanLog(params: {
  email: string;
  planHtml: string;
  sessionId?: string;
  source?: string;
}): Promise<{ sessionId: string; saved: boolean }> {
  const { email, planHtml, sessionId, source } = params;
  const sid = sessionId || randomUUID();

  try {
    await ensureSchema();
    await execute(
      `INSERT INTO plan_logs (session_id, email, plan_html, source) VALUES (?, ?, ?, ?)`,
      [sid, email, planHtml, source ?? null]
    );
    return { sessionId: sid, saved: true };
  } catch (err) {
    console.warn("[db] savePlanLog fallback (no DB)", err);
    return { sessionId: sid, saved: false };
  }
}

/**
 * Idempotently records that a Stripe Checkout Session was paid.
 * Returns inserted: true only for the caller that actually created the row,
 * so callers can use that as a guard to send the plan email exactly once.
 */
export async function markPaymentPaid(params: {
  stripeSessionId: string;
  appSessionId?: string | null;
  email?: string | null;
  insight?: string | null;
}): Promise<{ inserted: boolean; saved: boolean }> {
  const { stripeSessionId, appSessionId, email, insight } = params;

  try {
    await ensureSchema();
    const result = await execute(
      `INSERT INTO payments (stripe_session_id, app_session_id, email, status, insight)
       VALUES (?, ?, ?, 'paid', ?)
       ON CONFLICT (stripe_session_id) DO NOTHING
       RETURNING id`,
      [stripeSessionId, appSessionId ?? null, email ?? null, insight ?? null]
    );
    return { inserted: result.rows.length > 0, saved: true };
  } catch (err) {
    console.warn("[db] markPaymentPaid fallback (no DB)", err);
    return { inserted: false, saved: false };
  }
}

export async function getPaymentBySessionId(stripeSessionId: string): Promise<{
  stripeSessionId: string;
  appSessionId: string | null;
  email: string | null;
  status: string;
  insight: string | null;
} | null> {
  try {
    await ensureSchema();
    const result = await execute(
      `SELECT stripe_session_id, app_session_id, email, status, insight
       FROM payments WHERE stripe_session_id = ? LIMIT 1`,
      [stripeSessionId]
    );
    if (result.rows.length === 0) return null;
    const row = result.rows[0];
    return {
      stripeSessionId: String(row.stripe_session_id),
      appSessionId: row.app_session_id == null ? null : String(row.app_session_id),
      email: row.email == null ? null : String(row.email),
      status: String(row.status),
      insight: row.insight == null ? null : String(row.insight),
    };
  } catch (err) {
    console.warn("[db] getPaymentBySessionId failed", err);
    return null;
  }
}

export async function markPaymentEmailed(stripeSessionId: string): Promise<void> {
  try {
    await ensureSchema();
    await execute(`UPDATE payments SET emailed_at = datetime('now') WHERE stripe_session_id = ?`, [stripeSessionId]);
  } catch (err) {
    console.warn("[db] markPaymentEmailed failed", err);
  }
}