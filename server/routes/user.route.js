import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import authenticateMiddl from '../middleware/authenticate'

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  .get(authenticateMiddl.authenticate,userCtrl.list)  
  .post(validate(paramValidation.createUser),userCtrl.create);    

router.route('/:userId')  
  .get(userCtrl.get)  
  .put(authenticateMiddl.authenticate,validate(paramValidation.updateUser), userCtrl.update)  
  .delete(authenticateMiddl.authenticate,userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('userId', userCtrl.load);

export default router;
