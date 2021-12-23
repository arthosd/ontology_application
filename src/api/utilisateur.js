/**
 * Contains all the user's API calls
 */

/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
export const GET_ALL_USER = (callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/users")
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}

/**
 * @param {*} user_name 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
export const ADD_USER = (user_name,callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/users/"+user_name,{
        method : 'POST'
    })
    .then((res) => res.json())
    .then((result) => {
        callback(result)
    })
    .catch((err) => {
        error (err)
    })
}