import { TSelectOption } from 'src/scripts/utilities/common';
import { flagUS, flagDE } from 'quasar-extras-svg-icons/country-flag-icons';

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
