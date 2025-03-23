const apiSettings = {
    baseUrl: "http://localhost:8081/api",
};

class TaskServiceApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse);
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
        }
    }

    _updateToken(token) {
        this._headers = {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        };
    }

    postCreateTask(token, payload) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks/`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(payload),
        });
    }

    getCategoriesByName(token, name) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/category/search?name=${encodeURIComponent(name)}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getAllCategories(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/category/`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getAllTasks(token, page) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks/page/${page}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getTaskById(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks/${id}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    postCreateResponse(token, task_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/create`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ task_id }),
        });
    }

    getAllResponses(token, task_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/all`, {
            method: "GET",
            headers: this._headers,
        });
    }

    putConfirmResponse(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/confirm`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    deleteRejectResponse(token, task_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/delete`, {
            method: "DELETE",
            headers: this._headers,
            body: JSON.stringify({task_id}),
        });
    }
}

export const taskServiceApi = new TaskServiceApi(apiSettings);
