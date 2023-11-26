# :beer: Cometa Beer Challenge :beer:

## Description

#### It's a simple restfull api with basic! validations to accomplish the challengue of create 4 restfull endpoints:

-   list beers: /api/beers
-   generate order: /api/order
-   get account: /api/account/:orderId
-   paid it: /api/pay

As bonus i added another endpoint, to see previous orders

-   get orders: /api/orders

## How to run it? - Docker Compose is the way

1. Install [ Docker Engine ](https://docs.docker.com/engine/install/) :fire:
2. Go to the root of the project and run => `docker-compose build`
3. Go to the root of the project and run => `docker-compose up -d`
4. In root you gonna find the postman collection for test the endpoints
5. Start reading code, interpreting functionalities and programming :smile:

## How to test it? - Using Jest 🧪

1. Go to node-app folder
2. `npm install`
3. `npm run jest`, it gonna execute the basic unit test
