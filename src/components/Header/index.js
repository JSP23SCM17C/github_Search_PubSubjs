import React,{Component} from 'react';
import PubSub from 'pubsub-js';
import axios from 'axios';

import  './index.css';

export default class Header extends Component{
  
  getInputKeyWords=()=>{
    PubSub.publish('userData',{isLoading:true});
    PubSub.publish('userData',{firstTime:false});
    console.log("Search send data");

    const {value}=this.inputKeyWords;
    axios.get(`https://api.github.com/search/users?q=${value}`).then(
      response=>{
        console.log('Done',response.data);
        //this.props.saveUsers(response.data.items);
        PubSub.publish('userData',{users:response.data.items});
        PubSub.publish('userData',{isLoading:false});
        //appUpdateIsLoading(false);
      },
      error=>{
        //appUpdateIsLoading(false);
        PubSub.publish('userData',{isLoading:false});
        PubSub.publish('userData',{err:error.message});
        //appUpdateErr(error.message);
      }
    )
  }
  
  render(){
    return(
      <section className="jumbotron">
        <h3 className="jumbotron-heading">Search Github Users</h3>
        <div>
          <input ref={(currentNode)=>{this.inputKeyWords = currentNode}}type="text" placeholder="enter the name you search"/>&nbsp;
          <button onClick={this.getInputKeyWords}>Search</button>
        </div>
      </section>
    )
  }
}
