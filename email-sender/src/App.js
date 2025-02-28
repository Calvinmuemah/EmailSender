// import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');


  const sendMail = async() => {
    await axios.post("http://localhost:3000/send-email", {
      email,
      subject,
      message
    })
    .then(() => {
      console.log("Email sent successfully")
    }).catch((error) => {
      console.log("Error sending email:", error.message)
    })
  }
  return (
    <div>
      <input type='text'
      placeholder='Recipient email'
      onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input 
      type='text'
      placeholder='Subject'
      onChange={(e) => setSubject(e.target.value)}
      />
      <br/>
      <textarea
      placeholder="Message"
      onChange={(e) => setMessage(e.target.value)}
      />
      <br/>
      <button onClick={sendMail}>Send Email</button>
    </div>
  );
}

export default App;


// muemahkelvin169@gmail
// wow...am Calvin....
// congratulations