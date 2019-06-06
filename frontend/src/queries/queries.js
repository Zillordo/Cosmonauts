

const getCosmonauts = async () => {

  const requestBody = {
    query: `
            query {
              cosmonauts {
                _id
                name
                surName
                age
                experience
              }
            }
          `
  }

  const res = await fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (res.status !== 200 && res.status !== 201) {
    throw new Error('res.status 200/201 "Faild"!');
  };

  const d = await res.json();


  return d.data.cosmonauts;
};

const getFlights = async () => {


  const requestBody = {
    query: `
          query {
            flights {
              _id
              date
              capacity
              registeredCosmonauts {
                _id
                name
                surName
                age
                experience
              }
            }
          }
        `
  };

  const res = await fetch('http://localhost:8000/graphql', {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (res.status !== 200 && res.status !== 201) {
    throw new Error('res.status 200/201 "Faild"!');
  };

  const d = await res.json();

  return d.data.flights;
}

export { getCosmonauts, getFlights };