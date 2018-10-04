import React, {Component} from 'react';
import {Mutation, Query} from 'react-apollo';
import gql from 'graphql-tag';

import Navbar from '../Navbar/Navbar';

import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase';



const QUERY_ME = gql`
    query me {
        me {
            id,
            name,
            avatar
        }
    }
`

const MUTATION_PUBLIC_PHOTO = gql`
    mutation publicPhoto(
        $path_photo: String!,
        $title: String!,
        $description: String!
    ){
        publicPhoto(
            path_photo: $path_photo
            title : $title,
            description: $description
        ){
            id
        }

    }
` 


class PhotoUpload extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            path_photo : ""
        }
    }

    getMe = () => (
        <Query query={QUERY_ME}>
            {({loading, err, data}) =>{
                if(loading) return 'Loaging ...'
                if(err) return 'Error del servicio'
                return <Navbar name={data.me.name} userId={data.me.id} avatar={data.me.avatar} />
            }}
        </Query>
    )

    publicPhotoForm = (e, publicPhoto ) => {
        e.preventDefault();
        publicPhoto({
            variables: {...this.state}
        })

    }

    handleInput = (event) => {
        let {name, value} = event.target
        this.setState({ [name]: value} )
    }

    uploadFile = async (filename) => {
        let url = await Firebase.storage().ref('photos').child(filename).getDownloadURL()
        this.setState({ path_photo : url })
    }

    render() {
        return (
            <div>
                {this.getMe()}
                <div className="container-fluid">
                    <div className="row justify-content-center">
                    <Mutation mutation={MUTATION_PUBLIC_PHOTO}>
                    {
                        (publicPhoto, {data}) => (
                            <div className="col-md-8">
                                <form onSubmit={(e) => this.publicPhotoForm(e, publicPhoto)}>
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input name="title" value={this.state.title} className="form-control" onChange={this.handleInput}/>
                                    </div>

                                    <div className="form-group">
                                        <label>Description</label>
                                        <input name="description" value={this.state.description} className="form-control" onChange={this.handleInput}/>
                                    </div>

                                    <div className="form-group">
                                    <label className="btn btn-danger">Select photo
                                        <FileUploader
                                            hidden
                                            accept="image/*"
                                            randomizeFilename
                                            storageRef={
                                                Firebase.storage().ref('photos')
                                            }
                                            onUploadError={(err) => console.log(err) }
                                            onUploadSuccess={this.uploadFile}
                                        />
                                    </label>
                                </div>

                                <button type="submit" className="btn btn-primary">Public photo</button>

                                </form>
                            </div>
                        )
                    }
                    </Mutation>
                    </div>
                </div>
            </div>
        )
    }
}

export default PhotoUpload;