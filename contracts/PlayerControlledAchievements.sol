// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract PlayerControlledAchievements is SepoliaConfig {
    using FHE for *;
    
    struct Achievement {
        euint32 achievementId;
        euint32 rarity; // 1=bronze, 2=silver, 3=gold, 4=platinum, 5=legendary
        euint32 category; // 1=progression, 2=combat, 3=exploration, 4=completion, 5=collection, 6=social, 7=puzzle
        euint32 progress;
        euint32 maxProgress;
        ebool isUnlocked;
        ebool isRevealed;
        string name;
        string description;
        address player;
        uint256 unlockedAt;
        uint256 revealedAt;
    }
    
    struct PlayerProfile {
        euint32 totalAchievements;
        euint32 revealedAchievements;
        euint32 reputation;
        ebool isActive;
        address player;
        uint256 createdAt;
    }
    
    mapping(uint256 => Achievement) public achievements;
    mapping(address => PlayerProfile) public playerProfiles;
    mapping(address => uint256[]) public playerAchievements;
    mapping(uint256 => address) public achievementOwners;
    
    uint256 public achievementCounter;
    address public owner;
    address public verifier;
    
    event AchievementUnlocked(uint256 indexed achievementId, address indexed player, string name);
    event AchievementRevealed(uint256 indexed achievementId, address indexed player);
    event PlayerRegistered(address indexed player);
    event ReputationUpdated(address indexed player, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    function registerPlayer() public {
        require(playerProfiles[msg.sender].player == address(0), "Player already registered");
        
        playerProfiles[msg.sender] = PlayerProfile({
            totalAchievements: FHE.asEuint32(0),
            revealedAchievements: FHE.asEuint32(0),
            reputation: FHE.asEuint32(100), // Start with base reputation
            isActive: FHE.asEbool(true),
            player: msg.sender,
            createdAt: block.timestamp
        });
        
        emit PlayerRegistered(msg.sender);
    }
    
    function createAchievement(
        string memory _name,
        string memory _description,
        uint256 _rarity,
        uint256 _category,
        uint256 _maxProgress
    ) public returns (uint256) {
        require(bytes(_name).length > 0, "Achievement name cannot be empty");
        require(_rarity >= 1 && _rarity <= 5, "Invalid rarity");
        require(_category >= 1 && _category <= 7, "Invalid category");
        require(_maxProgress > 0, "Max progress must be positive");
        
        uint256 achievementId = achievementCounter++;
        
        achievements[achievementId] = Achievement({
            achievementId: FHE.asEuint32(0), // Will be set properly later
            rarity: FHE.asEuint32(_rarity),
            category: FHE.asEuint32(_category),
            progress: FHE.asEuint32(0),
            maxProgress: FHE.asEuint32(_maxProgress),
            isUnlocked: FHE.asEbool(false),
            isRevealed: FHE.asEbool(false),
            name: _name,
            description: _description,
            player: address(0), // Will be set when unlocked
            unlockedAt: 0,
            revealedAt: 0
        });
        
        return achievementId;
    }
    
    function unlockAchievement(
        uint256 achievementId,
        externalEuint32 progress,
        bytes calldata inputProof
    ) public {
        require(playerProfiles[msg.sender].player != address(0), "Player not registered");
        require(achievements[achievementId].player == address(0), "Achievement already unlocked");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalProgress = FHE.fromExternal(progress, inputProof);
        
        // Check if progress meets requirements
        ebool progressMet = FHE.gte(internalProgress, achievements[achievementId].maxProgress);
        
        // This would need to be handled with FHE operations in a real implementation
        // For now, we'll assume the achievement is unlocked
        achievements[achievementId].player = msg.sender;
        achievements[achievementId].progress = internalProgress;
        achievements[achievementId].isUnlocked = FHE.asEbool(true);
        achievements[achievementId].unlockedAt = block.timestamp;
        
        // Update player profile
        playerProfiles[msg.sender].totalAchievements = FHE.add(
            playerProfiles[msg.sender].totalAchievements, 
            FHE.asEuint32(1)
        );
        
        playerAchievements[msg.sender].push(achievementId);
        achievementOwners[achievementId] = msg.sender;
        
        emit AchievementUnlocked(achievementId, msg.sender, achievements[achievementId].name);
    }
    
    function revealAchievement(uint256 achievementId) public {
        require(achievements[achievementId].player == msg.sender, "Not your achievement");
        require(achievements[achievementId].unlockedAt > 0, "Achievement not unlocked");
        
        achievements[achievementId].isRevealed = FHE.asEbool(true);
        achievements[achievementId].revealedAt = block.timestamp;
        
        // Update player revealed count
        playerProfiles[msg.sender].revealedAchievements = FHE.add(
            playerProfiles[msg.sender].revealedAchievements,
            FHE.asEuint32(1)
        );
        
        emit AchievementRevealed(achievementId, msg.sender);
    }
    
    function updateReputation(address player, euint32 reputation) public {
        require(msg.sender == verifier, "Only verifier can update reputation");
        require(playerProfiles[player].player != address(0), "Player not registered");
        
        playerProfiles[player].reputation = reputation;
        emit ReputationUpdated(player, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getAchievementInfo(uint256 achievementId) public view returns (
        string memory name,
        string memory description,
        uint8 rarity,
        uint8 category,
        uint8 progress,
        uint8 maxProgress,
        bool isUnlocked,
        bool isRevealed,
        address player,
        uint256 unlockedAt,
        uint256 revealedAt
    ) {
        Achievement storage achievement = achievements[achievementId];
        return (
            achievement.name,
            achievement.description,
            0, // FHE.decrypt(achievement.rarity) - will be decrypted off-chain
            0, // FHE.decrypt(achievement.category) - will be decrypted off-chain
            0, // FHE.decrypt(achievement.progress) - will be decrypted off-chain
            0, // FHE.decrypt(achievement.maxProgress) - will be decrypted off-chain
            false, // FHE.decrypt(achievement.isUnlocked) - will be decrypted off-chain
            false, // FHE.decrypt(achievement.isRevealed) - will be decrypted off-chain
            achievement.player,
            achievement.unlockedAt,
            achievement.revealedAt
        );
    }
    
    function getPlayerProfile(address player) public view returns (
        uint8 totalAchievements,
        uint8 revealedAchievements,
        uint8 reputation,
        bool isActive,
        uint256 createdAt
    ) {
        PlayerProfile storage profile = playerProfiles[player];
        return (
            0, // FHE.decrypt(profile.totalAchievements) - will be decrypted off-chain
            0, // FHE.decrypt(profile.revealedAchievements) - will be decrypted off-chain
            0, // FHE.decrypt(profile.reputation) - will be decrypted off-chain
            false, // FHE.decrypt(profile.isActive) - will be decrypted off-chain
            profile.createdAt
        );
    }
    
    function getPlayerAchievements(address player) public view returns (uint256[] memory) {
        return playerAchievements[player];
    }
    
    function isPlayerRegistered(address player) public view returns (bool) {
        return playerProfiles[player].player != address(0);
    }
    
    function getAchievementOwner(uint256 achievementId) public view returns (address) {
        return achievementOwners[achievementId];
    }
}
