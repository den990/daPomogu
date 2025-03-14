const apiSettings = {
    baseUrl: 'http://localhost:8080/api',
  };

class UserServiceApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  };

  _request(url, options) {
    return fetch(url, options)
      .then(this._checkResponse);
  };

  _checkResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      return Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
    };
  };

  _updateToken(token) {
    this._headers = {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json'
    };
  }

  getOrganizationRequests(token) {
    this._updateToken(token);

    return this._request(`${this._baseUrl}/organization-requests`, {
      headers: this._headers
    });
  };

  getOrganizationProfileInfo(token, id) {
    this._updateToken(token);

    return this._request(`${this._baseUrl}/profile-organization/${id}`, {
      headers: this._headers
    });
  }
};

export const userServiceApi = new UserServiceApi(apiSettings);
