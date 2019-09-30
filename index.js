"use strict";

const baseURL = "https://developer.nps.gov/api/v1/parks"
const key = "ZBvyoi84QgJRYIfHYVAFYxnzREWMMFb4dy0xAXmu"

function buildParams(params) {
  const queryParams = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryParams.join("&")
}

function displayResults(responceJson) {
  $('.js-results-list').empty();
  $('.results-section').removeClass('hidden');
  console.log(responceJson);
  for (let i = 0; i < responceJson.data.length; i++) {
    $('.js-results-list').append(`
    <li class='results'>
    <h3 class='park-name'>${responceJson.data[i].name}</h3>
    <p class='description'>${responceJson.data[i].description}</p>
    <a class='link' href='${responceJson.data[i].url}' target='_blank'>${responceJson.data[i].url}</a>
    </li>`);
  }
}

function getParks(query, limit) {
  const params = {
    stateCode: query,
    limit: limit,
    api_key: key,
  }
  const url = `${baseURL}?${buildParams(params)}`
  
  fetch(url)
    .then(responce => {
      if (responce.ok) {
        $('.js-err').addClass('hidden');
        return responce.json();
      } else {
        throw new Error(responce.statusText);
      }
    })
    .then(responceJson => (displayResults(responceJson)))
    .catch(err => {
      $('.js-err').text(`Oh no, something happened ${err.message}`);
      $('.js-err').removeClass('hidden');
    })
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