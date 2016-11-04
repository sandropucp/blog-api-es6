import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true    
  },
  birthYear: {
    type: Number    
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  tokens: [{
    access: {
      type: String,
      require: true
    },
    token: {
      type: String,
      require: true
    }
  }]
});

//Validations

UserSchema.path('username').validate(function (username, fn) {
  const User = mongoose.model('User');  

  // Check only when it is a new user or when username field is modified
  if (this.isModified('username')) {
    User.find({ username: username })
      .exec(function (err, usernames) {
        fn(!err && usernames.length === 0);
    });
  } else fn(true);
}, 'Username already exists');

UserSchema.method({

  toJSON() {
    var user = this;
    var userObject = user.toObject();

    return _.pick(userObject, ['_id', 'name','username', 'birthYear']);    
  },

  generateAuthToken() {
    var user = this;
    var access = 'auth';
    var token = jwt.sign({
        _id: user._id.toHexString(),
        access
      },
      'secret').toString();

    user.tokens.push({
      access,
      token
    });

    return user.save()
      .then(() => {
        return token;
      });
  },

  removeToken(token) {
    var user = this;

    return user.update({
      // $pull: {
      //   tokens: {
      //     token
      //   }
      // }
    });
  }

});

UserSchema.statics = {

  get(id) {
    return this.findById(id)
      .exec()
      .then((user) => {
        console.log('get User Model user' + user);
        if (user) {
          return user;
        }
        const err = new APIError('No such user exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({
    skip = 0,
    limit = 50
  } = {}) {
    return this.find()
      .sort({
        createdAt: -1
      })
      .skip(skip)
      .limit(limit)
      .exec();
  },

  findByToken(token) {
    var User = this;
    var decoded;

    try {
      decoded = jwt.verify(token, 'secret');
    } catch (e) {
      return Promise.reject();
    }

    return User.findOne({
      '_id': decoded._id,
      'tokens.token': token,
      'tokens.access': 'auth'
    });
  },

  findByCredentials(username, password) {
    var User = this;

    return User.findOne({
      username
    }).then((user) => {
      if (!user) {
        return Promise.reject();
      }

      return new Promise((resolve, reject) => {
        // Use bcrypt.compare to compare password and user.password
        bcrypt.compare(password, user.password, (err, res) => {
          if (res) {
            resolve(user);
          } else {
            reject();
          }
        });
      });
    });
  }

};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

export default mongoose.model('User', UserSchema);
