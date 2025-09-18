# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying the Private Gaming Achievements Platform to Vercel.

## Prerequisites

- GitHub account with access to the repository
- Vercel account (free tier available)
- Node.js 18+ installed locally (for testing)

## Step 1: Prepare the Repository

1. Ensure all code is committed and pushed to the main branch
2. Verify the project structure includes:
   - `package.json` with correct dependencies
   - `src/` directory with React components
   - `contracts/` directory with Solidity contracts
   - `README.md` with project documentation

## Step 2: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository:
   - Select "Import Git Repository"
   - Choose `davidwong22/player-controlled`
   - Click "Import"

## Step 3: Configure Build Settings

1. **Framework Preset**: Select "Vite"
2. **Root Directory**: Leave as default (./)
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

## Step 4: Set Environment Variables

In the Vercel dashboard, go to Project Settings > Environment Variables and add:

```
NEXT_PUBLIC_CHAIN_ID=11155111
NEXT_PUBLIC_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475
NEXT_PUBLIC_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
NEXT_PUBLIC_CONTRACT_ADDRESS=0x0000000000000000000000000000000000000000
```

**Important**: Replace `NEXT_PUBLIC_CONTRACT_ADDRESS` with the actual deployed contract address once the smart contract is deployed.

## Step 5: Deploy

1. Click "Deploy" to start the deployment process
2. Wait for the build to complete (usually 2-3 minutes)
3. Once deployed, you'll receive a URL like `https://player-controlled-xxx.vercel.app`

## Step 6: Configure Custom Domain (Optional)

1. Go to Project Settings > Domains
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions
4. Wait for DNS propagation (up to 24 hours)

## Step 7: Smart Contract Deployment

Before the application is fully functional, you need to deploy the smart contract:

### Using Hardhat (Recommended)

1. Install Hardhat:
```bash
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-ethers ethers
```

2. Create `hardhat.config.js`:
```javascript
require("@nomiclabs/hardhat-ethers");

module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990",
      accounts: ["YOUR_PRIVATE_KEY"]
    }
  }
};
```

3. Deploy the contract:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

4. Update the `NEXT_PUBLIC_CONTRACT_ADDRESS` environment variable in Vercel with the deployed contract address.

## Step 8: Testing the Deployment

1. Visit your deployed URL
2. Connect a Web3 wallet (MetaMask, Rainbow, etc.)
3. Switch to Sepolia testnet
4. Test the following features:
   - Wallet connection
   - Player registration
   - Achievement creation
   - Achievement unlocking
   - Achievement revealing

## Step 9: Monitoring and Maintenance

1. **Monitor Deployments**: Check Vercel dashboard for deployment status
2. **View Logs**: Use Vercel's function logs to debug issues
3. **Update Environment Variables**: Modify in Vercel dashboard as needed
4. **Redeploy**: Automatic redeployment on git push to main branch

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (should be 18+)
   - Verify all dependencies are in package.json
   - Check for TypeScript errors

2. **Environment Variables**:
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify no extra spaces or characters

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure contract address is set

4. **Smart Contract Issues**:
   - Verify contract is deployed on Sepolia
   - Check contract address is correct
   - Ensure contract ABI matches

### Getting Help

- Check Vercel documentation: [vercel.com/docs](https://vercel.com/docs)
- Review project logs in Vercel dashboard
- Test locally with `npm run dev` before deploying

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to git
2. **Contract Security**: Audit smart contracts before mainnet deployment
3. **Access Control**: Implement proper access controls in contracts
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Performance Optimization

1. **Image Optimization**: Use Vercel's built-in image optimization
2. **Caching**: Configure appropriate cache headers
3. **Bundle Size**: Monitor and optimize bundle size
4. **CDN**: Vercel automatically provides global CDN

## Backup and Recovery

1. **Code Backup**: Code is stored in GitHub
2. **Environment Variables**: Export and backup from Vercel dashboard
3. **Database**: If using external database, ensure regular backups
4. **Smart Contract**: Keep deployment scripts and addresses safe

## Cost Management

1. **Vercel Free Tier**: 100GB bandwidth, 100GB-hours serverless function execution
2. **Upgrade Plans**: Available if you exceed free tier limits
3. **Monitoring**: Use Vercel dashboard to monitor usage

## Next Steps

1. Set up monitoring and analytics
2. Implement error tracking (Sentry, etc.)
3. Add performance monitoring
4. Set up automated testing
5. Plan for mainnet deployment
