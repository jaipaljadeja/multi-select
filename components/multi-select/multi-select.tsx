import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { MultiSelectChip, MultiSelectOption, MultiSelectOptions } from ".";
import { Option } from "../../types";
import { filter_list_by_text } from "../../utils";

type Props = {
  value: Option[];
  onChange: (value: Option[]) => void;
  options: Option[];
  placeholder?: string;
};

export function MultiSelect({ value, onChange, options, placeholder }: Props) {
  // Main States
  const [searchValue, setSearchValue] = useState<string>(""); // State for Input Field
  const [filteredOptions, setFilteredOptions] = useState<Option[]>([]); // Array of Options which are filtered

  // Helper States
  const [focusedIndex, setFocusedIndex] = useState<number>(0); // Focus index for Keyboard Navigation through list
  const [isLasthighlighted, setIsLastHighlighted] = useState<boolean>(false); // Whether last chip is highlighted or not
  const [showList, setShowList] = useState<boolean>(false); // Whether to show list or not

  // Refs
  const inputRef = useRef<HTMLInputElement>(null); // Ref to access input element (for focusing part)

  const removeItem = (item: Option) => {
    const res = [...value]; // Make a copy of list
    const index = res.indexOf(item); // Find Index of Item to Remove
    if (index !== -1) res.splice(index, 1); // Remove Item if present in list
    onChange(res); // Call OnChange
  };

  const addItem = (item: Option) => {
    onChange([...value, item]); // Add Item to the list and Call onChange
    setShowList(false); // Hide the lists
    setSearchValue(""); // after adding the item we clear the search input
  };

  // Handles the Up key navigation in list
  const upHandler = () => {
    setFocusedIndex((i) => (i + filteredOptions.length - 1) % filteredOptions.length);
  };
  // Handles the Down key navigation in list
  const downHandler = () => {
    setFocusedIndex((i) => (i + 1) % filteredOptions.length);
  };
  // Handles the Enter key opertaion in list
  const enterHandler = () => {
    // if search value is empty and the list is also not being shown
    // and if user press enter it should do nothing
    if (searchValue.length === 0 && !showList) {
      return;
    }
    // if option exists then we add
    else if (filteredOptions[focusedIndex]) {
      addItem(filteredOptions[focusedIndex]);
    }
  };

  // Handles the Backspace key operation in the value
  const backspaceHandler = () => {
    // check if the search text is empty and atleast one item is selected
    if (searchValue.length === 0 && value.length > 0) {
      // if the last item is not highlighted
      if (!isLasthighlighted) setIsLastHighlighted(true); // highlight last item
      // if last item already highlighted
      else {
        onChange(value.slice(0, -1)); // delete the last item and call onChange
        setIsLastHighlighted(false); // remove highlight from last item
      }
    }
  };

  // Handles Keyboard Navigation in List and Input Element
  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "ArrowUp":
        e.preventDefault();
        upHandler();
        return true;
      case "ArrowDown":
        e.preventDefault();
        downHandler();
        return true;
      case "Backspace":
        backspaceHandler();
        return true;
      case "Enter":
        e.preventDefault();
        enterHandler();
        return true;
      default:
        return true;
    }
  };

  // Filters the options list based on search text and selected options
  useEffect(() => {
    const filteredList = filter_list_by_text(options, searchValue, value);
    setFilteredOptions(filteredList);
  }, [options, searchValue, value]);

  // Text Input Change Handler
  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value); // Set Search Value
    if (!showList) setShowList(true); // if List is hidden then we show the list
    setFocusedIndex(0); // With every change we set the focus on 1st option again
    // if once pressed backspace and again typed something the highlight should get removed
    if (isLasthighlighted && value.length > 0) {
      setIsLastHighlighted(false);
    }
  };

  return (
    <div
      className="md:w-[28rem] w-80 relative"
      onClick={() => {
        // if option list is already hidden
        if (!showList) {
          // focus on input element
          inputRef?.current?.focus();
          // show the option list
          setShowList(true);
        }
      }}
    >
      <div className="bg-white w-full min-h-[2.6rem] flex flex-wrap gap-2 p-1.5 border border-slate-100 rounded-lg shadow-md shadow-slate-200 focus-within:outline-blue-300 focus-within:outline-1 focus-within:outline">
        {value.map((option, i) => {
          // Rendering Selected Items
          return (
            <MultiSelectChip
              key={option.id}
              label={option.label}
              onRemove={() => removeItem(option)}
              isHighlighted={i === value.length - 1 && isLasthighlighted}
            />
          );
        })}
        <input
          placeholder={placeholder ?? "Search..."}
          onKeyDown={onKeyDown}
          ref={inputRef}
          value={searchValue}
          onBlur={() => setShowList(false)}
          onChange={onInputChange}
          className="pl-1 bg-none placeholder:font-primary max-w-full min-w-[2rem] border-none outline-none font-primary text-xs"
        />
      </div>

      <MultiSelectOptions open={showList && filteredOptions.length > 0}>
        {filteredOptions.map((option, i) => {
          // Rendering Options
          return (
            <MultiSelectOption
              is_focused={focusedIndex === i}
              key={option.id}
              label={option.label}
              sub_text={option.sub_text}
              onAdd={() => addItem(option)}
            />
          );
        })}
      </MultiSelectOptions>
    </div>
  );
}
