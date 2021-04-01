import ImKeyProvider from "./index";
import Web3 from "web3";
import { RLPEncodedTransaction } from "web3-eth";
import abi from "ethereumjs-abi";
import BN from "bignumber.js";

const APPROVE_METHOD = "approve(address,uint256)";

// export const toBN = (x): BN => {
//   if (isNaN(Number(x))) return new BN(0);
//   if (x instanceof BN) return x;

//   if (typeof x === "string") {
//     if (x.indexOf("0x") === 0 || x.indexOf("-0x") === 0) {
//       return new BN(x.replace("0x", ""), 16);
//     }
//   }
//   return new BN(x);
// };

// export function isHexPrefixed(str) {
//   return str.slice(0, 2) === "0x";
// }

// export function addHexPrefix(str: string) {
//   if (typeof str !== "string") {
//     return str;
//   }
//   return isHexPrefixed(str) ? str : `0x${str}`;
// }

interface ProviderConnectInfo {
  readonly chainId: string;
}

// const _getData = (spender) => {
//   const value = toBN(2).pow(256).minus(1).toString();
//   const encoded = abi.simpleEncode(APPROVE_METHOD, spender, value);
//   const data = addHexPrefix(encoded.toString("hex"));
//   return data;
// };

// const imkeyProvider = new ImKeyProvider({
//   rpcUrl: "https://eth-mainnet.token.im",
//   chainId: 1,
//   headers: {
//     agent: "ios:2.4.2:2",
//   },
// });
// imkeyProvider.enable();
// const web3 = new Web3(imkeyProvider as any);

// // allowanceTest();
// imkeyProvider.on("disconnect", (code: any, reason: any) => {
//   console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`);
// });

// imkeyProvider.on("connect", (connectInfo: ProviderConnectInfo) => {
//   console.log(
//     `Ethereum Provider connected success, chainId: ${connectInfo.chainId}`
//   );
// });

// const btn = document.createElement("button");
// btn.innerText = "requestAccounts";
// btn.addEventListener("click", (e) => {
//   function showResult(error: Error, result: string[]) {
//     if (error != null) {
//       console.log("show error: ", error);
//     } else {
//       console.log("show result: ", result);
//     }
//   }

//   web3.eth.requestAccounts(showResult).then(console.log);
// });

// const btnBalance = document.createElement("button");
// btnBalance.innerText = "Get Balance";
// btnBalance.addEventListener("click", (e) => {
//   web3.eth
//     .getBalance("0x8663b811c9601db1c5a93e41b894196400c14ed6")
//     .then(console.log);
// });

// const btnSignTransaction = document.createElement("button");
// btnSignTransaction.innerText = "Sign Transaction";
// btnSignTransaction.addEventListener("click", (e) => {
//   function showResult(error: Error, result: RLPEncodedTransaction) {
//     if (error != null) {
//       console.log("show error: ", error);
//     } else {
//       console.log("show result: ", result);
//     }
//   }

//   web3.eth
//     .signTransaction(
//       {
//         from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
//         // gasPrice: "20000000008",
//         // nonce: 8,
//         // gas: "21000",
//         to: "0x3535353535353535353535353535353535353535",
//         value: "100000000000000000",
//         // chainId: 3,
//         // data: "",
//       },
//       showResult
//     )
//     .then(console.log);
// });

// const btnSendTransaction = document.createElement("button");
// btnSendTransaction.innerText = "Send Transaction";
// btnSendTransaction.addEventListener("click", (e) => {
//   function showResult(error: Error, result: RLPEncodedTransaction) {
//     if (error != null) {
//       console.log("show error: ", error);
//     } else {
//       console.log("show result: ", result);
//     }
//   }

//   web3.eth
//     .sendTransaction({
//       from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
//       // gasPrice: "20000000008",
//       // nonce: 8,
//       // gas: "21000",
//       to: "0x3535353535353535353535353535353535353535",
//       value: "100000000000000000",
//       // chainId: 3,
//       // data: "",
//     })
//     .then(console.log);
// });

// const btnSignPersonalMessage = document.createElement("button");
// btnSignPersonalMessage.innerText = "Sign Personal Message";
// btnSignPersonalMessage.addEventListener("click", (e) => {
//   function showResult(error: Error, signature: string) {
//     if (error != null) {
//       console.log("show error: ", error);
//     } else {
//       console.log("show result: ", signature);
//     }
//   }

//   web3.eth.personal
//     .sign(
//       "Hello imKey",
//       "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
//       "",
//       showResult
//     )
//     .then(console.log)
//     // @ts-ignore
//     .catch((error) => {
//       console.log("error message: ", error.message);
//     });
// });

// const btnSignMessage = document.createElement("button");
// btnSignMessage.innerText = "Sign Message";
// btnSignMessage.addEventListener("click", (e) => {
//   function showResult(error: Error, signature: string) {
//     if (error != null) {
//       console.log("show error: ", error);
//     } else {
//       console.log("show result: ", signature);
//     }
//   }

