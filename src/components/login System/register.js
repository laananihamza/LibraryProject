import styled from 'styled-components';
import style from '../addMedia.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
const Form = styled.form`
  background-color: white;
  width: 40%;
  padding: 30px;
  box-shadow: 0 0 10px 0px #cccccc69;
  border-radius: 15px;
  position: relative;
  @media (max-width: 1199px) {
    width: 50%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
`;
const Main = styled.div`
  padding: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;
const Title = styled.p`
  font-size: 2rem;
  text-align: center;
  font-weight: 500;
`;
const Span = styled.span`
  color: #03d1b0;
`;
const AddNew = styled.button`

  background-color: #05d5b4;
  border: none;
  padding: 8px 15px;
  border-radius: 8px;
  font-size: 17px;
  color: #ffffff;
  margin: 15px auto;
  cursor: pointer;
  transition: .2s;
  width: 80%;
display: block;
  &:hover {
    background-color: #03c4a6;

  }
`;
const UserExists = styled.p`
  text-align: center;
  font-size: 18px;
  & a {
    color: #05d5b4;
    text-decoration: none;
  }
`;
function SignUp() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  function handlerChange(e) {
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}));
  }
  function handlerSubmit(e) {
    e.preventDefault();
    fetch(`http://localhost:9000/Users`, {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(user)
    }).then(() => navigate('/login'))
  }
    return ( 
      <Main>
          <Form action="" onSubmit={handlerSubmit}>
          <Title>مرحبا في <Span>مكتبتي</Span></Title>
                    <label className={style.label} htmlFor="Fname">اسم الاول</label>

                    <input type='text' className={style.input} id="Fname" placeholder='اسم الاول...' name="FName" onChange={handlerChange} />
                    <label className={style.label} htmlFor="Lname">اسم الاخير</label>

                    <input type='text' className={style.input} id="Lname" placeholder='اسم الاخير...' name="LName" onChange={handlerChange} />

                    <label className={style.label} htmlFor="email">البريد الاكتروني</label>
                    <input type='email' className={style.input} id="email" placeholder="البريد الاكتروني..." name="email" onChange={handlerChange} />
                    <label className={style.label} htmlFor="password">كلمة السر</label>
                    <input type='password' className={style.input} id="password" placeholder="كلمة السر..." name="password" onChange={handlerChange}  /> 
                    {/* <label className={style.label} htmlFor="cPass">تأكيد كلمة السر</label>
                    <input type='password' className={style.input} id="cPass" placeholder="تأكيد كلمة السر..." name="cpassword"  /> */}
                    <AddNew type="submit">تسجيل</AddNew>
                    <UserExists>هل انت مستخدم بالفعل؟ <span><Link to={'/login'}>تسجيل الدخول</Link></span>.</UserExists>
                </Form>
        </Main> 
    );
}

export default SignUp;