import { cn } from "../../utils";

type Props = {
  label: string;
  onRemove: () => void;
  isHighlighted?: boolean;
};

export function MultiSelectChip({ label, onRemove, isHighlighted }: Props) {
  return (
    <div
      className={cn(
        "flex flex-none items-center rounded-md bg-gray-100 text-primary text-xs cursor-pointer overflow-hidden",
        isHighlighted && "bg-gray-300"
      )}
    >
      <p className="pl-2 pr-1 py-1">{label}</p>
      <div
        className="text-sm text-gray-400 hover:text-red-400 flex items-center justify-center cursor-pointer pl-1.5 pr-2 py-1 hover:bg-gray-200"
        onClick={(e) => {
          e.stopPropagation();
          onRemove();
        }}
      >
        ×
      </div>
    </div>
  );
}
