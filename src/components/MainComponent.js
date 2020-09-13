import React, {Component} from 'react';
import Menu from  './MenuComponent';
import Home from './HomeComponent';
import About from './AboutComponent';
import Contact from './ContactComponent';
import Dishdetail from './DishdetailComponent'
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom'
import {connect} from 'react-redux';
import {postComment,fetchComments,fetchDishes, fetchPromos} from '../redux/ActionCreator';
import {actions} from 'react-redux-form';
import {TransitionGroup, CSSTransition} from 'react-transition-group';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    }
}

const mapDispatchToProps= (dispatch) => ({
  postComment: (dishId,rating,author,comment) => dispatch(postComment(dishId,rating,author,comment)),
  fetchDishes: () => {dispatch(fetchDishes())},
  fetchComments: () => {dispatch(fetchComments())},
  fetchPromos: () => {dispatch(fetchPromos())},
  resetFeedbackForm: () =>{dispatch(actions.reset('feedback'))}
});
class Main extends Component {
  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    //console.log('lokesh');
  }
  render(){
    const HomePage= () => {
        console.log(this.props.comments)
        return (
            <Home dish={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errmess}
                promotion={this.props.promotions.promotions.filter((promo)=>promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errmess}
                leader={this.props.leaders.filter((leader)=>leader.featured)[0]}
            />
        );
    }

    const DishWithId = ({match}) => {
        return(
            <Dishdetail dish={this.props.dishes.dishes.filter((dish)=>dish.id===parseInt(match.params.dishId,10))[0]} 
              isLoading={this.props.dishes.isLoading}
              errMess={this.props.dishes.errmess}
              comments={this.props.comments.comments.filter((comment)=>comment.dishId===parseInt(match.params.dishId,10))}
              commentsErrMess={this.props.comments.errMess}
              postComment={this.props.postComment}
            />
        )
    }
    return (
      <div>
        <Header />
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
                <Route path="/home" component={HomePage} />
                <Route exact path="/menu" component={() => <Menu dishes={this.props.dishes}/>}/>
                <Route path="/menu/:dishId" component={DishWithId}/>
                <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>} />
                <Route exact path="/aboutus" component={()=><About leaders={this.props.leaders}/>}/>
                <Redirect to="/home" />
            </Switch>
          </CSSTransition>
        </TransitionGroup>
        <Footer/>
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
