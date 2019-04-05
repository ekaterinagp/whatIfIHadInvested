"use strict";

window.addEventListener("load", init);

const endpoint = "companies.json";

function fetchCompanies() {
  fetch(endpoint)
    .then(response => response.json())
    .then(function(data) {
      console.log(data);
      insertCompaniesToTheDom(data);
    });
}

function insertCompaniesToTheDom(data) {
  const divForCompanies = document.querySelector("#companies");
  const divWrapIcons = document.createElement("div");
  let companyinDOM = document.querySelector("#companyName");
  divWrapIcons.setAttribute("class", "masonary");
  data.forEach(company => {
    let divForCompany = document.createElement("div");
    divForCompany.style.backgroundImage = "url(" + company.img + ")";
    // divForCompany.setAttribute("width", "80px");
    // divForCompany.setAttribute("height", "80px");
    // let img = document.createElement("img");
    // img.setAttribute("src", company.img);
    // img.setAttribute("class", "hoverZoom");
    // divForCompany.appendChild(img);
    divForCompany.addEventListener("click", function() {
      companyinDOM.textContent = "";
      document.querySelector("#companyName").textContent = "";
      document.querySelector("#amountInvest").textContent = "";
      document.querySelector("#moneyNow").textContent = "";
      document.querySelector("#invest").value = "";
      document.querySelector("#yearInvestment").textContent = "";
      companyinDOM.textContent = company.name;
      insertYears();
      showYears(company);
    });
    divWrapIcons.appendChild(divForCompany);
    divForCompanies.appendChild(divWrapIcons);
  });
}

function showYears(company) {
  console.log({ company });
  let companyLastYear =
    company.valuationTimeline[company.valuationTimeline.length - 1];
  if (
    company.valuationTimeline[company.valuationTimeline.length - 1].amount ==
    null
  ) {
    companyLastYear =
      company.valuationTimeline[company.valuationTimeline.length - 2];
  }
  // let matchedYears = [];
  let allBtn = document.querySelectorAll(".years");
  console.log({ companyLastYear });
  let timeline = company.valuationTimeline;
  // console.log({ timeline });
  let yearinDom = document.querySelector("#yearInvestment");
  allBtn.forEach(btn => {
    let found = timeline.find(time => time.year == btn.innerText);
    if (found) {
      btn.disabled = false;

      btn.addEventListener("click", function() {
        yearinDom.textContent = "";
        yearinDom.textContent = found.year;
        let allBtn = document.querySelectorAll(".years");
        allBtn.forEach(btn => btn.classList.remove("selected"));
        btn.classList.add("selected");
        console.log({ btn });
        console.log({ found });
        saveInput(found, companyLastYear);
      });
    }
  });
}

function insertYears() {
  const years = yearArray();
  console.log({ years });
  const yearsDiv = document.querySelector("#years");
  yearsDiv.innerHTML = "";
  years.forEach(year => {
    let btnForYear = document.createElement("button");

    btnForYear.setAttribute("class", "years");

    btnForYear.disabled = true;
    btnForYear.innerText = year;
    yearsDiv.appendChild(btnForYear);
  });
}

function yearArray() {
  var a = [];
  for (var i = 2002; i < 2020; i++) {
    a.push(i);
  }
  return a;
}

function saveInput(found, lastYear) {
  let investInput = document.querySelector("#invest");
  let investinDom = document.querySelector("#amountInvest");

  investInput.addEventListener("change", function() {
    investinDom.textContent = "";
    investinDom.textContent = investInput.value + "$";
    countResult(found, lastYear);
  });
}

function countResult(found, lastYear) {
  // let btnCount = document.querySelector("#count");
  console.log({ found });
  console.log({ lastYear });
  let increaseInPercantage = (lastYear.amount / found.amount) * 100;
  console.log({ increaseInPercantage });
  let investment = document.querySelector("#invest").value;
  let result = (investment / 100) * increaseInPercantage;
  result = Math.round(result * 100) / 100;
  result = result.toLocaleString();
  console.log({ result });
  let output = document.querySelector("#moneyNow");
  output.textContent = result + "$";
}

function init() {
  fetchCompanies();
  // saveInput();
  // let btnCount = document.querySelector("#count");
  // btnCount.addEventListener("click", function() {
  //   countResult();
  // });
}

// API from alphavantage

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
