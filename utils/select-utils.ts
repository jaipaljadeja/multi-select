import { Option } from "../types";

/**
 * Filters a list of options based on a search text, optionally ignoring specified options.
 *
 * @param {Option[]} list - The list of options to filter.
 * @param {string} search_text - The search text to filter the list.
 * @param {Option[]} [ignore] - An optional array of options to ignore during the filtering process.
 * @returns {Option[]} - The filtered list of options based on the search text.
 *
 * @example
 * // Basic usage
 * const filteredList = filter_list_by_text(optionList, 'John');
 *
 * // Ignore specific options during filtering
 * const ignoredOptions = [option1, option2];
 * const filteredListWithIgnore = filter_list_by_text(optionList, 'John', ignoredOptions);
 */

export const filter_list_by_text = (list: Option[], search_text: string, ignore?: Option[]) => {
  return list.filter((option, i) => {
    if (ignore && ignore.includes(option)) {
      return false;
    } else if (
      search_text.length > 0 &&
      (option.sub_text.toLowerCase().includes(search_text.toLowerCase()) ||
        option.label.toLowerCase().includes(search_text.toLowerCase()))
    ) {
      return true;
    } else if (search_text.length === 0) {
      return true;
    } else {
      return false;
    }
  });
};
