/* eslint no-await-in-loop: 0 */
/* eslint no-continue: 0 */
/* eslint @typescript-eslint/ban-ts-comment: 0 */
/* eslint no-underscore-dangle : 0 */

import { Connection } from '@metaplex/js';

// @ts-ignore
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import dayjs from 'dayjs';
import Nft from '../models/nft';
import Activity from '../models/activity';

const connection = new Connection(process.env.SERVER_IP as string);
const bozoKey = process.env.BOZO_KEY as string;

const getNftFromWallet = async (wallet: string, userId: string) => {
  const nftsmetadata = await Metadata.findDataByOwner(connection, wallet);
  const mints = new Map();
  for (let i = 0; i < nftsmetadata.length; i += 1) {
    /* if (nftsmetadata[i].collection?.key !== bozoKey) {
      continue;
    } */
    // eslint-disable-next-line no-await-in-loop
    const nft = await Nft.findOne({ mint: nftsmetadata[i].mint });
    if (!nft) {
      const response = await fetch(nftsmetadata[i].data.uri);
      if (!response) {
        continue;
      }

      const image = await response.json();

      if (!image || !image.image) {
        continue;
      }

      try {
        const newNft = new Nft({
          mint: nftsmetadata[i].mint,
          image: image.image,
          owner: userId,
        });

        await newNft.save();

        mints.set(nftsmetadata[i].mint, {
          mint: nftsmetadata[i].mint,
          image: image.image,
          staked: false,
        });
      } catch (err) {
        console.log(err);
        continue;
      }
    } else {
      mints.set(nft.mint, {
        mint: nft.mint,
        image: nft.image,
        staked: nft.staked,
      });
    }

    const allNfts = await Nft.find({ owner: userId });
    for (let j = 0; j < allNfts.length; j += 1) {
      if (!mints.has(allNfts[j].mint)) {
        mints.set(allNfts[j].mint, {
          mint: allNfts[j].mint,
          image: allNfts[j].image,
          staked: allNfts[j].staked,
        });
      }
    }
  }
  return mints;
};

/*
24 punti al giorno per uno solo nft
1 punto all'ora
1/60 punti al minuto


5 hai il x2 sul singolo nft
10 hai il x2.5 sul singolo nft
ecc...
*/
const calculatePoints = async (userId: string, lastUpdatePoints: Date) => {
  const staked = await Nft.find({ owner: userId, staked: true });
  let totalPoints = 0;

  for (let i = 0; i < staked.length; i += 1) {
    const activity = await Activity.find({
      nft: staked[i]._id,
      operation: 'stake',
    })
      .sort({ createdAt: -1 })
      .limit(1);

    if (!activity) {
      continue;
    }

    let lastStake = dayjs(activity[0].createdAt);
    let lastUpdate = dayjs(lastUpdatePoints);
    let now = dayjs();
    // set second to 0
    lastStake = lastStake.set('second', 0);
    lastUpdate = lastUpdate.set('second', 0);
    now = now.set('second', 0);

    // set millisecond to 0
    lastStake = lastStake.set('millisecond', 0);
    lastUpdate = lastUpdate.set('millisecond', 0);
    now = now.set('millisecond', 0);

    let diff;
    // use always the most recent date
    if (lastUpdate.isBefore(lastStake)) {
      // console.log('last stake');
      diff = now.diff(lastStake, 'minute'); // amount of minutes between now and last stake
      // console.log(now.toDate(), lastStake.toDate(), diff);
    } else {
      // console.log('last update');
      diff = now.diff(lastUpdate, 'minute'); // amount of minutes between now and last update
      // console.log(now.toDate(), lastUpdate.toDate(), diff);
    }
    let points = diff; /* / 60 */ // amount of points to add
    if ((i + 1) % 5 === 0) {
      const multiplier = 2 + ((i + 1) / 5 - 1) * 0.5; // 2, 2.5, 3, 3.5, 4, 4.5, 5
      points *= multiplier;
    }
    totalPoints += points;
  }
  // troncate to 2 decimal
  // totalPoints = Math.trunc(totalPoints * 100) / 100;
  return totalPoints;
};

export { getNftFromWallet, calculatePoints };
