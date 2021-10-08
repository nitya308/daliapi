import * as userService from '../services/userService';
import { getPostById } from '../services/postsService';

export const signUpUser = async (req, res) => {
  try {
    const {
      email, firstName, lastName, password,
    } = req.body;
    const user = await userService.createUser(email, firstName, lastName, password);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const signInUser = async (req, res) => {
  try {
    const userData = await userService.signInUser(req.user);
    return res.status(200).json(userData);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const { firstName, lastName } = req.query;
    const users = await userService.getUsersByName(firstName, lastName);
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const searchUsersByClub = async (req, res) => {
  try {
    const { club } = req.query;
    const users = await userService.getUsersByClub(club);
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const searchUsersByMajor = async (req, res) => {
  try {
    const { major } = req.query;
    const users = await userService.getUsersByClub(major);
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const addFollower = async (req, res) => {
  try {
    const { userID, otherUserID } = req.query;
    const user = await userService.getUserByID(userID);
    const otherUSer = await userService.getUserByID(otherUserID);
    user.followers.id.push(otherUSer.id);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const getPosts = async (req, res) => {
  const { userID } = req.query;
  const user = userService.getUserByID(userID);
  const postIds = user.posts;
  return postIds.map((id) => {
    return getPostById(id);
  });
};
