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
import Modal from '../../components/Modal';
import type { ProviderPropType } from "../../types/types";

export default function MainPage() {
  const [address, setAddress] = useState<string>("");
  const [txHash, setTxHash] = useState<string>("");
  const [data, setData] = useState<null | ProviderPropType>(null);
  const [modal, setModal] = useState<boolean>(false);

  const getDataHandler = async (fn: () => Promise<ProviderPropType | void>) => {
    const result = await fn();
    if (!result) return;
    setData(result);
    setModal(true);
  };
 
  const closeModal = () => {
    setModal(false);
    setData(null);
  };

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
        <div className={styles.actionsGrid}>
          <button
            onClick={() => getDataHandler(() => getBalance(address))}
            className={styles.purpleBtn}
          >
            Баланс
          </button>
          <button
            onClick={() => getDataHandler(() => getBlock())}
            className={styles.purpleBtn}
          >
            Последний блок
          </button>
          <button
            onClick={() => getDataHandler(() => getTx(txHash))}
            className={styles.darkBtn}
          >
            Транзакция
          </button>
          <button
            onClick={() => getDataHandler(() => getReceipt(txHash))}
            className={styles.darkBtn}
          >
            Receipt
          </button>
          <button
            onClick={() => getDataHandler(() => getNonce(address))}
            className={styles.darkBtn}
          >
            Nonce
          </button>
          <button
            onClick={() => getDataHandler(() => getFeeData())}
            className={styles.darkBtn}
          >
            Fee data
          </button>
          <button
            onClick={() =>
              getDataHandler(() => getGasEstimate(address))
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
      {modal || data ? <Modal data={data} onClose={closeModal} /> : null}
    </div>
  );
}