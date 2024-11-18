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
    english: 'Englisch (US)',
    // German (DE)
    german: 'Deutsch (DE)',
  },

  // Common Labels
  label: {
    // Back
    back: 'Zurück',
    // Close
    close: 'Schließen',
    // Detail
    detail: 'Details anzeigen',
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
      title: 'Unerwarteter Fehler',
      // Dialog message
      message:
        'Ein unerwarteter Fehler ist aufgetreten. Dies hätte nicht passieren dürfen. Bitte wenden Sie sich an ' +
        'den Administrator.',
    },
    // Input field must not be empty.
    emptyInput: 'Dieses Feld darf nicht leer sein.',
  },

  // Authentication Messages
  auth: {
    // Container Messages
    message: {
      // Login Page
      login:
        'Bitte geben Sie in die untenstehen Eingabefelder Ihre Anmeldeinformationen ein. Achten Sie bei der ' +
        'Eingabe des Kennworts auch auf die Groß- und Kleinschreibung. Sollten Sie noch kein Konto besitzen, können ' +
        'Sie sich über den Link "Konto registrieren" ein neues erstellen. Dieses muss jedoch erst von einem ' +
        'Administrator freigeschaltet werden, bevor Sie sich anmelden können.',
      // Register Page
      register:
        'Hier können Sie ein neues Konto registrieren, indem Sie die untenstehen Felder komplett ausfüllen. ' +
        'Dabei darf die Email-Adresse noch nicht für ein anderes Konto verwendet worden sein. Nach der erfolgreichen ' +
        'Erstellung des Kontos muss dieses noch von einem Administrator freigeschaltet werden, bevor Sie es ' +
        'verwenden können.',
      // Reset Password Page
      reset:
        'Falls Sie Ihr Kennwort vergessen haben oder aus anderen Gründen zurücksetzen möchten, können Sie ' +
        'dies hier tun, indem Sie die Email-Adresse Ihres Kontos in das untenstehende Eingabefeld eintragen. Sie ' +
        'erhalten eine Email an die angegebene Adresse. Diese enthält einen Link für das Ändern Ihres Kennworts.',
    },
    // Labels
    label: {
      // Email Address
      email: 'Email-Adresse',
      // Password
      password: 'Kennwort',
      // Repeat Password
      passwordRepeat: 'Kennwort wiederholen',
      // Login Button
      login: 'Anmelden',
      // Register Account
      register: 'Konto registrieren',
      // Reset Password
      reset: 'Kennwort zurücksetzen',
      // First Name
      firstName: 'Vorname',
      // Last Name
      lastName: 'Nachname',
    },
    // Dialog Messages
    dialog: {
      // Register Success Messages
      register: {
        // Title
        title: 'Konto erfolgreich registriert',
        // Message
        message:
          'Dein Konto wurde erfolgreich registriert. Allerdings musst du dich erst von einem Administrator ' +
          'freischalten lassen, bevor du dich anmelden kannst.',
      },
      // Reset Password Success Messages
      reset: {
        // Title
        title: 'Email versendet',
        // Message
        message:
          'Die Email für das Zurücksetzen des Kennworts wurde versendet. Bitte prüfen Sie gegebenenfalls ' +
          'auch den Spam-Ordner Ihres Postfachs.',
      },
    },
    // Error Messages
    error: {
      // Password and Repeated Password are not equal
      passwordRepeatInvalid:
        'Das wiederholte Kennwort muss mit dem Kennwort übereinstimmen.',
      // Email address is invalid
      invalidEmail: 'Die Email-Adresse ist ungültig.',
      // Email address is already in use
      emailInUse: 'Die E-Mail-Adresse wird bereits verwendet.',
      // Password is too weak
      passwordTooWeak: 'Das Kennwort muss mindestens 6 Zeichen enthalten',
      // Invalid credentials
      invalidCredentials: 'Die Anmeldedaten sind inkorrekt.',
      // Too many failed requests
      tooManyRequests: 'Zu viele Versuche. Probieren Sie es später erneut.',
      // Account is locked
      accountLocked: 'Das Konto ist gesperrt. Bitte wenden Sie sich an den Administrator.',
    },
  },
};
