
//return obj with resolver names as properties and count as value
function resolverStats(data) {
  // create returnObj
  const returnObj = {};
  // for element of data.rows
  for (let el of data.rows) {
    // if returnObj has key of element.resolver
    if (returnObj[el.resolver]) {
      // increment value
      returnObj[el.resolver] += 1;
    } else {
      // else make new key of value 1
      returnObj[el.resolver] = 1;
    }
  }
  const returnArr = [];
  for (let key in returnObj) {
    const resolverObj = {};
    resolverObj.name = key;
    resolverObj.value = returnObj[key];
    returnArr.push(resolverObj);
  }
  return returnArr;
}

// return object that represent the num of subs at every point in time where there was a mutation
function subscriptionHistory(data) {
  // create returnObject
  const returnObj = {};
  // iterate through data
  for (let el of data.rows) {
    // if returnObj doesnt have key of mutationReceivedTime
    if (!returnObj[el.mutation_received_time]) {
      //create that key and set it to expected_subscribers
      returnObj[el.mutation_received_time] = el.expected_subscribers;
    }
  }
  // return returnObj
  return returnObj;
}

function mutations(data) {
  //create hash to store aqls
  const hashql = {};
  const returnArr = [];
  const errorql = {};
  const errorArr = [];

  //create a function that takes an array and returns number
  function getAvg(array) {
    let total = 0;
    if (array.length) {
      for (let el of array) {
        total += parseInt(el.latency);
      }
      total = total / array.length;
    }
    return total;
  }

  for (let el of data.rows) {
    if (!el.error) {
      if (!hashql[el.mutation_id]) {
        hashql[el.mutation_id] = [el];
      } else {
        hashql[el.mutation_id].push(el);
      }
    } else {
      // return array of mutations that were errors, including any aqls that came back
      if (!errorql[el.mutation_id]) {
        // build error Mutation obj from shared data
        const errorMutObj = {};
        errorMutObj.mutationId = el.mutation_id;
        errorMutObj.resolver = el.resolver;
        errorMutObj.dateTime = el.mutation_received_time;
        errorMutObj.expected = el.expected_subscribers;
        errorMutObj.received = el.successful_subscribers;
        errorMutObj.aqls = el.id ? [el] : [];
        errorMutObj.error = true;
        errorql[el.mutation_id] = errorMutObj;
      } else {
        if (el.id) {
          errorql[el.mutation_id].aqls.push(el);
        }
      }
    }
  }
  // loop through hash
  for (let key in hashql) {
    const mutObj = {};
    mutObj.mutationId = key;
    mutObj.resolver = hashql[key][0].resolver;
    mutObj.expectedAqls = hashql[key][0].expected_subscribers;
    mutObj.dateTime = hashql[key][0].mutation_received_time;
    mutObj.aqls = hashql[key];
    mutObj.avgLatency = getAvg(mutObj.aqls);
    //   mutObj.aqls.length > 0 ? total / parseInt(mutObj.aqls.length) : total;
    returnArr.push(mutObj);
  }
  for (let key in errorql) {
    errorql[key].avgLatency = getAvg(errorql[key].aqls);
    errorArr.push(errorql[key]);
  }
  return [returnArr, errorArr];
}

module.exports = {
  resolverStats,
  subscriptionHistory,
  mutations,
};
