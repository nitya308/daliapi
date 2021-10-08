/* eslint-disable import/prefer-default-export */
import Posts from '../models/Posts';
import User from '../models/User';
import { addPost } from './userService';

export const createPost = async (userID, club, image, caption, date) => {
  const dateObject = new Date(date);
  const post = new Posts({
    club,
    image,
    caption,
    date: dateObject,
  });
  await addPost(userID, post);
  return post;
};

export const getAllPosts = async () => {
  const allPosts = await Posts.find().sort({ date: -1 });
  return allPosts;
};

export const getPostById = async (postId) => {
  const post = await Posts.find({ id: postId });
  return post;
};

export const getPostsByClub = async (club) => {
  const post = await Posts.find(club).sort({ date: -1 });
  return post;
};

export const likePost = async (postID, userID) => {
  const likedPost = await Posts.findbyIDAndUpdate(postID, {
    likes: {
      likers: { push: User.findbyID(userID) },
      number: { $inc: 1 },
    },
  },
  { new: true });
  return likedPost;
};

export const unlikePost = async (postID, userID) => {
  const unlikedPost = await Posts.findbyIDAndUpdate(postID, {
    likes: {
      likers: { puLL: User.findbyID(userID) },
      number: { $dec: 1 },
    },
  },
  { new: true });
  return unlikedPost;
};

export const addCommentToPost = async (postId, comment) => {
  const post = getPostById(postId);
  post.comments.push(comment.id);
  post.save();
};
