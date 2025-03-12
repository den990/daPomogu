async function RequestToServerWithAuth(url, method, token) {

    const response = await fetch(url, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return response;
}

export default RequestToServerWithAuth;