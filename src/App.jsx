import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [state, setState] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [city, setCity] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');




  const generateData = async() => {
    try {
      const data = await fetch('https://crio-location-selector.onrender.com/countries');
      const res = await data.json();
      const newArr = new Set(res);
      setCountry(Array.from(newArr));
    } catch (error) {
        console.log(error);
    }
  }

  const handleClick = async (e) =>{
    const {value} = e.target;
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${value}/states`);      
      const res = await data.json();
      const newArr = new Set(res);
      setState(Array.from(newArr));
      setSelectedCountry(value);
    } catch (error) {
        console.log(error);
    }
  }

  const handleState = async (e) =>{
    const {value} = e.target;
    try {
      const data = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${value}/cities`);      
      const res = await data.json();
      const newArr = new Set(res);
      setCity(Array.from(newArr));
      setSelectedState(value);
    } catch (error) {
        console.log(error);
    }
  }

  const handleCity = async (e) =>{
    const {value} = e.target;
    setSelectedCity(value);
  }
 


  useEffect(()=>{
    generateData();
  },[])

  return (
    <div className='parent'>
      <h1>
        Select Location
      </h1>
      <select onChange={handleClick}>
        <option value=''>Select Country</option>
        {country.length>0?(country.map((item) => {
          return (
            <option value={item} key={item} >{item}</option>
          )
        })):''}
      </select>

      <select onChange={handleState}>
        <option value=''>Select State</option>
        {state.length>0?(state.map((item) => {
          return (
            <option value={item} key={item} >{item}</option>
          )
        })):''}
      </select>

      <select onChange={handleCity}>
        <option value=''>Select City</option>
        {city.length>0?(city.map((item) => {
          return (
            <option value={item} key={item} >{item}</option>
          )
        })):''}
      </select>
      {selectedCountry && selectedState &&selectedCity ? (
        <div>You selected {selectedCity}, {selectedState}, {selectedCountry}</div>
      ):''}
    </div>
  )
}

export default App
