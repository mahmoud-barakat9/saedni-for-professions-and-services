import react, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";
import fireDB from "../fireConfig";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { t } from "i18next";
import { useTranslation } from "react-i18next";
const Homepage = () => {
  const { t, i18n } = useTranslation();

  function clickLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  const [services, setServices] = useState([]);
  const { interestedItems } = useSelector((state) => state.interestedReducer);
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [filterType, setFilterType] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(fireDB, "products"));
      const servicesArray = [];
      users.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        const obj = { id: doc.id, ...doc.data() };
        servicesArray.push(obj);
        setLoading(false);
      });
      setServices(servicesArray);
      console.log(servicesArray);
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("interestedItems", JSON.stringify(interestedItems));
  }, [interestedItems]);
  const addToInterested = (service) => {
    dispatch({ type: "ADD_TO_INTERESTED", payload: service });
  };
  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="d-flex w-50 align-items-center my-3 justify-content-center">
          <input
            type="text"
            value={searchKey}
            onChange={(e) => {
              setSearchKey(e.target.value);
            }}
            className="form-control mx-2"
            placeholder="search services"
          ></input>
          <select
            name=""
            id=""
            className="form-control mt-2"
            value={filterType}
            onChange={(e) => {
              setFilterType(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="electrical">Electrical</option>
            <option value="car printer">car printer</option>
            <option value="carpenter">Carpenter</option>
            <option value="barber">Barber</option>
            <option value="plumber">Plumber</option>
            <option value="satellite">Satellite</option>
          </select>
        </div>
        <div className="row">
          {services
            .filter((obj) => obj.name.toLowerCase().includes(searchKey))
            .filter((obj) => obj.category.toLowerCase().includes(filterType))
            .map((service) => {
              return (
                <div className="col-md-4">
                  <div className="m-2 p-1 product position-relative">
                    <div className="product-content">
                      <p>{service.name}</p>
                      <div className="text-center">
                        <img
                          src={service.imageURL}
                          alt=""
                          className="product-img"
                        />
                      </div>
                    </div>
                    <div className="product-actions">
                      <h2>{service.price} SYP/hour</h2>
                      <div className="d-flex">
                        <button
                          className="mx-2"
                          onClick={() => addToInterested(service)}
                        >
                          {t("description.part4")}
                          {/*add to intereste  */}
                        </button>
                        <button
                          onClick={() => {
                            navigate(`/productinfo/${service.id}`);
                          }}
                        >
                          {t("description.part5")}
                          {/* VIEW */}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};
export default Homepage;
