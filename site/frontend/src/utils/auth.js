const BASE_URL = "http://localhost:30080";

function checkResponse(res) {
    if (res.ok) {
        return res.json();
    } else {
        return Promise.reject(`Ошибка: ${res.status}/${res.statusText}`);
    }
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

export function registerOrganization(email, phone, inn, name, legal_address, actual_address, full_name_owner) {
    return fetch(`${BASE_URL}/register-organization`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, phone, inn, name, legal_address, actual_address, full_name_owner }),
    }).then((res) => checkResponse(res));
}

// Email    string `json:"email" binding:"required,email"`
// Password string `json:"password" binding:"required"`

export function authorizeUser(email, password) {
    return fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    })
        .then((res) => checkResponse(res))
        .then((data) => {
            if (data.token) {
                const token = data.token;
                localStorage.setItem("token", token);

                return token;
            }
        });
}
