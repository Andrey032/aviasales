import {
  ALL,
  NO_TRANSFERS,
  ONE_TRANSFER,
  TWO_TRANSFERS,
  THREE_TRANSFERS,
} from '../../utils/constants';
import { createAction } from '@reduxjs/toolkit';

export const allAction = createAction(ALL, (state) => ({
  payload: state,
}));
export const noTransfersAction = createAction(NO_TRANSFERS);
export const oneTransfersAction = createAction(ONE_TRANSFER);
export const twoTransfersAction = createAction(TWO_TRANSFERS);
export const threeTransfersAction = createAction(THREE_TRANSFERS);
