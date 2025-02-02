import React,{useState} from 'react'
import Modal from 'react-modal';
import UpdateProjectForm from './UpdateProjectForm';
import DeleteContributorForm from './DeleteContributorForm';

Modal.setAppElement('#root')

export default function DeleteContributorModal(props) {
      const [modalIsOpen, setModalIsOpen] = useState(false)
      const { projectId } = props;  

    return(
        <>
        <button type="submit"  className="btn btn-primary   rounded-pill"  onClick={() => setModalIsOpen(true)} onRequestClose={() => setModalIsOpen(false)}> Delete Contributor</button>
      <div>
        <Modal isOpen={modalIsOpen} style={{ width: 500, height: 500 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={() => setModalIsOpen(false)} class="btn btn-primary"> X</button>

          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>

            <DeleteContributorForm projectId={projectId}/>
          </div>
        </Modal>
      </div>
        </>
    )
}