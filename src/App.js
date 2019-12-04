import React, { useReducer, useState, useRef } from 'react';
import styled from 'styled-components'
import Search from './components/Search/Search'
import axios from './axios'
import * as svg from './svg'
import Spinner from './components/Spinner/Spinner'
import Div100vh from 'react-div-100vh'
import BreweryList from './components/BreweryList/BreweryList'


const AppWrapper = styled.div`
  width: 100vw;
`

// const BetaBadge = styled.div`
//   display: flex;
//   position: fixed;
//   top: -70px;
//   right: -70px;
//   background-color: #E8584F;
//   color: white;
//   font-weight: bold;
//   letter-spacing: 3px;
//   text-transform: uppercase;
//   padding: 100px 40px 5px 40px;
//   transform: rotate(45deg);
//   user-select: none;  
// `
const Footer = styled.footer`
  width: 100%;
  padding: 30px 50px;
  background-color: black;
  color: white;
  text-align:center;
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;
  
  a{
    color: white;
  }
  @media (min-width: ${768}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const Logo = styled.header`
  margin: 20px auto; 
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  @media (min-width: ${768}px) {
    width: 30%;
  }
`

const LogoText = styled.h1`
  width: 50%;
  user-select: none;
  display: none;
  @media (min-width: ${480}px) {
    display: block;
    font-size: 3rem;
  }
  @media (min-width: ${768}px) {
    font-size: 3.2rem;
  }
  @media (min-width: ${1000}px) {
    font-size: 4rem;
  }
`

const LogoSvg = styled.div`
  width: 50%;
`

const NoResultsTitle = styled.h2`
  text-align: center;
`

const initialState = [];

function reducer(state, action) {
  switch (action.type) {
    case 'SET_BREWERIES':
      return [...action.breweries];
    case 'CLEAR_BREWERIES':
      return [];
    default:
      throw new Error();
  }
}

function App() {

  const [breweries, dispatchBreweries] = useReducer(reducer, initialState);
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(null);
  const [currentPage, setCurrentPage] = useState(null);
  // const [currentPage, setCurrentPage] = useState(1);
  const results = useRef(null);

  const scrollToRef = (ref) => ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const sendRequest = (city, amount, page) => {
    setLoading(true)
    setNoResults(null)
    dispatchBreweries({ type: 'CLEAR_BREWERIES' })
    axios.get(`?by_city=${city}&page=${page}&per_page=${amount}`)
      .then((response) => {
        if (response.data.length > 0) {
          setCurrentPage(
            {
              city,
              page,
              amount
            }
          )
          dispatchBreweries({ type: 'SET_BREWERIES', breweries: response.data })
        } else {
          setNoResults(city)
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log('ERROR: ' + error);
        setLoading(false)
        setNoResults(null);
      })
      .then(() => {
        scrollToRef(results)
      })
  }

  return (
    <AppWrapper>
      <Div100vh style={{ padding: '30px 0', width: '100%', minHeight: '100rvh' }}>
        <Logo>
          <LogoSvg>{svg.logo()}</LogoSvg>
          <LogoText>Brewery Finder</LogoText>
        </Logo>
        <Search sendRequest={sendRequest} />
        {loading && <Spinner />}
        {breweries.length > 0 && (
          <BreweryList ref={results} breweries={breweries} currentPage={currentPage} sendRequest={sendRequest} />
        )}
        {noResults && <NoResultsTitle>No results for '{noResults}'</NoResultsTitle>}
      </Div100vh>
      <Footer>
        <span>Copyright © Dawid Zawada</span>
        <div>Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a>, <a href="https://www.flaticon.com/authors/eucalyp" title="Eucalyp">Eucalyp</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div>
        <a href="https://www.openbrewerydb.org/">Powered by OpenBreweryDB</a>
      </Footer>
    </AppWrapper>
  );
}

export default App;
