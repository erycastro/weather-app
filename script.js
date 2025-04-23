let weather = {
    "units": "metric",
    "apiKey": "850016e01e031e5af2a3fab9416144e8",
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
        document.querySelector(".temperature").innerText = Math.round(temp) + "°C";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind speed: " + Math.round(speed) + " km/h";
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
            document.querySelector(".metric").innerText = "°F";
        }
    }

};

document
    .querySelector(".search button")
    .addEventListener("click", function (){
    weather.search();
});

document
    .querySelector("metric")
    .addEventListener("click", function(){
    weather.switchMetric();
    })

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather("Dubai");
