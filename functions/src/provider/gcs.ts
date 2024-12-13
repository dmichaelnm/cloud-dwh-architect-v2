import { TResult } from '../types';
import { Storage } from '@google-cloud/storage';

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
  /** Bucket */
  bucket: string;
};

/**
 * Tests the connection to a Google Cloud Storage bucket using the provided credentials.
 *
 * @param {TProviderCredentialsGCS} credentials - The credentials required to access the Google Cloud Storage bucket, including client email, private key, and bucket name.
 * @return {Promise<TResult<string>>} A promise that resolves to a result object indicating the success or failure of the connection test.
 */
export async function testConnection(
  credentials: TProviderCredentialsGCS
): Promise<TResult<string>> {
  return new Promise(async (resolve) => {
    // Initialize Storage Client
    const storage = new Storage({
      credentials: {
        client_email: credentials.clientEmail,
        private_key: credentials.privateKey.replace(/\\n/g, '\n'),
      },
    });
    try {
      // Get files from bucket
      await storage.bucket(credentials.bucket).getFiles();
      // Connection was successful
      resolve({
        status: 'success',
        data: undefined,
      });
    } catch (error: any) {
      // Failed to connect
      resolve({
        status: 'failure',
        code: 'connection-failed',
        message: error.message ? error.message : error,
      });
    }
  });
}

/**
 * Retrieves a list of folder names from a specified Google Cloud Storage bucket.
 *
 * @param {TProviderCredentialsGCS} credentials - Object containing the credentials for accessing the
 *                                                Google Cloud Storage bucket. It includes the bucket name,
 *                                                client email, and private key used for authentication.
 * @return {Promise<TResult<string[]>>} A promise that resolves to an object with the status of the operation and the
 *                                      list of folder names if successful. If the operation fails, the response
 *                                      includes an error status and message.
 */
export async function getFolders(
  credentials: TProviderCredentialsGCS
): Promise<TResult<string[]>> {
  return new Promise(async (resolve) => {
    // Initialize Storage Client
    const storage = new Storage({
      credentials: {
        client_email: credentials.clientEmail,
        private_key: credentials.privateKey.replace(/\\n/g, '\n'),
      },
    });
    try {
      // Create folder array
      const folders: string[] = [];
      // Get files from bucket
      const [files] = await storage.bucket(credentials.bucket).getFiles();
      // Iterate over all files
      files.forEach((file) => {
        if (file.name.endsWith('/')) {
          folders.push(file.name);
        }
      });
      // Connection was successful
      resolve({
        status: 'success',
        data: folders,
      });
    } catch (error: any) {
      // Failed to connect
      resolve({
        status: 'failure',
        code: 'connection-failed',
        message: error.message ? error.message : error,
      });
    }
  });
}
