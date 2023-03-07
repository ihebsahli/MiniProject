import axios, { API_HOST , API } from '../api/axios';
import {
    deleteReservationAction , getDemandHistoryAction , getReservationListAction,
    getHolidayRequestAction , addReservationAction , updateReservationAction , registerAction , getUsersListAction , deleteUserAction
} from './actions';
// import actionsAlert from "../alert/actions"
// const { alertSuccess, alertError } = actionsAlert;

/* get employee list  */
const getReservationList = () => {
    const URL = API_HOST + API.reservation.listReservation ;
    return async dispatch => {
        dispatch(getReservationListAction.request());
        axios.get(URL).then(
            (res) => {
               dispatch(getReservationListAction.success(res.data));
            },
            (err) => {
                dispatch(getReservationListAction.failure(err));
                console.log(err);
            }
        )
    };
};


const getUsersList = () => {
    const URL = API_HOST + API.user.listUsers ;
    return async dispatch => {
        dispatch(getUsersListAction.request());
        axios.get(URL).then(
            (res) => {
               dispatch(getUsersListAction.success(res.data));
            },
            (err) => {
                dispatch(getUsersListAction.failure(err));
                console.log(err);
            }
        )
    };
};


const getHolidayRequest = () => {
    const URL = API_HOST + API.user.waitHolidayAuth
    return async dispatch => {
        dispatch(getHolidayRequestAction.request())
        axios.get(URL).then(
            (res) => {
                let data = res.data.data.concat(res.data.auth).map((el, index) => {
                    return { ...el, ...{ key: index } }
                })
                dispatch(getHolidayRequestAction.success({ data: data, total_count: res.data.total_count }));
            },
            (err) => {
                dispatch(getHolidayRequestAction.failure(err))
                console.log(err);
            }
        )
    };
};
const getDemandHistory = () => {
    const URL = API_HOST + API.conge.acceptedRefused
    return async dispatch => {
        dispatch(getDemandHistoryAction.request())
        axios.get(URL).then(
            (res) => {
                let data = res.data.data.concat(res.data.auth).map((el, index) => {
                    return { ...el, ...{ key: index } }
                })
                dispatch(getDemandHistoryAction.success({ data: data, total_count: res.data.total_count }));
            },
            (err) => {
                dispatch(getDemandHistoryAction.failure(err))
                console.log(err);
            }
        )
    };
};

const updateReservation = (data) => {
    const {id} = data 

    const URL = API_HOST + API.reservation.updateReservation +'/'+ id;
    return async dispatch => {
        dispatch(updateReservationAction.request())
        axios.put(URL, data).then(
            (res) => {
                dispatch(updateReservationAction.success(true))
                dispatch(getReservationList())
                console.log(res)
                // dispatch(alertSuccess({ msg: 'Demande traitée avec succés', type: 'success' }));
            },
            (err) => {
                dispatch(updateReservationAction.failure(err))
                console.log(err);
                // dispatch(alertError({ msg: 'Echec de traitement de demande', type: 'error' }));
            }
        )
    }
}

// const updateAuthStatus = (id, veh) => {
//     const URL = API_HOST + API.authorisation.updateStatus + id;
//     return async dispatch => {
//         dispatch(updateDemandStatusAction.request())
//         axios.put(URL, veh).then(
//             (res) => {
//                 dispatch(updateDemandStatusAction.success(true))
//                 // dispatch(alertSuccess({ msg: 'Demande traitée avec succés', type: 'success' }));
//             },
//             (err) => {
//                 dispatch(updateDemandStatusAction.failure(err))
//                 console.log(err);
//                 // dispatch(alertError({ msg: 'Echec de traitement de demande', type: 'error' }));
//             }
//         )
//     }
// }

