import React, { useState } from 'react';
import styled from 'styled-components'

const SearchForm = styled.form`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin 40px 0;
`
const SearchFields = styled.div`
    width: 90%;
    border-radius: 8px;
    border: 2px solid black;
    box-shadow: 0 0 3px gray;
    outline: none;
    padding: 5px;
    margin: 10px 0;
    font-size: 12px;
    display:flex;
    align-items: center;
    justify-content: center;
    flex-direction:column;

    @media screen and (min-width: ${300}px) {
        font-size: 15px;
    }

    @media screen and (min-width: ${400}px) {
        flex-direction:row;
    }

    @media (min-width: ${768}px) {
        width: 50%;
        font-size: 20px;
    }
`
const SearchInput = styled.input`
    width: 100%;
    padding: 15px;
    font-family: inherit;
    border: none;
    outline: none;
    font-size: inherit;
    text-align: center;
    border-bottom: 1px solid gray;

    @media (min-width: ${400}px) {
        width: 80%;
        text-align: left;
        border-bottom: none;
        border-right: 1px solid gray;
    }
`
const SearchSelect = styled.select`
    width: 100%;
    padding: 15px;
    font-family: inherit;
    border: none;
    outline: none;
    font-size: inherit; 
    text-align: center;
    background-color: white;
    @media (min-width: ${400}px) {
        border-top: none;
        width: 20%;
    }
`
const SearchButton = styled.button`
    padding: 15px;
    border-radius: 8px;
    font-family: inherit;
    border: 2px solid black;
    box-shadow: 0 0 3px gray;
    outline: none;
    margin: 10px 0;
    font-size: 20px;
    text-align: center;
    position: relative;
    display: block;
    text-decoration: none;
    width: 200px;
    overflow: hidden;
    cursor: pointer;
`
const SearchButtonText = styled.span`
    position: relative;
    pointer-events: none;
    z-index: 1;
    color: whitesmoke;
    font-size: 20px;
    color: black;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0 auto;
    letter-spacing: 2px;
`
const Liquid = styled.div`
    position: absolute;
    top: -90px;
    left: 0;
    width: 200px;
    height: 200px;
    background: #ffda8f;
    box-shadow: inset 0 0 50px rgba(0,0,0,0.2);
    transition: 0.5s;
    &:before,
    &:after{
        content: '';
        position: absolute;
        width: 200%;
        height: 200%;
        top: 0;
        left: 50%;
        transform: translate(-50%, -75%);
        
    }

    &:before{
        border-radius:45%;
        border: 10px solid #FFF9E1;
        box-shadow: 0 0 35px #FFF9E1;
        background: rgba(193,176,181,1);
        animation: liquid 5s linear infinite;
    }
    &:after{
        border-radius:40%;
        border: 10px solid #FFF9E1;
        box-shadow: 0 0 35px #FFF9E1;
        background: rgba(193,176,181,0.2);
        animation: liquid 10s linear infinite;
    }
    &:hover{
        top: -120px;
        box-shadow: inset 0 0 50px rgba(0,0,0,0.1)
    }
`

const Search = (props) => {

    const [inputState, setInputState] = useState('')
    const [selectState, setSelectState] = useState(10)

    const handleSubmit = (e) => {
        e.preventDefault();
        const city = inputState.trim().toLowerCase().split(' ').join('_');
        if (city.length > 0) {
            props.sendRequest(city, selectState, 1)
            setInputState('')
            setSelectState(10)
        }
    }

    return (
        <SearchForm onSubmit={handleSubmit}>
            <SearchFields>
                <SearchInput type="text" onChange={(e) => setInputState(e.target.value)} value={inputState}
                    placeholder="Type any US city, ex. New York, Chicago" />
                <SearchSelect value={selectState} onChange={(e) => setSelectState(e.target.value)}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                    <option value={40}>40</option>
                    <option value={50}>50</option>
                </SearchSelect>
            </SearchFields>
            <SearchButton>
                <SearchButtonText>Search</SearchButtonText>
                <Liquid></Liquid>
            </SearchButton>
        </SearchForm>
    );
}

export default Search;