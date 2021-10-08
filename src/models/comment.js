import mongoose, { Schema } from 'mongoose';

const CommentSchema = new Schema({
  commentor: Schema.Types.ObjectId,
  text: String,
});

const Comment = mongoose.model('Comment', CommentSchema);

export default Comment;
