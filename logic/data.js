const APIentry =
  "https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/";

export async function getWeatherForecast(lat, lon) {
  const smhiApiUrl = APIentry + "lon/" + lon + "/lat/" + lat + "/data.json";
  console.log("Hämtar väderdata...");
  try {
    const response = await fetch(smhiApiUrl);
    const data = await response.json();

    // Debuggar raw respons
    console.debug("Raw response:", data);

    // Konverterar en parameter-array till ett objekt med nycklar som parameter-namn fÃ¶r enklare anvÃ¤ndning av datan
    function paramArrayToObject(paramArray) {
      const paramObject = {};
      paramArray.forEach((param) => {
        paramObject[param.name] = {
          value: param.values[0],
          unit: param.unit,
        };
      });
      return paramObject;
    }

    // Extrahera relevanta vÃ¤derprognoser
    const forecasts = data.timeSeries.map((entry) => ({
      time: entry.validTime,
      parameters: paramArrayToObject(entry.parameters),
    }));

    // Debuggar processad data
    console.debug("Parsed response:", forecasts);

    return forecasts;
  } catch (error) {
    console.error("Ett fel uppstod:", error);
    throw error;
  }
}
