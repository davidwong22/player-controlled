# Private Gaming Achievements Platform

A decentralized platform for managing encrypted gaming achievements using Fully Homomorphic Encryption (FHE) technology.

## Features

- **Encrypted Achievement Storage**: Keep your gaming achievements private and encrypted on-chain
- **Selective Reveal**: Choose which achievements to reveal and when to show them
- **Anti-Meta Gaming**: Prevent others from exploiting your achievement patterns
- **Real Wallet Integration**: Connect with popular wallet providers like Rainbow, MetaMask, and more
- **FHE-Powered Privacy**: Core data encrypted using Zama's FHE technology

## Technologies

- **Frontend**: React 18, TypeScript, Vite
- **UI Components**: shadcn/ui, Tailwind CSS
- **Wallet Integration**: RainbowKit, Wagmi, Viem
- **Blockchain**: Ethereum Sepolia Testnet
- **Privacy**: Zama FHE (Fully Homomorphic Encryption)
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- A Web3 wallet (MetaMask, Rainbow, etc.)

### Installation

```bash
# Clone the repository
git clone https://github.com/davidwong22/player-controlled.git

# Navigate to the project directory
cd player-controlled

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

## Smart Contract

The platform uses a custom FHE-enabled smart contract that encrypts achievement data:

- **Campaign Management**: Create and manage achievement campaigns
- **Encrypted Storage**: All achievement data is encrypted using FHE
- **Selective Reveal**: Control when achievements become visible
- **Reputation System**: Track donor and charity reputation scores

## Deployment

### Vercel Deployment

1. Connect your GitHub repository to Vercel
2. Set the environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
# Build the project
npm run build

# Preview the build
npm run preview
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details
