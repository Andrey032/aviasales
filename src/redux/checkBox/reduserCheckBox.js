import {
  ALL,
  NO_TRANSFERS,
  ONE_TRANSFER,
  TWO_TRANSFERS,
  THREE_TRANSFERS,
} from '../../utils/constants';

const checkBoxState = {
  all: false,
  noTransfers: false,
  oneTransfers: false,
  twoTransfers: false,
  threeTransfers: false,
};

const updateAllState = (state) => {
  return state.oneTransfers && state.twoTransfers && state.threeTransfers;
};

const reduserCheckBox = (state = checkBoxState, action) => {
  switch (action.type) {
    case ALL:
      return {
        all: action.payload,
        noTransfers: action.payload,
        oneTransfers: action.payload,
        twoTransfers: action.payload,
        threeTransfers: action.payload,
      };

    case NO_TRANSFERS:
      return {
        ...state,
        noTransfers: !state.noTransfers,
      };

    case ONE_TRANSFER:
      return {
        ...state,
        oneTransfers: !state.oneTransfers,
        all: updateAllState({
          ...state,
          oneTransfers: !state.oneTransfers,
        }),
      };

    case TWO_TRANSFERS:
      return {
        ...state,
        twoTransfers: !state.twoTransfers,
        all: updateAllState({
          ...state,
          twoTransfers: !state.twoTransfers,
        }),
      };

    case THREE_TRANSFERS:
      return {
        ...state,
        threeTransfers: !state.threeTransfers,
        all: updateAllState({
          ...state,
          threeTransfers: !state.threeTransfers,
        }),
      };

    default:
      return state;
  }
};
export default reduserCheckBox;
