import ImKeyProvider from "./index";

import abi from "ethereumjs-abi";
import BN from "bignumber.js";
const APPROVE_METHOD = "approve(address,uint256)";

export const toBN = (x): BN => {
  if (isNaN(Number(x))) return new BN(0);
  if (x instanceof BN) return x;

  if (typeof x === "string") {
    if (x.indexOf("0x") === 0 || x.indexOf("-0x") === 0) {
      return new BN(x.replace("0x", ""), 16);
    }
  }
  return new BN(x);
};

export function isHexPrefixed(str) {
  return str.slice(0, 2) === "0x";
}

export function addHexPrefix(str: string) {
  if (typeof str !== "string") {
    return str;
  }
  return isHexPrefixed(str) ? str : `0x${str}`;
}

interface ProviderConnectInfo {
  readonly chainId: string;
}

const _getData = (spender) => {
  const value = toBN(2).pow(256).minus(1).toString();
  const encoded = abi.simpleEncode(APPROVE_METHOD, spender, value);
  const data = addHexPrefix(encoded.toString("hex"));
  return data;
};
import SINGLE_CALL_BALANCES_ABI from 'single-call-balance-checker-abi';
const imkeyProvider = new ImKeyProvider({
  rpcUrl: "https://mainnet.infura.io/v3/2012498d93094f5f939f580516a92236",
  chainId: 1,
  // headers: {
  //   agent: "ios:2.4.2:2",
  // },
});
imkeyProvider.enable();
// const web3 = new Web3(imkeyProvider as any);

// allowanceTest();
imkeyProvider.on("disconnect", (code: any, reason: any) => {
  console.log(`Ethereum Provider connection closed: ${reason}. Code: ${code}`);
});

