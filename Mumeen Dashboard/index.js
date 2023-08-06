//UNSPLASH API
fetch("https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=muslim")
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.body.style.backgroundImage = `url(${data.urls.regular})`
		document.getElementById("author").textContent = `By: ${data.user.name}`
    })
    .catch(err => {
        // Use a default background image/author
        document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1589495180659-8bcc1c5d4908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxNDI0NzB8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTEyODQ0MDJ8&ixlib=rb-4.0.3&q=80&w=1080)`
		document.getElementById("author").textContent = "By: jim pave"
    })


//QURAN API
const randomVerse = Math.ceil(Math.random() * 6236 )
fetch(`http://api.alquran.cloud/v1/ayah/${randomVerse}/editions/quran-uthmani,en.pickthall`)
    .then(res => {
        if (!res.ok) {
            throw Error("Something went wrong")
        }
        return res.json()
    })
    .then(data => {
        document.getElementById("arabic").textContent = data.data[0].text
        document.getElementById("english").textContent = data.data[1].text
        document.getElementById("surah").textContent = `${data.data[1].surah.englishName} ${data.data[1].surah.number}:${data.data[1].numberInSurah}`
    })
    .catch(err => {
        document.getElementById("arabic").textContent = "Error: Quran verse not available."
    })


//TIME FUNCTIONALITY
function getCurrentTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString("en-NG", { hour12: false, timeStyle: "short" });
    document.getElementById("time").textContent = currentTime;
}

setInterval(getCurrentTime, 1000)

document.addEventListener('DOMContentLoaded', () => {
    const gender = localStorage.getItem('gender');
    const pronoun = gender ? "Ukhti" : "Akhi";

    // Display the greeting message with the appropriate pronoun
    document.getElementById("greet").textContent = `As Salam Alaykum, ${pronoun}.`;

    // Check if gender is already set in localStorage
    if (gender) {
        document.getElementById('genderWrapper').style.display = 'none';
    }
});

document.getElementById("gender").addEventListener('change', (e) => {
    const isFemale = e.target.checked;
    const pronoun = isFemale ? "Ukhti" : "Akhi";

    // Display the greeting message with the appropriate pronoun
    document.getElementById("greet").textContent = `As Salam Alaykum, ${pronoun}.`;

    // Hide the gender selection form after the user has made their choice
    document.getElementById('genderWrapper').style.display = 'none';

    // Save the selected gender to localStorage
    localStorage.setItem('gender', isFemale);
});

document.getElementById("changeGender").addEventListener("click", () => {
    localStorage.removeItem("gender");

    const isFemale = document.getElementById("gender").checked;
    const pronoun = isFemale ? "Ukhti" : "Akhi";

    // Display the greeting message with the appropriate pronoun
    document.getElementById("greet").textContent = `As Salam Alaykum, ${pronoun}.`;

    document.getElementById('genderWrapper').style.display = 'block';
})

//WEATHER API
function callWeatherApi(){
    navigator.geolocation.getCurrentPosition(position => {
        fetch(`https://api.weatherbit.io/v2.0/current?lat=${position.coords.latitude}&lon=${position.coords.longitude}&key=1e268aa09c5a4d40a471f54e61be9306`)
            .then(res => {
                if (!res.ok) {
                    throw Error("Weather data not available")
                }
                return res.json()
            })
            .then(data => {
                const iconUrl = `https://www.weatherbit.io/static/img/icons/${data.data[0].weather.icon}.png`
                document.getElementById("weather").innerHTML = `
                    <img src=${iconUrl} />
                    <p class="weather-temp">${Math.round(data.data[0].temp)}º</p>
                    <p class="weather-city">${data.data[0].city_name}</p>
                `
            })
            .catch(err => {
                document.getElementById("weather").innerHTML = err
            })
    });
}

const millisecondsInADay = 24 * 60 * 60 * 1000
setInterval(callWeatherApi, millisecondsInADay)
