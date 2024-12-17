//import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import * as s3 from './provider/s3';
import * as gcs from './provider/gcs';
import * as snflk from './provider/snowflake';
import * as csv from './sampling/csv';
import * as tp from './types';
import { onRequest, Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import { TProviderCredentialsS3 } from './provider/s3';
import { TFilePropertiesCSV } from './sampling/csv';

// Initialize Firebase App
admin.initializeApp();

// Default region
const region = 'europe-west1';

/**
 * Authorizes a request by verifying a Bearer token passed in the request headers.
 * If the token is valid, a handler function is called with the decoded token.
 *
 * @param {Request} request - The request object containing headers with the authorization token.
 * @param {Response} response - The response object used to send back an invalid token or no token response.
 * @param {Function} handler - A handler function that takes a decoded ID token as its parameter and returns a promise.
 */
async function authorize(
  request: Request,
  response: Response,
  handler: (user: admin.auth.DecodedIdToken) => Promise<void>
) {
  // Get token from header
  const headerToken = request.headers.authorization;
  if (headerToken && headerToken.startsWith('Bearer ')) {
    // Get authorization token
    const token = headerToken.substring(7);
    try {
      // Decode token
      const decodedToken = await admin.auth().verifyIdToken(token);
      // Call the handler function
      await handler(decodedToken);
    } catch (error: any) {
      // Invalid token found
      response.send({
        status: 'failure',
        code: 'invalid-request',
        message: error.message ? error.message : 'An unknown error occurred.',
      });
    }
  } else {
    // Token not found
    response.send({
      status: 'failure',
      code: 'invalid-authorization',
      message: 'Authorization token is missing, invalid or expired.',
    });
  }
}

/**
 * Reads the content of a text file from the specified provider.
 *
 * @param {EExternalAppProvider} provider - The external application provider (e.g., S3).
 * @param {TProviderCredentials} credentials - The credentials required to access the specified provider.
 * @param {string} path - The file path where the text file is located.
 * @param {number} [maxSize] - The optional maximum number of bytes to read from the file.
 * @return {Promise<TResult<string[]>>} A promise resolving to the result containing the file content as a
 *                                      strings if successful, or an error object if the operation fails.
 */
async function readTextFile(
  provider: tp.EExternalAppProvider,
  credentials: tp.TProviderCredentials,
  path: string,
  maxSize?: number
): Promise<tp.TResult<string>> {
  if (provider === tp.EExternalAppProvider.S3) {
    // Read text file from AWS S3 Bucket
    return await s3.readTextFile(
      credentials as TProviderCredentialsS3,
      path,
      maxSize
    );
  } else {
    // Unknown provider
    return {
      status: 'failure',
      code: 'unknown-provider',
      message: `The provider ${provider} is not supported.`,
    };
  }
}

async function sampleMetaData(
  type: tp.EFileType,
  properties: tp.TFileProperties,
  content: string
): Promise<tp.TResult<tp.TMetaData>> {
  // Check file type
  if (type === tp.EFileType.CSV) {
    // Sample CSV data
    const metaData = await csv.sampleMetaData(
      properties as TFilePropertiesCSV,
      content
    );
    // Return result
    return {
      status: 'success',
      data: metaData,
    };
  } else {
    // Unknown file type
    return {
      status: 'failure',
      code: 'unknown-file-type',
      message: `The file type ${type} is not supported.`,
    };
  }
}

/**
 * Represents a connection testing operation for external app providers.
 *
 * This variable is an asynchronous request handler that authorizes a request
 * and attempts to establish a connection with a specified external service
 * provider, such as Amazon AWS S3 or Snowflake. Upon executing the connection
 * test, it sends back the result which may indicate success or details of any
 * failure encountered during the attempt.
 *
 * The allowed external app providers are defined by the enumeration
 * `EExternalAppProvider`, and connection credentials should be provided
 * appropriately for each provider type.
 *
 * The supported providers include:
 * - `EExternalAppProvider.S3` for Amazon AWS S3.
 * - `EExternalAppProvider.Snowflake` for Snowflake.
 *
 * If an unrecognized provider is specified, the response will indicate failure
 * with the status `unknown-provider`.
 */
export const testConnection = onRequest(
  {
    region: region,
    cors: true,
  },
  async (request, response) => {
    // Authorize the request
    await authorize(request, response, async () => {
      // Get provider
      const provider = request.body.provider as tp.EExternalAppProvider;
      if (provider === tp.EExternalAppProvider.S3) {
        // Call test connection function for Amazon AWS S3
        const result = await s3.testConnection(
          request.body.credentials as s3.TProviderCredentialsS3
        );
        // Send result
        response.send(result);
      } else if (provider === tp.EExternalAppProvider.GCS) {
        // Call test connection function for Google Cloud Storage
        const result = await gcs.testConnection(
          request.body.credentials as gcs.TProviderCredentialsGCS
        );
        // Send result
        response.send(result);
      } else if (provider === tp.EExternalAppProvider.Snowflake) {
        // Call test connection function for Snowflake
        const result = await snflk.testConnection(
          request.body.credentials as snflk.TProviderCredentialsSnowflake
        );
        // Send result
        response.send(result);
      } else {
        // Unknown provider
        response.send({
          status: 'failure',
          code: 'unknown-provider',
          message: `The provider ${provider} is not supported.`,
        });
      }
    });
  }
);

/**
 * Handles the request to retrieve folders from an external provider.
 * This function is designed to support multiple external applications, such as S3,
 * and fetch the folders based on the given credentials and provider type.
 *
 * The function uses request authorization to validate the user's access and then delegates
 * folder retrieval to the respective external application provider.
 *
 * The supported provider types are defined in the `EExternalAppProvider` enumeration.
 *
 * If the provider is unsupported or invalid, an error response with the status "failure" is returned.
 */
export const getFolders = onRequest(
  {
    region: region,
    cors: true,
  },
  async (request, response) => {
    // Authorize the request
    await authorize(request, response, async () => {
      // Get provider
      const provider = request.body.provider as tp.EExternalAppProvider;
      if (provider === tp.EExternalAppProvider.S3) {
        // Get Folders from AWS S3 Bucket
        const result = await s3.getFolders(
          request.body.credentials as s3.TProviderCredentialsS3
        );
        // Return the result
        response.send(result);
      } else if (provider === tp.EExternalAppProvider.GCS) {
        // Get folders from Google Cloud Storage
        const result = await gcs.getFolders(
          request.body.credentials as gcs.TProviderCredentialsGCS
        );
        // Return the result
        response.send(result);
      } else {
        // Unknown provider
        response.send({
          status: 'failure',
          code: 'unknown-provider',
          message: `The provider ${provider} is not supported.`,
        });
      }
    });
  }
);

/**
 * Handles a request to retrieve files from an external storage provider.
 *
 * The function processes HTTP requests to fetch files from either an Amazon S3
 * bucket or a Google Cloud Storage (GCS) bucket, based on the specified provider.
 *
 * Configuration:
 * - The `region` option specifies the region configuration of the request handler.
 * - The `cors` option enables Cross-Origin Resource Sharing for the endpoint.
 *
 * Request Payload:
 * - `provider`: A string representing the external storage provider (e.g., "S3" or "GCS").
 * - `path`: A string specifying the directory or path in the storage provider to retrieve files from.
 * - `credentials`: An object containing the credentials required to authenticate with the specified provider.
 *
 * Behavior:
 * - For Amazon S3 (`EExternalAppProvider.S3`): Retrieves files using the specified S3 credentials and path.
 * - For Google Cloud Storage (`EExternalAppProvider.GCS`): Retrieves files using the specified GCS credentials and path.
 * - If the provider is not recognized, returns an error response with status "failure".
 *
 * Responses:
 * - On success: Sends the result containing the list of files retrieved from the specified provider.
 * - On unknown provider: Sends an error object indicating that the provider is not supported.
 */
export const getFiles = onRequest(
  {
    region: region,
    cors: true,
  },
  async (request, response) => {
    // Authorize the request
    await authorize(request, response, async () => {
      // Get provider
      const provider = request.body.provider as tp.EExternalAppProvider;
      // Get path
      const path = request.body.path as string;

      if (provider === tp.EExternalAppProvider.S3) {
        // Get files from Amazon S3 bucket
        const result = await s3.getFiles(
          request.body.credentials as s3.TProviderCredentialsS3,
          path
        );
        // Return the result
        response.send(result);
      } else if (provider === tp.EExternalAppProvider.GCS) {
        // Get files from Amazon S3 bucket
        const result = await gcs.getFiles(
          request.body.credentials as gcs.TProviderCredentialsGCS,
          path
        );
        // Return the result
        response.send(result);
      } else {
        // Unknown provider
        response.send({
          status: 'failure',
          code: 'unknown-provider',
          message: `The provider ${provider} is not supported.`,
        });
      }
    });
  }
);

/**
 * Handles the request to get metadata for a file using specified provider credentials and file information.
 *
 * This function processes an HTTP request and performs the following operations:
 * - Authorizes the provided request.
 * - Extracts provider, credentials, path, and file type information from the request body.
 * - Validates the file type and, if valid, retrieves file content.
 * - Analyzes the content to obtain metadata, including column information for certain file types.
 * - Returns the metadata or corresponding error responses to the client.
 *
 * Request Body Parameters:
 * - provider (EExternalAppProvider): The external application provider for file access.
 * - credentials (TProviderCredentials): Credentials required to authenticate with the external provider.
 * - path (string): Path of the file to retrieve metadata for.
 * - type (EFileType): The type of file (e.g., CSV) to process.
 *
 * Responses:
 * - On success, sends a response object with metadata information:
 *   { status: 'success', data: [...] }
 * - On failure to read the file or due to unsupported file type:
 *   { status: 'failure', code: '...', message: '...' }
 *
 * File Type Handling:
 * - If the file type is CSV, attempts to parse content up to a predefined size limit (1MB).
 * - If the file type is unknown, returns an appropriate error response.
 *
 * Note:
 * - The function depends on external functions `authorize`, `readTextFile`, and `sampleMetaData`.
 * - Limits the file size during processing for certain recognized file types.
 */
export const getFileMetaData = onRequest(
  {
    region: region,
    cors: true,
  },
  async (request, response) => {
    // Authorize the request
    await authorize(request, response, async () => {
      // Get provider
      const provider = request.body.provider as tp.EExternalAppProvider;
      // Get credentials
      const credentials = request.body.credentials as tp.TProviderCredentials;
      // Get path
      const path = request.body.path as string;
      // Get file type
      const type = request.body.type as tp.EFileType;
      // Get file properties
      const properties = request.body.properties as tp.TFileProperties;

      // Check file type
      if (type !== tp.EFileType.Unknown) {
        // Get max size dependent on the file type
        const maxSize = type === tp.EFileType.CSV ? 1024 * 1024 : undefined;
        // Get the file content
        const result = await readTextFile(provider, credentials, path, maxSize);
        if (result.status === 'success') {
          // Get column definitions
          const metaData = await sampleMetaData(
            type,
            properties,
            result.data as string
          );
          // Return result
          response.send(metaData);
        } else {
          // Failed to read file
          response.send(result);
        }
      } else {
        // Unknown file type
        response.send({
          status: 'failure',
          code: 'unknown-file-type',
          message: `The file type ${type} is not supported.`,
        });
      }
    });
  }
);
