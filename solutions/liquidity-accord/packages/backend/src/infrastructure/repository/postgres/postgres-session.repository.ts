import { eq } from 'drizzle-orm';
import type { ISessionRepository } from '../../../domain/auth/repository/session.repository.js';
import { Session } from '../../../domain/auth/model/session.js';
import { getDb } from './db.js';
import { sessions } from './schema.js';

type SessionRow = typeof sessions.$inferSelect;

function toModel(row: SessionRow): Session {
  return new Session({
    id: row.id,
    userId: row.userId,
    refreshToken: row.refreshToken,
    expiresAt: row.expiresAt,
    createdAt: row.createdAt,
    userAgent: row.userAgent ?? undefined,
    ipAddress: row.ipAddress ?? undefined,
  });
}

export class PostgresSessionRepository implements ISessionRepository {
  async findById(id: string): Promise<Session | null> {
    const rows = await getDb().select().from(sessions).where(eq(sessions.id, id)).limit(1);
    return rows[0] ? toModel(rows[0]) : null;
  }

  async findByRefreshToken(token: string): Promise<Session | null> {
    const rows = await getDb()
      .select()
      .from(sessions)
      .where(eq(sessions.refreshToken, token))
      .limit(1);
    return rows[0] ? toModel(rows[0]) : null;
  }

  async findByUserId(userId: string): Promise<Session[]> {
    const rows = await getDb().select().from(sessions).where(eq(sessions.userId, userId));
    return rows.map(toModel);
  }

  async save(session: Session): Promise<void> {
    await getDb()
      .insert(sessions)
      .values({
        id: session.id,
        userId: session.userId,
        refreshToken: session.refreshToken,
        expiresAt: session.expiresAt,
        createdAt: session.createdAt,
        userAgent: session.userAgent ?? null,
        ipAddress: session.ipAddress ?? null,
      })
      .onConflictDoUpdate({
        target: sessions.id,
        set: {
          refreshToken: session.refreshToken,
          expiresAt: session.expiresAt,
          userAgent: session.userAgent ?? null,
          ipAddress: session.ipAddress ?? null,
        },
      });
  }

  async delete(id: string): Promise<void> {
    await getDb().delete(sessions).where(eq(sessions.id, id));
  }

  async deleteByUserId(userId: string): Promise<void> {
    await getDb().delete(sessions).where(eq(sessions.userId, userId));
  }
}
