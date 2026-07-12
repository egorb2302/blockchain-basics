import { useEffect, useState } from "react";
import {
  transaction,
  getSupply,
  contractTx,
  contractDeposit,
  getContractBalance,
} from "../../signer/signer";
import provider from "../../provider/provider";
import styles from "./style";

const FAUCET_FROM_ADDRESS = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

const isValidAddress = (value: string) => /^0x[a-fA-F0-9]{40}$/.test(value);
const isValidAmount = (value: string) => {
  const n = Number(value);
  return value.trim() !== "" && !Number.isNaN(n) && n > 0;
};

export default function ActionsMenu() {
  const [address, setAddress] = useState<string>("");
  const [eth, setEth] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const [supplyLoading, setSupplyLoading] = useState<boolean>(false);
  const [supplyError, setSupplyError] = useState<string>("");
  const [supplyDone, setSupplyDone] = useState<boolean>(false);

  // --- Контракт: баланс ---
  const [contractBalance, setContractBalance] = useState<string>("");
  const [balanceLoading, setBalanceLoading] = useState<boolean>(false);
  const [balanceError, setBalanceError] = useState<string>("");

  // --- Контракт: депозит ---
  const [depositAmount, setDepositAmount] = useState<string>("");
  const [depositLoading, setDepositLoading] = useState<boolean>(false);
  const [depositError, setDepositError] = useState<string>("");
  const [depositDone, setDepositDone] = useState<boolean>(false);

  // --- Контракт: отправка через sendTo ---
  const [contractTo, setContractTo] = useState<string>("");
  const [contractValue, setContractValue] = useState<string>("");
  const [contractTxLoading, setContractTxLoading] = useState<boolean>(false);
  const [contractTxError, setContractTxError] = useState<string>("");
  const [contractTxHash, setContractTxHash] = useState<string>("");
  const [contractTxCopied, setContractTxCopied] = useState<boolean>(false);

  const canSubmit = isValidAddress(address) && isValidAmount(eth) && !loading;
  const canDeposit = isValidAmount(depositAmount) && !depositLoading;
  const canContractSend =
    isValidAddress(contractTo) && isValidAmount(contractValue) && !contractTxLoading;

  const fetchContractBalance = async () => {
    setBalanceError("");
    setBalanceLoading(true);
    try {
      const balance = await getContractBalance();
      setContractBalance(balance);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не удалось получить баланс контракта";
      console.error("getContractBalance failed:", err);
      setBalanceError(message);
    } finally {
      setBalanceLoading(false);
    }
  };

  useEffect(() => {
    getContractBalance();
  }, []);

  const handleSend = async () => {
    if (!canSubmit) return;

    setError("");
    setTxHash("");
    setLoading(true);

    try {
      const result = await transaction(address, eth);
      if (typeof result === "string") {
        setTxHash(result);
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не удалось отправить транзакцию";
      console.error("transaction failed:", err);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGetSupply = async () => {
    setSupplyError("");
    setSupplyDone(false);
    setSupplyLoading(true);

    try {
      const signer = await provider.getSigner();
      const to = await signer.getAddress();
      await getSupply(FAUCET_FROM_ADDRESS, to, "100");
      setSupplyDone(true);
      setTimeout(() => setSupplyDone(false), 2500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не удалось получить тестовые ETH";
      console.error("getSupply failed:", err);
      setSupplyError(message);
    } finally {
      setSupplyLoading(false);
    }
  };

  const handleDeposit = async () => {
    if (!canDeposit) return;

    setDepositError("");
    setDepositDone(false);
    setDepositLoading(true);

    try {
      await contractDeposit(depositAmount);
      setDepositDone(true);
      setDepositAmount("");
      await fetchContractBalance(); // баланс контракта изменился — обновляем
      setTimeout(() => setDepositDone(false), 2500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не удалось внести депозит";
      console.error("contractDeposit failed:", err);
      setDepositError(message);
    } finally {
      setDepositLoading(false);
    }
  };

  const handleContractSend = async () => {
    if (!canContractSend) return;

    setContractTxError("");
    setContractTxHash("");
    setContractTxLoading(true);

    try {
      const hash = await contractTx(contractTo, contractValue);
      setContractTxHash(hash);
      setContractTo("");
      setContractValue("");
      await fetchContractBalance(); // баланс контракта изменился — обновляем
    } catch (err) {
      const message = err instanceof Error ? err.message : "Не удалось отправить транзакцию через контракт";
      console.error("contractTx failed:", err);
      setContractTxError(message);
    } finally {
      setContractTxLoading(false);
    }
  };

  const handleCopyHash = async () => {
    if (!txHash) return;
    try {
      await navigator.clipboard.writeText(txHash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleCopyContractTxHash = async () => {
    if (!contractTxHash) return;
    try {
      await navigator.clipboard.writeText(contractTxHash);
      setContractTxCopied(true);
      setTimeout(() => setContractTxCopied(false), 1500);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  return (
    <div className={styles.base}>
      <div className={styles.postbase}>
        <div className={styles.tiWrapper}>
          <h1 className={styles.title}>Send ETH</h1>
          <p className={styles.labelsP}>Отправка ETH на любой адрес</p>
        </div>

        <div className={styles.spacing}>
          <label className={styles.labelsP}>Адрес получателя</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            disabled={loading}
            className={styles.inputs}
          />
          {address.length > 0 && !isValidAddress(address) && (
            <p className="text-xs text-red-400">Похоже, это не валидный адрес (0x + 40 hex-символов)</p>
          )}
        </div>

        <div className={styles.spacing}>
          <label className={styles.labelsP}>Количество ETH</label>
          <input
            value={eth}
            onChange={(e) => setEth(e.target.value)}
            placeholder="0.0"
            type="number"
            min="0"
            step="any"
            disabled={loading}
            className={styles.inputs}
          />
        </div>

        <button onClick={handleSend} disabled={!canSubmit} className={styles.fullBtn}>
          {loading ? "Отправка..." : "Отправить ETH"}
        </button>

        {error && (
          <div className={styles.errorBox}>
            <p className={styles.errorText}>Ошибка: {error}</p>
          </div>
        )}

        {txHash && (
          <div className={styles.successBox}>
            <p className={styles.successText}>Отправлено</p>
            <button onClick={handleCopyHash} className={styles.copyButton} title="Скопировать хэш">
              <span className={styles.copyValue}>{txHash}</span>
              <span className={copied ? styles.copyIconDone : styles.copyIcon}>
                {copied ? "✓" : "⧉"}
              </span>
            </button>
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.spacing}>
          <p className={styles.labelsP}>Тестовые средства</p>
          <button onClick={handleGetSupply} disabled={supplyLoading} className={styles.greenBtnFull}>
            {supplyLoading ? "Получение..." : "Получить 100 ETH"}
          </button>
        </div>

        {supplyError && (
          <div className={styles.errorBox}>
            <p className={styles.errorText}>Ошибка: {supplyError}</p>
          </div>
        )}

        {supplyDone && (
          <div className={styles.successBox}>
            <p className={styles.successText}>Готово — 100 ETH зачислено</p>
          </div>
        )}

        <div className={styles.divider} />

        {/* --- Блок работы с контрактом --- */}
        <div className={styles.tiWrapper}>
          <h2 className={styles.title}>Contract</h2>
          <p className={styles.labelsP}>Баланс, депозит и перевод через контракт</p>
        </div>

        <div className={styles.balanceCard}>
          <div>
            <p className={styles.balanceLabel}>Баланс в контракте</p>
            <p className={styles.balanceValue}>
              {balanceLoading ? "..." : `${contractBalance || "0"} ETH`}
            </p>
          </div>
          <button onClick={fetchContractBalance} disabled={balanceLoading} className={styles.refreshBtn}>
            Обновить
          </button>
        </div>

        {balanceError && (
          <div className={styles.errorBox}>
            <p className={styles.errorText}>Ошибка: {balanceError}</p>
          </div>
        )}

        <div className={styles.spacing}>
          <label className={styles.labelsP}>Депозит</label>
          <input
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="0.0"
            type="number"
            min="0"
            step="any"
            disabled={depositLoading}
            className={styles.inputs}
          />
        </div>
        <button onClick={handleDeposit} disabled={!canDeposit} className={styles.fullBtn}>
          {depositLoading ? "Внесение..." : "Внести депозит"}
        </button>

        {depositError && (
          <div className={styles.errorBox}>
            <p className={styles.errorText}>Ошибка: {depositError}</p>
          </div>
        )}
        {depositDone && (
          <div className={styles.successBox}>
            <p className={styles.successText}>Депозит внесён</p>
          </div>
        )}

        <div className={styles.spacing}>
          <label className={styles.labelsP}>Отправить через контракт — адрес</label>
          <input
            value={contractTo}
            onChange={(e) => setContractTo(e.target.value)}
            placeholder="0x..."
            disabled={contractTxLoading}
            className={styles.inputs}
          />
        </div>
        <div className={styles.spacing}>
          <label className={styles.labelsP}>Количество ETH</label>
          <input
            value={contractValue}
            onChange={(e) => setContractValue(e.target.value)}
            placeholder="0.0"
            type="number"
            min="0"
            step="any"
            disabled={contractTxLoading}
            className={styles.inputs}
          />
        </div>
        <button onClick={handleContractSend} disabled={!canContractSend} className={styles.fullBtn}>
          {contractTxLoading ? "Отправка..." : "Отправить через контракт"}
        </button>

        {contractTxError && (
          <div className={styles.errorBox}>
            <p className={styles.errorText}>Ошибка: {contractTxError}</p>
          </div>
        )}

        {contractTxHash && (
          <div className={styles.successBox}>
            <p className={styles.successText}>Отправлено</p>
            <button
              onClick={handleCopyContractTxHash}
              className={styles.copyButton}
              title="Скопировать хэш"
            >
              <span className={styles.copyValue}>{contractTxHash}</span>
              <span className={contractTxCopied ? styles.copyIconDone : styles.copyIcon}>
                {contractTxCopied ? "✓" : "⧉"}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}