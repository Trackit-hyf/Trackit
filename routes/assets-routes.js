const express = require('express');
const { check } = require('express-validator');
const checkAuth = require('../middleware/checkAuth')
const assetsController = require('../controllers/assets-controllers');

const router = express.Router();

router.use(checkAuth)

router.get('/myAssets/:uid', assetsController.getMyAssets);
router.post(
	'/register-assets/:uid',
	[
		check('assetId').not().isEmpty(),
		check('assetName').not().isEmpty(),
		check('assetPrice').not().isEmpty(),
		check('assetAmount').not().isEmpty(),
		check('dateOfPurchase').not().isEmpty()
	],
	assetsController.registerAssets
);

router.patch(
	'/modify-asset/:uid/:assetId',
	[
		check('assetId').not().isEmpty(),
		check('assetName').not().isEmpty(),
		check('assetPrice').not().isEmpty(),
		check('assetAmount').not().isEmpty(),
		check('dateOfPurchase').not().isEmpty()
	],
	assetsController.modifyAsset
);
router.delete('/delete-asset/:uid/:assetId', assetsController.deleteAssets);
module.exports = router;
