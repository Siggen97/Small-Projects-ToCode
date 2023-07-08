/** @format */
window.addEventListener('load', () => {
	let longitude;
	let latitude;
	let temperatureDescription = document.querySelector(
		'.temperature-description'
		);
		let temperatureDegree = document.querySelector('.temperature-degree');
		let locationTimezone = document.querySelector('.location-timezone');
		let weatherIcon = document.querySelector('.weather-icon');
		let lastUpdate = document.querySelector('.lastupdate');
		const searchForm = document.querySelector('.search');
		const searchInput = document.querySelector('.search-bar');
		
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				longitude = position.coords.longitude;
				latitude = position.coords.latitude;
				
				const updateWeather = (city) => {
					let apiKey = 'aecede59e2bc4b3293162625230207';
					let apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`;
					
					fetch(apiUrl)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						console.log(data);
						const { temp_c, temp_f, condition, last_updated } = data.current;
						const { name, country } = data.location;
						
						temperatureDegree.textContent = `${temp_c}°C / ${temp_f}°F`;
						locationTimezone.textContent = name + ', ' + country;
						temperatureDescription.textContent = condition.text;
						weatherIcon.src = condition.icon;
						lastUpdate.textContent = last_updated;
					})
					.catch((error) => {
						console.log('Error:', error);
					});
				};
				
				// Default city on page load
				updateWeather('London');

			
			searchForm.addEventListener('submit', (event) => {
				event.preventDefault();
				const searchCity = searchInput.value;
				updateWeather(searchCity);
				searchInput.value = ''; //
			});
		});
	}
});
