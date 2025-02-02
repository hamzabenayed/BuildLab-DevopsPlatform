//hooks
import React, { useEffect, useState } from "react";
import RowDetails from "../components/RowDetailsEvent";
import axios from "axios";
import Alert from "../components/Alert";
//import { DownloadCloud } from "react-feather";
import Roww from './row'

import { Edit, MoreVertical, Trash, ZapOff } from "react-feather";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Col,
  Input,
  Row,
  Form,
  Label,
  Button,
  Table,
  Badge,
} from "reactstrap";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";

import IconButton from "@mui/material/IconButton";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { Box, Paper, Select, Typography } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
import { Group } from "@material-ui/icons";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import Modal from "react-modal";
import InputGroup from "../components/InputGroupEvent";

Modal.setAppElement("#root");
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "1000px",
    height: "600px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",

  },
};
function Home() {
  // stat to manpulate all components in front
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  const [testeurCount, setTesteurCount] = useState(0);

  const [testeur, setTesteur] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useHistory();

  const [selectedRow, setSelectedRow] = useState(null);
  const [disableRow, setDisableRow] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpenedit, setModalIsOpenedit] = useState(false);
  const handleRowClick = (id) => {
      window.open(`http://localhost:3000/info/${id}`);
  };
  const [disabledRowId, setDisabledRowId] = useState(null);
  const [togglePopView, setTogglePopView] = useState(false);

  const handleDisableRow = () => {
    setDisableRow(true);
    setDisabledRowId(selectedRow);
  };





  const reload = () => {
    window.location.reload();
  };

  const initialPath = "http://localhost:3001/Release/lien/";

  const [formData, setFormData] = useState({
    Notes: "",
    Testeur: "",
    Version: "",
    Date: "",
    apkFile: null,
  });

  const [error, setError] = useState("");

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      apkFile: event.target.files[0],
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataF = new FormData();
    formDataF.append("Notes", formData.Notes);
    formDataF.append("Date", formData.Date);
    formDataF.append("Testeur", formData.Testeur);

    try {
      // Find the last released version of the note
      const lastRelease = await axios.get(
        `/api/release?Notes=${formData.Notes}&sort=-Version&limit=1`
      );

      // Get the last version number, or set it to 1.0 as a fallback
      let lastVersion = 1.0;
      if (lastRelease && lastRelease.data && lastRelease.data.length > 0) {
        lastVersion = lastRelease.data[0].Version;
      }

      // Increment the new version number by 0.1
      const newVersion = lastVersion + 0.1;
      formDataF.append("Version", newVersion);

      formDataF.append("apkFile", formData.apkFile);

      const response = await axios
        .post("/api/release", formDataF, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          //to refresh table after delete
          loadRelease();
        });

      setMessage(response.message);
      navigate.push("/Release");
    } catch (error) {
      setError(error.response.error);
      loadRelease();
    }
  };

  /* delete */
  const OnDelete = (id__) => {
    if (window.confirm("are you sure to delete this release")) {
      axios.delete(`/api/release/${id__}`).then((res) => {
        setMessage(res.data.message);
        setShow(true);
        //to refresh table after delete
        loadRelease();
        setTimeout(() => {
          // Alert or notification whene delete show in 0.4 second
          setShow(false);
        }, 4000);
      });
    }
  };
  const handleTesteurChange = (event) => {
    const { value } = event.target;
    console.log(event);
    setFormData({
      ...formData,
      Testeur: value,
    });
  };
  //when window show in first one
  useEffect(async () => {
    loadRelease();
    loadTesteur();
  }, []);
  useEffect(() => {
    setUserCount(users.length);
    setTesteurCount(
      users.reduce((count, user) => {
        if (user.Testeur) {
          return count + 1;
        }
        return count;
      }, 0)
    );
  }, [users]);
  const loadRelease = async () => {
    await axios.get("/api/release").then((res) => {
      // Loop over the releases and disable any rows with an error description
      const releases = res.data.map((release) => ({
        ...release,
        disabled: release.errordescription,
      }));
      setUsers(releases);
      console.log("arijjjjjjjj********", releases)

    });
  };

  const loadTesteur = async () => {
    try {
      const response = await axios.get("/api/releaseTesteur");
      const testeur = response.data;
      console.log("testeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeer", testeur)
      setTesteur(testeur);
      console.log("ttttttttt", testeur);
      return testeur;
    } catch (error) {
      console.log(error.message);
    }
  };


  // const loadTesteur = async () => {
  //   try {
  //     const response = await axios.get("/api/releaseTesteur");
  //     const releases = response.data;
  //     const testeur = releases.map(({ Testeur }) => ({
  //       userName: Testeur?.userName  ,
        
  //       // add any other fields you want to include
  //     }));
  //     setTesteur(testeur);
  //     console.log("Testeur list:", testeur);
  //     return testeur;
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };
  const TesteurCount = users.reduce((count, user) => {
    if (user.Testeur) {
      return count + 1;
    }
    return count;
  }, 0);

  const data = [
    { name: "User Count", count: userCount },
    { name: "Testeur Count", count: testeurCount },
  ];

  const colors = ["#8884d8", "#82ca9d"];
  const data2 = [
    { name: "User Count", value: userCount },
    { name: "Testeur Count", value: testeurCount },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };


