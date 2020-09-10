import React from 'react';
import { Card, CardImg,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import {Link } from 'react-router-dom'; 

    function RenderDish({dish}){
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

    function RenderComments({comments}){
            const inter=comments.map((onecomment)=>{
                return(
                    <div key={onecomment.id}>
                        <p>{onecomment.comment}</p>
                        <p>--{onecomment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(onecomment.date)))}</p>
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

    const Dishdetail=(props)=>{
        const selectedDish= props.dish;
        return(
            <>
            <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <RenderDish dish={props.dish} />
                    </Card>
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comments={props.comments}/>
                </div>
            </div>
            </>
        );
    }

export default Dishdetail