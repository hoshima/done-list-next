import { defineWorkspace } from 'vitest/config'

export default defineWorkspace([
  // If you want to keep running your existing tests in Node.js, uncomment the next line.
  // 'vitest.config.mts',
  {
    extends: 'vitest.config.mts',
    test: {
      browser: {
        enabled: true,
        provider: 'playwright',
        // https://vitest.dev/guide/browser/playwright
        instances: [
        { browser: 'chromium' },
        ],
      },
    },
  },
])
