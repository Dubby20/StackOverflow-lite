[![Build Status](https://travis-ci.org/Dubby20/StackOverflow-lite.svg?branch=travisCI)](https://travis-ci.org/Dubby20/StackOverflow-lite)
[![GitHub](https://img.shields.io/github/license/mashape/apistatus.svg)](https://travis-ci.org/Dubby20/StackOverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/Dubby20/StackOverflow-lite/badge.svg?branch=develop)](https://coveralls.io/github/Dubby20/StackOverflow-lite?branch=develop)


# StackOverflow-lite
StackOverflow-lite is a platform where people can ask questions about the things they are finding difficult to do and users can provide answers to those questions. It is open for everyone

+ Hosted Git hub Page [Kodeland](https://dubby20.github.io/StackOverflow-lite/index.html)
+ [Pivotal Tracker Board](https://www.pivotaltracker.com/n/projects/2189588)

## Description
If a user has some questions about a bug or tool he/she is using, he/she can post it on  [Kodeland](https://dubby20.github.io/StackOverflow-lite/) and get answers or feedback from other others who visits the platform.

## Features
+ Users can create account.
+ Users can log in.
+ Users can post questions.
+ Users can delete the questions they post.
+ Users can view the answers to questions.
+ Users can comment on an answer.
+ Users can search for questions on the platform

## Documentation

List of endpoints exposed by the service
| **http verbs** |  **ApI endpoints**           | **Functionality**
| ---------------|:----------------------------:| ----------------------------: |
| POST           | api/v1/auth/signup           | Registers a user              |
| POST           | api/v1/auth/signin           | Logs in a user                |
| POST           | api/v1/questions             | Post a question               |
| GET            | api/v1/question/:id          | Get a question id             |
| GET            | api/v1/questions             | Get all questions             |
| POST           | api/v1/questions:id/answers  | Add an answer to a specific id|
| DELETE         | api/v1/questions:id          | Deletes a specific question id|
| PUT            | api/v1/questions:id/answer:id| Updates or prefers an answer  |


## Setup

Step by step instructions on how to get the code setup locally. This may include:
+ Open the terminal
+ cd into directory that you want the project to reside.
```
cd projects
```
+ clone the repository into that directory.
```
git clone https://github.com/Dubby20/StackOverflow-lite.git
```
run npm install and npm run start:dev
```
run npm install && npm run start
```

### Dependencies

List of libraries, tools, etc used for this project
* [Nodejs](https://nodejs.org/en/)
* [Express](https://expressjs.com/)
* [Postgresql](https://www.postgresql.org/)


<!-- ### Getting Started -->

## Demo
A fully functional demo of this project is available at [Kodedland](https://kodedland.herokuapp.com/)

<!-- List of steps to get started (e.g. clone repo, submodule, .env file, etc) -->

### Run The Service

<!-- List of steps to run the service (e.g. docker commands) -->
[Postman](www.getpostman.com)

<!-- ### Microservices -->

<!-- List out the microservices if any that this repo uses -->

## Testing

* Backend Test 
`npm run test` 


<!-- ## Contribute -->

<!-- Any instructions needed to help others contribute to this repository -->

<!-- ## Deployment -->

<!-- Step by step instructions so that the developer can understand how code gets updated -->

## License

[MIT](LICENSE)


## Author
Jacinta Nnadi
