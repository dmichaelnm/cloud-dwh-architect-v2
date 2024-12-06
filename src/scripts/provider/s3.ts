import * as f from 'quasar-extras-svg-icons/country-flag-icons';
import { TSelectOption } from 'src/scripts/utilities/common';
import { omcFlagSouthKorea } from 'quasar-extras-svg-icons/openmoji-icons-v15';
import { TProviderCredentials } from 'src/scripts/provider/common';

/**
 * Represents the credentials and configuration needed to authenticate
 * and connect to an AWS S3 bucket.
 */
export type TProviderCredentialsS3 = {
  /** Region */
  region: string;
  /** Bucket Name */
  bucket: string;
  /** Access Key ID */
  accessKeyId: string;
  /** Secret Access Key */
  secretAccessKey: string;
};

// @formatter:off
/**
 * Retrieves a list of available AWS regions, each represented as an option with a label, value, and associated icon.
 *
 * @return {TSelectOption[]} An array of region options for use in select components, containing the label, value,
 *                           and icon for each AWS region.
 */
export function getAWSRegions(): TSelectOption[] {
  return [
    { label: 'US East (N. Virginia)', value: 'us-east-1', icon: f.flagUS },
    { label: 'US East (Ohio)', value: 'us-east-2', icon: f.flagUS },
    { label: 'US West (N. California)', value: 'us-west-1', icon: f.flagUS },
    { label: 'US West (Oregon)', value: 'us-west-2', icon: f.flagUS },
    { label: 'AWS GovCloud (US-East)', value: 'us-gov-east-1', icon: f.flagUS },
    { label: 'AWS GovCloud (US-West)', value: 'us-gov-west-1', icon: f.flagUS },
    { label: 'Africa (Cape Town)', value: 'af-south-1', icon: f.flagZA },
    { label: 'Asia Pacific (Hong Kong)', value: 'ap-east-1', icon: f.flagHK },
    { label: 'Asia Pacific (Mumbai)', value: 'ap-south-1', icon: f.flagIN },
    { label: 'Asia Pacific (Hyderabad)', value: 'ap-south-2', icon: f.flagIN },
    { label: 'Asia Pacific (Jakarta)', value: 'ap-southeast-3', icon: f.flagID },
    { label: 'Asia Pacific (Malaysia)', value: 'ap-southeast-5', icon: f.flagMY },
    { label: 'Asia Pacific (Sydney)', value: 'ap-southeast-2', icon: f.flagAU },
    { label: 'Asia Pacific (Melbourne)', value: 'ap-southeast-4', icon: f.flagAU },
    { label: 'Asia Pacific (Tokyo)', value: 'ap-northeast-1', icon: f.flagJP },
    { label: 'Asia Pacific (Osaka)', value: 'ap-northeast-3', icon: f.flagJP },
    { label: 'Asia Pacific (Seoul)', value: 'ap-northeast-2', icon: omcFlagSouthKorea },
    { label: 'Asia Pacific (Singapore)', value: 'ap-southeast-1', icon: f.flagSG },
    { label: 'Canada (Central)', value: 'ca-central-1', icon: f.flagCA },
    { label: 'Canada West (Calgary)', value: 'ca-west-1', icon: f.flagCA },
    { label: 'Europe (Frankfurt)', value: 'eu-central-1', icon: f.flagDE },
    { label: 'Europe (Ireland)', value: 'eu-west-1', icon: f.flagIE },
    { label: 'Europe (London)', value: 'eu-west-2', icon: f.flagGB },
    { label: 'Europe (Milan)', value: 'eu-south-1', icon: f.flagIT },
    { label: 'Europe (Paris)', value: 'eu-west-3', icon: f.flagFR },
    { label: 'Europe (Spain)', value: 'eu-south-2', icon: f.flagES },
    { label: 'Europe (Stockholm)', value: 'eu-north-1', icon: f.flagSE },
    { label: 'Europe (Zurich)', value: 'eu-central-2', icon: f.flagCH },
    { label: 'Israel (Tel Aviv)', value: 'il-central-1', icon: f.flagIL },
    { label: 'Middle East (Bahrain)', value: 'me-south-1', icon: f.flagBH },
    { label: 'Middle East (UAE)', value: 'me-central-1', icon: f.flagAE },
    { label: 'South America (São Paulo)', value: 'sa-east-1', icon: f.flagBR },
  ];
}
// @formatter:on

/**
 * Transforms the given provider credentials into specific S3 credentials format.
 *
 * @param {TProviderCredentials} credentials - The general provider credentials that need to be converted to S3 credentials format.
 * @return {TProviderCredentialsS3} The converted S3 credentials, including region, bucket, access key ID, and secret access key.
 */
export function createCredentials(credentials: TProviderCredentials): TProviderCredentialsS3 {
  // Cast to S3 credentials
  const s3 = credentials as TProviderCredentialsS3;
  // Build the S3 credentials
  return {
    region: s3.region,
    bucket: s3.bucket,
    accessKeyId: s3.accessKeyId,
    secretAccessKey: s3.secretAccessKey
  };
}
