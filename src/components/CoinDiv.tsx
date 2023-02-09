import { Link } from "react-router-dom"
import styled from "styled-components"

interface Icoin {
    id: string
    name: string
    symbol: string
}

const CoinContainer = styled.div`
    max-width: 480px;
    width: 100%;
    height: 5vh;
    border: 2px solid ${props => props.theme.textColor};
    border-radius: 10px;
    color:${props => props.theme.textColor};
    margin: 10px auto;
    font-size: 20px;
    font-weight: 400;
    display: flex;
    align-items: center;
    height: 7vh;
    padding-left: 10px;
    a{
        display: block;
        width: 100%;
    }
`;

const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;


const CoinDiv = ({ id, name, symbol }: Icoin) => {
    return (
        <>
            <CoinContainer>
                <Link to={id} state={name}>
                    <Img src={`https://coinicons-api.vercel.app/api/icon/${symbol.toLowerCase()}`} />
                    {name} &rarr;
                </Link>
            </CoinContainer>
        </>
    );
};

export default CoinDiv;