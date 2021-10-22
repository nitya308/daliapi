/* eslint-disable consistent-return */
// This model stores all the users in the database

import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new Schema({
  email: { type: String, required: true },
  password: String,
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  year: { type: Number },
  pronouns: String,
  favquote: String,
  bio: String,
  followers: { id: [Schema.Types.ObjectId], numFollowers: Number },
  majors: [String],
  clubs: [String],
}, {
  toObject: { virtuals: true },
  toJSON: {
    virtuals: true,
    transform(doc, ret, options) {
      delete ret.password;
      return ret;
    },
  },
});

// Authentication for each user
UserSchema.pre('save', function beforeModelSave(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  else {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) return next(err);
      else {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) return next(err);
          else {
            user.password = hash;
            return next();
          }
        });
      }
    });
  }
});
UserSchema.methods.comparePassword = function comparePassword(candidatePassword, callback) {
  const user = this;
  bcrypt.compare(candidatePassword, user.password, (err, res) => {
    if (err) return callback(err);
    else {
      return callback(null, res);
    }
  });
};

// Virtual fuction to combine firstName and lastName to get a full name
UserSchema.virtual('fullName').get(function fullName() {
  return `${this.firstName} ${this.lastName}`;
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
