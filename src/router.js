import { Router } from 'express';
import * as userController from './controllers/userController';
import * as postsController from './controllers/postsController';
import * as commentController from './controllers/commentController';
import { requireAuth, requireSignin } from './services/passportService';

const router = Router();

// to get users (Dartmouth students!) by name or create user
router.route('/users')
  .get(requireAuth, userController.getUsers)
  .post(userController.signUpUser);

// to sign in
router.route('/signin')
  .post(requireSignin, userController.signInUser);

// to search for Dartmouth students based on what clubs they're involved in
router.route('/users/search/club')
  .get(requireAuth, userController.searchUsersByClub);

// to search for Dartmouth students based on majors
router.route('/users/search/major')
  .get(requireAuth, userController.searchUsersByMajor);

// to follow a user
router.route('/user/follow')
  .get(requireAuth, userController.addFollower);

// to get all posts of a user or create a post
router.route('/user/posts')
  .get(requireAuth, postsController.searchPostsByUser)
  .post(requireAuth, postsController.createNewPost);

// to get all posts from Dartmouth students sorted from most recent
router.route('/posts')
  .get(requireAuth, postsController.getPosts);

// search for posts about a certain club/ student organisation
router.route('/posts/club')
  .get(requireAuth, postsController.searchPostsByClub);

// to like and unlike posts
router.route('/post/like')
  .post(requireAuth, postsController.likePost)
  .delete(requireAuth, postsController.unlikePost);

// get all comments on a post or add a comment
router.route('/post/comment')
  .get(requireAuth, postsController.getComments)
  .post(requireAuth, commentController.addComment);

export default router;
