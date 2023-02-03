import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";

import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "../Header";
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
        
        @media (max-width: 930px) {
                width: calc(100% - 110px);
            
        }
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
    const Img = styled.img`
        max-width: 100%;
        height: 100%;
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
        const MainHead = styled.div`
        display: flex;
        justify-content: space-between;
        align-items: center;
    `;
        const MainContent = styled.div`
            display: flex;
            align-items: flex-start;
            gap: 30px;
            margin-top: 30px;
            & img {
                width: 20%;
            }
            & div {
                width: 80%;
            }
            @media (max-width: 768px) {
                flex-direction: column;
                align-items: center;
                & img {
                    width: 50%;
                }
                & div {
                    width: 100%;
                    text-align: center;
                }
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
        & a {
            text-decoration: none;
            color: #ffffff;
        }
        &:hover {
            background-color: #03c4a6;
        }
        `;
    const PDes = styled.p`
        font-size: 18px;
        line-height: 2;
    `;
    const DescriptionContent = styled.div`
        margin-top: 20px;
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
    const Description = styled(Span)`
        font-size: 25px;
        position: relative;
        &::before {
            content: '';
            position: absolute;
            width: 50%;
            height: 2px;
            background-color: #07b196;
            bottom: -20%;
        }
    `;

    const SlideFrame = styled.div`
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
        
        @media (max-width: 930px) {
                width: calc(100% - 110px);
            
        }
    `;
    const SlideContent = styled.div`
    // width: calc(100% - 355px);
    //     float: left;
    //     @media (max-width: 1200px) {
    //             width: calc(100% - 280px);
            
    //     }
        
    //     @media (max-width: 930px) {
    //             width: calc(100% - 110px);
            
    //     }
    padding-bottom: 20px;
        overflow-x: scroll;
    `;
    const Slides = styled.div`
        display: flex;
        width: calc(400px * 6);
        gap: 15px;
        @media (max-width: 930px) {
            width: calc(350px * 6);
        }
        @media (max-width: 768px) {
            width: calc(300px * 6);
        }
        @media (max-width: 500px) {
            width: calc(250px * 6);
        }
    `;

function OneAudio() {
    const { id } = useParams();
    const [audio, setAudio] = useState(null);
    const [sameCat, setSameCat] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:8000/Audio/${id}`).then((res) => res.json()).then((data) => setAudio(data))
        // fetch(`http://localhost:8000/Books?categoryName=${book?.categoryName}&_sort=downloaded&_order=desc`).then((res) => res.json()).then((data) => setSameCat(data))
        
    }, [id])
    useEffect(() => {
        // fetch(`http://localhost:8000/Books/${id}`).then((res) => res.json()).then((data) => setBook(data))
        fetch(`http://localhost:8000/Audio?Caudio=${audio?.Caudio}&_sort=downloaded&_order=desc`).then((res) => res.json()).then((data) => setSameCat(data))
        
    }, [audio])
    const Slides = styled.div`
        display: flex;
        width: calc(400px * ${sameCat?.length === 0 ? 1 :  sameCat?.length});
        gap: 15px;
        @media (max-width: 930px) {
            width: calc(350px * ${sameCat?.length === 0 ? 1 :  sameCat?.length});
        }
        @media (max-width: 768px) {
            width: calc(300px * ${sameCat?.length === 0 ? 1 :  sameCat?.length});
        }
        @media (max-width: 500px) {
            width: calc(250px * ${sameCat?.length === 0 ? 1 :  sameCat?.length});
        }
    `;
     function handlerDownload() {
        const download = ++audio.downloaded ;
        setAudio((prev) => ({...prev, downloaded: download }))
        fetch(`http://localhost:8000/Audio/${id}`, {
            method: "PUT",
            body :  JSON.stringify(audio),
            headers: {
                "Content-Type": "application/json",  
                "Accept":       "application/json"
            }
        })
    } 
    
    
    return ( 
        <>
        {/* <Header title={'الكتب'} srcImg={"../images/User.jpg"} /> */}
            {audio && <MainFrame>
            <BookTitle><HTitle>{audio.Aname}</HTitle></BookTitle>
            <MainContent>
                <img src={`../audioImages/${audio.Aimg}`} alt="" />
                <div>
                    <H1>{audio.Aname}</H1>
                    {/* <Starts>
                    <FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} /><FontAwesomeIcon icon={faStar} />
                    </Starts> */}
                    <P>المؤلف: <Span>{audio.Arname}</Span></P>
                    <P>صنف الصوت: <Span>{audio.Caudio}</Span></P>
                    <P>حجم الصوت: <Span>{audio.size}</Span></P>
                    <P>نوع الصوت: <Span>MP3</Span></P>
                    <P>عدد مرات التحميل :<Span>{audio.downloaded}</Span></P>
                    <DownloadParent>
                    <a href={`../Audio/${audio.Afile}`} download onClick={() => handlerDownload() }><DownloadButton>تحميل</DownloadButton></a>

                    </DownloadParent>
                </div>
            </MainContent>
                    <DescriptionContent>
                        <Description>وصف الصوت : </Description>
                        <PDes>{audio.description}</PDes>
                    </DescriptionContent>
            </MainFrame>}

            <SlideFrame>
                <MainHead>
                    <Description>قد يعجبك</Description>
                    <DownloadButton><Link to={`/audio`}>المزيد</Link></DownloadButton>
                </MainHead>
        <SlideContent>
        {/* {isLoading.psyBooks === true ? <Loading><div></div><div></div><div></div></Loading> : */}
            <Slides>
            {sameCat && sameCat?.map((audio, i) => (
                i < 6 && <Box key={audio.id}>
                <Content>
                    <Img src={`../audioImages/${audio.Aimg}`} />
                    <Download className="download-box">
                        <DownloadButton><Link to={`/audio/${audio.id}`}>الاستماع</Link></DownloadButton>
                    </Download>
                </Content>
                <div>
                <h4>
                {audio.Aname}  للمؤلف <i>{audio.Arname} </i>
                </h4>
                <DownloadButton><Link to={`/audio/${audio.id}`}>التفاصيل</Link></DownloadButton>
                </div>
            </Box>
            ))}
            
        </Slides>
        {/* } */}
        </SlideContent>
        </SlideFrame>
        </>
    );
}

export default OneAudio;