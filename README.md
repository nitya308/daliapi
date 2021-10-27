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