//----------------------------------------------popUpView Functionality
const [newnote, setnewnote] = useState("")
const [newdate, setnewdate] = useState("")
const [newtester, setnewtester] = useState("")

const [formReleaseById, setFormReleaseById] = useState({
  Notes: "",
  Testeur: "",
  Version: "",
  Date: "",
});
// useEffect(async() => {

  
// })

const getReleaseById = async (_id) => {
  await axios.get(`/api/release/${_id}`).then((res) => {
  console.log(res.data, 'releaseeeeeeeeeeeeeeeeeeeeeeaaaaAAAAAAe123456')
  setFormReleaseById(res.data);

      
    console.log(formReleaseById, 'idformReleaseByIdformReleaseByIddddddddddddddddddd')
  });
} 


const onChangeNote = (e) => {
};
const [togglePopViewError, setTogglePopViewError] = useState(false);

const onEditFormmm = (_id) => {

  console.log("hello",_id)
  axios.put(`/api/release/release/${_id}`, 
  {
    "Date"
: 
newdate,
"Notes"
: 
newnote,
"Testeur"
: 
newtester,
Version
: 
1,
"apkFile"
: 
"app-debug.apk",
"createdAt"
: 
"2023-04-24T09:19:43.531Z",
"errordescription"
: 
"error",
"updatedAt"
: 
"2023-05-10T18:23:01.691Z",
"__v"
: 
0,
"_id"
: 
_id
  }
  )
    .then((res) => {
      //rederction
      loadRelease();
    })
    .catch((err) => setErrors(err.response.data));
};
  return (
    <div>
      {" "}
      <div style={{ float: "right", margin: "20px" }}>

      {togglePopView &&  <div style={{
        position: "fixed",
        top: 0, left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "yellow",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff10",
        backdropFilter: "blur(5px)",
        zIndex: "1000"
      }} 
      className="editPopUpContainer">
        <div style={{
          width: "60%",
          height: "70%",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 0 15px #888",
          padding: "40px 150px"
        }} className="inner">
          
          <div class="mb-3">
            <label for="" class="form-label">Note</label>
            <input type="text" 
          onChange={(e) => {
            console.log(newnote)
             setnewnote(e.target.value)}}
             defaultValue={formReleaseById.Notes} class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
            <small id="helpId" class="form-text text-muted">Help text</small>
          </div>

          <div class="mb-3">
            <label for="" class="form-label">Note</label>
            <input 
          type="date" defaultValue={formReleaseById.Date} 
          onChange={(e) => {
             setnewdate(e.target.value)
            console.log(newdate)
          }} class="form-control" name="" id="" aria-describedby="helpId" placeholder="" />
            <small id="helpId" class="form-text text-muted">Help text</small>
          </div>
          <div class="mb-3">
            <label for="" class="form-label">testeur</label>
            <select 
             onChange={(e) => {
              console.log(newtester)
               setnewtester(e.target.value)}}
          class="form-select form-select-lg" name="" id="">
              <option value="no tester">-----select tester-----</option>
            {testeur.map((t, index) => (
          <option key={index} value={t.user[0].userName}>
            {t.user[0].userName}
          </option>
        ))}
            </select>
          </div>
          <div class="row justify-content-center align-items-center g-2">
            <div class="col">

          <input name="" id="" class="btn btn-primary" type="button" value="Editer" onClick={() => {onEditFormmm(formReleaseById._id)}}/>
            </div>
            <div class="col">
          <input name="" id="" class="btn btn-danger" type="button" value="Annuler" onClick={() => {setTogglePopView(false)
          }}  />

            </div>
          </div>
        </div>
      </div>
}
        <button
          type="button"
          class="btn btn-primary rounded-pill"
          onClick={() => setModalIsOpen(true)}
          onRequestClose={() => setModalIsOpen(false)}
        >
          {" "}
          Add New Release
        </button>
      </div>
      <div className="row p-8" style={{ marginTop: -40, marginLeft: 30 }}>
        {/* alert show */}
        <Alert message={message} show={show} />
        <div className="mt-4">
          <h2> </h2>
          
        </div>

        <div className="mt-4">
          <h2> </h2>
          
        </div>

        <div className="col-12 col-lg-12">
        <Table className="table" style={{ border: "1px solid black", marginBottom: "50%" }}>
      <thead>
        <tr>
          <th scope="col">File</th>
          <th scope="col">Version</th>
          <th scope="col">Notes</th>
          <th scope="col">Date</th>
          <th scope="col">Testeur</th>
          <th
            scope="col"
            onClick={(e) => {
              // prevent row click handler from being called
              e.stopPropagation();
            }}
          >
            Actions
          </th>
        </tr>
      </thead>
      <tbody>

      {users.map(({ Notes, Testeur, Version, Date, Lien, _id }) => {
console.log("usersmappppp", Date)
        return (
          <Roww  Notes={Notes}
          togglePopView={togglePopView}
          handleRowClick={handleRowClick}
          Testeur={Testeur}
          Version={Version}
          dddate={Date}
          Lien={Lien}
          _id={_id}
          getReleaseById={getReleaseById}
          setTogglePopViewError={setTogglePopViewError}
          setTogglePopView={setTogglePopView}
          OnDelete={OnDelete}
          />
        )
      })}
       
      </tbody>
    </Table>
        </div>
      </div>
      <div>
        <Modal isOpen={modalIsOpen} style={customStyles}>
          <div>
            <div
              className="col-12 col-lg-8 "
              style={{ marginLeft: 140, justifyContent: "center" }}
            >
              <div>
                <h1>Add New Release</h1>
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Label htmlFor="Notes">Notes</Label>
                    <Input
                      type="text"
                      name="Notes"
                      value={formData.Notes}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <h5>Testeur</h5>

                    <select
        style={{ width: 180, height: 40, borderRadius: 20 }}
        value={formData.Testeur}
        onChange={handleTesteurChange}
      >
        <option value="">Select Testeur</option>

        {testeur.map((t, index) => (
          <option key={index} value={t.user[0].userName}>
            {t.user[0].userName}
          </option>
        ))}
      </select>
                  </div>
                  {/* <div>
              <Label htmlFor="Version">Version</Label>
              <Input
                type="text"
                name="Version"
                value={formData.Version}
                onChange={handleInputChange}
                required
              />
            </div> */}
                  <div>
                    <Label htmlFor="Date">Date</Label>
                    <Input
                      type="date"
                      name="Date"
                      value={formData.Date}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="apkFile">APK File</Label>
                    <Input
                      type="file"
                      name="apkFile"
                      onChange={handleFileChange}
                    />
                  </div>
                  <Button type="submit">Add Release</Button>{" "}
                  <button
                    onClick={() => setModalIsOpen(false) && reload()}
                    class="btn btn-primary"
                  >
                    close{" "}
                  </button>
                </Form>
              </div>
            </div>
          </div>
        </Modal>



       




      </div>
    </div>
  );
}

export default Home;
