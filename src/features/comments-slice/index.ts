import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IComment {
  postId: number;
  author: number;
  body: string;
}

export interface CommentsState {
  comments: IComment[];
}

const initialState: CommentsState = {
  comments: [],
};

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    addComment: (state, action: PayloadAction<IComment>) => {
      state.comments = [...state.comments, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addComment } = commentsSlice.actions;

export default commentsSlice.reducer;
