const db = require('../model.js');
const { v4: uuidv4 } = require('uuid');

const traqlController = {};

traqlController.addAqlsToTraql = (req, res, next) => {
  let receivedTraqlEntries = req.body;
  let queryString = '';
  // create query string to send Aqls to the database
  if (receivedTraqlEntries.successAqls.length) {
    // create base of query string to send all values to db
    queryString += `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, user_token) values `;
    for (let traql of receivedTraqlEntries.successAqls) {
      // loop through aqls in mutation Id
      for (let aql of traql.aqlsReceivedBack) {
        // add one aql of data to query string
        queryString += `('${aql.id}', '${aql.mutationSendTime}', '${aql.mutationReceived}', '${aql.subscriberReceived}', '${aql.roundtripTime}', '${aql.mutationId}', '${aql.resolver}', '${traql.expectedNumberOfAqls}', '${traql.aqlsReceivedBack.length}', '${aql.userToken}'),`;
      }
    }
    // format the query to remove final comma and add semicolon at end
    queryString = queryString.slice(0, -1) + ';';
  }
  if (receivedTraqlEntries.errorAqls.length) {
    for (let traql of receivedTraqlEntries.errorAqls) {
      if (traql.aqlsReceivedBack.length) {
        queryString += `insert into Aql (id, mutation_send_time, mutation_received_time, subscriber_received_time, latency, mutation_id, resolver, expected_subscribers, successful_subscribers, error, user_token) values `;
        for (let aql of traql.aqlsReceivedBack) {
          // add each aql to the query string
          queryString += `('${aql.id}', '${aql.mutationSendTime}', '${aql.mutationReceived}', '${aql.subscriberReceived}', '${aql.roundtripTime}', '${aql.mutationId}', '${aql.resolver}', ${traql.expectedNumberOfAqls}, ${traql.aqlsReceivedBack.length}, 'true', '${aql.userToken}'),`;
        }
        // format the query to remove final comma and add semicolon at end
        queryString = queryString.slice(0, -1) + ';';
      }
      let newId = uuidv4();
      // create error row for db with mutationID and traql stats
      queryString += `insert into Aql (id, mutation_id, mutation_received_time, resolver, expected_subscribers, successful_subscribers, error, user_token) values ('${newId}', '${traql.mutationId}', '${traql.openedTime}', '${traql.resolver}', '${traql.expectedNumberOfAqls}', '${traql.aqlsReceivedBack.length}', 'true', '${traql.userToken}');`;
    }
  }
  console.log('query string');
  console.log(queryString);
  db.query(queryString, (err, response) => {
    if (err) {
      return next(err);
    }
    console.log('Data successfully added to db');
    return next();
  });
  return next();
};

module.exports = traqlController;
