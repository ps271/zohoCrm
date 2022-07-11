const express = require('express');

var axios = require('axios');

const qs = require('qs');

const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const allRecords = async (req, res) => {
    const BASE_URL = process.env.ZOHO_BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const url = BASE_URL + "/crm/v2/Leads";
    console.log(url)
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
            scope: `ZohoCRM.modules.Leads.READ`
        }
    };
    console.log(config.headers.Authorization)
    const records = axios
    .get(url, config)
    .then((response) => {
        // console.log('zoho_response',response.data)
        return res.json(response.data);
    })
    .catch((error) => {
        console.log('user error', error);
    });
};

const createRecord = async (req, res) => {
    const BASE_URL = process.env.ZOHO_BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const url = BASE_URL + "/crm/v2/Leads";
    console.log(url)
    const data = req.body;
    const config = {
        headers:{
            Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
            scope: `ZohoCRM.modules.Leads.CREATE`
        }
    };
    console.log(config.headers.Authorization)
    const response = axios
    .post(url, data, config)
    .then((response) => {
        return res.json(response.data);
    })
    .catch((error) => {
        console.log('user error', error);
    });
};

const updateRecord = async (req, res) => {
    const BASE_URL = process.env.ZOHO_BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const recordId = req.params.recordId;
    const data = req.body;
    const url = BASE_URL + "/crm/v2/Leads/" + recordId;
    console.log(url)
    const config = {
        headers:{
            Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
            scope: `ZohoCRM.modules.Leads.UPDATE`
        }
    };
    console.log(config.headers.Authorization)
    const response = axios
    .put(url, data, config)
    .then((response) => {
        return res.json(response.data);
    })
    .catch((error) => {
        console.log('user error', error);
    });
};

const getRelatedRecords = async (req, res) => {
    const BASE_URL = process.env.ZOHO_BASE_URL;
    const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
    const searchType = req.params.searchType;
    const search = req.params.search;
    const url = BASE_URL + "/crm/v2/Leads/search?" + searchType + "=" + search;
    console.log(url)
    const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Zoho-oauthtoken ${ACCESS_TOKEN}`,
            scope: `ZohoCRM.modules.Leads.READ`,
            scope: `ZohoSearch.securesearch.READ`
        }
    };
    console.log(config.headers.Authorization)
    const records = axios
    .get(url, config)
    .then((response) => {
        // console.log('zoho_response',response.data)
        return res.json(response.data);
    })
    .catch((error) => {
        console.log('user error', error);
    });
};

router.get('/get-records', allRecords);
router.post('/create-record', createRecord);
router.put('/update-record/:recordId', updateRecord);
router.get('/related-records/:searchType/:search', getRelatedRecords);

module.exports = router;