import React, { useState } from 'react';
import styled from 'styled-components'
import BreweryCard from '../BreweryCard/BreweryCard'
import Checkbox from '../Checkbox/Checkbox'
import PaginationUI from '../PaginationUI/PaginationUI'

const BreweryListWrapper = styled.main`
  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
`
const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  margin: 15px 0;
`
const FiltersSpan = styled.span`
    margin: 0 8px; 
    user-select: none;
    cursor: pointer;
`
const FiltersLabel = styled.label`
    margin: 10px 0;
    text-align: left;
    
`
const FiltersSelect = styled.select`
    display: inline-block;
    height: 20px;
    border-radius: 3px;
    background: #fff9e1;
    box-shadow: 0 0 0 1px #ffda8f;
    border: none;
    vertical-align: middle;
    font-family: inherit;
    font-size: 14px;
    &:focus{
        outline: none;
    }
`

const BreweryList = (props, ref) => {

    const [typeFilter, setTypeFilter] = useState('none')
    const [mapsFilter, setMapsFilter] = useState(false)

    let breweries = props.breweries



    if (typeFilter !== 'none') {
        breweries = breweries.filter(brewery => brewery.brewery_type === typeFilter)
    }
    if (mapsFilter) {
        breweries = breweries.filter(brewery => brewery.longitude && brewery.latitude)
    }
    return (
        <BreweryListWrapper ref={ref}>
            <Filters>
                <FiltersLabel htmlFor="typeFilter">
                    <FiltersSpan>Type:</FiltersSpan>
                    <FiltersSelect id='typeFilter' onChange={e => setTypeFilter(e.target.value)}>
                        <option value="none">None</option>
                        <option value="micro">Micro</option>
                        <option value="regional">Regional</option>
                        <option value="brewpub">Brewpub</option>
                        <option value="planning">Planning</option>
                        <option value="bar">Bar</option>
                        <option value="contract">Contract</option>
                        <option value="proprietor">Proprietor</option>
                    </FiltersSelect>
                </FiltersLabel>

                <FiltersLabel>
                    <FiltersSpan>Google Maps Available</FiltersSpan>
                    <Checkbox
                        checked={mapsFilter}
                        onChange={() => setMapsFilter(prev => !prev)}
                    />
                </FiltersLabel>

            </Filters>
            {
                breweries.map(brewery => (
                    <BreweryCard
                        key={brewery.id}
                        type={brewery.brewery_type}
                        name={brewery.name}
                        city={brewery.city}
                        state={brewery.state}
                        street={brewery.street}
                        phone={brewery.phone}
                        longitude={brewery.longitude}
                        latitude={brewery.latitude}
                        website_url={brewery.website_url}
                    />
                ))
            }
            <PaginationUI currentPage={props.currentPage} sendRequest={props.sendRequest} />
        </BreweryListWrapper>
    );
}

const forwardedBreweryList = React.forwardRef(BreweryList);

export default forwardedBreweryList;