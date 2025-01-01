'use client';
import { WagmiProvider, createConfig, http } from "wagmi";
import { base, optimism, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";

const GROVE_ID = process.env.NEXT_PUBLIC_GROVE_ID!;

const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    chains: [base, optimism, arbitrum],
    transports: {
      // RPC URL for each chain
      [base.id]: http(
        `https://base.rpc.grove.city/v1/${GROVE_ID}`
      ),
      [arbitrum.id]: http(`https://arbitrum-one.rpc.grove.city/v1/${GROVE_ID}`),
      [optimism.id]: http(`https://optimism.rpc.grove.city/v1/${GROVE_ID}`),
    },

    // Required API Keys
    walletConnectProjectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,

    // Required App Info
    appName: "Your App Name",

    // Optional App Info
    appDescription: "Your App Description",
    appUrl: "https://family.co", // your app's url
    appIcon: "https://family.co/logo.png", // your app's icon, no bigger than 1024x1024px (max. 1MB)
  }),
);

const queryClient = new QueryClient();

export const Web3Provider = ({ children }) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>{children}</ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
};