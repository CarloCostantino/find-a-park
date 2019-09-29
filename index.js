"use strict";

const baseEndpoint = "https://developer.nps.gov/api/v1/"
const key = "ZBvyoi84QgJRYIfHYVAFYxnzREWMMFb4dy0xAXmu"

function buildURL(params) {
  console.log(params);
}

function getParks(query, limit) {
  const params = {
    stateCode: query,
    limit: limit,
    api_key: key,
  }
  buildURL(params);
}

function watchSubmit() {
  $(".js-form").submit(event => {
    event.preventDefault();
    const query = $("#query").val();
    const limit = $("#limit").val();
    console.log(query, limit);
    getParks(query, limit);
  })
}

$(watchSubmit);