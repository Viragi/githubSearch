import React from 'react';
import '../App.css';
import User from './User';

function UserList(props){
    let reqlist = props.userNameList.map((item,i)=> {
       return(
           <User userDetail = {item} key ={item.id} />
        )
     });

    return(
        <>
        <h5 className = "spacingAround"> {props.totalCount} UserName Result</h5>
        <div className = "userList">
            {reqlist}
        </div>
        </>
    )

}

export default UserList;