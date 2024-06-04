import { faker } from '@faker-js/faker';

import { SettlementType } from '../../globals/types';
import {
  CREATE_ITEM,
  CREATE_ITEM_FAILURE,
  CREATE_ITEM_SUCCESS,
  FETCH_ITEMS,
  FETCH_ITEMS_FAILURE,
  FETCH_ITEMS_SUCCESS,
} from './action-types';
import { SettlementsActionType } from './actions';

export type StateType = {
  data: SettlementType[];
  isFetching: boolean;
  isUpdating: boolean;
  hasError: boolean;
};

// Some methods for faking the data
const randomNum = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1) + min);

const populateMockData = (length: number = 1) => {
  // @ts-ignore
  const data: SettlementType[] = [...Array.from({ length })].map((item, i) => ({
    id: i,
    createdAt: faker.date.anytime(),
    party: ['a', 'b'][randomNum(0, 1)],
    status: ['pending', 'accepted', 'rejected'][randomNum(0, 2)],
    message: ['', faker.lorem.sentence({ min: 3, max: 10 })][randomNum(0, 1)],
    amount: randomNum(0, 1000),
  }));

  return data;
};

const initialState: StateType = {
  data: populateMockData(20),
  isFetching: false,
  isUpdating: false,
  hasError: false,
};

export const settlementsReducer = (
  state: StateType = initialState,
  action: SettlementsActionType
): StateType => {
  switch (action.type) {
    case FETCH_ITEMS:
      return { ...state, isFetching: true, hasError: false };
    case FETCH_ITEMS_SUCCESS: {
      const { data } = action.payload;

      return { ...state, data, isFetching: false };
    }
    case FETCH_ITEMS_FAILURE: {
      return { ...state, hasError: true, isFetching: false };
    }
    case CREATE_ITEM:
      return { ...state, isUpdating: true, hasError: false };
    case CREATE_ITEM_SUCCESS: {
      const { data: item } = action.payload;
      const { data } = state;

      return {
        ...state,
        data: [item, ...data],
        isUpdating: false,
        hasError: false,
      };
    }
    case CREATE_ITEM_FAILURE: {
      return { ...state, hasError: true, isUpdating: false };
    }
    default:
      return state;
  }
};

export default settlementsReducer;
