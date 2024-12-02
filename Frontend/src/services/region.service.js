import http from "../api/auth";

class RegionService{

    getAll() {
        // const id = localStorage.getItem("Auth");
        return http.get(`/api/regions`);
    }
   

    get(id){
        return http.get(`/api/regions/${id}`);
    }

    create(data){
        return http.post('/regions', data);
    }

    update(data){
        return http.put(`/api/regions/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/regions/${id}`);
    }
}

export default new RegionService;