import { useQuery } from "@tanstack/react-query";
import { fetchcoins } from "../api";
import CoinDiv from "../components/CoinDiv";
import Header from "../components/Header";
import LoaderDiv from "../components/LoaderDiv";
import PageName from "../components/PageName";

interface Icoins {
    id: string
    is_active: boolean
    is_new: boolean
    name: string
    rank: number
    symbol: string
    type: string
}

const Home = () => {
    const { isLoading, data } = useQuery<Icoins[]>(["allcoins"], fetchcoins);
    return (
        <>
            <Header mainTitle="Home" />
            <PageName pageName="Coins" />
            {isLoading ? <LoaderDiv /> : (
                data?.slice(0, 100).map(coin => <CoinDiv key={coin.id} id={coin.id} name={coin.name} symbol={coin.symbol} />))}
        </>
    );
};

export default Home;