/* eslint-disable import/prefer-default-export */
import Comment from '../models/comment';

// creates and saves a comment to the database
export const createComment = async (postID, userID, commentText) => {
  const comment = new Comment({
    postID,
    commentor: userID,
    text: commentText,
  });
  await comment.save();
  return comment;
};

// Retrieve all comments on a particular post
export const getCommentbyPost = async (postID) => {
  const postComments = Comment.find(postID);
  return postComments;
};

// Retrieve a comment by ID
export const getCommentByID = async (commentId) => {
  const comment = await Comment.findById(commentId);
  return comment;
};
