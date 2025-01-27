import {
  GET_ROLES_REQUEST,
  GET_ROLES_SUCCESS,
  GET_ROLES_FAILURE,
} from "../actionTypes/roleTypes";

const initialState = {
  roles: [],
  loading: false,
  error: null,
  isRolesLoaded: false,
};

const roleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ROLES_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case GET_ROLES_SUCCESS:
      return {
        ...state,
        loading: false,
        roles: action.payload,
        isRolesLoaded: true,
      };
    case GET_ROLES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default roleReducer;
