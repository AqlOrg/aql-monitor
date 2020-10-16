const db = require('../model.js');

const traqlController = {};

traqlController.addAqlsToTraql = (req, res, next) => {
  let receivedTraqlEntries = req.body;
  let queryString = '';
  // create query string to send Aqls to the database
  if(!receivedTraqlEntries.successAqls.length) {
    // create base of query string to send all values to db
    queryString += `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, user_token) values`;
    for(let traql of receivedTraqlEntries.successAqls) {
      // loop through aqls in mutation Id
      for (let aql of traql.aqlsReceivedBack) {
        // add one aql of data to query string
        queryString += `('${aql.id}', '${aql.mutationSendTime}', '${aql.mutationReceived}', '${aql.subscriberReceived}', '${aql.roundtripTime}', '${aql.mutationId}', '${aql.resolver}', ${traql.expectedNumberOfAqls}, ${traql.aqlsReceivedBack.length}, '${aql.userToken}'),`;
      }
      // format the query to remove final comma
      queryString = queryString.slice(0, -1);
    }
  }
  if(!receivedTraqlEntries.errorAqls.length) {
    queryString += `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, error, user_token) values`;
    for(let traql of receivedTraqlEntries.errorAqls) {
      for (let aql of traql.aqlsReceivedBack) {
        // add each aql to the query string
        queryString += `('${aql.id}', '${aql.mutationSendTime}', '${aql.mutationReceived}', '${aql.subscriberReceived}', '${aql.roundtripTime}', '${aql.mutationId}', '${aql.resolver}', ${traql.expectedNumberOfAqls}, ${traql.aqlsReceivedBack.length}, 'true', '${aql.userToken}'),`;
      }
      // create error row for db with mutationID and traql stats
      queryString += `insert into Aql (mutation_id, mutation_received_time, resolver, expected_subscribers, successful_subscribers, error, user_token) values ('${traql.mutationId}', '${traql.openedTime}', '${traql.resolver}', '${traql.expectedNumberOfAqls}', '${traql.aqlsReceivedBack.length}', 'true', '${traql.userToken}')`;
    }
    // format the query to remove final comma
    queryString = queryString.slice(0, -1);
  }
  // add semicolon to end of query
  queryString = queryString + ';';
  db.query(queryString, (err, response) => {
    if (err) {
      return next(err);
    }
    console.log('Sucessfully added aqls to db');
    return next();
  });
  return next();
};

module.exports = traqlController;