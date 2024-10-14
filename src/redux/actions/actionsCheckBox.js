import {
  ALL,
  NO_TRANSFERS,
  ONE_TRANSFER,
  TWO_TRANSFERS,
  THREE_TRANSFERS,
} from '../../utils/constants';

export const allAction = (state) => {
  return { type: ALL, payload: state };
};
export const noTransfersAction = { type: NO_TRANSFERS };
export const oneTransfersAction = { type: ONE_TRANSFER };
export const twoTransfersAction = { type: TWO_TRANSFERS };
export const threeTransfersAction = { type: THREE_TRANSFERS };
