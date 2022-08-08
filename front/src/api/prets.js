import axios from "axios";
import LecteurService from "./lecteurs";
import LivreService from "./livres";

const PRET_API_BASE_URL = "http://localhost:8888/api/v1/prets"

class PretService {
    async getPrets(){
        const response = await axios.get(PRET_API_BASE_URL);
        const data = await response.data;
        return data;
    }

    async createPret(pret){
        return axios.post(PRET_API_BASE_URL,pret, { headers: {'Content-Type':'application/json'}});
    }

    async deliverPret(id){
        const response = await axios.put(PRET_API_BASE_URL + '/' + id, {headers:{'Content-Type':"application/json",'Access-Control-Allow-Origin': '*'}});
        const data = await response.data;
        return data;
    }
    async getPretById(pretId){
        const response = await axios.get(PRET_API_BASE_URL + '/' + pretId);
        const data = await response.data;
        return data;
    }
     async getPretInformation(pretId){
         const response = await axios.get(PRET_API_BASE_URL + '/' + pretId);
         const pretData = await response.data;

         const lecteurData =  await LecteurService.getLecteurById(pretData.numeroLecteur)
         const livreData = await LivreService.getLivreById(pretData.numeroLivre)
         const data = {pretData,lecteurData,livreData};
         return data;
     }
}

export default new PretService()