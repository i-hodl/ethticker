fetch('https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false')
  .then(response => response.json())
  .then(data => {
    const priceChange = data.market_data.price_change_percentage_24h;
    const price = data.market_data.current_price.usd;
    setBackgroundBasedOnPriceChange(priceChange, price);
    setPrice(price);
  })
  .catch(error => {
    console.error('Error fetching Ethereum price', error);
  });

function setBackgroundBasedOnPriceChange(priceChange, price) {
  const body = document.querySelector('body');
  const priceDisplay = document.querySelector('#price');
  const percentageDisplay = document.querySelector('#percentage-change');

  if (priceChange > 0) {
    body.style.backgroundImage = 'url(up-background.png)';
    percentageDisplay.textContent = `+${priceChange.toFixed(2)}%`;
    percentageDisplay.style.color = 'green';
  } else {
    body.style.backgroundImage = 'url(down-background.png)';
    percentageDisplay.textContent = `${priceChange.toFixed(2)}%`;
    percentageDisplay.style.color = 'red';
  }

  priceDisplay.textContent = `$${price.toFixed(2)}`;
}

$(document).ready(function() {
    setInterval(function() {
        $.get("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd", function(data) {
            const price = data.ethereum.usd;
            setBackgroundBasedOnPriceChange(priceChange, price);
        });
    }, 10000);
});
