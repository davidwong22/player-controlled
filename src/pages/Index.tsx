import { useState } from "react";
import { WalletConnect } from "@/components/ui/wallet-connect";
import { AchievementsGrid } from "@/components/achievements-grid";
import { Shield, Eye, Zap } from "lucide-react";

const Index = () => {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>();

  const handleConnect = () => {
    // Mock wallet connection
    setIsWalletConnected(true);
    setWalletAddress("0x742d35Cc6635Bc0532674B1B5E9268FE9a3E6B5C");
  };

  const handleDisconnect = () => {
    setIsWalletConnected(false);
    setWalletAddress(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-neon flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-xl font-gaming font-bold text-foreground">
                Private Gaming Achievements
              </h1>
            </div>
            
            <WalletConnect 
              isConnected={isWalletConnected}
              address={walletAddress}
              onConnect={handleConnect}
              onDisconnect={handleDisconnect}
            />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-6xl font-gaming font-bold text-glow animate-neon-pulse">
              Reveal Achievements On Your Terms
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Keep your gaming achievements private and encrypted until you choose to reveal them. 
              No more competitive meta abuse - show your trophies when you want to.
            </p>
          </div>

          {/* Feature highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-primary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-gaming text-lg font-semibold">Encrypted Achievements</h3>
              <p className="text-sm text-muted-foreground">
                Your achievements stay encrypted on-chain until you decide to reveal them
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-accent/20 flex items-center justify-center">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-gaming text-lg font-semibold">Selective Reveal</h3>
              <p className="text-sm text-muted-foreground">
                Choose which achievements to show and when to show them
              </p>
            </div>

            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-lg bg-secondary/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-secondary" />
              </div>
              <h3 className="font-gaming text-lg font-semibold">No Meta Abuse</h3>
              <p className="text-sm text-muted-foreground">
                Prevent others from exploiting your achievement patterns
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="mb-8">
            <h3 className="text-2xl font-gaming font-bold mb-2">Your Achievement Vault</h3>
            <p className="text-muted-foreground">
              {isWalletConnected 
                ? "Connect your wallet to reveal unlocked achievements"
                : "Connect your wallet to access your encrypted achievements"
              }
            </p>
          </div>
          
          <AchievementsGrid isWalletConnected={isWalletConnected} />
        </div>
      </section>
    </div>
  );
};

export default Index;
