var container = document.createElement("div")
container.className = "container"

var row = document.createElement("div")
row.className = "row"

async function restCountry() {
    try {
        let res = await (await fetch("https://restcountries.com/v3.1/all")).json();
        containerFunction(res);
    } catch (error) {
        console.log(error);
    }
}
async function wheatherData(lat, lon) {
    try {
        let wheatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=5ce6d5dbf984f32fd5f798f88a19a91c`)
        let wheatherData1 = await wheatherData.json();
        return wheatherData1.main.temp;
    } catch (error) {
    }
}
async function containerFunction(res) {

    try {
        for (let i = 0; i < res.length; i++) {
            let [lat, lng] = res[i].latlng;
            let col = document.createElement("div")
            col.className = "col-lg-4"
            col.innerHTML = `<div class="card">
            <div class="card-header">${res[i].name.common}</div>
            <div style="text-align: center;">
            <img src="${res[i].flags.png}" alt="flags"style="width: 294px; height: 147px;>
            </div>
            <div class="card-body">
                <p><strong>Capital:</strong>${res[i].capital} </p>
                <p><strong>Region:</strong> ${res[i].region}</p>
                <p><strong>Country Code:</strong>${res[i].cca3} </p>
               <p>LatIng : ${lat}</p>
               <p>LatIng : ${lng}</p>
                <button type="button" class="btn btn-primary"id="wbtn-${i}">click for weather</button>
                 <h5 id="weatherDetails-${i}"></h5>
            </div>
        </div>`
            
            row.append(col);
            container.append(row)
            document.body.append(container)

            let weather_container = document.getElementById(`weatherDetails-${i}`)

            let w_btn = document.getElementById(`wbtn-${i}`);
            w_btn.addEventListener('click', async (event) => {
                event.preventDefault();
                let temp = await wheatherData(lat, lng);
                weather_container.textContent = `Weather ${temp} °C`
                console.log(temp);
            })
        }
    }
    catch (error) {
    console.log(error);
    }
}
restCountry()