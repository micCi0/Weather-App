const key = "YOUR API KEY";

// event listener for form submission
document.querySelector("form").addEventListener("submit" , (e) =>{
    e.preventDefault(); // prevent default form submission behavior;
    let searchedCity =  document.querySelector("form input").value;
    if(searchedCity.length == 0) alert("Please Enter a City");
    else weatherInfo(searchedCity) // fetch city;
})

// fetch weather information from given city
async function weatherInfo(city){
 const  url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;
 try{
    const response = await fetch(url);
    const result = await response.json();
    // display UI weather informations
    document.querySelector(".city").textContent = result.name;
    document.querySelector(".temp").textContent = convert(result.main.temp) + "°C" // convert it to celsius
    document.querySelector(".wind").textContent = result.wind.speed + "km/h";
    document.querySelector(".humidity").textContent = result.main.humidity + "%"
    // update weather icon
    const iconCode = result.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    document.querySelector("img").src = iconURL;

 }
 catch(error){
    alert(error); // an error message
    loadDefaultCity()
 }
} 

function convert(kelvin){
    return (kelvin - 273.15).toFixed(2);
}

function  loadDefaultCity(){
    weatherInfo("Ottawa")
}
// load weather information when page load
onload = loadDefaultCity();