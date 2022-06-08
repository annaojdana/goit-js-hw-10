import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const searchBox = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

const DEBOUNCE_DELAY = 300;
searchBox.addEventListener("input", debounce(searching, DEBOUNCE_DELAY));


function searching() {

  fetchCountries(searchBox.value.trim())
    .then(countries => renderCountriesInfo(countries))
    .catch(error => {
      countryList.innerHTML = "";
      countryInfo.innerHTML = "";
      console.log(error);
      
      if (searchBox.value !== "") {
        Notiflix.Notify.failure("Oops, there is no country with that name");
      };
    }
    );
}
function renderCountriesInfo(countries) {
  if (countries.length > 10) {

    countryList.innerHTML = "";
    countryInfo.innerHTML = "";

    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");

  } else if (countries.length > 1 && countries.length <= 10) {

    countryInfo.innerHTML = "";

    const markup = countries
      .map((country) => {
        return `<li>
      <img class="flag" src="${country.flags.svg}" alt="The flag of ${country.name.common}">
      <span> ${country.name.official}</span>
      </li>`;
      })
      .join("");

    countryList.innerHTML = markup;

  } else if (countries.length === 1) {
    countryList.innerHTML = "";

    const countryInfoMarkup = countries.map((country) => {
      return `<img class="flag" src="${country.flags.svg}" alt="The flag of ${country.name.common}">
      <p> ${country.name.official}</p>
      <p> ${country.capital}</p>
      <p> ${country.population}</p>
      <p> ${country.languages}</p>`;
    });

    countryInfo.innerHTML = countryInfoMarkup;
  } else {
    countryList.innerHTML = "";
    countryInfo.innerHTML = "";
  };
}
