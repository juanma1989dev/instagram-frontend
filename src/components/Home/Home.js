import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';

import Navbar from '../Navbar/Navbar';
import Photo from '../Photo/Photo';

const QUERY_ME = gql`
    query me {
        me {
            id,
            name,
            avatar
        }
    }
`

const QUERY_ALL_PHOTOS = gql`
    query allPhotos {
        allPhotos {
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

class Home extends Component {

    constructor(props){
        super(props);
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

    getMyPhotos = () => (
        <Query query={QUERY_ALL_PHOTOS}>
            {({loading, err, data}) => {
                if(loading) return 'Cargado tus fotos'
                if(err) return 'Cargado tus fotos'
                return data.allPhotos.map(photo => <Photo id={photo.id} path_photo={photo.path_photo} 
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
                {this.getMe()}
                <div className="container mt-5">
                    <div className="row">
                        {this.getMyPhotos()}
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;