/**
 * Contains all the user's API calls
 */




export const ADD_ITINERAIRE_TRAJET = (itineraire_name, trajet_name, transport, lieu_depart, lieu_fin, callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/itineraire/trajet",{
        method : "post",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            itineraire_name: itineraire_name,
            trajet_name: trajet_name,
            transport : transport,
            lieu_depart: lieu_depart,
            lieu_fin: lieu_fin
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

/**
 * 
 * @param {*} callback 
 * @param {*} error 
 * @returns 
 */
 export const GET_ITINERAIRE_TRAJET = (itineraire_token, callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/trajet/"+itineraire_token)
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
 export const GET_USER_ITINERAIRE = (user_token, callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/itineraire/"+user_token)
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
 export const ADD_ITINERAIRE = (user_name, itineraire_name, date, heure_debut, heure_fin, callback, error) => {
    return fetch("http://192.168.1.25:8000/api/V1/ontology/itineraire",{
        method : "post",
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user_name: user_name,
            itineraire_name: itineraire_name,
            date: date,
            heure_debut: heure_debut,
            heure_fin: heure_fin
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

