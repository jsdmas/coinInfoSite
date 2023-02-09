import styled from "styled-components";
import { Helmet } from "react-helmet";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "../atoms";
import { useLocation, useNavigate } from "react-router-dom";

interface ITitle {
    mainTitle?: string
}


const PageHeader = styled.header`
    position: fixed;
    /* top :0 으로 고정시켜줘야 밀려나지 않는다. */
    top:0;
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 8vh;
    width: 100%;
    background-color: ${props => props.theme.bgColor};
    box-shadow: 0px 3px 30px rgba(0,0,0,.3) ;
    z-index: 99;
`;

const BtnStyle = styled.button`
    background-color: ${props => props.theme.textColor};
    cursor: pointer;
    color : ${props => props.theme.bgColor};
    font-size: 18px;
    padding: 4px 10px;
`;

const Header = ({ mainTitle }: ITitle) => {
    const { pathname } = useLocation();
    // get value
    const isDark = useRecoilValue(isDarkAtom);
    // modify value
    const setDarkAtom = useSetRecoilState(isDarkAtom);
    const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
    // backSpace
    const navigate = useNavigate();
    return (
        <>
            <Helmet>
                <title>{mainTitle}</title>
            </Helmet>
            <PageHeader>
                {/* backSpaceBtn */}
                <BtnStyle onClick={() => navigate(-1)}> &larr; </BtnStyle>
                {/* homeBtn */}
                {pathname === "/" ? null : <BtnStyle onClick={() => navigate("/CoinPage")}>Home</BtnStyle>}
                {/* dark on/off */}
                <BtnStyle onClick={toggleDarkAtom}> {isDark ? "☀︎" : "☽"} </BtnStyle>
            </PageHeader>
        </>
    );
};

export default Header;