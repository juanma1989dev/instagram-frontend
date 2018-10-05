import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';

const MUTATION_ME = gql`
    mutation updateUser(
        $name:String!
        $lastname:String!
        $avatar:String!

    ){
        updateUser(
            name: $name,
            lastname: $lastname,
            avatar: $avatar
        ){
            id,
            name,
            lastname,
            avatar
        }
    }
`

class FormMe extends Component {

    constructor(props){
        super(props);
        this.state = {...props.data}
    }

    handleInput = (event) => {
        
        let {name, value} = event.target;
        this.setState({[name]: value});
    }

    formSubmit = (e, updateUser) => {
        //e.preventDefault();
        updateUser({
            variables: {...this.state}
        })
    }

    uploadFile = async (filename) => {
        let url = await Firebase.storage().ref('avatars').child(filename).getDownloadURL() 
        this.setState({ avatar : url })
    }

    render() {
        return(
            <Mutation mutation={MUTATION_ME}>
            {
                (updateUser, {data}) => (
                <div className="row">
                    <div className="col-md-8">
                    { console.log("Avatar", this.state.avatar) }
                    <img src={this.state.avatar} className="img-fluid img-rounded d-block mx-auto" />

                    <form onSubmit={(e) => this.formSubmit(e, updateUser)}>
                        <div className="form-group" >
                            <label>Name</label>
                            <input type="text" className="form-control" name="name"  value={this.state.name} onChange={this.handleInput}/>
                        </div>
        
                        <div className="form-group" >
                            <label>Lastname</label>
                            <input type="text" className="form-control" name="lastname"  value={this.state.lastname} onChange={this.handleInput}/>
                        </div>


                        <div className="form-group">
                            <label className="btn btn-danger">Avatar
                                <FileUploader
                                    hidden
                                    accept="image/*"
                                    randomizeFilename
                                    storageRef={
                                        Firebase.storage().ref('avatars')
                                    }
                                    onUploadError={(err) => console.log(err) }
                                    onUploadSuccess={this.uploadFile}
                                />
                            </label>
                        </div>
        
                        <button className="btn btn-primary">Save profile</button>
                    </form>
                </div>
                </div>
                )
            }    
            </Mutation>

        )
    }
}


export default FormMe;