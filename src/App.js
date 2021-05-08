import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import DisplayUserNames from './components/DisplayUserNames';
import PaginationComponent from './components/PaginationComponent';


const USER_PER_PAGE = 10;
class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      searchTerm : "",
      userNameList : [],
      totalCount : 0,
      activePage: 1
    }
  }

  handleInput = (e) => {
    this.setState({
      ...this.state,
      searchTerm: e.target.value
    })
  }
  handleSearch = async () => {

    if (this.state.searchTerm.trim().length == 0){
      return
    }
    let res = await axios.get(`https://api.github.com/search/users?q=${this.state.searchTerm}&per_page=${USER_PER_PAGE}&page=3`);
    this.setState({
      ...this.state,
      userNameList: res.data.items,
      totalCount: res.data.total_count
    })
  }

  handleActivePage = (arr) =>{
    let newActivePage = this.state.activePage;
    if (arr[0] || arr[2]) {
      newActivePage = arr[0] ? newActivePage - 1 : newActivePage + 1;
      if (newActivePage < 1 || newActivePage  > this.state.totalCount / 10 ) {
        return;
      }
    } else {
      newActivePage = arr[1];
    }
    
    this.setState({
      ...this.state, activePage: +newActivePage
    })
  }
  render(){
    return (
      <div className="App">
        <Form>
          <Form.Control
                type="text"
                placeholder="Search Github UserName"
                onChange = {this.handleInput}
                value = {this.state.searchTerm}
                required
              />
              <Button onClick = {this.handleSearch}>SEARCH </Button>
        </Form>
        <DisplayUserNames/>
        <PaginationComponent totalCount = {this.state.totalCount} activePage= {this.state.activePage} handleActivePage = {this.handleActivePage}/>
      </div>
    );
  }
}

export default App;
