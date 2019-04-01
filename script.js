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
  data.forEach(company => {
    let divForCompany = document.createElement("div");
    let img = document.createElement("img");
    img.setAttribute("src", company.img);
    img.setAttribute("class", "hoverZoom");
    divForCompany.appendChild(img);
    divForCompany.addEventListener("click", function() {
      const years = insertYears();
      console.log({ years });
      showYears(company);
    });
    divForCompanies.appendChild(divForCompany);
  });
}

function showYears(company) {
  console.log({ company });
  let matchedYears = [];
  let allBtn = document.querySelectorAll(".years");
  console.log({ allBtn });
  let timeline = company.valuationTimeline;
  console.log({ timeline });
  for (let u = 0; u < allBtn.length; u++) {
    for (let i = 0; i < timeline.length; i++) {
      if (timeline[i].year == allBtn[u].innerText) {
        allBtn[u].classList.add("toChoose");

        matchedYears.push(timeline[i].year);
      }
    }
    allBtn[u].addEventListener("click", function() {
      console.log("i click", allBtn[u]);
      let clickedYear = timeline.find(year => year.year == allBtn[u].innerText);
      console.log({ clickedYear });
    });
  }

  console.log({ matchedYears });
}

// function listenerForButtons() {
//   let buttons = document.querySelectorAll(".years");
//   buttons.forEach(function(button) {
//     button.addEventListener("click", function() {
//       toggleClass(buttons, this);
//     });
//   });
// }

// function toggleClass(buttons, buttonToActivate) {
//   buttons.forEach(function(btn) {
//     btn.classList.remove("active");
//   });
//   buttonToActivate.classList.add("active");
// }

// function eventListenerForYears() {
//   let allBtn = document.querySelectorAll(".years");

//   for (let i = 0; i < allBtn.length; i++) {
//     console.log("we are inside the loop");
//     if (allBtn[i].disabled == "false") {
//       console.log("its a match!", allBtn[i].disabled);
//       allBtn[i].addEventListener("click", function() {
//         console.log("{allBtn[i]}", allBtn[i]);
//       });
//     }
//   }
// }

// function matchYears(array1, array2) {
//   const matchedArray = [];
//   array1.forEach(e1 =>
//     array2.forEach(e2 => {
//       if (e1 == e2) {
//         matchedArray.push(e1);
//       }
//     })
//   );
//   console.log({ matchedArray });
//   return matchedArray;
// }

function insertYears() {
  const years = yearArray();
  console.log({ years });
  const yearsDiv = document.querySelector("#years");
  years.forEach(year => {
    let btnForYear = document.createElement("input");

    btnForYear.setAttribute("type", "radio");
    btnForYear.setAttribute("name", "toggleRadio");
    let divForLabel = document.createElement("div");
    divForLabel.setAttribute("class", "years");
    let label = document.createElement("label");
    btnForYear.value = year;
    let p = document.createElement("p");
    p.textContent = btnForYear.value;
    label.appendChild(btnForYear);
    label.appendChild(p);
    // btnForYear.disabled = true;
    // btnForYear.innerText = year;
    // yearsDiv.appendChild(btnForYear);
    divForLabel.appendChild(label);
    yearsDiv.appendChild(divForLabel);
  });
  return years;
}

function yearArray() {
  var a = [];
  for (var i = 2002; i < 2020; i++) {
    a.push(i);
  }
  return a;
}

function init() {
  fetchCompanies();
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
