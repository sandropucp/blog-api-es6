import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      name: Joi.string().min(3).max(30).required(),
      username: Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      password: Joi.string().min(3).max(15).required()       
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      name: Joi.string().min(3).max(30).required(),
      username: Joi.string().email().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required(),
      password: Joi.string().min(3).max(15).required()       
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().required()
    }
  },

  // POST /api/stories
  createStory: {
    body: {
      title: Joi.string().min(3).max(30).required(),
      body: Joi.string().min(3).max(2000).required(),
      author: Joi.string().hex().required()            
    }
  },

};
