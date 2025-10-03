// /workspaces/silo/playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

const landingPort = Number(process.env.LANDING_APP_PORT ?? 3003);
const platformPort = Number(process.env.PLATFORM_APP_PORT ?? 3004);
const landingBaseURL = process.env.LANDING_BASE_URL ?? `http://localhost:${landingPort}`;
const platformBaseURL = process.env.PLATFORM_BASE_URL ?? `http://localhost:${platformPort}`;
const reuseServer = !process.env.CI;

const landingWebServer = process.env.LANDING_BASE_URL
  ? undefined
  : {
      command: `PORT=${landingPort} pnpm --filter @silo/landing dev`,
      url: landingBaseURL,
      reuseExistingServer: reuseServer,
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 120_000,
    };

const platformWebServer = process.env.PLATFORM_BASE_URL
  ? undefined
  : {
      command: `PORT=${platformPort} pnpm --filter @silo/platform dev`,
      url: platformBaseURL,
      reuseExistingServer: reuseServer,
      stdout: 'pipe',
      stderr: 'pipe',
      timeout: 120_000,
    };

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'landing-chrome',
      testDir: './tests/landing',
      use: { ...devices['Desktop Chrome'], baseURL: landingBaseURL },
      webServer: landingWebServer,
    },
    {
      name: 'platform-chrome',
      testDir: './tests/platform',
      use: { ...devices['Desktop Chrome'], baseURL: platformBaseURL },
      webServer: platformWebServer,
    },
  ],
  outputDir: 'artifacts/e2e/output',
});
