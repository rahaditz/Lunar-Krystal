module.exports.config = {
	name: "weather",
	version: "1.0.1",
	permission: 0,
	credits: "sakibin",
  prefix: true,
  premium: false,
	description: "see weather information in the area",
	category: "without prefix",
	usages: "[location]",
	cooldowns: 5,
	dependencies: {
		"moment-timezone": "",
		"request": ""
	},
	envConfig: {
		"OPEN_WEATHER": "b7f1db5959a1f5b2a079912b03f0cd96"
	}
};

module.exports.languages = {

	"en": {
		"locationNotExist": "can't find %1.",
		"returnResult": "🌡temp : %1℃\n🌡feels like : %2℃\n☁sky : %3\n💧humidity : %4%\n🌊wind speed : %5km/h\n☀sun rises : %6\n🌘sun sets : %7"
	}
}

module.exports.run = async ({ api, event, args, getText }) => {
	const request = global.nodemodule["request"];
	const moment = global.nodemodule["moment-timezone"];
	const { throwError } = global.utils;
	const { threadID, messageID } = event;
  const { weather } = global.apisakibin;
	
	var city = args.join(" ");
	if (city.length == 0) return throwError(this.config.name, threadID, messageID);
	return request(encodeURI(weather + city + "&appid=" + global.configModule[this.config.name].OPEN_WEATHER + "&units=metric&lang=" + global.config.language), (err, response, body) => {
		if (err) throw err;
		var weatherData = JSON.parse(body);
		if (weatherData.cod !== 200) return api.sendMessage(getText("locationNotExist", city), threadID, messageID);
		var sunrise_date = moment.unix(weatherData.sys.sunrise).tz("Asia/Manila");
		var sunset_date = moment.unix(weatherData.sys.sunset).tz("Asia/Manila");
		api.sendMessage({
			body: getText("returnResult", weatherData.main.temp, weatherData.main.feels_like, weatherData.weather[0].description, weatherData.main.humidity, weatherData.wind.speed, sunrise_date.format('HH:mm:ss'), sunset_date.format('HH:mm:ss')),
			location: {
				latitude: weatherData.coord.lat,
				longitude: weatherData.coord.lon,
				current: true
			},
		}, threadID, messageID);
	});
}