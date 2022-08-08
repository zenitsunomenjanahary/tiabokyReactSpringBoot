import axios from "axios"

const LIVRE_API_BASE_URL = "http://localhost:8888/api/v1/livres";

class LivreService {

    async getLivres(){
        const response = await  axios.get(LIVRE_API_BASE_URL);
        const data = await response.data;
        return data;
    }

    async createLivre(livre){
        return axios.post(LIVRE_API_BASE_URL, livre, {headers:{'Content-Type':"application/json"}});
    }

    async getLivreById(livreId){
        const response = await axios.get(LIVRE_API_BASE_URL + '/' + livreId);
        const data = await response.data;
        return data;
    }

    updateLivre(livre, livreId){
        return axios.put(`${LIVRE_API_BASE_URL}/${livreId}`, livre,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteLivre(livreId){
        return await axios.delete(LIVRE_API_BASE_URL + '/' + livreId);
    }
}

export default new LivreService()