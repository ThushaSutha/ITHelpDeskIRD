import http from "../api/auth";

class ImagesService{

    getAll() {
        // const id = localStorage.getItem("Auth");
        return http.get(`/api/images`);
    }
   

    get(id){
        return http.get(`/api/images/${id}`);
    }

    create(data){
        return http.post('/images', data);
    }

    update(data){
        return http.put(`/api/images/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/images/${id}`);
    }
}

export default new ImagesService;