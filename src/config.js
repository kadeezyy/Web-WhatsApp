export const api_host = 'https://api.green-api.com'
export const idInstance = localStorage.getItem('idInstance')
export const api_token = localStorage.getItem('api_token')

export const setIdInstance = (id) => {
    if (id === undefined || id === "") {
        throw new Error("Invalid id instance credentials")
    }
    idInstance = id
}

export const setApiToken = (token) => {
    if (token === undefined || token === "") {
        throw new Error("Invalid api token credentials")
    }
    api_token = token
}