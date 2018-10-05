import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import Photo from '../Photo/Photo';
import Navbar from '../Navbar/Navbar';

import './user.css';

const QUERY_MY_PHOTOS = gql`
    query photosByUser($id: ID!){
        photosByUser(id: $id) {
            id,
            path_photo,
            title,
            description,
            likes {
                id
            },
            user {
                id,
                name,
                lastname,
                avatar
            }
        }
    }
`


const QUERY_ME = gql`
    query me {
        me {
            id,
            name,
            lastname,
            avatar,
            email
        }
    }
`


class User extends Component {
    constructor(props){
        super(props);
    }

    getNavBar= () => (
        <Query query={QUERY_ME}>
            {({loading, err, data}) =>{
                if(loading) return 'Loaging ...'
                if(err) return 'Error serivce'
                return <Navbar name={data.me.name} userId={data.me.id} avatar={data.me.avatar} />
            }}
        </Query>
    )


    getProfileUser = () => (
        <Query query={QUERY_ME}>
            {({loading, err, data}) =>{
                if(loading) return 'Loaging ...'
                if(err) return 'Error serivce'
                return (
                    <div className="row ">
                        <div className="col-md-4">
                            <img className="rounded-circle img-profile-user" src={data.me.avatar} />

                        </div>

                        <div className="col-md-8">

                            <h3>{data.me.name} {data.me.lastname}</h3>

                            <h5>Contact :  {data.me.email}</h5>

                        </div>


                    </div>
                )
            }}
        </Query>
    )


    getMyPhotos = () => (
        <Query query={QUERY_MY_PHOTOS} variables={{ id: this.props.match.params.id }}>
            {({loading, err, data}) => {
                if(loading) return 'Cargado tus fotos'
                if(err) return 'Cargado tus fotos'
                return data.photosByUser.map(photo => <Photo id={photo.id} path_photo={photo.path_photo} 
                        user={photo.user} title={photo.title} description={photo.description}  
                        likes={photo.likes}    
                    /> 
                )
            }}
        </Query>
    )

    render(){
        return(
            <div>
                {this.getNavBar()}
                <div className="container mt-5">

                    {this.getProfileUser()}
                
                    <div className="row">
                        {this.getMyPhotos()}
                    </div>
                </div>
            </div>
        )
    }
}

export default User;