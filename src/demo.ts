import ImKeyProvider from "./index";

let web3 = new ImKeyProvider();
const btn = document.createElement('button');
btn.innerText = "requestAccounts";
btn.addEventListener('click', (e) => {
    function showResult(error: Error, result: string[]) {
        if (error != null) {
            console.log("show error: ", error);
        } else {
            console.log("show result: ", result);
        }
    }
    web3.eth.requestAccounts(showResult)
        .then(console.log);
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
        from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
        gasPrice: "20000000008",
        nonce: 8,
        gas: "21000",
        to: '0x3535353535353535353535353535353535353535',
        value: "512",
        chainId: 28,
        data: ""
    }).then(console.log);
});

const btnSignMessage = document.createElement('button');
btnSignMessage.innerText = "Sign Message";
btnSignMessage.addEventListener('click', (e) => {

    function showResult(error: Error, signature: string) {
        if (error != null) {
            console.log("show error: ", error);
        } else {
            console.log("show result: ", signature);
        }
    }
    web3.eth.sign("Hello world", "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",showResult)
        .then(console.log)
        .catch(error => {
            console.log("error meesage: ", error.message);
        });
});

// document.appendChild(btn);
document.body.append(btn);
document.body.append(btnBalance);
document.body.append(btnSignTransaction);
document.body.append(btnSignMessage);
