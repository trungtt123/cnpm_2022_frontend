import { createSlice } from '@reduxjs/toolkit';

const detailroomSlice =  createSlice({
  name: 'detailroom',
  initialState: {
    isDetailVisible: false
  },
  reducers: {
    isDetailVisibleChange: (state) => {
      state.isDetailVisible = ! state.isDetailVisible;
    },
  },
});

export default detailroomSlice;

