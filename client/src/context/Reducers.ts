import { Action, State } from './ContextTypes';
import { ACTIONS } from './Actions';

export const reducers = (state: State, { type, payload }: Action) => {
  switch (type) {
    case ACTIONS.LOGIN:
      return { ...state, authenticated: true, user: payload };
    case ACTIONS.LOGOUT:
      return { ...state, authenticated: false, user: null };
    case ACTIONS.STOP_LOADING:
      return { ...state, loading: false };
    default:
      throw new Error(`Unknown action type: ${type}`);
  }
};
