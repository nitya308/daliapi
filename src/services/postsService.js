/* eslint-disable import/prefer-default-export */
import Posts from '../models/posts';

// to upload an image for a post
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

// creates and saves post to database
export const createPost = async (userID, club, imageFile, caption, date) => {
  upload.single(imageFile);
  const dateObject = new Date(date);
  const post = new Posts({
    userID,
    club,
    image: {
      data: fs.readFileSync(path.join(__dirname, '/uploads', imageFile)),
      contentType: 'image/png',
    },
    caption,
    date: dateObject,
    likes: { likers: null, number: 0 },
  });
  await post.save();
  return post;
};

// retrieve last 20 posts from most recent to least recent
export const getAllPosts = async () => {
  const allPosts = await Posts.find().sort({ date: -1 }).limit(20);
  return allPosts;
};

// retrieve post that matches ID
export const getPostById = async (postId) => {
  const post = await Posts.findById({ postId });
  return post;
};

// find posts about a particular student org/club from most to least recent
export const getPostsByClub = async (club) => {
  const post = await Posts.find(club).sort({ date: -1 });
  return post;
};

// like a post and return the post with the like
export const likePost = async (postID, userID) => {
  const likedPost = await Posts.findByIdAndUpdate(postID, {
    likes: {
      likers: { push: userID },
      number: { $inc: 1 },
    },
  },
  { new: true });
  return likedPost;
};

// unlike a post and return the post with the unlike
export const unlikePost = async (postID, userID) => {
  const unlikedPost = await Posts.findByIdAndUpdate(postID, {
    likes: {
      likers: { pull: userID },
      number: { $dec: 1 },
    },
  },
  { new: true });
  return unlikedPost;
};

// Retrieve all posts made by a particular user
export const getPostsByUser = async (userID) => {
  const posts = await Posts.find(userID).sort({ date: -1 });
  return posts;
};
