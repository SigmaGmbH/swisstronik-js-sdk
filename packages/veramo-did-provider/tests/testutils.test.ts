import dotenv from "dotenv"

// Core interfaces
import {
  createAgent,
  IDIDManager,
  IResolver,
  IDataStore,
  IDataStoreORM,
  IKeyManager,
  ICredentialPlugin,
} from '@veramo/core'

// Core identity manager plugin
import { DIDManager } from '@veramo/did-manager'

// DID identity provider
import { SwisstronikDIDProvider, getResolver as swisstronikResolver } from '../src'

// Core key manager plugin
import { KeyManager } from '@veramo/key-manager'

// Custom key management system for RN
import { KeyManagementSystem, SecretBox } from '@veramo/kms-local'

// W3C Verifiable Credential plugin
import { CredentialPlugin, ICredentialIssuer, ICredentialVerifier  } from '@veramo/credential-w3c'

// Custom resolvers
import { DIDResolverPlugin } from '@veramo/did-resolver'
import { Resolver } from 'did-resolver'

// Storage plugin using TypeOrm
import { Entities, KeyStore, DIDStore, PrivateKeyStore, migrations } from '@veramo/data-store'

// TypeORM is installed with `@veramo/data-store`
import { DataSource } from 'typeorm'

dotenv.config()

const DATABASE_FILE = 'database.sqlite'
const KMS_SECRET_KEY = '29739248cad1bd1a0fc4d9b75cd4d2990de535baf5caadfdf8d8f86664aa830c'
const PAYER_SEED = 'entry garbage bike poem grunt negative easily annual miss happy license blur false fringe program picture inner tape dismiss eagle include quality drill master'

const dbConnection = new DataSource({
  type: 'sqlite',
  database: DATABASE_FILE,
  synchronize: false,
  migrations,
  migrationsRun: true,
  logging: ['error', 'info', 'warn'],
  entities: Entities,
}).initialize()

export const agent = createAgent<IDIDManager & IKeyManager & IDataStore & IDataStoreORM & IResolver & ICredentialPlugin & ICredentialIssuer & ICredentialVerifier>({
  plugins: [
    new KeyManager({
      store: new KeyStore(dbConnection),
      kms: {
        local: new KeyManagementSystem(new PrivateKeyStore(dbConnection, new SecretBox(KMS_SECRET_KEY))),
      },
    }),
    new DIDManager({
      store: new DIDStore(dbConnection),
      defaultProvider: 'did:swtr',
      providers: {
        'did:swtr': new SwisstronikDIDProvider({
          defaultKms: 'local',
          cosmosPayerSeed: process.env.MNEMONIC || PAYER_SEED,
          rpcUrl: process.env.RPC_URL || "http://127.0.0.1:26657"
        }),
      },
    }),
    new DIDResolverPlugin({
      resolver: new Resolver({
        ...swisstronikResolver({url: process.env.JSON_RPC_URL || "http://127.0.0.1:8545"}),
      }),
    }),
    new CredentialPlugin(),
  ]
})