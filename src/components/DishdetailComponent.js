import React, {Component} from 'react';
import { Card, CardImg,CardTitle } from 'reactstrap';

class Dishdetail extends Component{

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

    renderComments(dish){
        var comments=null;
        var inter=null;
        if(dish!=null){
            comments=dish.comments;
            inter=comments.map(onecomment=>{
                return(
                    <div key={onecomment.id}>
                        <p>{onecomment.comment}</p>
                        <p>--{onecomment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(onecomment.date)))}</p>
                    </div>
                )
            });
        }
        
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
        console.log(selectedDish);
        return(
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        {this.renderDish(selectedDish)}
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    {this.renderComments(selectedDish)}
                </div>
            </div>
        );
    }
}

export default Dishdetail