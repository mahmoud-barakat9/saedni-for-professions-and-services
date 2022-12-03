import react, { useState } from "react";
import Layout from "../components/Layout";
import { useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { Modal } from "react-bootstrap";
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
const Cartpage = () => {
  const { interestedItems } = useSelector((state) => state.interestedReducer);
  const [totalAmount, setTotalAmount] = useState(0);
  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let temp = 0;
    interestedItems.forEach((interestedItem) => {
      temp = temp + Number(interestedItem.price);
    });
    setTotalAmount(temp);
  }, [interestedItems]);
  useEffect(() => {
    localStorage.setItem("interestedItems", JSON.stringify(interestedItems));
  }, [interestedItems]);
  const deleteFromInterested = (product) => {
    dispatch({ type: "DELETE_FROM_INTERESTED", payload: product });
  };

  const palceOrder = async () => {
    const addressInfo = { name, address, pinCode, phoneNumber };
    console.log(addressInfo);
    const orderInfo = {
      interestedItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };
    try {
      setLoading(true);
      const result = await addDoc(collection(fireDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("order palced successfully");
      handleClose();
    } catch (error) {
      setLoading(false);
      toast.error("order failed");
    }
  };

  return (
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {interestedItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} alt="" height="80" width="80" />
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                  <FaTrash onClick={() => deleteFromInterested(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        <h1 className="total-amount">Total Amount = {totalAmount} SYP</h1>
      </div>
      <div className="d-flex justify-content-end mt-3">
        <button onClick={handleShow}>PLACE ORDER</button>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add your Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="register-form">
            <h2>Register</h2>
            <hr />
            <input
              type="text"
              className="form-control"
              placeholder="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
            <textarea
              type="text"
              className="form-control"
              rows={3}
              placeholder="address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            ></textarea>
            <input
              type="number"
              className="form-control"
              placeholder="pincode"
              value={pinCode}
              onChange={(e) => {
                setPinCode(e.target.value);
              }}
            ></input>
            <PhoneInput
              className="form-control"
              placeholder="phone number"
              defaultCountry="SY"
              value={phoneNumber}
              onChange={setPhoneNumber}
              maxLength="11"
            ></PhoneInput>

            <hr />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>Close</button>
          <button onClick={palceOrder}>Order</button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};
export default Cartpage;
