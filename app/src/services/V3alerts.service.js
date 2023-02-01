import config from "config";
import logger from "../logger";
import axios from "axios";
import client from "./redisClient.service";
const datasets = require("./datasets.service").default;

const formatDate = minDate => {
  let date = new Date();
  date.setDate(date.getDate() - minDate);
  return `${date.getFullYear()}-${("0" + (date.getMonth() + 1)).slice(-2)}-${("0" + date.getDate()).slice(-2)}`;
};

class V3AlertService {
  static async getAlerts(datasetArray, geostoreId, minDate) {
    const alertsArray = [];

    for await (const dataset of datasetArray) {
      logger.info(`Getting alerts for dataset ${dataset} and geostore ${geostoreId}`);

      // build url and query
      let apiConfig = datasets[dataset];
      if (!apiConfig) throw "Invalid dataset";
      const { dateKey, confidenceKey, tableName } = apiConfig.query;

      if (minDate && minDate > apiConfig.maxDate) minDate = apiConfig.maxDate;

      // make redis key string
      const keyString = geostoreId.toString() + dataset.toString() + minDate.toString();
      const cachedAlerts = await client.get(keyString);
      if (cachedAlerts) alertsArray.push(...JSON.parse(cachedAlerts));
      else {
        let url = `/dataset/${
          apiConfig.datastoreId
        }/latest/query/json?format=json&geostore_origin=rw&geostore_id=${geostoreId}&sql=select latitude, longitude, ${dateKey} as "date"${
          confidenceKey ? ", " + confidenceKey + ` as "confidence"` : ""
        } from ${tableName} where ${dateKey} > '${formatDate(minDate)}' ORDER BY ${dateKey} DESC LIMIT 5000`;

        try {
          const baseURL = config.get("alertsAPI.url");
          console.log(baseURL, url);
          const response = await axios.default({
            baseURL,
            url,
            method: "GET",
            headers: {
              "x-api-key": config.get("gfwApiKey.apiKey")
            }
          });

          const alerts = response.data;
          const alertsToSend = alerts.data.map(alert => {
            alert.alertType = dataset;
            return alert;
          });
          const midnight = new Date().setHours(23, 59, 59);
          const expire = Math.floor((midnight - Date.now()) / 1000);
          client.set(keyString, JSON.stringify(alertsToSend), "EX", expire); // set to expire at midnight
          alertsArray.push(...alertsToSend);
        } catch (e) {
          logger.error("Error while fetching alerts", e);
        }
      }
    }

    return alertsArray;
  }
}
module.exports = V3AlertService;
