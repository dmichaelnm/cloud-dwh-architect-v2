//import * as logger from 'firebase-functions/logger';
import { EColumnType, TColumnDefinition, TMetaData } from '../types';
import { parse } from 'papaparse';
import { isMatch, isValid, parse as dateParse } from 'date-fns';

/**
 * Represents the properties for configuring a CSV file. This type is used
 * to define the format and structure of a CSV file.
 */
export type TFilePropertiesCSV = {
  /** Row Separator */
  rowSeparator: 'CRLF' | 'LF' | 'CR';
  /** Field Delimitor */
  fieldDelimitor: string;
  /** Quote Character */
  quoteCharacter: string;
  /** First row is header */
  hasHeaderRow: boolean;
  /** Date Format */
  dateFormat: string;
  /** Time Format */
  timeFormat: string;
  /** Timestamp Format */
  timestampFormat: string;
  /** Decimal Separator */
  decimalSeparator: string;
};

/**
 * TMetaDataCSV type represents metadata configuration for handling CSV files.
 * It extends the TMetaData type with specific properties used for CSV parsing and formatting.
 */
export type TMetaDataCSV = TMetaData & {
  /** Field delimiter */
  fieldDelimiter: string;
  /** Line break */
  lineBreak: string;
};

/**
 * Represents the metadata of a column in a dataset, including information about its name, type, and constraints.
 */
type TSampleData = {
  /** Header Name */
  headerName: string;
  /** Guessed Data Type */
  guessedType: EColumnType | null;
  /** Nullable Flag */
  nullable: boolean;
  /** Precision */
  precision: number | null;
  /** Scale */
  scale: number | null;
  /** Format */
  format: string | null;
};

/**
 * Represents a type definition for a CSV column that extends the base TColumnType.
 * Includes an optional format property which defines the specific format of the column.
 */
export type TColumnDefinitionCSV = TColumnDefinition & {
  /** Optional Format */
  format: string | null;
};

/**
 * Processes CSV content and generates metadata based on the provided file properties and content.
 *
 * @param {TFilePropertiesCSV} properties - The file properties, including configuration such as whether the CSV has
 * #                                        a header row.
 * @param {string} content - The CSV content as a string.
 * @return {Promise<TMetaDataCSV>} A promise that resolves to metadata about the CSV, including delimiter,
 *                                 line break format, and column definitions.
 */
export async function sampleMetaData(
  properties: TFilePropertiesCSV,
  content: string
): Promise<TMetaDataCSV> {
  // Return the promise
  return new Promise((resolve) => {
    // Parse the CSV content
    const result = parse(content, { skipEmptyLines: 'greedy' });
    // Create result
    const metaData: TMetaDataCSV = {
      fieldDelimiter: result.meta.delimiter as string,
      lineBreak:
        result.meta.linebreak === '\r\n'
          ? 'CRLF'
          : result.meta.linebreak === '\r'
          ? 'CR'
          : 'LF',
      columns: [],
    };
    let sampleData: TSampleData[] = [];
    let startRow = 0;
    // Check header row
    if (properties.hasHeaderRow) {
      // Create header names from first row
      (result.data[0] as string[]).forEach((field) =>
        sampleData.push({
          headerName: field,
          guessedType: null,
          nullable: false,
          precision: null,
          scale: null,
          format: null,
        })
      );
      // Set start row to 1
      startRow = 1;
    }
    // Iterate over all data rows
    for (let i = startRow; i < result.data.length; i++) {
      // Get record array
      const records = result.data[i] as string[];
      // Iterate over all records
      for (let j = 0; j < records.length; j++) {
        // Check for header name
        if (sampleData.length === j) {
          // Add new entry
          sampleData.push({
            headerName: `COLUMN_${j + 1}`,
            guessedType: null,
            nullable: false,
            precision: null,
            scale: null,
            format: null,
          });
        }
        // Guess the data type and format
        const guessResult = guessDataType(records[j], properties);
        // Get guessed data type
        const guessedType = guessResult.type;
        if (guessedType !== null && sampleData[j].guessedType === null) {
          // Set type
          sampleData[j].guessedType = guessedType;
          // Set format
          sampleData[j].format = guessResult.format;
        } else if (
          guessedType !== null &&
          sampleData[j].guessedType !== null &&
          sampleData[j].guessedType !== guessedType
        ) {
          // Set default type
          sampleData[j].guessedType = EColumnType.String;
          sampleData[j].format = null;
        }
        // Check nullability
        sampleData[j].nullable = sampleData[j].nullable || isNull(records[j]);
        // Get precision
        sampleData[j].precision = Math.max(
          sampleData[j].precision ?? 0,
          getPrecision(
            records[j],
            sampleData[j].guessedType ?? EColumnType.String,
            properties.decimalSeparator
          ) ?? 0
        );
        // Get scale
        sampleData[j].scale = Math.max(
          sampleData[j].scale ?? 0,
          getScale(
            records[j],
            sampleData[j].guessedType ?? EColumnType.String,
            properties.decimalSeparator
          ) ?? 0
        );
      }
    }
    // Build column definitions
    sampleData.forEach((sample) => {
      metaData.columns.push({
        name: sample.headerName,
        type: sample.guessedType ?? EColumnType.String,
        precision:
          sample.guessedType === EColumnType.String ||
          sample.guessedType === EColumnType.Number
            ? sample.precision
            : null,
        scale: sample.guessedType === EColumnType.Number ? sample.scale : null,
        nullable: sample.nullable,
        comment: null,
        format: sample.format,
      } as TColumnDefinitionCSV);
    });
    // Resolve to result
    resolve(metaData);
  });
}

