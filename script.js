const apiKey = process.env.API_KEY;
let weather = {
    "units": "metric",
    "metrics": "°C",
    "km_or_miles": "km/h",
    "apiKey" : apiKey,
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q="
             + city + "&units="
             + this.units + "&appid="
             + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description, main } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, main, temp, humidity, speed);
        this.updateBackground(main);
        document.querySelector(".location").innerText = "Weather in " + name;
        document.querySelector(".icon").src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temperature").innerText = Math.round(temp) + this.metrics;
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + Math.round(speed) + this.km_or_miles;
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    },
    updateBackground:function (main) {
        const body = document.body;
        const backgrounds = {
            Clear: "url('images/clear.jpg')",
            Clouds: "url('images/clouds.jpg')",
            Rain: "url('images/rain.jpg')",
            Thunderstorm: "url('images/thunderstorm.jpg')",
            Snow: "url('images/snow.jpg')",
            Mist: "url('images/mist.jpg')",
            Haze: "url('images/mist.jpg')",
        };
        body.style.backgroundImage = backgrounds[main] || "url('images/clear.jpg')";
    },
    switchMetric:function () {
        if (this.units === "metric") {
            this.units = "imperial";
            this.metrics = "°F";
            this.km_or_miles = "mph";
            document.querySelector(".metric").innerText = "°F";
        }
        else {
            this.units = "metric";
            this.metrics = "°C";
            this.km_or_miles = "km/h";
            document.querySelector(".metric").innerText = "°C";
        } 
        let city = document.querySelector(".search-bar").value;
        if (!city) {
            const locationText = document.querySelector(".location").innerText;
            if (locationText.startsWith("Weather in ")) {
                city = locationText.replace("Weather in ", "");
            }
        }
        if (city) {
            this.fetchWeather(city);
        }
    },
    

};

document
    .querySelector(".search button")
    .addEventListener("click", function (){
    weather.search();
});

document
    .querySelector(".metric")
    .addEventListener("click", function(){
    weather.switchMetric();
    weather.search();
    })

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Dubai");
