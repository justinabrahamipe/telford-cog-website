interface TabsState {
  selection: Record<string, string>;
}

const initialState: TabsState = {
  selection: {},
};

export const tabsReducer = (state = initialState, action: any): TabsState => {
  switch (action.type) {
    case "SELECT_TAB":
      if (!action.payload) return state;
      return {
        ...state,
        selection: {
          ...state.selection,
          [action.payload.set]: action.payload.tab,
        },
      };

    default:
      return state;
  }
};