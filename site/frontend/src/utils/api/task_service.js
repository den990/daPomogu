const apiSettings = {
    baseUrl: "https://task-service.dapomogu.tw1.su/api",
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

    getAllResponses(token, task_id, page = 1, limit = 100) {
        this._updateToken(token);
        const url = `${this._baseUrl}/responses/all/${page}/${limit}/${task_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    putConfirmResponse(token, response_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/confirm`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ response_id }),
        });
    }

    deleteResponse(token, task_id, user_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/delete`, {
            method: "DELETE",
            headers: this._headers,
            body: JSON.stringify({ task_id, user_id }),
        });
    }

    // http://localhost:8081/api/tasks/my-opened-tasks/1/100
    getMyOpenedTasks(token, page, limit = 5) {
        this._updateToken(token);
        const url = `${this._baseUrl}/tasks/my-opened-tasks/${page}/${limit}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    getMyClosedTasks(token, page, limit = 5) {
        this._updateToken(token);
        const url = `${this._baseUrl}/tasks/my-closed-tasks/${page}/${limit}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    getResponseById(token, response_id) {
        this._updateToken(token);
        const url = `${this._baseUrl}/responses/${response_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    getNotConfirmedResponses(token, task_id, page = 1, limit = 100) {
        this._updateToken(token);
        const url = `${this._baseUrl}/responses/notconfirmed/${page}/${limit}/${task_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    // TaskID uint           `json:"task_id"`
    // UserID uint           `json:"user_id"`
    // File   multipart.File `json:"FilePath"`

    postSendPhotoReport(token, task_id, user_id, image) {
        this._updateToken(token);
        const formData = new FormData();
        formData.append("image", image, "photo.png");
        formData.append("task_id", task_id);
        formData.append("user_id", user_id);

        return this._request(`${this._baseUrl}/approves/create`, {
            method: "POST",
            headers: {
                Authorization: this._headers.Authorization,
            },
            body: formData,
        });
    }

    getAllApproves(token, task_id, page = 1, limit = 100) {
        this._updateToken(token);
        const url = `${this._baseUrl}/approves/all-by-task-id/${task_id}/${page}/${limit}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    getApproveById(token, approve_id) {
        this._updateToken(token);
        const url = `${this._baseUrl}/approves/by-id/${approve_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        });
    }

    putConfirmApprove(token, approve_id, score, task_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/approves/confirm`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ id: approve_id, score: score, task_id: task_id }),
        });
    }

    putRejectApprove(token, approve_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/approves/reject`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ id: approve_id }),
        });
    }

    getImageForConfirmation(token, file_url) {
        this._updateToken(token);
        return fetch(`${this._baseUrl}/${file_url}`, {
            method: "GET",
            headers: this._headers,
        }).then((response) => {
            if (response.ok) {
                return response.blob();
            } else {
                return Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
            }
        });
    }

    putCompleteTask(token, task_id) {
        this._updateToken(token);
        return fetch(`${this._baseUrl}/tasks/complete/${task_id}`, {
            method: "PUT",
            headers: this._headers,
        });
    }
    
    deleteTask(token, task_id) {
        this._updateToken(token);
        return fetch(`${this._baseUrl}/tasks/${task_id}`, {
            method: "DELETE",
            headers: this._headers,
        });
    }
}

export const taskServiceApi = new TaskServiceApi(apiSettings);
