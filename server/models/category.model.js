import mongoose from 'mongoose';

var CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
});

CategorySchema.statics = {

  list({
    skip = 0,
    limit = 50,
    query = {}
  } = {}) {
    return this.find(query)
      .sort({
        createdAt: -1
      })
      .skip(skip)
      .limit(limit)
      .exec();
  }

};

export default mongoose.model('Category', CategorySchema);
