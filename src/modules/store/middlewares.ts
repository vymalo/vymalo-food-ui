import type { Middleware, MiddlewareAPI } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { AppDispatch } from '@modules/store/types';
import { addNotification } from '@modules/notification';

export const rtkQueryErrorLogger: Middleware =
  ({ dispatch }: MiddlewareAPI<AppDispatch>) =>
    (next) =>
      (action) => {
        // RTK Query uses `createAsyncThunk` from redux-toolkit under the hood, so we're able to utilize these matchers!
        if (isRejectedWithValue(action)) {
          const message =
            'data' in action.error
              ? (action.error.data as { message: string }).message
              : action.error.message;

          const msg =
            'data' in (action.payload as Record<string, string>)
              ? (action.payload as Record<string, string>).data
              : message;
          if (msg) dispatch(addNotification({ message: msg, type: 'error' }));
        }

        return next(action);
      };
