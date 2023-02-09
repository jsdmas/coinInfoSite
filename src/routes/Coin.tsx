import { useQuery } from "@tanstack/react-query";
import { Link, useLocation, useParams, useMatch, Outlet } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Header from "../components/Header"
import LoaderDiv from "../components/LoaderDiv";
import PageName from "../components/PageName";

type TcoinId = {
    coinId: string
}
interface IRouteState {
    state: string
}
interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
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

const Container = styled.div`
    margin: 0 auto;    
    max-width: 480px;
    margin-top: 30px;
    font-weight: 400;
`;

const Overview = styled.div`
    border-radius: 15px;
    background-color: ${props => props.theme.textColor};
    padding: 15px;
    color: ${props => props.theme.bgColor};
    display: flex;
    align-items: center;
    justify-content: space-around;
    font-size: 12px;
    margin: 15px 0;
`;

const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 33%;
    span:nth-child(2){
        font-size: 16px;
    }
`;

const Description = styled.p`
`;

const Tabs = styled.div`
    color: ${props => props.theme.bgColor};
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
    margin: 10px 0;
`;

const Tab = styled.span<{ isActive: boolean }>`
    background-color: ${props => props.theme.textColor};
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px 0;
    color: ${props => props.isActive ? props.theme.accentColor : props.theme.bgColor};
    a{
        display: block;
        padding: 0 30px;
    }
`;

const Coin = () => {
    const { coinId } = useParams() as TcoinId;
    const { state } = useLocation() as IRouteState;
    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");
    const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(["Info", coinId], () => fetchCoinInfo(coinId));
    const { isLoading: tickersLoading, data: tickersData } = useQuery<IPriceData>(["tickers", coinId], () => fetchCoinPrice(coinId), { refetchInterval: 5000 });
    const loading = infoLoading || tickersLoading;

    return (
        <>
            <Header mainTitle={state ? state : loading ? "loading..." : infoData?.name} />
            <PageName pageName={state ? state : loading ? "loading..." : infoData?.name} />
            {loading ? <LoaderDiv /> : (
                <Container>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>{infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>${tickersData?.quotes.USD.price.toFixed(4)}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to='chart'>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to='price'>Price</Link>
                        </Tab>
                    </Tabs>
                    <Outlet />
                </Container>
            )}
        </>
    );
};

export default Coin;