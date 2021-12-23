/**
 * Contains all the user's API calls
 */



/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
 export const GET_DESTINATION = (callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/destination")
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}

/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
 export const GET_CITIES = (callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/cities")
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}

/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
 export const GET_PLACES = (callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/cities/places")
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}


/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
 export const ADD_PLACES = (place_name, place_description, villeUri, callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/places/add",{
        method : "post",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            place_name: place_name,
            place_description: place_description,
            ville_uri : villeUri
          })

    })
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}




