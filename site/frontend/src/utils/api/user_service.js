import { useAuthContext } from "../../context/AuthProvider";

const { token } = useAuthContext();
const apiSettings = {
    baseUrl: 'http://localhost:8080/api',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    }
  };

class UserServiceApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  };

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse);
  };

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
    };
  };

  getUserInfo() {
    return this._request(`${this._baseUrl}/`, {
      headers: this._headers
    });
  };
};

export const api = new Api(apiSettings);
  