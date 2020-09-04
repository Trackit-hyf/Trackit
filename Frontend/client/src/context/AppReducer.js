export default (state, action) => {
  switch (action.type) {
    case 'ADD_ASSET':
      return {
        ...state,
        assets: [action.payload, ...state.assets]
      };

    case 'REMOVE_ASSET':
      return {
        ...state,
        assets: state.assets.filter((asset) => {
          return asset.id !== action.payload;
        })
      };
    case 'LOGIN_USER':
      return {
        ...state,
        user: { ...action.payload }
      };
    case 'LOGOUT_USER':
      return {
        ...state,
        user: { userId: null, token: null }
      };

    default:
      return state;
  }
};
