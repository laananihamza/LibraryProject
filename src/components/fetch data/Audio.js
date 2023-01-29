import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import Header from "../Header";

function Audio() {

    const [books, setBooks] = useState(null); 

    
    // useEffect(() => {
    //     // npx json-server --watch data/Category.json --port 8000
    //     fetch('http://localhost:8000/Books')
    //     .then((res) => res.json())
    //     .then((book) => setBooks(book))
    // }, [])

    const Main = styled.main`
    
        width: calc(100% - 355px);
        float: left;
        background-color: white;
        border-radius: 10px;
        box-shadow: 0 0 10px 0px #cccccc69;
        margin-top: 25px;
        margin-left: 10px;
        padding: 15px;
    @media (max-width: 1200px) {
        width: calc(100% - 280px);
    }
    
    @media (max-width: 900px) {
            width: calc(100% - 110px);
    }
    `;
    const HeadTiltle = styled.div`
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        border-bottom: 1px solid #dddddd59;
    `;
    const AddButton = styled.button`
        background-color: #0dd6b6;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 17px;
        & a {
            text-decoration: none;
            
        color: #ffffff;
        }
    `;
    return ( 
        <>
            <Header title={'المسؤول'} srcImg={"../images/User.jpg"} />
            <Main>
            <HeadTiltle>
                <h3>سجلات الصوتيات</h3>
                <AddButton>
                    <Link to='/admin/gaudio/add'>اضافة صوت</Link>
                </AddButton>
            </HeadTiltle>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iure corporis esse, quisquam impedit ratione enim dolorum et veritatis doloremque aspernatur dolores molestias, repellat unde eos commodi est alias facere?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iure corporis esse, quisquam impedit ratione enim dolorum et veritatis doloremque aspernatur dolores molestias, repellat unde eos commodi est alias facere?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iure corporis esse, quisquam impedit ratione enim dolorum et veritatis doloremque aspernatur dolores molestias, repellat unde eos commodi est alias facere?</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Id iure corporis esse, quisquam impedit ratione enim dolorum et veritatis doloremque aspernatur dolores molestias, repellat unde eos commodi est alias facere?</p>
            </Main>
        </>
    );
}

export default Audio;