import React, {useEffect, useState} from 'react'
import { Edit, MoreVertical, Trash, ZapOff } from "react-feather";
import FolderCopyIcon from "@mui/icons-material/FolderCopy";
import { Link, useHistory } from "react-router-dom";

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




export default function Roww({_id,handleRowClick, dddate,  Notes, Testeur,Version, togglePopView,  setTogglePopViewError, getReleaseById, setTogglePopView, OnDelete}) {
  
  const [ disable, setDisable ] = useState(false) 
  useEffect(() => {
    console.log("notessssssssssssssssss date", Notes, dddate)
  })
  
    return (  
      
    <tr style={{ background: disable ? "#B0475930" : "#ffffff00",
    pointerEvents: disable ? "none" : "all"  }}>
                <td >
                  <FolderCopyIcon style={{ color: "yellow" }} />
                </td>
                <td >
                  <Badge color="danger" onClick={() => handleRowClick(_id) } >{Version}</Badge>
                </td>
                <td onClick={() => handleRowClick(_id) } >{Notes}</td>
                <td onClick={() => handleRowClick(_id) } >{dddate}</td>
                <td onClick={() => handleRowClick(_id) } >{Testeur}</td>
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
                      <DropdownItem href="/" onClick={(e) => {e.preventDefault()
                      
                      getReleaseById(_id);
                      getReleaseById(_id)
    
                      setTogglePopView(true) 
                      console.log(togglePopView)
                      }}>
                        <Edit className="me-50" size={15} />
                        <span  className="align-middle">
                          {/* <Link to={`/release/${_id}`} className="text-black"> */}
                            Edit
                          {/* </Link> */}
                        </span>
                      </DropdownItem>
                      <DropdownItem href="/" onClick={(e) => e.preventDefault()}>
                        <Trash className="me-50" size={15} />
                        <span
                          className="align-middle"
                          onClick={() => OnDelete(_id)}
                        >
                          Delete
                        </span>
                      </DropdownItem>
                      <DropdownItem onClick={() => {setDisable(true)} }>
                        <ZapOff className="me-50" size={15} />
                        <span
                          className="align-middle"
                         
                        >
                          Disable
                        </span>
                      </DropdownItem>
    
                      <DropdownItem onClick={() => { 
                      getReleaseById(_id);
                      setTogglePopViewError(true)}}>
                        <Edit   className="me-50" size={15} />
                        <span className="align-middle">
                          <Link onClick={() => {window.open("http://localhost:3000/releaseER/" + _id)}} className="text-black">
                            Error Discription
                          </Link>
                        </span>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </td>
              </tr>   )
}
