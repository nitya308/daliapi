/* eslint-disable import/prefer-default-export */
import * as postsService from '../services/postsService';
import * as userService from '../services/userService';
import { getCommentByID } from '../services/commentService';
import { getPostById } from '../services/postsService';

export const createNewPost = async (req, res) => {
  try {
    const {
      userID, club, image, caption, date,
    } = req.body;
    const user = await postsService.createPost(userID, club, image, caption, date);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await postsService.getAllPosts();
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const getPostsByUser = async (req, res) => {
  const { userID } = req.query;
  const user = userService.getUserByID(userID);
  const postIds = user.posts;
  return postIds.map((id) => {
    return getPostById(id);
  });
};

export const searchPostsByUser = async (req, res) => {
  try {
    const { userID } = req.query;
    const posts = await postsService.getPostsyUser(userID);
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const searchPostsByClub = async (req, res) => {
  try {
    const { club } = req.query;
    const posts = await postsService.getPostsbyClub(club);
    return res.status(200).json(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const likePost = async (req, res) => {
  try {
    const { postID, userID } = req.body;
    const likedpost = await postsService.likePost(postID, userID);
    return res.status(200).json(likedpost);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const unlikePost = async (req, res) => {
  try {
    const { postID, userID } = req.body;
    const unlikedpost = await postsService.unlikePost(postID, userID);
    return res.status(200).json(unlikedpost);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const getComments = async (req, res) => {
  try {
    const { postID } = req.query;
    const post = postsService.getPostById(postID);
    const commentIDs = post.comments;
    return commentIDs.map((id) => {
      return getCommentByID(id);
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};
