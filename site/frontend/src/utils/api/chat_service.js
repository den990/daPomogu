const apiSettings = {
    baseUrl: "http://192.168.31.157:8080/api",
};

class ChatServiceApi {
    constructor({baseUrl}) {
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

    postCreateChat(token, payload, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/chat`, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify(payload),
        }, logout);
    }

    getChats(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/chats`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getMessages(token, chatId, offset, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/chat/${chatId}/messages/${offset}`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }
}

export const chatServiceApi = new ChatServiceApi(apiSettings);