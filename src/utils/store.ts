import { configureStore } from '@reduxjs/toolkit';
import { drawerReducer } from './reducers/drawer.reducer';
import { headerReducer } from './reducers/header.reducer';
import { pageReducer } from './reducers/page.reducer';
import { searchReducer } from './reducers/search.reducer';
import { tabsReducer } from './reducers/tabs.reducer';

export const store = configureStore({
  reducer: {
    drawer: drawerReducer,
    header: headerReducer,
    page: pageReducer,
    search: searchReducer,
    tabs: tabsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;