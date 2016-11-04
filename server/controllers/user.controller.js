import User from '../models/user.model';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  console.log('-----load() User Controller:' + id);
  User.get(id)
    .then((user) => {
      console.log('-----load() User Controller Id:' + id);
      req.user = user; // eslint-disable-line no-param-reassign
      console.log('-----load() User Controller req.user:' + req.user);
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  console.log('-----get() User Controller req.user:' + req.user);
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({    
    name: req.body.name,
    username: req.body.username,
    birthYear: req.body.birthYear,
    password: req.body.password,
    mobileNumber: req.body.mobileNumber
  });

  if (req.body._id) {
    user._id = req.body._id;
  }

  user.save()
    .then(() => {
      return user.generateAuthToken();
    })
    .then((token) => {
      res.header('x-auth', token).send(user);
    })
    .catch((e) => {
      res.status(400).send(e);
    })

}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;

  user.name = req.body.name;
  user.birthYear = req.body.birthYear;

  console.log('######################' + user.name);
  console.log('######################' + user.username);
  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;
  User.list({
      limit,
      skip
    })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove
};
