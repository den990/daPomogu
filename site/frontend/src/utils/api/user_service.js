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
      method: 'GET',
      headers: this._headers
    });
  };

  getMyOrganizationProfile(token) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/profile-organization`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getOrganizationProfileById(token, id) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/profile-organization/${id}`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getMyVolonteerProfile(token) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/profile`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getVolonteerProfileById(token, id) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/profile/${id}`, {
      method: 'GET',
      headers: this._headers
    });
  }

  putChangePassword(token, old_password, new_password) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/change-password`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({ old_password, new_password })
    });
  }

  // protected.PUT("/organizations/:id/apply", controllers.ApplyOrganization)               // принять регистрацию организации
	// protected.PUT("/organizations/:id/reject", controllers.RejectOrganization)             // отказать регистрацию организации

  putApplyOrganization(token, id) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/organizations/${id}/apply`, {
        method: 'PUT',
        headers: this._headers,
    });
  }

  putRejectOrganization(token, id) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/organizations/${id}/reject`, {
        method: 'PUT',
        headers: this._headers,
    });
  }

  putEditVolonteer(token, name, surname, patronymic, date_of_birthday, registration_address, email, phone) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/profile`, {
        method: 'PUT',
        headers: this._headers,
        body: JSON.stringify({ name, surname, patronymic, date_of_birthday, registration_address, email, phone })
    });
  }
};

export const userServiceApi = new UserServiceApi(apiSettings);