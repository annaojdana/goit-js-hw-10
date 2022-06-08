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
  if (countries.lenght > 1) {
    const markup = countries
    .map((country) => {
      return `<li>
      <svg class="flag">
      <use href="${country.flags.svg}"></use>
      </svg>
      <p> ${country.name.official}</p>
      </li>`;
    })
    .join("");
  countryList.innerHTML = markup;
  }

}
