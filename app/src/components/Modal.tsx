import type { ProviderPropType } from "../types/types";
import RenderBody from './ModalBody';

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

        <div className="space-y-3">{RenderBody(data)}</div>
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
  tokenBalance: 'Баланс по токену',
}