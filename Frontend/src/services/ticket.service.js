import http from "../api/auth"

class TicketService{

    getAll(page,size){
        return http.get(`api/tickets?page=${page}&size=${size}`);
    }

    getUnassignedAll(page,size){
        return http.get(`api/tickets/unassigned/all?page=${page}&size=${size}`);
    }

    getAllWithoutPagination(){
        return http.get('api/tickets/all');
    }

    get(id){
        return http.get(`/api/tickets/${id}`);
    }

    getLogTickets(page){
        // return http.get('api/tickets/log/tickets');
        const id = localStorage.getItem("Auth");
        return http.get(`/api/tickets?page=${page}&size=10`,{
            headers: {
                'Authorization': `${id}`
            }
        });
    }

    create(data){
        return http.post('/api/tickets', data,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }
        );
    }

    update(data){
        return http.put(`/api/tickets/${data.id}`, data);
    }

    assignTicket(data){
        return http.put(`/api/tickets/assign/${data.id}`, data);
    }

    delete(id){
        return http.delete(`/api/tickets/${id}`);
    }
}

export default new TicketService;