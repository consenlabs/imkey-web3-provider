import ImKeyProvider from "./index";

let web3 = new ImKeyProvider("");
const btn = document.createElement('button');
btn.innerText = "requestAccounts";
btn.addEventListener('click', (e) => {
    web3.eth.requestAccounts();
});

const btnBalance = document.createElement('button');
btnBalance.innerText = "Get Balance";
btnBalance.addEventListener('click', (e) => {
    web3.eth.getBalance("0x8663b811c9601db1c5a93e41b894196400c14ed6")
        .then(console.log);
});

const btnSignTransaction = document.createElement('button');
btnSignTransaction.innerText = "Sign Transaction";
btnSignTransaction.addEventListener('click', (e) => {
    web3.eth.signTransaction({
        from: "0xEB014f8c8B418Db6b45774c326A0E64C78914dC0",
        gasPrice: "20000000000",
        gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: "1000000000000000000",
        data: ""
    }).then(console.log);
});

const btnSignMessage = document.createElement('button');
btnSignMessage.innerText = "Sign Message";
btnSignMessage.addEventListener('click', (e) => {
    web3.eth.sign("Hello world", "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe")
        .then(console.log);
});

// document.appendChild(btn);
document.body.append(btn);
document.body.append(btnBalance);
document.body.append(btnSignTransaction);
document.body.append(btnSignMessage);
