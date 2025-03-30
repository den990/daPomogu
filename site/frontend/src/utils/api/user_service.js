const apiSettings = {
    baseUrl: "http://localhost:30080/api",
    baseUrlWithoutApi: "http://localhost:30080",
};

class UserServiceApi {
    constructor({ baseUrl, baseUrlWithoutApi }) {
        this._baseUrl = baseUrl;
        this._baseUrlWithoutApi = baseUrlWithoutApi;
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

    getOrganizationRequests(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization-requests`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getMyOrganizationProfile(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/profile-organization`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getOrganizationProfileById(id) {
        return this._request(`${this._baseUrlWithoutApi}/profile-organization/${id}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getMyVolonteerProfile(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/profile`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getVolonteerProfileById(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/profile/${id}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    putChangePassword(token, old_password, new_password) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/change-password`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ old_password, new_password }),
        });
    }

    putApplyOrganization(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organizations/${id}/apply`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    putRejectOrganization(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organizations/${id}/reject`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    putEditVolonteer(token, name, surname, patronymic, date_of_birthday, registration_address, email, phone) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/profile`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ name, surname, patronymic, date_of_birthday, registration_address, email, phone }),
        });
    }

    getUsersAndOrganizationsWithPagination(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organizations-users-list/${id}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    putBlockUser(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/block-user/${id}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    putUnblockUser(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/unblock-user/${id}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    getUsersInOrganization(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/users`, {
            method: "GET",
            headers: this._headers,
        });
    }

    postAttachUserToOrganization(token, organization_id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/attach-organization/${organization_id}`, {
            method: "POST",
            headers: this._headers,
        });
    }

    getRequestsToApply(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/requests-to-apply`, {
            method: "GET",
            headers: this._headers,
        });
    }

    putAcceptUserAttachment(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/accept/${id}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    getAcceptedOrganizations(token, page) {
        this._updateToken(token);
        return this._request(`${this._baseUrlWithoutApi}/organizations-accepted-list/${page}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    getAdminStatistics(token) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/admin/statistic`, {
            method: "GET",
            headers: this._headers,
        });
    }
}

export const userServiceApi = new UserServiceApi(apiSettings);
