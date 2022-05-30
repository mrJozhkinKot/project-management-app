import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface GlobalStateInterface {
  isAuth: boolean;
  token: string;
  userId: string;
  login: string;
  userName: string;
  language: string;
}

const initialState: GlobalStateInterface = {
  isAuth: true,
  token: '',
  userId: '',
  login: '',
  userName: '',
  language: 'EN',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setIsAuth(state, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
    setLogin(state, action: PayloadAction<string>) {
      state.login = action.payload;
    },
    setUserName(state, action: PayloadAction<string>) {
      state.userName = action.payload;
    },
    setLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
  },
});

export default globalSlice.reducer;
