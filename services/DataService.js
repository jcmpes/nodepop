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
    },

    getToken: async function() {
        return localStorage.getItem('accessToken');
    },

    getUser: async function() {
        try {
            const accessToken = await this.getToken();
            const arr = accessToken.split('.');
            const payload = arr[1];
            const str = atob(payload);
            const json =  JSON.parse(str);
            const { userId, username } = json;
            return { userId, username }
        } catch (error) {
            return null;
        }
    },

    logout: async function() {
        try {
            localStorage.removeItem('accessToken');
            console.log('USER LOGGED OUT')
        } catch (err) {
            throw new Error('ERROR WHILE TRYING TO LOG OUT')
        }
    },

    uploadImage: async function(image) {
        const form = new FormData();
        form.append('file', image);
        const url = `${BASE_URL}/upload`;

        // Create the post request
        const config = {
            method: 'POST',
            headers: {},
            body: form
        };
        // Add accessToken to request
        const accessToken = await this.getToken();
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        };
        // Actually perform the request
        try {
            const response = await fetch(url, config);
            const data = await response.json()
            if(response.ok) {
                return data.path;
            } else {
                throw new Error(response.status, response.message)
            }
        } catch (error) {
            return error
        }
    },

    savePost: async function(postData) {
        const url = `${BASE_URL}/api/posts`;
        if(postData.image) {
            const imageURL = await this.uploadImage(postData.image);
            postData.image = imageURL;
            debugger;
            console.log(imageURL)
        }
        // Create the post request
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(postData)
        };
        // Add accessToken to request
        const accessToken = await this.getToken();
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        };
        // Actually perform the request
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            if(response.ok) {
                return data;
            } else {
                throw new Error(data.status, data.message)
            }
        } catch (error) {
            return error
        }
    },

    getAuthor: async function(userId) {
        const url = `${BASE_URL}/api/users/${userId}`
        try {
            const response = await fetch(url)
            const data = await response.json();
            return data['username']
        } catch (error) {
            return error
        }
        
    },

    deletePost: async function(id) {
        const url = `${BASE_URL}/api/posts/${id}`
        // Create the dlete request
        const config = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json' 
            },
        };
        // Add accessToken to request
        const accessToken = await this.getToken();
        if(accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`
        };
        // Actually perform the request
        try {
            const response = await fetch(url, config);
            const data = await response.json();
            if(response.ok) {
                return data;
            } else {
                throw new Error(data.status, data.message)
            }
        } catch (error) {
            return error
        }
    }



}