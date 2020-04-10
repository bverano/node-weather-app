let msg1 = document.getElementById('msg-1');
let msg2 = document.getElementById('msg-2');


const fetch_weather = (city) => {
    fetch(`/weather?city=${city}`)
    .then((res) => {
        return res.json();
    })
    .then((data) => {

        if(data.error) {
            msg1.setAttribute('style', 'color: red;')
            msg1.innerText = 'Error: ' + data.error;
        } else {
            msg1.innerText = 'City: ' + data.city;
            msg2.innerText ='Weather: ' +data.weather
        }
    })
}

let form = document.getElementById('search-form');
form.addEventListener('submit', (e) => {
    msg1.removeAttribute('style');
    msg1.innerText = 'Loading...';
    msg2.innerText = '';
    e.preventDefault();
    let city = document.getElementById('city').value;
    fetch_weather(city);
})