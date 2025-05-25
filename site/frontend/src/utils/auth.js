import {useContext} from "react";
import {AuthContext} from "../context/AuthProvider";

const BASE_URL = "https://api.dapomogu.ru";
function checkResponse(res, logout) {
    return res.json().then(body => {
        if (body.success) {
            return body;
        }

        let message = 'Что-то пошло не так';

        if (body.error?.message) {
            if (body.error.status === 401) {
                logout?.()
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

// Email          string `json:"email" binding:"required,email"`
// Phone          string `json:"phone" binding:"required"`
// Name           string `json:"name"  binding:"required"`
// Surname        string `json:"surname"`
// Patronymic     string `json:"patronymic"`
// DateOfBirthday string `json:"date_of_birthday"`
// Address        string `json:"registration_address"`
// Password       string `json:"password" binding:"required"`

export function registerVolunteer(
    email,
    phone,
    name,
    surname,
    patronymic,
    date_of_birthday,
    registration_address,
    password
) {
    return fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            phone,
            name,
            surname,
            patronymic,
            date_of_birthday,
            registration_address,
            password,
        }),
    }).then((res) => checkResponse(res));
}

// type OrganizationRegistration struct {
// 	Email         string `json:"email" binding:"required,email"`
// 	Phone         string `json:"phone" binding:"required"`
// 	INN           string `json:"inn" binding:"required"`
// 	Name          string `json:"name" binding:"required"`
// 	LegalAddress  string `json:"legal_address" binding:"required"`
// 	ActualAddress string `json:"actual_address" binding:"required"`
// 	FullNameOwner string `json:"full_name_owner" binding:"required"`
// }

export function registerOrganization(email, phone, inn, name, legal_address, actual_address, full_name_owner, logout) {
    return fetch(`${BASE_URL}/register-organization`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, inn, name, legal_address, actual_address, full_name_owner }),
    }).then((res) => checkResponse(res, logout));
}

// Email    string `json:"email" binding:"required,email"`
// Password string `json:"password" binding:"required"`

export function authorizeUser(email, password, logout) {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res, logout))
        .then((data) => {
            if (data.token) {
                const token = data.token;
                localStorage.setItem("token", token);

                return token;
            }
        });
}
