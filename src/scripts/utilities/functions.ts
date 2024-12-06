import { buildOptions } from 'src/scripts/config/options';
import { firebaseAuth } from 'src/scripts/utilities/firebase';
import { api } from 'boot/axios';
import { FirebaseError } from 'firebase/app';

/**
 * Represents the result of an operation, encapsulating the status, optional code and message, and result data.
 *
 * @template R - The type of the data property.
 */
export type TResult<R> = {
  /** Status */
  status: 'success' | 'failure';
  /** Error code when status is 'failure' */
  code?: string;
  /** Error message when status is 'failure' */
  message?: string;
  /** Data object when status is 'success' */
  data?: R;
};

/**
 * Sends a POST request to a specified Firebase function with a given payload.
 *
 * @param functionName The name of the Firebase function to be called.
 * @param payload The payload data to send with the POST request.
 * @return A promise that resolves to the response data of type R if the request is successful.
 * @throws FirebaseError if the user is not authenticated or if the request fails.
 */
export async function post<P, R>(functionName: string, payload: P): Promise<R> {
  let result: TResult<R>;
  try {
    // Check for active current user
    if (firebaseAuth.currentUser) {
      // Create URL with specified function name
      const url = buildOptions.functionsUrl.replace(
        ':function:',
        functionName
      );
      // Get user token
      const token = await firebaseAuth.currentUser.getIdToken(true);
      // Send POST request
      const response = await api.post(url, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Check status of the response
      if (response.status === 200) {
        // Set result
        result = response.data as TResult<R>;
      } else {
        // HTTP request failed
        result = {
          status: 'failure',
          code: 'unexpected-error',
          message: `${response.status} - ${response.statusText}`,
        };
      }
    } else {
      // No authorized user
      result = {
        status: 'failure',
        code: 'unauthenticated',
        message: 'The user is not authenticated.',
      };
    }
  } catch (error: any) {
    // Get error code and message
    result = {
      status: 'failure',
      code: error.code ? error.code : 'unexpected-error',
      message: error.message ? error.message : (error as string),
    };
  }
  // Check status
  if (result.status === 'success') {
    // Everything is okay, return the result
    return result.data as R;
  }
  if (result.status === 'failure') {
    // Request failed, throw Firebase exception
    throw new FirebaseError(result.code as string, result.message as string);
  }
  // Unexpected result status
  throw new FirebaseError(
    'unexpexted-status',
    `Unexpected result status: ${result.status}`
  );
}
