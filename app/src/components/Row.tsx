export default function Row({
  label,
  value,
  mono,
  highlight,
  danger,
}: {
  label: string;
  value: string;
  mono?: boolean;
  highlight?: boolean;
  danger?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-slate-400 shrink-0">{label}</span>
      <span
        className={[
          "text-right break-all",
          mono ? "font-mono text-xs" : "",
          highlight ? "text-emerald-400 font-medium" : "",
          danger ? "text-red-400 font-medium" : "",
          !highlight && !danger ? "text-slate-200" : "",
        ].join(" ")}
      >
        {value}
      </span>
    </div>
  );
}