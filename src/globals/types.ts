/**
 * Global TS types
 */

export type SettlementStatusType = 'pending' | 'accepted' | 'rejected';
export type SettlementPartyType = 'a' | 'b';

export type SettlementType = {
  id: number;
  createdAt: string;
  party: SettlementPartyType;
  status: SettlementStatusType;
  amount: number;
};
