import { SET_DRAWER } from "../actions/drawer.actions";

interface DrawerState {
  isMounted: boolean;
  isOpen: boolean;
  type: string | null;
}

const initialState: DrawerState = {
  isMounted: false,
  isOpen: false,
  type: null,
};

export const drawerReducer = (state = initialState, action: any): DrawerState => {
  switch (action.type) {
    case SET_DRAWER:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};