import { createContext, ReactNode, useContext } from "react";
interface PlayerContextType {
  player: any;
  isLoading: boolean;
  error: string | null;
  refreshPlayer: () => Promise<void>;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const player = {
    player: null,
    isLoading: false,
    error: null,
    refreshPlayer: async () => {},
  };

  return (
    <PlayerContext.Provider value={player}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};
