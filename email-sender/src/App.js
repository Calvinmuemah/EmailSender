// // import logo from './logo.svg';
// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css';

// function App() {
//   const [email, setEmail] = useState('');
//   const [subject, setSubject] = useState('');
//   const [message, setMessage] = useState('');


//   const sendMail = async() => {
//     await axios.post("https://email-sender-x4l8.vercel.app/", {
//       email,
//       subject,
//       message
//     })
//     .then(() => {
//       console.log("Email sent successfully")
//     }).catch((error) => {
//       console.log("Error sending email:", error.message)
//     })
//   }



//   return (
//     <div>
//       <input type='text'
//       placeholder='Recipient email'
//       onChange={(e) => setEmail(e.target.value)}
//       />
//       <br />
//       <input 
//       type='text'
//       placeholder='Subject'
//       onChange={(e) => setSubject(e.target.value)}
//       />
//       <br/>
//       <textarea
//       placeholder="Message"
//       onChange={(e) => setMessage(e.target.value)}
//       />
//       <br/>
//       <button onClick={sendMail}>Send Email</button>
//     </div>
//   );
// }

// export default App;


// muemahkelvin169@gmail
// wow...am Calvin....
// congratulations on your new job
// am happy for you


import React, { useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMail = async () => {
    if (!email || !subject || !name) {
      alert("Please fill in all fields before sending.");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:3000/send-email", {
        email,
        subject,
        name,  // Send the name to personalize email
      });

      alert("Email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error.message);
      alert("Failed to send email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h3 className="text-center mb-3">📧 Email Sender</h3>

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Your Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          className="form-control mb-2"
          placeholder="Recipient Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          className="form-control mb-2"
          placeholder="Subject"
          onChange={(e) => setSubject(e.target.value)}
        />

        <button className="btn btn-primary w-100" onClick={sendMail} disabled={loading}>
          {loading ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
}

export default App;




// "https://email-sender-x4l8.vercel.app/send-email"