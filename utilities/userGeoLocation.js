export const getUserCountry = async () => {
    const providers = [
      'https://ipapi.co/json/',
      'https://ipwho.is/',
      'https://ipinfo.io/json?token=YOUR_TOKEN' // optional but reliable
    ];
  
    for (const url of providers) {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`Provider failed: ${url}`);
          continue;
        }
        const data = await response.json();
        const countryCode =
          data.country_code || // ipapi
          data.country_code2 || // ipwho.is
          data.country ; // ipinfo
        if (countryCode) {
          return countryCode;
        }
      } catch (error) {
        console.warn(`Error with provider ${url}:`, error);
      }
    }
  
    return null;
  };