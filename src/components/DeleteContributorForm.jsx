import React, { useState } from 'react';

export default function DeleteContributorForm(props) {
  const [contributorEmail, setContributorEmail] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const { projectId } = props;
  const userId = localStorage.getItem("idfromtoken");


  const handleDeleteChange = async (event) => {
   const res = await fetch(`/DeleteContributor/${projectId}/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contributorEmail })
    }); 

    if ( res.status === 403){
      window.alert('Your not  a Maintainer in the project');

    } else if ( res.status === 404){
      window.alert('Contributor not found in the project');

    } else if ( res.status === 405){
      window.alert('Contributor not found ');

    }
   else if ( res.status === 200){
    window.alert('Contributor deleted from the project ');

  }

  };

  return (
    <div style={{ width: 500, height: 500, padding: 10 }}>
      <form style={{ border: "2px solid blue", padding: 30 }}>
        <div className="mb-3">
          <label htmlFor="appNameInput" className="form-label">Email</label>
          <input
            type="text"
            className="form-control"
            id="appNameInput"
            value={contributorEmail}
            onChange={(event) => setContributorEmail(event.target.value)}
          />
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', margin: 20 }}>
          <button
            type="submit"
            className="btn btn-primary w-30 rounded-pill"
            onClick={handleDeleteChange}
          >
            Delete
          </button>
          {showPopup && (
            <div className="popup">
              <h2>Request Complete!</h2>
              <p>Your request has been completed successfully.</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
