import React, {Component} from 'react';
import { Card, CardImg, CardImgOverlay,CardText,CardBody,CardTitle } from 'reactstrap';

class Dishdetail extends Component{
    constructor(props){
        super(props);
    }

    renderDish(dish){
        if(dish!=null){
            return(
                <div>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>

                        <CardTitle>{dish.name}</CardTitle>
                        <p>{dish.description}</p>
                </div>
            );
        }
        else{
            return(
                <div>

                </div>
            );
        }
    }

    renderComments(comments){
        const inter=comments.map(onecomment=>{
            return(
                <div key={onecomment.id}>
                    <li>{onecomment.comment}</li>
                    <li>--{onecomment.author}, {new Date(onecomment.date).toDateString()}</li>
                </div>
            )
        });
        if(comments!=null){
            return(
                <div>
                    <h4>Comments</h4>
                    <div className="list-unstyled">
                        {inter}
                    </div>
                </div>
            );
        }
        else{
            return(
                <div>

                </div>
            )
        }
    }

    render(){
        const selectedDish= this.props.dish;
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        {this.renderDish(selectedDish)}
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(selectedDish.comments)}
                </div>
            </div>
        );
    }
}

export default Dishdetail