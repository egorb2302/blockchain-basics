import { useState } from "react";
import {
  getBalance,
  getBlock,
  getTx,
  getReceipt,
  getGasEstimate,
  getFeeData,
  getNonce,
  subscribeOnNewBlock,
} from "../../utils/ethers";
import styles from './styles';

export default function MainPage() {
  const [address, setAddress] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");

  return (
    <div className={styles.base}>
      <div className={styles.postbase}>
        <header className={styles.spacing}>
          <h1 className={styles.title}>Wallet Dashboard</h1>
          <p className={styles.labelsP}>
            Your own dashbord for comfortable wallet checking.
          </p>
        </header>
        <div className={styles.spacing}>
          <label className={styles.labelsP}>Адрес кошелька</label>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x..."
            className={styles.inputs}
          />
        </div>
        <div className={styles.spacing}>
          <label className={styles.labelsP}>Хэш транзакции</label>
          <input
            value={txHash}
            onChange={(e) => setTxHash(e.target.value)}
            placeholder="0x..."
            className={styles.inputs}
          />
        </div>

        {/* Кнопки действий */}
        <div className={styles.actionsGrid}>
          <button
            onClick={() => getBalance(address)}
            className={styles.purpleBtn}
          >
            Баланс
          </button>

          <button
            onClick={() => getBlock()}
            className={styles.purpleBtn}
          >
            Последний блок
          </button>

          <button
            onClick={() => getTx(txHash)}
            className={styles.darkBtn}
          >
            Транзакция
          </button>

          <button
            onClick={() => getReceipt(txHash)}
            className={styles.darkBtn}
          >
            Receipt
          </button>

          <button
            onClick={() => getNonce(address)}
            className={styles.darkBtn}
          >
            Nonce
          </button>

          <button
            onClick={() => getFeeData()}
            className={styles.darkBtn}
          >
            Fee data
          </button>

          <button
            onClick={() =>
              getGasEstimate({ to: address, value: BigInt(0) })
            }
            className={styles.darkBtn}
          >
            Оценка газа
          </button>

          <button
            onClick={() => subscribeOnNewBlock()}
            className={styles.greenBtn}
          >
            Подписаться на блоки
          </button>
        </div>

        <p className={styles.tinyTxt}>
          Contact with us if you have questions or suggestions with that mail<br/>
          <a className="hover:text-indigo-500" type="email" href="zxcgovnoedig@gmail.com">
              zxcgovnoedig@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}