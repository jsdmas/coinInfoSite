import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoinPrice } from "../api";
import LoaderDiv from "../components/LoaderDiv";
type TChartProps = {
    coinId: string
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

const boxFade = keyframes`
    from{
        opacity: 0;
    }
    to{
        opacity: 1;
    }
`;

const Container = styled.div`
    animation: ${boxFade} 1.25s;
`;

const OverView = styled.div`
    margin: 30px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.theme.textColor};
    color: ${props => props.theme.bgColor};
    width: 60%;
    transition: .6s ease-in-out;
    border-radius:15px;
    height: 4vh;
    span{
        color: ${props => props.theme.accentColor};
    }
`;

const Price = () => {
    const { coinId } = useParams() as TChartProps;
    const { isLoading, data } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinPrice(coinId), { refetchInterval: 5000 });
    return (
        <>
            {isLoading ? <LoaderDiv /> : (
                <Container key={data?.id}>
                    <OverView>change 30m&nbsp;&nbsp;&nbsp;<span>{data?.quotes.USD.percent_change_30m}</span></OverView>
                    <OverView>change 1h&nbsp;&nbsp;&nbsp;<span>{data?.quotes.USD.percent_change_1h}</span></OverView>
                    <OverView>change 6h&nbsp;&nbsp;&nbsp;<span>{data?.quotes.USD.percent_change_6h}</span></OverView>
                    <OverView>change 12h&nbsp;&nbsp;&nbsp;<span>{data?.quotes.USD.percent_change_12h}</span></OverView>
                    <OverView>change 24h&nbsp;&nbsp;&nbsp;<span>{data?.quotes.USD.percent_change_24h}</span></OverView>
                </Container>
            )}

        </>
    );
};

export default Price;