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

  // Common Messages
  message: {
    // Custom attributes table
    customAttributes:
      'Hier können Sie beliebige eigene Attribute definieren. Diese können später in Vorlagen zur Skriptgenerierung ' +
      'verwendet werden.',
    // Message when no custom attributes exist
    customAttributesEmpty:
      'Bisher wurden noch keine benutzerdefinierten Attribute erstellt.',
  },

  // Common Labels
  label: {
    // Altered
    altered: 'Geändert von / am',
    // Custom Attributes
    attributes: 'Benutzerdefinierte Attribute',
    // Back
    back: 'Zurück',
    // Cancel
    cancel: 'Abbrechen',
    // Close
    close: 'Schließen',
    // Create
    create: 'Erstellen',
    // Created By / At
    created: 'Erstellt von / am',
    // Detail
    detail: 'Details anzeigen',
    // Description
    description: 'Beschreibung (optional)',
    // Dark Mode
    darkMode: 'Dunkler Modus',
    // General
    general: 'Allgemein',
    // Key
    key: 'Schlüssel',
    // Light Mode
    lightMode: 'Heller Modus',
    // Management
    management: 'Verwaltung',
    // Okay
    okay: 'Okay',
    // Save
    save: 'Speichern',
    // Type
    type: 'Typ',
    // Records per page
    recordsPerPage: 'Zeilen pro Seite',
    // Value
    value: 'Wert',
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
      title: 'Änderungen verwerfen?',
      // Message
      message:
        'Wenn Sie den aktuellen Editor verlassen, gehen alles bisher gemachten Änderungen verloren. Sind Sie' +
        ' sicher, dass Sie das wollen?',
    },
    // Delete Dialog
    delete: {
      // Title
      title: '{object} löschen?',
      // Message
      message:
        'Sind Sie sicher, dass Sie {article} {object} "{name}" löschen wollen? Diese Operation lässt sich nicht rückgängig ' +
        'machen. Alle entsprechenden Daten gehen unwiderruflich verloren.',
    },
    // Select Account Dialog
    selectAccount: {
      // Title
      title: 'Konto auswählen',
      // Message
      message:
        'Geben Sie hier die Email-Adresse des Kontos an, welches Sie auswählen möchten. Das Konto muss bereits ' +
        'registriert sein.',
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
    // Account was not found
    accountNotFound: 'Das angegebene Konto konnte nicht gefunden werden.',
  },

  // Enumerations
  enumeration: {
    // Member Roles
    memberRole: {
      // Project Owner
      owner: 'Projekteigentümer',
      // Project Manager
      manager: 'Projektleiter',
      // Maintainer
      maintainer: 'Betreuer',
      // Deployer
      deployer: 'Bereitsteller',
      // Developer
      developer: 'Entwickler',
      // Visitor
      visitor: 'Besucher',
    },
    // Custom Attribute Types
    customAttributeType: {
      // String
      string: 'Zeichenkette',
      // Number
      number: 'Zahlenwert',
      // Boolean
      boolean: 'Wahrheitswert',
    },
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
      // Logout Menu Item
      logout: 'Abmelden',
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
      accountLocked:
        'Das Konto ist gesperrt. Bitte wenden Sie sich an den Administrator.',
    },
  },

  // Project Messages
  project: {
    // Article
    article: 'das',
    // Object Name
    object: 'Projekt',
    // Labels
    label: {
      // No project selected
      noProject: 'Kein Projekt ausgewählt',
      // New project
      newProject: 'Neues Projekt erstellen',
      // Overview
      overview: 'Projekt-Übersicht',
      // Project Members
      member: 'Projekt-Mitglieder',
      // Name of a project member
      memberName: 'Name des Mitglieds',
      // Project Name
      name: 'Name des Projekts',
      // Role
      role: 'Rolle im Projekt',
      // Own Role
      ownRole: 'Eigene Rolle',
    },
    // Overview Messages
    overview: {
      // Title
      title: 'Projekt-Übersicht',
      // Message
      message:
        'Hier sehen Sie eine Übersicht über alle Projekte, die Sie selbst erstellt haben oder denen Sie als ' +
        'Projektmitglied zugeordnet wurden. Je nach dem, welche Rolle Sie in den jeweiligen Projekten haben, können ' +
        'Sie diese auch bearbeiten oder sogar löschen.',
      // Empty Message
      messageEmpty:
        'Bisher haben Sie weder ein Projekt erstellt noch wurden Sie einem Projekt als Mitglied zugeordnet.',
      // Tooltip Messages
      tooltip: {
        // View Project
        view: 'Projekt anzeigen',
        // Edit Project
        edit: 'Projekt bearbeiten',
        // Delete Project
        delete: 'Projekt löschen',
      },
    },
    // Editor Messages
    editor: {
      // Create Project Messages
      create: {
        // Editor Title
        title: 'Neues Projekt erstellen',
        // Editor Message
        message:
          'Beginnen Sie ein neues Projekt, indem Sie hier die grundlegenden Eigenschaften wie Name und ' +
          'Beschreibung angeben. Außerdem können Sie weitere Mitglieder Ihrem Projekt hinzufügen und Ihnen ' +
          'verschiedene Rollen zuweisen. Beachten Sie dabei jedoch, dass diese ein registriertes Konto für diese ' +
          'Anwendung besitzen müssen.',
      },
      // View Project Messages
      view: {
        // Editor Title
        title: 'Projekt anzeigen',
        // Editor Message
        message:
          'Hier können Sie sich die Eigenschaften des Projekts sowie die Projektmitglieder ansehen. Allerdings ' +
          'haben Sie keine Berechtigungen, Änderungen am Projekt vorzunehmen.',
      },
      // Edit Project Messages
      edit: {
        // Editor Title
        title: 'Projekt bearbeiten',
        // Editor Message
        message:
          'Hier können Sie die Eigenschaften des Projekts bearbeiten sowie die Mitglieder des Projekts ' +
          'verwalten. Falls Sie der Projekteigentümer sind, können Sie den Projektleiter austauschen.',
      },
    },
    // General Tab Messages
    general: {
      // Message of the tab
      message:
        'Hier können Sie sehen, wer der Eigentümer und wer der Leiter des Projekts ist. Falls Sie selbst der ' +
        'Projekteigentümer sind, können Sie hier den Projektleiter bestimmen.',
    },
    // Member Tab Messages
    member: {
      // Message of the tab
      message:
        'Die folgende Tabelle zeigt eine Liste aller Mitglieder dieses Projekts. Falls Sie der Projekteigentümer oder ' +
        'der Projektleiter sind, können Sie hier Ihr Projektteam verwalten, indem Sie neue Mitglieder hinzufügen und ' +
        'ihnen entsprechende Rollen zuweisen. Beachten Sie, dass der Projekteigentümer und der Projetleiter hier nicht ' +
        'als separates Mitglied hinzugefügt werden können.',
      // Empty Message
      emptyMessage:
        'Es wurden noch keine Mitglieder diesem Projekt zugeordnet.',
      // Tooltip messages
      tooltip: {
        // Add Member
        add: 'Mitglied hinzufügen',
        // Delete Member
        delete: 'Mitglied entfernen',
      },
      // Error Messages
      error: {
        // Owner selected as member
        owner: 'Der Projekteigentümer kann kein normales Projektmitglied sein.',
        // Manager selected as member
        manager: 'Der Projektleiter kann kein normales Projektmitglied sein.',
        // Account is already member
        member: 'Dieses Konto ist bereits ein Projektmitglied.',
      },
    },
  },

  // External Applications
  externalApp: {
    // Labels
    label: {
      // Drawer Item
      drawerItem: 'Externe Applikationen',
      // Name
      name: 'Name der externen Applikation'
    },
    // Overview Messages
    overview: {
      // Title
      title: 'Externe Applikationen',
      // Message
      message:
        'Die folgende Übersicht zeigt alle für dieses Projekt erstellten externen Applikationen. Diese sind im ' +
        'Wesentlichen die Plattformen, auf denen Ihr Data Warehouse basiert. Externe Applikationen können als Quelle ' +
        'für das Reverse Engineering von Modellartefakten sowie auch als Ziel für das Deployment derselben verwendet ' +
        'werden.',
      // Empty Message
      messageEmpty:
        'Bisher wurden für dieses Projekt noch keine externen Applikationen definiert.',
    },
    // Editor Messages
    editor: {
      // Create Messages
      create: {
        // Title
        title: 'Neue externe Applikation anbinden',
        // Message
        message:
          'Hier können Sie eine neue externe Applikation anbinden. Wählen Sie dazu den Anbieter der externen ' +
          'Applikation aus und geben die entsprechenden Anmeldeinformationen ein. Eine externe Applikation dient ' +
          'als Plattform für bestimmte Aspekte Ihres Data Warehouse. Sie können per Reverse Engineering ' +
          'Modellartefakte erstellen und diese später auch dorthin deployen.',
      },
    },
  },
};
