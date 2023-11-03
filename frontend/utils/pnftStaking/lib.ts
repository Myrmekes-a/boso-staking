import * as anchor from "@project-serum/anchor";
import { utils } from "@project-serum/anchor";
import * as token from "@solana/spl-token";
import {
  PublicKey,
  ConfirmOptions,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Connection,
} from "@solana/web3.js";
import {
  SOL_PAYMENT_INFO,
  findStakePoolId,
  stake,
  unstake,
} from "@/utils/pnftStaking/sdk";

import {
  IDL,
  SolanaNftProgramsRewardsCenter,
} from "./sdk/idl/solana_nft_programs_rewards_center";
import { WalletContextState } from "@solana/wallet-adapter-react";
import { asWallet } from "@/app/dashboard/test2/Wallets";

let provider: anchor.AnchorProvider;
let program: anchor.Program<SolanaNftProgramsRewardsCenter>;
const connString =
  process.env.NEXT_PUBLIC_NETWORK || "https://api.mainnet-beta.solana.com";
const connection = new Connection(connString); /* getTestConnection(); */

const bozoK =
  process.env.NEXT_PUBLIC_BOZOPK ||
  "G9cDjsCJYNtacVF6ty4GSUBGa5vsNWn8ZSKawA4TXpa6 ";

const bozoPK = new PublicKey(bozoK);

const programId = "EnUpcqfqHozLZdojn2595cLSZkUqgPCDujSonJvP27HP";
const stakePoolIdentifier = "test-0.15774236139258568";

const getAnchorProvider = async (wallet: WalletContextState) => {
  const opts: ConfirmOptions = {
    preflightCommitment: "confirmed",
  };

  if (!wallet.connected || !wallet) {
    wallet.connect();
  }
  if (!provider)
    provider = new anchor.AnchorProvider(connection, asWallet(wallet), opts);
  return provider;
};

const getAnchorProgram = async (wallet: WalletContextState) => {
  const provider = await getAnchorProvider(wallet);
  if (!program) program = new anchor.Program(IDL, programId, provider);
  return program;
};

const sendTxs = async (
  txs: Transaction[],
  wallet: WalletContextState,
  local?: boolean
) => {
  const feeTX = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: wallet.publicKey!,
      toPubkey: bozoPK,
      lamports: LAMPORTS_PER_SOL / 100,
    })
  );

  let blockhash = (await connection.getLatestBlockhash("finalized")).blockhash;
  feeTX.recentBlockhash = blockhash;
  feeTX.feePayer = wallet.publicKey!;

  txs.push(feeTX);
  const latestBlockhash = (await connection.getLatestBlockhash()).blockhash;

  // @ts-ignore
  const signedTxs = await wallet.signAllTransactions(
    txs.map((tx) => {
      tx.recentBlockhash = latestBlockhash;
      tx.feePayer = wallet.publicKey!;
      return tx;
    })
  );
  const serialized = [];
  for (let i = 0; i < signedTxs.length; i++) {
    const signedTx = signedTxs[i];
    if (!local) {
      serialized.push(signedTx.serialize());
    } else {
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      serialized.push(txid);
      const blockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: blockHash.blockhash,
          lastValidBlockHeight: blockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );
    }
  }
  return serialized;
};

const stakeNfts = async (
  mints: PublicKey[],
  wallet: WalletContextState,
  local?: boolean
) => {
  if (!program) {
    await getAnchorProgram(wallet);
  }

  const stakerWallet = asWallet(wallet);
  const mappedMints = mints.map((mint) => {
    return { mintId: mint };
  });

  const toBeSigned = [];
  const chunkSize = 10;
  for (let i = 0; i < mappedMints.length; i += chunkSize) {
    toBeSigned.push(
      ...(await stake(
        provider.connection,
        stakerWallet,
        stakePoolIdentifier,
        mappedMints.slice(i, i + chunkSize)
      ))
    );
  }

  return sendTxs(toBeSigned, wallet, local);
};

const unstakeNfts = async (
  mints: PublicKey[],
  wallet: WalletContextState,
  local?: boolean
) => {
  if (!program) {
    await getAnchorProgram(wallet);
  }

  const mappedMints = mints.map((mint) => {
    return { mintId: mint };
  });

  const chunkSize = 10;
  const toBeSigned = [];
  for (let i = 0; i < mappedMints.length; i += chunkSize) {
    toBeSigned.push(
      ...(await unstake(
        provider.connection,
        asWallet(wallet),
        stakePoolIdentifier,
        mappedMints.slice(i, i + chunkSize)
      ))
    );
  }
  return sendTxs(toBeSigned, wallet, local);
};

export { stakeNfts, unstakeNfts };
