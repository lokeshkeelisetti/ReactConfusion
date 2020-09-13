import React, {Component} from 'react';
import { Card, CardImg,CardTitle,Breadcrumb,BreadcrumbItem,Modal,ModalHeader,ModalBody,Button,
    Label} from 'reactstrap';
import {Link } from 'react-router-dom'; 
import {Control,LocalForm,Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform,Fade,Stagger} from 'react-animation-components';


const required = (val) =>val && val.length;
const maxLength =(len) => (val) => !(val) || (val.length<=len);
const minLength =(len) => (val) => (val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen:false
        };
        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen:!(this.state.isModalOpen)
        });
    }

    handleSubmit(values) {
        this.props.postComment(this.props.dishId,values.rating,values.author,values.comment);
    };

    render(){
        return (
            <div> 
                <Button outline color="secondary" onClick={this.toggleModal}>
                    <span className="fa fa-pencil"></span> Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values)=>{this.handleSubmit(values)}}>
                        <Label htmlFor="rating">Rating</Label>
                        <Control.select model=".rating" name="rating"
                        className="form-control">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Control.select>
                        <Label htmlFor="yourname">Your Name</Label>
                        <Control.text model=".author" name="yourname" id="yourname"
                            className="form-control" placeholder="Your Name" validators={{required,maxLength:maxLength(15),minLength:minLength(3)}}/>
                            <Errors
                                className="text-danger"
                                model=".yourname"
                                show="touched"
                                messages= {{required:'Required',
                                           minLength:'too short',
                                            maxLength: 'too long'
                                                        }}/>
                        <Label htmlFor="comment">Comment</Label>
                        <Control.textarea model=".comment" name="comment" id="comment"
                            className="form-control" rows="6"/>
                        <Button type="submit" color="primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
                </Modal>
            </div>
        );
    }
}

    function RenderDish({dish}){
        if(dish!=null){
            return(
                <div>
                    <FadeTransform in 
                        transformProps ={{
                        exitTransform:'scale(0.5) translateY(-50%)'}}
                        >
                        <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name}/>

                            <CardTitle>{dish.name}</CardTitle>
                            <p>{dish.description}</p>
                    </FadeTransform>
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

    function RenderComments({comments,postComment,dishId}){
            const inter=comments.map((onecomment)=>{
                return(
                    <Fade in>
                        <li key={onecomment.id}>
                            <p>{onecomment.comment}</p>
                            <p>--{onecomment.author}, {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(onecomment.date)))}</p>
                        </li>
                    </Fade>
                )
            });
        
        if(comments!=null){
            return(
                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        <Stagger in>
                            {inter}
                        </Stagger>
                        <CommentForm dishId={dishId} postComment={postComment}/>
                    </ul>
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
        if(props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if(props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
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
                    <RenderComments comments={props.comments}
                            postComment={props.postComment}
                            dishId={props.dish.id}/>
                </div>
            </div>
            </>
        );
    }

export default Dishdetail