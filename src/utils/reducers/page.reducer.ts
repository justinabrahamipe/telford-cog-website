import { SET_PAGE } from "../actions/page.actions";

interface PageState {
  name: string | null;
  isActive: boolean;
  isScrollable: boolean;
}

const initialState: PageState = {
  name: null,
  isActive: true,
  isScrollable: true,
};

export const pageReducer = (state = initialState, action: any): PageState => {
  switch (action.type) {
    case SET_PAGE:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};