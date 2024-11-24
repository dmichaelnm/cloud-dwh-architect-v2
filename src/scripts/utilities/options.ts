import { TSelectOption } from 'src/scripts/utilities/common';
import { flagDE, flagUS } from 'quasar-extras-svg-icons/country-flag-icons';
import { EProjectMemberRole } from 'src/scripts/application/Project';

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
      value: EProjectMemberRole.Developer,
      label: 'enumeration.memberRole.developer',
    },
    {
      value: EProjectMemberRole.Visitor,
      label: 'enumeration.memberRole.visitor',
    },
  ];
}
