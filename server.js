import RapidAPI from "market\src\config.js"
const express = require('express');
const axios = require("axios");
const app = express();
const cors = require('cors');
app.use(cors());



app.post('/properties', (req, res) => {
  const options = {
    method: 'GET',
    url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
    params: {
      location: 'houston, tx',
      page: '20',
      status_type: 'RecentlySold',
      home_type: 'Houses',
      soldInLast: '7'
    },
    headers: {
      'X-RapidAPI-Key': RapidAPI,
      'X-RapidAPI-Host': 'zillow-com1.p.rapidapi.com'
    }
  };

  let propertiesData = [];

  axios.request(options).then(function (response) {
    response.data.props.forEach(prop => {
      const coordinates = {latitude: prop.latitude, longitude: prop.longitude};
      let housePrice;
      if(prop.price) {
        housePrice = prop.price;
        propertiesData.push({
          price: housePrice,
          coordinates: coordinates,
        });
      } else if (prop.zestimate) {
        housePrice = prop.zestimate;
        propertiesData.push({
          price: housePrice,
          coordinates: coordinates,
        });
      }
    });
    console.log(propertiesData);
    res.send(propertiesData);
  }).catch(function (error) {
    console.error(error);
    res.status(500).send('Error fetching properties data');
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});