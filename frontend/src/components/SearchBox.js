import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


const SearchBox = () => {
    const navigate = useNavigate()

    const [keyword,setKeyword] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        if(keyword.trim()){
            setKeyword("")
            navigate(`/search/${keyword}`)
        }else{
            navigate(`/`)
        }
    }


  return (
    <form onSubmit={submitHandler} className="search">
    <div className="searchInputs">
      <input
        type="text"
        placeholder={"Search for something ..."}
        value={keyword}
        onChange={(e)=>{setKeyword(e.target.value)}}
      />
        <div className="searchIcon  btn-success  " onClick={submitHandler}  style={{color:"white" }}>
            <i className="fas fa-search"></i>
        </div>
    </div>
    

  </form>
);
}

export default SearchBox