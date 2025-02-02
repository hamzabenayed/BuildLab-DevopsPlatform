import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Link,
  Redirect,
  useHistory,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  Card,
  CardBody,
  CardText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import InputGroup from "../components/InputGroupEvent";
import S from "./ss.png";
import QR from "./QRCODE";
import { DollarSign, Heart, ShoppingCart } from "react-feather";

function Details() {
  const [testeur, setTesteur] = useState([]);

  const [form, setForm] = useState({});
  const { id } = useParams();
  const navigate = useHistory();
  const [errors, setErrors] = useState({});
  const [users, setUsers] = useState([]);

  const [centeredModal, setCenteredModal] = useState(false);

  useEffect(async () => {
    await axios.get(`/api/release/${id}`).then((res) => {
      setForm(res.data);
      console.log("zzzzzzzzzz", form);
    });
  }, []);

  return (
    <div style={{  marginTop: 100, marginBottom: 100, display: "flex", alignItems: "center", justifyContent:"center", flexDirection: "column" }}>
      <div
        style={{
          width: 1200,
          height: 500,
          marginBottom: 20,
          borderRadius: 10,
          boxShadow: "0 0  20px #888",
          display: "flex",
          flexDirection: "row",
          background: "#fff"
        }}
      >
        <div className="card-header"
          style={{
            width: "40%",
            height: "100%",
          backgroundColor: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"

          }}
        >
          <img style={{width: "60%", height: "60%", objectFit: "cover"}} src={require("./launch.png")} class="img-fluid rounded-top" alt=""/>
        </div>
        <div className="card-body" style={{
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          width: "60%"
        }}>
          <div className="invoice-preview-card">
            <div className="invoice-padding pb-0">
              {/* Header */}
              <div style={{
                background: "#ffffff00",

                }}>
                <div>
                  <div className="logo-wrapper">
                   
                    <div class=" g-2">
                      <div class="col">
                      <img style={{ width: 80, height: 80 }} src={require("./information.png")} alt="" />
                   
                      </div>
                      <div class="col">
                      <h3
                      className=" invoice-logo"
                      style={{ color: "#111", marginLeft: 100 }}
                    >
                      Release Info
                    </h3>
                      </div>
                    </div>

                    
                  </div>

                  <div class="row justify-content-center align-items-center g-2">
                      <div class="col">
                      <h4 className="invoice-date-title"
                      style={{ color: "#111"}}
                    
                    >Version Release :</h4>
                      </div>
                      <div class="col">
                      <h1 className="invoice-date-title" 
                      style={{ color: "#111"}}
                      >{form.Version}</h1>
                      </div>
                    </div>

                  <div class="row">
                  <div class="col-4 ">
                  <h3 style={{color: "#111"}}>
                    Notes:
                    
                  </h3>
                  </div>
                  <div style={{color: "#111"}} class="col-4      ">
                      <h3>{form.Notes} </h3>
                  </div>
                  </div>

                    
                  <div
                    className="invoice-date-wrapper"
                  >
                    
                    <p className="invoice-date"></p>
                  </div>
                  <div className="invoice-date-wrapper">
                    
                    <p className="invoice-date"></p>
                  </div>
                </div>
                <div
                 
                >
                  
                  <div class="row justify-content-center align-items-center g-2">
                    <div class="col">

                    <div
                    className="invoice-date-wrapper"
                    style={{width: 150 , color: "#111"}}
                  >
                    <h3 className="invoice-date-title"
                      style={{ color: "#111"}}
                      >Name file :</h3>
                    <p className="invoice-date"></p>
                  </div>
                    </div>
                    <div class="col">
                    <div className="invoice-date-wrapper">
                    <h5 className="invoice-date-title"
                      style={{ color: "#111"}}
                      >{form.apkFile}</h5>
                    <p className="invoice-date"></p>
                  </div>

                    </div>
                  </div>
                  
                </div>
                <div className="mt-md-0 mt-2">

                  <div class="row justify-content-center align-items-center g-2">
                    <div class="col">
                    <div className="invoice-date-wrapper">
                    <h3 className="invoice-date-title"
                      style={{ color: "#111"}}
                      >Date create:</h3>
                    <p className="invoice-date"></p>
                  </div>
                    </div>
                    <div class="col">
                    <h4
                    className="invoice-title"
                    style={{ marginRight: "50%", marginBottom: 0, width: 300 }}
                  >
                    <h3 style={{color:"#111"}} className="mb-25">{form.Date}</h3>{" "}
                    <span className="invoice-number"></span>
                  </h4>
                    </div>
                  </div>
                  
                  
                </div>
              </div>
              {/* /Header */}
            </div>
          </div>
        </div>
      </div>

      <div className="vertically-centered-modal">
        <Button
          color="primary"
          outline
          onClick={() => setCenteredModal(!centeredModal)}
        >
          Release Scan
        </Button>
        <Modal
          isOpen={centeredModal}
          toggle={() => setCenteredModal(!centeredModal)}
          className="modal-dialog-centered"
        >
          <ModalHeader toggle={() => setCenteredModal(!centeredModal)}>
          Release Scan
          </ModalHeader>
          <ModalBody>
            <QR />
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => setCenteredModal(!centeredModal)}
            >
              Accept
            </Button>
            <span className="align-middle">
                          <Link to={`/Android/${form._id}`} className="text-black">
                          http://localhost:3000/Android/{form.Notes}
                          </Link>
                        </span>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
}

export default Details;
