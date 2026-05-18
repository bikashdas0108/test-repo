# Debugging Guidelines

## Error Tracking Tools

| Tool | Purpose | Environment |
|------|---------|-------------|
| **Sentry** | Error tracking with transaction IDs | Production |
| **Datadog RUM** | Real user monitoring and logs | Production |
| **Console** | Development debugging | Development |
| **Redux DevTools** | State inspection | Development |

## Transaction ID Pattern

Every API request includes an `X-Request-ID` header for tracing:

```
Request → X-Request-ID header → Response → Error → Snackbar (with transactionId)
```

Use the transaction ID to:
- Trace errors in Sentry
- Search logs in Datadog
- Provide to support for debugging

### Error Handling with Transaction ID

```tsx
// Show error toast with transaction ID
dispatch(showSnackbar({
  severity: 'error',
  alertTitle: 'Error',
  message: errorMessage,
  transactionId: error.transactionId,
  type: 'contactSupport',
}));
```

## Console Debugging

**Note:** Console statements are removed in production builds.

```tsx
// Development debugging
console.log('Data:', data);
console.error('Error:', error);
console.table(arrayData);  // Useful for arrays/objects
console.group('API Call');
console.log('Request:', request);
console.log('Response:', response);
console.groupEnd();
```

## API Debugging

### Network Tab (Browser DevTools)

1. Open DevTools → Network tab
2. Filter by "Fetch/XHR"
3. Check request:
   - URL and method
   - `X-Request-ID` header
   - Request payload
4. Check response:
   - Status code
   - Response body
   - Error messages

### RTK Query DevTools

```tsx
// In browser console
__REDUX_DEVTOOLS_EXTENSION__
```

Check:
- Cache state
- Query status
- Subscription count
- Tags and invalidation

### Common API Issues

| Status | Issue | Solution |
|--------|-------|----------|
| 401 | Unauthorized | Auto-logout (handled by interceptor) |
| 403 | Forbidden | Check user permissions |
| 404 | Not found | Verify endpoint URL |
| 422 | Validation | Check request payload |
| 500 | Server error | Report with transaction ID |

## Redux Debugging

### Redux DevTools Extension

1. Install Redux DevTools browser extension
2. Open DevTools → Redux tab
3. Features:
   - Inspect state tree
   - View action history
   - Time-travel debugging
   - Export/import state

### Common Redux Issues

```tsx
// Check if action was dispatched
// Look in Redux DevTools action log

// Check if state was updated
// Compare state before/after action

// Check selector output
console.log(useSelector(selectSomething));
```

## React DevTools

### Component Inspection

1. Install React DevTools browser extension
2. Open DevTools → Components tab
3. Inspect:
   - Component tree
   - Props and state
   - Hooks values

### Profiler (Performance)

1. Components tab → Profiler
2. Click record, perform action, stop
3. Analyze:
   - Render times
   - Re-render causes
   - Component commits

## Common Error Scenarios

### 401 Unauthorized

```
Cause: Token expired or invalid
Behavior: Auto-logout via Axios interceptor
User sees: Redirected to login page
```

### Network Errors

```
Cause: No internet, server down, CORS
Debug:
1. Check Network tab for failed requests
2. Check browser console for CORS errors
3. Verify VITE_BASE_URL in .env
```

### Validation Errors (Yup)

```tsx
// Debug Yup schema
try {
  await schema.validate(data, { abortEarly: false });
} catch (error) {
  console.log('Validation errors:', error.errors);
}
```

### Chunk Load Errors

```
Cause: Deployment during user session
Behavior: Auto-reload configured in app
Debug: Check build output for missing chunks
```

### Type Errors

```
Cause: Mismatched TypeScript types
Debug:
1. Check API response shape
2. Verify interface definitions
3. Check for null/undefined
```

## Environment Variables

```bash
# API endpoint
VITE_BASE_URL=https://uat.core.api.viplatform.net

# Environment identifier
VITE_CLUSTER=uat  # uat, prod

# Check in browser console
console.log(import.meta.env.VITE_BASE_URL);
```

## Debugging Checklist

### API Issues
- [ ] Check Network tab for request/response
- [ ] Verify `X-Request-ID` header
- [ ] Check status code and error message
- [ ] Verify request payload
- [ ] Check CORS headers

### State Issues
- [ ] Check Redux DevTools for actions
- [ ] Verify state shape in store
- [ ] Check selector output
- [ ] Verify component is connected

### Component Issues
- [ ] Check React DevTools for props/state
- [ ] Verify hooks are called correctly
- [ ] Check for re-render loops (Profiler)
- [ ] Verify conditional rendering logic

### Form Issues
- [ ] Check React Hook Form state
- [ ] Verify Yup schema validation
- [ ] Check field registration
- [ ] Verify onSubmit handler

## Useful Console Commands

```tsx
// Log Redux state
store.getState()

// Check if element exists
document.querySelector('[data-testid="my-element"]')

// Monitor network
performance.getEntriesByType('resource')

// Check memory
performance.memory  // Chrome only
```

## Reporting Bugs

When reporting bugs, include:

1. **Transaction ID** - From error snackbar
2. **Steps to reproduce** - What you were doing
3. **Expected behavior** - What should happen
4. **Actual behavior** - What happened
5. **Screenshots/video** - If applicable
6. **Browser/OS** - Environment details
7. **Console errors** - Any error messages
