export const initialState = {
  loading: false,
  disable: false,
};

export const actionType = {
  set_loading: "set_loading",
  set_disable: "set_disable",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.set_loading:
      return { ...state, loading: action.loading };

    case actionType.set_disable:
      return { ...state, disable: action.disable };

    default:
      return state;
  }
};

export default reducer;
