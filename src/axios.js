import axios from 'axios'

// 'https://api.openbrewerydb.org/breweries?by_city=chicago'

const getBreweries = axios.create({
    baseURL: 'https://api.openbrewerydb.org/breweries'
})

export default getBreweries 