import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import NewProjectModal from './NewProjectModal';
import Afficheprojectmodel from './afficheprojectModel';
import ProjectDetails from './afficheprojectDetails';
import UpdateProjectModal from './UpdateProjectModal ';
import { useHistory } from 'react-router-dom';
import DeleteContributorModal from './DeleteContributorModel';


export default function ProjectsList() {
    // Fetch User projects
    const userId = localStorage.getItem("idfromtoken");
    const [data, setData] = useState([]);
    const [ids, setIds] = useState([]);
    const [showDetails, setShowDetails] = useState(false);
    const history = useHistory();
    const userRole = localStorage.getItem("role_user_connecté");

    // const handleDeleteChange = async (event3) => {
    //     //event3.preventDefault();
    //     const response7 = fetch(`/project/deleteProject/${handleRowClick()}`, {
    //         method: 'DELETE',
    //         headers: { 'Content-Type': 'application/json' },
    //     });
    // };
    function  handleDeleteChange(_id) {
        
        fetch(`http://localhost:9090/project/deleteProject/${_id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
        
    };

    const handleAddId = (id) => {
        setIds((prevIds) => [...prevIds, id]);

    };
    useEffect(() => {
        axios.get(`http://localhost:9090/project/myProjects/${userId}`)
          .then(res => {
            setData(res.data);
              console.log(res.data.projects)
          })
          .catch(err => {
            console.log(err);
          });
      }, []); 




    function handleRowClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        //history.push('/register')
        return (id)

    }
    function handleInviteClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        return (id, history.push('/invitation'))
    }

    function handleDashboardClick(id) {
        console.log(`Clicked on project ${id}`);
        localStorage.setItem('projectIdFromProjectLists', id);
        // Store the id in state or local storage
        return (id, history.push('/dashboard'))
    }


    function handleDetailsClose() {
        setShowDetails(false);
    }
    return (
        <div>


            <div style={{ width: '80%', margin: "8%" }}>
                <h1 style={{fontFamily:'-moz-initial'}}> Project List</h1>
                <NewProjectModal />

                <table className="table table-bordered" style={{ border: "1px solid black", marginBottom: "50%" }}>
                    <thead>
                        <tr>
                            <th scope="col">App Name</th>
                            <th scope="col">OS</th>
                            <th scope="col">Platform</th>
                            <th scope="col">Options</th>

                        </tr>
                    </thead>
                    <tbody>
                        
                        {data.map((item) => (
                            <tr key={item.id} >
                                <td>{item.name}</td>
                                <td>{item.opSystem}</td>
                                <td>{item.platform}</td>
                                <td>
                                    <button onClick={() => handleRowClick(item.projects.map(project => project._id))} style
                                        ={{ border: 'none', outline: 'none' }} class="btn btn-light w-30 rounded-pill"> <UpdateProjectModal />   </button>
                                    <button type="button" class="btn btn-danger  w-30 rounded-pill" onClick={() => {
                                        handleDeleteChange(item._id);
                                    }}>Delete</button>
                                    {/* <button type="button" class="btn btn-primary  w-30 rounded-pill" onClick={() => handleRowClick(item._id)} ><NavLink to="/invitation">Invite</NavLink></button> */}
                                    <button type="button" class="btn btn-primary  w-30 rounded-pill" onClick={() => handleInviteClick(item._id)}>Invite</button>
                                    <button type='button' class="btn btn-primary  w-30 rounded-pill" onClick={() => handleDashboardClick(item._id)}>Your space</button>
                                    {showDetails && <ProjectDetails itemId={handleRowClick(item._id)} onClose={handleDetailsClose} />}
                                    <Afficheprojectmodel itemId={handleRowClick(item._id)} />
                                    <DeleteContributorModal projectId={handleRowClick(item._id)} />

                                </td>
                            </tr>
                        ))}

                        


                    </tbody>

                </table>
            </div>
        </div>

    );



}