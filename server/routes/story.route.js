import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import storyCtrl from '../controllers/story.controller';
import authenticateMiddl from '../middleware/authenticate'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(storyCtrl.list)
  .post(authenticateMiddl.authenticate,validate(paramValidation.createStory),storyCtrl.create);

router.route('/:storyId')
  .get(storyCtrl.get)
  .put(authenticateMiddl.authenticate,storyCtrl.update)
  .delete(authenticateMiddl.authenticate,storyCtrl.remove);

router.route('/:storyId/comments')
  .post(authenticateMiddl.authenticate,storyCtrl.createComment);

/** Load story when API with storyId route parameter is hit */
router.param('storyId', storyCtrl.load);

export default router;
