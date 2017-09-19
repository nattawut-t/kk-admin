import axios from 'axios';

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

export function adminUrl(endpoint) {
  const { NODE_ENV } = process.env;

  switch (NODE_ENV) {
    case 'prod':
      return `https://api.moneytable.com${endpoint}`;

    default:
      return `http://dev-api.moneytable.com${endpoint}`;
  }
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

export function postJson(url, data, authenticate = true) {
  if (authenticate) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('token');
  }
  const options = {
    method: 'POST',
    url,
    headers: { 'Content-Type': 'application/json' },
    data,
  };

  return axios(options);
}

export function getJson(url, authenticate = true) {
  if (authenticate) {
    axios.defaults.headers.common.Authorization = localStorage.getItem('token');
  }
  const options = {
    method: 'GET',
    url,
    headers: { 'Content-Type': 'application/json' },
  };

  return axios(options);
}

export function postForm(url, data, authenticate = true) {
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

export function request(url, options = {}, authenticate = false) {
  console.log(url, 'url');
  const headers = options.headers || {};
  const defaultOption = {
    url,
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
  let _url = '';

  method = method || 'GET';
  data = data || {};

  switch (method.trim().toUpperCase()) {
    case 'POST':
      return axios.post(url, data, options);
    case 'PUT':
      return axios.put(url, data, options);
    default:
      _url = addQuery(url, params);
      return axios.get(_url, {}, mergedOption);
  }
}

export default {
  request,
  adminUrl,
};
