export default {
  // Application Messages
  application: {
    // Title
    title: 'Cloud Data Warehouse Architect',
    // Copyright Notice
    copyright: '&copy; Copyright 2024 Dirk Michael',
    // Version Information
    version: 'Version {major}.{minor}.{patch} (Build: {build})',
  },

  // Language labels
  language: {
    // English (US)
    english: 'English (US)',
    // German (DE)
    german: 'German (DE)',
  },

  // Common Labels
  label: {
    // Back
    back: 'Back',
    // Close
    close: 'Close',
    // Detail
    detail: 'Show Details',
  },

  // Tooltip Messages
  tooltip: {
    // Social Media Links
    socialMedia: {
      // Email
      email: 'Email',
      // Discord
      discord: 'Discord',
      // Twitch
      twitch: 'Twitch',
      // Linked In
      linkedin: 'Linked In',
      // Instagram
      instagram: 'Instagram',
      // Threads
      threads: 'Threads',
      // Twitter / X
      twitter: 'Twitter / X',
    },
  },

  // Error Messages
  error: {
    // Unexpected error
    unexpected: {
      // Dialog title
      title: 'Unexpected Error',
      // Dialog message
      message:
        'An unexpected error occured. This should not have happened. Please contact the administrator.',
    },
    // Input field must not be empty.
    emptyInput: 'This field must not be empty.',
  },

  // Authentication Messages
  auth: {
    // Container Messages
    message: {
      // Login Page
      login:
        'Please enter your login details in the input fields below. The password is case sensitive. If you do ' +
        'not yet have an account, you can create a new one using the "Register account" link. However, this must ' +
        'first be activated by an administrator before you can log in.',
      // Register Page
      register:
        'You can register a new account here by completely filling out the fields below. The email address ' +
        'must not have been used for another account. After the account has been successfully created, it must be ' +
        'activated by an administrator before you can use it.',
      // Reset Password Page
      reset:
        'If you have forgotten your password or wish to reset it for other reasons, you can do so here by ' +
        'entering the email address associated with your account in the field below. You will receive an email at ' +
        'the specified address containing a link to change your password.',
    },
    // Labels
    label: {
      // Email Address
      email: 'Email Address',
      // Password
      password: 'Password',
      // Repeat Password
      passwordRepeat: 'Repeat Password',
      // Login Button
      login: 'Log In',
      // Register Account
      register: 'Register Account',
      // Reset Password
      reset: 'Reset Password',
      // First Name
      firstName: 'First Name',
      // Last Name
      lastName: 'Last Name',
    },
    // Dialog Messages
    dialog: {
      // Register Success Messages
      register: {
        // Title
        title: 'Account Registration Successful',
        // Message
        message:
          'Your account has been successfully registered. However, you need to be activated by an administrator ' +
          'before you can log in.',
      },
      // Reset Password Success Messages
      reset: {
        // Title
        title: '`Email Sent`',
        // Message
        message:
          'The email to reset the password has been sent. Please also check the spam folder of your mailbox if necessary.',
      },
    },
    // Error Messages
    error: {
      // Password and Repeated Password are not equal
      passwordRepeatInvalid:
        'The repeated password must be equal to the password.',
      // Email address is invalid
      invalidEmail: 'The email address is invalid.',
      // Email address is already in use
      emailInUse: 'The email address is already in use.',
      // Password is too weak
      passwordTooWeak: 'The password must contain at least 6 characters.',
    },
  },
};
