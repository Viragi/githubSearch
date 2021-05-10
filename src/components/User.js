import React from 'react';
import axios from 'axios';
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import config from '../config';


class User extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            userDetail: this.props.userDetail
        }
    }
    handleRerender = async ()=>{
        let newUserDetail = await axios.get(this.props.userDetail.url,config);
        this.setState({
            ...this.state,
            userDetail:{...this.state.userDetail, ...newUserDetail.data}
        })
    }
    componentDidMount(){
        this.handleRerender();
    }
    handleClick = (url)=>{
        window.open(url,"_new");
    }

    render(){
        return (
            <Card style={{ width: '15rem' }} onClick = {()=>this.handleClick(this.state.userDetail.html_url)}>
                <Card.Img variant="top" src= {this.state.userDetail.avatar_url} />
                <Card.Body>
                 <Card.Title>{this.state.userDetail.login}</Card.Title>
                    <Card.Text>
                        {this.state.userDetail.followers && this.state.userDetail.followers > 0 ? (
                            <div>
                                Followers: {this.state.userDetail.followers}
                            </div>
                        ): null}
                        {this.state.userDetail.company && this.state.userDetail.company.length > 0 ? (
                            <div>
                                Company: {this.state.userDetail.company}
                            </div>
                        ): null}
                        {this.state.userDetail.bio && this.state.userDetail.bio.length > 0 ? (
                            <div>
                                Bio: {this.state.userDetail.bio.length > 20 ? this.state.userDetail.bio.substr(0, 20)+"...": this.state.userDetail.bio} 
                            </div>
                        ): null}
                    </Card.Text>
                </Card.Body>
            </Card>
        )
    }
   
}

export default  User;