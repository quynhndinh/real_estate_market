const axios = require("axios");

const options = {
  method: 'GET',
  url: 'https://zillow-com1.p.rapidapi.com/propertyExtendedSearch',
  params: {
    location: 'houston, tx',
    page: '20',
    status_type: 'RecentlySold',
    home_type: 'Houses',
    soldInLast: '30'
  },
  headers: {
    'X-RapidAPI-Key': '97dbf8c894msh84c2f3bed4f1e62p10524bjsn892d057ec31e',
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
        coordinates: coordinates
      });
    } else if (prop.zestimate) {
      housePrice = prop.zestimate;
      propertiesData.push({
        price: housePrice,
        coordinates: coordinates
      });
    }
  });
  console.log(propertiesData);
  // Send propertiesData array to the frontend
}).catch(function (error) {
  console.error(error);
});

