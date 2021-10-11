import mongoose, { Schema } from 'mongoose';

const PostsSchema = new Schema({
  club: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  caption: { type: String, default: '' },
  date: Date,
  likes: { likers: [Schema.Types.ObjectId], number: Number },
  comments: [Schema.Types.ObjectId],
});

const Posts = mongoose.models.Posts || mongoose.model('Posts', PostsSchema);

export default Posts;
