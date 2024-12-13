import { TProviderCredentials } from 'src/scripts/provider/common';

/**
 * Type definition for Google Cloud Storage provider credentials.
 *
 * Represents the necessary authentication and configuration details
 * required for accessing and operating with Google Cloud Storage.
 *
 * Properties:
 * - `client_email` - The email address associated with the service account.
 * - `private_key` - The private key string for authenticating requests.
 * - `bucket` - The name of the bucket
 */
export type TProviderCredentialsGCS = {
  /** Client Email */
  clientEmail: string;
  /** Private Key */
  privateKey: string;
  /** Bucket Name */
  bucket: string;
};

/**
 * Creates and returns a Google Cloud Storage (GCS) credentials object based on the provided credentials.
 *
 * @param {TProviderCredentials} credentials - The provider credentials to be converted to GCS credentials.
 * @return {TProviderCredentialsGCS} A GCS credentials object containing the project ID, client ID, client email, private key ID, and private key.
 */
export function createCredentials(
  credentials: TProviderCredentials
): TProviderCredentialsGCS {
  // Cast to GCS credentials
  const gcs = credentials as TProviderCredentialsGCS;
  // Return GCS credentials object
  return {
    clientEmail: gcs.clientEmail,
    privateKey: gcs.privateKey,
    bucket: gcs.bucket,
  };
}
