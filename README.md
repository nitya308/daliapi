# Social Media API

**Author:** Nitya Agarwala  
**Created:** 2021 | **Description:** Social media API for DALI's backend web-dev course

## Basic Details:
**Languages:** JavaScript  
**Tools** MongoDB, yarn

**Project Description:** A Dartmouth version of social media where there's info about students, their year, majors, what student organisations/clubs they're involved in and the idea is that other students can look students up through that. The Posts model is for people to post about things they're doing with different student clubs. Users can also find posts by clubs to get a real idea of what student orgs on campus are about. Posts also support likes and comments.

## Running the API

**Running this project locally** requires NodeJS and yarn/npm. To install the required packages, run the following command

```yarn install```

OR

```npm install```

The API can be tested using Insomnia (https://insomnia.rest/download)

## Structure:
Below is the basic structure of the backend. The components directory holds all presentational componenets and quiz functions. Components are displayed using calls in App.js.
```
 --src
    | -- models
    |   |-- user.js
    |   |-- posts.js
    |   |-- comment.js
    |
    |-- services
    |   |-- passportService.js
    |   |-- userService.js
    |   |-- postsService.js
    |   |-- commentService.js
    |
    |-- controllers
    |   |-- userController.js
    |   |-- postsController.js
    |   |-- commentController.js
    |
    |-- server.js
    |-- router.js
 ```
## Models
### UserSchema: user.js
This stores the following data for a student user:
```
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
}
```
### PostsSchema: posts.js
This supports posts about student organizations/ clubs that users can make:
```
const PostsSchema = new Schema({
  user: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  club: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  caption: { type: String, default: '' },
  date: Date,
  likes: { likers: { type: [Schema.Types.ObjectId], ref: 'User' }, number: Number },
});
```
PostsSchema stores the corresponding user by ID through parent referencing. Likes are embedded within the schema: the field stores an array of likers and the total number of likes on a post.

### CommentSchema: comment.js
This supports commenting on particular posts. 
CommentSchema stores the corresponding post by ID through parent referencing. It also stores a User object ID for the commentor sicne each comment has only one commentor.
```
const CommentSchema = new Schema({
  post: { type: Schema.Types.ObjectId, ref: 'Posts' }, 
  commentor: { type: Schema.Types.ObjectId, ref: 'User'}, 
  text: String,
});
```
## Services
Each model has a corresponding service (+ a passport service for authentication).
### userService.js
**Has 5 fuctions corresponding to user models:**
1. Authenticates user
2. Creates and saves new user to the database
3. Sign in user on login  
```
export const signInUser = async (user) => {
  const token = tokenForUser(user);
  return { token, email: user.email };
};
```  
4. Retrieve user based on ID
uses await ```User.findById(userID)```
6. Retrieve users by either first or last name. 
Uses find fuction with or paramater  
```
export const getUsersByName = async (firstName, lastName) => {
  const users = await User.find({ $or: [{ firstName }, { lastName }] });
  return users;
};
```
6. Find users based on their major   
```
export const getUsersByMajor = async (major) => {
  const user = await User.find({ majors: major });
  return user;
};
```
7. Find users based student clubs they're members of
uses similar find function for (club) passed to function

### postsService.js
Funtions are all designed based on functionality the user might need.  
1. Creates and saves post to database
2. Retrieve last 20 posts from most recent to least recent  
Uses the sort function in mongoose  
```
export const getAllPosts = async () => {
  const allPosts = await Posts.find().sort({ date: -1 }).limit(20);
  return allPosts;
};
```
3. Retrieve post that matches ID
4. Find posts about a particular student org/club from most to least recent
```
await Posts.find(club).sort({ date: -1 });
```
5. Like a post and return the post with the like 
Uses findByIdAndUpdate to add likers to the array of likers and increment the count of likes by 1.
``` 
export const likePost = async (postID, userID) => {
  const likedPost = await Posts.findByIdAndUpdate(postID, {
    likes: {
      likers: { push: userID },
      number: { $inc: 1 },
    },
  },
  { new: true });
  return likedPost;
};
```
7. Unlike a post and return the post with the unlike
Uses the same function as like to make the opposite update
8. Retrieve all posts made by a particular user
Uses parent referencing of userID stored in Posts model
```
export const getPostsByUser = async (userID) => {
  const posts = await Posts.find(userID).sort({ date: -1 });
  return posts;
};
```
### commentService.js
Least fucntionality because comments are used the least.
1. Create comments:
```
export const createComment = async (postID, userID, commentText) => {
  const comment = new Comment({
    postID,
    commentor: userID,
    text: commentText,
  });
  await comment.save();
  return comment;
};
```
2. Get all comments on a post:  
A simple find by parameter function
```
export const getCommentbyPost = async (postID) => {
  const postComments = Comment.find(postID);
  return postComments;
};
```

3. Retrieve a comment by ID: 
Uses findById()
```
export const getCommentByID = async (commentId) => {
  const comment = await Comment.findById(commentId);
  return comment;
};
```

## Controllers
Each service has a correponding controller that connects the router to the service.   
The Router places calls to the controller which calls functions from the service.
User: ```userController.js```
Posts: ```postsController.js```
Comment: ```commentController.js```
  
## Router
The first thing  ```router.js ``` does is import the Router
 ```import { Router } from 'express'; ```  
   
 **Below is a detailed explanation of all the routes and corresponding calls:**
 ```
  router.route('/users')
  .get(requireAuth, userController.getUsers)
  .post(userController.signUpUser);
```
The **get** route displays users found by firstname and lastname and query parameter -->  
```userController.getUsers``` --> ```{ firstName, lastName } = req.query;``` --> ```await userService.getUsersByName(firstName, lastName);```  
  
The **post** route creates a new user -->  
```userController.signUpUser``` --> ```{email, firstName, year...(other fields)
    } = req.body;``` --> ```await userService.createUser(all fields);```
