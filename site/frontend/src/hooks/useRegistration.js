import { useState } from 'react';

function useRegistration() {
    const [error, setError] = useState(null);

    const register = async (formData) => {
        setError(null);
        try {
            const response = await fetch("http://localhost:8080/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Ошибка регистрации!');
            }
            const result = await response.json();
            return result;
        } catch (err) {
            setError(err.message);
            return null;
        }
    };

    return { register, error };
}

export default useRegistration;
