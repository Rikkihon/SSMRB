import React, { PureComponent } from 'react';
import ReactModal from 'react-modal';
import 'whatwg-fetch';
import SignUp from '../SignUp';
import './SignIn.css';


//import style from "..styles/vendor/style.less";

import {
  getFromStorage,
  setInStorage,
} from '../../utils/storage';

// Bind modal to Login Button
ReactModal.setAppElement('#root');

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signInError: '',
      signInEmail: '',
      signInPassword: '',
      //Modal
      showModal:false,
      //Toggle Sign In & Sign Up
      showSignUp: false,
    };

    this.onTextboxChangeSignInEmail = this.onTextboxChangeSignInEmail.bind(this);
    this.onTextboxChangeSignInPassword = this.onTextboxChangeSignInPassword.bind(this);
    
    this.onSignIn = this.onSignIn.bind(this);
    this.logout = this.logout.bind(this);

    //Modal
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleSignIn = this.handleSignIn.bind(this);
  }

//make the above into a fat arrow function 
// bindThis => (this){

// }

  componentDidMount() {
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      fetch('/api/account/verify?token=' + token)
        .then(res => res.json())
        .then(json => {
          
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        }).catch(err=>{
          console.log(err)
        })
      } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  onTextboxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value,
    });
  }

  onTextboxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value,
    });
  }
  // onSignUp() {
  //   // Grab state
  //   const {
  //     signInEmail,
  //     signInPassword,
  //   } = this.state;

  //   this.setState({
  //     isLoading: true,
  //   });

  //   // Post request to backend
  //   fetch('/api/account/sign', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'// this also could be json data
  //     },
  //     body: JSON.stringify({
  //       email: signInEmail,
  //       password: signInPassword,
  //     })
  //   }).then(res => res.json())
  //     .then(json => {
  //       console.log('json', json);
  //       if (json.success) {
  //         this.setState({
  //           signInError: json.message,
  //           isLoading: false,
  //           signUpEmail: '',
  //           signUpPassword: '',
  //         });
  //       } else {
  //         this.setState({
  //           signUpError: json.message,
  //           isLoading: false,
  //         });
  //       }
  //     });
  // }

  onSignIn() {
    // Grab state
    const {
      signInEmail,
      signInPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post request to backend
    fetch('routes/api/account/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    }).then(res => res.json())
      .then(json => {
        if (json.success) {
          setInStorage('the_main_app', { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: '',
            signInEmail: '',
            token: json.token,
          });
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  logout() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage('the_main_app');
    if (obj && obj.token) {
      const { token } = obj;
      // Verify token
      fetch('routes/api/account/logout?token=' + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token: '',
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
      });
    }
  }

  //Functions that Open/Close modal
  handleOpenModal (art, e) {
    this.setState({ showModal: true });
  }
  
  handleCloseModal () {
    this.setState({ showModal: false });
  };

  handleSignUp(){
    this.setState({showSignUp: true});
  }

  handleSignIn(){
    this.setState({showSignUp: false})
  }

  render() {
    const {
      isLoading,
      token,
      signInError,
      signInEmail,
      signInPassword,
    } = this.state;

    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    if (!token) {

      //Add specific class to ReactModal

      return (
        <a id="signInModalTrigger" className="navbar-brand login" href="#" onClick={this.handleOpenModal}>Login

        <ReactModal isOpen={this.state.showModal} style={{content: {
                                                            position: 'relative',
                                                            top: 'unset',
                                                            left: 'unset',
                                                            right: 'unset',
                                                            bottom: 'unset',
                                                            border: '1px solid grey',
                                                            background: 'rgb(255, 255, 255)',
                                                            overflow: 'hidden',
                                                            borderRadius: '0px',
                                                            outline: 'none',
                                                            padding: '0px',
                                                            width: '75%',
                                                            height: '60%',
                                                            margin: '80px 12.5%',
                                                            backgroundImage: 'url(https://images.pexels.com/photos/1111367/pexels-photo-1111367.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)',
                                                            backgroundPosition: 'left',
                                                            backgroundSize: 'cover'
                                                          }
                                                        }}>
          {!this.state.showSignUp && <span className= 'sign-in-page'>                
                <div className='modalFields col-12  col-xs-12 col-sm-6 col-md-4'>
                  <div id="signInForm">
                    {
                      (signInError) ? (
                        <p>{signInError}</p>
                      ) : (null)
                    }
                    <input
                      className="signInInput"
                      type="email"
                      placeholder="Email"
                      value={signInEmail}
                      onChange={this.onTextboxChangeSignInEmail}
                    />
                    <input
                      className="signInInput"
                      type="password"
                      placeholder="Password"
                      value={signInPassword}
                      onChange={this.onTextboxChangeSignInPassword}
                    />
                    <br />
                    <button type='button' className='btn btn-primary' onClick={this.onSignIn}>Sign In</button>
                  </div>
                </div>
                  </span> }
          <a id="closeLogin" href="#" onClick={this.handleCloseModal}>CLOSE <a id="closeX">X</a></a>
          {!this.state.showSignUp && <h6 className="memberStatus">Not a Member? <a href="#" onClick={this.handleSignUp}>Sign Up</a></h6>}
          {this.state.showSignUp && <SignUp />}
          {this.state.showSignUp && <h6 className="memberStatus">Already a Member? <a href="#" onClick={this.handleSignIn}>Sign In</a></h6>}
        </ ReactModal>
        </a>
      );
    }

    return (
      <div>
             
        <button type='button' className='btn btn-primary' onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export default SignIn;