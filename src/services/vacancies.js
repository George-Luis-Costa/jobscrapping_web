import api from "./api";

export default class VacanciesService {

    async getVacanciesAmountTecnology() {
        try {
           const response = await api.get("/api/info")
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getVacanciesAmountDayTecnology(type) {
        try {
            const response = await api.get(`/api/info/tech/{type}?tech_type=${type}`)
             return response.data;
         } catch (error) {
             throw error;
         }
    }
}