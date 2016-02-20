# angular2-simple-http
A minimal web client (served by http-server) interacts with a simple backend node server via a GET and POST



--- Learning Angular 2 (beta) ---
This code implements a simple Angular2 (beta) application that resides on an
http-server and features a single page containing two buttons that issue
GET and POST requests to a backend node server.

    localhost: web-client on web-server (8080)
    localhost: api/backend server on node server (8081)

Content/data on the web-client (frontend) is obtained
via calls to the backend node server. Unfortunately, javascript
is quite strict (or fortunately) with cross origin (and same origin)
requests (CORs). CORs authorise certain servers to interact (with the backend).

This sordid tale requires a change in the web server that we
will use to serve the web application (we are using the
http-server in this case), and that
we enable the backend to accept access from any server
(this is in a dev environment, so it is not too serious just yet).

* Getting started *

We need to install an http server:

    npm install -g http-server

Install the packages in packages.json with

    npm install

Start the node server

    node server.js

Finally, start the http-server

    npm start
