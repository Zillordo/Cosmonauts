import { useState, useEffect } from 'react';



const GetData = (type) => {

    const [data, setData] = useState([]);

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
            // requestBody = '';
            break;
    };

    useEffect(() => {
        fetch('http://localhost:8000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(res => {
                if (res.status !== 200 && res.status !== 201) {
                    throw new Error('res.status == 200 || 201 "Faild!"');
                }
                return res.json();

            })
            .then(resData => {
                setData(resData.data);
            })
            .catch(err => console.log(err))
    }, []);

    return data;
};

export {
    GetData
};