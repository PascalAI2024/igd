# Secure Form Components

This directory contains standardized secure form components for use throughout the application. These components implement best practices for form security, validation, and consistent styling.

## Core Components

### `SecureFormWrapper`

A wrapper component that provides form state management, CSRF protection, validation, and submission handling.

```tsx
<SecureFormWrapper
  formId="contact"                // Unique ID for the form
  initialData={INITIAL_FORM_DATA} // Initial form state
  requiredFields={REQUIRED_FIELDS} // Fields that must be filled
  onSubmit={handleSubmit}        // Submit handler
  className="space-y-6"          // Optional styling
>
  {/* Form fields go here */}
</SecureFormWrapper>
```

### `FormField`

A flexible field component that supports various input types with consistent styling and validation.

```tsx
<FormField
  type="email"                   // Field type: text, email, tel, textarea, select
  name="email"                   // Field name (must match initialData keys)
  label="Email Address"          // Field label
  placeholder="your@email.com"   // Placeholder text
  required                       // Mark as required
  maxLength={150}                // Set maximum input length
  icon={<Mail className="w-5 h-5 text-gray-400" />} // Optional icon
/>
```

### `SubmitButton`

A button component with loading state support and consistent styling.

```tsx
<SubmitButton 
  text="Send Message"            // Button text
  loadingText="Sending..."       // Text shown during submission
  icon={<Send className="w-5 h-5" />} // Optional icon
  isLoading={loading}            // Loading state
/>
```

### `FormStatus`

A component for displaying submission status messages.

```tsx
<FormStatus 
  successMessage="Thank you! We'll get back to you soon." 
  errorMessage="Something went wrong. Please try again later."
  status={success ? 'success' : error ? 'error' : 'idle'}
/>
```

## Complete Form Implementations

For convenience, the following pre-built form components are available:

### `SecureLightContactForm`

A lightweight contact form with minimal styling, suitable for sidebars or small spaces.

### `SecureEnhancedContactForm`

A full-featured contact form with animations, tabbed interface, and additional features.

### `EnhancedContactForm`

A premium contact form that uses our secure API proxy for form submissions, with complete validation and sanitization.

## API Utilities

### `useForm` Hook

A custom hook for handling form submissions through our secure API proxy:

```tsx
const { 
  loading,        // Boolean indicating submission in progress 
  error,          // Error message if submission failed
  success,        // Boolean indicating successful submission
  message,        // Success message from server
  reference,      // Reference ID for tracking (if provided by server)
  submitData,     // Function to submit the form
  reset           // Function to reset form state
} = useForm<YourFormDataType>('form-type');
```

## Security Features

All form components include the following security features:

1. **CSRF Protection**: Cryptographically secure tokens prevent cross-site request forgery
2. **Input Validation**: Server-side and client-side validation
3. **Input Sanitization**: All input is sanitized with DOMPurify
4. **Rate Limiting**: Prevents abuse through server-side rate limiting
5. **Error Handling**: Secure error messages that don't leak implementation details
6. **Accessibility**: ARIA attributes for screen readers and keyboard navigation
7. **Maximum Length Constraints**: Prevents buffer overflow attacks

## Usage Guidelines

1. Always use `SecureFormWrapper` as the parent component for all forms
2. Use `FormField` components for all inputs to ensure consistent validation
3. Set appropriate `maxLength` values for all text inputs
4. Implement proper error handling with `FormStatus`
5. Use the `useForm` hook for secure form submission

## Implementation Example

```tsx
const MyForm = () => {
  const { loading, error, success, submitData } = useForm<MyFormData>('my-form');

  const handleSubmit = async (data: Record<string, string>) => {
    try {
      await submitData({
        name: data.name,
        email: data.email,
        message: data.message
      });
    } catch (error) {
      // Error is already handled by the hook
      console.error(error);
    }
  };

  return (
    <SecureFormWrapper
      formId="my-form"
      initialData={{ name: '', email: '', message: '' }}
      requiredFields={['name', 'email', 'message']}
      onSubmit={handleSubmit}
    >
      <FormField
        type="text"
        name="name"
        label="Name"
        required
        maxLength={100}
      />
      
      <FormField
        type="email"
        name="email"
        label="Email"
        required
        maxLength={150}
      />
      
      <FormField
        type="textarea"
        name="message"
        label="Message"
        required
        maxLength={2000}
      />
      
      <SubmitButton 
        text="Submit"
        loadingText="Submitting..."
        isLoading={loading}
      />
      
      <FormStatus 
        successMessage="Form submitted successfully!"
        errorMessage={error || "Something went wrong."}
        status={success ? 'success' : error ? 'error' : 'idle'}
      />
    </SecureFormWrapper>
  );
};
```