import React from 'react';
import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap';

import classes from './AddInterview.module.css';

const AddInterview = (props) => {
    const navigate = useNavigate();

    const createButtonHandler = (e) => {
        e.preventDefault();
        navigate('/createInterview', { state: { data: {}, edit: false },  });
    }

    return (
        <React.Fragment>
            <Button className={classes.addInterviewButton} onClick={createButtonHandler}>Create Interview</Button>
        </React.Fragment>
    );
};

export default AddInterview;