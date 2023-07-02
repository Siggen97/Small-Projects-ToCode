/** @format */

window.addEventListener('load', () => {
	let longitude;
	let latitude;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.weather-icon');
    let lastUpdate = document.querySelector('.lastupdate');

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition((position) => {
			longitude = position.coords.longitude;
			latitude = position.coords.latitude;

			const api =
				'http://api.weatherapi.com/v1/current.json?key=aecede59e2bc4b3293162625230207&q=London&aqi=no';

			fetch(api)
				.then((response) => {
					return response.json();
				})
				.then((data) => {
					console.log(data);
                    const {temp_c, temp_f, condition, last_updated } = data.current;
                    const {name, tz_id, } = data.location;

                    temperatureDegree.textContent = `${temp_c}°C / ${temp_f}°F`;
                    locationTimezone.textContent = name + ', ' + tz_id
                    temperatureDescription.textContent = condition.text
                    weatherIcon.src = condition.icon
                    lastUpdate.textContent = last_updated


				});
		});
	}
});
