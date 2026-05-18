# Testing Guidelines

## Testing Stack

- **Jest 29**: Test runner
- **React Testing Library**: Component testing
- **@testing-library/jest-dom**: DOM matchers
- **@testing-library/user-event**: User interactions
- **jest-axe**: Accessibility testing with axe-core

## Accessibility Testing (MANDATORY)

**Every component test file MUST include an accessibility test.**

### Required Pattern

```tsx
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

describe('ComponentName', () => {
  // ... other tests ...

  describe('Accessibility', () => {
    it('should have no accessibility violations', async () => {
      const { container } = renderComponent();
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });
});
```

### Using the a11y Utility

```tsx
import { runA11yTest } from '__tests__/utils/a11y';

describe('Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const renderResult = renderComponent();
    await runA11yTest(renderResult);
  });
});
```

## Test File Organization

Location: `src/__tests__/` mirroring source structure

```
src/__tests__/
├── Common/
│   └── Components/
│       └── Button/
│           └── index.test.tsx
├── Company/
│   └── Pages/
│       └── Dashboard/
│           └── Dashboard.test.tsx
└── Utils/
    └── formatDate.test.ts
```

## TDD Approach

1. Write failing test first
2. Implement minimum code to pass
3. Refactor while keeping tests green

## Test Template

```tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import ComponentName from 'path/to/ComponentName';

// Mock dependencies
jest.mock('Common/Components/SomeComponent', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

jest.mock('Redux/Slices/SomeSlice', () => ({
  useSomeQuery: jest.fn(),
}));

// Factory pattern for mock data
const getMockUser = (overrides = {}) => ({
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  ...overrides,
});

const getMockProps = (overrides = {}) => ({
  title: 'Test Title',
  onAction: jest.fn(),
  isDisabled: false,
  ...overrides,
});

// Mock store helper
const createMockStore = (preloadedState = {}) => {
  return configureStore({
    reducer: {
      // Add required reducers
    },
    preloadedState,
  });
};

// Render helper
const renderComponent = (props = {}, storeState = {}) => {
  const store = createMockStore(storeState);
  const mergedProps = getMockProps(props);

  return {
    ...render(
      <Provider store={store}>
        <ComponentName {...mergedProps} />
      </Provider>
    ),
    store,
    props: mergedProps,
  };
};

describe('ComponentName', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render the component with title', () => {
      renderComponent();
      expect(screen.getByText('Test Title')).toBeInTheDocument();
    });

    it('should render button in enabled state by default', () => {
      renderComponent();
      expect(screen.getByRole('button')).not.toBeDisabled();
    });

    it('should render button in disabled state when isDisabled is true', () => {
      renderComponent({ isDisabled: true });
      expect(screen.getByRole('button')).toBeDisabled();
    });
  });

  describe('Interactions', () => {
    it('should call onAction when button is clicked', () => {
      const { props } = renderComponent();

      fireEvent.click(screen.getByRole('button'));

      expect(props.onAction).toHaveBeenCalledTimes(1);
    });

    it('should not call onAction when button is disabled', () => {
      const { props } = renderComponent({ isDisabled: true });

      fireEvent.click(screen.getByRole('button'));

      expect(props.onAction).not.toHaveBeenCalled();
    });
  });

  describe('Loading States', () => {
    it('should show loading skeleton when loading and no data', () => {
      // Mock loading state
      renderComponent({}, { isLoading: true, data: null });

      expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
    });

    it('should show data when loading is complete', () => {
      renderComponent({}, { isLoading: false, data: getMockUser() });

      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });

  describe('Error States', () => {
    it('should show error message when error occurs', () => {
      renderComponent({}, { error: { message: 'Something went wrong' } });

      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty data gracefully', () => {
      renderComponent({}, { data: { items: [] } });

      expect(screen.getByText('No items found')).toBeInTheDocument();
    });
  });
});
```

## Factory Pattern for Test Data

```tsx
// Create factory functions for consistent test data
const getMockUser = (overrides = {}) => ({
  id: '123',
  name: 'Test User',
  email: 'test@example.com',
  role: 'intern',
  ...overrides,
});

const getMockInternship = (overrides = {}) => ({
  id: '456',
  title: 'Software Engineering Internship',
  company: 'Test Company',
  status: 'active',
  ...overrides,
});

// Usage in tests
it('should display user with admin role', () => {
  const adminUser = getMockUser({ role: 'admin' });
  renderComponent({ user: adminUser });
  expect(screen.getByText('Admin')).toBeInTheDocument();
});
```

