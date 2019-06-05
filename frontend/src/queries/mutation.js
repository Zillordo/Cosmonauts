import { useEffect } from 'react';



const CreateFlight = (date, capacity, cb) => {


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
        return await res.json();
    }
    get();
    cb();
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
    }, [name, surName, age, exp, callBack]);
};


const DeleteCosmonaut = (id) => {

    useEffect(() => {

        let requestBody = {
            query: `
            mutation {
                deleteCosmonaut(cosmonautId: "${id}") {
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

            return await res.json();
        }

        get();
    }, [id]);
};

const DeleteFlight = (id) => {

    useEffect(() => {

        let requestBody = {
            query: `
            mutation {
                deleteFlight(flightId: "${id}") {
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

            return await res.json();
        }

        get();
    }, [id]);
};


export { CreateCosmonaut, CreateFlight, DeleteCosmonaut, DeleteFlight };