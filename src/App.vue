<template>
  <div class="border-t-4 border-indigo-dark">
    <div class="container mt-8">
      <heading></heading>
      <div class="flex items-center justify-center w-full my-4">
        <flat-pickr 
          v-model="date"
          :config="flatPickrConfig"
          class="border-0 lg:border-2 lg:border-grey lg:border-r-0 rounded-l px-4 py-2"
          placeholder="Select a date to start"></flat-pickr>
        <button 
          class="border-1 bg-indigo-dark lg:border-2 border-indigo-dark text-white font-bold rounded-r px-4 py-2" 
          @click="update">Refresh Rates</button>
      </div>
      <div 
        v-if="!isLoading"
        id="chart" 
        class="h-128 w-full"></div>
      <div v-else>
        <p class="text-grey-darker text-sm text-center">Fetching Information…</p>
      </div>
    </div>
  </div>
</template>

<script>
import { apiKey, baseUrl, sampleCurrencies, baseCurrency, FixerApiConstraints } from "./assets/js/config.js";
import Heading from "./components/Heading.vue";
import * as moment from "moment-mini";
import axios from "axios";
import "flatpickr/dist/flatpickr.css";
import flatPickr from "vue-flatpickr-component";
import "../node_modules/c3/c3.min.css";
import c3 from "c3";

export default {
  components: {
    Heading,
    flatPickr,
  },
  data() {
    return {
      date: moment().format("YYYY-MM-DD"),
      flatPickrConfig: {
        altFormat: "F j, Y",
        altInput: true,
        dateFormat: "Y-m-d",
        defaultDate: "today",
        minDate: FixerApiConstraints.minDate,
        maxDate: FixerApiConstraints.maxDate,
      },
      currencies: "",
      valuesInMXN: "",
      isLoading: false,
    };
  },
  computed: {
    apiUrl() {
      return baseUrl + this.date + "?access_key=" + apiKey + "&symbols=" + sampleCurrencies.toString();
    },
  },
  mounted() {
    /**
     * Try to display current date results if they were previously requested.
     * Example: user opens the app, perform a today's request, closes the app 
     * and returns to it later on. So today results are displayed immediately.
     */
    this.loadFromLocalStorage();
  },
  methods: {
    /**
     * Updated method tries to get data from localStorage first. If there's no data,
     * it performs the API call and stores response if it was successful.
     */
    update() {
      this.isLoading = true;
      if (!this.loadFromLocalStorage()) {
        axios
          .get(this.apiUrl)
          .then(response => {
            if (response.status == 200 && response.data.success) {
              if (response.data.hasOwnProperty("rates")) {
                this.setLocalStorage(this.date, JSON.stringify(response.data.rates));
                this.convertValuesToMXN(response.data.rates);
                this.isLoading = false;
                this.renderChart();
              }
            }
          })
          .catch(error => {
            if (error.message) {
              alert("Cannot establish a proper connection with Fixer API");
            }
          });
      }
    },
    /**
     * Try to get results from localStorage if they were requested in the past.
     * This saves unnecessary API calls.
     */
    loadFromLocalStorage() {
      if (this.getLocalStorage(this.date)) {
        let chartData = JSON.parse(this.getLocalStorage(this.date));
        this.convertValuesToMXN(chartData);
        this.isLoading = false;
        this.renderChart();
      } else {
        return false; 
      }
    },
    /**
     * The default base currency is EUR. In order to use MXN as base,
     * a conversion as needed. This function prepares 2 arrays: one with the currencies to
     * compare against and the one with values. This prepares the data to be rendered in chart.
     */
    convertValuesToMXN(rates) {
      this.currencies = Object.keys(rates);
      let valuesInMXN = [];
      Object.values(rates).forEach((rate, index) => valuesInMXN[index] = rates.MXN / rate);
      valuesInMXN.unshift("Values in Mexican Peso");
      this.valuesInMXN = valuesInMXN;
      this.removeMXNFromResults();
    },
    /**
     * We don't want to display the MXN currency in the chart. So we remove it from the
     * currencies and valuesInMXN arrays.
     */
    removeMXNFromResults() {
      let indexOfMXN = this.currencies.indexOf(currency => currency == baseCurrency);
      this.currencies.splice(indexOfMXN, 1);
      this.valuesInMXN.splice(indexOfMXN, 1);
    },
    /**
     * Get a localStorage Item
     */
    getLocalStorage(key) {
      return window.localStorage.getItem(key);
    },
    /**
     * Set a localStorage Item
     */
    setLocalStorage(key, value) {
      window.localStorage.setItem(key, value);
    },
    /**
     * Render the chart using the valies in currencies and valuesInMXN arrays.
     */
    renderChart() {
      this.$nextTick(() => {
        c3.generate({
          data: {
            columns: [ this.valuesInMXN ]
          },
          axis: {
            x: {
              type: "category",
              categories: this.currencies,
              tick: {
                culling: {
                  max:1
                }
              }
            }
          }
        });
      });
    }
  },
};
</script>

<style src="./assets/css/app.css"></style>