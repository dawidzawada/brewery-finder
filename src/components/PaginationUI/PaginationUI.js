import React from 'react';
import styled from 'styled-components';


const PaginationUIWrapper = styled.div`
    width: 100%;
    margin: 15px 0;
    display: flex;
    align-items: center;
    justify-content: center;
`
const Button = styled.button`
    width: 40px;
    height: 40px;
    border: 2px solid black;
    border-radius: 8px;
    font-size: 30px;
    color: black;
    background-color: #fff9e1;
    margin: 0 10px;
    
    &:hover{
        background-color: #ffda8f;
    }
    &:focus{
        outline: none;
    }
    &:disabled{
        user-select: none;
        opacity: 0.6;
    }
    &:disabled:hover{
        background-color: #fff9e1;
        user-select: none;
        opacity: 0.6;
    }
`

const PaginationUI = ({ currentPage, sendRequest }) => {


    const handlePrevPage = () => {
        if (currentPage.page > 1) {
            sendRequest(currentPage.city, currentPage.amount, currentPage.page - 1)
        }
    }
    const handleNextPage = () => {
        sendRequest(currentPage.city, currentPage.amount, currentPage.page + 1)
    }

    return (
        <PaginationUIWrapper>
            <Button onClick={handlePrevPage} disabled={currentPage.page <= 1}>&#8249;</Button>
            <h3>Page: {currentPage.page}</h3>
            <Button onClick={handleNextPage}>&#8250;</Button>
        </PaginationUIWrapper>
    );
}

export default PaginationUI;