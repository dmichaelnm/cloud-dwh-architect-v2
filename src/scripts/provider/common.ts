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
 * Type definition for provider credentials.
 */
export type TProviderCredentials =
  | TProviderCredentialsS3
  | TProviderCredentialsSnowflake
  | Record<string, never>;
