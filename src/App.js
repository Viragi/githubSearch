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
      userNameList : []
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
      console.log("In if");
      return
    }
    console.log("here");
    let res = await axios.get(`https://api.github.com/search/users?q=${this.state.searchTerm}&per_page=${USER_PER_PAGE}&page=3`);
    console.log(res, "res here");
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
              <Button as="input"  value="Search" onClick = {this.handleSearch}/>
        </Form>
        <DisplayUserNames/>
        <PaginationComponent/>
      </div>
    );
  }
}

export default App;
