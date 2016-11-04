import express from 'express';
import tagCtrl from '../controllers/tag.controller';
import authenticateMiddl from '../middleware/authenticate';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .post(authenticateMiddl.authenticate,tagCtrl.create)
  .get(tagCtrl.list);

export default router;
