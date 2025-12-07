export function languageDetector(city) {
  const text = (city || "").trim();
  const hasCyrillic = /[\u0400-\u04FF]/.test(text);
  const hasDevanagari = /[\u0900-\u097F]/.test(text);

  if (text.length === 0) {
    return "en";
  }

  if (hasCyrillic) return "ru";
  if (hasDevanagari) return "hi";
  return "en";
}

const URL = "https://geocoding-api.open-meteo.com/v1/search";

export default async function GeoCode(params) {
  const lang = languageDetector(params);
  const cityName = params.toLowerCase().trim();

  try {
    const response = await fetch(
      `${URL}?name=${cityName}&count=5&language=${lang}&format=json`
    );

    if (!response.ok) {
      throw new Error("Ошибка сети или ответа сервера");
    }

    const data = await response.json();
    console.log(data);

    // 👉 тут обрабатываем случай, когда ничего не найдено
    if (!data || !data.results || data.results.length === 0) {
      const err = new Error("No results");
      err.code = "NO_RESULTS";
      throw err;
    }

    return data;
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    throw error;
  }
}
