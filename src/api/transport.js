


/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
 export const GET_ALL_NAVIGATION = (callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/navigation")
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
 export const GET_ALL_METRO = (callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/lines/metro")
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}