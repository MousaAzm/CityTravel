"use strict";

window.onload = function () {
  travelText();
  dayDate();
  weatherCheckBox();
  attractionsCheckBox();

  const output = document.querySelector("#card-3");
  const searchCity = document.getElementById("searchBar");
  const searchButton = document.getElementById("btnClick");
  const client_Id = "VTONLECZ3DGQ3GVBBBSD1HP2PIO1OWUBDPOT0CZBU4YCBVMG";
  const client_Secret = "4QQLDUUEYOFGAJ0WAEM0EECPDSOWZR0QVIEFDUUA4JUDL1YQ";
  const iconElement = document.querySelector(".weather-icon");
  const tempElement = document.querySelector(".temperature-value p");
  const descElement = document.querySelector(".temperature-description p");
  const locationElement = document.querySelector(".location p");
  const letters = /^[a-zöäå/s]+$/;

  // Search click 
  searchButton.addEventListener("click", function () {

    if(searchCity.value.toLowerCase().match(letters)) {
        getWeatherInfo();
    } else {
        alert( "Check your city name.");
    } 
   
  });
  
  //  Weather
  function getWeatherInfo() {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity.value}&units=metric&APPID=7084c9feecad4a0e88495a33c655f226`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network Response ERROR Try Again!");
        }
      })
      .then((data) => {
        let iconElementValue = data["weather"][0]["icon"];
        let tempElementValue = Math.floor(data["main"]["temp"]);
        let descElementValue = data["weather"][0]["description"];
        let locationValue = data["name"];

        tempElement.innerHTML = tempElementValue + "°C";
        descElement.innerHTML = descElementValue;
        locationElement.innerHTML = locationValue;
        iconElement.innerHTML = `<img src="img/icons/${iconElementValue}.png"/>`;
        getCityInfo();
      })
      .catch((err) => {
        alert(err);
      });
  }

  // City
  function getCityInfo() {
    output.innerHTML = "";
    fetch(`https://api.foursquare.com/v2/venues/explore?&section=sights&client_id=${client_Id}&client_secret=${client_Secret}&v=202103010&limit=10&near=${searchCity.value}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Network Response ERROR for City Info Try Again!");
        }
      })
      .then((data) => {
        for (let i = 0; i < 10; i++) {
          let doDiv = document.createElement("div");
          let doTitle = document.createElement("h6");
          let doP = document.createElement("p");
          doTitle.innerHTML = data.response.groups[0].items[i].venue.name;
          doP.innerHTML = data.response.groups[0].items[i].venue.location.formattedAddress;
          doDiv.setAttribute("class", "co-card2");
          output.appendChild(doDiv);
          doDiv.appendChild(doTitle);
          doDiv.appendChild(doP);
        }
        document.getElementById("cityN").innerHTML = data.response.groups[0].items[0].venue.location.city;
      })
      .catch((err) => {
        alert(err);
      });
  }
};

//text-animations
function travelText() {
  const textWrapper = document.querySelector(".ml3");
  textWrapper.innerHTML = textWrapper.textContent.replace(
    /\S/g,
    "<span class='letter'>$&</span>"
  );

  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml3 .letter",
      opacity: [0, 1],
      easing: "easeInOutQuad",
      duration: 2250,
      delay: (el, i) => 150 * (i + 1),
    })
    .add({
      targets: ".ml3",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000,
    });
}

// day-date and Time
const myTimer = setInterval(dayDate, 1000);
function dayDate() {
  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let n = weekday[d.getDay()];
  document.getElementById("showDay").innerHTML = n;
  document.getElementById("showDate").innerHTML = d.toLocaleDateString();
  document.getElementById("tm").innerHTML = d.toLocaleTimeString();
}

//checkbox-weather
function weatherCheckBox() {
  let checkBox = document.getElementById("input-1");
  let text = document.getElementById("card-1");

  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}

//checkbox-attractions
function attractionsCheckBox() {
  let checkBox = document.getElementById("input-2");
  let text = document.getElementById("card-2");

  if (checkBox.checked == true) {
    text.style.display = "block";
  } else {
    text.style.display = "none";
  }
}