const addReservation = (ref, nomClient, Date) => {
    const data = {
        ref,
        nomClient,
        Date
    }
    const URL = API_HOST + API.reservation.addReservation;
    return async dispatch => {
        dispatch(addReservationAction.request())
        axios.post(URL, data).then(
            (res) => {
               dispatch(addReservationAction.success(res))
                // dispatch(alertSuccess({ msg: 'Employé ajouté avec succés', type: 'success' }));
                 
            },
            (err) => {
                dispatch(addReservationAction.failure(err))
                console.log(err);
                // dispatch(alertError({ msg: 'Echec d\'ajout d\'employé', type: 'error' }));
            }
        )
    }
}

const register = (email, roles, password) => {
    const data = {
        email,
        roles,
        password
    }
    const URL = API_HOST + API.user.register;
    return async dispatch => {
        dispatch(registerAction.request())
        axios.post(URL, data).then(
            (res) => {
               dispatch(registerAction.success(res))
                // dispatch(alertSuccess({ msg: 'Employé ajouté avec succés', type: 'success' }));
                 
            },
            (err) => {
                dispatch(registerAction.failure(err))
                console.log(err);
                // dispatch(alertError({ msg: 'Echec d\'ajout d\'employé', type: 'error' }));
            }
        )
    }
}
/* get employee detail */
// const getEmployee = (id) => {
//     const URL = API_HOST + API.user.user + id + '/';
//     return async dispatch => {
//         dispatch(getEmployeeAction.request())
//         axios.get(URL).then(
//             (res) => {
//                 res.data.key = res.data.id;
//                 dispatch(getEmployeeAction.success(res.data));
//             },
//             (err) => {
//                 dispatch(getEmployeeAction.failure(err))
//                 console.log(err);
//             }
//         )
//     };
// }
/* edit Profile */
// const editProfile = (id, data) => {
//     const URL = API_HOST + API.user.user + id + '/';
//     return async dispatch => {
//         dispatch(editEmployeeProfileAction.request())
//         axios.put(URL, data).then(
//             () => {
//                 dispatch(editEmployeeProfileAction.success(true))
//                 // dispatch(alertSuccess({ msg: 'Profil modifié avec succés', type: 'success' }));
//             },
//             (err) => {
//                 dispatch(editEmployeeProfileAction.failure(err))
//                 console.log(err);
//                 // dispatch(alertError({ msg: 'Echec de modifier le profil', type: 'error' }));
//             }
//         )
//     };
// };
/* edit editor */
const deleteReservation = (id) => {
    const URL = API_HOST + API.reservation.deleteReservation+ '/' + id  ;
    return async dispatch => {
        dispatch(deleteReservationAction.request())
        axios.delete(URL).then(
            (res) => {
                dispatch(deleteReservationAction.success(true))
                dispatch(getReservationList())
                // dispatch(alertSuccess({ msg: 'Employé supprimé avec succés', type: 'success' }));
                // setTimeout(() => {
                //     history.push('/listReservation')
                // }, 3000);
            },
            (err) => {
                deleteReservationAction.failure(err)
                console.log(err);
                // dispatch(alertError({ msg: 'Echec de supression d\'employé', type: 'error' }));
            }
        )
    };
};

const deleteUser = (id) => {
    const URL = API_HOST + API.user.deleteUser+ '/' + id  ;
    return async dispatch => {
        dispatch(deleteUserAction.request())
        axios.delete(URL).then(
            (res) => {
                dispatch(deleteUserAction.success(true))
                dispatch(getUsersList())
                // dispatch(alertSuccess({ msg: 'Employé supprimé avec succés', type: 'success' }));
                // setTimeout(() => {
                //     history.push('/listReservation')
                // }, 3000);
            },
            (err) => {
                deleteUserAction.failure(err)
                console.log(err);
                // dispatch(alertError({ msg: 'Echec de supression d\'employé', type: 'error' }));
            }
        )
    };
};

export {  updateReservation, getHolidayRequest, getDemandHistory, getReservationList, addReservation, deleteReservation, register , getUsersList ,deleteUser };
