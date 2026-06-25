import { and, eq, gt } from 'drizzle-orm';
import type { INonceRepository } from '../../../domain/nonce/repository/nonce.repository.js';
import { getDb } from './db.js';
import { nonces } from './schema.js';

export class PostgresNonceRepository implements INonceRepository {
  async save(walletAddress: string, nonce: string, ttlSeconds: number): Promise<void> {
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
    await getDb()
      .insert(nonces)
      .values({ walletAddress, nonce, expiresAt })
      .onConflictDoUpdate({
        target: [nonces.walletAddress, nonces.nonce],
        set: { expiresAt },
      });
  }

  async findAndDelete(walletAddress: string, nonce: string): Promise<boolean> {
    const deleted = await getDb()
      .delete(nonces)
      .where(
        and(
          eq(nonces.walletAddress, walletAddress),
          eq(nonces.nonce, nonce),
          gt(nonces.expiresAt, new Date()),
        ),
      )
      .returning({ nonce: nonces.nonce });
    return deleted.length > 0;
  }
}
