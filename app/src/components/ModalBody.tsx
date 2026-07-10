import type {ProviderPropType} from '../types/types';
import Row from './Row';

export default function RenderBody(data: ProviderPropType) {
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

    case "tokenBalance":
        return (
          <>
            <Row label="Баланс" value={data.value} />
            <Row label="Токен" value={data.token} />
          </>
        )

    default:
      return null;
  }
}