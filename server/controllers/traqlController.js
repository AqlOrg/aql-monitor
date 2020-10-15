const db = require('../model.js');

const traqlController = {};

traqlController.addAqlsToTraql = (req, res, next) => {
  // our server that lives for all time will be aql-monitor. aql-monitor is now home base more than just the dashboard
  // way to test: set up aql-monitor to receive aqls, try sending hardcoded aql via postman
  // way to test axios req is to console log it in traqlAudit in testState
  let { traql, entryType } = req.body;
  if(entryType === 'success') {
    // send the traql entry to the Aqls database
    // create base of query string to send all values to db
    let queryString = `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, user_token) values`;
    // loop through aqls in mutation Id
    for (let aql of traql.aqlsReceivedBack) {
      // add one aql of data to query string
      queryString = queryString.concat(`('${aql.id}', '${aql.mutationSendTime}', '${aql.mutationReceived}', '${aql.subscriberReceived}', '${aql.roundtripTime}', '${aql.mutationId}', '${aql.resolver}', ${traql.expectedNumberOfAqls}, ${traql.aqlsReceivedBack.length}, '${aql.userToken}'),`);
    }
    // format the query to end with a semicolon, rather than a comma
    queryString = queryString.slice(0, -1);
    queryString = queryString + ';';
    db.query(queryString, (err, response) => {
      if (err) {
        return next(err);
      }


      // somethings going on with sending back 200


      console.log('i think things were added 1?');
      return next();
    });
  } else if(entryType === 'error') {
    for (let aql of traql.aqlsReceivedBack) {
      // add the successful Aqls to the database
      // TODO: update this else statement query to be similar to the loop above. create error query string base and then loop through aqls so error req only sends one long request to the database
      const errorQueryString = `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, error, user_token) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`;
      const errorQueryValues = [
        aql.id,
        aql.mutationSendTime,
        aql.mutationReceived,
        aql.subscriberReceived,
        aql.roundtripTime,
        aql.mutationId,
        aql.resolver,
        traql.expectedNumberOfAqls,
        traql.aqlsReceivedBack.length,
        true,
        aql.userToken,
      ];
      db.query(errorQueryString, errorQueryValues, (err, response) => {
        if (err) {
          return next(err);
        }
        console.log('i think things were added 2a?')
        return next();
      });
      // create error row for db with mutationID and traql stats
      const traqlErrorQueryString = `insert into Aql (mutation_id, mutation_received_time, resolver, expected_subscribers, successful_subscribers, error, user_token) values ($1, $2, $3, $4, $5, $6, $7)`;
      const traqlErrorValues = [
        traql.mutationId,
        traql.openedTime,
        traql.resolver,
        traql.expectedNumberOfAqls,
        traql.aqlsReceivedBack.length,
        true,
        traql.userToken,
      ];
      db.query(traqlErrorQueryString, traqlErrorValues, (err, response) => {
        if (err) {
          return next(err);
        }
        console.log('i think things were added 2b?');
        return next();
      });
    }        
  }
  return next();
};

module.exports = traqlController;