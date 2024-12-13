import { TProviderCredentials } from 'src/scripts/provider/common';

/**
 * Type definition for Google Cloud Storage provider credentials.
 *
 * Represents the necessary authentication and configuration details
 * required for accessing and operating with Google Cloud Storage.
 *
 * Properties:
 * - `project_id` - The unique identifier for the GCP project.
 * - `client_id` - The ID of the client application used for authentication.
 * - `client_email` - The email address associated with the service account.
 * - `private_key_id` - Identifier for the private key associated with the service account.
 * - `private_key` - The private key string for authenticating requests.
 */
export type TProviderCredentialsGCS = {
  /** Project ID */
  projectId: string;
  /** Client ID */
  clientId: string;
  /** Client Email */
  clientEmail: string;
  /** Private Key ID */
  privateKeyId: string;
  /** Private Key */
  privateKey: string;
}

/**
 * Creates and returns a Google Cloud Storage (GCS) credentials object based on the provided credentials.
 *
 * @param {TProviderCredentials} credentials - The provider credentials to be converted to GCS credentials.
 * @return {TProviderCredentialsGCS} A GCS credentials object containing the project ID, client ID, client email, private key ID, and private key.
 */
export function createCredentials(credentials: TProviderCredentials): TProviderCredentialsGCS {
  // Cast to GCS credentials
  const gcs = credentials as TProviderCredentialsGCS;
  // Return GCS credentials object
  return {
    projectId: gcs.projectId,
    clientId: gcs.clientId,
    clientEmail: gcs.clientEmail,
    privateKeyId: gcs.privateKeyId,
    privateKey: gcs.privateKey
  };
}
