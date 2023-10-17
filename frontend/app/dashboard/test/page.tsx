"use client";
import WalletButton from "@/components/dashboard/WalletButton";
import { useWallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";

import { stake, unstake } from "@/utils/staking/lib";
import { useSession } from "next-auth/react";
import { GenericRequest, genericRequest } from "@/utils/request";

export default function Test() {
  const wallet = useWallet();
  const nftMint = new PublicKey("AZTB2mfGfnxeVf63KUcrcKtYVY82dRQwBdkyPR4iPLEh");
  const nftMint2 = new PublicKey(
    "He4gALHUZLP2PgjK7zyFsV9yE9wHTFz9VH3RjFrXeDgh"
  );

  /*   const connection = new Connection(
    "https://api.devnet.solana.com",
    "confirmed"
  );
  const programId = idl.metadata.address;
  const collectionAddress = new PublicKey(
    "2RY7SpwjNpKgaUUs63GmZ2kUUtekMZn4C1S2EXG8RacH"
  );

  // REWARD TOKEN
  const tokenMint = new PublicKey(
    "9wwRfEx7bRhBwZPd8JkK1xL3ceXofMVmCJLT69bWCxai"
  ); // Mint of the Token to be given as reward
  const tokenAccount = new PublicKey(
    "FeEXDzW1pMvHjjNiguPbhKNFBzWqLTVpvDBkki8GDAF8"
  );

  // MINT OF THE NFT
  const nftMint = new PublicKey("AZTB2mfGfnxeVf63KUcrcKtYVY82dRQwBdkyPR4iPLEh");

  const nftToken = new PublicKey(
    "4Q7eqhybVgFoiEbm7yrorCQ8rbemBm1XDkBVGuMCMiov"
  );
  const nftMetadata = new PublicKey(
    "KevFxKYdxuFPC1NqsoYtxwin4JwPRFM1LoBfqRdUbHe"
  );
  const nftEdition = new PublicKey(
    "DncF6WqNgBfnzj6emsxNGXPJr1yVSW5YFx5SN2sN89m6"
  );

  const nftMint2 = new PublicKey(
    "He4gALHUZLP2PgjK7zyFsV9yE9wHTFz9VH3RjFrXeDgh"
  );

  const nftToken2 = new PublicKey(
    "4z9sW8U23KskLb2DSZKMxD7CDAB78mbwhZExXuY9Kkmm"
  );
  const nftMetadata2 = new PublicKey(
    "FnL2gUnpHkYsdyQvKReYbTTVhgTAtpHi4tHx9yHmo8Ur"
  );
  const nftEdition2 = new PublicKey(
    "FJJwXH2g4NBPj28pgdR51ctAB2znNG5gEBqncuXRBt6h"
  );

  const [stakeDetails] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("stake"),
      collectionAddress.toBytes(),
      //wallet.publicKey?.toBytes()!,
      new PublicKey("iHxTBpZTvSDuUFY8372UCc8jWJoFLq4Lc65nYUEGN9q").toBytes(),
    ],
    new PublicKey(programId)
  );

  const [tokenAuthority] = PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode("token-authority"), stakeDetails.toBytes()],
    new PublicKey(programId)
  );

  const [nftRecord] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("nft-record"),
      stakeDetails.toBytes(),
      nftMint.toBytes(),
    ],
    new PublicKey(programId)
  );

  const [nftRecord2] = PublicKey.findProgramAddressSync(
    [
      utils.bytes.utf8.encode("nft-record"),
      stakeDetails.toBytes(),
      nftMint2.toBytes(),
    ],
    new PublicKey(programId)
  );

  const [nftAuthority] = PublicKey.findProgramAddressSync(
    [utils.bytes.utf8.encode("nft-authority"), stakeDetails.toBytes()],
    new PublicKey(programId)
  );

  const nftCustody = token.getAssociatedTokenAddressSync(
    nftMint,
    nftAuthority,
    true
  );

  const nftCustody2 = token.getAssociatedTokenAddressSync(
    nftMint2,
    nftAuthority,
    true
  );

  let provider: anchor.AnchorProvider | undefined;

  async function getProvider() {
    const opts: ConfirmOptions = {
      preflightCommitment: "confirmed",
    };

    if (!wallet.connected || !wallet) {
      wallet.connect();
    }

    if (!provider)
      provider = new anchor.AnchorProvider(connection, wallet, opts);
    return provider;
  }

  let program: anchor.Program<NftStakeVault> | undefined;

  async function createProgram() {
    const provider = await getProvider();
    if (!program) program = new anchor.Program(IDL, programId, provider);
    return program;
  }

  const stakeTokenVault = token.getAssociatedTokenAddressSync(
    tokenMint,
    tokenAuthority,
    true
  );

  async function createTokenAccount() {
    //const mint = nftMint;
    const mint = new PublicKey("DskQgewLBTmPBZwWAZ5U7swcPeggpZ5eRbb6gurY1oZd");
    const associatedToken = await token.getAssociatedTokenAddress(
      mint, // mint of the token
      wallet.publicKey! // owner of this token account
    );

    const accountInfo = await connection.getAccountInfo(associatedToken);

    if (!accountInfo) {
      alert("Creating token account");
      const tx = new Transaction().add(
        token.createAssociatedTokenAccountInstruction(
          wallet.publicKey!,
          associatedToken,
          wallet.publicKey!,
          mint
        )
      );
      let blockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;
      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet.publicKey!;
      const signedTx = await wallet.signTransaction(tx);
      const txid = await connection.sendRawTransaction(signedTx.serialize());
      const blockHash = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        {
          blockhash: blockHash.blockhash,
          lastValidBlockHeight: blockHash.lastValidBlockHeight,
          signature: txid,
        },
        "confirmed"
      );
    } else {
      console.log("ASSOC:" + associatedToken);
    }
  }

  async function createAccountAndStake( mint: PublicKey) {
    const program = await createProgram();

    //const mint = nftMint;
    const mint = new PublicKey("AyRhD1Yh8MAdZAhQL8eK1FZcogg1GW4Y87HqsWJytTzo");
    const associatedToken = await token.getAssociatedTokenAddress(
      mint, // mint of the token
      wallet.publicKey! // owner of this token account
    );

    const accountInfo = await connection.getAccountInfo(associatedToken);
    const toBeSigned = [];
    if (!accountInfo) {
      alert("Creating token account");
      const tx = new Transaction().add(
        token.createAssociatedTokenAccountInstruction(
          wallet.publicKey!,
          associatedToken,
          wallet.publicKey!,
          mint
        )
      );
      let blockhash = (await connection.getLatestBlockhash("finalized"))
        .blockhash;

      tx.recentBlockhash = blockhash;
      tx.feePayer = wallet.publicKey!;
      toBeSigned.push(tx);
    } else {
      console.log("ASSOC:" + associatedToken);
    }

    const txIx = await program.methods
      .stake()
      .accounts({
        stakeDetails,
        nftRecord,
        nftMint,
        nftToken,
        nftMetadata,
        nftAuthority,
        nftEdition,
        nftCustody,
        signer: wallet.publicKey?.toBase58(),
      })
      .instruction();
    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    const tx1 = new Transaction().add(txIx);

    tx1.recentBlockhash = blockhash;
    tx1.feePayer = wallet.publicKey!;
    toBeSigned.push(tx1);

    const message = new TextEncoder().encode("Welcome to SYNDRA!");
    const signature = await wallet.signMessage(message);
    const signedTxs = await wallet.signAllTransactions(toBeSigned);
    for (let i = 0; i < signedTxs.length; i++) {
      const signedTx = signedTxs[i];
      const txid = await connection.sendRawTransaction(signedTx.serialize());
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

  async function doubleStake() {
    const program = await createProgram();
    const toBeSigned = [];

    const txIx1 = await program.methods
      .stake()
      .accounts({
        stakeDetails,
        nftRecord,
        nftMint,
        nftToken,
        nftMetadata,
        nftAuthority,
        nftEdition,
        nftCustody,
        signer: wallet.publicKey?.toBase58(),
      })
      .instruction();
    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    const tx1 = new Transaction().add(txIx1);

    tx1.recentBlockhash = blockhash;
    tx1.feePayer = wallet.publicKey!;
    toBeSigned.push(tx1);

    const txIx2 = await program.methods
      .stake()
      .accounts({
        stakeDetails,
        nftRecord: nftRecord2,
        nftMint: nftMint2,
        nftToken: nftToken2,
        nftMetadata: nftMetadata2,
        nftAuthority,
        nftEdition: nftEdition2,
        nftCustody: nftCustody2,
        signer: wallet.publicKey?.toBase58(),
      })
      .instruction();

    const tx2 = new Transaction().add(txIx2);
    tx2.recentBlockhash = blockhash;
    tx2.feePayer = wallet.publicKey!;
    toBeSigned.push(tx2);
    const signedTxs = await wallet.signAllTransactions(toBeSigned);
    for (let i = 0; i < signedTxs.length; i++) {
      const signedTx = signedTxs[i];
      const txid = await connection.sendRawTransaction(signedTx.serialize());
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

  async function doubleUnstake() {
    const program = await createProgram();
    const toBeSigned = [];

    const txIx1 = await program.methods
      .unstake()
      .accounts({
        stakeDetails,
        nftRecord,
        rewardMint: tokenMint,
        rewardReceiveAccount: tokenAccount,
        tokenAuthority,
        nftAuthority,
        nftCustody,
        nftMint,
        nftReceiveAccount: nftToken,
        stakeTokenVault,
      })
      .instruction();
    let blockhash = (await connection.getLatestBlockhash("finalized"))
      .blockhash;
    const tx1 = new Transaction().add(txIx1);

    tx1.recentBlockhash = blockhash;
    tx1.feePayer = wallet.publicKey!;
    toBeSigned.push(tx1);

    const txIx2 = await program.methods
      .unstake()
      .accounts({
        stakeDetails,
        nftRecord: nftRecord2,
        rewardMint: tokenMint,
        rewardReceiveAccount: tokenAccount,
        tokenAuthority,
        nftAuthority,
        nftCustody: nftCustody2,
        nftMint: nftMint2,
        nftReceiveAccount: nftToken2,
        stakeTokenVault,
      })
      .instruction();

    const tx2 = new Transaction().add(txIx2);
    tx2.recentBlockhash = blockhash;
    tx2.feePayer = wallet.publicKey!;
    toBeSigned.push(tx2);
    const signedTxs = await wallet.signAllTransactions(toBeSigned);
    for (let i = 0; i < signedTxs.length; i++) {
      const signedTx = signedTxs[i];
      const txid = await connection.sendRawTransaction(signedTx.serialize());
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

  async function stake() {
    const program = await createProgram();

    const tx = await program.methods
      .stake()
      .accounts({
        stakeDetails,
        nftRecord,
        nftMint,
        nftToken,
        nftMetadata,
        nftAuthority,
        nftEdition,
        nftCustody,
        signer: wallet.publicKey?.toBase58(),
      })
      .rpc();

    alert("Staked" + tx);
  }

  async function unstake() {
    const program = await createProgram();

    const tx = await program.methods
      .unstake()
      .accounts({
        stakeDetails,
        nftRecord,
        rewardMint: tokenMint,
        rewardReceiveAccount: tokenAccount,
        tokenAuthority,
        nftAuthority,
        nftCustody,
        nftMint,
        nftReceiveAccount: nftToken,
        stakeTokenVault,
      })
      .rpc();

    alert(tx);

    let stakeAccount = await program.account.details.fetch(stakeDetails);
    console.log("Stake Details: ", stakeAccount);
  }
 */

  const { data: session } = useSession();

  const stakeWrapper = async () => {
    const mints = [nftMint /* nftMint2 */];

    const tx = await stake(mints, wallet, true);
    console.log(tx);
  };

  const unstakeWrapper = async () => {
    const mints = [nftMint /* nftMint2 */];
    const tx = await unstake(mints, wallet, true);
    console.log(tx);
    /*  const nftsRequest: GenericRequest = {
      method: "POST",
      url: "/nft/unstake",
      token: session?.user.token!,
      data: { mints: [ nftMint2], serialized: tx },
    };
    const response = await genericRequest(nftsRequest); */
  };

  return (
    <>
      <WalletButton />
      <div>
        <button onClick={stakeWrapper}>Stake</button>
        <br></br>
        <button onClick={unstakeWrapper}>Unstake</button>
        {/*  <h1>Test</h1>
        <button onClick={createAccountAndStake}>Stake</button>
        <br></br>
        <button onClick={doubleStake}>doubleStake</button>
        <br></br>
        <button onClick={unstake}>Unstake</button>
        <br></br>
        <button onClick={doubleUnstake}>doubleUnstake</button>
        <br></br>
        <button onClick={createTokenAccount}>Create Token Account</button> */}
      </div>
    </>
  );
}
