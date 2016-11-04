import Tag from '../models/tag.model';

function create(req, res) {
  if (!req.body.name) {
    res.status(400).json("Name is required");
  } else {
    const tag = new Tag({
      name: req.body.name
    });

    if (req.body._id) {
      tag._id = req.body._id;
    }

    tag.save()
      .then(() => {
        res.status(201).json(tag);
      })
      .catch((e) => {
        res.status(400).send(e);
      });
  }
}

function list(req, res, next) {
  const {
    limit = 50, skip = 0
  } = req.query;
  Tag.list({
      limit,
      skip
    })
    .then(tags => res.json(tags))
    .catch(e => next(e));
}

export default {
  create,
  list
}
