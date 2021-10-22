import mongoose, { Schema } from 'mongoose';

/* This model stores all the posts */

const PostsSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Each post is made by one user (posts--> users = many --> one)
  club: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  caption: { type: String, default: '' },
  date: Date,
  likes: { likers: { type: [Schema.Types.ObjectId], ref: 'User' }, number: Number },
});

const Posts = mongoose.models.Posts || mongoose.model('Posts', PostsSchema);

export default Posts;
