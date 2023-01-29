import { Link } from "react-router-dom";
import styled from "styled-components";
const MainFrame = styled.div`
        // width: calc(100% - 355px);
        // float: left;
        // background-color: white;
        // border-radius: 10px;
        // box-shadow: 0 0 10px 0px #cccccc69;
        // margin-top: 25px;
        // margin-left: 10px;
        // padding: 15px;
        // @media (max-width: 1200px) {
        //         width: calc(100% - 280px);
            
        // }
        
        // @media (max-width: 900px) {
        //         width: calc(100% - 110px);
            
        // }
        width: calc(100% - 30px);
    float: left;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 0 10px 0px #cccccc69;
    margin-top: 25px;
    margin-left: 10px;
    padding: 15px;
    height: calc(100vh + 100px);
    position: absolute;
    top: calc(0px - 86px);
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
        
        `
const NotFound = () => {
    return ( 
        <MainFrame className="not-found">
            <h2>404 Not Found</h2>
            <h2>Sorry</h2>
            <p>That page not found ..</p>
            <Link to="/"> Back to Home </Link>
        </MainFrame>
     );
}
 
export default NotFound;