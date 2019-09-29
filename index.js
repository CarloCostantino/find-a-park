"use strict";

const baseURL = "https://developer.nps.gov/api/v1/parks"
const key = "ZBvyoi84QgJRYIfHYVAFYxnzREWMMFb4dy0xAXmu"

function buildParams(params) {
  const queryParams = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryParams.join("&")
}

function getParks(query, limit) {
  const params = {
    stateCode: query,
    limit: limit,
    api_key: key,
  }
  const url = `${baseURL}?${buildParams(params)}`
  console.log(url);
}

function watchSubmit() {
  $(".js-form").submit(event => {
    event.preventDefault();
    const query = $("#query").val();
    const limit = $("#limit").val();
    getParks(query, limit);
  })
}

$(watchSubmit);