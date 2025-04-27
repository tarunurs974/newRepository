const politicianMapping = {
    "Delhi": "Arvind Kejriwal",
    "Lucknow": "Yogi Adityanath",
    "Chennai": "M.K. Stalin",
    "Bengaluru": "Siddaramaiah",
    "Mumbai": "Eknath Shinde"
  };
  
  async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = "37ea8bdd6c6e59235ee5e062a1b363e3"; // <-- Replace this with your OpenWeather API key
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    try {
      const weatherRes = await fetch(weatherUrl);
      const weatherData = await weatherRes.json();
  
      if (weatherData.cod === "404") {
        document.getElementById('weatherInfo').innerHTML = "City not found!";
        document.getElementById('politicianInfo').innerHTML = "";
        return;
      }
  
      document.getElementById('weatherInfo').innerHTML = `
        <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
        <p>Temperature: ${weatherData.main.temp} °C</p>
        <p>Weather: ${weatherData.weather[0].description}</p>
      `;
  
      showPolitician(city);
  
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  }
  
  async function showPolitician(city) {
    const politicianName = politicianMapping[city];
  
    if (!politicianName) {
      document.getElementById('politicianInfo').innerHTML = "No politician info available.";
      return;
    }
  
    try {
      const wikiUrl = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(politicianName)}&prop=pageimages&format=json&pithumbsize=500&origin=*`;
      const wikiRes = await fetch(wikiUrl);
      const wikiData = await wikiRes.json();
  
      const pages = wikiData.query.pages;
      const page = Object.values(pages)[0];
  
      let imgHtml = "";
  
      if (page && page.thumbnail && page.thumbnail.source) {
        imgHtml = `<img src="${page.thumbnail.source}" alt="${politicianName}">`;
      }
  
      document.getElementById('politicianInfo').innerHTML = `
        <h3>Famous Politician: ${politicianName}</h3>
        ${imgHtml}
      `;
  
    } catch (error) {
      console.error("Error fetching politician image:", error);
    }
  }
  