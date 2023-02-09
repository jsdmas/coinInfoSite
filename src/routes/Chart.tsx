import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";
import LoaderDiv from "../components/LoaderDiv";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

type TChartProps = {
    coinId: string
}

interface IHistorycal {
    time_open: number
    time_close: number
    open: string
    high: string
    low: string
    close: string
    volume: string
    market_cap: number
}

interface IChartData {
    x: number,
    y: [
        open: string,
        high: string,
        low: string,
        close: string
    ]
}

const Chart = () => {

    const isDark = useRecoilValue(isDarkAtom);
    const { coinId } = useParams() as TChartProps;
    const { isLoading, data } = useQuery<IHistorycal[]>(["coinHistory", coinId], () => fetchCoinHistory(coinId), {
        refetchInterval: 5000,
    });
    const chartData = data?.map<IChartData>((coin) => {
        return { x: coin.time_close, y: [coin.open, coin.high, coin.low, coin.close] }
    });
    return (
        <>
            {isLoading ? <LoaderDiv /> : !chartData ? "Price Not Found" :
                <ApexCharts type="candlestick" series={[{ data: chartData ?? [] }]} options={{
                    theme: {
                        mode: isDark ? "dark" : "light"
                    },
                    chart: {
                        type: 'candlestick',
                        height: 350,
                        toolbar: {
                            show: false
                        },
                    },
                    xaxis: {
                        type: 'datetime'
                    },
                    yaxis: {
                        tooltip: {
                            enabled: true,
                        },
                    }
                }} />}
        </>
    );
}
export default Chart;