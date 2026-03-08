async function getPrices() {

    const url =
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,dogecoin&vs_currencies=usd";

    const response = await fetch(url);

    const data = await response.json();

    const btc = document.getElementById("btc");
    const eth = document.getElementById("eth");
    const doge = document.getElementById("doge");

    if (btc) btc.innerText = "$ " + data.bitcoin.usd;
    if (eth) eth.innerText = "$ " + data.ethereum.usd;
    if (doge) doge.innerText = "$ " + data.dogecoin.usd;

    const update = document.getElementById("updateTime");

    if (update) {
        update.innerText = "Last Updated: " + new Date().toLocaleTimeString();
    }

}

const refreshBtn = document.getElementById("refresh");

if (refreshBtn) {
    refreshBtn.addEventListener("click", getPrices);
}

getPrices();


async function loadMarket() {

    const url =
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1";

    const response = await fetch(url);

    const data = await response.json();

    let rows = "";

    data.forEach(coin => {

        rows += `
<tr>
<td>${coin.name}</td>
<td>$ ${coin.current_price}</td>
</tr>
`;

    });

    const table = document.getElementById("marketData");

    if (table) {
        table.innerHTML = rows;
    }

}

loadMarket();