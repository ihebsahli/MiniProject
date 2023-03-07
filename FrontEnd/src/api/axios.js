import axios from 'axios';

export default axios.create({
    baseURL: 'http://localhost:8000/api'
});

export const API_HOST = "http://localhost:8000"

export const API = {

    reservation: {

        listReservation: '/listReservation',
        deleteReservation: '/DeleteReservation',
        addReservation: '/addReservation',
        updateReservation: '/EditReservation',
        
    },

    user: {

        register: '/register',
        listUsers: '/listUsers',
        deleteUser: '/DeleteUser'

    }
}

