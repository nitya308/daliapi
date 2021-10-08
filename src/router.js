import { Router } from 'express';
import * as userController from './controllers/userController';
import * as postsController from './controllers/postsController';
import * as commentController from './controllers/commentController';
import { requireAuth, requireSignin } from './services/passportService';

const router = Router();

router.route('/users')
  .get(requireAuth, userController.getUsers)
  .post(userController.signUpUser);

router.route('/signin')
  .post(requireSignin, userController.signInUser);

router.route('users/search/club')
  .get(requireAuth, userController.searchUsersByClub);

router.route('users/search/major')
  .get(requireAuth, userController.searchUsersByMajor);

router.route('/user/posts')
  .get(requireAuth, postsController.searchPostsByUser)
  .post(requireAuth, postsController.createNewPost);

router.route('posts')
  .get(requireAuth, postsController.getPosts);

router.route('posts/club')
  .get(requireAuth, postsController.searchPostsByClub);

router.route('/post/like')
  .post(requireAuth, postsController.likePost)
  .delete(requireAuth, postsController.unlikePost);

router.route('post/comment')
  .post(requireAuth, commentController.addComment);

export default router;
