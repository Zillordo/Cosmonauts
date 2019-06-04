import { useState, useEffect } from 'react';



const GetData = (type) => {

  const [data, setData] = useState([]);

  useEffect(() => {

    let requestBody = "";

    switch (type) {
      case 'flights':
        requestBody = {
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

        break;
      case 'cosmonauts':
        requestBody = {
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
        break;

      default:
        requestBody = '';
        break;
    };

    let ignore = false;

    async function get() {
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

      if (!ignore) setData(d.data);
    }

    get();
    return () => { ignore = true; }
  }, [type]);

  return data;
};

export { GetData };