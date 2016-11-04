# Blog Express JS Rest API ES6 

Rest Blog API ES6 with  unit testing 

- REST resources
- Body Parsing via [body-parser](https://github.com/expressjs/body-parser)
- Integration Testing via [supertest](https://github.com/visionmedia/supertest)
- Test code coverage via [wallabyjs](https://wallabyjs.com/)
- Database via [mongo](https://www.mongodb.com/) and [mongoose](http://mongoosejs.com/)
- Continuous Integration via [travis-ci](https://travis-ci.org/) and (http://matthewmeye.rs/blog/post/templating-language-part-2/)

# Example

```
https://blogapi-express.herokuapp.com/api/stories/
https://blogapi-express.herokuapp.com/api/stories/:storyId
https://blogapi-express.herokuapp.com/api/stories/:storyId/comments
https://blogapi-express.herokuapp.com/api/stories/:storyId/comments/:commentId
https://blogapi-express.herokuapp.com/api/users
https://blogapi-express.herokuapp.com/api/users/:userId

```

## Getting Started

Clone the repo:
```sh
git clone git@github.com:sandropucp/blog-api-es6.git
cd blog-api-es6
```

Install dependencies:
```sh
npm install
```

Start server:
```sh
# Start server
npm start

# Selectively set DEBUG env var to get logs
DEBUG=express-mongoose-es6-rest-api:* npm start
```
Refer [debug](https://www.npmjs.com/package/debug) to know how to selectively turn on logs.


Tests:
```sh
# Run tests written in ES6 along with code coverage
npm test

# Run tests on file change
npm run test:watch

# Run tests enforcing code coverage (configured via .istanbul.yml)
npm run test:check-coverage
```

Lint:
```sh
# Lint code with ESLint
npm run lint

# Run lint on any file change
npm run lint:watch
```

Other gulp tasks:
```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```

##### Deployment

```sh
# compile to ES5
1. npm run build

# upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# install production dependencies only
3. npm i --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

In production you need to make sure your server is always up so you should ideally use any of the process manager recommended [here](http://expressjs.com/en/advanced/pm.html).
We recommend [pm2](http://pm2.keymetrics.io/) as it has several useful features like it can be configured to auto-start your services if system is rebooted.

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports.  A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

#### API logging
Logs detailed info about each api request to console during development.
![Detailed API logging](https://cloud.githubusercontent.com/assets/4172932/12563354/f0a4b558-c3cf-11e5-9d8c-66f7ca323eac.JPG)

#### Error logging
Logs stacktrace of error to console along with other details. You should ideally store all error messages persistently.
![Error logging](https://cloud.githubusercontent.com/assets/4172932/12563361/fb9ef108-c3cf-11e5-9a58-3c5c4936ae3e.JPG)

## Code Coverage
Get code coverage summary on executing `npm test`
![Code Coverage Text Summary](https://cloud.githubusercontent.com/assets/4172932/12827832/a0531e70-cba7-11e5-9b7c-9e7f833d8f9f.JPG)

`npm test` also generates HTML code coverage report in `coverage/` directory. Open `lcov-report/index.html` to view it.
![Code coverage HTML report](https://cloud.githubusercontent.com/assets/4172932/12625331/571a48fe-c559-11e5-8aa0-f9aacfb8c1cb.jpg)

## Acknowledgments

* Boilerplate: https://github.com/KunalKapadia/express-mongoose-es6-rest-api
