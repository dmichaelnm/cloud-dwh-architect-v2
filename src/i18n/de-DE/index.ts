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
    // Architecture
    architecture: 'Architektur',
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
    // Modeling
    modeling: 'Modellierung',
    // Okay
    okay: 'Okay',
    // Save
    save: 'Speichern',
    // Type
    type: 'Typ',
    // Records per page
    recordsPerPage: 'Zeilen pro Seite',
    // Reverse Engineering
    reverseEngineering: 'Reverse Engineering',
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
      unknown: 'Unbekannter Dateityp',
      // CSV
      csv: 'CSV-Datei',
    },
    // Column Types
    columnType: {
      // String
      string: 'Zeichenkette',
      // Number
      number: 'Zahl',
      // Date
      date: 'Datum',
      // Time
      time: 'Uhrzeit',
      // Timestamp
      timestamp: 'Zeitstempel',
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

  // External Application Messages
  externalApp: {
    // Object name
    object: 'Externe Applikation',
    // Article
    article: 'die',
    // Labels
    label: {
      // Drawer Item
      drawerItem: 'Externe Applikationen',
      // Name
      name: 'Name der externen Applikation',
      // Provider
      provider: 'Anbieter',
      // Test Connection
      testConnection: 'Verbindung testen',
    },
    // Provider Messages
    provider: {
      // General Message
      message:
        'Wählen Sie hier den Anbieter der externen Applikation aus der untenstehenden Liste aus, mit der Sie ' +
        'sich verbinden möchten.',
      // S3
      s3: {
        // General Message
        message:
          'Um auf ein Amazon AWS S3-Bucket zuzugreifen, benötigen Sie Ihre Zugangsschlüssel, bestehend aus dem ' +
          'Access Key ID und dem Secret Access Key. Bitte stellen Sie sicher, dass diese Informationen korrekt ' +
          'eingegeben werden, um eine erfolgreiche Verbindung zum S3-Service herzustellen. Falls Sie Unterstützung ' +
          'benötigen, finden Sie die erforderlichen Zugangsdaten in den Anmeldeinformationen Ihres AWS-Kontos ' +
          'oder wenden Sie sich an den Administrator.',
        // Region
        region: 'Region',
        // Bucket Name
        bucket: 'Name des Buckets',
        // Access Key ID
        accessKeyId: 'ID des Zugriffsschlüssels',
        // Secret Access Key
        secretAccessKey: 'Geheimer Zugriffsschlüssel',
      },
      // Google Cloud Storage
      gcs: {
        // General Message
        message:
          'Bitte tragen Sie die Anmeldeinformationen sorgfältig in die vorgesehenen Felder ein. Die Projekt-ID ' +
          'ist die eindeutige Kennung Ihres Google-Cloud-Projekts. Die Client-E-Mail entspricht der E-Mail-Adresse ' +
          'des Servicekontos, das Zugriff auf Google Cloud Storage hat. Der private Schlüssel ist Teil der JSON-Datei, ' +
          'die beim Erstellen des Servicekontos generiert wurde. Beachten Sie, dass diese Informationen vertraulich ' +
          'sind und nicht an unbefugte Personen weitergegeben oder unsicher gespeichert werden sollten. Wenden Sie ' +
          'sich bei Fragen an Ihren Administrator.',
        // Project ID
        projectId: 'Projekt-ID',
        // Client ID
        clientId: 'Client-ID',
        // Client Email
        clientEmail: 'Client-EMail',
        // Private Key ID
        privateKeyId: 'ID des privaten Schlüssels',
        // Private Key
        privateKey: 'Privater Schlüssel',
        // Bucket
        bucket: 'Bucket',
      },
      // Snowflake
      snowflake: {
        // General Message
        message:
          'Um sich mit einer Snowflake-Datenbank zu verbinden, benötigen Sie bestimmte Anmeldeinformationen, ' +
          'wie den Account-Namen, den Benutzernamen und das Passwort. Bitte stellen Sie sicher, dass diese Daten ' +
          'korrekt eingegeben werden, um eine erfolgreiche Verbindung herstellen zu können. Wenn Sie Unterstützung ' +
          'bei der Eingabe benötigen, finden Sie alle relevanten Informationen in den Anmeldeunterlagen Ihres ' +
          'Unternehmens oder wenden Sie sich an den Administrator.',
        // Account
        account: 'Konto',
        // Username
        username: 'Benutzername',
        // Password
        password: 'Kennwort',
        // Database
        database: 'Datenbank',
        // Warehouse
        warehouse: 'Warehouse',
        // Role
        role: 'Rolle',
        // Schema
        schema: 'Schema',
      },
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
      // Tooltip Messages
      tooltip: {
        // View Tooltip
        view: 'Externe Applikation anzeigen',
        // Edit Tooltip
        edit: 'Externe Applikation bearbeiten',
        // Delete Tooltip
        delete: 'Externe Applikation löschen',
      },
    },
    // Editor Messages
    editor: {
      // View Messages
      view: {
        // Title
        title: 'Externe Applikation anzeigen',
        // Message
        message:
          'Hier können Sie die Eigenschaften der externen Applikation betrachten. Ihr aktuelle Rolle verbietet Ihnen ' +
          'jedoch das Bearbeiten dieser Eigenschaften.',
      },
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
      // Edit Messages
      edit: {
        // Title
        title: 'Externe Applikation bearbeiten',
        // Message
        message:
          'Hier können Sie die Eigenschaften der externen Applikation bearbeiten sowie die Anmeldeinformationen ' +
          'aktualisieren, falls dies nötig ist.',
      },
    },
    // Dialog Messages
    dialog: {
      // Test Connection Messages
      testConnection: {
        // Success Message
        success: {
          // Title
          title: 'Verbindung erfolgreich',
          // Message
          message:
            'Die Verbindung konnte erfolgreich hergestellt werden. Die angegebenen Informationen scheinen ' +
            'korrekt zu sein.',
        },
        // Failure Message
        failure: {
          // Title
          title: 'Verbindung fehlgeschlagen',
          // Message
          message:
            'Leider konnte keine Verbindung hergestellt werden. Genauere Informatin können Sie den Details ' +
            'entnehmen.',
        },
      },
    },
  },

  // Storage Location Messages
  storageLoc: {
    // Object Name
    object: 'Verzeichnis',
    // Article
    article: 'das',
    // Label Messages
    label: {
      // Drawer Item
      drawerItem: 'Verzeichnisse',
      // Name
      name: 'Name des Verzeichnisses',
      // Path
      path: 'Pfad zum Verzeichnis',
      // Location
      location: 'Applikation / Verzeichnis',
    },
    // Overview Messages
    overview: {
      // Title
      title: 'Verzeichnisse',
      // Message
      message:
        'In der folgenden Tabelle sehen Sie eine Übersicht über alle bereits erstellten Verzeichnisse für Dateien, ' +
        'die als Quelle für das Data Warehouse dienen sollen. Verzeichnisse basieren auf externen Applikationen, ' +
        'die den Zugriff auf Dateien zulassen. Das Erstellen von Verzeichnissen dient der Organisation und ' +
        'Strukturierung verschiedener Klassen von Quelldateien.',
      // Empty Message
      messageEmpty: 'Bisher wurden noch keine Verzeichnisse definiert.',
      // Tooltip Messages
      tooltip: {
        // Edit Storage Location
        edit: 'Verzeichnis bearbeiten',
        // Delete Storage Location
        delete: 'Verzeichnis löschen',
        // View Storage Location
        view: 'Verzeichnis anzeigen',
      },
    },
    // Editor Messages
    editor: {
      // Editor Create Messages
      create: {
        // Title
        title: 'Neues Verzeichnis erstellen',
        // Message
        message:
          'Erstellen Sie hier ein neues Verzeichnis basierend auf einer externen Applikation, der als ' +
          'Quelle für den Import von Quelldateien in Ihr Data-Warehouse dient. Mit solchen Verzeichnissen können Sie ' +
          'Ihre Quelldaten organisieren und strukturieren.',
      },
      // Editor Edit Messages
      edit: {
        // Title
        title: 'Verzeichnis bearbeiten',
        // Message
        message:
          'Hier können Sie die Eigenschaften des Verzeichnisses bearbeiten. Beachten Sie, dass Änderungen am ' +
          'Pfad unter Umständen Auswirkungen auf abhängige Objekte haben können und diese dann eventuell nicht mehr ' +
          'korrekt funktionieren.',
      },
      // Editor View Messages
      view: {
        // Title
        title: 'Verzeichnis anzeigen',
        // Message
        message:
          'Hier können Sie die Eigenschaften des Verzeichnis ansehen. Aufgrund Ihrer Rolle können Sie ' +
          'jedoch keine Änderungen vornehmen.',
      },
      // Common Messages
      message: {
        // External App Selection
        externalAppSelection:
          'Wählen Sie hier die externe Applikation aus, für die Sie ein Verzeichnis ' +
          'anlegen wollen. Es werden nur Applikationen angezeigt, die fähig sind, Verzeichnisse bereitzustellen.',
        // Path Selection
        pathSelection:
          'Geben Sie hier den relativen Pfad zu den Quelldateien ein. Sie können über den Suchen-Knopf ' +
          'auf der rechten Seite des Eingabefelds auch einen Dialog aufrufen, über den Sie den gewünschten Pfad ' +
          'auswählen können.',
      },
    },
    // Dialog Messages
    dialog: {
      // Path Selection Dialog
      pathSelection: {
        // Title
        title: 'Auswahl des Pfads',
        // Message
        message:
          'Bitte wählen Sie einen Speicherort aus der Liste der verfügbaren Pfade aus. Der ausgewählte Pfad dient als ' +
          'Container für Quelldateien, die in das Data Warehouse importiert werden sollen.',
      },
    },
  },

  // Files
  file: {
    // File Labels
    label: {
      // Drawer Item Label
      drawerItem: 'Datei-Objekte',
      // Name
      name: 'Name des Dateiobjekts',
      // Column Definitions
      columns: 'Spalten-Definition',
      // Path
      path: 'Name der Datei im gewählten Verzeichnis',
      // File Type
      type: 'Dateityp',
      // Select Storage Location
      storageLocation: 'Verzeichnis auswählen',
    },
    // Overview Messages
    overview: {
      // Title
      title: 'Datei-Objekte',
      // Message
      message:
        'Die folgende Übersicht zeigt eine Liste von erstellten Dateiobjekten an, die auf Dateien in ' +
        'Verzeichnissen von Cloud-Speicherdiensten wie S3 oder Google Cloud Storage liegen. Diese Dateiobjekte ' +
        'beschreiben die Struktur der Dateien und dienen dazu, den Importprozess in ein Data Warehouse zu ' +
        'vereinfachen und zu automatisieren.',
      // Empty Message
      messageEmpty: 'Bisher wurden noch keine Dateiobjekte definiert.',
    },
    // Editor Messages
    editor: {
      // Create Messages
      create: {
        // Title
        title: 'Neue Dateiobjekt erstellen',
        // Message
        message:
          'Auf dieser Seite können Sie ein Dateiobjekt für eine Datei in einem Cloudspeicherdienst erstellen. ' +
          'Dabei können Sie entweder die Struktur der Datei manuell definieren oder automatisch über Reverse ' +
          'Engineering ermitteln lassen. Dies erleichtert die Integration der Datei in Ihr Data Warehouse.',
      },
      // Tab Messages
      message: {
        // General
        general:
          'Geben Sie hier den Pfad zur Datei im Cloud-Speicher sowie den Dateityp an. Sie können auch durch ' +
          'Auswahl einer Datei im Cloud-Speicher alle Informationen durch Reverse Engineering automatisch ' +
          'ermitteln lassen, sofern der Dateityp von der Anwednung unterstützt wird.',
      },
    },
    // File Properties Messages
    properties: {
      // CSV Properties
      csv: {
        // General message
        message:
          'Hier können Sie die konkreten Eigenschaften der ausgewählten CSV-Datei festlegen, um z.B. ein ' +
          'Reverse Engineering zur Ermittlung der Struktur der CSV-Datei durchzuführen.',
        // Row Separator
        rowSeparator: 'Zeilenumbruch',
        // Field Delimiter
        fieldDelimiter: 'Feld-Trennzeichen',
        // Quote Character
        quoteCharacter: 'Anführungszeichen',
        // Has Header Row
        hasHeaderRow: 'Erste Zeile enthält Spaltennamen',
        // Date Format
        dateFormat: 'Datumsformat',
        // Time Format
        timeFormat: 'Uhrzeit-Format',
        // Timestamp Format
        timestampFormat: 'Zeitstempel-Format',
        // Decimal Separator
        decimalSeparator: 'Dezimaltrennzeichen',
      },
    },
    // Messages for the columns table
    columns: {
      // General Message
      message:
        'Hier können Sie die Struktur der Daten in dem Dateiobjekt definieren, indem Sie die einzelnen Spalten ' +
        'mit ihren entsprechenden Eigenschaften angeben. Sie können die Struktur auch per Reverse Engineering ' +
        'vom System ermitteln lassen.',
      // Empty Message
      messageEmpty: 'Bisher wurden noch keine Spalten definiert.',
      // New column default name
      newColumn: 'Neue_Spalte',
      // Column Name
      name: 'Name der Spalte',
      // Column Type
      type: 'Datentyp',
      // Precision
      precision: 'Länge / Genauigkeit',
      // Scale
      scale: 'Dezimalstellen',
      // Nullable
      nullable: 'Leere Werte zulassen',
      // Format
      format: 'Format (Optional)',
      // Comment
      comment: 'Kommentar (Optional)',
    },
    // Dialog Messages
    dialog: {
      // File Selection Dialog
      fileSelection: {
        // Title
        title: 'Datei auswählen',
        // Message
        message:
          'Wählen Sie aus der Liste die Datei aus, für die Sie ein Datei-Objekt erstellen wollen.',
        // File Name
        fileName: 'Name der Datei',
        // File Size
        fileSize: 'Größe',
        // Last Modified
        lastModified: 'Zuletzt geändert',
      },
    },
  },
};
