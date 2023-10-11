/* eslint no-await-in-loop: 0 */
/* eslint no-continue: 0 */
/* eslint @typescript-eslint/ban-ts-comment: 0 */

import { Connection } from '@metaplex/js';

// @ts-ignore
import { Metadata } from '@metaplex-foundation/mpl-token-metadata';
import Nft from '../models/nft';

const connection = new Connection('mainnet-beta');
const bozoKey = process.env.BOZO_KEY as string;

const getNftFromWallet = async (wallet: string) => {
  const nftsmetadata = await Metadata.findDataByOwner(connection, wallet);
  const mints = [];
  for (let i = 0; i < nftsmetadata.length; i += 1) {
    if (nftsmetadata[i].collection?.key !== bozoKey) {
      continue;
    }
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

      const newNft = new Nft({
        mint: nftsmetadata[i].mint,
        image: image.image,
        owner: wallet,
      });

      await newNft.save();
      mints.push({
        mint: nftsmetadata[i].mint,
        image: image.image,
      });
    } else {
      mints.push({
        mint: nft.mint,
        image: nft.image,
      });
    }
  }
  return mints;
};

export { getNftFromWallet };
