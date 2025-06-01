const apiSettings = {
    baseUrl: "http://192.168.31.157:8080/api",
};

class TaskServiceApi {
    constructor({ baseUrl }) {
        this._baseUrl = baseUrl;
    }

    _request(url, options, logout) {
        return fetch(url, options).then(res => this._checkResponse(res, logout));
    }

    _checkResponse(res, logout) {
        return res.json().then(body => {
            if (body.success) {
                return body;
            }

            let message = 'Что-то пошло не так';

            if (body.error?.message) {
                if (body.error.status === 401) {
                    logout()?.()
                }
                if (typeof body.error.message === 'string') {
                    message = body.error.message;
                } else if (typeof body.error.message === 'object') {
                    message = Object.values(body.error.message).flat().join(', ');
                }
            }

            throw new Error(message);
        });
    }

    _updateToken(token) {
        this._headers = {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
        };
    }

    postCreateTask(token, payload, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(payload),
        }, logout);
    }

    putUpdateTask(token, payload, id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/task/${id}`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify(payload),
        }, logout);
    }

    getCategoriesByName(token, name, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/category/search?name=${encodeURIComponent(name)}`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getAllCategories(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/category`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getAllTasks(token, page, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks/${page}`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getTaskById(token, id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/task/${id}`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    postCreateResponse(token, task_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/create`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ task_id }),
        }, logout);
    }

    getAllResponses(token, task_id, page = 1, limit = 100, logout) {
        this._updateToken(token);
        const url = `${this._baseUrl}/responses/all/${page}/${limit}/${task_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    putConfirmResponse(token, response_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/confirm/${response_id}`, {
            method: "PUT",
            headers: this._headers,
        }, logout);
    }

    deleteResponse(token, task_id, user_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/responses/delete/${task_id}/${user_id}`, {
            method: "DELETE",
            headers: this._headers,
        }, logout);
    }

    // http://localhost:8081/api/tasks/my-opened-tasks/1/100
    getMyOpenedTasks(token, page, logout) {
        this._updateToken(token);
        const url = `${this._baseUrl}/tasks/my-opened-tasks/${page}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getMyClosedTasks(token, page, logout) {
        this._updateToken(token);
        const url = `${this._baseUrl}/tasks/my-closed-tasks/${page}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getResponseById(token, response_id, logout) {
        this._updateToken(token);
        const url = `${this._baseUrl}/responses/${response_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getNotConfirmedResponses(token, task_id, logout, page = 1, limit = 100) {
        this._updateToken(token);
        const url = `${this._baseUrl}/responses/notconfirmed/${page}/${task_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    // TaskID uint           `json:"task_id"`
    // UserID uint           `json:"user_id"`
    // File   multipart.File `json:"FilePath"`

    postSendPhotoReport(token, task_id, user_id, image, logout) {
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
        }, logout);
    }

    getAllApproves(token, task_id, page = 1, logout) {
        this._updateToken(token);
        const url = `${this._baseUrl}/approves/show/${task_id}/${page}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getApproveById(token, approve_id, logout) {
        this._updateToken(token);
        const url = `${this._baseUrl}/approves/show/${approve_id}`;
        return this._request(url, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    putConfirmApprove(token, approve_id, score, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/approves/confirm/${approve_id}`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({score: score}),
        }, logout);
    }

    putRejectApprove(token, approve_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/approves/reject`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ id: approve_id }),
        }, logout);
    }

    getImageForConfirmation(token, file_url, logout) {
        this._updateToken(token);
        return fetch(`${this._baseUrl}/${file_url}`, {
            method: "GET",
            headers: this._headers,
        }).then((response) => {
            if (response.status === 401) {
                logout?.();
            }
            if (response.ok) {
                return response.blob();
            } else {
                return Promise.reject(`Ошибка: ${response.status}/${response.statusText}`);
            }
        });
    }

    putCompleteTask(token, task_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks/complete/${task_id}`, {
            method: "PUT",
            headers: this._headers,
        }, logout);
    }

    deleteTask(token, task_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/tasks/${task_id}`, {
            method: "DELETE",
            headers: this._headers,
        }, logout);
    }
}

export const taskServiceApi = new TaskServiceApi(apiSettings);