//   web3.eth
//     .sign(
//       "Hello imKey",
//       "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
//       showResult
//     )
//     .then(console.log)
//     // @ts-ignore
//     .catch((error) => {
//       console.log("error message: ", error.message);
//     });
// });

// const btnRequest_eth_requestAccounts = document.createElement("button");
// btnRequest_eth_requestAccounts.innerText = "request eth_requestAccounts";
// btnRequest_eth_requestAccounts.addEventListener("click", async (e) => {
//   // const accounts = ethereum.enable();
//   // const accounts2 = ethereum.send('eth_requestAccounts')
//   // .then((ret: any) => {
//   //     console.log(ret);
//   // })
//   // .catch((error: any) => {
//   //     console.log
//   // });
//   // const accounts3 = await ethereum.sendAsync({ method: 'eth_requestAccounts' });
//   // console.log("accounts3: ",accounts3);
//   // const accounts4 = await ethereum.request({ method: 'eth_requestAccounts' })
//   // console.log("accounts4: ",accounts4);

//   imkeyProvider
//     .request({ method: "eth_requestAccounts", params: [] })
//     .then((ret) => {
//       console.log(ret);
//     })
//     .catch((error) => {
//       console.log;
//     });
// });

// const btnRequest_eth_sign = document.createElement("button");
// btnRequest_eth_sign.innerText = "request eth_sign";
// btnRequest_eth_sign.addEventListener("click", async (e) => {
//   imkeyProvider
//     .request({
//       method: "eth_sign",
//       params: [
//         "0x49206861766520313030e282ac",
//         "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
//       ],
//     })
//     .then((ret) => {
//       console.log(ret);
//     })
//     .catch((error) => {
//       console.log;
//     });
// });

// const btnRequest_eth_signTransaction = document.createElement("button");
// btnRequest_eth_signTransaction.innerText = "request eth_signTransaction";
// btnRequest_eth_signTransaction.addEventListener("click", async (e) => {
//   imkeyProvider
//     .request({
//       method: "eth_signTransaction",
//       params: [
//         {
//           from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
//           gasPrice: "0x4a817c808",
//           nonce: 8,
//           gas: "0x5208",
//           to: "0x3535353535353535353535353535353535353535",
//           value: "0x200",
//           chainId: 3,
//           data: "",
//         },
//       ],
//     })
//     .then((ret) => {
//       console.log(ret);
//     })
//     .catch((error) => {
//       console.log;
//     });
// });

// document.appendChild(btn);
// document.body.append(btn);
// document.body.append(btnBalance);
// document.body.append(btnSignTransaction);
// document.body.append(btnSignPersonalMessage);
// document.body.append(btnSignMessage);
// document.body.append(btnSendTransaction);

// document.body.append(document.createElement("br"));
// document.body.append(btnRequest_eth_requestAccounts);
// document.body.append(btnRequest_eth_sign);
// document.body.append(btnRequest_eth_signTransaction);

declare global {
  interface Window {
    imKeyManager: any;
    ethereum: ImKeyProvider;
    ethereumProvider: ImKeyProvider;
    web3: Web3;
  }
}
(async function (window) {
  "use strict";

  const { chainId, rpcUrl, headers, accounts } = window.imKeyManager.accounts();
  const imkeyProvider = new ImKeyProvider({
    // rpcUrl: "https://kovan.infura.io/v3/e35ac016a10548f1b4a835a1cd72d17a",
    // rpcUrl: 'https://eth-mainnet.token.im',
    rpcUrl,
    chainId,
    // headers: {
    //   agent: 'ios:2.4.2:2',
    // },
    headers,
    accounts,
  });

  // const Web3 = require('web3')

  function initWeb3() {
    try {
      imkeyProvider.enable();

      window.ethereum = window.ethereumProvider = imkeyProvider;

      const web3Window = new Web3(imkeyProvider);
      window.web3 = web3Window;

      // for web3.js 1.0 givenProvider
      window.web3.givenProvider = window.ethereum;
      window.web3.eth.givenProvider = window.ethereum;

      // window.top.imToken = imkeyProvider
      // window.imToken = imkeyProvider
      // window.user
      web3.eth.accounts = accounts;
      window.ethereum.selectedAddress = accounts[0];
      window.web3.eth.defaultAccount = accounts[0];

      window.ethereum.isImToken = true;

      // window.ethereum._isConnected = true;
      // window.ethereum.isMetaMask = true
      // ethereum.isMetaMask = true
      ethereum.isConnected = () => {
        return true;
      };

      // web3.currentProvider = imkeyProvider
      // web3.currentProvider.selectedAddress = accounts[0];
      // web3.currentProvider.address = accounts[0];
      console.log("init web3 success: ", accounts);
      return true;
    } catch (err) {
      console.log(JSON.stringify(err));
      return false;
    }
  }

  function tryInitWeb3Again() {
    let isSuccess = initWeb3();
    if (!isSuccess) {
      setTimeout(tryInitWeb3Again, 300);
    }
  }

  tryInitWeb3Again();

  // }
  // test2()
})(window);
