import axios from 'axios';
import merge from 'lodash/merge';

const PortalApp = 'MTPortal';
// const PortalURL = 'http://dev-portal.moneytable.com';
// const PortalURL = 'http://localhost:3000';

function addQuery(url, params = {}) {
  let _url = url;

  if (params) {
    let query = '';

    Object.keys(params).map(key => {
      if (key && params[key]) {
        query += `&${key}=${params[key]}`;
      }
      return query;
    });

    _url = `${_url}?${query}`.replace('?&', '?');
  }

  return _url;
}

export function portalUrl(endpoint) {
  const { NODE_ENV } = process.env;

  switch (NODE_ENV) {
    case 'prod':
      return `https://portal.moneytable.com${endpoint}`;
    default:
      return `http://dev-portal.moneytable.com${endpoint}`;
  }
}

export function adminUrl(endpoint) {
  const { NODE_ENV } = process.env;

  switch (NODE_ENV) {
    case 'local':
      return `http://localhost:4001${endpoint}`;
    default:
      return `http://dev-api.moneytable.com${endpoint}`;
  }
}

export function UploadFile(url, data, authenticate = true) {
  if (authenticate) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('token');
  }
  return axios({
    method: 'POST',
    url,
    headers: { 'Content-Type': 'multipart/form-data' },
    data,
  });
}

export function APIRequest(baseURL, options = {}, authenticate = true) {
  const headers = options.headers || {};
  const defaultOption = {
    baseURL,
    headers: Object.assign(
      {},
      { 'Content-Type': 'application/json' },
      headers,
      // authorization,
    ),
  };

  const mergedOption = Object.assign({}, options, defaultOption);

  if (authenticate) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('token');
  }

  let { method, data } = mergedOption;
  const { params } = mergedOption;
  let url = '';

  method = method || 'GET';
  data = data || {};

  switch (method.trim().toUpperCase()) {
    case 'POST':
      return axios.post(baseURL, data, options);
    case 'PUT':
      return axios.put(baseURL, data, options);
    default:

      // !!! will be refactored
      if (params) {
        delete params.sortBy;
        delete params.orderBy;
      }
      // !!! will be refactored

      url = addQuery(baseURL, params);
      return axios.get(url, {}, mergedOption);
  }
}

export function APIPortalRequest(baseURL, options, authenticate = true) {
  const headers = options.headers ? options.headers : {};
  const authorization = authenticate
    ? { Authorization: `${localStorage.getItem('token')}` }
    : {};

  const defaultOption = {
    baseURL,
    headers: Object.assign(
      {},
      { 'Content-Type': 'application/json' },
      headers,
      authorization,
    ),
  };

  const mergedOption = Object.assign({}, options, defaultOption);

  return axios(mergedOption);
}

export function PortalAPI(options, authenticate) {
  const headers = Object.assign({}, options.headers, { App: PortalApp });
  const opts = Object.assign({}, options, { headers });
  const url = portalUrl('');

  return APIPortalRequest(url, opts, authenticate);
}

export function CRUDRequest(definition, options, authenticate) {
  let url = options.id ? `${definition.endpoint}/${options.id}` : definition.endpoint;

  switch (definition.app) {
    case 'portal':
      return PortalAPI(merge({ url }, options), authenticate);
    default:
      url = adminUrl(url);
      return APIRequest(url, options, authenticate);
  }
}

export default {
  APIRequest,
  PortalAPI,
};
