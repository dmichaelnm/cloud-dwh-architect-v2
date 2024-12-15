import { TFileInfo, TResult } from '../types';
import { ListObjectsCommand, S3Client } from '@aws-sdk/client-s3';
//import * as logger from 'firebase-functions/logger';

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
 * Creates and returns an instance of the S3Client configured with the provided credentials.
 *
 * @param {TProviderCredentialsS3} credentials - The credentials required to configure the S3 client, including
 *                                               access key, secret key, and region.
 * @return {S3Client} The initialized S3 client instance.
 */
function createClient(credentials: TProviderCredentialsS3): S3Client {
  // Create S3 client
  return new S3Client({
    region: credentials.region,
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    },
  });
}

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
      // Create client
      const client = createClient(credentials);
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
 * Retrieves a list of folder keys from an S3 bucket using the provided credentials.
 *
 * @param {TProviderCredentialsS3} credentials - The credentials for accessing the S3 bucket, including the region,
 *                                               accessKeyId, secretAccessKey, and bucket name.
 * @return {Promise<TResult<string[]>>} A promise that resolves with an object containing the status of the operation,
 *                                                and if successful, an array of folder keys from the specified S3 bucket.
 */
export async function getFolders(
  credentials: TProviderCredentialsS3
): Promise<TResult<string[]>> {
  return new Promise(async (resolve) => {
    try {
      // Create client
      const client = createClient(credentials);
      // Create listObjects command
      const command = new ListObjectsCommand({
        Bucket: credentials.bucket,
      });
      // Execute command
      const result = await client.send(command);
      // Create folder array
      const folders: string[] = [];
      // Get contents array
      const contents = result.Contents;
      // Check contents array
      if (contents) {
        // Iterate over content objects
        for (const content of contents) {
          // Get key
          const key = content.Key;
          // Check if key is a folder
          if (key && key.endsWith('/')) {
            folders.push(key);
          }
        }
      }
      // Return the result
      resolve({
        status: 'success',
        data: folders,
      });
    } catch (error: any) {
      // Failed to connect
      resolve({
        status: 'failure',
        code: 'unexpected-error',
        message: error.message ? error.message : error,
      });
    }
  });
}

/**
 * Retrieves a list of files from a specified path in an S3 bucket.
 *
 * @param {TProviderCredentialsS3} credentials - The credentials required to access the S3 bucket, including access keys and bucket details.
 * @param {string} path - The path or prefix within the S3 bucket to search for files.
 * @return {Promise<TResult<string[]>>} A promise resolving to a TResult object containing a list of file names on success, or failure details on error.
 */
export async function getFiles(
  credentials: TProviderCredentialsS3,
  path: string
): Promise<TResult<TFileInfo[]>> {
  return new Promise(async (resolve) => {
    try {
      // Create client
      const client = createClient(credentials);
      // Create listObjects command
      const command = new ListObjectsCommand({
        Bucket: credentials.bucket,
        Prefix: path,
      });
      // Execute the command
      const result = await client.send(command);
      // Create result array
      const files: TFileInfo[] = [];
      // Check result
      if (result.Contents) {
        // Iterate over the result
        for (const obj of result.Contents) {
          // Exclude folders
          if (obj.Key && !obj.Key?.endsWith('/')) {
            // Remove path from file
            const file = obj.Key.replace(path, '');
            // Add to result array
            files.push({
              name: file,
              size: obj.Size,
              lastModified: obj.LastModified
            });
          }
        }
      }
      // Return the result
      resolve({
        status: 'success',
        data: files,
      });
    } catch (error: any) {
      // Failed to connect
      resolve({
        status: 'failure',
        code: 'unexpected-error',
        message: error.message ? error.message : error,
      });
    }
  });
}
