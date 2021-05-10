import React from 'react';
import './App.css';
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import axios from 'axios';
import UserList from './components/UserList';
import PaginationComponent from './components/PaginationComponent';
import { Container, Row } from 'react-bootstrap';
import config from './config';

const USER_PER_PAGE = 10;
const INITIALSTATE = {searchTerm : "", 
                      userNameList : [],
                      totalCount : 0,
                      activePage: 1,
                      error: false
                     }

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = INITIALSTATE
  }
  handleInput = (e) => {
    this.setState({
      ...this.state,
      searchTerm: e.target.value
    })
  }

  queryGithub = async (searchTerm, activePage) => {
    console.log(searchTerm, activePage);
    try {
      let url = `https://api.github.com/search/users?q=${searchTerm}&per_page=${USER_PER_PAGE}&page=${activePage}`;
      let res = await axios.get(url,config);
      return res;
    }catch(e) {
      return null
    }
  }
  handleStateReset = () => {
    this.setState(INITIALSTATE)
  }

  handleSearch = async () => {
    if (this.state.searchTerm.trim().length == 0){
      this.setState({
        ...this.state,
        error:"Enter search term"
      });
      return
    }

    let res = await this.queryGithub(this.state.searchTerm, this.state.activePage);
    let items = res && res.data.items;
    if (!items  || items.length == 0) {
      this.setState({
        ...this.state,
        userNameList: [],
        totalCount: 0,
        error:"No results found."
      });
    } else {
      this.setState({
        ...this.state,
        userNameList: items,
        totalCount: res.data.total_count,
        error:null,
        activePage:1
      })  
    }

  }

  handleEnterKey = (event) => {
    if (event.charCode === 13) {
      this.handleSearch();
    }
  }

  handleActivePage = async (num) =>{
    let res = await this.queryGithub(this.state.searchTerm, num);
    res = res && res.data.items;
    let newError = false;
    if (res == undefined) {
      res = this.state.userNameList;
      newError = true
    }
    this.setState({
      ...this.state, activePage: +num, userNameList: res ,error:newError
    })
  }
  render(){
    return (
      <Container>
        <Row ><h4 className = "spacingAround"  onClick = {this.handleStateReset}> GitHub User Search</h4></Row>
        <Row>
          <InputGroup className= "mb-4 ml-4 mr-4">
            <FormControl
              placeholder="Github username"
              onChange = {this.handleInput} value = {this.state.searchTerm}
              onKeyPress={this.handleEnterKey}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick = {this.handleSearch}>Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Row>
        <Row>
          { this.state.error}
          { this.state.userNameList.length > 0 && (<div className = "displayList">
            <UserList userNameList = {this.state.userNameList} totalCount = {this.state.totalCount}/>
            <PaginationComponent totalCount = {this.state.totalCount} activePage= {this.state.activePage} handleActivePage = {this.handleActivePage}/>
          </div>) }
        </Row>
      </Container>
    );
  }
}

export default App;
