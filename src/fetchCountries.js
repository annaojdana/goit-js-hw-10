function fetchCountries(name) {
  const fetchQuery = fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });


  return fetchQuery;
}
export { fetchCountries };
