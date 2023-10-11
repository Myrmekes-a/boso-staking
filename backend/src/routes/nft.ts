import express from 'express';
// import { check } from 'express-validator';
import { getNft } from '../controllers/nftController';
import { isLoggedIn } from '../middlewares/user';

const router = express.Router();

router.route('/nft/nftsByWallet').get(isLoggedIn, getNft);

export = router;
