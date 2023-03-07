import React, { useEffect, useState } from "react";
import '../Reservation/reservation.css'

import { useDispatch, useSelector } from "react-redux";
import { deleteReservation, getReservationList, updateReservation } from "../../redux/actionCreator";

const ReservationManagment = (props) => {

  const myReservations = useSelector((state) => state.newReducer.listReservation);

  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState({ id: '', ref: '', nomClient: '', Date: '' });
  const dispatch = useDispatch();

  const handleEditClick = (reservation) => {
    const { id, ref, nomClient, Date } = reservation
    setSelectedReservation({ id, ref, nomClient, Date: Date.date });
    console.log(reservation);
    setShowModal(true);
  };

  const handleUpReservation = () => {
    dispatch(updateReservation(selectedReservation));

  };

  const handleModalClose = () => {
    setSelectedReservation(null);
    setShowModal(false);
  };

  const [Search, setSearch] = useState('');
  const [reservData, setReservData] = useState([]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target
    setSelectedReservation({ ...selectedReservation, [name]: value })
  }

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(deleteReservation(id))
  };

  useEffect(() => {
    dispatch(getReservationList());
  }, [dispatch]);



  useEffect(() => {
    if (myReservations.data && myReservations.loaded) {
      setReservData(myReservations.data)
    }
  }, [myReservations]);




  return (
    <div className="container">
      <br /><br />
      <h1 className="text-center mb-5">Reservation Management</h1>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body reservation-table-container">
              <h5 className="card-title">Reservation Table</h5>
              <div className="input-group mb-3">
                <input type="text" className="form-control" onChange={(e) => handleChange(e)} placeholder="Search reservation..." />
              </div>
              <table className="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th>ref</th>
                    <th>nom_client</th>
                    <th>date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {myReservations.loaded && reservData.filter(el => el.nomClient.toLowerCase().includes(Search.toLowerCase())).map((reservation, index) => (
                    <tr key={index}>
                      <td>{reservation.ref}</td>
                      <td>{reservation.nomClient}</td>
                      <td>{reservation.Date.date.substring(0, 19)}</td>
                      <td>
                        <button className="btn btn-danger" onClick={e => handleDelete(e, reservation.id)}>Delete</button>
                        <button className="btn btn-primary" onClick={() => handleEditClick(reservation)}>Modifier</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal fade show" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header bg-secondary text-white">
                <h5 className="modal-title">Modifier la réservation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={handleModalClose}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {selectedReservation && (
                  <form>
                    <div className="form-group">
                      <label htmlFor="ref">Référence</label>
                      <input type="text" className="form-control" id="ref" defaultValue={selectedReservation.ref} name="ref" onChange={onChangeHandler} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="nomClient">Nom du client</label>
                      <input type="text" className="form-control" id="nomClient" defaultValue={selectedReservation.nomClient} name="nomClient" onChange={onChangeHandler} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="date">Date</label>
                      <input type="datetime-local" className="form-control" id="date" defaultValue={selectedReservation.Date.date} name="Date" onChange={onChangeHandler} />
                    </div>
                  </form>
                )}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={handleModalClose}>Fermer</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={() => { handleUpReservation(); handleModalClose(); }}>Enregistrer</button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ReservationManagment;
