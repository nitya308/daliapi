/* eslint-disable import/prefer-default-export */
import Comment from '../models/comment';
import Posts from '../models/posts';
import { addCommentToPost } from './postsService';

export const createComment = async (postID, userID, commentText) => {
  const comment = new Comment({
    commentor: userID,
    text: commentText,
  });
  await comment.save();
  await addCommentToPost(postID, comment);
  return comment;
};

export const getCommentbyPost = async (postID) => {
  const post = await Posts.findById(postID);
  const PostComments = post.comments;
  return PostComments;
};

export const getCommentByID = async (commentId) => {
  const comment = await Comment.findById(commentId);
  return comment;
};
