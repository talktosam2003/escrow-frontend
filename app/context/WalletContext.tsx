"use client";
import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { StellarWalletsKit, WalletNetwork, WalletType, ISupportedWallet } from "@creit.tech/stellar-wallets-kit";

interface WalletContextType {
  address: string | null;
  kit: StellarWalletsKit | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  isConnecting: boolean;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  kit: null,
  connect: async () => {},
  disconnect: () => {},
  isConnecting: false,
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [address, setAddress] = useState<string | null>(null);
  const [kit, setKit] = useState<StellarWalletsKit | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    try {
      const walletKit = new StellarWalletsKit({
        network: WalletNetwork.TESTNET,
        selectedWalletId: WalletType.FREIGHTER,
        wallets: [WalletType.FREIGHTER],
      });
      await walletKit.openModal({
        onWalletSelected: async (option: ISupportedWallet) => {
          walletKit.setWallet(option.id);
          const { address: addr } = await walletKit.getAddress();
          setAddress(addr);
          setKit(walletKit);
        },
      });
    } catch (e) {
      console.error("Wallet connection failed", e);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnect = useCallback(() => {
    setAddress(null);
    setKit(null);
  }, []);

  return (
    <WalletContext.Provider value={{ address, kit, connect, disconnect, isConnecting }}>
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => useContext(WalletContext);
