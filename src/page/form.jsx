import React, { useState, useEffect } from 'react'
import '../style/form.css'
import axios from 'axios';

const Home = () => {
  // UseState For Validation
  const [Valid,setValid] = useState(false);
  const [onClickShow, setonClickShow] = useState(false);
  
  // UseState form Country and State
  const [Country, setCountry] = useState("");
  const [CurrState, setCurrState] = useState("");

  // UseState for Api
  const [ApiData, setApiData] = useState();
  const [State, setState] = useState()

  // useState Form Name
  const [name, setName] = useState("");
  const [ValidName, setValidName] = useState(false);


  // useState Form Email
  const [Email, setEmail] = useState("");
  const [ValidEmail, setValidEmail] = useState(false);

  // Handler Phone No
  const [PhNo, setPhNo] = useState(0);
  const [ValidPhNo, setValidPhNo] = useState(false);


  // Check Email Validation
  function EmailValidation(mailId) {
    // Check Email is Valid Or Not
    if (/\S+@\S+\.\S+/.test(mailId)) {
      setValidEmail(true);
    } else {
      setValidEmail(false);
    }
  }

  // Check Name Validation
  const NameValidation = (name) => {
    // Check name Is Valid OR Not
    if (name.length >= 4 && name.length <= 10) {
      setValidName(true);
      console.log();
    } else {
      setValidName(false);
    }
  }

  function PhNoValidation(PhNo) {
    if (PhNo > 999999999 && PhNo <= 9999999999) {
      setValidPhNo(true)
    } else {
      setValidPhNo(false);
    }
  }

  // Handler

  // Name Handler
  function NameHandler(events) {
    setonClickShow(false);
    setName(events.target.value);
    NameValidation(events.target.value);
  }

  // Email Handler
  const EmailHandler = (events) => {
    setonClickShow(false);
    setEmail(events.target.value);
    EmailValidation(events.target.value);
  }

  // Phone No Handler
  const PhNoHandler = (events) => {
    setonClickShow(false);
    setPhNo(events.target.value);
    PhNoValidation(events.target.value);
  }

  // Country Handler
  const CountryHandler = (events) => {
    setonClickShow(false);
    console.log(events.target.value);
    setCountry(events.target.value);
    ApiData.map((ele) => {
      if (ele.name == events.target.value){
        setState(ele.states);
      }
    })
  }

  const StateHandler = (events) => {
    setonClickShow(false);
    setCurrState(events.target.value);
  }

  // UseEffect For Api 
  useEffect(() => {
    FetchCountry();
  },)

  // Fetch Api of Country
  const FetchCountry = () => {
    axios.get("https://raw.githubusercontent.com/stefanbinder/countries-states/master/countries.json")
      .then((res) => setApiData(res.data))
      .catch((err) => console.log(err))
  }

  // CheckValidationForAll
  const CheckValidationForAll = () => {
    setonClickShow(true);
    if (!ValidName || !ValidEmail || !ValidPhNo){
      setValid(false);
    }else{
      setValid(true);
    }
  }

  // refresh prevented
  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      Can you please Provide your personal details ?
      <form onSubmit={onSubmit}>
        <label htmlFor="fname" >Name</label>
        <input type="text" id="name" name="name" placeholder="Your name.." onChange={NameHandler} required/>

        <label htmlFor="email">Email address</label>
        <input type="text" id="email" name="email" placeholder="Your last email.." onChange={EmailHandler} />

        <label htmlFor="lname">Contact number</label>
        <input type="number" id="ContactNumber" name="ContactNumber" placeholder="Your last Contact number.." onChange={PhNoHandler} />

        <label htmlFor="country">Country</label>
        <select id="country" name="country" onChange={CountryHandler} required>
          <option value="any">Choose One</option>
          {
            !ApiData ? "No country" : ApiData.map((ele,ind) => (<option value={ele.name} key={ind}>{ele.name}</option>))
          }
        </select>

        <label htmlFor="country">State</label>
        <select id="country" name="country" onChange={StateHandler} required>
          {
            !State ? "No country" : State.map((ele,ind) => (<option value={ele.name} key={ind}>{ele.name}</option>))
          }
        </select>

        <input type="submit" value="Submit" onClick={CheckValidationForAll}/>
      </form>
      <br />
      <h6>{`Name is ${name === "" ? `EMPTY` : name} and Validation Rule: ${ValidName == true ? `✅` : `Length should be between 4-10 characters.`}`}</h6>
      <h6>{`Email is ${Email === "" ? `EMPTY` : Email} and Validation Rule: ${ValidEmail == true ? `✅` : `should only support valid email address`}`}</h6>
      <h6>{`Contact number is ${PhNo === 0 ? `EMPTY` : PhNo} and Validation Rule: ${ValidPhNo == true ? `✅` : `mobile number should be of 10 digits.`}`}</h6>

      <br />

      <strong>  
        {
          (onClickShow ? 
            ((!Valid || Country === "" || CurrState === "")) ? "All field are not valid yet !" : "All field are valid !"
            : "")
        }
      </strong>
    </>
  )
}

export default Home