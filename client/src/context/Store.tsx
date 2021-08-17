import { createContext, useReducer, useContext, useEffect } from 'react';
import { State } from './ContextTypes';
import { reducers } from './Reducers';
import Axios from 'axios';

/* STATE & DISPATCH */
const StateContext = createContext<State>({
  authenticated: false,
  user: null,
  loading: true,
});
const DispatchContext = createContext(null);

/* PROVIDER */
export const Provider = ({ children }: { children: React.ReactNode }) => {
  const initialState = { authenticated: false, user: null, loading: true };
  const [state, defaultDispatch] = useReducer(reducers, initialState);

  const dispatch = (type: string, payload?: any) => {
    defaultDispatch({ type, payload });
  };

  useEffect(() => {
    Axios.get('/auth/access')
      .then((res) => dispatch('LOGIN', res.data))
      .catch((err) => console.log(err))
      .finally(() => dispatch('STOP_LOADING'));
  }, []);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
export const useDispatchContext = () => useContext(DispatchContext);
