import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

function Header({title, srcImg}) {
    // const { id } = useParams()
    const [books, setBooks] = useState(null);
    const [search, setSearch] = useState('');
    const [showed, setIsShowed] = useState(false);
    // const [title, setTitle] = useState(null);
    const location = useLocation();
    

    const Header = styled.header`
        padding: 15px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: calc(100% - 250px);
        /*width: 100%;*/
        float: left;
        background-color: white;
        box-shadow: 0 0 5px 0px #cccccc80;
        @media (max-width: 900px) {
            width: calc(100% - 80px);
            padding: 15px 10px;
        }
    `;
    const Span = styled.span`
        font-size: 23px;
        font-weight: bold;
        cursor: default;
        color: #688e88;
        display: block;
        @media (max-width: 700px) {
            font-size: 20px;
        }
    `;
    const Input = styled.input`
        padding: 10px;
        border-radius: 0px 4px 4px 0;
        width: 350px;
        box-shadow: 0 0 10px 0px #cccccc69;
        border: 1px solid #ccc;
        &::placeholder {
            background-color: #ffffff;
            color: #777d74;
            font-size: 18px;
        }
        &:focus {
            outline: none;
            border: 1px solid #bbb;
            box-shadow: 0 0 15px 0px #cccccc80;
        }
        
    @media (max-width: 900px) {
        display: none;
    }
    `;
    const Profile = styled.div`
        display: flex;
        align-items: center;
        gap: 10px;
        cursor: pointer;
    `;
    const Img = styled.img`
        border-radius: 100%;
        width: 50px;
        height: 50px;
        object-fit: cover;
        @media (max-width: 700px) {
            width: 40px;
            height: 40px;
        }
    `;
    const MLogo = styled.h1`
    color: #0dd6b8;
    text-align: center;
    width: 100%;
    margin: 0;
    font-size: 1.6em;
    display: none;
    @media (max-width: 900px) {
        display: block;
    }
    @media (max-width: 700px) {
        font-size: 1.25em;
    }
    `;
    const SubmitButton = styled.button`
    background-color: #05d5b4;
    border: none;
    padding: 7.5px 30px;
    border-radius: 5px 0 0 5px;
    font-size: 18px;
    margin: 10px 0;
    cursor: pointer;
    transition: .2s;
    color: white;
    &:hover {
        background-color: #03c4a6;
    }

    `;
    const Form = styled.form`
        position: relative;
    `;
    const SearchedPlace = styled.div`
        position: absolute;
        /*top: calc(100% + 20px);*/
        left: 0;
        /*transform: translateY(-50%);*/
        width: calc(100% - 30px);
        background-color: white;
        border: 1px solid #eee;
        padding: 15px;
        box-shadow: 0px 0px 3px #ddd;
        z-index: 99;
    `;
    const P = styled.p`
        & a {
            text-decoration: none;
            color: black;
        }
    `;
    function handlerSearch(e) {
        setIsShowed(true)
        setSearch(() => e.target.value)
        fetch(`http://localhost:8000/Books?bookName_like=^${e.target.value}&_limit=5`)
        .then((res) => res.json())
        .then((books) => {
            setBooks(books);
        })
        
    }
    return ( 
        <> 
            <Header>
            {/* <Header className="col-end-3 col-start-13 col-span-8"> */}
                <Span>{title}</Span>
                <Form action="">
                    <Input type='text' placeholder="إبحث هنا ..." value={search} onBlur={() => setIsShowed(false)} onChange={handlerSearch} />
                    {
                        showed && <SearchedPlace>
                                {books?.map((book, i) => <P key={i}><Link to={`/book/${book.id}`}>{book.bookName}</Link></P>)}
                            </SearchedPlace> 
                    }
                    <SubmitButton>بحث</SubmitButton>
                </Form>
                <MLogo>MediaStore</MLogo>
                <Profile>
                    <Img src={srcImg} />
                    يونس
                </Profile>
            </Header>
        </>
    );
}

export default Header;


// location.state.place = location.pathname.replace('/', '');
    // useEffect(() => {
    //   switch (location.state?.place) {
    //     case 'admin':
    //           setTitle('المسؤول');
    //           break;
    //     case `book`:
    //         setTitle('الكتب');
    //       break;
    //     case 'audio':
    //         setTitle('الصوتيات');
    //       break;
    //     case 'video':
    //         setTitle('الفيديو');
    //       break;
    //     case 'contact':
    //         setTitle('نسمعك');
    //       break;
    //     default :
    //         setTitle('الرئيسية');
    //       break;
    //   }
    //   switch (location.pathname.replace('/', '')) {
    //     case '':
    //           setTitle('الرئيسية');
    //           break;
    //     case `book`:
    //         setTitle('الكتب');
    //       break;
    //     case 'audio':
    //         setTitle('الصوتيات');
    //       break;
    //     case 'video':
    //         setTitle('الفيديو');
    //       break;
    //     case 'contact':
    //         setTitle('نسمعك');
    //       break;
    //     default :
    //         setTitle('المسؤول');
    //       break;
    //   }
    // }, [location])

    // useEffect(() => {
    //     fetch(`http://localhost:8000/Books?bookName_like=^${search}&_limit=5`)
    //     .then((res) => res.json())
    //     .then((books) => {
    //         setBooks(books);
    //     })
    // }, [search])