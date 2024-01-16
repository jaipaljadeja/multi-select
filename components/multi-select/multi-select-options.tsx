type Props = {
  open?: boolean;
  children: React.ReactNode;
};

export function MultiSelectOptions({ children, open = false }: Props) {
  if (open)
    return (
      <div
        onMouseDown={(e) => e.preventDefault()}
        className="absolute top-full max-h-60 overflow-auto left-0 w-full p-1.5 rounded-xl my-2 bg-white border border-slate-100 shadow-md shadow-slate-200 divide-y divide-slate-100"
      >
        {children}
      </div>
    );
  else return null;
}
