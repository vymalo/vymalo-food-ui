import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NotifMessage {
  id: string;
  message: string;
  description?: string;
  type?: 'info' | 'error' | 'warning' | 'success';
}

export interface NotificationState {
  messages: NotifMessage[];
}

const initialState = {
  messages: [],
} satisfies NotificationState as NotificationState;

const slice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    clear(state) {
      state.messages = [];
    },
    remove(state, action: PayloadAction<string>) {
      state.messages = state.messages.filter((p) => p.id !== action.payload);
    },
    add(state, action: PayloadAction<Omit<NotifMessage, 'id'>>) {
      state.messages.push({
        id: new Date().getTime().toString(),
        message: action.payload.message,
        type: action.payload.type || 'info',
        description: action.payload.description,
      });
    },
  },
});

export const {
  clear: clearNotifications,
  remove: removeNotification,
  add: addNotification,
} = slice.actions;

export const reducerNotification = slice.reducer;
