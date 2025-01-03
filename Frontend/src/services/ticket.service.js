import http from "../api/auth"

class TicketService{

    getAll(){
        return http.get('api/tickets');
    }

    get(id){
        return http.get(`/api/tickets/${id}`);
    }

    getLogTickets(){
        return http.get('api/tickets/log/tickets');
    }

    create(data){
        return http.post('/api/tickets', data);
    }

    update(data){
        return http.put(`/api/tickets/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/tickets/${id}`);
    }
}

export default new TicketService;