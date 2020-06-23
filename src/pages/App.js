import React, { Component  } from 'react'
import {BrowserRouter , Route , Redirect , Switch} from 'react-router-dom'
import Authpages from './auth' 
import contextauth from './context/auth-context'
import BookingsPage from './book';
import EventsPage from './events';

class auth extends Component {

// state = {
//     token:null,
//     userId:null
// }

//     login = (token , userId , tokenExpiration) => {
// this.setState({token:token , userId:userId})

//     }
// logout = () => {

// }


state = {
    token: null,
    userId: null
  };

  login = (token, userId, tokenExpiration) => {
    this.setState({ token: token, userId: userId });
  };

  logout = () => {
    this.setState({ token: null, userId: null });
  };


    render() {
        return (
            <BrowserRouter>
            <React.Fragment>
              <contextauth.Provider
                value={{
                  token: this.state.token,
                  userId: this.state.userId,
                  login: this.login,
                  logout: this.logout
                }}
              >
                <main className="main-content">
                  <Switch>
                    {!this.state.token && <Redirect from="/" to="/auth" exact />}
                    {this.state.token && <Redirect from="/" to="/events" exact />}
                    {this.state.token && <Redirect from="/auth" to="/events" exact />}
                    {!this.state.token && (
                      <Route path="/auth" component={Authpages} />
                    )}
                    <Route path="/events" component={EventsPage} />
                    {this.state.token && (
                      <Route path="/bookings" component={BookingsPage} />
                    )}
                  </Switch>
                </main>
              </contextauth.Provider>
            </React.Fragment>
          </BrowserRouter>
        )
    }
}

export default auth




// <BrowserRouter>
//         <context.Provider value={{token:this.state.token , userId:this.state.userId , login:this.login , logout:this.logout}}>
//         <Switch>

// <Redirect from="/" to="/auth" exact/>
// <Route path="/auth" component={Authpages}/>

//         </Switch>
//         </context.Provider>
//         </BrowserRouter>