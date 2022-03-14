import React from "react";
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import TimePicker from '@mui/lab/TimePicker';

import Multiselect from 'multiselect-react-dropdown';
import moment from 'moment'
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

import classes from './CreateInterview.module.css';
import 'react-datepicker/dist/react-datepicker.css';


const CreateInterview = () => {
    const location = useLocation();
    let prefilledData = { data: location.state.data }

    const navigate = useNavigate();

    const [date, setDate] = useState(new Date(moment().toDate()));
    const [startTime, setStartTime] = useState(new Date(moment().toDate()));
    const [endTime, setEndTime] = useState(new Date(moment().toDate()));
    const [selectedInterviewers, setSelectedInterviewers] = useState();
    const [selectedParticipants, setSelectedParticipants] = useState();

    const [existingInterviewers, setExistingInterviewers] = useState([]);
    const [existingParticipants, setExistingParticipants] = useState([]);

    const [interviewerList, setInterviewerList] = useState([])
    const [participantList, setParticpantList] = useState([])
    const [loading, setLoading] = useState(true);

    const [btnMsg, setBtnMsg] = useState('Create');

    

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/interviewers")
        .then(response => response.json())
        .then(data => {
            setInterviewerList(data.interviewer)
            setLoading(false)
        })
        setDate(prefilledData.data.date);
        setStartTime(prefilledData.data.startTime);
        setEndTime(prefilledData.data.endTime);
        setExistingInterviewers(prefilledData.data.interviewers);
        setExistingParticipants(prefilledData.data.participants);
        if (location.state.edit) setBtnMsg('Edit');
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/participants")
        .then(response => response.json())
        .then(data => {
            setParticpantList(data.participant)
            setLoading(false)
        })
    }, [])

    const handleDateChange = (newValue) => {
        setDate(newValue);
    };

    const handleStartTimeChange = (newValue) => {
        setStartTime(newValue);
    };

    const handleEndTimeChange = (newValue) => {
        setEndTime(newValue);
    };

    const interviewerSelect = (selectedItem) => {
        delete selectedItem.interviews;
        setSelectedInterviewers(selectedItem);
        console.log(selectedInterviewers)
    }
    
    const interviewerRemove = (selectedItem) => {
        delete selectedItem.interviews;
        setSelectedInterviewers(selectedItem)
        console.log(selectedInterviewers)
    }

    const participantSelect = (selectedItem) => {
        delete selectedItem.interviews;
        setSelectedParticipants(selectedItem);
        console.log(selectedParticipants)
    }

    const participantRemove = (selectedItem) => {
        setSelectedParticipants(selectedParticipants.filter(item => item !== selectedItem))
        console.log(selectedParticipants)
    }

    const onFormSubmit = async (e) => {
        e.preventDefault();
        let data = JSON.stringify({
            date: date,
            startTime: startTime,
            endTime: endTime,
            interviewers: selectedInterviewers,
            participants: selectedParticipants
        });
        console.log(data);
        if (!location.state.edit) {
            const url = 'http://localhost:5000/api/v1/interview';
            try {
                const rawResponse = await fetch(url, {
                    method: 'POST',
                    headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                    },
                    body: data,
                    crossDomain: true
                });
                const content = await rawResponse.json();

                console.log(content);
            } catch (e) {
                console.log(e);
            } finally {
                navigate('/', { state: {} });
            }
        } else {
            const url = `http://localhost:5000/api/v1/interview/${prefilledData.data._id}`;
            console.log(url);
            try {
                const rawResponse = await fetch(url, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: data,
                    crossDomain: true
                });
                const content = await rawResponse.json();

                console.log(content);
            } catch (e) {
                console.log(e);
            } finally {
                navigate('/', { state: {} });
            }
        }
    };

    return (
        <div className={classes.container}>
            <div className={classes.heading}>
                <h2>Schedule an Interview</h2>
            </div>
            {!loading && <form onSubmit={ onFormSubmit }>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                        <DesktopDatePicker
                            label="Select Date"
                            inputFormat="MM/dd/yyyy"
                            minDate={moment().toDate()}
                            value={date}
                            onChange={handleDateChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="Start Time"
                            value={startTime}
                            minDate={moment().toDate()}
                            onChange={handleStartTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                        <TimePicker
                            label="End Time"
                            value={endTime}
                            minDate={moment().toDate()}
                            onChange={handleEndTimeChange}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </Stack>
                </LocalizationProvider>
                <div className={classes.dropdown}>
                    <h4>Choose Interviewers</h4>
                    <Multiselect
                        selectedValues={existingInterviewers}
                        options={interviewerList}
                        displayValue="name"
                        onSelect={interviewerSelect}
                        onRemove={interviewerRemove}
                    />
                    <br />
                    <h4>Choose Participants</h4>
                    <Multiselect
                        selectedValues={existingParticipants}   
                        options={participantList}
                        displayValue="name"
                        onSelect={participantSelect}
                        onRemove={participantRemove}
                    />
                </div>
                <button className={classes.button} type="submit">{btnMsg} Interview</button>

            </form>}
        </div>
    );
};

export default CreateInterview;