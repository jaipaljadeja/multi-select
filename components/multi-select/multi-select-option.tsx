import { useEffect, useRef } from "react";
import { cn } from "../../utils";

type Props = {
  label: string;
  sub_text?: string;
  is_focused?: boolean;
  onAdd: () => void;
};

export function MultiSelectOption({ label, sub_text, is_focused = false, onAdd }: Props) {
  // Ref used to access individual item
  const ref = useRef<HTMLDivElement>(null);

  // As we are doing manual focus management
  // We need to keep selected item into the view when using up down arrow keys
  // Because of overflow in the suggestions list
  useEffect(() => {
    if (is_focused && ref.current) {
      ref.current.scrollIntoView({ behavior: "auto", block: "nearest" });
    }
  }, [is_focused]);

  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        onAdd();
      }}
      className={cn(
        "text-xs text-primary whitespace-nowrap p-2 gap-3 rounded-md hover:bg-gray-100 cursor-pointer flex items-center justify-between",
        is_focused && "bg-gray-100"
      )}
    >
      {label}
      <span className="text-xs text-gray-400 font-thin truncate">{sub_text}</span>
    </div>
  );
}
