interface SearchState {
  isFocused: boolean;
}

const initialState: SearchState = {
  isFocused: false,
};

export const searchReducer = (state = initialState, action: any): SearchState => {
  switch (action.type) {
    case "SET_SEARCH":
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};