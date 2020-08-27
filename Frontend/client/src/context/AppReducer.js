export default (state, action) => {
  switch (action.type) {
    case 'ADD_ASSET':
      return {
        assets: [action.payload, ...state.assets]
      };

    case 'REMOVE_ASSET':
      return {
        assets: state.assets.filter((asset) => {
          return asset.assetId !== action.payload;
        })
      };

    default:
      return state;
  }
};