imkeyProvider.on("connect", (connectInfo: ProviderConnectInfo) => {
  console.log(
    `Ethereum Provider connected success, chainId: ${connectInfo.chainId}`
  );
});
import TransportWebUSB from "./hw-transport-webusb/TransportWebUSB";
import ethApdu  from "./common/apdu";
import ETH  from "./hw-app-eth/Eth";
import Transport from "./hw-transport/Transport";
import hidFraming from "./hw-transport-webusb/hid-framing";
const webusbbtn = document.createElement("button");
webusbbtn.innerText = "webusb Test";
webusbbtn.addEventListener("click", async (e) => {
  // const eth_apdu = ethApdu();
  // eth_apdu.select_applet()
  // let res = eth_apdu.select_applet().toString("hex");
  // console.log("resresresresresresresresres1:"+res)
  // res = eth_apdu.get_xpub("44'/60'/0'/0/0",false).toString("hex")
  // console.log("resresresresresresresresres2:"+res)
  // res = eth_apdu.get_xpub("44'/60'/0'/0/0",true).toString("hex")
  // console.log("resresresresresresresresres3:"+res)
  // let resArr = eth_apdu.prepare_sign(new Buffer("6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff","hex"));
  // for (let i = 0; i < resArr.length; i++) {
  //   console.log("resArr[i]", "=> " + resArr[i].toString("hex"));
  // }

  let  transport = await TransportWebUSB.create();
  let eth = new ETH(transport)
 await eth.getAddress("m/44'/60'/0'/0/0").then((ethres)=>{
    console.log("eth.getAddress:"+ethres.address)
  });
  await eth.signMessage("m/44'/60'/0'/0/0","Hello imKey","0x3267b1042d5ffc693D78211ce1fA521d2d631724",true).then((ethres)=>{
    console.log("eth.signPersonalMessage:"+ethres)
    console.log(ethres)
  });

  const transaction= {
      data: "",
      gasLimit: "189000",
      gasPrice: "20000000008",
      nonce: "8",
      to: "0x3535353535353535353535353535353535353535",
      value: "512",
      chainId: "28",
      path: "m/44'/60'/0'/0/0"
  }
  const preview = {
      payment: "0.01 ETH",
      receiver: "0xE6F4142dfFA574D1d9f18770BF73814df07931F3",
      sender: "0x3267b1042d5ffc693D78211ce1fA521d2d631724",
      fee: "0.0032 ether"
  }

  await eth.signTransaction(transaction).then(
    (ethres)=>{
         console.log("ethres.signature:"+ethres.signature)
         console.log("ethres.txhash:"+ethres.txhash)
         console.log(ethres)
       }
  )





  // console.log(transport)
  // transport.setDebugMode(true);
  // let buffer = Buffer.alloc(1 );
  // const response = await transport.exchange(new Buffer("80E200005E6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff","hex"))
  // for(let i=0;i<10;i++){

  // const response = await transport.send(
  //   0x00,
  //   0xa4,
  //   0x04,
  //   0x00,
  //   new Buffer("695F657468","hex")
  // )
  // // const response = await transport.exchange(new Buffer("00a40400","hex"))
  // console.log("response223223:"+response.toString("hex"))
  // const dd = "6f5c8408a000000003000000a550734a06072a864886fc6b01600c060a2a864886fc6b02020101630906072a864886fc6b03640b06092a864886fc6b041110650b06092b8510864864020103660c060a2b060104012a026e01029f6501ff";
  // const res = response.toString("hex");
  // if( res === dd){
  //   console.log("返回数据错误:")
  //   break;
  // }
  // }

  // 695F657468
  // let path ="44'/60'/0'/0'/0";
  // let paths = splitPath(path);
  // let buffer = Buffer.alloc(1 + paths.length * 4);
  // buffer[0] = paths.length;
  // paths.forEach((element, index) => {
  //   buffer.writeUInt32BE(element, 1 + 4 * index);
  // });
  // transport
  //   .send(
  //     0x00,
  //     0xa4,
  //     0x04,
  //     0x00,
  //     buffer
  //   )
  //   .then((response) => {
  //     let result = {};
  //     console.log(response)
  //     let publicKeyLength = response[0];
  //     return result;
  //   });
  // const appEth = new Eth(transport);
  // const { ethAddress } = await appEth.getAddress(
  //   "44'/0'/0'/0/0",
  //   false
  // );
  // console.log("ethAddressethAddressethAddressethAddressethAddress")
  // console.log(ethAddress)
});
const btn = document.createElement("button");
btn.innerText = "requestAccounts";
btn.addEventListener("click", async (e) => {

  function showResult(error: Error, result: string[]) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", result);
    }
  }

  // web3.eth.requestAccounts(showResult).then(console.log);


});
// function getContractAtAddress(tokenAddress) {
//   web3.Contract(abi).at(tokenAddress);
// }
const btnBalance = document.createElement("button");
btnBalance.innerText = "Get Balance";
btnBalance.addEventListener("click", async (e) => {
  //
  // const req = await imkeyProvider.test22();
  // console.log( web3.utils.fromWei(req.substring(2), 'ether')+' UNI')


  // web3.eth
  //   .getBalance("0x8663b811c9601db1c5a93e41b894196400c14ed6")
  //   .then(console.log);
  // web3.eth
  //   .Contract("0x8663b811c9601db1c5a93e41b894196400c14ed6")
  //   .then(console.log);
//   const addresses = ["0x272f28f2adb073dc02fb3d49a400275e791d9647"];
//   const deployedContractAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
//   // 定义合约abi
//   var contractAbi = [{"constant":true,"inputs":[],"name":"mintingFinished","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"cap","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"unpause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"mint","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_value","type":"uint256"}],"name":"burn","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_subtractedValue","type":"uint256"}],"name":"decreaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMinting","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"pause","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_value","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_addedValue","type":"uint256"}],"name":"increaseApproval","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"name":"burner","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Burn","type":"event"},{"anonymous":false,"inputs":[],"name":"Pause","type":"event"},{"anonymous":false,"inputs":[],"name":"Unpause","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"amount","type":"uint256"}],"name":"Mint","type":"event"},{"anonymous":false,"inputs":[],"name":"MintFinished","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"owner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"value","type":"uint256"}],"name":"Transfer","type":"event"}];
//
// // 合约地址
//   var contractAddress = "0x1f9840a85d5af5bf1d1762f925bdaddc4201f984";
// // 账号
//   var currentAccount = "0x272f28f2adb073dc02fb3d49a400275e791d9647";
//
//   // 合约地址
//   var contractAddress = "0x0000000000095413afc295d19edeb1ad7b71c952";
// // 账号
//   var currentAccount = "0x0000006daea1723962647b7e189d311d757fb793";
// // 定义合约
//   var myContract = new web3.eth.Contract(abi1, contractAddress, {
//     from: currentAccount, // default from address
//     gasPrice: '10000000000' // default gas price in wei, 10 gwei in this case
//   });

// 查询以太币余额
//   web3.eth.getBalance(currentAccount).then(console.log);
//   const  params =  [
//     {
//       to: contractAddress,
//       data: web3.utils.sha3('balanceOf(address)').slice(0,10) + "000000000000000000000000" + currentAccount.substring(2),
//     },
//     ]
//     console.log("params:"+params);
//   console.log(JSON.stringify(params));
//   [{"to":"0x1f9840a85d5af5bf1d1762f925bdaddc4201f984","data":"0x70a08231000000000000000000000000731b35c96ff8881a646f15d2e714843db26d674b"}]
// // 查看某个账号的代币余额

//
  var coinName = ''
  var coinCode = ''
  var coinBal = ''
// // // 获得代币名称
//   myContract.methods.name().call({from: currentAccount}, function(error, result){
//     if(!error) {
//       coinName = result
//     } else {
//       console.log(error);
//     }
//   });

// // 获取代币符号
//   myContract.methods.symbol().call({from: currentAccount}, function(error, result){
//     if(!error) {
//       coinCode = result
//     } else {
//       console.log(error);
//     }
//   });
//
//   myContract.methods.balanceOf(currentAccount).call({from: currentAccount}, function(error, result){
//     if(!error) {
//       console.log(result)
//       coinBal = web3.utils.fromWei(result, 'ether');
//       console.log("此合约地址："+contractAddress+"\n代币名称为："+coinName+"\n代币符号："+coinCode+"\n当前账户："+currentAccount+"\n余额为："+coinBal+" "+coinCode);
// //
//     } else {
//       console.log(error);
//     }
//   });
  // console.log("getTransactionCount:"+)
//   web3.eth.getTransactionReceipt(currentAccount).then(console.log)
// // 补齐64位，不够前面用0补齐
//   function addPreZero(num){
//     var t = (num+'').length,
//       s = '';
//     for(var i=0; i<64-t; i++){
//       s += '0';
//     }
//     return s+num;
//   }

  // web3.eth.getTransactionCount(currentAccount, web3.eth.defaultBlock.pending).then(function(nonce){
  //
  //   // 获取交易数据
  //   var txData = {
  //     nonce: web3.utils.toHex(nonce++),
  //     gasLimit: web3.utils.toHex(99000),
  //     gasPrice: web3.utils.toHex(10e9),
  //     // 注意这里是代币合约地址
  //     to: contractAddress,
  //     from: currentAccount,
  //     // 调用合约转账value这里留空
  //     value: '0x00',
  //     // data的组成，由：0x + 要调用的合约方法的function signature + 要传递的方法参数，每个参数都为64位(对transfer来说，第一个是接收人的地址去掉0x，第二个是代币数量的16进制表示，去掉前面0x，然后补齐为64位)
  //     data: '0x' + 'a9059cbb' + addPreZero('3b11f5CAB8362807273e1680890A802c5F1B15a8') + addPreZero(web3.utils.toHex(1000000000000000000).substr(2))
  //   }

  //   var tx = new Tx(txData);
  //
  //   const privateKey = new Buffer('your account privateKey', 'hex');
  //
  //   tx.sign(privateKey);
  //
  //   var serializedTx = tx.serialize().toString('hex');
  //
  //   web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'), function(err, hash) {
  //     if (!err) {
  //       console.log(hash);
  //     } else {
  //       console.error(err);
  //     }
  //   });
  // });
  //


// // 获取代币总量
//   myContract.methods.totalSupply().call({from: currentAccount}, function(error, result){
//     if(!error) {
//       console.log(result);
//     } else {
//       console.log(error);
//     }
//   });

// 查看某个账号允许另一个账号可使用的代币数量
//   myContract.methods.allowance(sender, spender).call({from: currentAccount}, function(error, result){
//     if(!error) {
//       console.log(result);
//     } else {
//       console.log(error);
//     }
//   });
  // const ethContract = web3.eth.Contract
  //   .Contract(SINGLE_CALL_BALANCES_ABI)
  //   .at(deployedContractAddress);
  // const ethBalance = ['0x0'];
  //
  // ethContract.balances(addresses, ethBalance, (error, result) => {
  //   if (error) {
  //     // log.warn(
  //     //   `MetaMask - Account Tracker single call balance fetch failed`,
  //     //   error,
  //     // );
  //     // Promise.all(addresses.map(this._updateAccount.bind(this)));
  //     return;
  //   }
  //   addresses.forEach((address, index) => {
  //     const balance = result[index] ? bnToHex(result[index]) : '0x0';
  //     // accounts[address] = { address, balance };
  //     console.log("address:"+address,"balance:"+balance)
  //   });
  //   // this.store.updateState({ accounts });
  // });
});
function bnToHex(inputBn) {
  return addHexPrefix(inputBn.toString(16));
}
const btnSignTransaction = document.createElement("button");
btnSignTransaction.innerText = "Sign Transaction";
btnSignTransaction.addEventListener("click", (e) => {
  // function showResult(error: Error, result: RLPEncodedTransaction) {
  //   if (error != null) {
  //     console.log("show error: ", error);
  //   } else {
  //     console.log("show result: ", result);
  //   }
  // }

  // web3.eth
  //   .signTransaction(
  //     {
  //       from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
  //       // gasPrice: "20000000008",
  //       // nonce: 8,
  //       // gas: "21000",
  //       to: "0x3535353535353535353535353535353535353535",
  //       value: "100000000000000000",
  //       // chainId: 3,
  //       // data: "",
  //     },
  //     showResult
  //   )
  //   .then(console.log);
});

