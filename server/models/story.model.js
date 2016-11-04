import mongoose from 'mongoose';
import commentSchema from './comment.model';

var StorySchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
    trim: true
  },
  body: {
    type: String,
    require: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.ObjectId,
    require: true,
    ref: 'User'
  },
  comments: [commentSchema.schema],
  tags: [{
    type: mongoose.Schema.ObjectId,
    ref: 'Tag'
  }],
  category: {
    type: mongoose.Schema.ObjectId,
    ref: 'Category'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

StorySchema.statics = {

  get(id) {
    return this.findById(id)
      .populate('author')
      .populate('category')
      .populate('tags')
      .populate('comments.author')
      .exec()
      .then((story) => {
        if (story) {
          return story;
        }
        const err = new APIError('No such story exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  list({
    skip = 0,
    limit = 50
  } = {}) {
    console.log('list..............');
    return this.find({})
      .populate('author')
      .populate('category')
      .populate('tags')
      .populate('comments.author')
      .sort({
        createdAt: -1
      })
      .skip(skip)
      .limit(limit)
      .exec();
  }

};

export default mongoose.model('Story', StorySchema);
