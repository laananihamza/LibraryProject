import { useRef, useState } from "react";
import style from './addMedia.module.css'
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
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
export function AddBook() {
    const [books, setBooks] = useState({});
    const username = sessionStorage.getItem('user');
    const navigate = useNavigate()
    useEffect(() => {
        if (username === null) {
          navigate('/login')
        }
      }, [username])
    function handlSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8000/Books', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(books)
            
        }).then(() => navigate('/admin/gbook'))
    }

    const handleChange = (e) => {
        setBooks((book) => ({...book, downloaded: 0,[e.target.name] : e.target.value}))
    }

    return ( 
        <>
        {/* <Header title={'المسؤول'} srcImg={"../../images/User.jpg"} /> */}
            <div className={style.main}>
                <div className={style.HeadTiltle}><h3>اضافة كتاب</h3></div>
                <form action="" onSubmit={handlSubmit}>
                    <label className={style.label} htmlFor="Bname">اسم الكتاب</label>

                    <input type='text' className={style.input} id="Bname" placeholder='اسم الكتاب' name="bookName" onChange={handleChange} />

                    <label className={style.label} htmlFor="CBook">صنف الكتاب</label>
                    <input type='text' className={style.input} id="CBook" placeholder='صنف الكتاب' name="categoryName" onChange={handleChange} />
                    <label className={style.label} htmlFor="Aname">اسم الكاتب</label>
                    <input type='text' className={style.input} id="Aname" placeholder='اسم الكاتب' name="authorName" onChange={handleChange}  /> 
                    <label className={style.label} htmlFor="image">صورة الكتاب</label>
                    <input type='file' className={style.input} id="image" name="bookImage" accept="image/*" onChange={(e) => setBooks((prev) => ({...prev, [e.target.name]: e.target.files[0].name}))}/>
                    <label className={style.label} htmlFor="pdf">ملف الكتاب</label>
                    <input type='file' className={style.input} id="pdf" name="pdfBook" accept="application/pdf"  onChange={(e) => setBooks((prev) => ({...prev, [e.target.name]: e.target.files[0].name, size: (e.target.files[0].size / 1048576).toFixed(2) + 'MB'} ))} />
                    <label className={style.label}>وصف للكتاب</label>
                    <textarea className={style.textarea} placeholder="اكتب وصفا مفيدا للكتاب..." name="description" onChange={handleChange}></textarea>
                    <button type="submit" className={style.add}>أضف</button>
                    <button type="reset" className={style.reset}>مسح</button>
                </form>
            </div>
        </>
    );
}
export function EditBook() {
    const { id } = useParams();
    const [book, setBook] = useState({});
    
    const username = sessionStorage.getItem('user');
    const navigate = useNavigate()
    useEffect(() => {
        if (username === null) {
          navigate('/login')
        }
      }, [username])
    
    useEffect(() => {
        fetch(`http://localhost:8000/Books/${id}`)
        .then((res) => res.json())
        .then((data) => setBook(data))
    }, [id])
    const handleChange = (e) => {
        setBook((book) => ({...book, [e.target.name] : e.target.value}))
    }
    // const refBook = useRef({});
    // refBook.current = book;
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/Books/${id}`, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(book)
            
        }).then(() => navigate('/admin/gbook'))
    }

    return ( 
        <>
            {/* <Header title={'المسؤول'} srcImg={"../../images/User.jpg"} /> */}
            {book && <div className={style.main}>
                <div className={style.HeadTiltle}><h3>اضافة كتاب</h3></div>
                <form action="" onSubmit={handleSubmit}>
                    <label className={style.label} htmlFor="Bname">اسم الكتاب</label>
                    <input type='text' className={style.input} defaultValue={book.bookName} id="Bname" placeholder='اسم الكتاب' name="bookName" onChange={handleChange} />
                    <label className={style.label} htmlFor="CBook">صنف الكتاب</label>
                    <input type='text' className={style.input} defaultValue={book.categoryName} id="CBook" placeholder='صنف الكتاب' name="categoryName" onChange={handleChange} />
                    <label className={style.label} htmlFor="Aname">اسم الكاتب</label>
                    <input type='text' className={style.input} defaultValue={book.authorName} id="Aname" placeholder='اسم الكاتب' name="authorName" onChange={handleChange}  />
                    <label className={style.label} htmlFor="image">صورة الكتاب</label>
                    <input type='file' className={style.input} defaultValue={book.bookImage} id="image" name="bookImage" accept="image/*" onChange={(e) => setBook((prev) => ({...prev, [e.target.name]: e.target.files[0].name}))}/>
                    <label className={style.label} htmlFor="pdf">ملف الكتاب</label>
                    <input type='file' className={style.input} defaultValue={book.pdfBook} id="pdf" name="pdfBook" accept="application/pdf"  onChange={(e) => setBook((prev) => ({...prev, [e.target.name]: e.target.files[0].name, size: (e.target.files[0].size / 1048576).toFixed(2) + 'MB'} ))} />
                    <label className={style.label}>وصف للكتاب</label>
                    <textarea className={style.textarea} defaultValue={book.description} placeholder="اكتب وصفا مفيدا للكتاب..." name="description" onChange={handleChange}></textarea>
                    
                    <button type="submit" className={style.add}>تعديل</button>
                    <button type="reset" className={style.reset}>مسح</button>
                </form>
            </div>}
        </>
    );
}

export function GetBooks() {
    let pages = [];
    const [Sortpages, setSortpages] = useState([]); 
    const [books, setBooks] = useState(null);
    const [page, setPage] = useState(1);
    const [authors, setAuthors] = useState([]); 
    const [select, setSelect] = useState({
        type: '',
        author: '',
        sort: ''
    });
    useEffect(() => {
        // npx json-server --watch data/Category.json --port 8000
        fetch(`http://localhost:8000/Books`)
        .then((res) => res.json())
        .then((books) => {
            setAuthors(books);
        })
    }, [])
    
    useEffect(() => {
        // npx json-server --watch data/Category.json --port 8000
        fetch(`http://localhost:8000/Books?_page=${page}&_limit=12`)
        .then((res) => res.json())
        .then((books) => {
            setBooks(books);
        })
    }, [page])

    let types = authors?.map((book, i) => book.categoryName).filter((value, i, self) => self.indexOf(value) === i)
    // let types = ['تطوير الذات', 'روايات', 'العلوم الإسلامية']
    let author = authors?.map((book, i) => book.authorName).filter((value, i, self) => self.indexOf(value) === i)

    const handleChange = (e) => {
        setSelect((list) => ({...list, [e.target.name]: e.target.value}))
    }

    function handlerSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/Books?categoryName_like=^${select.type}&authorName_like=^${select.author}&_sort=${select.sort}`)
        .then((res) => res.json())
        .then((book) => setBooks(book))
        for (let i = 1; i <= Math.ceil(books?.length / 12); i++) {
            setSortpages([i])
        }
    }

    // console.log(authors.length < 12 ? 1 : Math.ceil(authors.length / 12))
    for (let i = 1; i <= Math.ceil(authors.length / 12); i++) {
        pages.push(i)
    }
    


    return ( 
        <>
            {/* <Header title={'الكتب'} srcImg={"./images/User.jpg"} /> */}
            <MainFrame>
            <MainHead>
                <Form action="" onSubmit={handlerSubmit}>
                    <Select name="type" id="" value={select.type} onChange={handleChange}>
                        <option value="">الصنف</option>
                        {types?.map((t, i) => (
                            <option value={t} key={i}>{t}</option>
                        ))}
                    </Select>
                    <Select name="author" id="" value={select.author} onChange={handleChange}>
                        <option value="">الكاتب</option>
                        {author?.map((a, i) => (
                            <option value={a} key={i}>{a}</option>
                        ))}
                    </Select>
                    <Select name="sort" id="" value={select.sort} onChange={handleChange}>
                        <option value="">الترتيب</option>
                        <option value="downloaded&_order=desc">اعلى التحميلات</option>
                        <option value="downloaded">اقل التحميلات</option>
                        <option value="bookName">اسم تصاعديا</option>
                        <option value="bookName&_order=desc">اسم تناقصيا</option>
                    </Select>
                    <Submit>تطبيق</Submit>
                </Form>
            </MainHead>
            <MainContent>
            {books?.map((book, i) => (
            <Box key={book.id}>
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
            <Pagin>
                {select.author === '' && select.type === '' ? pages?.map((p, i) => <PageButton key={i} onClick={() => setPage(p)}>{p}</PageButton>) : Sortpages?.map((p, i) => <PageButton key={i} onClick={() => setPage(p)}>{p}</PageButton>)}
            </Pagin>
        </MainFrame>
        </>
     );
}