import { jwtDecode } from "jwt-decode";

function GetRole(token) {
    let role = null;

    if (token) {
        try {
            const decoded = jwtDecode(token);
            role = decoded.role;
        } catch (error) {
            console.error("Ошибка при декодировании токена:", error);
        }
    }

    return role;
}

export default GetRole;
