import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";

interface WalletConnectProps {
  isConnected?: boolean;
  address?: string;
  onConnect?: () => void;
  onDisconnect?: () => void;
}

export function WalletConnect({ 
  isConnected = false, 
  address,
  onConnect,
  onDisconnect 
}: WalletConnectProps) {
  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  if (isConnected && address) {
    return (
      <Button 
        variant="outline" 
        onClick={onDisconnect}
        className="border-primary/50 bg-background/80 hover:bg-primary/10 text-primary glow-primary"
      >
        <Wallet className="mr-2 h-4 w-4" />
        {truncateAddress(address)}
      </Button>
    );
  }

  return (
    <Button 
      onClick={onConnect}
      className="bg-gradient-neon hover:opacity-90 text-primary-foreground font-gaming glow-primary"
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connect Wallet
    </Button>
  );
}