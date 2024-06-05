/**
 * Global TS types
 */

import { PARTIES, STATUSES } from './const';

export type SettlementStatusType = (typeof STATUSES)[keyof typeof STATUSES];
export type SettlementPartyType = (typeof PARTIES)[keyof typeof PARTIES];

export type SettlementType = {
  id: number;
  createdAt: string;
  party: SettlementPartyType;
  status: SettlementStatusType;
  amount: number;
};
