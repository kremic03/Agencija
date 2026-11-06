import { defineConfig, devices } from "@playwright/test";
import { MOCK_RESEND_PORT } from "./tests/support/constants";

const PORT = 3457;

/*
 * Testovi rade nad produkcijskim buildom. Server dobija lažni Resend, pa
 * nijedan test ne može da pošalje pravi mejl, šta god da piše u .env.local.
 */
export default defineConfig({
  testDir: "./tests",
  workers: 1,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: "list",
  use: {
    ...devices["Desktop Chrome"],
    channel: "chrome",
    viewport: { width: 1440, height: 900 },
    baseURL: `http://localhost:${PORT}`,
  },
  webServer: [
    {
      command: "node tests/support/mock-resend.mjs",
      port: MOCK_RESEND_PORT,
      reuseExistingServer: false,
    },
    {
      command: `npm run build && npm run start -- -p ${PORT}`,
      port: PORT,
      timeout: 300_000,
      reuseExistingServer: false,
      env: {
        RESEND_BASE_URL: `http://127.0.0.1:${MOCK_RESEND_PORT}`,
        RESEND_API_KEY: "test",
        CONTACT_TO_EMAIL: "primalac@test.local",
        CONTACT_FROM_EMAIL: "posiljalac@test.local",
      },
    },
  ],
});
