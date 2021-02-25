const BASE_URL = 'http://localhost:8000'

export default {

    getPosts: async function() {
        const url = `${BASE_URL}/api/posts`
        const response = await fetch(url);
        if(response.ok) {
            const data = await response.json();
            return data;
        // Throw error if data received is not status code 200 (OK)
        } else {
            throw new Error(response.status, 'ERROR CONSULTANDO A LA API DE ANUNCIOS')
        }
    },

    getSinglePost: async function(id) {
        const url = `${BASE_URL}/api/posts/${id}`
        const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                return data;
            } else {
                throw new Error('ERROR CONSULTANDO EL ANUNCIO EN LA API')
            }    
    },

    registerUser: async function(userData) {
        const url = `${BASE_URL}/auth/register`;
        const request = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }
        try {
            const response = await fetch(url, request);
            const data = await response.json();
            if (response.ok) {
                return data
            } else {
                throw new Error(data.status, data.message)
            }
        } catch (error) {
            throw new Error('ERROR WHILE REGISTERING THE USER')
        }
    },

    loginUser: async function(userData) {
        const url = `${BASE_URL}/auth/login`;
        const request = {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        try {
            const response = await fetch(url, request);
            const data = await response.json();
            if (response.ok) {
                return data;
            }
        } catch (error) {
            throw new Error('LOGIN ERROR')
        }
    },

    saveToken: async function(accessToken) {
        localStorage.setItem('accessToken', accessToken)
    }



}