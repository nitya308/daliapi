# Starter Express App Template

## Overview 

* node with babel
* expressjs
* airbnb eslint rules

Procfile set up to run on [heroku](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app).

Credit to Tim Tregubov's [CS52 course](https://cs52.me/assignments/) for providing the basic code in this starter pack.

## Instructions

Run `yarn install` or `npm install` first to install all of the project's dependencies.

Run `yarn start` or `npm start` to start the development server. 

Run `yarn prod` or `npm run prod` to build the application for production.

## Backend Mini-Series Project Description

Your goal over the next couple weeks will be to design, build, and implement a backend Express.js server that meets at least the following requirements:
- serves at least **five** API routes (e.g. `/users/:id`, `/post`) and **seven** API endpoints (e.g. `GET /users/:id`, `POST /post`)
- integrates a MongoDB database with at least **three** different data models
- incorporates basic authentication
- is successfully deployed on the web!

While there are no strict requirements for *what* the server/database needs to do, here are some suggestions to get you started:
- a backend server for a blog (or forum), that supports posts, comments, user accounts, search, etc. (potentially even image uploads!)
    - a to-do list or note-taking app server would support similar functionality
- a backend server for a social media site, which supports user accounts, posts, following/friends capabilities, user groups, DMs, etc.
- a backend server for a personal book or recipe-tracking app, where users can save and retrieve info about their favorite books/recipes to the cloud, view other users' favorites, aggregate statistics about the most common entries, etc. 
- a backend server for a banking or personal budget application, where users can withdraw/deposit funds, pay other users, receive money, view transaction history, etc. 
- a backend administrative server for a school, which needs to store student/faculty/staff data, class enrollments, classroom locations, grades, course reviews, etc.

Be creative! We recommend beginning by designing your API and figuring out which routes you'll need (think about what information a hypothetical frontend client might request). After that, you can move on to planning out and implementing the database. Feel free to reach out over Slack with any questions!

