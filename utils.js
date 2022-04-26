const { default: axios } = require('axios');
var apiCall = async (url) => {
    try {
        return await axios.get(url);
    } catch (error) {
        console.log("Something went unexpected!");
        process.exit(0);
    }
}

module.exports = {
    apiCall,
};