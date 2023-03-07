import React, { useEffect, useState } from "react";
import '../Reservation/reservation.css'

import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsersList } from "../../redux/actionCreator";

const ListUsers = () => {

    const usersState = useSelector((state) => state.newReducer.users);
    const dispatch = useDispatch();

  const [Search, setSearch] = useState('');
  const [reservData, setReservData] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteUser(id))
  };
//   const [showModal, setShowModal] = useState(false);
//   const [selectedReservation, setSelectedReservation] = useState({ id: '', ref: '', nomClient: '', Date: '' });

//   const handleEditClick = (reservation) => {
//     const {id , ref , nomClient , Date} =reservation
//     setSelectedReservation({id,ref,nomClient,Date: Date.date});
//     console.log(reservation);

//     setShowModal(true);
//   };

//   const handleUpReservation = () => {
//     dispatch(updateReservation(selectedReservation));

//   };

//   const handleModalClose = () => {
//     setSelectedReservation(null);
//     setShowModal(false);
//   };

  

//   const onChangeHandler = (event) => {
//     const { name, value } = event.target
//     setSelectedReservation({ ...selectedReservation, [name]: value })
//   }

  

  useEffect(() => {
    dispatch(getUsersList());
  }, [dispatch]);




  useEffect(() => {
    if (usersState.data && usersState.loaded) {
      setReservData(usersState.data)
    }
  }, [usersState]);

 


  return (
    <div className="container">
      <br /><br />
      <h1 className="text-center mb-5">Users Management</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body reservation-table-container">
              <h5 className="card-title">Users Table</h5>
              <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} placeholder="Search User..." />
              </div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {usersState?.loaded && reservData.filter(el => el.email.toLowerCase().includes(Search.toLowerCase())).map((user, index) => (
                    <tr key={index}>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button className="btn btn-danger" onClick={e => handleDelete(e, user.id)}>Delete</button>
                        {/* <button className="btn btn-primary" onClick={() => handleEditClick(reservation)}>Modifier</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}

export default ListUsers;



// import React, { useEffect, useState } from "react";
// import '../Reservation/reservation.css'
// import { useDispatch, useSelector } from "react-redux";


// function App() {
//   const [Search, setSearch] = useState('');

//   const handleChange = (e) => {
//     setSearch(e.target.value);
//   };


//   // const [data, setData] = useState([]);

//   const users = useSelector((state) => state.usersSlice);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     // dispatch(fetchUsers());
//   }, []);

//   console.log(users)


// //   const handleDelete = (e, id) => {
// //     e.preventDefault()
// //     dispatch(deleteReservation(id));
// //   };



//   return (
//     <div className="container">
//       <br /><br />
//       <h1 className="managment">User Management</h1>

//       <br></br>

//       <div className="tables">
//         <h3>Users Table</h3>
//         <br></br>
//         <div className="main-form">
//           <label htmlFor="main-search" />
//           <input className="searchbox input-text input-text--border-radius input-text--style-1" type="text" onChange={(e) => handleChange(e)} id="main-search" placeholder="Search User..." />
//         </div>
//         <br></br>
//         <br></br>
//         <table className="table table-bordered table-striped">
//           <thead>
//             <tr>
//               <th>email</th>
//               <th>roles</th>
             
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users?.filter(el => el?.name?.toLowerCase().includes(Search.toLowerCase())).map((user, index) => (
//               <tr key={index}>
//                 <td>{user.name}</td>
//                 <td>{user.description}</td>
//                 {/* <td> <button className="btn btn-danger" onClick={e => handleDelete(e, reservation.id)}>X</button>
//                 <button className="btn btn-success" onClick={e => handleDelete(e, reservation.id)}>M</button></td> */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// }

// export default App;
