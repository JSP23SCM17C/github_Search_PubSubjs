

import React, { useState,useEffect } from 'react';
import PubSub from 'pubsub-js';
import './index.css';

 

const List = () => {
    const [state, setState] = useState({
        users: [],
        firstTime: true,
        isLoading: false,
        err: '',
      });
    
    const updateState = (key,value) => {
      setState(prevState => ({
        ...prevState,
        [key] : value,
      }));
    };
    useEffect(() => {
        const subscription = PubSub.subscribe('userData', (msg, data) => {
            console.log(data);
            // 获取对象data中的所有键
            let a = Object.keys(data);
            console.log(a);
            // 确保只有两个键
                let b = data[a[0]]; // 获取第一个键对应的值

                console.log(a); // 输出第一个键对应的值
                console.log(b); // 输出第二个键对应的值
                updateState(a,b);
          
          console.log("List received data")
          
        });
    
        return () => {
          PubSub.unsubscribe(subscription);
        };
      }, []);
        
      
      console.log(state);
    const { users, firstTime, isLoading, err } = state;
   
   return(     
    <div className="row">
        {
        firstTime ? <h2>Enter the name you want to search</h2>: 
        isLoading? <h2>Is loading, please wait ......</h2>:
        err? <h2 style={{color:'red'}}>{err}</h2>:
        (users.map((user)=>(
            
                    <div key={user.id}className="card">
                        <a rel="noreferrer" href={user.html_url} target="_blank">
                            <img alt="avatar" src={user.avatar_url} style={{width: '100px'}}/>
                        </a>
                        <p className="card-text">{user.login}</p>
                    </div>
            
    
        )) )}
    
    </div>
    );
};



export default List;



