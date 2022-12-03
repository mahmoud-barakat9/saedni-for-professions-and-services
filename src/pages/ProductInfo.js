import react from "react";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useNavigate, useParams } from "react-router-dom";
import { FaImages, FaRegPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
const ProductInfo = () => {
  const [service, setService] = useState();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const params = useParams();

  const { t, i18n } = useTranslation();

  function clickLanguage(lang) {
    i18n.changeLanguage(lang);
  }
  const { interestedItems } = useSelector((state) => state.interestedReducer);
  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const serviceTemp = await getDoc(
        doc(fireDB, "products", params.serviceid)
      );
      const servicesArray = [];

      setService(serviceTemp.data());
      setLoading(false);
      console.log(servicesArray);
    } catch (error) {
      console.log("error");
      setLoading(false);
    }
  }
  const addToInterested = (service) => {
    dispatch({ type: "ADD_TO_INTERESTED", payload: service });
  };
  useEffect(() => {
    localStorage.setItem("interestedItems", JSON.stringify(interestedItems));
  }, [interestedItems]);
  return (
    <Layout loading={loading}>
      <h1>
        {/* Service Info */}
        {t("description.part9")}
      </h1>
      {service && (
        <div className="service-info">
          <p>
            <b>name: {service.name}</b>
          </p>
          <p>
            <b>category: {service.category}</b>
          </p>
          <img src={service.imageURL} alt="" className="product-info-img" />
          <hr />
          <p>{service.description}</p>
          <p>
            <b>{service.price} SYP/Hour</b>
          </p>
          <div className="d-flex justify-content-end mt-3">
            <button
              onClick={() => {
                navigate(`/serviceGallery/${service.name}`);
              }}
              hidden={true}
            >
              GALLERY SHOW
            </button>
            <button
              onClick={() => {
                navigate(`/imageSlider/${service.name}`);
              }}
              className="intereste-btn"
            >
              {/* GALLERY SHOW */}
              {t("description.part7")} <FaImages />
            </button>
            <button
              onClick={() => {
                navigate(`/chat/${service.name}`);
              }}
              className="intereste-btn"
            >
              {/* CHAT   */}
              {t("description.part8")} <FaRegPaperPlane />
            </button>
            <button
              className="intereste-btn"
              onClick={() => addToInterested(service)}
            >
              {/* ADD TO INTERESTE */}
              {t("description.part4")}
            </button>
          </div>
        </div>
      )}
    </Layout>
  );
};
export default ProductInfo;
