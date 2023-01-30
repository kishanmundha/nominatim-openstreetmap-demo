import { createSlice } from '@reduxjs/toolkit';

interface RootState {
  initialized: boolean;
}

const initialState: RootState = {
  initialized: false,
};

export const rootSlice = createSlice({
  name: 'root',
  initialState,
  reducers: {
    initialized: state => {
      return {
        ...state,
        initialized: true,
      };
    },
  },
});

export const rootActions = rootSlice.actions;
