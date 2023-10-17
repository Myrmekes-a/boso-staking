import { utils } from "@project-serum/anchor";
import * as token from "@solana/spl-token";
import { Connection, PublicKey } from "@solana/web3.js";
import { Metaplex } from "@metaplex-foundation/js";
import idl from "./idl/idl.json";

const network =
  process.env.NEXT_PUBLIC_NETWORK || "https://api.devnet.solana.com";
const connection = new Connection(network, "finalized");
const metaplex = Metaplex.make(connection);

const programId = idl.metadata.address;
const programOwner = new PublicKey(
  "iHxTBpZTvSDuUFY8372UCc8jWJoFLq4Lc65nYUEGN9q"
);
const collectionAddress = new PublicKey(
  "2RY7SpwjNpKgaUUs63GmZ2kUUtekMZn4C1S2EXG8RacH"
);

// REWARD TOKEN
const rewardMint = new PublicKey(
  "9wwRfEx7bRhBwZPd8JkK1xL3ceXofMVmCJLT69bWCxai"
); // Mint of the Token to be given as reward

const [stakeDetails] = PublicKey.findProgramAddressSync(
  [
    utils.bytes.utf8.encode("stake"),
    collectionAddress.toBytes(),
    programOwner.toBytes(),
  ],
  new PublicKey(programId)
);

const [tokenAuthority] = PublicKey.findProgramAddressSync(
  [utils.bytes.utf8.encode("token-authority"), stakeDetails.toBytes()],
  new PublicKey(programId)
);

const [nftAuthority] = PublicKey.findProgramAddressSync(
  [utils.bytes.utf8.encode("nft-authority"), stakeDetails.toBytes()],
  new PublicKey(programId)
);

const stakeTokenVault = token.getAssociatedTokenAddressSync(
  rewardMint,
  tokenAuthority,
  true
);

const bozoKey = process.env.NEXT_PUBLIC_BOZOPK;
const bozoPK = new PublicKey(bozoKey!);

// export constants
export {
  connection,
  metaplex,
  programId,
  programOwner,
  collectionAddress,
  rewardMint,
  stakeDetails,
  tokenAuthority,
  nftAuthority,
  stakeTokenVault,
  bozoPK,
};
