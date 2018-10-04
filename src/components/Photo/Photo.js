import React, {Component} from 'react'
import {Link} from 'react-router-dom';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

import './photo.css';

const MUTATION_LIKE = gql`
    mutation likePhoto( $photo:ID! ){
        likePhoto( photo: $photo ){
            id
        }
    }
`

class Photo extends Component {


    constructor(){
        super();
    }

    liked = (e, likePhoto) => {
        e.preventDefault();
        console.log(likePhoto);
    }

    render() {
        return(
            <div className="col-md-6 col-sm-12 ">
                <div className="card-header">
                    <Link to={`/user/${this.props.user.id}`}>
                        <img src={this.props.user.avatar} className="rounded-circle card__user__img__avatar" /> {this.props.user.name} {this.props.user.lastname}
                    </Link>
                </div>

                <div className="card card__image " >
                    <div className="card-body">
                        <a data-toggle="modal" data-target={`#modalPhoto_${this.props.id}`}>
                            <img className="card-img-top" src={this.props.path_photo} alt="Card image cap" />
                        </a>
                        <h5 className="card-title"> {this.props.title} </h5>
                        <p className="card-text"> {this.props.description} </p>
                        <Mutation mutation={MUTATION_LIKE}>
                        {
                            (likePhoto, {loading, err, data}) => (
                                <a href="#" className="btn btn-primary" onClick={(e) => this.liked(e, likePhoto) }  >Like</a>
                            )
                        }
                        </Mutation>
                    </div>
                </div>

          
                <div className="modal fade" id="modalPhoto"  id={`modalPhoto_${this.props.id}`} tabindex="-1" role="dialog" aria-labelledby="modalPhotoLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="modalPhotoLabel"> {this.props.title} </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body text-center">
                                <img src={this.props.path_photo} />
                                <p>  {this.props.description } </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Photo;