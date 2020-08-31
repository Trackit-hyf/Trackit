const express = require('express');
const { check } = require('express-validator');
const assetsController = require('../controllers/assets-controllers');

const router = express.Router();


router.get('/myAssets/:uid', assetsController.getMyAssets);
router.post(
	'/register-assets/:uid',
	[
		check('id').not().isEmpty(),
		check('name').not().isEmpty(),
		check('amount').not().isEmpty().isNumeric(),
		check('price').not().isEmpty().isNumeric() ,
		check('dateOfPurchase').not().isEmpty()
	],
	assetsController.registerAssets
);

router.patch(
	'/modify-assets/:uid/:assetId',
	[
		check('assetId').not().isEmpty(),
		check('assetName').not().isEmpty(),
		check('assetPrice').not().isEmpty(),
		check('assetAmount').not().isEmpty(),
		check('dateOfPurchase').not().isEmpty()
	],
	assetsController.modifyAsset
);
router.delete('/delete-assets/:uid/:assetId', assetsController.deleteAssets);
module.exports = router;
