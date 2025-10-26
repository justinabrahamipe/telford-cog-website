import {
  INIT_HEADER,
  SHOW_HEADER,
  HIDE_HEADER,
  SET_HEADER_THEME,
  InitHeaderAction,
  ShowHeaderAction,
  HideHeaderAction,
  SetHeaderThemeAction,
} from "../actions/header.actions";

interface HeaderState {
  isVisible: boolean;
  theme: {
    default: string;
    passed: string | null;
    current: string | null;
  };
}

const initialState: HeaderState = {
  isVisible: false,
  theme: {
    default: "transparent",
    passed: null,
    current: null,
  },
};

type HeaderActionTypes = InitHeaderAction | ShowHeaderAction | HideHeaderAction | SetHeaderThemeAction;

export const headerReducer = (state = initialState, action: any): HeaderState => {
  switch (action.type) {
    case INIT_HEADER:
    case SET_HEADER_THEME:
      return {
        ...state,
        theme: {
          ...state.theme,
          ...action.payload.theme,
        },
      };

    case SHOW_HEADER:
    case HIDE_HEADER:
      return {
        ...state,
        isVisible: action.payload.isVisible,
      };

    default:
      return state;
  }
};