import {erc20} from "./erc20";

const asContractAddress = (addr: string) => {
  const a = addr.toLowerCase();
  return a.startsWith("0x") ? a : "0x" + a;
};
export const getTokenInfo = (addr: string) => {
  for(let token of erc20){
    if(asContractAddress(token[6].toString()) === asContractAddress(addr.toString())){
      const ticker = token[2]
      const contractAddress =  token[6]
      const decimals =  token[3]
      return {
        ticker,
        contractAddress,
        decimals,
      }
    }
  }
  return null;
};