const btnSendTransaction = document.createElement("button");
btnSendTransaction.innerText = "Send Transaction";
btnSendTransaction.addEventListener("click", (e) => {
  // function showResult(error: Error, result: RLPEncodedTransaction) {
  //   if (error != null) {
  //     console.log("show error: ", error);
  //   } else {
  //     console.log("show result: ", result);
  //   }
  // }

  // web3.eth
  //   .sendTransaction({
  //     from: "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
  //     // gasPrice: "20000000008",
  //     // nonce: 8,
  //     // gas: "21000",
  //     to: "0x3535353535353535353535353535353535353535",
  //     value: "100000000000000000",
  //     // chainId: 3,
  //     // data: "",
  //   })
  //   .then(console.log);
});

const btnSignPersonalMessage = document.createElement("button");
btnSignPersonalMessage.innerText = "Sign Personal Message";
btnSignPersonalMessage.addEventListener("click", (e) => {
  function showResult(error: Error, signature: string) {
    if (error != null) {
      console.log("show error: ", error);
    } else {
      console.log("show result: ", signature);
    }
  }

  // web3.eth.personal
  //   .sign(
  //     "Hello imKey",
  //     "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
  //     "",
  //     showResult
  //   )
  //   .then(console.log)
  //   // @ts-ignore
  //   .catch((error) => {
  //     console.log("error message: ", error.message);
  //   });
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

  // web3.eth
  //   .sign(
  //     "Hello imKey",
  //     "0x6031564e7b2F5cc33737807b2E58DaFF870B590b",
  //     showResult
  //   )
  //   .then(console.log)
  //   // @ts-ignore
  //   .catch((error) => {
  //     console.log("error message: ", error.message);
  //   });
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
      method: "eth_sign",
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

document.body.append(webusbbtn);
document.body.append(btn);
document.body.append(btnBalance);
document.body.append(btnSignTransaction);
document.body.append(btnSignPersonalMessage);
document.body.append(btnSignMessage);
document.body.append(btnSendTransaction);

document.body.append(document.createElement("br"));
document.body.append(btnRequest_eth_requestAccounts);
document.body.append(btnRequest_eth_sign);
document.body.append(btnRequest_eth_signTransaction);
