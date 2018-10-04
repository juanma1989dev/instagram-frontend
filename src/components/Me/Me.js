import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import FormMe from './FormMe';


import Navbar from '../Navbar/Navbar';


const QUERY_ME = gql`
    query me{
        me {
            id,
            name,
            lastname,
            avatar
        }
    }
`
class Me extends Component {

    constructor() {
        super();
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

    render() {
        return(
            <div className="container-fluid">
                {this.getMe()}
                <div className="row justify-content-center">
                    <div className="col-md-8">
                    <Query query={QUERY_ME}>
                    {
                        ({loading, err, data}) => {
                            if(loading) return (<h4>Cargando ....</h4>)
                            if(err) return (<h4>Error en el servicio</h4>)
                            
                            return (
                                <FormMe data={data.me} />
                            )
                        }
                    }
                    </Query>
                    </div>
                </div>
            </div>
        )
    }
}


export default Me;