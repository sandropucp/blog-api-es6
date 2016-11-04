import User from '../models/user.model';

function authenticate(req, res, next) {
  var token = req.header('x-auth');

  User.findByToken(token)
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      req.user = user;
      req.token = token;
      console.info('******* Authenticate req.user: ' + req.user);
      next();
    })
    .catch((e) => {
      res.status(401).send('You are not authorized');
    });
};

export default {
  authenticate
};
