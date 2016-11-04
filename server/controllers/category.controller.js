import Category from '../models/category.model';

function create(req, res, next) {
  if (!req.body.name) {
    res.status(400).json("Name is required");
  } else {
    const category = new Category({
      name: req.body.name
    });

    if (req.body._id) {
      category._id = req.body._id;
    }

    category.save()
      .then(() => {
        res.status(201).json(category);
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
  Category.list({
      limit,
      skip
    })
    .then(categories => res.json(categories))
    .catch(e => next(e));
}

export default {
  create,
  list
}
