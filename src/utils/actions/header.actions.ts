import { AppDispatch, RootState } from "../store";

export const INIT_HEADER = "INIT_HEADER" as const;
export const SHOW_HEADER = "SHOW_HEADER" as const;
export const HIDE_HEADER = "HIDE_HEADER" as const;
export const SET_HEADER_THEME = "SET_HEADER_THEME" as const;

export interface ThemeState {
  passed?: string;
  current?: string;
}

export interface InitHeaderAction {
  type: typeof INIT_HEADER;
  payload: {
    theme: ThemeState;
  };
}

export interface ShowHeaderAction {
  type: typeof SHOW_HEADER;
  payload: {
    isVisible: boolean;
  };
}

export interface HideHeaderAction {
  type: typeof HIDE_HEADER;
  payload: {
    isVisible: boolean;
  };
}

export interface SetHeaderThemeAction {
  type: typeof SET_HEADER_THEME;
  payload: {
    theme: {
      current: string;
    };
  };
}

export const initHeader = (theme: string): InitHeaderAction => {
  return {
    type: INIT_HEADER,
    payload: {
      theme: {
        passed: theme,
        current: theme,
      },
    },
  };
};

export const showHeader = (): ShowHeaderAction => {
  return {
    type: SHOW_HEADER,
    payload: {
      isVisible: true,
    },
  };
};

export const hideHeader = (): HideHeaderAction => {
  return {
    type: HIDE_HEADER,
    payload: {
      isVisible: false,
    },
  };
};

export const setHeaderTheme = (theme?: string) => {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const state = getState().header;
    const currentTheme = theme || state.theme.passed;

    if (state.theme.current !== currentTheme) {
      dispatch({
        type: SET_HEADER_THEME,
        payload: {
          theme: {
            current: currentTheme || '',
          },
        },
      });
    }
  };
};