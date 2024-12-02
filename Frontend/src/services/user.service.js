import http from "../api/auth";

class UserService{

    getAll(page) {
        const id = localStorage.getItem("Auth");
        return http.get(`/api/users?page=${page}&size=10`,{
            headers: {
                'Authorization': `${id}`
            }
        });
    }
   

    get(id){
        return http.get(`/api/users/${id}`);
    }

    create(data){
        return http.post('/api/auth/signup', data);
    }

    update(data){
        return http.put(`/api/users/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/users/${id}`);
    }
}

export default new UserService;