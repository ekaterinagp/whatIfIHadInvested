// "use strict";

// function convertMarketCapResponse(response) {
//   console.log({ response });
//   let objEntries = Object.entries(response["Global Quote"]);
//   console.log({ objEntries });
//   // let flat = objEntries.flat();
//   // console.log({ flat });

//   console.log(response["Global Quote"]["06. volume"]);
//   console.log(response["Global Quote"]["05. price"]);
//   let marketCap =
//     response["Global Quote"]["06. volume"] *
//     response["Global Quote"]["05. price"];
//   console.log("marketCap", marketCap);
// }

// function getMarketCap(symbol) {
//   const endpoint =
//     "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" +
//     symbol +
//     "&apikey=8WCY0DTWGFQH5R0R";
//   fetch(endpoint)
//     .then(res => res.json())
//     .then(convertMarketCapResponse);
//   // let data = JSON.parse({ response });
//   // console.log("data", data);
// }

// // getMarketCap("FB");
// // getMarketCap("CLDR");
// getMarketCap("SNAP");

const endpoint = "companies.json";

function fetchCompanies() {
  fetch(endpoint)
    .then(response => response.json())
    .then(function(data) {
      console.log(data);
      insertCompaniesToTheDom(data);
    });
}

fetchCompanies();

function insertCompaniesToTheDom(data) {
  const divForCompanies = document.querySelector("#companies");
  data.forEach(company => {
    let divForCompany = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", company.img);
    img.setAttribute("class", "hoverZoom");
    divForCompany.appendChild(img);
    divForCompany.addEventListener("click", function() {
      showYears(company);
    });
    divForCompanies.appendChild(divForCompany);
  });
}

function showYears(company) {
  console.log({ company });
}
