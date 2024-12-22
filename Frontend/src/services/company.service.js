import http from "../api/auth";

class CompanyService{

    getAll() {
        return http.get(`/api/companies`);
    }
   

    get(id){
        return http.get(`/api/companies/${id}`);
    }

    create(data){
        return http.post('/companies', data);
    }

    update(data){
        return http.put(`/api/companies/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/companies/${id}`);
    }
}

export default new CompanyService;