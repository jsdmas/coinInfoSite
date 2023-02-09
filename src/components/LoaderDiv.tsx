import styled from "styled-components";

interface ILoaderProps {
    text?: string
}

const Loader = styled.div`
    font-size: 46px;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%,-50%);
    color: ${props => props.theme.accentColor};
    background-color: ${props => props.theme.bgColor};
    z-index: 99;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const LoaderDiv = ({ text = "Loading..." }: ILoaderProps) => {
    return <Loader>{text}</Loader>
};

export default LoaderDiv;