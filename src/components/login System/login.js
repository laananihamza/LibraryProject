import styled from 'styled-components';
import style from '../addMedia.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
  & span {
    color: #03d1b0;
  }
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
const NewUser = styled.p`
  text-align: center;
  font-size: 18px;
  & a {
    color: #05d5b4;
    text-decoration: none;
  }
`;
const ErrorMsg = styled.p`
  background-color: #ff110047;
  color: red;
  padding: 15px;
  border-radius: 10px;

`;
function Login() {
  const [user, setUser] = useState(null);
  const [allUsers, setUsers] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const username = sessionStorage.getItem('user');
  useEffect(() => {
    if (username !== null) {
      navigate('/')
    }
  }, [username])
  function handlerChange(e) {
    setUser((prev) => ({...prev, [e.target.name] : e.target.value}));
  }
  function handlerSubmit(e) {
    e.preventDefault();
    if (user !== null) {
      fetch(`http://localhost:9000/Users?email=${user.email}&password=${user.password}`)
      .then((res) => res.json())
      .then((data) => {
        if(data.length === 0) {
          setError(true)
        }else {
          setError(false)
          setUsers(data)
          sessionStorage.setItem('user', data[0].email)
          navigate('/')
        }
      })
    }else{
      setError(true)
    }
  }
    return ( 
      <Main>
          <Form action="" onSubmit={handlerSubmit}>
          <Title>?????????? ???????????? ?????? <span>????????????</span></Title>
                {error && <ErrorMsg>???????????? ?????????????????? ???? ???????? ???????? ?????? ??????????</ErrorMsg>}
                    <label className={style.label} htmlFor="email">???????????? ??????????????????</label>
                    <input type='email' className={style.input} id="email" placeholder="???????????? ??????????????????..." name="email" onChange={handlerChange} />
                    <label className={style.label} htmlFor="password">???????? ????????</label>
                    <input type='password' className={style.input} id="password" placeholder="???????? ????????..." name="password" onChange={handlerChange}  /> 
                    {/* <label className={style.label} htmlFor="cPass">?????????? ???????? ????????</label>
                    <input type='password' className={style.input} id="cPass" placeholder="?????????? ???????? ????????..." name="cpassword"  /> */}
                    <AddNew type="submit">????????????</AddNew>
                    <NewUser>?????? ???????? ???????? ???????? <span><Link to={'/register'}>?????? ?????????? </Link></span>.</NewUser>
                </Form>
        </Main> 
    );
}

export default Login;