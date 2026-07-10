export type ProviderPropType =
  | { type: "balance"; address: string; value: string }
  | { type: "block"; number: number; timestamp: number }
  | { type: "tx"; hash: string; from: string; to: string | null; value: string }
  | { type: "receipt"; hash: string; status: number | null; gasUsed: string }
  | { type: "gas"; estimate: string }
  | { type: "fee"; gasPrice: string | null; maxFeePerGas: string | null }
  | { type: "nonce"; address: string; value: number }
  | { type: "tokenBalance"; value: string; address: string, token: string};