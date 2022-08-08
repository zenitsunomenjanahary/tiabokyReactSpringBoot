import axios from "axios"

const LECTEUR_API_BASE_URL = "http://localhost:8888/api/v1/lecteurs";

class LecteurService {

    async getLecteurs(){
        const response = await  axios.get(LECTEUR_API_BASE_URL);
        const data = await response.data;
        return data;
    }

    async createLecteur(lecteur){
        return axios.post(LECTEUR_API_BASE_URL, lecteur, {headers:{'Content-Type':"application/json"}});
    }

    async getLecteurById(lecteurId){
        const response = await axios.get(LECTEUR_API_BASE_URL + '/' + lecteurId);
        const data = await response.data;
        return data;
    }

    updateLecteur(lecteur, lecteurId){
        return axios.put(`${LECTEUR_API_BASE_URL}/${lecteurId}`, lecteur,{headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
    }

    async deleteLecteur(lecteurId){
        return await axios.delete(LECTEUR_API_BASE_URL + '/' + lecteurId);
    }
}

export default new LecteurService()