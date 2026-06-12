// export const getUserCountry = async () => {
//     const providers = [
//       'https://ipapi.co/json/',
//       'https://ipwho.is/',
//       'https://ipinfo.io/json?token=YOUR_TOKEN' // optional but reliable
//     ];
  
//     for (const url of providers) {
//       try {
//         const response = await fetch(url);
//         if (!response.ok) {
//           console.warn(`Provider failed: ${url}`);
//           continue;
//         }
//         const data = await response.json();
//         const countryCode =
//           data.country_code || // ipapi
//           data.country_code2 || // ipwho.is
//           data.country || "US" ; // ipinfo
//         if (countryCode) {
//           return countryCode;
//         }
//       } catch (error) {
//         console.warn(`Error with provider ${url}:`, error);
//       }
//     }
  
//     return null;
//   };

export const getUserCountry = async () => {

  const providers = [
    {
      url: "https://ipapi.co/json/",
      extractor: (data) => data?.country_code,
    },
    {
      url: "https://ipwho.is/",
      extractor: (data) => data?.country_code,
    },
    {
      url: "https://ipinfo.io/json", // optional (remove token if you don't have one)
      extractor: (data) => data?.country,
    },
  ];

  const fetchWithTimeout = async (url, timeout = 3000) => {

    const controller = new AbortController();

    const id = setTimeout(
      () => controller.abort(),
      timeout
    );

    try {

      const res = await fetch(url, {
        signal: controller.signal,
      });

      clearTimeout(id);

      if (!res.ok) return null;

      return await res.json();

    } catch (err) {

      clearTimeout(id);

      console.warn(
        "Provider failed:",
        url,
        err.message
      );

      return null;
    }
  };

  for (const provider of providers) {

    const data =
      await fetchWithTimeout(provider.url);

    if (!data) continue;

    const code =
      provider.extractor(data);

    if (
      code &&
      typeof code === "string"
    ) {

      return code.toUpperCase();

    }
  }

  return "US"; // safe default fallback
};