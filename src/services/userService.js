import jwt from 'jwt-simple';
import User from '../models/User';

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const createUser = async (email, firstName, lastName, password, year, pronouns, favquote, bio, majors, clubs) => {
  const user = new User({
    email,
    firstName,
    lastName,
    password,
    /*     year,
    pronouns,
    favquote,
    bio,
    majors,
    clubs, */
  });
  await user.save();
  return user;
};

export const signInUser = async (user) => {
  const token = tokenForUser(user);
  return { token, email: user.email };
};

export const getUserByID = async (userID) => {
  const user = await User.findByID(userID);
  return user;
};

export const getUsersByName = async (firstName, lastName) => {
  const users = await User.find({ $or: [{ firstName }, { lastName }] });
  return users;
};

export const getUsersByMajor = async (major) => {
  const user = await User.find({ major });
  return user;
};

export const getUsersByClub = async (club) => {
  const user = await User.find({ clubs: club });
  return user;
};

export const addPost = async (id, Post) => {
  const user = await User.findById(id);
  if (user.posts) {
    user.posts.push(Post.id);
  } else {
    user.posts = [Post.id];
  }
  await user.save();
};
