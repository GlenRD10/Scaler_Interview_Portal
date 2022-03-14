import React, {useState, useEffect} from "react";

import classes from './InterviewList.module.css';
import InterviewListCard from '../UI/InterviewListCard'

const InterviewList = () => {
    const [interviewList, setInterviewList] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("http://localhost:5000/api/v1/interview")
        .then(response => response.json())
        .then(data => {
            setInterviewList(data.interview)
            setLoading(false)
        })
    }, [])

    return (
        <div className={classes.container}>
            <h3 style={{color: "white"}}>Upcoming Interviews: </h3>
            {!loading && interviewList.map((value) => {
                console.log(value);
                return <InterviewListCard interviewList={value}/>
            })}
        </div>     
    );
};

export default InterviewList;