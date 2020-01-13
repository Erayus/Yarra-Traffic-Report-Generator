import axios from 'axios';

const instance = axios.create({
   baseURL: "https://data.gov.au/data/api/3/action/datastore_search_sql?sql=SELECT%20*%20from%20%229e26683b-6b30-424e-ace7-59047d811d1c%22"
});

export default instance;