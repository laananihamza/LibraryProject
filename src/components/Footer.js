import styled from "styled-components";


function Footer({isRegister}) {

    const Footer = styled.footer`
    padding: 15px;
    width: ${isRegister ? '100%' :'calc(100% - 300px)'};
    text-align: center;
    float: left;
    margin-top: 20px;
    background-color: white;
    box-shadow: 0 0 5px 0px #cccccc80;
    @media (max-width: 900px) {
        width: ${isRegister ? '100%' : 'calc(100% - 80px)'};
        padding: 15px 10px;
    }
    `;
    return ( 
        <> 
            <Footer>
                Create by LB  &copy; جميع الحقوق محفوظة {new Date().getFullYear()}
                
            </Footer>
        </>
    );
}

export default Footer;