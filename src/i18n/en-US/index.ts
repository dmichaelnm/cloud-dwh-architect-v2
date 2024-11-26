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

  // Common Messages
  message: {
    // Custom attributes table
    customAttributes:
      'Here you can define any custom attributes. These can later be used in script generation templates.',
    // Message when no custom attributes exist
    customAttributesEmpty: 'No custom attributes have been created yet.',
  },

  // Common Labels
  label: {
    // Altered
    altered: 'Altered By / At',
    // Custom Attributes
    attributes: 'Custom Attributes',
    // Back
    back: 'Back',
    // Cancel
    cancel: 'Cancel',
    // Close
    close: 'Close',
    // Created By / At
    created: 'Created By / At',
    // Description
    description: 'Description (optional)',
    // Detail
    detail: 'Show Details',
    // Dark Mode
    darkMode: 'Dark Mode',
    // General
    general: 'General',
    // Key
    key: 'Key',
    // Okay
    okay: 'Okay',
    // Light Mode
    lightMode: 'Light Mode',
    // Save
    save: 'Save',
    // Type
    type: 'Type',
    // Records per page
    recordsPerPage: 'Records per page',
    // Value
    value: 'Value',
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

  // Dialog Messages
  dialog: {
    // Discard Dialog
    discard: {
      // Title
      title: 'Discard Changes?',
      // Message
      message:
        'If you leave the current editor, all changes made so far will be lost. Are you sure you want to do this?',
    },
    // Delete Dialog
    delete: {
      // Title
      title: 'Delete {object}?',
      // Message
      message:
        'Are you sure you want to delete {article} {object} "{name}"? This operation cannot be undone. All corresponding data will ' +
        'be lost irrevocably.',
    },
    // Select Account Dialog
    selectAccount: {
      // Title
      title: 'Select Account',
      // Message
      message:
        'Please enter the email address of the account you wish to select here. The account must already be registered.',
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
    // Account was not found
    accountNotFound: 'The specified account could not be found.',
  },

  // Enumerations
  enumeration: {
    // Member Roles
    memberRole: {
      // Project Owner
      owner: 'Project Owner',
      // Project Manager
      manager: 'Project Manager',
      // Maintainer
      maintainer: 'Maintainer',
      // Deployer
      deployer: 'Deployer',
      // Developer
      developer: 'Developer',
      // Visitor
      visitor: 'Visitor',
    },
    // Custom Attribute Types
    customAttributeType: {
      // String
      string: 'String',
      // Number
      number: 'Numeric',
      // Boolean
      boolean: 'Boolean',
    },
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
      // Logout Menu Item
      logout: 'Log Out',
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
      // Invalid credentials
      invalidCredentials: 'The login credentials are incorrect.',
      // Too many failed requests
      tooManyRequests: 'Too many attempts. Please try again later.',
      // Account is locked
      accountLocked: 'The account is locked. Please contact the administrator.',
    },
  },

  // Project Messages
  project: {
    // Article
    article: 'the',
    // Object Name
    object: 'Project',
    // No Project Message
    nothing:
      'You have not yet created a project nor have you been assigned to a project as a member.',
    // Labels
    label: {
      // No project selected
      noProject: 'No Project Selected',
      // New project
      newProject: 'Create New Project',
      // Overview
      overview: 'Project Overview',
      // Project Members
      member: 'Project Members',
      // Name of a project member
      memberName: 'Member Name',
      // Project Name
      name: 'Project Name',
      // Role
      role: 'Project Role',
      // Own Role
      ownRole: 'Own Role',
    },
    // Overview Messages
    overview: {
      // Title
      title: 'Project Overview',
      // Message
      message:
        'Here you see an overview of all the projects you have created yourself or to which you have been assigned ' +
        'as a project member. Depending on the role you have in the respective projects, you can also edit or even ' +
        'delete them.',
      // Tooltip Messages
      tooltip: {
        // View Project
        view: 'View Project',
        // Edit Project
        edit: 'Edit Project',
        // Delete Project
        delete: 'Delete Project',
      },
    },
    // Editor Messages
    editor: {
      // Create Project Messages
      create: {
        // Editor Title
        title: 'Create New Project',
        // Editor Message
        message:
          'Start a new project by specifying the basic properties such as name and description here. In addition, ' +
          'you can add more members to your project and assign them different roles. Please note that they must have ' +
          'a registered account for this application.',
      },
      // View Project Messages
      view: {
        // Editor Title
        title: 'View Project',
        // Editor Message
        message:
          'Here you can view the properties of the project as well as the project members. However, you do not' +
          ' have permissions to make changes to the project.',
      },
      // Edit Project Messages
      edit: {
        // Editor Title
        title: 'Edit Project',
        // Editor Message
        message:
          'Here you can edit the properties of the project and manage the members of the project. If you are the ' +
          'project owner, you can change the project leader.',
      },
    },
    // General Tab Messages
    general: {
      // Message of the tab
      message:
        'Displays the project owner and manager. Allows the owner to assign the project manager.',
    },
    // Member Tab Messages
    member: {
      // Message of the tab
      message:
        'The following table shows a list of all members of this project. If you are the project owner or the project ' +
        'manager, you can manage your project team here by adding new members and assigning them appropriate roles. ' +
        'Please note that the project owner and the project leader cannot be added here as separate members.',
      // Empty Message
      emptyMessage: 'No members have been assigned to this project yet.',
      // Tooltip messages
      tooltip: {
        // Add Member
        add: 'Add Member',
        // Delete Member
        delete: 'Remove Member',
      },
      // Error Messages
      error: {
        // Owner selected as member
        owner: 'The project owner cannot be a regular project member.',
        // Manager selected as member
        manager: 'The project manager cannot be a regular project member.',
        // Account is already member
        member: 'This account is already a project member.',
      },
    },
  },
};
