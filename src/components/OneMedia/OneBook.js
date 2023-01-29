import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";

function OneBook() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8000/Books/${id}`).then((res) => res.json()).then((data) => setBook(data))
    }, [id])
     function handlerDownload() {
        const download = ++book.downloaded ;
        setBook((prev) => ({...prev, downloaded: download }))
        fetch(`http://localhost:8000/Books/${id}`, {
            method: "PUT",
            body :  JSON.stringify(book),
            headers: {
                "Content-Type": "application/json",  
                "Accept":       "application/json"
            }
        })
    } 
    
    const MainFrame = styled.div`
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
        const BookTitle = styled.div`
            border-bottom: 1px solid #eee;
            padding: 15px;
            @media(max-width: 768px) {
                text-align: center;
            }
        `;
        const HTitle = styled.p`
            font-size: 25px;
            margin: 0;
        `;
        const MainContent = styled.div`
            display: flex;
            align-items: center;
            gap: 30px;
            margin-top: 30px;
            @media (max-width: 768px) {
                flex-direction: column;
            }
        `;
        const Starts = styled.span`
        color: #f3e034;
        & svg {
            margin: 0 5px;
            font-size: 20px;
        }
        `;
        const DownloadButton = styled.button`
        background-color: #05d5b4;
        border: none;
        padding: 8px 50px;
        border-radius: 8px;
        font-size: 20px;
        margin: 10px 5px;
        cursor: pointer;
        transition: .2s;
        text-decoration: none;
            color: #ffffff;
        &:hover {
            background-color: #03c4a6;
        }
        `;
    const PDes = styled.p`
        font-size: 18px;
    `;
    const P = styled.p`
        font-size: 20px;
    `;
    const Span = styled.span`
        margin-right: 15px;
    `;
    const H1 = styled.h1`
    @media (max-width: 768px) {
        text-align: center;
    }
    `;
    const DownloadParent = styled.div`
        width: fit-content;
        margin: 0 auto;
    `;

    return ( 
        <>
        {/* <Header title={'الكتب'} srcImg={"../images/User.jpg"} /> */}
            {book && <MainFrame>
            <BookTitle><HTitle>{book.bookName}</HTitle></BookTitle>
            <MainContent>
                <img src={`../images/${book.bookImage}`} alt="" />
                <div>
                    <H1>{book.bookName}</H1>
                    <Starts>
                    <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
                    </Starts>
                    <PDes>{book.description}</PDes>
                    <P>الكاتب: <Span>{book.authorName}</Span></P>
                    <P>صنف الكتاب: <Span>{book.categoryName}</Span></P>
                    <P>حجم الكتاب: <Span>{book.size}</Span></P>
                    <P>نوع الكتاب: <Span>PDF</Span></P>
                    <P>عدد مرات التحميل :<Span>{book.downloaded}</Span></P>
                    <DownloadParent>
                    <a href={`../pdf/${book.pdfBook}`} download onClick={() => handlerDownload() }><DownloadButton>تحميل</DownloadButton></a>

                    </DownloadParent>
                </div>
            </MainContent>
            </MainFrame>}
        </>
    );
}

export default OneBook;