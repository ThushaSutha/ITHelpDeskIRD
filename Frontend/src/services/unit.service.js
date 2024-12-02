import http from "../api/auth";

class UnitService{

    getAll() {
        // const id = localStorage.getItem("Auth");
        return http.get(`/api/units`);
    }
   

    get(id){
        return http.get(`/api/units/${id}`);
    }

    create(data){
        return http.post('/units', data);
    }

    update(data){
        return http.put(`/api/units/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/units/${id}`);
    }
}

export default new UnitService;