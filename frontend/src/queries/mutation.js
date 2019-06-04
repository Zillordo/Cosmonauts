import { useEffect } from 'react';



const CreateFlight = (date, capacity, callBack) => {

    useEffect(() => {

        let requestBody = {
            query: `
            mutation {
                createFlight(flightInput: {date: "${date}", capacity: ${capacity}}) {
                  _id
                }
              }              
            `
        };


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

            await callBack();
            return await res.json();

        }

        get();
    }, []);
};

const CreateCosmonaut = (name, surName, age, exp, callBack) => {

    useEffect(() => {

        let requestBody = {
            query: `
            mutation {
                createCosmonaut(cosmonautInput: {name: "${name}", surName: "${surName}", age: ${age}, experience: "${exp}"}) {
                  _id
                }
              }
            `
        };


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

            await callBack();
            return await res.json();

        }

        get();
    }, []);
};

export { CreateCosmonaut, CreateFlight };