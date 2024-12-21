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
