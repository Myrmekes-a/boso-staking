"use client";
import WalletButton from "@/components/dashboard/WalletButton";
import { WalletContext, useWallet } from "@solana/wallet-adapter-react";
import { WalletContextState } from "@solana/wallet-adapter-react";
import {
  IDL,
  SolanaNftProgramsRewardsCenter,
} from "../../../utils/pnftStaking/sdk/idl/solana_nft_programs_rewards_center";

import {
  PublicKey,
  ConfirmOptions,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  Keypair,
  Connection,
} from "@solana/web3.js";
import * as anchor from "@project-serum/anchor";
import {
  createProgrammableAsset,
  executeTransaction,
  executeTransactions,
  getTestConnection,
} from "@solana-nft-programs/common";
import {
  SOL_PAYMENT_INFO,
  findStakePoolId,
  stake,
  unstake,
} from "@/utils/pnftStaking/sdk";
import { asWallet } from "./Wallets";
import type { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";

export default function Test() {
  // const stakePoolIdentifier = `test-${Math.random()}`;
  const connection = new Connection(
    "https://api.devnet.solana.com"
  ); /* getTestConnection(); */
  const stakerWallet = asWallet(useWallet());
  const programId = "ox64uWcbrhaXBMACS3jpfzxnwxNWQd9J8ozT7PhZA5t";
  const stakePoolIdentifier = "test-0.5628066502435303";
  const mintId = new PublicKey("1gbWoCDS2MHRrvwFFxkbm58z5ffnRLyaodsP3Qpzeyj");

  let provider: anchor.AnchorProvider;
  let program: anchor.Program<SolanaNftProgramsRewardsCenter>;

  const getAnchorProvider = async (wallet: Wallet) => {
    const opts: ConfirmOptions = {
      preflightCommitment: "confirmed",
    };

    if (provider) {
      return provider;
    }

    provider = new anchor.AnchorProvider(connection, wallet, opts);
    return provider;
  };

  const getAnchorProgram = async (wallet: Wallet) => {
    if (!provider) {
      provider = await getAnchorProvider(wallet);
    }
    if (program) {
      return program;
    }
    program = new anchor.Program(IDL, programId, provider);
    return program;
  };

  const init = async () => {
    const program = await getAnchorProgram(stakerWallet);
    const stakePoolId = findStakePoolId(stakePoolIdentifier);
    const tx = new Transaction();
    const ix = await program.methods
      .initPool({
        identifier: stakePoolIdentifier,
        allowedCollections: [],
        allowedCreators: [],
        requiresAuthorization: false,
        authority: stakerWallet.publicKey!,
        resetOnUnstake: false,
        cooldownSeconds: null,
        minStakeSeconds: null,
        endDate: null,
        stakePaymentInfo: SOL_PAYMENT_INFO,
        unstakePaymentInfo: SOL_PAYMENT_INFO,
      })
      .accounts({
        stakePool: stakePoolId,
        payer: stakerWallet.publicKey!,
        systemProgram: SystemProgram.programId,
      })
      .rpc();
    /*  tx.add(ix);

    const txres = await executeTransaction(
      provider.connection,
      tx,
      // @ts-ignore
      stakerWallet
    ); */
    console.log(ix);
  };
  let stakerTokenAccountId: PublicKey;

  /*  const pre = async () => {
    const airdropStaker = await provider.connection.requestAirdrop(
      stakerWallet.publicKey,
      5 * LAMPORTS_PER_SOL
    );
    await provider.connection.confirmTransaction(airdropStaker);

    [stakerTokenAccountId, mintId] = await createProgrammableAsset(
      provider.connection,
      stakerWallet
    );
    console.log("MINT", mintId.toBase58());
  }; */

  const stakeWrapper = async () => {
    const program = await getAnchorProgram(stakerWallet);

    /*     await pre();
     */
    const tx = await executeTransactions(
      provider.connection,
      await stake(provider.connection, stakerWallet, stakePoolIdentifier, [
        { mintId },
      ]),
      stakerWallet,
      {
        errorHandler: (e) => {
          throw e;
        },
      }
    );
    console.log(tx);
  };

  const unstakeWrapper = async () => {
    const tx = await executeTransactions(
      provider.connection,
      await unstake(provider.connection, stakerWallet, stakePoolIdentifier, [
        { mintId },
      ]),
      stakerWallet
    );

    console.log(tx);
  };

  return (
    <>
      <WalletButton />
      <div>
        <button onClick={() => {}}>Init</button>
        <br></br>
        <button onClick={stakeWrapper}>Stake</button>
        <br></br>
        <button onClick={unstakeWrapper}>Unstake</button>
        <br></br>
      </div>
    </>
  );
}
