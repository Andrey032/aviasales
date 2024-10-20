import {
  FETCH_TICKETS_REQUEST,
  FETCH_TICKETS_SUCCESS,
  FETCH_TICKETS_FAILURE,
} from '../../utils/constants';

const initialState = {
  isFetching: false,
  isError: false,
  items: [],
  error: {},
};

const reducerTickets = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_TICKETS_REQUEST:
      return {
        ...state,
        isFetching: true,
        isError: false,
        error: {},
      };
    case FETCH_TICKETS_SUCCESS:
      return {
        ...state,
        items: action.payload,
        isFetching: false,
      };
    case FETCH_TICKETS_FAILURE:
      return {
        ...state,
        isFetching: false,
        isError: true,
        error: {
          name: action.payload.name,
          message: action.payload.message,
        },
      };
    default:
      return state;
  }
};
export default reducerTickets;
