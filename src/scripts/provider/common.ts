import { TProviderCredentialsS3 } from 'src/scripts/provider/s3';
import { TProviderCredentialsSnowflake } from 'src/scripts/provider/snowflake';

/**
 * Enumeration representing external application providers.
 */
export enum EExternalAppProvider {
  /** Amazon AWS S3 Bucket */
  S3 = 's3',
  /** Snowflake Database */
  Snowflake = 'snowflake',
}

/**
 * Enum representing different types of location sources.
 *
 * This enum is used to specify the type of location being referenced or utilized.
 *
 * Enum Members:
 *   - `file`: Represents a file storage location. This can be used in contexts where
 *     file-based storage systems are accessed or manipulated.
 *
 *   - `relational`: Represents a relational data location. Commonly used in contexts
 *     involving access or management of relational databases.
 */
export enum ELocationType {
  /** File Storage Location */
  file = 'file',
  /** Relational Data Location */
  relational = 'relational',
}

/**
 * Type definition for provider credentials.
 */
export type TProviderCredentials =
  | TProviderCredentialsS3
  | TProviderCredentialsSnowflake
  | Record<string, never>;
