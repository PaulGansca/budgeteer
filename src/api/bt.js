import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const fetcher = axios.create({
    baseURL: "https://api.apistorebt.ro/bt/sb/bt-psd2-aisp/v2/",
    headers: {
        // authorization: 'REPLACE_THIS_VALUE',
        // 'psu-geo-location': 'REPLACE_THIS_VALUE',
        'psu-ip-address': '188.27.130.62',
        // 'consent-id': 'REPLACE_THIS_VALUE',
        'x-request-id': uuidv4(),
        accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

const registerBody = {
    "redirect_uris": ["https://body-sculpt-5ab47.web.app/login"],
    "company_name": "BodySculpt Corp",
    "client_name": "Budgeteer App Demo",
    "company_url": "https://body-sculpt-5ab47.web.app/login", "contact_person": "Contact TPP", "email_address": "contact.tpp@test.com", "phone_number": "+40700000000"
}
export const registerAsClient = () => {
    return axios.post(`https://api.apistorebt.ro/bt/sb/oauth/register/TppOauthBT`, registerBody,
        { headers: { accept: 'application/json', 'Content-Type': 'application/json' } }).then(res => {
            console.log(res.data);
        })
}

const consentBody = {
    "access": {
        "availableAccounts": "allAccounts"
    },
    "recurringIndicator": true,
    "validUntil": "2022-03-22",
    "combinedServiceIndicator": false,
    "frequencyPerDay": 4
}
export const giveConsent = () => {
    return fetcher.post(`consents`, consentBody).then(res => {
        console.log(res);
        console.log(res.data);
        return res.data;
    }).catch(e => console.error(e))
}

export const getAllTransactions = (accountId) => {
    return fetcher.get(`accounts/${accountId}/transactions`).then(res => {
        return res.data.results;
    });
};