const apiSettings = {
    baseUrl: "http://192.168.31.157:8080/api",
    baseUrlWithoutApi: "http://192.168.31.157:8080",
};

class UserServiceApi {
    constructor({ baseUrl, baseUrlWithoutApi }) {
        this._baseUrl = baseUrl;
        this._baseUrlWithoutApi = baseUrlWithoutApi;
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

    getOrganizationRequests(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/admin/organization/requests`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getMyOrganizationProfile(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/profile-organization`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getOrganizationProfileById(id) {
        return this._request(`${this._baseUrlWithoutApi}/profile-organization/${id}`, {
            method: "GET",
            headers: {
                "Authorization":  `Bearer ${localStorage.getItem("token")}`,
            }
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

    putChangePassword(token, old_password, password) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/change-password`, {
            method: "PUT",
            headers: this._headers,
            body: JSON.stringify({ old_password, password }),
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

    putEditVolonteer(token, formData) {
        this._updateToken(token);   
         
        const headers = {
            'Authorization': `Bearer ${token}`
        };
        
        return this._request(`${this._baseUrl}/profile`, {
            method: "PUT",
            headers,
            body: formData,
        });
    }

    putEditOrganization(token, formData) {
        this._updateToken(token);

        const headers = {
            'Authorization': `Bearer ${token}`
        };

        return this._request(`${this._baseUrl}/organization`, {
            method: "PUT",
            headers,
            body: formData,
        });
    }

    getUsersAndOrganizationsWithPagination(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/admin/users/${id}`, {
            method: "GET",
            headers: this._headers,
        });
    }

    putBlockUser(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/admin/block-user/${id}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    putUnblockUser(token, id) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/admin/unblock-user/${id}`, {
            method: "PUT",
            headers: this._headers,
        });
    }

    getUsersInOrganization(token, page) {
        if (page ===  undefined) {
            this._updateToken(token);
            return this._request(`${this._baseUrl}/organization/users`, {
                method: "GET",
                headers: this._headers,
            });
        } else {
            this._updateToken(token);
            return this._request(`${this._baseUrl}/organization/users/${page}`, {
                method: "GET",
                headers: this._headers,
            });
        }
    }

    postAttachUserToOrganization(token, organization_id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/attach-organization/${organization_id}`, {
            method: "POST",
            headers: this._headers,
        }, logout);
    }

    getRequestsToApply(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/requests`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    putAcceptUserAttachment(token, id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/requests/accept/${id}`, {
            method: "PUT",
            headers: this._headers,
        }, logout);
    }

    putRejectUserAttachment(token, id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/requests/reject/${id}`, {
            method: "PUT",
            headers: this._headers,
        }, logout);
    }

    putDetachUser(token, id, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/organization/detach/${id}`, {
            method: "PUT",
            headers: this._headers,
        }, logout);
    }

    getAcceptedOrganizations(token, page, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrlWithoutApi}/organization/accepted-list/${page}`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getAdminStatistics(token, logout) {
        this._updateToken(token);
        return this._request(`${this._baseUrl}/admin/statistic`, {
            method: "GET",
            headers: this._headers,
        }, logout);
    }

    getMyAvatar(token, logout) {
        this._updateToken(token);
        return fetch(`${this._baseUrlWithoutApi}/user/avatar`, {
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

    getAvatarByID(token, id, logout) {
        this._updateToken(token);
        return fetch(`${this._baseUrlWithoutApi}/user/avatar/${id}`, {
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

    getMyOrganizationAvatar(token, logout) {
        this._updateToken(token);
        return fetch(`${this._baseUrlWithoutApi}/organization/avatar`, {
            method: "GET",
            headers: this._headers,
        }).then(response => {
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

    getAvatarOrganizationByID(id, logout) {
        return fetch(`${this._baseUrlWithoutApi}/organization/avatar/${id}`, {
            method: "GET",
            headers: this._headers,
        }).then((res) => {
            if (res.status === 401) {
                logout?.();
            }
            if (res.ok) {
                return res.blob();
            } else {
                return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
            }
        });
    }
}

export const userServiceApi = new UserServiceApi(apiSettings);
