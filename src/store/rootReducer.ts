import { combineReducers, Reducer } from '@reduxjs/toolkit';

import { SettlementsActionType } from './settlements/actions';
import settlementsReducer, { StateType } from './settlements/reducers';

export type RootStateType = {
  settlements: StateType;
};

// @ts-ignore
const rootReducer: Reducer<RootStateType, SettlementsActionType> =
  combineReducers({
    settlements: settlementsReducer,
  });

export default rootReducer;
