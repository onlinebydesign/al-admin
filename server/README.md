To get the server setup:

All commands should be run from the `server` folder.

Install required packages.

    npm install

Copy `.env.sample` to `.env`.

    cp .env.sample .env

Modify `.env` with your local values. This should contain your Mailgun API Key and your mailgun domain. You also need a MongoDB running you can use.

Run the server in development mode using:

    node .

Run the server in production mode:

First build it:

    npm prestart:prod

Start it:

    npm start:prod

    