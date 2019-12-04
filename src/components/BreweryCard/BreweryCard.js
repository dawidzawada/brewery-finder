import React from 'react';
import styled from 'styled-components'
import * as svg from '../../svg'


const Card = styled.article`
    width: 90%;
    box-shadow: 0 0 3px gray;
    border: 2px solid black;
    border-radius: 8px;
    padding: 20px;
    margin: 15px 0;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1.6fr 1fr;
    grid-template-areas: "TypeContainer" "Data" "Links";

    @media (min-width: ${768}px) {
        width: 60%;
        grid-template-columns: 0.7fr 1.3fr;
        grid-template-rows: 1.4fr 0.6fr;
        grid-template-areas: "TypeContainer Data" "TypeContainer Links";
    }
`
const TypeContainer = styled.div`
    align-self: center;
    justify-self: center;
    grid-area: TypeContainer;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`
const Icon = styled.div`
    width: 120px;
    height: 120px;

`
const Type = styled.span`
    font-size: 20px;
    font-weight: bold;
    text-transform: capitalize;
    padding: 10px 0;
`
const Data = styled.div`
    align-self: center;
    justify-self: center;
    grid-area: Data;
    text-align: center;
`
const Name = styled.h1`
    font-size: 2.5rem;
    padding: 20px 0;
`
const Address = styled.p`
    font-size: 1.2rem;
    padding: 20px 0;
`
const Phone = styled.span`
    font-size: 1.2rem;
    text-decoration:underline;
`
const Links = styled.div`
    grid-area: Links;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Link = styled.a`
    font-size: 18px;
    border: 2px solid black;
    background-color: #fff9e1;
    border-radius: 8px;
    color: black;
    padding: 10px;
    margin: 10px;
    text-decoration: none;
    text-align: center;
    opacity: ${props => props.disabled ? "0.6" : "1"};
    pointer-events: ${props => props.disabled ? "none" : "auto"};
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"}
    transition: .5s;
    &:hover{
        background-color: #ffda8f;
    }
`

const BreweryCard = (props) => {

    let type = null;

    switch (props.type) {
        case "micro":
            type = "beer"
            break;
        case "regional":
            type = "barrel"
            break;
        case "brewpub":
            type = "bar"
            break;
        case "large":
            type = "bottle1"
            break;
        case "planning":
            type = "bottle2"
            break;
        case "bar":
            type = "bar"
            break;
        case "contract":
            type = "bottle2"
            break;
        case "proprietor":
            type = "bottle1"
            break;
        default:
            type = "micro"
            break;
    }

    const address = () => {
        if (props.city === props.state) {
            return props.street ?
                props.city + " | " + props.street
                :
                props.city
        } else {
            return props.street ?
                props.city + ", " + props.state + " | " + props.street
                :
                props.city + ", " + props.state
        }
    }

    return (
        <Card>
            <TypeContainer>
                <Icon>{svg[type]()}</Icon>
                <Type>{props.type}</Type>
            </TypeContainer>
            <Data>
                <Name>{props.name}</Name>
                <Address>{address()}<br /><Phone>{props.phone}</Phone></Address>
            </Data>
            <Links>
                <Link
                    href={props.website_url}
                    disabled={props.website_url ? false : true}
                >
                    Official Website
                    </Link>
                <Link
                    href={`http://www.google.com/maps/place/${props.latitude},${props.longitude}`}
                    disabled={props.latitude && props.longitude ? false : true}
                >
                    Google Maps
                </Link>
            </Links>
        </Card>
    );
}

export default BreweryCard;