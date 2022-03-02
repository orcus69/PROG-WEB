const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in crypto_code){
        let selected;
        if(i == 0){
            selected = currency_code == "USDT" ? "selected" : ""
        }else if(i == 1){
            selected = currency_code == "BTC" ? "selected" : ""
        }

        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;

        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }

    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element){
    for(code in crypto_code){
        if(code == element.value){
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `img/flags/${crypto_code[code]}.svg`
        }
    }
}

window.addEventListener("load", getExchangeRate());

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

const exchangeIcon = document.querySelector(".drop-list .icon");

exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = tempCode
    loadFlag(fromCurrency)
    loadFlag(toCurrency)
    getExchangeRate();
});

function getExchangeRate(){
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    exchangeRateTxt.innerText = "Carregando conversão...";

    const amount = document.querySelector(".amount input");
    let amountValue = amount.value;

    if(amountValue == "" || amountValue == "0"){
        amount.value = "1";
        amountValue = 1;
    }
    

    let url = `http://rest.coinapi.io/v1/exchangerate/${fromCurrency.value}/${toCurrency.value}`;

    fetch(url, {
        "headers": {'X-CoinAPI-Key': '13B68BC3-DE8D-45DE-8E60-074AA43A3BFF'}
      }).then(response => response.json()).then(result => {
        
        exchangeRateTxt.innerText = `${amountValue} ${fromCurrency.value} = ${(result.rate * amountValue)} ${toCurrency.value}`
    }).catch(()=>{
        exchangeRateTxt.innerText = "Algo deu errado!"
    })
}