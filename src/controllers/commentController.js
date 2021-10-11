/* eslint-disable import/prefer-default-export */
import * as commentService from '../services/commentService';

export const addComment = async (req, res) => {
  try {
    const { postID, text, userID } = req.query;
    const comment = await commentService.createComment(postID, userID, text);
    return res.status(200).json(comment);
  } catch (e) {
    console.log(e);
    return res.status(500).json({ error: e.message || 'There was an error.' });
  }
};
