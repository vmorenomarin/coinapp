import axios from "axios";
import React, { useEffect, useState } from "react";

export const Coin = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const answer = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=250&page=1&sparkline=false"
    );
    setCoins(answer.data);
  };

  const filters = coins.filter((item) => item.name.toLowerCase().includes( search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase()));
  return (
    <div>
      <div className="container">
        <h1 className="text-center fw-bold mt-5">SEARCH</h1>
        <div className="d-flex mt-5 justify-content-center align-items-center">
          <div className="col6">
            <form>
              <input
                className="form-control mb-2"
                type="text"
                placeholder="Type for a coin... "
                autoFocus
                onChange={(e) => setSearch(e.target.value)}
              />
            </form>
          </div>
        </div>
        <table className="table table-stripped">
          <thead className="bg-dark text-white text-start/* d */">
            <tr>
              <th>Name</th>
              <th>Logo</th>
              <th>Symbol</th>
              <th>Price</th>
              <th>Price Change %</th>
            </tr>
          </thead>
          <tbody>
            {filters.map((coin) => (
              <tr key={coin.id}>
                <td>{coin.name}</td>
                <td>
                  <img
                    src={coin.image}
                    alt={coin.name}
                    className="img-fluid"
                    style={{ width: "30px", height: "30px" }}
                  />
                </td>
                <td>{coin.symbol}</td>
                <td>{coin.current_price}</td>
                <td
                  className={
                    coin.price_change_percentage_24h < 0
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {Math.round(coin.price_change_percentage_24h*100)/100}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
