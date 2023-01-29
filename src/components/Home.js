import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Swiper from "swiper";
import Header from "./Header";


function Home() {
    const [books, setBooks] = useState(null); 
    const [psyBooks, setPsyBooks] = useState(null); 
    const [novelBooks, setnovelBooks] = useState(null); 
    
    useEffect(() => {
        // npx json-server --watch data/Category.json --port 8000
        fetch('http://localhost:8000/Books?_sort=downloaded&_order=desc')
        .then((res) => res.json())
        .then((book) => setBooks(book))
        
        fetch('http://localhost:8000/Books?_sort=downloaded&_order=desc&categoryName=تطوير الذات')
        .then((res) => res.json())
        .then((book) => setPsyBooks(book))

        fetch('http://localhost:8000/Books?_sort=downloaded&_order=desc&categoryName=روايات')
        .then((res) => res.json())
        .then((book) => setnovelBooks(book))
    }, [])
    function handlerDownload(id) {
        const views = ++books.views ;
        setBooks((prev) => ({...prev, views }))
        fetch(`http://localhost:8000/Books/${id}`, {
            method: "PUT",
            body :  JSON.stringify(books),
            headers: {
                "Content-Type": "application/json",  
                "Accept":       "application/json"
            }
        })
    }
    const Box = styled.div`
        width: 100%;
        overflow: hidden;
        border-radius: 5px;
        text-align: center;
        box-shadow: 0px 0px 1.5px 0px #ccc;
        padding-left: 13px;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;
        @media (max-width: 1200px) {
            width: 100%;
        
        }
        @media (max-width: 500px) {
            flex-direction: column;
            padding: 13px;
            width: 60vw;
        }
    `;
    const Img = styled.img`
        max-width: 100%;
        height: 100%;
    `;
    const Content = styled.div`
        position: relative;
        width: 50%;
        height: 100%;
        &:hover  div.download-box {
            transform: translateX(-50%) scale(1);
            opacity: 1;
        }
        & ~ div {
            width: 50%;
            padding-right: 10px;
        }
        @media (max-width: 500px) {
            width: 100%;
            & ~ div {
                width: 100%;
                padding-right: 10px;
            }
        }
    `;
    const Download = styled.div`
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%) scale(0);
        opacity: 0;
        overflow: hidden;
        background-color: #05d5b48a;/* #8a50f13d */
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .3s;
    `;
    const DownloadButton = styled.button`
        background-color: #05d5b4; /* #8a50f1 */
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 20px;
        
        margin: 10px 5px;
        cursor: pointer;
        transition: .2s;
        &:hover {
            background-color: #03c4a6;
        }
        & a {
            text-decoration: none;
            color: #ffffff;
        }

        `;
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
        
        `
        const MainContent = styled.div`
        display: grid;
        gap: 30px;
        justify-items: center;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        @media (max-width: 500px) {
            justify-content: center;
        
    }
        `;
        const MainText = styled.p`
            font-size: 25px;
            @media (max-width: 500px) {
                font-size: 23px;
                text-align: center;
            
        }
        `;
    const MainHead = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
    return ( 

        <>
            {/* <Header title={'الرئيسية'} srcImg={"./images/User.jpg"} /> */}
            <MainFrame>
            <MainHead>
                <MainText>أشهر الكتب</MainText>
                <DownloadButton><Link to={`/book`}>المزيد</Link></DownloadButton>
            </MainHead>
            <MainContent>
            {books?.map((book, i) => (
                i < 4 && <Box key={book.id}>
                <Content>
                    <Img src={`./images/${book.bookImage}`} />
                    <Download className="download-box">
                        <DownloadButton><a href={`./pdf/${book.pdfBook}`} target='_blank' rel="noreferrer">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h4>
                {book.bookName}  للكاتب <i>{book.authorName} </i>
                </h4>
                <DownloadButton><Link to={`/book/${book.id}`} download>التفاصيل</Link></DownloadButton>
                </div>
            </Box>
            ))}
            
        </MainContent>
        </MainFrame>
            <MainFrame>
            <MainHead>
                <MainText>تطوير الذات</MainText>
                <DownloadButton><Link to={`/book`}>المزيد</Link></DownloadButton>
            </MainHead>
            <MainContent>
            {psyBooks?.map((book, i) => (
                i < 4 && <Box key={book.id}>
                <Content>
                    <Img src={`./images/${book.bookImage}`} />
                    <Download className="download-box">
                        <DownloadButton><Link to={`/book/${book.id}`}>مشاهدة</Link></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h4>
                {book.bookName}  للكاتب <i>{book.authorName} </i>
                </h4>
                <DownloadButton><Link to={`/book/${book.id}`} download>التفاصيل</Link></DownloadButton>
                </div>
            </Box>
            ))}
            
        </MainContent>
        </MainFrame>
            <MainFrame>
            <MainHead>
                <MainText>روايات</MainText>
                <DownloadButton><Link to={`/book`}>المزيد</Link></DownloadButton>
            </MainHead>
            <MainContent>
            {novelBooks?.map((book, i) => (
                i < 4 && <Box key={book.id}>
                <Content>
                    <Img src={`./images/${book.bookImage}`} />
                    <Download className="download-box">
                        <DownloadButton><Link to={`/book/${book.id}`}>مشاهدة</Link></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h4>
                {book.bookName}  للكاتب <i>{book.authorName} </i>
                </h4>
                <DownloadButton><Link to={`/book/${book.id}`} download>التفاصيل</Link></DownloadButton>
                </div>
            </Box>
            ))}
            
        </MainContent>
        </MainFrame>
        </>
    );
}

export default Home;

{/* <Box>
                <Content>
                    <Img src="./images/1.png" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/2.jpg" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    الاب الغني الاب الفقير للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/1.png" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/2.jpg" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
        </MainContent>
        </MainFrame>
        <MainFrame>
        <MainText>كتب التنمية الذاتية</MainText>
            <MainContent>
            <Box>
                <Content>
                    <Img src="./images/1.png" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/1.png" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/2.jpg" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    الاب الغني الاب الفقير للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/1.png" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box>
            <Box>
                <Content>
                    <Img src="./images/2.jpg" />
                    <Download className="download-box">
                        <DownloadButton><a href="">مشاهدة</a></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h3>
                    علم النفس للكاتب <i>أحمد شوقي</i>
                </h3>
                <DownloadButton><a href="">تحميل</a></DownloadButton>
                </div>
            </Box> */}