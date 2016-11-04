import express from 'express';
import categoryCtrl from '../controllers/category.controller';
import authenticateMiddl from '../middleware/authenticate';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(authenticateMiddl.authenticate,categoryCtrl.create)
  .get(categoryCtrl.list);

export default router;
