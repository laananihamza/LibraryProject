import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import style from './addMedia.module.css'
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
        border-bottom: 1px solid #dddddd59;
    `;
    const Label = styled.label`
        display: block;
        margin: 10px 0;
        font-size: 17px;
    `;
    const Input = styled.input`
        padding: 10px;
        width: 95%;
        border-radius: 4px;
        border: 1px solid #eee;
        display: block;
        font-size: 17px;
        &::placeholder {
            background-color: #ffffff;
            color: #777d74;
            font-size: 18px;
        }
        &:focus {
            outline: none;
            border: 1px solid #ddd;
        }
        &[type=file] {
            position: relative;
            
        }
        &[type=file]::-webkit-file-upload-button {
            visibility: hidden;

        }
        &::before {
            content: 'Browser';
            position: absolute;
            background: #ddd;
            height: calc(100% - 6px);
            border-radius: 3px;
            padding: 5px 8px;
            outline: none;
            white-space: nowrap;
            -webkit-user-select: none;
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            display: flex;
            justify-content: center;
            align-items: center;
            top: -4px;
            left: 0;
        
          }
    `;
    const TextArea = styled.textarea`
        padding: 10px;
        width: 95%;
        height: 250px;
        border-radius: 4px;
        border: 1px solid #eee;
        display: block;
        font-size: 17px;

        &:focus {
            outline: none;
            border: 1px solid #ddd;
        }
    `
    const Add = styled.button`
        background-color: #05d5b4;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 17px;
        color: #ffffff;
        margin: 10px 5px;
        
        transition: .2s;
        &:hover {
            background-color: #03c4a6;

        }
        `
    const Reset = styled.button`
        background-color: #f5674fc2;
        border: none;
        padding: 8px 15px;
        border-radius: 8px;
        font-size: 17px;
        color: #ffffff;
        margin: 10px 5px;
        transition: .2s;
        &:hover {
            background-color: #f5674f;

        }
        `
        
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
export function AddAudio() {
    const [audio, setAudio] = useState({});
    const username = sessionStorage.getItem('user');
    const navigate = useNavigate()
    useEffect(() => {
        if (username === null) {
          navigate('/login')
        }
      }, [username])
    function handlSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:8000/Audio', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(audio)
            
        }).then(() => navigate('/admin/gaudio'))
    }

    const handleChange = (e) => {
        setAudio((audio) => ({...audio, downloaded: 0,[e.target.name] : e.target.value}))
    }
    
    return ( 
        <>
            <Main>
                <HeadTiltle><h3>اضافة صوت</h3></HeadTiltle>
                <form action="" onSubmit={handlSubmit}>
                    <Label htmlFor="Aname">اسم الصوت</Label>
                    <Input type='text' id="Aname" placeholder='اسم الصوت' name="Aname" onChange={handleChange} />
                    <Label htmlFor="Caudio">صنف الصوت</Label>
                    <Input type='text' id="Caudio" placeholder='صنف الصوت' name="Caudio" onChange={handleChange} />
                    <Label htmlFor="Arname">صاحب الصوت</Label>
                    <Input type='text' id="Arname" placeholder='صاحب الصوت' name="Arname" onChange={handleChange} />
                    <Label htmlFor="Aimage">صورة الصوت</Label>
                    <Input type='file' id="Aimage" name="Aimg" accept="image/*" onChange={(e) => setAudio((prev) => ({...prev, [e.target.name]: e.target.files[0].name}))}/>
                    <Label htmlFor="Apdf">ملف الصوت</Label>
                    <Input type='file' id="Apdf" name="Afile" accept="audio/*" onChange={(e) => setAudio((prev) => ({...prev, [e.target.name]: e.target.files[0].name, size: (e.target.files[0].size / 1048576).toFixed(2) + 'MB'}))} />
                    <Label>وصف للصوت</Label>
                    <TextArea name="description" onChange={handleChange}></TextArea>
                    <Add type="submit">أضف</Add>
                    <Reset type="reset">مسح</Reset>
                </form>
            </Main>
        </>
     );
}
export function EditAudio() {
    const { id } = useParams();
    const [audio, setAudio] = useState(null);
    
    const username = sessionStorage.getItem('user');
    const navigate = useNavigate()
    useEffect(() => {
        if (username === null) {
          navigate('/login')
        }
      }, [username])
    
    useEffect(() => {
        fetch(`http://localhost:8000/Audio/${id}`)
        .then((res) => res.json())
        .then((data) => setAudio(data))
    }, [id])
    const handleChange = (e) => {
        setAudio((audio) => ({...audio, [e.target.name] : e.target.value}))
    }
    // const refBook = useRef({});
    // refBook.current = book;
    function handleSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/Audio/${id}`, {
            method: 'PUT',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(audio)
            
        }).then(() => navigate('/admin/gaudio'))
    }

    return ( 
        <>
            {/* <Header title={'المسؤول'} srcImg={"../../images/User.jpg"} /> */}
            {audio && <div className={style.main}>
                <div className={style.HeadTiltle}><h3>اضافة كتاب</h3></div>
                <form action="" onSubmit={handleSubmit}>
                    <Label htmlFor="Aname">اسم الصوت</Label>
                    <Input type='text' id="Aname" placeholder='اسم الصوت' defaultValue={audio.Aname} name="Aname" onChange={handleChange} />
                    <Label htmlFor="Caudio">صنف الصوت</Label>
                    <Input type='text' id="Caudio" placeholder='صنف الصوت' defaultValue={audio.Caudio} name="Caudio" onChange={handleChange} />
                    <Label htmlFor="Arname">صاحب الصوت</Label>
                    <Input type='text' id="Arname" placeholder='صاحب الصوت' defaultValue={audio.Arname} name="Arname" onChange={handleChange} />
                    <Label htmlFor="Aimage">صورة الصوت<span style={{color: 'red'}}> * </span></Label>
                    <Input type='file' id="Aimage" name="Aimg" accept="image/*" defaultValue={``} onChange={(e) => setAudio((prev) => ({...prev, [e.target.name]: e.target.files[0].name}))}/>
                    <Label htmlFor="Apdf">ملف الصوت<span style={{color: 'red'}}> * </span></Label>
                    <Input type='file' id="Apdf" name="Afile" accept="audio/*" defaultValue={''} onChange={(e) => setAudio((prev) => ({...prev, [e.target.name]: e.target.files[0].name, size: (e.target.files[0].size / 1048576).toFixed(2) + 'MB'}))} />
                    <Label>وصف للصوت</Label>
                    <TextArea name="description" defaultValue={audio.description} onChange={handleChange}></TextArea>
                    <Add type="submit">تعديل</Add>
                    <Reset type="reset">مسح</Reset>
                </form>
            </div>}
        </>
    );
}
export function GetAudio() {
    let pages = [];
    const [Sortpages, setSortpages] = useState([]); 
    const [audios, setAudios] = useState(null);
    const [page, setPage] = useState(1);
    const [authors, setAuthors] = useState([]); 
    const [select, setSelect] = useState({
        type: '',
        author: '',
        sort: ''
    });
    useEffect(() => {
        // npx json-server --watch data/Category.json --port 8000
        fetch(`http://localhost:8000/Audio`)
        .then((res) => res.json())
        .then((audios) => {
            setAuthors(audios);
        })
    }, [])
    
    useEffect(() => {
        // npx json-server --watch data/Category.json --port 8000
        fetch(`http://localhost:8000/Audio?_page=${page}&_limit=12`)
        .then((res) => res.json())
        .then((books) => {
            setAudios(books);
        })
    }, [page])

    let types = authors?.map((audio, i) => audio.Caudio).filter((value, i, self) => self.indexOf(value) === i)
    let author = authors?.map((audio, i) => audio.Arname).filter((value, i, self) => self.indexOf(value) === i)

    const handleChange = (e) => {
        setSelect((list) => ({...list, [e.target.name]: e.target.value}))
    }

    function handlerSubmit(e) {
        e.preventDefault();
        fetch(`http://localhost:8000/Audio?Caudio_like=^${select.type}&Arname_like=^${select.author}&_sort=${select.sort}`)
        .then((res) => res.json())
        .then((book) => setAudios(book))
        for (let i = 1; i <= Math.ceil(audios?.length / 12); i++) {
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
                        <option value="">المؤلف</option>
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
            {audios?.map((audio, i) => (
            <Box key={audio.id}>
                <Content>
                    <Img src={`../audioImages/${audio.Aimg}`} />
                    <Download className="download-box">
                        <DownloadButton><a href={`/audio/${audio.id}`} target='_blank' rel="noreferrer">الاستماع</a></DownloadButton>
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
        </MainContent>
            <Pagin>
                {select.author === '' && select.type === '' ? pages?.map((p, i) => <PageButton key={i} onClick={() => setPage(p)}>{p}</PageButton>) : Sortpages?.map((p, i) => <PageButton key={i} onClick={() => setPage(p)}>{p}</PageButton>)}
            </Pagin>
        </MainFrame>
        </>
     );
}

