// import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';

/* React Router */
import {Route, Routes, useLocation, Link} from 'react-router-dom';
import Books from './components/fetch data/Books';
// import Header from './components/Header';
import Footer from './components/Footer';
import { useEffect, useState } from 'react';
import { AddBook, EditBook, GetBooks } from './components/GBook';
import Audio from './components/fetch data/Audio';
import AddAudio from './components/AddAudio';
import Video from './components/fetch data/Video';
import AddVideo from './components/AddVideo';
import Home from './components/Home';
import Login from './components/login System/login';
import OneBook from './components/OneMedia/OneBook';
import styled from 'styled-components';
import SignUp from './components/login System/register';
import NotFound from './components/NotFound';

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
    const LoginButton = styled.button`
    background-color: #05d5b4;
    border: none;
    padding: 7.5px 30px;
    border-radius: 5px;
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
        @media (max-width: 900px) {
          display: none;
      }
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
        height: 350px;
        overflow-y: scroll;
    `;
    const P = styled.p`
        & a {
            text-decoration: none;
            color: black;
        }
    `;


function App() {
    const [title, setTitle] = useState(null);
    const [books, setBooks] = useState(null);
    const [search, setSearch] = useState('');
    const [showed, setIsShowed] = useState(false);
    const [user, setUser] = useState([]);
    const [isLogin, setIsLogin] = useState(false);
    const location = useLocation()
    let path = location.pathname.replace('/', '');
    let adminEmail = 'hl@admin.com';
    const Useremail = sessionStorage.getItem('user');

    useEffect(() => {
        if (Useremail !== null) {
            fetch(`http://localhost:9000/Users?email=${Useremail}`)
        .then((res) => res.json())
        .then((data) => {
                setIsLogin(true)
                setUser(data[0])
                console.log(Useremail);
            }
        )
        }
    }, [Useremail])

    function handlerSearch(e) {
        setIsShowed(true)
        setSearch(() => e.target.value)
        fetch(`http://localhost:8000/Books?bookName_like=^${e.target.value}&_limit=12`)
        .then((res) => res.json())
        .then((books) => {
            setBooks(books);
        })
    }
    function handlerSubmit(e) { 
        e.preventDefault();
        fetch(`http://localhost:8000/Books?bookName_like=^${search}`)
        .then((res) => res.json())
        .then((books) => {
            setBooks(books);
        })
    }
    return (
        // <Router>
        <>
        <div className="App" onClick={() => setIsShowed(false)}>
            {path === 'login' || path === 'register' ? null : <Header>
            {/* <Header className="col-end-3 col-start-13 col-span-8"> */}
                <Span>مكتبتي</Span>
                <Form action="" onSubmit={handlerSubmit}>
                    <Input type='text' placeholder="إبحث هنا ..." value={search} /*onBlur={}*/ onChange={handlerSearch} />
                    {
                        showed && <SearchedPlace>
                                {books?.map((book, i) => <P key={i}><Link to={`book/${book.id}`}>{book.bookName}</Link></P>)}
                            </SearchedPlace> 
                    }
                    {/* <SubmitButton>بحث</SubmitButton> */}
                </Form>
                <MLogo>MediaStore</MLogo>
                {isLogin ? <Profile>
                    <Img src={ './images/User.jpg'} />
                    {`${user?.FName} ${user?.LName}`}
                </Profile> : <Link to='/login'><LoginButton>Login</LoginButton></Link>}
            </Header>}
        {path === 'login' || path === 'register' ? null : <Navbar isAdmin={adminEmail === user?.email? true :false} />}
        
        {/* <Books /> */}
        <div className="content">
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/book' element={<GetBooks />} />
                <Route path='/book/:id' element={<OneBook />} />
                <Route path='/admin/gbook' element={<Books />} />
                <Route path='/admin/gbook/add' element={<AddBook />} />
                <Route path='/admin/gbook/:id/edit' element={<EditBook />} />
                <Route path='/admin/gaudio' element={<Audio />} />
                <Route path='/admin/gaudio/add' element={<AddAudio />} />
                <Route path='/admin/gvideo' element={<Video />} />
                <Route path='/admin/gvideo/add' element={<AddVideo />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<SignUp />} />
                <Route path='/*' element={<NotFound />} />
            </Routes>

            
        </div>
        </div>
        <Footer isRegister={path === 'login' || path === 'register' ? true : false}/>

        </>
    // </Router>
    );
}

export default App;
