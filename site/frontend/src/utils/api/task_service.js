const apiSettings = {
    baseUrl: 'http://localhost:8081/api',
  };

class TaskServiceApi {
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

// {
// "name": "string",
// "task_type": 1,
// "description": "string",
// "location": "string",
// "task_date": "2025-03-15T00:00:00Z",
// "participants_count": 1,
// "max_score": null,
// "coordinate_ids" : [1, 2],
// "category_ids": [1]
// }

  postCreateTask(token, name, task_type, description, location, task_date, participants_count, max_score, coordinate_ids, category_ids) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/tasks/`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({ name, task_type, description, location, task_date, participants_count, max_score, coordinate_ids, category_ids })
    });
  }

  getCategoriesByName(token, name) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/category/search?name=${encodeURIComponent(name)}`, {
      method: 'GET',
      headers: this._headers
    });
  }

  getAllCategories(token) {
    this._updateToken(token);
    return this._request(`${this._baseUrl}/category/`, {
      method: 'GET',
      headers: this._headers
    });
  }
};

export const taskServiceApi = new TaskServiceApi(apiSettings);