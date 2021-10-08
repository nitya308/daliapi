/* eslint-disable import/prefer-default-export */
import Comment from '../models/comment';
import Posts from '../models/posts';
import * as userService from './userService';

export const createComment = async (userId, commentText) => {
  const comment = new Comment({
    commentor: userService.getUserByID(userId).id,
    text: commentText,
  });
  await comment.save();
  return comment;
};

export const getCommentbyPost = async (postID) => {
  const post = await Posts.find(postID);
  const PostComments = post.comments;
  return PostComments;
};

export const getCommentByID = async (commentId) => {
  const comment = await Comment.find({ id: commentId });
  return comment;
};
