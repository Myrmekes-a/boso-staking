/* eslint @typescript-eslint/naming-convention : 0 */
/* eslint no-underscore-dangle : 0 */

import { IGetUserAuthInfoRequest } from 'src/utils/typesAndInterfaces';
import BigPromise from '../middlewares/bigPromise';
// import { CustomError } from '../utils/customError';
import { calculatePoints, getNftFromWallet } from '../utils/NftHelper';
import Nft from '../models/nft';
import Activity from '../models/activity';

export const getNft = BigPromise(async (req: IGetUserAuthInfoRequest, res) => {
  const { wallet } = req.user;
  const { _id } = req.user;
  // get wallet from url param
  /*  const wallet = req.query.wallet;
    console.log(req.query);
    console.log(wallet); */
  //const testWallet = 'DmS3RqjoSU5khWB76cXsbexeFv7FpwRqoUCyRBYt1Jgg';

  const nfts = await getNftFromWallet(wallet, _id);

  res.status(200).json({
    success: true,
    nfts,
  });
});

export const stake = BigPromise(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    const { _id } = req.user;
    // const { wallet } = req.user;
    const { mint } = req.body;

    // stake nft
    const nft = await Nft.findOneAndUpdate(
      { mint, staked: false, owner: _id },
      { $set: { staked: true, owner: _id }, new: true }
    );

    if (!nft) {
      res.status(404).json({
        success: false,
        message: 'Nft not found or already staked',
      });

      return;
    }

    // create activity
    await Activity.create({
      operation: 'stake',
      nft: nft._id,
      user: _id,
    });
    next();
  }
);

export const unstake = BigPromise(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    const { _id } = req.user;
    const { mint } = req.body;

    // calculate actual points
    let points = await calculatePoints(_id, req.user.lastUpdatedPoints);
    points += req.user.points;

    if (points !== req.user.points) {
      await req.user.updateOne({ points, lastUpdatedPoints: Date.now() });
      req.user.points = points;
    }

    // unstake nft
    const nft = await Nft.findOneAndUpdate(
      { mint, staked: true, owner: _id },
      { $set: { staked: false, owner: _id }, new: true }
    );

    if (!nft) {
      res.status(404).json({
        success: false,
        message: 'Nft not found or already unstaked',
      });

      return;
    }

    // create activity
    await Activity.create({
      operation: 'unstake',
      nft: nft._id,
      user: _id,
    });

    next();
  }
);

export const getPoints = BigPromise(
  async (req: IGetUserAuthInfoRequest, res) => {
    const { _id } = req.user;
    let points = await calculatePoints(_id, req.user.lastUpdatedPoints);
    points += req.user.points;

    if (points !== req.user.points) {
      await req.user.updateOne({ points, lastUpdatedPoints: Date.now() });
      req.user.points = points;
    }

    res.status(200).json({
      success: true,
      totalPoints: points,
      claimedPoints: req.user.claimedPoints,
    });
  }
);

export const claimPoints = BigPromise(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    const { _id } = req.user;
    let points = await calculatePoints(_id, req.user.lastUpdatedPoints);
    points += req.user.points;

    if (points !== req.user.points) {
      await req.user.updateOne({ points, lastUpdatedPoints: Date.now() });
      req.user.points = points;
    }

    // update claimed points
    const claimedPoints = points;
    if (claimedPoints !== req.user.claimedPoints) {
      await req.user.updateOne({ claimedPoints });
      req.user.claimedPoints = claimedPoints;
    }

    res.status(200).json({
      success: true,
      totalPoints: points,
      claimedPoints,
    });
  }
);
