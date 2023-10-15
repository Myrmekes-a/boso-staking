import express from 'express';
// import { check } from 'express-validator';
import {
  getNft,
  getPoints,
  stake,
  unstake,
} from '../controllers/nftController';
import { isLoggedIn } from '../middlewares/user';

const router = express.Router();

router.route('/nft/nftsByWallet').get(isLoggedIn, getNft);
router.route('/nft/stake').post(isLoggedIn, stake, getPoints);
router.route('/nft/unstake').post(isLoggedIn, unstake, getPoints);
router.route('/nft/getPoints').get(isLoggedIn, getPoints);

export = router;
