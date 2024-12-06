import { TResult } from '../types';
import * as sdk from 'snowflake-sdk';
import { Connection } from 'snowflake-sdk';

/**
 * Represents the credentials required to connect to a Snowflake data provider.
 */
export type TProviderCredentialsSnowflake = {
  /** Account */
  account: string;
  /** Username */
  username: string;
  /** Password */
  password: string;
  /** Database */
  database: string | null;
  /** Warehouse */
  warehouse: string | null;
  /** Role */
  role: string | null;
  /** Schema */
  schema: string | null;
};

// Connection Pool
const connectionPool: Map<string, Connection> = new Map();

/**
 * Establishes a connection to a Snowflake data warehouse using the provided credentials.
 * Utilizes a connection pool to manage and reuse existing connections.
 *
 * @param {TProviderCredentialsSnowflake} credentials - The credentials required to connect to Snowflake,
 *                                                      including account, username, password, database, warehouse,
 *                                                      role, and schema information.
 * @return {Promise<TResult<Connection>>} A promise that resolves to a result object containing the status of the
 *                                        connection request. On success, it includes the database connection.
 *                                        On failure, it provides an error code and message.
 */
async function getConnection(
  credentials: TProviderCredentialsSnowflake
): Promise<TResult<Connection>> {
  return new Promise(async (resolve) => {
    // Create pool key
    const key =
      `${credentials.account}:${credentials.username}:` +
      `${credentials.database}:${credentials.warehouse}:${credentials.role}:${credentials.schema}`;
    // Get connection from pool
    let connection = connectionPool.get(key);
    // Check connection
    if (connection && connection.isUp()) {
      // Return the connection
      resolve({
        status: 'success',
        data: connection,
      });
    } else {
      // Remove old connection from pool
      connectionPool.delete(key);
      // Create new connection
      connection = sdk.createConnection({
        account: credentials.account,
        username: credentials.username,
        password: credentials.password,
        database: credentials.database ? credentials.database : undefined,
        warehouse: credentials.warehouse ? credentials.warehouse : undefined,
        role: credentials.role ? credentials.role : undefined,
        schema: credentials.schema ? credentials.schema : undefined,
        application: 'CDWHA',
      });
      // Connect to the database
      connection.connect(async (err, conn) => {
        // Check error object
        if (err) {
          // Failed to create connection
          resolve({
            status: 'failure',
            code: 'connection-failed',
            message: err.message,
          });
        } else {
          // Put connection in the pool
          connectionPool.set(key, conn);
          // Return connection
          resolve({
            status: 'success',
            data: conn,
          });
        }
      });
    }
  });
}

/**
 * Executes a SQL statement using the provided Snowflake database credentials.
 *
 * @param {TProviderCredentialsSnowflake} credentials - The credentials required to connect to the Snowflake database.
 * @param {string} sqlText - The SQL statement to be executed.
 * @param {any[]} binds - The parameters to bind to the SQL statement.
 * @return {Promise<TResult<any[]>>} A promise that resolves to the result of the SQL statement execution.
 * The result indicates success or failure and contains data when successful.
 */
export async function executeStatement(
  credentials: TProviderCredentialsSnowflake,
  sqlText: string,
  binds: any[]
): Promise<TResult<any[]>> {
  // Create Promise
  return new Promise(async (resolve) => {
    // Get database connection
    const result = await getConnection(credentials);
    if (result.status === 'success') {
      // Get Connection
      const connection = result.data as Connection;
      // Execute the statement
      connection.execute({
        sqlText: sqlText,
        binds: binds,
        complete: (err, statement, rows) => {
          // Check if error is specified
          if (err) {
            // Statement execution failed
            resolve({
              status: 'failure',
              code: 'execution-failed',
              message: err.message,
            });
          } else {
            // Statement has executed successfully
            resolve({
              status: 'success',
              data: rows,
            });
          }
        },
      });
    } else {
      // Failed to get a connection
      resolve({
        status: 'failure',
        code: result.code,
        message: result.message,
      });
    }
  });
}

/**
 * Tests the connection to a Snowflake database using the provided credentials.
 *
 * @param {TProviderCredentialsSnowflake} credentials - The credentials required to connect to the Snowflake database.
 * @return {Promise<TResult<string>>} A promise that resolves to an object containing the result of the connection test.
 */
export async function testConnection(
  credentials: TProviderCredentialsSnowflake
): Promise<TResult<string>> {
  return new Promise(async (resolve) => {
    // Execute test statement
    const result = await executeStatement(
      credentials,
      "SELECT 'Snowflake Version ' || current_version() || '(Database: ' || coalesce(current_database(), '-') " +
        "|| ', Warehouse: ' || coalesce(current_warehouse(), '-') || ', Role: ' || coalesce(current_role(), '-') " +
        "|| ', Schema: ' || coalesce(current_schema(), '-') || ')' AS info",
      []
    );
    // Check the result
    if (result.status === 'success' && result.data) {
      resolve({
        status: 'success',
        data: result.data[0].INFO,
      });
    } else {
      resolve({
        status: 'failure',
        code: 'connection-failed',
        message: result.message,
      });
    }
  });
}
