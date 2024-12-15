import {
  ECustomAttributeType,
  TSelectOption,
} from 'src/scripts/utilities/common';
import { flagDE, flagUS } from 'quasar-extras-svg-icons/country-flag-icons';
import { EProjectMemberRole } from 'src/scripts/application/Project';
import { EExternalAppProvider } from 'src/scripts/provider/common';

/**
 * Retrieves the options for language selection.
 *
 * @return {TSelectOption[]} An array of language option objects, each containing a label, value, and an icon.
 */
export function getLanguageOptions(): TSelectOption[] {
  return [
    {
      label: 'language.english',
      value: 'en-US',
      icon: flagUS,
    },
    {
      label: 'language.german',
      value: 'de-DE',
      icon: flagDE,
    },
  ];
}

/**
 * Retrieves the available project member roles.
 *
 * @return {TSelectOption[]} An array of objects representing the project member roles.
 * Each object contains a `value` and a `label` property.
 */
export function getProjectMemberRoles(): TSelectOption[] {
  return [
    {
      value: EProjectMemberRole.Maintainer,
      label: 'enumeration.memberRole.maintainer',
    },
    {
      value: EProjectMemberRole.Deployer,
      label: 'enumeration.memberRole.deployer',
    },
    {
      value: EProjectMemberRole.Developer,
      label: 'enumeration.memberRole.developer',
    },
    {
      value: EProjectMemberRole.Visitor,
      label: 'enumeration.memberRole.visitor',
    },
  ];
}

/**
 * Retrieves a list of custom attribute types.
 *
 * @return {TSelectOption[]} An array of custom attribute types, each with a value and label.
 */
export function getCustomAttributeTypes(): TSelectOption[] {
  return [
    {
      value: ECustomAttributeType.String,
      label: 'enumeration.customAttributeType.string',
    },
    {
      value: ECustomAttributeType.Number,
      label: 'enumeration.customAttributeType.number',
    },
    {
      value: ECustomAttributeType.Boolean,
      label: 'enumeration.customAttributeType.boolean',
    },
  ];
}

/**
 * Retrieves a list of external application providers.
 *
 * @return {TSelectOption[]} An array of objects, each containing the value and label of an external application provider.
 */
export function getExternalApplicationProviders(): TSelectOption[] {
  return [
    {
      value: EExternalAppProvider.S3,
      label: 'enumeration.externalAppProvider.s3',
      icon: 'img:icons/s3.png',
    },
    {
      value: EExternalAppProvider.GCS,
      label: 'enumeration.externalAppProvider.gcs',
      icon: 'img:icons/gcs.png',
    },
    {
      value: EExternalAppProvider.Snowflake,
      label: 'enumeration.externalAppProvider.snowflake',
      icon: 'img:icons/snowflake.png',
    },
  ];
}

/**
 * Retrieves a list of file types as selectable options.
 *
 * @return {TSelectOption[]} An array of objects representing file types, each containing a `value` and a `label`.
 */
export function getFileTypes(): TSelectOption[] {
  return [
    {
      value: 'unknown',
      label: 'enumeration.fileType.unknown',
    },
    {
      value: 'text/csv',
      label: 'enumeration.fileType.csv',
    },
  ];
}
