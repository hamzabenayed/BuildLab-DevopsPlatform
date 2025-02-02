import React, { useEffect, useState } from "react";
import RowDetails from "../components/RowDetailsEvent";
import axios from "axios";
import Alert from "../components/Alert";
//import { DownloadCloud } from "react-feather";

import { Edit, MoreVertical, Trash } from "react-feather";
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
import { Select } from "@mui/material";
import { Link, useHistory } from "react-router-dom";
function Home() {
  // stat to manpulate all components in front
  const [users, setUsers] = useState([]);
  const [testeur, setTesteur] = useState([]);
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useHistory();

  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (id) => {
    setSelectedRow(id);
    navigate.push(`/info/${id}`);
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
    console.log('errrrrrrrrrrrrrrrrrrrrrorr page')
    loadRelease();
    loadTesteur();
  }, []);

  const loadRelease = async () => {
    await axios.get("/api/release").then((res) => {
      setUsers(res.data);
    });
  };

  const loadTesteur = async () => {
    try {
      const response = await axios.get("/api/releaseTesteur");
      const testeur = response.data.map(({ user: { username } }) => ({
        username,
      }));
      setTesteur(testeur);
      console.log("ttttttttt", testeur);
      return testeur;
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="row p-4" >
      {/* alert show */}
      <Alert message={message} show={show} />
      <div className="mt-4">
        <h2> Release Mangement</h2>
      </div>

      <div className="col-12 col-lg-7" >
        <Table className="table"  >
          <thead>
            <tr>
              <th scope="col">Version</th>
              <th scope="col">ERROR</th>
              <th scope="col">Testeur</th>
              <th scope="col" onClick={(e) => {
          // prevent row click handler from being called
          e.stopPropagation();
        }}>Actions</th>
            </tr>
          </thead>
          <tbody>
          {users.map(({  Testeur,Version, errordescription, _id }) => {
     if  (errordescription != "error" && errordescription != "" && errordescription != " ")  {

        return(
          <tr
        key={_id}
        className={selectedRow === _id ? "selected" : ""}
      >
        
        <td onClick={() => handleRowClick(_id)}>
          <Badge color="danger">{Version}</Badge>
        </td>
        <td onClick={() => handleRowClick(_id)}>{errordescription}</td>
     
        <td onClick={() => handleRowClick(_id)}>{Testeur}</td>
        <td>
          <UncontrolledDropdown>
            <DropdownToggle
              className="icon-btn hide-arrow"
              color="transparent"
              size="sm"
              caret
            >
              <MoreVertical size={15} />
            </DropdownToggle>
            <DropdownMenu>
              <DropdownItem
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <Edit className="me-50" size={15} />
                <span className="align-middle">
                  <Link to={`/${_id}`} className="text-black">
                    Edit
                  </Link>
                </span>
              </DropdownItem>
              <DropdownItem
                href="/"
                onClick={(e) => e.preventDefault()}
              >
                <Trash className="me-50" size={15} />
                <span
                  className="align-middle"
                  onClick={() => OnDelete(_id)}
                >
                  Delete
                </span>
              </DropdownItem>
             
            </DropdownMenu>
          </UncontrolledDropdown>
        </td>
      </tr>
        )
     }
    })}
          </tbody>
        </Table>
      </div>

     

        
     
    </div>
  );
}

export default Home;