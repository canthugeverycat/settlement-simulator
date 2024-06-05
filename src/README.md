<img src="https://leylinepro.com/_next/image?url=%2Fimg%2FL-logo-3.png&w=64&q=75" alt="LeyLine Logo" width="100" height="100" style="margin-left: -10px; margin-bottom: -20px;" />

# Client Documentation

This governs the client documentation for the app that allows for settlement disputes between two parties.

## 💻 Development Environment

The server was developed using the following modules:

- **NodeJS** v21.7.3
- **Create React App** v5.0.1

## 📄 Available Scripts

To start the app run the command in the root of the project:

### `npm start`

This will start the app on [http://localhost:3000](http://localhost:3000) in your browser.

## 🌊 Application flow

### Landing Screen

Greets you once the app is opened. From here, you may choose your party, either A or B and progress to the next screen.

<img src="https://i.ibb.co/23YvvF0/Screenshot-2024-06-05-at-20-55-15.png" alt="Landing Screen" />

### Settlement Screen

This is the main screen of the app. Depending on your party this is the place where you can submit or respond to a settlement.

In addition, at the bottom you will see the last update from the oposing party.

When you change a settlement, the amount and status will automatically update for both parties.

<div style="display: flex;">
  <img src="https://i.ibb.co/kQpLB9Q/1.png" alt="Settlement Screen A" style="height:500px;display:inline-block;" />
  <img src="https://i.ibb.co/p3JKDfg/2.png" alt="Settlement Screen B" style="height:500px;display:inline-block;"/>
</div>

### History Screen

Allows you to view the full history for the current negotiation. The most recent results are displayed at the top.

<img src="https://i.ibb.co/9Y9d3nN/Screenshot-2024-06-05-at-21-22-07.png" alt="Landing Screen" />

## 🧱 Main structure & organization

`assets`\
--[*file*].[svg|png|jpeg|ttf]\
`globals`\
--[*file].ts\
`styles`\
--[*file*].css\
`utils`\
--[*file*].ts\
`store`\
--[`entity`]\
`routes`\
--[`route`]\
`components`\
--[`component`]

## 🌠 Assets

A folder containing visual assets for the app. This is usually a home to **fonts**, **images** and **icons**.

## 🌍 Globals

Houses .ts files which are used globally thoughout the app. Currently we have:

- `const`.ts
- `types`.ts

All the constants are placed in **const.ts** and used from here. This enables easy changes to urls, property names, etc.

Global TypeScript types are also defined in **types.ts**.

## 🎨 Styles

Holds base styles for the app, overrides for tailwind classes and custom classes and animations.

## 🔨 Utils

Contains utility functions and services.

- `api`.ts
- `functions`.ts
- `useWebsocket`.ts

**api.ts** holds all the HTTP functions that are used to communicate with the server.

**functions.ts** holds helper functions like datetime formatters, calculations, etc.

**useWebsocket.ts** a custom hook that wraps a WebSocket module and allows for cleaner usage.

## 📦 Store

A **Redux** store is used to persist the data to the app.

Store structure:

index.ts\
rootReducer.ts\
`settlements`\
--action-types.ts\
--actions.ts\
--reducers.ts

Settlement Model:

```js
// Settlement
Settlement = {
  id: number,
  createdAt: datetime,
  status: Status,
  party: Party,
  amount: number,
};

// Party
Party = 'a' || 'b';

// Status
Status = 'pending' || 'accepted' || 'rejected';
```

Each entity is its' own separate folder with appropriate actions and reducers. This organization allows for greater scalability as the app grows.

## 🚸 Routes

Routes (screens) used throughout the app.

Route structure:

`history`\
--index.tsx\
`landing`\
--index.tsx\
`settlement`\
--index.tsx\

## 🧊 Components

This folder houses the components as the building blocks of the app.

### Button

A styled button component, allows for different sizing and color options through props.

<img src="https://i.ibb.co/31kZwGc/Screenshot-2024-06-05-at-21-42-36.png" alt="Button component" />

### HistoryItem

A card displaying one settlement action. It is shown either in settlement or history screens.

<img src="https://i.ibb.co/QprnVhc/Screenshot-2024-06-05-at-21-48-50.png" alt="History item component" />

### InputForm

A component that holds the amount input and the action buttons. Holds a fair amount of display logic as well.

<img src="https://i.ibb.co/TKnXPsS/Screenshot-2024-06-05-at-21-51-03.png" alt="Input form component" />

### Loader

Simple pulsing loader, usually used to indicate a pending API action. Screenshot doesn't do it justice.

<img src="https://i.ibb.co/PWF387t/Screenshot-2024-06-05-at-21-53-29.png" alt="Loader component" />

### Logo

A logo with an animated mask. Accepts sizing.

<img src="https://i.ibb.co/S7sX5S6/Screenshot-2024-06-05-at-21-55-45.png" alt="Logo component" />

### Separator

A shadow separator. Can cast a shadow from top to bottom or vice-versa.

<img src="https://i.ibb.co/6bkHs11/Screenshot-2024-06-05-at-21-58-32.png" alt="Separator component" />

### StatusPill

A pill element used to display an action's status. Can be animated or static. Configurable size.

<img src="https://i.ibb.co/br62C2v/Screenshot-2024-06-05-at-22-00-24.png" alt="Status pill component" />

## 🧠 To improve

### Testing

If I had more time, I would add testing throughout the app.
RTL for unit and integration testing and Happo for visual regression testing.

### Error Handling

Error handling hasnt been covered in the app, UI-wise. The store could be easily extended to allow for storing of errors and the UI could display an appropriate message to the user in form of a toast element.

### Notifications

I would add notifications using the Notification API. The notifications would fire for the user any time the oposing party submits a new change.

Given that we are dealing with sensitive information such as settlement amounts, I would keep the messages informative but vague.

e.g. "Party B responded to your submission!"
e.g. "Party A submitted a new amount!"
