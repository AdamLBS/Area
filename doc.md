# Front-end

## Setup

In order to start using our project, the `.env` file must be set up! 
Use the `.env.example` file and complete it with the necessary **Client Id**, **Secret** for the services and the **Backend URL**.

Go to web-app folder and install the web dependencies:

```
yarn install
or 
npm install
```
Start the web application:
```
yarn dev
or 
npm run dev
```

## Trigger and Response events

For adding a new trigger or response event, if the new implementation does not need OAuth authorization, it only needs to be done at the backend. However, if an authorization token is needed and it is not already implemented, some modifications need to be made.

## Adding OAuth

For managing the OAuths, we use AuthJS, which already has many built-in services. If the ones you are adding are not on their list, it is possible to create a custom OAuth. 
Everything about it can be found in their documentation: [https://authjs.dev/](https://authjs.dev/)

Steps for adding a new service:
 1. Get the Service **Client Id** and **Secret**, add it to the `.env`
 2. Create a custom AuthJS or add an existing one
 3. In the `SocialAccounts.component.tsx` file, if it is not already there, add the new service to the `socialCards` array

To check if the Service SignIn `button` is added, navigate to the **Settings** page and then click on **Accounts** to check all available OAuths.