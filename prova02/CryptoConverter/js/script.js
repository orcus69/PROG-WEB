const dropList = document.querySelectorAll(".drop-list select"),
fromCurrency = document.querySelector(".from select"),
toCurrency = document.querySelector(".to select"),
getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in crypto_code){
        let selected;
        if(i == 0){
            selected = currency_code == "USD" ? "selected" : ""
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
            imgTag.src = `./img/flags/${crypto_code[code]}.png`
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
    

    let url = `https://api.coingecko.com/api/v3/exchange_rates`;

    fetch(url).then(response => response.json()).then(result => {
        let toValueRate = result['rates'][toCurrency.value.toLowerCase()]['value'];
        let fromValueRate = result['rates'][fromCurrency.value.toLowerCase()]['value'];
        let fromValue = fromCurrency.value
        let toValue = toCurrency.value

        //Calcula preço do dolar em real
        let dolarPrice = result['rates']['brl']['value']/result['rates']['usd']['value'];

        console.log("Dolar: R$"+fromValue)

        if(fromValue == 'BTC'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${toValueRate * amountValue} ${toValue}`
        }else if(fromValue == 'ETH' && toValue == 'USD'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['usd']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'ETH' && toValue == 'BRL'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['brl']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'ETH' && toValue == 'ETH'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${ amountValue} ${toValue}`
        }else if(fromValue == 'ETH' && toValue == 'BTC'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['btc']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'USD' && toValue == 'BTC'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['btc']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'USD' && toValue == 'ETH'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['eth']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'USD' && toValue == 'USD'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${ amountValue} ${toValue}`
        }else if(fromValue == 'USD' && toValue == 'BRL'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( dolarPrice) * amountValue} ${toValue}`
        }else if(fromValue == 'BRL' && toValue == 'BTC'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['btc']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'BRL' && toValue == 'ETH'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${( result['rates']['eth']['value']/ fromValueRate) * amountValue} ${toValue}`
        }else if(fromValue == 'BRL' && toValue == 'BRL'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${ amountValue} ${toValue}`
        }else if(fromValue == 'BRL' && toValue == 'USD'){
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${amountValue / dolarPrice} ${toValue}`
        }else{
            exchangeRateTxt.innerText = `${amountValue} ${fromValue} = ${(dolarPrice * amountValue)} ${toValue}`
        }

        

    }).catch(()=>{
        exchangeRateTxt.innerText = "Algo deu errado!"
    })
}