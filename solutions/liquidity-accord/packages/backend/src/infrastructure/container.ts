import {
  MemoryNonceRepository,
  MemoryUserRepository,
  MemorySessionRepository,
  MemoryEscrowRepository,
  MemoryWithdrawalRepository,
  MemoryBusinessProfileRepository,
  MemoryApiCredentialRepository,
  MemoryEscrowEventRepository,
  MemoryEngagementRepository,
  MemoryAttestationRepository,
  MemoryMMProfileRepository,
} from './repository/memory/index.js';
import {
  PostgresNonceRepository,
  PostgresUserRepository,
  PostgresSessionRepository,
} from './repository/postgres/index.js';
import { JwtService } from './auth/jwt.service.js';
import { NonceService } from './auth/nonce.service.js';
import { SiweVerifier } from './auth/siwe-verifier.js';
import { FheService } from './fhe/fhe.service.js';
import { QuickNodeVerifier } from './webhook/quicknode-verifier.js';
import { getEnv } from '../core/config.js';

const usePostgres = getEnv().DB_PROVIDER === 'postgres';

const nonceRepo = usePostgres ? new PostgresNonceRepository() : new MemoryNonceRepository();
const userRepo = usePostgres ? new PostgresUserRepository() : new MemoryUserRepository();
const sessionRepo = usePostgres
  ? new PostgresSessionRepository()
  : new MemorySessionRepository();
const escrowRepo = new MemoryEscrowRepository();
const withdrawalRepo = new MemoryWithdrawalRepository();
const businessProfileRepo = new MemoryBusinessProfileRepository();
const apiCredentialRepo = new MemoryApiCredentialRepository();
const escrowEventRepo = new MemoryEscrowEventRepository();
const engagementRepo = new MemoryEngagementRepository();
const attestationRepo = new MemoryAttestationRepository();
const mmProfileRepo = new MemoryMMProfileRepository();

const jwtService = new JwtService();
const nonceService = new NonceService(nonceRepo);
const siweVerifier = new SiweVerifier();
const fheService = new FheService();

function getQuickNodeVerifier(): QuickNodeVerifier | null {
  const secret = getEnv().QUICKNODE_WEBHOOK_SECRET;
  return secret ? new QuickNodeVerifier(secret) : null;
}

export const container = {
  nonceRepo,
  userRepo,
  sessionRepo,
  escrowRepo,
  withdrawalRepo,
  businessProfileRepo,
  apiCredentialRepo,
  escrowEventRepo,
  engagementRepo,
  attestationRepo,
  mmProfileRepo,
  jwtService,
  nonceService,
  siweVerifier,
  fheService,
  getQuickNodeVerifier,
};