/**
 * Guesses the data type of given string value based on specified properties such as format for date, time,
 * and timestamp.
 *
 * @param {string} value - The value whose data type is to be guessed.
 * @param {TFilePropertiesCSV} properties - An object containing format specifications for timestamp, time, and date.
 * @return {{type: EColumnType | null, format: string | null}} An object with the guessed data type (`type`) and
 *         associated format (`format`). Returns `null` for both if the data type cannot be determined.
 */
function guessDataType(
  value: string,
  properties: TFilePropertiesCSV
): {
  type: EColumnType | null;
  format: string | null;
} {
  // Check for null
  if (isNull(value)) {
    // Data Type is not guessable
    return { type: null, format: null };
  }
  // Check for Boolean
  if (value === 'true' || value === 'false') {
    return { type: EColumnType.Boolean, format: null };
  }
  // Check for Timestamp
  if (parseDate(value, properties.timestampFormat) !== null) {
    return { type: EColumnType.Timestamp, format: properties.timestampFormat };
  }
  // Check for Date
  if (parseDate(value, properties.dateFormat) !== null) {
    return { type: EColumnType.Date, format: properties.dateFormat };
  }
  // Check for Time
  if (parseDate(value, properties.timeFormat) !== null) {
    return { type: EColumnType.Time, format: properties.timeFormat };
  }
  // Check for Number
  if (parseNumber(value) !== null) {
    return { type: EColumnType.Number, format: null };
  }
  // It's just a string
  return { type: EColumnType.String, format: null };
}

/**
 * Parses a given string and converts it to a floating-point number if possible.
 * Returns null if the input cannot be parsed into a valid number.
 *
 * @param {string} value - The string to be parsed into a number.
 * @return {number | null} The parsed number if valid, or null if the input is not a valid number.
 */
function parseNumber(value: string): number | null {
  const nmbr = Number.parseFloat(value);
  if (!isNaN(nmbr) && isFinite(nmbr)) {
    return nmbr;
  } else {
    return null;
  }
}

/**
 * Parses a date string based on the given format and returns a Date object
 * if the format and value are valid.
 *
 * @param {string} value - The date string to be parsed.
 * @param {string} format - The format specifier to validate and parse the date string.
 * @return {Date|null} A Date object if the value matches the format and is valid,
 *                     or null if the format is incorrect or the date is invalid.
 */
function parseDate(value: string, format: string): Date | null {
  // Check for valid format
  if (!isMatch(value, format)) {
    // Invalid format
    return null;
  }
  // Create date object
  const date = dateParse(value, format, new Date());
  // Check date for validity
  return isValid(date) ? date : null;
}

/**
 * Checks if the given string value is null, empty, or contains only whitespace.
 *
 * @param {string} value - The string value to be checked.
 * @return {boolean} Returns true if the value is null, empty, or contains only whitespace; otherwise, false.
 */
function isNull(value: string): boolean {
  return value === null || value.trim().length === 0;
}

/**
 * Calculates the precision of a given value based on its type and decimal separator.
 *
 * @param {string} value - The value whose precision is to be calculated.
 * @param {EColumnType} type - The type of the value (e.g., String, Number).
 * @param {string} decimalSeparator - The character used to separate the integer and fractional parts.
 * @return {number | null} The precision of the value if applicable, or null if the precision is not supported for the given type.
 */
function getPrecision(
  value: string,
  type: EColumnType,
  decimalSeparator: string
): number | null {
  if (type === EColumnType.String) {
    return value.length;
  }
  if (type === EColumnType.Number) {
    // Get the integer part
    const integer = value.substring(0, value.indexOf(decimalSeparator));
    // Get the length of the integer part
    let precision = integer.startsWith('-')
      ? integer.length - 1
      : integer.length;
    // Get the fraction part
    const fraction = value.substring(value.indexOf(decimalSeparator) + 1);
    // Add fraction part to precision
    precision += fraction.length;
    // Return the precision
    return precision;
  }
  // Type don't support precision
  return null;
}

/**
 * Computes the scale (number of decimal places) of a numerical value based on the provided parameters.
 *
 * @param {string} value - The string representation of the numerical value to analyze.
 * @param {EColumnType} type - The type of the column, used to determine if the scale is applicable.
 * @param {string} decimalSeparator - The character used as the decimal separator in the value.
 * @return {number | null} The number of decimal places in the value if the type is numerical; otherwise, null.
 */
function getScale(
  value: string,
  type: EColumnType,
  decimalSeparator: string
): number | null {
  if (type === EColumnType.Number) {
    if (value.indexOf(decimalSeparator) === -1) {
      // No decimal places
      return 0;
    }
    // Get the fraction part
    const fraction = value.substring(value.indexOf(decimalSeparator) + 1);
    // Return length of fraction
    return fraction.length;
  }
  // Type don't support precision
  return null;
}
