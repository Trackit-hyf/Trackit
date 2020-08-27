import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';

// Initial State
const InitialState = {
  assets: [
    {
      assetName: 'amazon',
      assetPrice: '500',
      assetAmount: '0.15',
      assetId: '1'
    },
    {
      assetName: 'apple',
      assetPrice: '750',
      assetAmount: '1.3',
      assetId: '2'
    },
    {
      assetName: 'zoom',
      assetPrice: '2000',
      assetAmount: '6.2',
      assetId: '3'
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
