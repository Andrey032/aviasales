import { CHEAPEST, THE_FASTEST, OPTIMAL } from '../../utils/constants';

export const cheap = () => ({ type: CHEAPEST });
export const fast = () => ({ type: THE_FASTEST });
export const optimal = () => ({ type: OPTIMAL });
