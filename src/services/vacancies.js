import api from "./api";

export default class VacanciesService {

    async getVacanciesAmountTecnology(props) {
        try {
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        // passar os dados da API 
                        // data: props.data
                        data: [
                            {
                                "x": "React",
                                "y": 100
                            },
                            {
                                "x": "Vue",
                                "y": 100
                            },
                            {
                                "x": "Angular",
                                "y": 100
                            },
                        ]
                    })
                }, 1000);
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    async getVacanciesAmountDayTecnology(props) {
        try {
            const response = await new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve({
                        // passar os dados da API 
                        // data: props.data
                        data: [
                            {
                                "name": "React",
                                "vagas": [
                                    {
                                        "x": 1, //dia do mes
                                        "y": 100 // quantidade de vagas nesse dia
                                    },
                                    {
                                        "x": 2, //dia do mes
                                        "y": 120 // quantidade de vagas nesse dia
                                    },
                                    {
                                        "x": 3, //dia do mes
                                        "y": 300 // quantidade de vagas nesse dia
                                    },
                                    {
                                        "x": 4, //dia do mes
                                        "y": 50 // quantidade de vagas nesse dia
                                    }
                                ]
                            },
                            {
                                "name": "React Native",
                                "vagas": [
                                    {
                                        "x": 1, //dia do mes
                                        "y": 66 // quantidade de vagas nesse dia
                                    },
                                    {
                                        "x": 2, //dia do mes
                                        "y": 50 // quantidade de vagas nesse dia
                                    },
                                    {
                                        "x": 3, //dia do mes
                                        "y": 23 // quantidade de vagas nesse dia
                                    },
                                    {
                                        "x": 4, //dia do mes
                                        "y": 10 // quantidade de vagas nesse dia
                                    }
                                ]
                            }
                        ]
                    })
                }, 1000);
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}