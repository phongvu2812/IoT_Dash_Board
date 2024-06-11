const axios = require("axios");

const apiUrl = "http://localhost:3001/api/data/latest"; // Replace with your actual API endpoint

axios
   .get(apiUrl)
   .then((response) => {
      const dataObject = response.data;

      // Get the attribute names from the object
      const attributeNames = Object.keys(dataObject);

      // Print the attribute names
      console.log("Attribute Names:", attributeNames);
   })
   .catch((error) => {
      console.error("Error fetching data:", error.message);
   });
