import { onRequest, Request } from 'firebase-functions/v2/https';
import { Response } from 'express';
import * as logger from 'firebase-functions/logger';
import * as admin from 'firebase-admin';
import * as s3 from './provider/s3';
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
        logger.debug(result);
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
