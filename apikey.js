const API_KEY = 'Kishor@123'; 


const api_key = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (apiKey === API_KEY) {
        next();
    } else {
        res.status(403).json({ error: "Forbidden: Invalid API Key" });
    }
};

module.exports = api_key;
