# Message App Backend

This is a chatbox system built in Node.js.

## Installation

To start the application:

```
npm install
npm run start
```

## User Endpoints

- **Register User**
  - Endpoint: `POST /api/user/register`
  - Request Body:
    ```json
    {
        "firstName": "Harshit",
        "lastName": "Singh",
        "username": "harshit",
        "email": "harshit@gmail.com",
        "password": "1234"
    }
    ```

- **Login User**
  - Endpoint: `POST /api/user/login`
  - Request Body:
    ```json
    {
        "email" :"rohit9@gmail.com",
        "password": "1234"
    }
    ```

- **List Users**
  - Endpoint: `GET /api/user`

- **Update Profile**
  - Endpoint: `PUT /user/profile`
  - Request Body:
    ```json
    {
        "name": "Updated Name",
        "userName": "updatedUsername",
        "profilePic": "URL"
    }
    ```

## Chat Endpoints

- **Get Chats**
  - Endpoint: `GET /api/chat`

- **Create Single Chat**
  - Endpoint: `POST /api/chat/single`
  - Request Body:      
    ```json
    {
        "chatUserId" : "662fc1fec069f8d65b2432cf"
    }
    ```

- **Create Group Chat**
  - Endpoint: `POST /api/chat/group`
  - Request Body:
    ```json
    {
        "users" : ["UserId"]
    }
    ```

- **Join Group Chat**
  - Endpoint: `PUT /api/chat/join/:chatId`
  - Request Body:
    ```json
    {
        "userId": "662f76c074f8506821509a50"
    }
    ```

- **Exist Group Chat**
  - Endpoint: `PUT /api/chat/exist/:chatId`

- **Get Chat By ID**
  - Endpoint: `GET /api/chat/:chatId`

- **Post Message**
  - Endpoint: `POST /api/message`
  - Request Body:
    ```json
    {
        "content": "Hey How Are you",
        "chat": "662fc56eddf1ef4e72fec03f"
    }
    ```

- **Message List**
  - Endpoint: `GET /api/message/:chatId`
