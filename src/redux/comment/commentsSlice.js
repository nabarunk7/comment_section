import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidV4 } from "uuid";

const initialState = {

  currentUser: {
    "image": { 
      "png": "/assets/images/avatars/a1.png",
      "webp": "/assets/images/avatars/a1.webp"
    },
    "username": "Nabarun"
  },

  comments: [
    {
      "id": 1,
      "content": "This looks so good. I have been wondering what's this thing for?",
      "score": 69,
      "user": {
        "image": { 
          "png": "assets/images/avatars/a2.png",
          "webp": "assets/images/avatars/a2.webp"
        },
        "username": "Mr. Lahkar"
      },
      "replies": [{
          "id": 1,
          "content": "Testing the comments section!",
          "score": 7,
          "user": {
            "image": { 
              "png": "assets/images/avatars/a2.png",
              "webp": "assets/images/avatars/a2.webp"
            },
            "username": "Jdeep"
          }
        }
      ]
    },
  ]
}

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {

    addComment: (state, action) => {
      const {content} = action.payload
      const newComment = {
        id: uuidV4(),
        content,
        createdAt: 'Just now',
        score: 0,
        user: state.currentUser,
        replies: [],
      }

      state.comments.push(newComment);
    },

    editComment: (state, action) => {
      const { commentId, content } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        comment.content = content;
      }
    },

    deleteComment: (state, action) => {
      state.comments = state.comments.filter((comment) => comment.id !== action.payload)
    },

    addReply: (state, action) => {
      const { commentId, content, createdAt, replyingTo} = action.payload
      const comment = state.comments.find((comment) => comment.id == commentId)
      if (comment) {
        const newReply = {
          id: uuidV4(),
          content,
          createdAt,
          score: 0,
          user: state.currentUser,
        };

        if (replyingTo) {
          newReply.replyingTo = replyingTo;
        }
        comment.replies.push(newReply)
      }
    },

    editReply: (state, action) => {
      const { commentId, replyId, content } = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply) {
          reply.content = content;
        }
      }
    },

    deleteReply: (state, action) => {
      const { commentId, replyId } = action.payload;

      const comment = state.comments.find((comment) => comment.id === commentId);
      if (comment) {
        const replyIndex = comment.replies.findIndex((reply) => reply.id === replyId);
        if (replyIndex !== -1) {
          comment.replies.splice(replyIndex, 1);
        }
      }
    },

    // score controllers
    upVoteComment: (state, action) => {
      const comment = state.comments.find((comment) => comment.id === action.payload)
      if (comment) {
        comment.score++;
      }
    },
    
    downVoteComment: (state, action) => {
      const comment = state.comments.find((comment) => comment.id === action.payload)
      if (comment && comment.score != 0) {
        comment.score--;
      }
    },

    upVoteReply: (state, action) => {
      const {commentId, replyId} = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);

      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply) {
          reply.score++
        }
      }
    },
    
    downVoteReply: (state, action) => {
      const {commentId, replyId} = action.payload;
      const comment = state.comments.find((comment) => comment.id === commentId);

      if (comment) {
        const reply = comment.replies.find((reply) => reply.id === replyId);
        if (reply && reply.score != 0) {
          reply.score--
        }
      }
    },
  }
});

export const {
  addComment,
  editComment,
  deleteComment,
  addReply,
  editReply,
  deleteReply,
  upVoteComment,
  downVoteComment,
  upVoteReply,
  downVoteReply,
  
} = commentsSlice.actions;

export default commentsSlice.reducer;