import React from 'react';
import Pagination from "react-bootstrap/Pagination";
export default function PaginationComponent(props){

    let totalCount = props.totalCount;
    let activePage = props.activePage;
    
    const handleClick = (arr) => {
       props.handleActivePage(arr);
    }
    
    let reqComp = new Array(10).fill(1).map((item,i)=>{
        return( <Pagination.Item active = {activePage == i+1} key = {`${i}pg`} onClick = {(e)=>handleClick([0,e.target.innerText,0])}> {i+1} </Pagination.Item>)
    });
    
    return(
        <Pagination>
            <Pagination.Prev onClick = {()=>handleClick([1,0,0])}/>
                {reqComp}
            <Pagination.Ellipsis />
            <Pagination.Item>{totalCount}</Pagination.Item>
            <Pagination.Next onClick = {()=>handleClick([0,0,1])}/>
        </Pagination>
    )
}