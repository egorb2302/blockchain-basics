import type { ProviderPropType } from "../types/types";

export default function Modal({
  data,
  onClose,
}: {
  data: ProviderPropType | null;
  onClose: () => void;
}) {
  if (!data) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 space-y-4"
      >
        <header className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {titleByType[data.type]}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 text-sm"
          >
            Закрыть
          </button>
        </header>

        <div className="space-y-3">{renderBody(data)}</div>
      </div>
    </div>
  );
}

const titleByType: Record<ProviderPropType["type"], string> = {
  balance: "Баланс",
  block: "Последний блок",
  tx: "Транзакция",
  receipt: "Receipt",
  gas: "Оценка газа",
  fee: "Fee data",
  nonce: "Nonce",
};

function renderBody(data: ProviderPropType) {
  switch (data.type) {
    case "balance":
      return (
        <>
          <Row label="Адрес" value={data.address} mono />
          <Row label="Баланс" value={`${data.value} ETH`} highlight />
        </>
      );

    case "block":
      return (
        <>
          <Row label="Номер блока" value={data.number.toString()} highlight />
          <Row
            label="Время"
            value={new Date(data.timestamp * 1000).toLocaleString()}
          />
        </>
      );

    case "tx":
      return (
        <>
          <Row label="Хэш" value={data.hash} mono />
          <Row label="От" value={data.from} mono />
          <Row label="Кому" value={data.to ?? "—"} mono />
          <Row label="Значение" value={`${data.value} ETH`} highlight />
        </>
      );

    case "receipt":
      return (
        <>
          <Row label="Хэш" value={data.hash} mono />
          <Row
            label="Статус"
            value={data.status === 1 ? "Успешно" : "Ошибка"}
            highlight={data.status === 1}
            danger={data.status !== 1}
          />
          <Row label="Использовано газа" value={data.gasUsed} />
        </>
      );

    case "gas":
      return <Row label="Оценка газа" value={data.estimate} highlight />;

    case "fee":
      return (
        <>
          <Row label="Gas price" value={data.gasPrice ?? "—"} />
          <Row label="Max fee per gas" value={data.maxFeePerGas ?? "—"} />
        </>
      );

    case "nonce":
      return (
        <>
          <Row label="Адрес" value={data.address} mono />
          <Row label="Nonce" value={data.value.toString()} highlight />
        </>
      );

    default:
      return null;
  }
}

function Row({
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