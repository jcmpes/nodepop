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
    }


}