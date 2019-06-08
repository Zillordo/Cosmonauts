

const CreateFlight = async (date, capacity, cb) => {


    let requestBody = {
        query: `
            mutation {
                createFlight(flightInput: {date: "${date}", capacity: ${capacity}}) {
                  _id
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

    const data = await res.json();
    await cb();

    return data;
};

const RegisterCosmonaut = async (name, surName, age, exp, flightId, cb) => {

    let requestBody = {
        query: `
            mutation {
                registerCosmonaut(cosmonautInput: {name: "${name}", surName: "${surName}", age: ${age}, experience: "${exp}", flightId: "${flightId}"}) {
                  _id
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

    const data = await res.json();
    await cb();
    return data;
};


const DeleteCosmonaut = async (id, cb) => {

    let requestBody = {
        query: `
            mutation {
                deleteCosmonaut(cosmonautId: "${id}") {
                  _id
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

    const data = await res.json();
    await cb();
    return data;
};

const DeleteFlight = async (id, cb) => {

    let requestBody = {
        query: `
            mutation {
                deleteFlight(flightId: "${id}") {
                  _id
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

    const data = await res.json();
    await cb();

    return data;
};

const UpdateFlight = async (date, capacity, id, cb) => {
    let requestBody = {
        query: `
        mutation {
            updateFlight(flightInput: {date: "${date}", capacity: ${capacity}}, id: "${id}") {
              _id
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

    const data = await res.json();
    await cb();

    return data;
}

const UpdateCosmonaut = async (name, surName, age, exp, id, cb) => {

    let requestBody = {
        query: `
            mutation {
                updateCosmonaut(cosmonautInput: {name: "${name}", surName: "${surName}", age: ${age}, experience: "${exp}"}, id: ${id}) {
                  _id
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

    const data = await res.json();
    await cb();

    return data;
};


export { UpdateCosmonaut, UpdateFlight, RegisterCosmonaut, CreateFlight, DeleteCosmonaut, DeleteFlight };