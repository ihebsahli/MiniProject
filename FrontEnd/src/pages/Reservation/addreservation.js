import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { addReservation } from "../../redux/actionCreator";
import "../Reservation/reservation.css";

function App() {
  const reservState = useSelector(state => state.newReducer.addReservation)
  const [ref, setRef] = useState("");
  const [nomClient, setNom] = useState("");
  const [Date, setDate] = useState("");
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (reservState.loaded && reservState.data?.data)
      navigate(`/reservation`);
  }, [reservState,navigate])

  const handleAddReservation = () => {
    const isValid = handleValidation();
    if (isValid) {
      dispatch(addReservation(ref, nomClient, Date));
      // redirect to the list of reservations page
    }
  };
  console.log(location)

  const handleValidation = () => {
    let isValid = true;
    if (ref.trim() === "") {
      isValid = false;
      alert("Reference field is required.");
    }
    if (nomClient.trim() === "") {
      isValid = false;
      alert("Nom de client field is required.");
    }
    return isValid;
  };

  return (
    <div className="container">
      <br />
      <h1 className="managment">Reservation Management</h1>
      <br />
      <div className="col-md-4">
        <div className="panel panel-primary">
          <div className="addnew">
            <span className="glyphicon glyphicon-user"></span> Add New Reservation
          </div>
          <div className="panel-body">
            <form>
              <label>Reference </label>
              <input
                type="text"
                name="ref"
                className="form-control"
                value={ref}
                onChange={(e) => setRef(e.target.value)}
              />
              <br />
              <label>Nom de client </label>
              <input
                type="text"
                name="nom_client"
                className="form-control"
                value={nomClient}
                onChange={(e) => setNom(e.target.value)}
              />
              <br />
              <label>Date de réservation </label>
              <input
                type="Date"
                name="date"
                className="form-control"
                value={Date}
                onChange={(e) => setDate(e.target.value)}
              />
              <br />
              <br />
              <button
                type="button"
                className="btn-hover color-4"
                onClick={handleAddReservation}
              >
                Create Reservation
              </button>
            </form>
            {reservState.error && <span>erreur d'ajout</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
