# Cloud Data Warehouse Architect

A web based application for creating and maintaining cloud based data warehouse architectures and models.

## Firebase Backend

The application uses Firebase as a backend system. Therefore, you must create a new project in Firebase.
You can do this in the developer console at https://console.firebase.google.com/.
This project requires a web application, which can be created via the developer
console. After successful creation, you can view the required authentication information. Use this to create
the following file.

*/src/scripts/config/firebase.ts*

Please replace the placeholders (...) in this file with you authentication credentials.

```ts
export const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...',
};
```

You also need to enable the following services within your Firebase project.

- Authentication
  - Here you have to enable the "Email/Password" method.
- Firestore Database
- Functions
- Hosting
  - This is optional and only needed if you want to host your project also in Firebase.

In *Firestore Databse* you have to configure the rules for the access to the data as following.

```
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {

    function isUserAuthorized() {
      return request.auth != null &&
             get(/databases/$(database)/documents/account/$(request.auth.uid)).data.state.lock == false;
    }

    match /account/{account} {
      allow read, write: if request.auth != null;
      allow create: if request.auth != null;
    }

    match /project/{project} {
      allow read, write: if isUserAuthorized() && request.auth.uid in resource.data.access;
      allow create: if isUserAuthorized();
    }

    match /project/{project}/{children=**} {
      allow read, write: if isUserAuthorized() &&
                         request.auth.uid in get(/databases/$(database)/documents/project/$(project)).data.access;
    }
  }
}
```
