import http from "../api/auth";


class deviceservice{

    getAll() {
        return http.get(`/api/assets`);
    }
   
    get(id){
        return http.get(`/api/assets/${id}`);
    }

    create(data){
        return http.post('/assets', data);
    }

    update(data){
        return http.put(`/api/assets/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/assets/${id}`);
    }
}

export default new deviceservice;