import { createSlice } from "@reduxjs/toolkit";

import { LIVE_CHAT_OFFSET } from "../utils/constants";

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.splice(LIVE_CHAT_OFFSET, 1);

      state.messages.push(action.payload);
    },
  },
});

export default chatSlice.reducer;
export const { addMessage } = chatSlice.actions;
