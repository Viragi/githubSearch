import React from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import DisplayUserNames from './components/DisplayUserNames';

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
              <Button as="input" type="submit" value="Submit" />
        </Form>
        <DisplayUserNames/>
      </div>
    );
  }
}

export default App;
