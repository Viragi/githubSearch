import {React,useState} from 'react';
import Pagination from "react-bootstrap/Pagination";

const USER_PER_PAGE = 20;
export default function PaginationComponent(props){
    const [startPageNo, setStartPageNo] = useState(1)
    let totalpages = Math.floor(1000/USER_PER_PAGE);
    let activePage = props.activePage;
    
    const handlePageNum  = (dir) =>{
        if (dir == 'left') {
            if (startPageNo == 1) return
            setStartPageNo(startPageNo-10)
        } else {
            if (startPageNo+10 > totalpages) return
            setStartPageNo(startPageNo + 10)
        }
    }
    const handleClick = (arr) => {
       props.handleActivePage(arr);
    }
    
    let reqComp = new Array(10).fill(1).map((item,i)=>{
        return( <Pagination.Item active = {activePage == i+1} key = {`${i}pg`} onClick = {(e)=>handleClick(e.target.innerText)}> {startPageNo+i} </Pagination.Item>)
    });
    
    return(
        <Pagination>
            <Pagination.First onClick = {()=>handlePageNum("left")}/>
                {reqComp}
            <Pagination.Last onClick = {()=>handlePageNum("right")}/>
        </Pagination>
    )
}