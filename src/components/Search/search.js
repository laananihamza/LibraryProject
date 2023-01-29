import { Link } from "react-router-dom";
import styled from "styled-components";

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
        background-color: #05d5b48a;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: .3s;
    `;
    const DownloadButton = styled.button`
        background-color: #05d5b4;
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
        
        `;
        const Select = styled.select`
        padding: 15px;
        border-radius: 8px;
        border: none;
        margin: 15px 10px;
        box-shadow: 0 0 9px 0px #e5e5e5eb;
        &:focus-visible{
            outline: none;
        }
        `;
        const Submit = styled(DownloadButton)`
            color: white;
        `;
        const Form = styled.form`
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 15px 0;
            flex-wrap: wrap;
        `;
        const PageButton = styled(DownloadButton)`
            color: white;
            font-size: 16px;
        `;
        const Pagin = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        margin: 15px 0;
        flex-wrap: wrap;
        `;
        
function Search({searchs}) {
    return ( 
        <>
        <MainFrame>
            <MainContent>
            {searchs?.bookName!== undefined && searchs?.map((search, i) => (
            <Box key={search.id}>
                <Content>
                    <Img src={`./images/${search.bookImage}`} />
                    <Download className="download-box">
                        <DownloadButton><Link to={`/book/${search.id}`}>مشاهدة</Link></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h4>
                {search.bookName}  للكاتب <i>{search.authorName} </i>
                </h4>
                <DownloadButton><Link to={`/book/${search.id}`} download>التفاصيل</Link></DownloadButton>
                </div>
            </Box>
            ))}
            {/* {searchs.audioName!== undefined && searchs?.map((search, i) => (
            <Box key={search.id}>
                <Content>
                    <Img src={`./images/${search.bookImage}`} />
                    <Download className="download-box">
                        <DownloadButton><Link to={`/book/${search.id}`}>مشاهدة</Link></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h4>
                {book.bookName}  للكاتب <i>{book.authorName} </i>
                </h4>
                <DownloadButton><Link to={`/book/${book.id}`} download>التفاصيل</Link></DownloadButton>
                </div>
            </Box>
            ))} */}
        </MainContent>
            <Pagin>
                {/* {select.author === '' && select.type === '' ? pages?.map((p, i) => <PageButton key={i} onClick={() => setPage(p)}>{p}</PageButton>) : Sortpages?.map((p, i) => <PageButton key={i} onClick={() => setPage(p)}>{p}</PageButton>)} */}
            </Pagin>
        </MainFrame>
        </>
    );
}

export default Search;