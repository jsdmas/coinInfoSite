import styled from "styled-components";

interface IPageName {
    pageName?: string
}

const PageContainer = styled.div`
    margin : 0 auto;
    margin-top: 12vh;
    max-width: 480px;
    display: flex;
    justify-content: center;
    font-size: 50px;
    font-weight: 500;
    color: ${props => props.theme.accentColor};
`;

const PageName = ({ pageName }: IPageName) => {
    return (
        <PageContainer>
            {pageName}
        </PageContainer>
    );
};

export default PageName;