import React from 'react';
import Media from "react-bootstrap/Media";
import axios from 'axios';

function DisplayUserNames(props){
    let reqlist = props.userNameList.map((item)=> {
    console.log("item here", item);
       return(
            <Media>
            <img
              width={64}
              height={64}
              className="align-self-start mr-3"
              src={item.avatar_url}
              alt="Generic placeholder"
            />
            <Media.Body>
                <h5>{item.login}</h5>
                <p>Following: {item.followers_url}</p>
            </Media.Body>
          </Media>
        
        )
     })
    return(
        <div>
            {reqlist}
        </div>
    )

}

export default DisplayUserNames;