<img src="https://leylinepro.com/_next/image?url=%2Fimg%2FL-logo-3.png&w=64&q=75" alt="LeyLine Logo" width="100" height="100" style="margin-left: -10px; margin-bottom: -20px;" />

# Server Documentation

This governs the server documentation that allows for settlement disputes between two parties.

## 💻 Development Environment

The server was developed using the following modules:

- **NodeJS** v21.7.3
- **Express** v4.19.2
- **ws** 8.17.0

## 📄 Available Scripts

To start the server run the command in the root of the project:

#### `npm run server`

This will start the server on [http://localhost:8000](http://localhost:8000).

## 🧱 Structure & organization

--**api**\
----**[entity]**\
------[*endpoint*].js\
--**db**\
----**[entity]**\
------[*action*].js\
--**ws**\
----**[entity]**\
------[*action*].js

The structure of the server is split into multiple layers, each serving their specific purpose.

The [**api**] layer is in charge of setting up API endpoint and handling http requests.

[**db**] layer governs over all of the database operations.

While the [**ws**] layer handles WebSocket communication for specific actions.

## 📊 Database

The database has one table named **settlements** which holds all the settlement items.

Each time a party takes action, whether it's submitting, disputing or accepting a settlement a new row gets inserted into the database. This enables us to keep track of the entire negotiation, which opens the door to implement features such as history and provides a clear transaction in case of legal disputes.

### Settlement model:

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

## 🌍 API

The API follows the REST API principles, covering 2 routes in total.

### Routes

#### `GET` /settlements

Returns all the settlement items as an array sorted by their time of creation in descending order.

Response example:

```json
[
  {
    "id": 6,
    "createdAt": "2024-06-05T17:04:25.457Z",
    "party": "b",
    "status": "rejected",
    "amount": 274
  },
  {
    "id": 5,
    "createdAt": "2024-06-05T17:04:23.323Z",
    "party": "a",
    "status": "pending",
    "amount": 274
  }
]
```

#### `POST` /settlements

Creates a new settlement item in the database and returns it in response.

Request body:

```json
{
    "party": Party,
    "status": Status,
    "amount": number,
}
```

Response example:

```json
{
  "id": 123,
  "createdAt": "2024-06-05T17:04:25.457Z",
  "party": "b",
  "status": "accepted",
  "amount": 400
}
```

#### `GET` /settlements/:id

Gets a single settlement item from the table by its **id** value.

Response example:

```json
{
  "id": 123,
  "createdAt": "2024-06-05T17:04:25.457Z",
  "party": "b",
  "status": "accepted",
  "amount": 400
}
```

## 🔌 WebSockets

To ensure real time communication is achieved within the app we use websockets.

The **`POST` /settlements** endpoint will, upon successful item creation notify the client from the opposite party that a new item has been created.

The receiving party is then expected to fetch the item using the item **id** provided by the WebSocket connection.

e.g. Party A submits an amount. Party B is notified.  
e.g. Party B accepts an amount. Party A is notified.

## 🧠 To improve

### Authentication

We can add an authentication layer that will allow for multiple settlement negotiations.

Every party would authenticate and the negotiation would get a unique **negotiationId** shared between the two parties.

We would then extend the **settlement table** with the new id and adjust the database and API actions accordingly.

### Paging

For **`GET` settlements** endpoint I would add paging, so the requests don't become too large and the client can implement an infinite load or paging when fetching the settlements.
