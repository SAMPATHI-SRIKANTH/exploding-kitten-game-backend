
# Exploding Kittens Game API Documentation
 This is the documentation for the Exploding Kittens Game API. The API allows users to register, record game scores, and retrieve leaderboard information.

# Base URL
The base URL for the API is: https://your-base-url.com

## Endpoints
### 1. Register User
### Description: Registers a new user for the game.
### URL: /register
Method: POST
Request Body:

```
{
  "username": "example_user"
}
```
### Success Response:
Code: 201 CREATED
Content:

```
{
  "userName": "example_user",
  "points": 0
}
```
### Error Response:
Code: 500 INTERNAL SERVER ERROR
Content:

```
{
  "error": "Failed to register user"
}
```
## 2. Record Game Score
### Description: Records a game score for a user.
### URL: /record-game
Method: POST
Request Body:

```
{
  "username": "example_user"
}
```
Success Response:
Code: 200 OK
Content:

```
{
  "message": "Game recorded successfully"
}
```
Error Response:
Code: 500 INTERNAL SERVER ERROR
Content:

```
{
  "error": "Failed to record game"
}
```
## 3. Get Leaderboard
### Description: Retrieves the leaderboard with user scores.
### URL: /leaderboard
### Method: GET
Success Response:
Code: 200 OK
Content:

```
[
  {
    "username": "user1",
    "points": 10
  },
  {
    "username": "user2",
    "points": 5
  },
  ...
]
```
### Error Response:
Code: 500 INTERNAL SERVER ERROR
Content:

```
{
  "error": "Failed to retrieve leaderboard"
}
```
## Usage
You can use this API to integrate the Exploding Kittens game with your application. Follow the endpoint descriptions to register users, record game scores, and retrieve leaderboard information.
