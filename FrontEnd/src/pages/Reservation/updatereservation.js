import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { fetchReservations, addReservation } from '../../redux/features/reservationSlice';

import '../Reservation/reservation.css'
import { Button } from "bootstrap";


function App() {

  // const [data, setData] = useState([]);
  const [ref, setRef] = useState('');
  const [nomClient, setNom] = useState('');
  const [Date, setDate] = useState('');

  const dispatch = useDispatch();



  const handleAddReservation = (event) => {
    event.preventDefault();
    const reservation = { ref, nomClient, Date }
    dispatch(addReservation(reservation));
  };



  return (
    <div className="container">
      <h1 className="managment">Reservation Management</h1>
      <div className="col-md-4">
        <div className="panel panel-primary">
          <div className="addnew"><span className="glyphicon glyphicon-user"></span> Modifier Reservation</div>
          <div className="panel-body">
            <form onSubmit={handleAddReservation}>
              <label>Reference  </label>
              <input type="text" name="ref" className="form-control" onChange={(e) => setRef(e.target.value)} />
              <br />
              <label>Nom de client </label>
              <input type="text" name="nom_client" className="form-control" onChange={(e) => setNom(e.target.value)} />
              <br />
              <label>Date de réservation  </label>
              <input type="Date" name="date" className="form-control" onChange={(e) => setDate(e.target.value)} />
              <br />
              <button type="submit" className="btn btn-primary btn-block" >Create Reservation</button>
            </form>
          </div>
        </div>
      </div>
    </div>



  );
}

export default App;
