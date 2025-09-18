// Environment configuration
export const config = {
  chainId: process.env.NEXT_PUBLIC_CHAIN_ID || '11155111',
  rpcUrl: process.env.NEXT_PUBLIC_RPC_URL || 'https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990',
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || '2ec9743d0d0cd7fb94dee1a7e6d33475',
  infuraApiKey: process.env.NEXT_PUBLIC_INFURA_API_KEY || 'b18fb7e6ca7045ac83c41157ab93f990',
  contractAddress: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000',
};
