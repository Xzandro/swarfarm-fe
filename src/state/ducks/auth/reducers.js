import { REHYDRATE } from 'redux-persist/constants';
import types from './types';

/* State shape
{
  isLoading: bool,
  isAuthenticated: bool,
  error: string,
  token: string,
  refresh_token: string,
  user: {
    url: string,
    username: string,
    is_staff: boolean,
    public: boolean,
    timezone: string,
    server: integer,
  },
}
*/

const INITIAL_STATE = {
  isLoading: false,
  isAuthenticated: false,
  error: null,
  token: null,
  refresh_token: null,
  user: null
};

export default function(state = INITIAL_STATE, { type: actionType, payload }) {
  switch (actionType) {
    case REHYDRATE:
      // Only JWT, refresh_token, and user_data
      if (payload.auth) {
        return {
          ...state,
          isLoading: false,
          isAuthenticated: !!payload.auth.token,
          error: null,
          token: payload.auth.token,
          refresh_token: payload.auth.refresh_token,
          user: payload.auth.user
        };
      }
      return state;

    case types.LOGIN:
      return {
        ...state,
        isLoading: true,
        error: null
      };
    case types.LOGIN_COMPLETED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        token: payload.token,
        refresh_token: payload.refresh_token,
        user: payload.user
      };
    case types.LOGIN_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload.errorMessage
      };
    case types.LOGOUT:
      return {
        ...state,
        isLoading: true,
        isAuthenticated: false,
        error: null,
        token: null,
        refresh_token: null,
        user: null
      };
    case types.LOGOUT_COMPLETED:
      return {
        ...state,
        isLoading: false
      };
    case types.REFRESH_JWT:
      return state;
    case types.REFRESH_JWT_COMPLETED:
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        error: null,
        token: payload.token,
        refresh_token: payload.refresh_token,
        user: payload.user
      };
    case types.REFRESH_JWT_FAILED:
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      return state;
  }
}
