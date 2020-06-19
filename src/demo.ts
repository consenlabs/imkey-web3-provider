import ImKeyProvider from "./index";

let web3 = new ImKeyProvider("");
const btn = document.createElement('button');
btn.innerText = "init";
btn.addEventListener('click', (e) => {
    web3.eth.requestAccounts();
});

const btnBalance = document.createElement('button');
btnBalance.innerText = "Get Balance";
btnBalance.addEventListener('click', (e) => {
    web3.eth.getBalance("0x8663b811c9601db1c5a93e41b894196400c14ed6")
        .then(console.log);
});

// document.appendChild(btn);
document.body.append(btn);
document.body.append(btnBalance);

