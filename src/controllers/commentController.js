/* eslint-disable import/prefer-default-export */
import * as commentService from '../services/commentService';
import { addCommentToPost } from '../services/postsService';

export const addComment = async (req, res) => {
  try {
    const { postID, text, userID } = req.query;
    const comment = await commentService.createComment(userID, text);
    addCommentToPost(postID, comment);
    return res.status(200).json(comment);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};
