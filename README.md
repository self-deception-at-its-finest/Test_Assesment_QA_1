# SAM GUARD Trend View — Playwright Tests

A small end-to-end test suite for the **Trend View** feature, built with **Playwright + TypeScript** using the Page Object Model (POM).

### Test coverage
- **TC-011:** Rename a section and verify the name persists after a page refresh.
- **TC-016:** Add a tag to a section and verify the selected tag persists after a page refresh.

**Why these scenarios?** They cover two core Trend View workflows—section management and tag assignment—and verify that user changes persist after a reload. Together they provide useful coverage of both editing and configuration with only two end-to-end tests.

### Potential improvements
- Move test-data setup and cleanup into reusable Playwright fixtures to keep test cases focused on assertions.
- Authenticate via API and reuse Playwright `storageState` to reduce UI login time and flakiness.
- Use dedicated test accounts and deterministic tag fixtures for reliable, parallel-safe execution.
- Add stable `data-testid` selectors where possible, plus CI execution and failure traces for easier maintenance and debugging.

### Setup
1. Install [Node.js](https://nodejs.org/) and project dependencies:
   ```bash
   npm install
   ```
2. Install the Playwright browser:
   ```bash
   npx playwright install chromium
   ```
3. Create a `.env` file in the project root:
   ```env
   BASE_URL=https://demo-3.client.samguard.co
   TEST_USER_LOGIN=your_email
   TEST_USER_PASSWORD=your_password
   ```

### Run tests
Run all tests:

```bash
npx playwright test
```

To watch the tests in a browser:

```bash
npx playwright test --headed
```

**Execution configuration:** `workers: 1` is set in `playwright.config.ts`. Both scenarios modify Trend View sections under the same user account, so running them in parallel could cause race conditions (for example, one test deleting a section while another is verifying its tags). Sequential execution prevents this test-data conflict.

To view the HTML report:

```bash
npx playwright show-report
```

**Note:** Use a dedicated test account with an empty Trend View. The setup creates a section before each test, and cleanup removes sections afterward; do not run it against shared user data.
