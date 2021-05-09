import React from 'react';
import Card from "react-bootstrap/Card";
import '../App.css';

function DisplayUserNames(props){
    function handleClick(url){
        window.open(url,"_new");
    }
    let reqlist = props.userNameList.map((item)=> {
       return(
            <Card style={{ width: '10rem' }} onClick = {()=>handleClick(item.html_url)}>
                    <Card.Img variant="top" src= {item.avatar_url} />
                    <Card.Body>
                    <Card.Title>{item.login}</Card.Title>
                    <Card.Text>
                        Followers: {item.followers_count}
                    
                    </Card.Text>
                    </Card.Body>
             </Card>
        )
     });
    return(
        <>
        <h5 className = "spacingAround"> {props.totalCount}, User name result</h5>
        <div className = "userList">
            {reqlist}
        </div>
        </>
    )

}

export default DisplayUserNames;