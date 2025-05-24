const apiSettings = {
    baseUrl: "http://localhost:8080/api",
};

class StatisticServiceApi {
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


    getAllStatistic(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/statistic/all`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }
    getOrganizationStatistics(token, orgId, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/statistic/organization/${orgId}`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getUserOrganizations(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/user/organizations`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getMyOrganizationStatistics(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/statistic/organization`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }
}

export const statisticServiceApi = new StatisticServiceApi(apiSettings);