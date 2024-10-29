import React from 'react';
import '../Css/CommentModal.css';

const CommentModal = ({ modalOpen, setModalOpen, currentComments }) => {
    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        modalOpen && (
            <div className="darkBg" onClick={closeModal}>
                <div className="centered">
                    <div className="modal"> 
                        <div className="modalHeader">
                            <h5 className="heading">Comments</h5>
                        </div>
                        <div className="modalContent">
                        {currentComments.map((c) => (
                            <p key={c._id}><strong>{c.postedBy.name}:</strong> {c.comment} </p>
                    ))}
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    );
};

export default CommentModal;
