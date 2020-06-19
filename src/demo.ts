import ImKeyProvider from "./index";

const btn = document.createElement('button');
btn.innerText = "init";
btn.addEventListener('click', (e) => {
    let provider = new ImKeyProvider("");
    provider.eth.requestAccounts();
})
// document.appendChild(btn);
document.body.append(btn);
