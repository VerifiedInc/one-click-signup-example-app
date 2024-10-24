import { createContext, useContext } from 'react';
import { Config, config } from '@/config.client';

const Context = createContext<Config>({} as unknown as Config);

export const useEnv = () => {
  return useContext(Context);
};

export function EnvProvider({ children }: { children: React.ReactNode }) {
  return <Context.Provider value={config}>{children}</Context.Provider>;
}
