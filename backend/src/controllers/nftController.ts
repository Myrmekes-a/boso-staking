/* eslint @typescript-eslint/naming-convention : 0 */
/* eslint no-underscore-dangle : 0 */
/* eslint no-await-in-loop : 0  */
/* eslint @typescript-eslint/ban-ts-comment: 0  */

import { IGetUserAuthInfoRequest } from 'src/utils/typesAndInterfaces';
import BigPromise from '../middlewares/bigPromise';
// import { CustomError } from '../utils/customError';
import { calculatePoints, sendTx, getNftFromWallet } from '../utils/NftHelper';
import Nft from '../models/nft';
import Activity from '../models/activity';

export const getNft = BigPromise(async (req: IGetUserAuthInfoRequest, res) => {
  const { wallet } = req.user;
  const { _id } = req.user;
  // get wallet from url param
  /*  const wallet = req.query.wallet;
    console.log(req.query);
    console.log(wallet); */
  // const testWallet = 'DmS3RqjoSU5khWB76cXsbexeFv7FpwRqoUCyRBYt1Jgg';

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
    const { mints } = req.body;
    const { serialized } = req.body;

    const nfts = await Nft.find({
      mint: { $in: mints },
      staked: false,
      owner: _id,
    });

    if (nfts.length !== mints.length) {
      res.status(404).json({
        success: false,
        message: 'Nft not found or already staked',
      });

      return;
    }

    try {
      await sendTx(serialized);
    } catch (err) {
      console.log(err);
      res.status(404).json({
        success: false,
        message: 'Error sending transaction',
      });
      return;
    }

    for (let i = 0; i < mints.length; i += 1) {
      const mint = mints[i];

      // stake nft
      const nft = await Nft.findOneAndUpdate(
        { mint, staked: false, owner: _id },
        { $set: { staked: true, owner: _id }, new: true }
      );

      // create activity
      await Activity.create({
        operation: 'stake',
        // @ts-ignore
        nft: nft._id,
        user: _id,
      });
    }

    next();
  }
);

export const unstake = BigPromise(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    const { _id } = req.user;
    const { mints } = req.body;
    const { serialized } = req.body;

    const nfts = await Nft.find({
      mint: { $in: mints },
      staked: true,
      owner: _id,
    });

    if (nfts.length !== mints.length) {
      res.status(404).json({
        success: false,
        message: 'Nft not found or already unstaked',
      });

      return;
    }

    // calculate actual points
    let points = await calculatePoints(_id);
    points += req.user.points;

    if (points !== req.user.points) {
      await req.user.updateOne({ points, lastUpdatedPoints: Date.now() });
      req.user.points = points;
    }

    try {
      await sendTx(serialized);
    } catch (err) {
      res.status(404).json({
        success: false,
        message: 'Error sending transaction',
      });
      return;
    }

    for (let i = 0; i < mints.length; i += 1) {
      const mint = mints[i];
      // unstake nft
      const nft = await Nft.findOneAndUpdate(
        { mint, staked: true, owner: _id },
        { $set: { staked: false, owner: _id }, new: true }
      );

      // create activity
      await Activity.create({
        operation: 'unstake',
        // @ts-ignore
        nft: nft._id,
        user: _id,
      });
    }

    next();
  }
);

export const getPoints = BigPromise(
  async (req: IGetUserAuthInfoRequest, res) => {
    const { _id } = req.user;
    let points = await calculatePoints(_id);
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
    let points = await calculatePoints(_id);
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

/* export const stakeBack = BigPromise(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    const { serialized } = req.body;
    if (!serialized) {
      res.status(404).json({
        success: false,
        message: 'No serialized transaction found',
      });
    }

    for (let i = 0; i < serialized.length; i++) {
      const signedTx = serialized[i];
      const txid = await connection.sendRawTransaction(signedTx);
      const blockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: blockHash.blockhash,
          lastValidBlockHeight: blockHash.lastValidBlockHeight,
          signature: txid,
        },
        'confirmed'
      );
    }

    res.status(200).json({
      success: true,
      message: 'stake back successfull',
    });
  }
);

export const unstakeBack = BigPromise(
  async (req: IGetUserAuthInfoRequest, res, next) => {
    const { serialized } = req.body;

    if (!serialized) {
      res.status(404).json({
        success: false,
        message: 'No serialized transaction found',
      });
    }

    for (let i = 0; i < serialized.length; i++) {
      const signedTx = serialized[i];
      const txid = await connection.sendRawTransaction(signedTx);

      const blockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: blockHash.blockhash,
          lastValidBlockHeight: blockHash.lastValidBlockHeight,
          signature: txid,
        },
        'confirmed'
      );
    }
    res.status(200).json({
      success: true,
      message: 'Unstake back successfull',
    });
  }
); */
