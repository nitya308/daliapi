import * as userService from '../services/userService';

export const signUpUser = async (req, res) => {
  try {
    const {
      email, firstName, lastName, password, year, pronouns, favquote, bio, majors, clubs,
    } = req.body;
    const user = await userService.createUser(email, firstName, lastName, password, year, pronouns, favquote, bio, majors, clubs);
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
    const users = await userService.getUsersByMajor(major);
    return res.status(200).json(users);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};

export const addFollower = async (req, res) => {
  try {
    const { userID, followerID } = req.query;
    const user = await userService.getUserByID(userID);
    const follower = await userService.getUserByID(followerID);
    user.followers._id.push(follower._id);
    return res.status(200).json(user);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};
