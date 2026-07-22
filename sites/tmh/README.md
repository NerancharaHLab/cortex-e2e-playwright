# TMH Playwright Tests

Site-specific tests using shared authentication framework.

See main README at `../../README.md` for full documentation.

## Quick Start

```javascript
import { test, expect } from '../../../fixtures/auth.js';

test('My test', async ({ authenticatedPage }) => {
  // Already logged in!
});
```

## Structure

- `pages/` - TMH-specific page objects
- `tests/` - Test files
- `fixtures/auth.js` - Re-exports shared auth fixture
- `test_data/` - Test data files

## Running

```bash
# Run tmh tests only
npx playwright test sites/tmh

# Run with UI
npm run test:ui
```
