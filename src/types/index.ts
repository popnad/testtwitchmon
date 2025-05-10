export interface Comment {
  id: string;
  username: string;
  message: string;
  timestamp: number;
  txHash: string | null;
  status?: 'pending' | 'confirmed' | 'failed';
}

export interface Reaction {
  id: string;
  type: string;
  timestamp: number;
  txHash: string | null;
}

export interface NFTMetadata {
  name: string;
  description: string;
  image: string;
  timestamp: number;
  channel: string;
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
}

export interface Transaction {
  hash: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: number;
  type: 'comment' | 'reaction' | 'nft';
}