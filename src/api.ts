const BASE_URL = "https://api.coinpaprika.com/v1";
export const fetchcoins = () => fetch(`${BASE_URL}/coins`).then(response => response.json());

export const fetchCoinInfo = (coinId: string) => fetch(`${BASE_URL}/coins/${coinId}`).then(response => response.json());

export const fetchCoinPrice = (coinId: string) => fetch(`${BASE_URL}/tickers/${coinId}`).then(response => response.json());

export const fetchCoinHistory = (coinId: string) => {
    const endDate = Math.floor(Date.now() / 1000);
    const startDate = endDate - 60 * 60 * 23 * 7 * 1;
    return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}&start=${startDate}&end=${endDate}`)
        .then(response => {
            // fetch()로 부터 반환되는 Promise 객체는 HTTP error 상태를 reject하지 않습니다.
            if (!response.ok) {
                throw new Error("Price data not found.")
            }
            return response.json()
        })
        .catch(error => console.error(error));
}