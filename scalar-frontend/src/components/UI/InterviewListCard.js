import {React, useState, useEffect } from "react";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import moment from 'moment';

import classes from './InterviewListCard.module.css';
import { useNavigate } from 'react-router-dom';

const InterviewListCard = (props) => {
    const [date, setDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')

    useEffect(() => {
        let tempDate = moment(props.interviewList.date).format("dddd, MMMM Do YYYY");
        setDate(tempDate);
        tempDate = moment(props.interviewList.startTime).format("h:mm a");
        setStartTime(tempDate);
        tempDate = moment(props.interviewList.endTime).format("h:mm a");
        setEndTime(tempDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const navigate = useNavigate();

    const editButtonHandler = (e) => {
        e.preventDefault();
        navigate('/createInterview', { state: { data: props.interviewList, edit: true} });
    }

    return (
        <div className={classes.card}>
            <Card sx={{ minWidth: 275 }}>
                <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    {date}
                    </Typography>
                    <Typography variant="h6" component="div">
                    <div className={classes.time}>
                        {startTime} to
                    </div>
                    </Typography>
                    <Typography variant="h6" component="div">
                    <div className={classes.time}>
                        {endTime}
                    </div>
                    </Typography>
                    <Typography variant="body2">
                    Interviewer(s): {props.interviewList.interviewers.map((value) => { return <b>{value.name} | </b>})}
                    </Typography>
                    <Typography variant="body2">
                    Participants(s): {props.interviewList.participants.map((value) => { return <b>{value.name} | </b>})}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={editButtonHandler}>Edit</Button>
                </CardActions>
            </Card>
        </div>
    );
};

export default InterviewListCard