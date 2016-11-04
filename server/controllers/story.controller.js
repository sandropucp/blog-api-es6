import Story from '../models/story.model';
import Comment from '../models/comment.model';

function load(req, res, next, id) {
  Story.get(id)
    .then((story) => {
      req.story = story; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

function get(req, res) {
  return res.json(req.story);
}

function create(req, res, next) {
  if (!req.body.title) {
    res.status(400).json("Title is required");
  } else {
    const story = new Story({
      title: req.body.title,
      body: req.body.body,
      author: req.body.author,
      category: req.body.category,
      comments: req.body.comments,
      tags: req.body.tags
    });

    if (req.body._id) {
      story._id = req.body._id;
    }

    story.save()
      .then(() => {
        res.status(201).json(story);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }
}

function update(req, res, next) {
  const story = req.story;
  story.title = req.body.title;
  story.body = req.body.body;

  story.save()
    .then(savedStory => res.json(savedStory))
    .catch(e => next(e));
}

function list(req, res, next) {
  console.log('list.........');
  var query = {};

  if (req.query.author) {
    query.author.id = req.query.author;
  }
  if (req.query.tag) {
    query.tags = {
      $in: [req.query.tag]
    };
  }
  if (req.query.category) {
    query.category = req.query.category;
  }
  if (req.query.search) {
    query.title = new RegExp(req.query.search, "i");
  }

  const {
    limit = 50, skip = 0
  } = req.query;

  Story.list({
      limit,
      skip,
      query
    })
    .then(stories => res.json(stories))
    .catch(e => next(e));
}

function remove(req, res, next) {
  const story = req.story;
  story.remove()
    .then(deletedStory => res.json(deletedStory))
    .catch(e => next(e));
}

function createComment(req, res, next) {
  if (!req.body.body) {
    res.status(400).json("Body is required");
  } else {
    const comment = new Comment({
      body: req.body.body,
      author: req.body.author
    });
    var story = req.story;
    story.comments.push(comment);

    story.save()
      .then(() => {

        Story.get(req.params.storyId)
          .then((newstory) => {
            res.status(201).json(newstory);
          });

      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }
}

export default {
  load,
  get,
  create,
  update,
  list,
  remove,
  createComment
};
