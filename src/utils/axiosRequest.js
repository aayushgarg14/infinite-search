import axios from 'axios';
import { myInitObject } from './constants';


export const getAllPics = (page) => {
    page = page === undefined ? 1 : page
    let endpoint = `&method=flickr.photos.getRecent&page=${page}`
    return callApi(endpoint)
}


const callApi = async (endpoint, options = { method: 'GET' }) => {
    let url = `${myInitObject.ROOT_URL}${endpoint}`
    try {
        const response = await axios({
            url,
            ...options,
            headers: { 'Content-Type': 'application/json' }
        })

        let data = response.data

        console.log('Response', data, 'Endpoint', endpoint);
        

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