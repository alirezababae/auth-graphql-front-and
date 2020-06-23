import React, { Component ,Fragment} from 'react'
import contextauth from './context/auth-context'
import './styles.css';

class Auth extends Component {

// state = {
// isLogin:true

// }

// static contextType = context

// switchHandles = () => {

//     this.setState(prevState => {
//         return {isLogin: !prevState.isLogin}
//     })

//  }


//  constructor(props) {
//      super(props)
//      this.emailEl = React.createRef()
//      this.passwordEl = React.createRef()
//  }
 





//     submitHandels = events => {
//         events.preventDefault()
// const email = this.emailEl.current.value
// const password = this.passwordEl.current.value


// if(email.trim().length === 0 || password.trim().length === 0){
// return;
//     // return alert('ziro value inpout')
// }
// // console.log(email , password);

// let requsetBody = {
// query:`

// query{
  
//     login(email:"${email}" , password:"${password}"){
//         userId
//         token
//         tokenExpiration
//     }
//   }


// `

// }


// if(!this.state.isLogin){

//      requsetBody = {

//         query:`
        
//         mutation{
        
//             createUser(userInput:{email:"${email}" , password:"${password}"}){
//              _id
//              email
//            }
//            }   
        
//         `
        
//         };
        

// }

// // const requsetBody = {

// // query:`

// // mutation{

// //     createUser(userInput:{email:"${email}" , password:"${password}"}){
// //      _id
// //      email
// //    }
// //    }   

// // `

// // };

// fetch('http://localhost:3001/graphql',{
// method:'POST',
// body:JSON.stringify(requsetBody),
// headers:{

//     'Content-Type':'application/json'
// }


// })
// .then(res => {

//     if(res.status !== 200 && res.status !== 201){

// throw new Error('Faild!');

//     }

//     return res.json()

// }).then(resData => {

//     if(resData.data.login.token){

// this.context.login(resData.login.token , resData.data.login.userId , resData.data.tokenExpiration)
//     }
//     // console.log(resData);
     
// }) 

// .catch(err => {

//     console.log(err);
    

// })

//     }


state = {
    isLogin: true
  };

  static contextType = contextauth;

  constructor(props) {
    super(props);
    this.emailEl = React.createRef();
    this.passwordEl = React.createRef();
  }

  switchModeHandler = () => {
    this.setState(prevState => {
      return { isLogin: !prevState.isLogin };
    });
  };

  submitHandler = event => {
    event.preventDefault();
    const email = this.emailEl.current.value;
    const password = this.passwordEl.current.value;

    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }

    let requestBody = {
      query: `
        query {
          login(email: "${email}", password: "${password}") {
            userId
            token
            tokenExpiration
          }
        }
      `
    };

    if (!this.state.isLogin) {
      requestBody = {
        query: `
          mutation {
            createUser(userInput: {email: "${email}", password: "${password}"}) {
              _id
              email
            }
          }
        `
      };
    }

    fetch('http://localhost:3001/graphql', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
          console.log(resData);
          
        if (resData.data.login.token) {
          this.context.login(
            resData.data.login.token,
            resData.data.login.userId,
            resData.data.login.tokenExpiration
          );
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

    render() {
        return (
            <div className="main">
            <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="form-control">
              <label htmlFor="email">E-Mail</label>
              <input type="email" id="email" ref={this.emailEl} />
            </div>
            <div className="form-control">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" ref={this.passwordEl} />
            </div>
            <div className="form-actions">
              <button type="submit">Submit</button>
              <button type="button" onClick={this.switchModeHandler}>
                Switch to {this.state.isLogin ? 'Signup' : 'Login'}
              </button>
            </div>
          </form>
          </div>
            )
    }
}


export default Auth
