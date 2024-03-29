import React, {Component} from 'react';
import {Link} from 'react-router-dom';
//import './App.css';
import { Route, withRouter } from 'react-router-dom';
import axios from 'axios';
import swal from 'sweetalert';
import * as API from '../api/API';
import UploadedFiles from "./UploadedFiles";
import Showactivity from "./Showactivity";
import Login from "./Login";
import TextField from 'material-ui/TextField';

import Typography from 'material-ui/Typography';


class AfterLogin extends Component {

    handleFileUpload = (event) => {

        const payload = new FormData();

        payload.append('mypic', event.target.files[0]);

        API.uploadFile(payload)
            .then((status) => {
                if (status == 201) {
                    API.getImages()
                        .then((data) => {
                            this.setState({
                                images: data
                            });
                            console.log(this.state.images)
                        });


                }
            });


    };


    handleActivity = () => {
        API.showActivity()
            .then((data) => {
                this.setState({
                    activity: data,
                    dispactivity:true
                });
                console.log(this.state.activity)
            });


    };


    setname = (name) => {
        console.log(name)
        this.props.sendupp(name);

    };


    handleDirectory = () => {
        swal("Enter Folder name to create:", {
            content: "input",
        })
            .then((value) => {
                API.Directory(value)
                    .then((status) => {
                    console.log(status)
                        if (status == 201) {
                            API.getImages()
                                .then((data) => {
                                    console.log(data);
                                    this.setState({
                                        images_here: data
                                    });
                                    //console.log(this.state.images_here)
                                });
                        };
                    });
                swal(`Directory Created Successfull`);
            })

    };


    constructor() {
        super();
        this.state = {
            dispactivity:false,
            images: [],
            activity:[],
            foldername:''
        };
    }

    componentWillReceiveProps(props){
        // API.getImages()
        //     .then((data) => {
        //         this.setState({
        //             images: data
        //         });
        //
        //     });
        // API.showActivity()
        //     .then((data) => {
        //         this.setState({
        //             activity: data
        //         });
        //     });
    };
    componentWillUpdate(nextProps, nextState) {
        console.log(this.state.images)
    }
    componentWillMount(props){
        API.getImages()
            .then((data) => {
                this.setState({
                    images: data
                });
                console.log(this.state.images)
            });
        API.showActivity()
            .then((data) => {
                this.setState({
                    activity: data
                });
            });
    };
    render() {
        return (
            <div >
                <br/>
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_2016-vflzSDxC1.svg" height="40"/>
                <img src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_text_2015_2016-vflQnXBUU.svg" height="40" />
                <div className={'rightfloat'}> <button className="btn btn-primary" onClick={() => this.props.handleLogout()}>Logout</button></div>
                <hr/>
                <div className={'leftfloat'}><button className="btn btn-primary" onClick={this.handleActivity}>Activity</button></div>
                <div className={'acc_det'}> <a className="btn btn-primary" role="button" href="/details">Profile</a></div>
                <div className={'direc'}><button className="btn btn-primary" onClick={() => this.handleDirectory()}>Create a Directory</button></div>
                <div className={'direc'}><a className="btn btn-primary" role="button" href="/groups">Groups</a></div>
                <Typography
                    align={'right'}
                    type="title"
                >
                    Upload
                </Typography>
                <TextField
                    className={'fileupload'}
                    type="file"
                    name="mypic"
                    onChange={this.handleFileUpload}
                />
                <UploadedFiles images={this.state.images} sendup={this.setname}/>
                {this.state.dispactivity?<Showactivity activity={this.state.activity}/>:''}
            </div>

        );
    }
}

export default AfterLogin;

