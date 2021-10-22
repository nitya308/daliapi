import jwt from 'jwt-simple';
import User from '../models/user';

// Authenticates user
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

// Creates and saves new user to the database
export const createUser = async (email, firstName, lastName, password, year, pronouns, favquote, bio, majors, clubs) => {
  const user = new User({
    email,
    firstName,
    lastName,
    password,
    year,
    pronouns,
    favquote,
    bio,
    majors,
    clubs,
  });
  await user.save();
  return user;
};

// Sign in user on login
export const signInUser = async (user) => {
  const token = tokenForUser(user);
  return { token, email: user.email };
};

// Retrieve user based on ID
export const getUserByID = async (userID) => {
  const user = await User.findById(userID);
  return user;
};

// Retrieve users by either first or last name
export const getUsersByName = async (firstName, lastName) => {
  const users = await User.find({ $or: [{ firstName }, { lastName }] });
  return users;
};

// Find users based on their major
export const getUsersByMajor = async (major) => {
  const user = await User.find({ majors: major });
  return user;
};

// Find users based student clubs they're members of
export const getUsersByClub = async (club) => {
  const user = await User.find({ clubs: club });
  return user;
};
