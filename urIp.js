const urCity = document.querySelector('.ur-city');

function getUserCity() {
  return new Promise((resolve, reject) => {
    fetch('https://api.ipify.org?format=json')
      .then(res => res.json())
      .then(({ ip }) => {
        fetch(
          `https://suggestions.dadata.ru/suggestions/api/4_1/rs/iplocate/address?ip=${ip}&token=9ad0c7bcd92c1f2210a554cb4d61577a11dfd21b`
        )
          .then(res => res.json())
          .then(json => {
            if (
              {}.hasOwnProperty.call(json, 'family') &&
              json.family.toLowerCase().indexOf('err')
            ) {
              return reject(json);
            }
            const {
              location: {
                data: { city },
              },
            } = json;
            resolve({ city, ip });
          });
      });
  });
}

getUserCity()
  .then(({ city, ip }) => {
    console.log(city, ip);
    let loc = `<div class="urLocation card">Ваш город: ${city}</div>`;
    urCity.innerHTML= loc;
  })
  .catch(err => {
    console.log(err);
  });
