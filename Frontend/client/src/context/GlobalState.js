import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const InitialState = {
  user: { userId: null, token: null },
  assets: []
};

// Create Context
export const GlobalContext = createContext(InitialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, InitialState);

  // Actions
  const addAsset = (asset) => {
    dispatch({
      type: 'ADD_ASSET',
      payload: asset
    });
  };

  const removeAsset = (assetId) => {
    dispatch({
      type: 'REMOVE_ASSET',
      payload: assetId
    });
  };

  const loginUser = (user) => {
    dispatch({
      type: 'LOGIN_USER',
      payload: user
    });
  };

  const logoutUser = (user) => {
    dispatch({
      type: 'LOGOUT_USER',
      payload: user
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        assets: state.assets,
        addAsset,
        removeAsset,
        user: state.user,
        loginUser,
        logoutUser
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
