# wbtest

## Elaboration
Its been a while since i use express and mongoose (approx. 2 years ago). maybe a little bit rusty :(

For another module beside mentioned one (express and axios), I choose config to store database info, mongoose as helper to manage the data and nodemon to help auto restart the local server when any changes has been made.

Question 3a. randomly fetch a joke from the following endpoint.
this one is quite easy, just call API from external source and then return the response.

3b. When the API server starts, fetch and store 10 unique jokes. I choose mongoDB to store the data, because it is easy to initiate. 

3c-e. basic implementation of REST API CRUD

3f. Time flies, and I should finishing this task first, because it turns out this one is quite tricky to implemented.

For improve this test result, I believe I should sanitize the word from being converted into unicode style (`" -> &quot;`) before save it to the database. And then to make it more maintainable, I should make the code modular. Separate files between routes and the logic.

## How to run
- clone this repo
- npm install
- npm run start (or npm run dev)

## Endpoint list
- GET /jokes/random : random fetch a joke from server
- GET /jokes : random fetch 5 jokes from db
- DELETE /jokes : delete all jokes from db
- POST /jokes : store 10 unique jokes to db
- GET /jokes/summary : fetch 10 random jokes and summarized every words
