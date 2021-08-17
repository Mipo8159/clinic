import { User } from '../../Types';

export interface State {
  authenticated: boolean;
  user: User;
  loading: boolean;
}

export interface Action {
  type: string;
  payload: any;
}
