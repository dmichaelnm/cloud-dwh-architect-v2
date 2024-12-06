/**
 * Enumeration representing external application providers.
 */
export enum EExternalAppProvider {
  /** Amazon AWS S3 Bucket */
  S3 = 's3',
  /** Snowflake Database */
  Snowflake = 'snowflake',
}

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
