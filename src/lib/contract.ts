import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { parseAbi } from 'viem';

// Contract ABI - this would be generated from the compiled contract
const contractAbi = parseAbi([
  'function registerPlayer() external',
  'function createAchievement(string memory _name, string memory _description, uint256 _rarity, uint256 _category, uint256 _maxProgress) external returns (uint256)',
  'function unlockAchievement(uint256 achievementId, bytes calldata progress, bytes calldata inputProof) external',
  'function revealAchievement(uint256 achievementId) external',
  'function getAchievementInfo(uint256 achievementId) external view returns (string memory, string memory, uint8, uint8, uint8, uint8, bool, bool, address, uint256, uint256)',
  'function getPlayerProfile(address player) external view returns (uint8, uint8, uint8, bool, uint256)',
  'function getPlayerAchievements(address player) external view returns (uint256[])',
  'function isPlayerRegistered(address player) external view returns (bool)',
  'function getAchievementOwner(uint256 achievementId) external view returns (address)',
  'event AchievementUnlocked(uint256 indexed achievementId, address indexed player, string name)',
  'event AchievementRevealed(uint256 indexed achievementId, address indexed player)',
  'event PlayerRegistered(address indexed player)',
  'event ReputationUpdated(address indexed player, uint32 reputation)'
]);

// Contract address - this would be the deployed contract address
const CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const usePlayerControlledAchievements = () => {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  // Check if player is registered
  const { data: isRegistered } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'isPlayerRegistered',
    args: address ? [address] : undefined,
  });

  // Get player profile
  const { data: playerProfile } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getPlayerProfile',
    args: address ? [address] : undefined,
  });

  // Get player achievements
  const { data: playerAchievements } = useReadContract({
    address: CONTRACT_ADDRESS as `0x${string}`,
    abi: contractAbi,
    functionName: 'getPlayerAchievements',
    args: address ? [address] : undefined,
  });

  // Register player
  const registerPlayer = async () => {
    if (!address) return;
    
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'registerPlayer',
      });
    } catch (error) {
      console.error('Error registering player:', error);
    }
  };

  // Create achievement
  const createAchievement = async (
    name: string,
    description: string,
    rarity: number,
    category: number,
    maxProgress: number
  ) => {
    if (!address) return;
    
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'createAchievement',
        args: [name, description, rarity, category, maxProgress],
      });
    } catch (error) {
      console.error('Error creating achievement:', error);
    }
  };

  // Unlock achievement
  const unlockAchievement = async (achievementId: number, progress: string, proof: string) => {
    if (!address) return;
    
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'unlockAchievement',
        args: [BigInt(achievementId), progress, proof],
      });
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  // Reveal achievement
  const revealAchievement = async (achievementId: number) => {
    if (!address) return;
    
    try {
      await writeContract({
        address: CONTRACT_ADDRESS as `0x${string}`,
        abi: contractAbi,
        functionName: 'revealAchievement',
        args: [BigInt(achievementId)],
      });
    } catch (error) {
      console.error('Error revealing achievement:', error);
    }
  };

  return {
    isRegistered: isRegistered as boolean,
    playerProfile,
    playerAchievements: playerAchievements as bigint[],
    registerPlayer,
    createAchievement,
    unlockAchievement,
    revealAchievement,
  };
};

export { contractAbi, CONTRACT_ADDRESS };
