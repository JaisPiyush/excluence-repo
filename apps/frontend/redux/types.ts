import { PayloadAction } from "@reduxjs/toolkit";

export type ExtraReducerPayload<T> = {payload: PayloadAction<T>}