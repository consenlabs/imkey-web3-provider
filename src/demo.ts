import ImKeyProvider from "./index";
import Web3 from "web3";
import { RLPEncodedTransaction } from "web3-eth";

interface ProviderConnectInfo {
  readonly chainId: string;
}

const imkeyProvider = new ImKeyProvider({
  rpcUrl: "put your infura address here",
  chainId: 1,
  headers: {
    agent: "ios:25",
  },
});
imkeyProvider.enable();
const web3 = new Web3(imkeyProvider as any);

imkeyProvider.on("disconnect", (code: any, reason: any) => {
  console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`);
});

imkeyProvider.on("connect", (connectInfo: ProviderConnectInfo) => {
  console.log(
    `Ethereum Provider connected success, chainId: ${connectInfo.chainId}`
  );
});

const btn = document.createElement("button");
btn.innerText = "requestAccounts";
btn.addEventListener("click", (e) => {
  function showResult(error: Error, result: string[]) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  web3.eth.requestAccounts(showResult).then(console.log);
});

const btnBalance = document.createElement("button");
btnBalance.innerText = "Get Balance";
btnBalance.addEventListener("click", (e) => {
  web3.eth
    .getBalance("0x8663b811c9601db1c5a93e41b894196400c14ed6")
    .then(console.log);
});

const btnSignTransaction = document.createElement("button");
btnSignTransaction.innerText = "Sign Transaction";
btnSignTransaction.addEventListener("click", (e) => {
  function showResult(error: Error, result: RLPEncodedTransaction) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  web3.eth
    .signTransaction(
      {
        from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
        // gasPrice: "20000000008",
        // nonce: 8,
        // gas: "21000",
        to: "0x3535353535353535353535353535353535353535",
        value: "100000000000000000",
        // chainId: 3,
        // data: "",
      },
      showResult
    )
    .then(console.log);
});

const btnSendTransaction = document.createElement("button");
btnSendTransaction.innerText = "Send Transaction";
btnSendTransaction.addEventListener("click", (e) => {
  function showResult(error: Error, result: RLPEncodedTransaction) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  web3.eth
    .sendTransaction({
      from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
      // gasPrice: "20000000008",
      // nonce: 8,
      // gas: "21000",
      to: "0x3535353535353535353535353535353535353535",
      value: "100000000000000000",
      // chainId: 3,
      // data: "",
    })
    .then(console.log);
});

const btnSignMessage = document.createElement("button");
btnSignMessage.innerText = "Sign Message";
btnSignMessage.addEventListener("click", (e) => {
  function showResult(error: Error, signature: string) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", signature);
    }
  }

  web3.eth.personal
    .sign(
      "Hello imKey",
      "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
      "",
      showResult
    )
    .then(console.log)
    // @ts-ignore
    .catch((error) => {
      console.log("error message: ", error.message);
    });
});

const btnRequest_eth_requestAccounts = document.createElement("button");
btnRequest_eth_requestAccounts.innerText = "request eth_requestAccounts";
btnRequest_eth_requestAccounts.addEventListener("click", async (e) => {
  // const accounts = ethereum.enable();
  // const accounts2 = ethereum.send('eth_requestAccounts')
  // .then((ret: any) => {
  //     console.log(ret);
  // })
  // .catch((error: any) => {
  //     console.log
  // });
  // const accounts3 = await ethereum.sendAsync({ method: 'eth_requestAccounts' });
  // console.log("accounts3: ",accounts3);
  // const accounts4 = await ethereum.request({ method: 'eth_requestAccounts' })
  // console.log("accounts4: ",accounts4);

  imkeyProvider
    .request({ method: "eth_requestAccounts", params: [] })
    .then((ret) => {
      console.log(ret);
    })
    .catch((error) => {
      console.log;
    });
});

const btnRequest_eth_sign = document.createElement("button");
btnRequest_eth_sign.innerText = "request eth_sign";
btnRequest_eth_sign.addEventListener("click", async (e) => {
  imkeyProvider
    .request({
      method: "personal_sign",
      params: [
        "0x49206861766520313030e282ac",
        "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
      ],
    })
    .then((ret) => {
      console.log(ret);
    })
    .catch((error) => {
      console.log;
    });
});

const btnRequest_eth_signTransaction = document.createElement("button");
btnRequest_eth_signTransaction.innerText = "request eth_signTransaction";
btnRequest_eth_signTransaction.addEventListener("click", async (e) => {
  imkeyProvider
    .request({
      method: "eth_signTransaction",
      params: [
        {
          from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
          gasPrice: "0x4a817c808",
          nonce: 8,
          gas: "0x5208",
          to: "0x3535353535353535353535353535353535353535",
          value: "0x200",
          chainId: 3,
          data: "",
        },
      ],
    })
    .then((ret) => {
      console.log(ret);
    })
    .catch((error) => {
      console.log;
    });
});

// document.appendChild(btn);
document.body.append(btn);
document.body.append(btnBalance);
document.body.append(btnSignTransaction);
document.body.append(btnSignMessage);
document.body.append(btnSendTransaction);

document.body.append(document.createElement("br"));
document.body.append(btnRequest_eth_requestAccounts);
document.body.append(btnRequest_eth_sign);
document.body.append(btnRequest_eth_signTransaction);
