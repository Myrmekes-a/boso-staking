import { IGetUserAuthInfoRequest } from 'src/utils/typesAndInterfaces';
import BigPromise from '../middlewares/bigPromise';
// import { CustomError } from '../utils/customError';
import { getNftFromWallet } from '../utils/NftHelper';

export const getNft = BigPromise(async (req: IGetUserAuthInfoRequest, res) => {
  const { wallet } = req.user;
  // get wallet from url param
  /*  const wallet = req.query.wallet;
    console.log(req.query);
    console.log(wallet); */
  const nfts = await getNftFromWallet(wallet);
  res.status(200).json({
    success: true,
    nfts,
  });
});
