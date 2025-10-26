import { AppDispatch } from "../store";
import { AnyAction } from "@reduxjs/toolkit";

export const SET_PAGE = "SET_PAGE" as const;

export interface PageState {
  name?: string;
  isActive?: boolean;
  isScrollable?: boolean;
}

export interface SetPageAction extends AnyAction {
  type: typeof SET_PAGE;
  payload: PageState;
}

export const setPage = (state: PageState = {}): SetPageAction => {
  return {
    type: SET_PAGE,
    payload: state,
  };
};

export const setPageName = (name: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(setPage({ name }));
  };
};

export const setPageActive = () => {
  return (dispatch: AppDispatch) => {
    dispatch(
      setPage({
        isActive: true,
        isScrollable: true,
      })
    );
  };
};

export const setPageInactive = () => {
  return (dispatch: AppDispatch) => {
    dispatch(
      setPage({
        isActive: false,
        isScrollable: false,
      })
    );
  };
};