import React, { PureComponent } from 'react';
import 'whatwg-fetch'
import ReactModal from 'react-modal';
import SignUpProfile from '../SignUpProfile';
import './SignUp.css'
import {
    getFromStorage,
    setInStorage,
  } from '../../utils/storage';

   // create key on state to keep track of modal - done -
  // check that state and display in render - done - 
  // add method that changes state
  ReactModal.setAppElement('#root');

  class SignUp extends PureComponent {
    constructor(props) {
      super(props);
  
      this.state = {
        isLoading: true,
        showModal: false,
        showSignUpProfile: false,
        showSignUp: true,
        token: '',
        signUpError: '',
        signUpEmail: '',
        signUpPassword: '',
        first: '',
        last: '',
        artistBoolean: true,
        
      };
  
      this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
      this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);
      this.onTextboxChangefirst = this.onTextboxChangefirst.bind(this);
      this.onTextboxChangelast = this.onTextboxChangelast.bind(this);
      this.onSignUp = this.onSignUp.bind(this);
      this.logout = this.logout.bind(this); 
    
      //this.handleInputChange = this.handleInputChange.bind(this);

      //modal

      this.handleOpenModal = this.handleOpenModal.bind(this);
      this.handleCloseModal = this.handleCloseModal.bind(this);
       //this.handleSignUp = this.handleSignUp.bind(this);
       //this.handleSignUpProfile = this.handleSignUpProfile.bind(this);
      

    }
  
    componentDidMount() {
      const obj = getFromStorage('the_main_app');
      if (obj && obj.token) {
        const { token } = obj;
        // Verify token
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
   
    handleChange(event) {
      this.setState({value: event.target.value});
    }
    // update(field) {
    //   return (e) => {
    //     this.setState({[field]: e.target.value});
    //   };
    // }
  onTextboxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextboxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextboxChangefirst(event){
    this.setState({
      first: event.target.value,
    });
  }
  onTextboxChangelast(event) {
    this.setState({
      last: event.target.value,
    });
  }
 
 onClickbox(event){
   this.setState({
      artistBoolean: event.target.value,
   });
}

handleOpenModal () {
  this.setState({ showModal: true });
}

handleCloseModal () {
  console.log('We called it', this.state.showModal)
  this.setState({ showModal: false},
  ()=>console.log('setState as well', this.state.showModal));
};

// handleSignUp(){
//   this.setState({showSignUpProfile: true});
// }

componentDidUpdate(){
  // console.log('update', this.state.showModal)
}


onSignUp() {
    // Grab state
    const {
      // showSignUpProfile,
      signUpEmail,
      signUpPassword,
      first,
      last,
      artistBoolean: artistBoolean,
    } = this.state;
    this.setState({
      isLoading: true,
    });
    // Post request to backend
    fetch('/api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({
        email: signUpEmail,
        password: signUpPassword,
        first: first ,
        last: last,
        artistBoolean: artistBoolean
      })
    }).then(res => res.json())
      .then(json => {
        console.log('json', json)
        if (json.success) {
          setInStorage('the_main_app', {token: json.token});
          this.setState({
            signUpError: json.message,
            showSignUpProfile: true,
            isLoading: false,
            artistBoolean: true,
            signUpEmail: '',
            signUpPassword: '',
            first: '',
            last: '',  
            token: json.token,         
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            showSignUpProfile: false,
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
      fetch('/api/account/logout?token=' + token)
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
  render() {
    const {
      isLoading,
      // token,
      // showSignUpProfile,
      signUpEmail,
      signUpPassword,
      signUpError,
      artistBoolean,
      first ,
      last,
    } = this.state;
    if (isLoading) {
      return (<div><p>Loading...</p></div>);
    }
    //if (!token) {
      else {
      return (
        <div>
        {!this.state.showSignUpProfile && <span class = 'sign-in-page'>
            <div className='modalFields col-12  col-xs-12 col-sm-6 col-md-4'>
                <div className="signUpForm">
                    {
                    (signUpError) ? (
                        <p>{signUpError}</p>
                    ) : (null)
                    }
                    <form>
                        <label htmlFor="first" className="hidden">Input your first name.</label>
                        <input
                            type="first"
                            placeholder="Your First Name"
                            value={first}
                            onChange={this.onTextboxChangefirst}
                            className="signUpInput"
                        />
                        <label htmlFor="last" className="hidden">Input your last name.</label>
                        <input
                            type="last"
                            placeholder="Your Last Name"
                            Value={last}
                            onChange={this.onTextboxChangelast}
                            className="signUpInput"
                        />
                        <label htmlFor="signUpEmail" className="hidden">Input your email address. This will act as your username.</label>
                        <input
                            type="signUpEmail"
                            placeholder="YourEmail@domain.com"
                            value={signUpEmail}
                            onChange={this.onTextboxChangeSignUpEmail}
                            className="signUpInput"
                        />
                        <label htmlFor="signUpPassword" className="hidden">Input the password you would like for your account.</label>
                        <input
                            type="password"
                            placeholder="Password"
                          
                            value={signUpPassword}
                             
                            onChange={this.onTextboxChangeSignUpPassword}
                            className="signUpInput"
                        />

                        <div id="artistBooleanGroup">
                            <label htmlFor="checkbox" className="hidden">Check the box if you are already an Artist United member.</label>
                            <input 
                                type="checkbox" data-reverse
                                data-group-cls="btn-group-sm"
                                placeholder="True"
                                value={artistBoolean}
                                onChange={this.oncheckBoxUpdate}
                                id="artistBoolean"
                            />
                            <h6 id="artistBooleanLabel">I am already an Artist United member.</h6>
                        </div>
                    </form>
                    <button type='button' class='btn btn-primary signInUpBtn' onClick={this.onSignUp}>Create Profile</button>
                </div>
            </div>
        </span>}
        {this.state.showSignUpProfile && <SignUpProfile/>}
    </div>                   
 );
 }
  }
} 
    
  

export default SignUp;