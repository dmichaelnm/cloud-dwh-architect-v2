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
    // Architecture
    architecture: 'Architecture',
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
    // Create
    create: 'Create',
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
    // Management
    management: 'Management',
    // Modeling
    modeling: 'Modeling',
    // Save
    save: 'Save',
    // Type
    type: 'Type',
    // Records per page
    recordsPerPage: 'Records per page',
    // Reverse Engineering
    reverseEngineering: 'Reverse Engineering',
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
    // External Application Provider Labels
    externalAppProvider: {
      // Amazon AWS S3 Bucket
      s3: 'Amazon AWS S3 Bucket',
      // Google Cloud Storage
      gcs: 'Google Cloud Storage',
      // Snowflake Database
      snowflake: 'Snowflake Database',
    },
    // File Types
    fileType: {
      // Unknown
      unknown: 'Unknown File Type',
      // CSV
      csv: 'CSV File',
    },
    // Column Types
    columnType: {
      // String
      string: 'String',
      // Number
      number: 'Number',
      // Date
      date: 'Date',
      // Time
      time: 'Time',
      // Timestamp
      timestamp: 'Timestamp',
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
      // Empty Message
      messageEmpty:
        'You have not yet created a project nor have you been assigned to a project as a member.',
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

  // External Application Messages
  externalApp: {
    // Object name
    object: 'External Application',
    // Article
    article: 'the',
    // Labels
    label: {
      // Drawer Item
      drawerItem: 'External Applications',
      // Name
      name: 'External Application Name',
      // Provider
      provider: 'Provider',
      // Test Connection
      testConnection: 'Test Connection',
    },
    // Provider Messages
    provider: {
      // General Message
      message:
        'Select here the provider of the external application from the list below that you want to connect with.',
      // S3
      s3: {
        // General Message
        message:
          'To access an Amazon AWS S3 bucket, you will need your access keys, which consist of the Access Key ID ' +
          'and Secret Access Key. Please ensure that these details are entered correctly to establish a successful ' +
          'connection to the S3 service. If you need assistance, you can find the necessary credentials in your ' +
          'AWS account login details or contact your administrator.',
        // Region
        region: 'Region',
        // Bucket Name
        bucket: 'Bucket Name',
        // Access Key ID
        accessKeyId: 'Access Key ID',
        // Secret Access Key
        secretAccessKey: 'Secret Access Key',
      },
      // Google Cloud Storage
      gcs: {
        // General Message
        message:
          'Please carefully enter the login information into the designated fields. The project ID is the unique ' +
          'identifier of your Google Cloud project. The client email corresponds to the email address of the service ' +
          'account that has access to Google Cloud Storage. The private key is part of the JSON file generated when ' +
          'creating the service account. Please note that this information is confidential and should not be shared ' +
          'with unauthorized persons or stored insecurely. If you have any questions, please contact your ' +
          'administrator.',
        // Project ID
        projectId: 'Project ID',
        // Client ID
        clientId: 'Client ID',
        // Client Email
        clientEmail: 'Client EMail',
        // Private Key ID
        privateKeyId: 'Private Key ID',
        // Private Key
        privateKey: 'Private Key',
        // Bucket
        bucket: 'Bucket',
      },
      // Snowflake
      snowflake: {
        // General Message
        message:
          'To connect to a Snowflake database, you will need certain credentials, such as the account name, username, ' +
          'and password. Please ensure that these details are entered correctly to establish a successful connection. ' +
          "If you need assistance with entering, you can find all relevant information in your company's login " +
          'documents or contact the administrator.',
        // Account
        account: 'Account',
        // Username
        username: 'Username',
        // Password
        password: 'Password',
        // Database
        database: 'Database',
        // Warehouse
        warehouse: 'Warehouse',
        // Role
        role: 'Role',
        // Schema
        schema: 'Schema',
      },
    },
    // Overview Messages
    overview: {
      // Title
      title: 'External Applications',
      // Message
      message:
        'The following overview shows all external applications created for this project. These are ' +
        'essentially the platforms on which your data warehouse is based. External applications can be used as a ' +
        'source for the reverse engineering of model artifacts as well as a target for the deployment of the same.',
      // Empty Message
      messageEmpty:
        'No external applications have been defined for this project yet.',
      // Tooltip Messages
      tooltip: {
        // View Tooltip
        view: 'View External Application',
        // Edit Tooltip
        edit: 'Edit External Application',
        // Delete Tooltip
        delete: 'Delet External Application',
      },
    },
    // Editor Messages
    editor: {
      // View Messages
      view: {
        // Title
        title: 'View External Application',
        // Message
        message:
          'Here you can view the properties of the external application. However, your current role prohibits you ' +
          'from editing these properties.',
      },
      // Create Messages
      create: {
        // Title
        title: 'Connect To External Application',
        // Message
        message:
          'Here you can connect a new external application. To do this, select the provider of the external ' +
          'application and enter the corresponding login information. An external application serves as a ' +
          'platform for certain aspects of your data warehouse. You can create model artifacts via reverse ' +
          'engineering and later deploy them there as well.',
      },
      // Edit Messages
      edit: {
        // Title
        title: 'Edit External Application',
        // Message
        message:
          'Here you can edit the properties of the external application and update the login credentials if necessary.',
      },
    },
    // Dialog Messages
    dialog: {
      // Test Connection Messages
      testConnection: {
        // Success Message
        success: {
          // Title
          title: 'Connection Successful',
          // Message
          message:
            'The connection was successfully established. The provided information seems to be correct.',
        },
        // Failure Message
        failure: {
          // Title
          title: 'Connection failed',
          // Message
          message:
            'Unfortunately, no connection could be established. You can find more detailed information in the details.',
        },
      },
    },
  },

  // Storage Location Messages
  storageLoc: {
    // Object Name
    object: 'File Storage Location',
    // Article
    article: 'the',
    // Label Messages
    label: {
      // Drawer Item
      drawerItem: 'File Storage Locations',
      // Name
      name: 'Storage Location Name',
      // Path
      path: 'Relative Path To Source Files',
      // Location
      location: 'Application / Path',
    },
    // Overview Messages
    overview: {
      // Title
      title: 'File Storage Locations',
      // Message
      message:
        'The following table shows an overview of all already created storage locations for files that are intended ' +
        'to serve as sources for the Data Warehouse. File storage locations are based on external applications ' +
        'that allow access to files. Creating file storage locations serves the organization and structuring of ' +
        'different classes of source files.',
      // Empty Message
      messageEmpty: 'No file storage locations have been defined yet.',
      // Tooltip Messages
      tooltip: {
        // Edit Storage Location
        edit: 'Edit Storage Location',
        // Delete Storage Location
        delete: 'Delete Storage Location',
        // View Storage Location
        view: 'View Storage Location',
      },
    },
    // Editor Messages
    editor: {
      // Editor Create Messages
      create: {
        // Title
        title: 'Create New File Storage Location',
        // Message
        message:
          'Create a new file storage location here based on an external application that serves as a source ' +
          'for importing source files into your data warehouse. Such storage locations allow you to organize and ' +
          'structure your source data.',
      },
      // Editor Edit Messages
      edit: {
        // Title
        title: 'Edit File Storage Location',
        // Message
        message:
          'Here you can edit the properties of the file storage location. Note that changes to the path may ' +
          'have an impact on dependent objects, which may then no longer function correctly.',
      },
      // Editor View Messages
      view: {
        // Title
        title: 'View File Storage Location',
        // Message
        message:
          'Here you can view the properties of the file storage location. However, due to your role, you cannot ' +
          'make any changes.',
      },
      // Common Messages
      message: {
        // External App Selection
        externalAppSelection:
          'Select the external application here for which you want to create a file storage location. ' +
          'Only applications capable of providing file storage locations will be displayed.',
        // Path Selection
        pathSelection:
          'Enter the relative path to the source files here. You can also use the search button on the right side of ' +
          'the input field to open a dialog where you can select the desired path.',
      },
    },
    // Dialog Messages
    dialog: {
      // Path Selection Dialog
      pathSelection: {
        // Title
        title: 'Select A Path',
        // Message
        message:
          'Please select a storage location from the list of available paths. The selected path serves as a container ' +
          'for source files to be imported into the data warehouse.',
      },
    },
  },

  // Files
  file: {
    // File Labels
    label: {
      // Drawer Item Label
      drawerItem: 'File Objects',
      // Name
      name: 'File Object Name',
      // Column Definitions
      columns: 'Spalten-Definition',
      // Path
      path: 'Name of the file in the chosen storage location',
      // File Type
      type: 'File Type',
      // Select Storage Location
      storageLocation: 'Choose Storage Location',
    },
    // Overview Messages
    overview: {
      // Title
      title: 'File Objects',
      // Message
      message:
        'The following overview displays a list of created file objects that reference files in ' +
        'directories of cloud storage services such as S3 or Google Cloud Storage. These file objects ' +
        'describe the structure of the files and are intended to simplify and automate the import process ' +
        'into a data warehouse.',
      // Empty Message
      messageEmpty: 'No file objects have been defined yet.',
    },
    // File Properties Messages
    properties: {
      // CSV Properties
      csv: {
        // General message
        message:
          'Here you can specify the concrete properties of the selected CSV file, for example, to perform reverse ' +
          'engineering to determine the structure of the CSV file.',
        // Row Separator
        rowSeparator: 'Line Break',
        // Field Delimiter
        fieldDelimiter: 'Field Delimiter',
        // Quote Character
        quoteCharacter: 'Quote Character',
        // Has Header Row
        hasHeaderRow: 'First Row Contains Column Names',
        // Date Format
        dateFormat: 'Date Format',
        // Time Format
        timeFormat: 'Time Format',
        // Timestamp Format
        timestampFormat: 'Timestamp Format',
        // Decimal Separator
        decimalSeparator: 'Decimal Separator',
      },
    },
    // Messages for the columns table
    columns: {
      // General Message
      message:
        'Here you can define the structure of the data in the file object by specifying the individual columns ' +
        'with their corresponding properties. You can also have the structure determined by the system using reverse ' +
        'engineering.',
      // Empty Message
      messageEmpty: 'No columns have been defined yet.',
      // New column default name
      newColumn: 'New_Column',
      // Column Name
      name: 'Column Name',
      // Column Type
      type: 'Data Type',
      // Precision
      precision: 'Length / Precision',
      // Scale
      scale: 'Scale',
      // Nullable
      nullable: 'Allow Empty Values',
      // Format
      format: 'Format (Optional)',
      // Comment
      comment: 'Comment (Optional)',
    }, // Editor Messages
    editor: {
      // Create Messages
      create: {
        // Title
        title: 'Create new file object',
        // Message
        message:
          'On this page, you can create a file object for a file in a cloud storage service. ' +
          'You can either define the structure of the file manually or automatically determine it ' +
          'using reverse engineering. This simplifies the integration of the file into your data warehouse.',
      },
      // Tab Messages
      message: {
        // General
        general:
          'Enter the path to the file in cloud storage here along with the file type. You can also ' +
          'automatically obtain all information via reverse engineering by selecting a file in cloud storage, ' +
          'provided that the file type is supported by the application.',
      },
    },
    // Dialog Messages
    dialog: {
      // File Selection Dialog
      fileSelection: {
        // Title
        title: 'Select file',
        // Message
        message:
          'Choose the file from the list for which you want to create a file object.',
        // File Name
        fileName: 'File Name',
        // File Size
        fileSize: 'Size',
        // Last Modified
        lastModified: 'Last Modified',
      },
    },
  },
};
