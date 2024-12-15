import { onRequest, Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import * as s3 from './provider/s3';
import * as gcs from './provider/gcs';
import * as snflk from './provider/snowflake';
import { EExternalAppProvider } from './types';

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
      // Log the error
      logger.error(error);
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
      const provider = request.body.provider as EExternalAppProvider;
      if (provider === EExternalAppProvider.S3) {
        // Call test connection function for Amazon AWS S3
        const result = await s3.testConnection(
          request.body.credentials as s3.TProviderCredentialsS3
        );
        // Send result
        response.send(result);
      } else if (provider === EExternalAppProvider.GCS) {
        // Call test connection function for Google Cloud Storage
        const result = await gcs.testConnection(
          request.body.credentials as gcs.TProviderCredentialsGCS
        );
        // Send result
        response.send(result);
      } else if (provider === EExternalAppProvider.Snowflake) {
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
      const provider = request.body.provider as EExternalAppProvider;
      if (provider === EExternalAppProvider.S3) {
        // Get Folders from AWS S3 Bucket
        const result = await s3.getFolders(
          request.body.credentials as s3.TProviderCredentialsS3
        );
        // Return the result
        response.send(result);
      } else if (provider === EExternalAppProvider.GCS) {
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
      const provider = request.body.provider as EExternalAppProvider;
      // Get path
      const path = request.body.path as string;

      if (provider === EExternalAppProvider.S3) {
        // Get files from Amazon S3 bucket
        const result = await s3.getFiles(
          request.body.credentials as s3.TProviderCredentialsS3,
          path
        );
        // Return the result
        response.send(result);
      } else if (provider === EExternalAppProvider.GCS) {
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
