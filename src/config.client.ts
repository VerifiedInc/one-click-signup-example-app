export interface Config {
  ENV: string;
}

export const config: Config = {
  ENV: process.env.NEXT_PUBLIC_ENV || 'local',
} as const;
