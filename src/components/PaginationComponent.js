import React from 'react';
import Pagination from "react-bootstrap/Pagination";

const USER_PER_PAGE = 10;
export default function PaginationComponent(props){
    
    let totalpages = Math.ceil(props.totalCount/USER_PER_PAGE); 

    const handlePageDir  = (isLeft) =>{
        if (isLeft) {
            props.handleActivePage(props.activePage-1)
        } else {
            props.handleActivePage(props.activePage+1)
        }
    }
    const handleClick = (pageNo) => {
       props.handleActivePage(pageNo);
    }

    let paginationItems  = [];
    let startIndex = Math.max(1,props.activePage-5);
    let endIndex = Math.min(startIndex + 9, totalpages);
    for (let i = startIndex; i <= endIndex; i++) {
        paginationItems.push(<Pagination.Item active = {props.activePage == i} key = {`${i}pg`} onClick = {(e)=>handleClick(e.target.innerText)}> {i} </Pagination.Item>);
    }
    return(
        <div className = "center spacingAround">
            <Pagination>
                <Pagination.Prev className = {props.activePage == 1 ? "disabled" : ""}  onClick = {()=>handlePageDir(true)}/>
                    {paginationItems}
                <Pagination.Next className = {props.activePage == totalpages ? "disabled" : ""} onClick = {()=>handlePageDir(false)}/>
            </Pagination>
        </div>
    )
}