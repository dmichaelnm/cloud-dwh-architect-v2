import { TProviderCredentialsS3 } from './provider/s3';
import { TProviderCredentialsGCS } from './provider/gcs';
import { TProviderCredentialsSnowflake } from './provider/snowflake';
import { TFilePropertiesCSV } from './sampling/csv';

/**
 * Enumeration representing different file types.
 *
 * This enum is commonly used to define and categorize
 * supported file types by their MIME type.
 */
export enum EFileType {
  /** Unknown file type */
  Unknown = 'unknown',
  /** Plain CSV */
  CSV = 'text/csv',
}

/**
 * Enumeration representing external application providers.
 */
export enum EExternalAppProvider {
  /** Amazon AWS S3 Bucket */
  S3 = 's3',
  /** Google Cloud Storage */
  GCS = 'gcs',
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

/**
 * Represents file information with details about its name, size, and last modified date.
 */
export type TFileInfo = {
  /** Name */
  name: string;
  /** Size */
  size: string | number | undefined;
  /** Last Modified */
  lastModified: Date | string | undefined;
};

/**
 * TProviderCredentials is a union type that represents the credentials required for different types of providers.
 * This type can hold credentials for one of the following providers:
 * - Amazon S3
 * - Google Cloud Storage (GCS)
 * - Snowflake
 */
export type TProviderCredentials =
  | TProviderCredentialsS3
  | TProviderCredentialsGCS
  | TProviderCredentialsSnowflake;

/**
 * Enum representing the column types that can be used for data representation and categorization.
 * Provides a set of predefined types that can be used to specify the nature of a column's data.
 *
 * The available column types are:
 * - String: Represents textual data.
 * - Number: Represents numerical data.
 * - Date: Represents calendar dates.
 * - Time: Represents time of day.
 * - Timestamp: Represents a precise point in time, including both date and time.
 * - Boolean: Represents a true/false or binary state.
 */
export enum EColumnType {
  String = 'string',
  Number = 'number',
  Date = 'date',
  Time = 'time',
  Timestamp = 'timestamp',
  Boolean = 'boolean',
}

/**
 * Defines the structure of a database column.
 * This type outlines the properties and metadata associated with a column in a database schema.
 */
export type TColumnDefinition = {
  /** The physical name of the column */
  name: string;
  /** The type of the column */
  type: EColumnType;
  /** The length or precision of the column type */
  precision: number | null;
  /** The scale of numeric types */
  scale: number | null;
  /** Flag indicating that values of the column can be null */
  nullable: boolean;
  /** Comment of the column */
  comment: string | null;
};

/**
 * Represents metadata with a set of column definitions.
 *
 * This type is used to define and manage column-related metadata for specific use cases such as tables,
 * data structures, or configurations.
 */
export type TMetaData = {
  /** Column Definitions */
  columns: TColumnDefinition[];
};

/**
 * Represents the properties of a file.
 *
 * This type alias defines the structure for file properties.
 */
export type TFileProperties = TFilePropertiesCSV;
