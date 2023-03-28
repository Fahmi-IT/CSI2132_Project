import React, {useState} from 'react';
import {Login} from './login_register/Login';
import {Register} from './login_register/Register';
import './signup.css'
  
function SignUp() {
  const [currentForm, setCurrentForm] = useState('login');
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }
  return (
    <div className="loginPg">
      {currentForm === 'login' ? <Login onFormSwitch={toggleForm} /> : <Register onFormSwitch={toggleForm} />}
    </div>
  );
};
  
export default SignUp;