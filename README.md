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
Has 5 fuctions corresponding to user models:
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
uses similar find function
