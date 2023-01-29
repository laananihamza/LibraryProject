import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";

function Books() {

    const [books, setBooks] = useState(null);
    useEffect(() => {
        // npx json-server --watch data/Category.json --port 8000
        
        fetch('http://localhost:8000/Books')
        .then((res) => res.json())
        .then((book) => setBooks(book))

    }, [])
    const handleDelete = (e, id, bookname) => {
        e.preventDefault();
        const sure = prompt('Write the name of book!');
            if (bookname === sure) {
                fetch(`http://localhost:8000/Books/${id}`, 
            {
                method: "DELETE"
            }).then(() => window.location.reload())
            }
        
        
    }

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
    const Table = styled.table`
        border: 2px solid #ddd;
        width: 100%;
        border-collapse: collapse;
        margin-top: 50px;
    `;
        
    const Th = styled.th`
        border: 1px solid #ddd;
        `;
        
    const Td = styled.td`
        border: 1px solid #ddd;
        text-align: center;
        `;
    const Img = styled.img`
    width: 170px;
    @media (max-width: 600px) {
        width: 40px;
}
    `;
    return ( 
        <>
            {/* <Header title={'المسؤول'} srcImg={"../images/User.jpg"} /> */}
            <Main>
            <HeadTiltle>
                <h3>سجلات الكتب</h3>
                <AddButton>
                    <Link to='/admin/gbook/add'>اضافة كتاب</Link>
                </AddButton>
            </HeadTiltle>
            <Table>
                <thead>
                <tr>
                    <Th>الرقم</Th>
                    <Th>الصورة</Th>
                    <Th>اسم الكتاب</Th>
                    <Th>اسم الكاتب</Th>
                    <Th>صنف الكتاب</Th>
                    <Th>الخيارات</Th>

                </tr>
                </thead>
                    <tbody>
                    {books?.map((book, i) => (
                        <tr key={book.id}>
                            <Td>{book.id}</Td>
                            <Td><Img src={`../images/${book.bookImage}`} alt="" /></Td>
                            <Td>{book.bookName}</Td>
                            <Td>{book.authorName}</Td>
                            <Td>{book.categoryName}</Td>
                            <Td>
                                <Link to={`delete`} onClick={(e) => handleDelete(e, book.id, book.bookName)}><FontAwesomeIcon icon={faTrash} style={{color: 'red', cursor: 'pointer', margin: '0 5px'}} /></Link>
                                <Link to={`${book.id}/edit`}><FontAwesomeIcon icon={faPen} style={{color: '#2196f3', cursor: 'pointer', margin: '0 5px'}} /></Link>
                            </Td>
                        </tr>
                    ))}
                    </tbody>
            </Table>
            </Main>
        </>
    );
}

export default Books;