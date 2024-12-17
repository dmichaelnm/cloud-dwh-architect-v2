import { TFileInfo, TResult } from '../types';
import { Storage } from '@google-cloud/storage';
import { checkAndGetFilename } from './utilities';

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
 * Creates a client instance for Google Cloud Storage using the provided credentials.
 *
 * @param {TProviderCredentialsGCS} credentials - The credentials object containing the client email and private
 *                                                key required for authentication.
 * @return {Storage} A Google Cloud Storage client instance.
 */
function createClient(credentials: TProviderCredentialsGCS): Storage {
  return new Storage({
    credentials: {
      client_email: credentials.clientEmail,
      private_key: credentials.privateKey.replace(/\\n/g, '\n'),
    },
  });
}

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
    try {
      // Initialize Storage Client
      const storage = createClient(credentials);
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
    try {
      // Initialize Storage Client
      const storage = createClient(credentials);
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
      // Return result
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
 * Retrieves the list of files from a specified path within a GCS (Google Cloud Storage) bucket.
 *
 * @param {TProviderCredentialsGCS} credentials - The credentials required to authorize and access the GCS bucket.
 * @param {string} path - The path within the bucket to retrieve the files from.
 * @return {Promise<TResult<string[]>>} A promise that resolves with a result object containing either the list of file
 *                                      names (if successful) or an error description (if failed).
 */
export async function getFiles(
  credentials: TProviderCredentialsGCS,
  path: string
): Promise<TResult<TFileInfo[]>> {
  return new Promise(async (resolve) => {
    try {
      // Initialize Storage Client
      const storage = createClient(credentials);
      // Get files from bucket
      const [files] = await storage
        .bucket(credentials.bucket)
        .getFiles({ prefix: path });
      // Create result array
      const result: TFileInfo[] = [];
      // Iterate over all files
      files.forEach((file) => {
        // Check and get filename
        const filename = checkAndGetFilename(file.name, path);
        if (filename !== null) {
          // Add filename
          result.push({
            name: filename,
            size: file.metadata.size,
            lastModified: file.metadata.updated,
          });
        }
      });
      // Return result
      resolve({
        status: 'success',
        data: result,
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
 * Reads the content of a text file from a specified path in a cloud storage bucket.
 *
 * @param {TProviderCredentialsGCS} credentials - The credentials for accessing the Google Cloud Storage bucket,
 *        including the bucket name and authentication details.
 * @param {string} path - The fully qualified path of the file to be read within the bucket.
 * @param {number} [maxSize] - An optional maximum size (in bytes) for the file to be read. Reading will stop once
 *        this size is reached.
 * @return {Promise<TResult<string>>} A promise that resolves with the result, containing the file's content as a
 *         string if successful, or an error message if there was any issue.
 */
export async function readTextFile(
  credentials: TProviderCredentialsGCS,
  path: string,
  maxSize?: number
): Promise<TResult<string>> {
  // Return the promise
  return new Promise(async (resolve) => {
    try {
      // Initialize Storage Client
      const storage = createClient(credentials);
      // Get the bucket
      const bucket = storage.bucket(credentials.bucket);
      // Get the file
      const file = bucket.file(path);
      // Create readable stream
      const readable = file.createReadStream();
      // Create chunk buffer
      const buffer: Buffer[] = [];
      // Bytes read
      let readed = 0;
      // Listener for reading chunks
      readable.on('data', (chunk) => {
        // Add chunk to buffer
        buffer.push(chunk);
        // Calculate read bytes
        readed = readed + chunk.length;
        // Check max Size
        if (maxSize && readed >= maxSize) {
          // Close stream
          readable.destroy();
        }
      });
      // Close listener
      readable.on('close', () => {
        // Create string from buffer
        const content = Buffer.concat(buffer).toString('utf-8');
        // Return result
        resolve({
          status: 'success',
          data: content,
        });
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
