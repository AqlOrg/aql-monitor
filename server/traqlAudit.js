// whole point is giving package a "gun" and traqlaudit will run when it gets aqls, stick them in gun, fire via axios to our server
// to test, start server on test-state and play color game and see logs and stuff

// developer expects that when someone plays, aql gets triggered, by the end, they have all aqls on their server
// so we actually need to be sending aqls baql to the developer of fiesta color game. so to test-state. via res.locals and axios return

// traql audit runs on traql, lives on developer's repo, catches back all aqls from developer's front end (fiesta color game)

// they instead need to on their server in traqlAudit, send all of their aqls to an endpoint on our server


// TODO: Instead of making these queries from here, we need to bundle up the Traql entry and send it to an endpoint that we create on the Aql Monitor server. This endpoint will be the same endpoint for all developers using Aqls. All Traql entries will be sent here. In Aql-monitor server.js, create a new endpoint that will be this endpoint. Then take a lot of this logic in traqlAudit.js and move it into the endpoint controller. This is to help it interface with the database. It's not safe to give them access to our DB. Instead of developer's server to access our DB, developer is going to send it to our server. TraqlAudit will audit itself, bundle up things and send them somewhere. What we are changing with the middleware is where they're going. So now that they're going to our server, that's why this functionality is going into our server. BOOM

// probably want to do router and controller. when i get to /analytics/aqls, req is going to be from developer's servers, and I want to take body of req, pop it off, and add all of those aqls into our db, just like we are currently doing above. Basically cutting and pasting these functionalities to other servers and change these to axios requests. fetch vs axios: fetch uses browser api, is a browser function. we're in an express function, so there is no browser. thus need to use axios. will need to install axios.