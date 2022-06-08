import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");

const DEBOUNCE_DELAY = 300;
searchBox.addEventListener("input", debounce(searching, DEBOUNCE_DELAY));


function searching() {

  fetchCountries(searchBox.value)
    .then(countries => renderCountriesInfo(countries))
    .catch(error => console.log(error));
}
function renderCountriesInfo(countries) {
  const markup = countries
    .map((country) => {
      return `<li>
          <p><b>Name</b>: ${country.name.official}</p>
          <p><b>Capital</b>: ${country.capital}</p>
          <p><b>Languages</b>: ${country.languages}</p>
        </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
}
