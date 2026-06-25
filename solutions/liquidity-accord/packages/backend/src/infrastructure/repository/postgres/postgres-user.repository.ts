import { eq } from 'drizzle-orm';
import type { IUserRepository } from '../../../domain/auth/repository/user.repository.js';
import { User, type WalletProvider } from '../../../domain/auth/model/user.js';
import { getDb } from './db.js';
import { users } from './schema.js';

type UserRow = typeof users.$inferSelect;

function toModel(row: UserRow): User {
  return new User({
    id: row.id,
    walletAddress: row.walletAddress,
    walletProvider: row.walletProvider as WalletProvider,
    email: row.email ?? undefined,
    createdAt: row.createdAt,
  });
}

export class PostgresUserRepository implements IUserRepository {
  async findById(id: string): Promise<User | null> {
    const rows = await getDb().select().from(users).where(eq(users.id, id)).limit(1);
    return rows[0] ? toModel(rows[0]) : null;
  }

  async findByWalletAddress(address: string): Promise<User | null> {
    const rows = await getDb()
      .select()
      .from(users)
      .where(eq(users.walletAddress, address))
      .limit(1);
    return rows[0] ? toModel(rows[0]) : null;
  }

  async save(user: User): Promise<void> {
    await getDb()
      .insert(users)
      .values({
        id: user.id,
        walletAddress: user.walletAddress,
        walletProvider: user.walletProvider,
        email: user.email ?? null,
        createdAt: user.createdAt,
      })
      .onConflictDoUpdate({
        target: users.id,
        set: {
          walletAddress: user.walletAddress,
          walletProvider: user.walletProvider,
          email: user.email ?? null,
        },
      });
  }
}
