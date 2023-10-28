import { AnchorProvider, Program } from "@coral-xyz/anchor";
import type { AllAccountsMap } from "@coral-xyz/anchor/dist/cjs/program/namespace/types";
import type { Wallet } from "@coral-xyz/anchor/dist/cjs/provider";
import type { ConfirmOptions, Connection } from "@solana/web3.js";
import { Keypair, PublicKey } from "@solana/web3.js";
import type { IdlAccountData as cIdlAccountData } from "@solana-nft-programs/common";
import { emptyWallet } from "@solana-nft-programs/common";

import type { SolanaNftProgramsRewardsCenter } from "./idl/solana_nft_programs_rewards_center";
import { IDL } from "./idl/solana_nft_programs_rewards_center";

export const REWARDS_CENTER_IDL = IDL;

export const REWARDS_CENTER_ADDRESS = new PublicKey(
  "ox64uWcbrhaXBMACS3jpfzxnwxNWQd9J8ozT7PhZA5t"
);

export const WRAPPED_SOL_PAYMENT_INFO = new PublicKey(
  "4NiNfWaUSrpmLmQmyX2WVtAQfQeMU4yrNuhJf5Ad4KLa"
);
// 382KXQfzC26jbFmLZBmKoZ6eRz53iwGfxXwoGyyyH8po

export const SOL_PAYMENT_INFO = new PublicKey(
  "F9Poe7UaPH9MBwgcwZcsqXqSF42SP4LTLkRxw2nwovpo"
);
// HqiCY5NqfHfyhyjheQ4ENo5J2XSQBpeqhNoeESkDWBpU

export const DEFAULT_PAYMENT_INFO = new PublicKey(
  "5gky4L1nEFsZJHCgnPYrEMAmnYsgVJu17qtmamrwaivK"
);
// SdFEeJxn7XxcnYEMNpnoMMSsTfmA1bHfiRdu6qra7zL

export type IdlAccountData<
  T extends keyof AllAccountsMap<SolanaNftProgramsRewardsCenter>,
> = cIdlAccountData<T, SolanaNftProgramsRewardsCenter>;
export type RewardDistributor = IdlAccountData<"rewardDistributor">;
export type RewardEntry = IdlAccountData<"rewardEntry">;
export type StakePool = IdlAccountData<"stakePool">;
export type StakeEntry = IdlAccountData<"stakeEntry">;
export type ReceiptManager = IdlAccountData<"receiptManager">;
export type RewardReceipt = IdlAccountData<"rewardReceipt">;
export type StakeBooster = IdlAccountData<"stakeBooster">;
export type StakeAuthorizationRecord =
  IdlAccountData<"stakeAuthorizationRecord">;
export type PaymentInfo = IdlAccountData<"paymentInfo">;

export type PaymentShare = {
  address: PublicKey;
  basisPoints: number;
};

export const rewardsCenterProgram = (
  connection: Connection,
  wallet?: Wallet,
  opts?: ConfirmOptions
) => {
  return new Program<SolanaNftProgramsRewardsCenter>(
    REWARDS_CENTER_IDL,
    REWARDS_CENTER_ADDRESS,
    new AnchorProvider(
      connection,
      wallet ?? emptyWallet(Keypair.generate().publicKey),
      opts ?? {}
    )
  );
};
