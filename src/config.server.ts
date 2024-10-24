interface Config {
  NODE_ENV: string;
  ENV: string;
  ONE_CLICK_API_KEY?: string;
  ONE_CLICK_API_URL?: string;
}

export const config: Config = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  ENV: process.env.NEXT_PUBLIC_ENV || 'local',
  ONE_CLICK_API_KEY: process.env.NEXT_PUBLIC_ONE_CLICK_API_KEY || undefined,
  ONE_CLICK_API_URL: process.env.NEXT_PUBLIC_ONE_CLICK_API_URL || undefined,
};
