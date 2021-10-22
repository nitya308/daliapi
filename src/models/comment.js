import mongoose, { Schema } from 'mongoose';

/* This model stores all the comments */

const CommentSchema = new Schema({
  post: [{ type: Schema.Types.ObjectId, ref: 'Post' }], // Each comment is made to one post (comments--> posts = many --> one)
  commentor: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Each comment is made by one user (comments--> users = many --> one)
  text: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
