import { extend } from "lodash";

export interface Wallet {
  [key: string]: string;
}

export interface ENSProfile {
  address: string;
  avatar: string;
  avatar_small: string;
  avatar_url: string;
  contentHash: string | null;
  ens: string;
  ens_primary: string;
  github: string;
  resolverAddress: string;
  twitter: string;
  url: string;
  wallets: Wallet;
}

export interface Post {
  title: string;
  content: string;
}

export interface PostWithMetadata extends Post {
  metadata: {
    chainId: number;
    hash: string;
    publishedAt: string;
    author: string;
  };
}
