const axios = require('axios');
const urlJoin = require('url-join');
const debug = require('debug')('recipes-books-service:accounts');

const ACCOUNTS_SERVICE = process.env.ACCOUNTS_SERVICE || 'http://localhost:3333';
const API_VERSION = 'api/v1';

const getRecipesBooksByAccount = async function(username) {
    try {
        const url = urlJoin(ACCOUNTS_SERVICE, API_VERSION, '/accounts', username);
        const response = await axios.get(url);
        debug(response);
        return response.data;
    }catch(error){
        console.error(error);
        return null;
    }
}

module.exports ={
    "getRecipesBooksByAccount": getRecipesBooksByAccount
}