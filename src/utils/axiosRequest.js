import axios from 'axios';
import { myInitObject } from './constants';


export const getAllPics = (page) => {
    page = page === undefined ? 1 : page
    let endpoint = `&method=flickr.photos.getRecent&api_key=d6d5c007466cdf789c5c26e7843e82b6&&page=${page}`
    return callApi(endpoint)
}

export const getSearchedPics = (text, page) => {
    page = page === undefined ? 1 : page
    let endpoint = `&method=flickr.photos.search&api_key=45c5cf2e84996118bb8e9e22feb18a0a&text=${text}&page=${page}`
    return callApi(endpoint)
}


/**
 * Generalised function to initiate asychronous request
 * @param {string} endpoint 
 * @param {Object} options Explains the type of axios request
 */
const callApi = async (endpoint, options = { method: 'GET' }) => {
    let url = `${myInitObject.ROOT_URL}${endpoint}`
    try {
        const response = await axios({
            url,
            ...options,
            headers: { 'Content-Type': 'application/json' }
        })

        const data = response.data

        if (data.stat === 'fail') {
            return {
                error: true,
                errors: data.error || 'Something went wrong'
            }
        }

        return {
            data: data.photos,
            error: false,
            errors: ''
        }
    } catch (err) {
        return {
            error: true,
            // errors: 'Looks like the server is taking to long to respond',
            errors: err.message
        }
    }
} 