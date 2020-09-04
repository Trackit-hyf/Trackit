import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const InitialState = {
  user: { userId: null, token: null },
  assets: [
    {
      name: 'amazon',
      price: '500',
      amount: '0.15',
      id: '1'
    },
    {
      name: 'apple',
      price: '750',
      amount: '1.3',
      id: '2'
    },
    {
      name: 'zoom',
      price: '2000',
      amount: '6.2',
      id: '3'
    }
  ]
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
