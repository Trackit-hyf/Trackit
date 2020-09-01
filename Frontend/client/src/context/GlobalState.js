import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const InitialState = {
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

  const removeAsset = (id) => {
    dispatch({
      type: 'REMOVE_ASSET',
      payload: id
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        assets: state.assets,
        addAsset,
        removeAsset
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
