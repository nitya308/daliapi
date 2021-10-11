/* eslint-disable import/prefer-default-export */
import Posts from '../models/posts';
import User from '../models/user';
import { addPost } from './userService';

const fs = require('fs');
const path = require('path');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

export const createPost = async (userID, club, imageFile, caption, date) => {
  upload.single(imageFile);
  const dateObject = new Date(date);
  const post = new Posts({
    club,
    image: {
      data: fs.readFileSync(path.join(__dirname, '/uploads', imageFile)),
      contentType: 'image/png',
    },
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
