export interface Config {
  ENV: string;
  demoUrl: string;
  docsUrl: string;
  dashboardUrl: string;
}

export const config: Config = {
  ENV: process.env.NEXT_PUBLIC_ENV || 'local',
  demoUrl:
    process.env.NEXT_PUBLIC_DEMO_URL || 'https://1-click.demo.verified.inc',
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL || 'https://docs.verified.inc',
  dashboardUrl:
    process.env.NEXT_PUBLIC_DASHBOARD_URL || 'https://dashboard.verified.inc',
} as const;
