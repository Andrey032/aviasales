import { CHEAPEST, THE_FASTEST, OPTIMAL } from '../../utils/constants';
import { createAction } from '@reduxjs/toolkit';

export const cheap = createAction(CHEAPEST);
export const fast = createAction(THE_FASTEST);
export const optimal = createAction(OPTIMAL);
