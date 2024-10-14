import { CHEAPEST, THE_FASTEST, OPTIMAL } from '../../utils/constants';

const reduserTab = (state = '', action) => {
  switch (action.type) {
    case CHEAPEST:
      return 'ДЕШЕВЫЙ';
    case THE_FASTEST:
      return 'БЫСТРЫЙ';
    case OPTIMAL:
      return 'ОПТИМАЛ';

    default:
      return state;
  }
};
export default reduserTab;
