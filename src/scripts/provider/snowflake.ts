import { TProviderCredentials } from 'src/scripts/provider/common';

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

/**
 * Converts the given generic provider credentials into Snowflake-specific credentials.
 *
 * @param {TProviderCredentials} credentials - The generic provider credentials to be converted.
 * @return {TProviderCredentialsSnowflake} The transformed Snowflake-specific credentials.
 */
export function createCredentials(
  credentials: TProviderCredentials
): TProviderCredentialsSnowflake {
  // Cast to Snowflake credentials
  const snflk = credentials as TProviderCredentialsSnowflake;
  // Build snowflake credentials
  return {
    account: snflk.account,
    username: snflk.username,
    password: snflk.password,
    database: snflk.database ? snflk.database : null,
    warehouse: snflk.warehouse ? snflk.warehouse : null,
    role: snflk.role ? snflk.role : null,
    schema: snflk.schema ? snflk.schema : null,
  };
}
