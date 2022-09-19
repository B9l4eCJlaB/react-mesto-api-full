export const BASE_URL = 'http://localhost:3001';

export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password }),
    })
        .then(res => res.json())
}
export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    })
        .then(res => res.json())
            .then(data => {
                if(data.token) {
                    localStorage.setItem('jwt', data.token);
                    return data;
                }
            })
}
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
    })
        .then(res => {
            try {
                if(res.status === 200) {
                    return res.json();
                }
                if(res.status === 400) {
                    throw new Error('Токен не передан или передан не в том формате')
                }
                if(res.status === 401) {
                    throw new Error('Переданный токен некорректен')
                }
            }
            catch(error) {
                return error
            }
        })
}