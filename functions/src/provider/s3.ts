import { TResult } from '../types';
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';

/**
 * Represents the credentials and configuration needed to authenticate
 * and connect to an AWS S3 bucket.
 */
export type TProviderCredentialsS3 = {
  /** Region */
  region: string;
  /** Bucket Name */
  bucket: string;
  /** Access Key ID */
  accessKeyId: string;
  /** Secret Access Key */
  secretAccessKey: string;
};

/**
 * Tests the connection to an S3 bucket using the provided credentials.
 *
 * @param {TProviderCredentialsS3} credentials - The credentials required to access the S3 bucket, including region,
 *                                               access key ID, secret access key, and bucket name.
 * @return {Promise<TResult<string>>} A promise that resolves with the result of the connection test, indicating
 *                                    success or failure, along with an optional error message if the connection fails.
 */
export async function testConnection(
  credentials: TProviderCredentialsS3
): Promise<TResult<string>> {
  return new Promise(async (resolve) => {
    try {
      // Create S3 client
      const client = new S3Client({
        region: credentials.region,
        credentials: {
          accessKeyId: credentials.accessKeyId,
          secretAccessKey: credentials.secretAccessKey,
        },
      });
      // Create listObjects command
      const command = new ListObjectsCommand({
        Bucket: credentials.bucket,
        MaxKeys: 1,
      });
      // Execute command
      await client.send(command);
      // Connection was successful
      resolve({
        status: 'success',
        data: undefined
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
