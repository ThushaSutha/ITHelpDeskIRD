import http from "../api/auth";

class UserService{

    getAll(page){
        return http.get(`/api/users?page=${page}&size=10&delay=1`);
    }

    get(id){
        return http.get(`/api/users/${id}`);
    }

    create(data){
        return http.post('/users', data);
    }

    update(data){
        return http.put(`/api/users/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/users/${id}`);
    }
}

export default new UserService;