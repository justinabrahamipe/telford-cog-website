import { batch } from "react-redux";
import { AppDispatch } from "../store";
import { setPageActive, setPageInactive } from "./page.actions";
import { AnyAction } from "@reduxjs/toolkit";

export const SET_DRAWER = "SET_DRAWER" as const;

export interface DrawerState {
  isMounted?: boolean;
  isOpen?: boolean;
  type?: string;
}

export interface SetDrawerAction extends AnyAction {
  type: typeof SET_DRAWER;
  payload: DrawerState;
}

export const setDrawer = (state: DrawerState = {}): SetDrawerAction => {
  return {
    type: SET_DRAWER,
    payload: state,
  };
};

export const openDrawer = (type: string) => {
  return (dispatch: AppDispatch) => {
    batch(() => {
      dispatch(setPageInactive());
      dispatch(
        setDrawer({
          isMounted: true,
          isOpen: false,
          type,
        })
      );
    });

    setTimeout(() => {
      dispatch(
        setDrawer({
          isOpen: true,
        })
      );
    }, 150);
  };
};

export const closeDrawer = () => {
  return (dispatch: AppDispatch) => {
    dispatch(
      setDrawer({
        isOpen: false,
      })
    );

    setTimeout(() => {
      batch(() => {
        dispatch(
          setDrawer({
            isMounted: false,
          })
        );

        dispatch(setPageActive());
      });
    }, 500);
  };
};

export const showSearch = () => {
  return (dispatch: AppDispatch) => {
    dispatch(openDrawer("search"));
  };
};

export const showNavigation = () => {
  return (dispatch: AppDispatch) => {
    dispatch(openDrawer("navigation"));
  };
};

export const showLocationMap = () => {
  return (dispatch: AppDispatch) => {
    dispatch(openDrawer("location-map"));
  };
};