## Mocking Patterns

### Mock RTK Query Hooks
```tsx
import { useSomeQuery } from 'Redux/Slices/SomeApi';

jest.mock('Redux/Slices/SomeApi', () => ({
  useSomeQuery: jest.fn(),
}));

beforeEach(() => {
  (useSomeQuery as jest.Mock).mockReturnValue({
    data: getMockData(),
    isLoading: false,
    error: null,
    refetch: jest.fn(),
  });
});
```

### Mock Navigation
```tsx
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ id: '123' }),
}));
```

### Mock Dispatch
```tsx
const mockDispatch = jest.fn();
jest.mock('Redux/Store', () => ({
  useAppDispatch: () => mockDispatch,
}));
```

## Query Priorities

Prefer queries in this order (most to least preferred):

1. `getByRole` - Accessibility-focused (best)
2. `getByLabelText` - Form elements
3. `getByPlaceholderText` - Input fields
4. `getByText` - Non-interactive elements
5. `getByDisplayValue` - Current input value
6. `getByAltText` - Images
7. `getByTitle` - Title attribute
8. `getByTestId` - Last resort only

```tsx
// GOOD - uses role
screen.getByRole('button', { name: 'Submit' })

// GOOD - uses label
screen.getByLabelText('Email')

// AVOID - uses test id
screen.getByTestId('submit-button')
```

## Async Testing

```tsx
import { waitFor, waitForElementToBeRemoved } from '@testing-library/react';

it('should show success message after submission', async () => {
  renderComponent();

  fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

  // Wait for async operation
  await waitFor(() => {
    expect(screen.getByText('Success!')).toBeInTheDocument();
  });
});

it('should hide loading spinner after data loads', async () => {
  renderComponent();

  await waitForElementToBeRemoved(() => screen.queryByTestId('loading'));

  expect(screen.getByText('Data loaded')).toBeInTheDocument();
});
```

## Parameterized Tests

```tsx
describe('Button variants', () => {
  it.each([
    ['primary', 'MuiButton-containedPrimary'],
    ['secondary', 'MuiButton-containedSecondary'],
    ['error', 'MuiButton-containedError'],
  ])('should render %s variant with correct class', (variant, expectedClass) => {
    renderComponent({ variant });

    expect(screen.getByRole('button')).toHaveClass(expectedClass);
  });
});

describe('Form validation', () => {
  it.each([
    ['', 'Email is required'],
    ['invalid', 'Invalid email format'],
    ['test@', 'Invalid email format'],
  ])('should show error for email "%s"', async (email, expectedError) => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), { target: { value: email } });
    fireEvent.click(screen.getByRole('button', { name: 'Submit' }));

    await waitFor(() => {
      expect(screen.getByText(expectedError)).toBeInTheDocument();
    });
  });
});
```

## Commands

```bash
yarn test              # Run all tests
yarn test:watch        # Watch mode for development
yarn test:coverage     # Generate coverage report
yarn test:a11y         # Run accessibility tests only
yarn test -- --updateSnapshot  # Update snapshots
yarn test -- ComponentName     # Run specific test file
```

## Best Practices

1. **Test behavior, not implementation** - Focus on what users see and do
2. **Use describe blocks** - Organize tests by feature/behavior
3. **Use beforeEach** - Clean up mocks between tests
4. **Avoid testing implementation details** - Don't test internal state
5. **Write meaningful assertions** - One concept per test
6. **Use factory functions** - Consistent, overridable test data
7. **Mock at boundaries** - Mock APIs, not internal functions
8. **Run tests before committing** - Ensure all tests pass

## Coverage Requirements

- All PRs must maintain or increase test coverage
- Coverage drops will block PR merging
- Focus on critical paths and edge cases

## Pre-Commit Checklist

- [ ] All tests pass locally
- [ ] New functionality has tests
- [ ] **Accessibility test included (MANDATORY)**
- [ ] Edge cases are covered
- [ ] Mocks are properly cleaned up
- [ ] No console.log in tests
