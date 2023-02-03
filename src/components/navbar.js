import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBook, faHeadset ,faPlay, faUser, faPhone, faGear } from '@fortawesome/free-solid-svg-icons'
import React from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { useState } from 'react';

const Navbar = ({isAdmin}) => {
    const location = useLocation()
    const [isClicked, setIsClicked] = useState(false);
    const [classLi, setClassLi] = useState(location.pathname.replace('/', ''));
    // todo: if hover on nav on small screen it will show up and all span wall diplayed
    const LeftNav = styled.nav`
        position: fixed;
        top: 0;
        width: 250px;
        height: 100%;
        background-color: #ffffff;
        z-index: 1000;
        padding: 15px 20px;
        box-shadow: 0 0 15px 0px #cccccc69;
        transition: 0.15s;

        @media (max-width: 1200px) {
            width: 200px;
            padding: 15px 10px;
        }
        @media (max-width: 900px) {
            width: 40px;
            padding: 15px 10px;
            transition: 0.3s;
            &:hover {
                width: 200px;
            }
            &:hover span {
                display: flex;
                gap: 5px;
                font-size: 15px;
            }
        }
    `;
    const Logo = styled.h1`
        color: #0dd6b8;
        text-align: center;
        width: 100%;
        margin-top: 0;
        font-size: 1.6em;
        opacity: 1;
        @media (max-width: 900px) {
            opacity: 0;
        }
    `;
    const Ul = styled.ul`
        list-style: none;
        margin: 0;
        padding: 0;
    `;
    const Li = styled.li`
        list-style: none;
        padding: 10px; 
        font-size: 19px;
        font-weight: 500;
        width: fit-content;
        & > * {
            text-decoration: none;
            color: #777d74;
            transition: 0.3s;
        }
        &.admin {
            position: relative;
            width: 100%;
        }
        &.${classLi} > * {
            color: #0dd6b8;
        }
        &:hover > * {
            color: #0dd6b8;
        }
        & svg {
            margin-left: 10px;
        }
        @media (max-width: 900px) {
            & svg {
                margin-left: 0px;
            }
        }
    `;
    const LinkSpan = styled.span`
        display: block;
        @media (max-width: 900px) {
            display: none;
        }
        
    `;

    const LinkA = styled.span`
        display: flex;
        align-items: center;
        cursor: pointer;
    `;
    const LinkG = styled.span`
        display: flex;
        align-items: center;
        cursor: pointer;
        padding: 10px 17px; 
        font-size: 19px;
        font-weight: 500;
        width: fit-content;
        & > * {
            text-decoration: none;
            color: #777d74;
            transition: 0.3s;
        }
    `;
    const LiC = styled.span`
        display: flex;
        align-items: center;
        cursor: pointer;
        
    `;
    const Dropdown = styled(Ul)`
        overflow: hidden;
        position: absolute;
        background-color: #cbceca3d;
        width: 100%;
        ${isClicked ? 'height: 150px;' : 'height: 0px;'}
        left: 2px;
        transition: 0.3s;
        & > li > a {
            text-decoration: none;
            color: #777d74;
            transition: 0.3s;
        }
        & > li:hover  * {
            color: #0dd6b8 !important;
        }
        @media (max-width: 900px) {
            left: 8px;
            padding-right: 5px;
        }
    `
    const DropdownParent = styled.div`
        position: relative;
        width: 100%;
    `

    return (
        <LeftNav>
        {/* <LeftNav className="col-span-4"> */}
            
            <Logo>
                MediaStore
            </Logo>
            <Ul className="links">
                <div className="link">
                    <Li className='home'><NavLink to="/" onClick={() => setClassLi("home")}> <LinkA  style={(isActive) => ({color: isActive ? '#0dd6b8': ''})}><FontAwesomeIcon icon={faHome} /><LinkSpan>الرئيسية</LinkSpan></LinkA> </NavLink></Li>
                    <Li className='book' ><NavLink to="/book" onClick={() => setClassLi("book")}> <LinkA style={(isActive) => ({color: isActive ? '#0dd6b8': ''})}><FontAwesomeIcon icon={faBook} /> <LinkSpan>الكتب</LinkSpan></LinkA> </NavLink></Li>
                    <Li className='audio' ><NavLink to="/audio" onClick={() => setClassLi("audio")}> <LinkA style={(isActive) => ({color: isActive ? '#0dd6b8': ''})}><FontAwesomeIcon icon={faHeadset} /><LinkSpan>الصوتيات</LinkSpan></LinkA> </NavLink></Li>
                    <Li className='video' ><NavLink to="/video" onClick={() => setClassLi("video")}> <LinkA style={(isActive) => ({color: isActive ? '#0dd6b8': ''})}><FontAwesomeIcon icon={faPlay} /><LinkSpan>الفيديوهات</LinkSpan></LinkA> </NavLink></Li>
                    {/* <Li className='contact' ><NavLink to="/contact" onClick={() => setClassLi("contact")}> <LinkA style={(isActive) => ({color: isActive ? '#0dd6b8': ''})}><FontAwesomeIcon icon={faPhone} /><LinkSpan>اتصل بنا</LinkSpan></LinkA> </NavLink></Li> */}
                    {isAdmin && <Li className='admin' onClick={() => setIsClicked((prev) => !prev)}>
                            <LiC><FontAwesomeIcon icon={faUser} /><LinkSpan>المسؤول</LinkSpan></LiC>
                            <Dropdown> 
                            <li>
                                <NavLink to="/admin/gbook" state={{place: 'admin'}} onClick={() => setClassLi("admin")}>
                                    <LinkG><FontAwesomeIcon icon={faGear} /><LinkSpan>ادارة الكتب</LinkSpan></LinkG>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink to="/admin/gaudio" state={{place: 'admin'}} onClick={() => setClassLi("admin")}>
                                    <LinkG><FontAwesomeIcon icon={faGear} /><LinkSpan>ادارة الصوتيات</LinkSpan></LinkG>
                                </NavLink>
                            </li>
                            <li>
                                <Link to="/admin/gvideo" state={{place: 'admin'}} onClick={() => setClassLi("admin")}>
                                    <LinkG><FontAwesomeIcon icon={faGear} /><LinkSpan>ادارة الفيديوهات</LinkSpan></LinkG>
                                </Link>
                            </li>
                            </Dropdown>
                        
                    </Li>}
                    
                </div>
            </Ul>
        </LeftNav>
    )
}

export default Navbar;