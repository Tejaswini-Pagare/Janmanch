// src/components/GrievanceModal.js
import React from 'react';
import Modal from 'react-modal';

const GrievanceModal = ({ isOpen, onRequestClose, grievance }) => {
    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} ariaHideApp={false}>
            <h2>Grievance Details</h2>
            {grievance && (
                <>
                    <p><strong>Submission Type:</strong> {grievance.submissionType}</p>
                    <p><strong>Category:</strong> {grievance.category}</p>
                    <p><strong>Description:</strong> {grievance.description}</p>
                    <p><strong>Status:</strong> {grievance.status}</p>
                    <h3>Location</h3>
                    <iframe
                        src={`https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=${grievance.location.latitude},${grievance.location.longitude}&zoom=14`}
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                    ></iframe>
                </>
            )}
            <button onClick={onRequestClose}>Close</button>
        </Modal>
    );
};

export default GrievanceModal;