
import  {constants }from "../common/constants";


const ethApdu = () => {

  return {

    select_applet(): Buffer {
     return  genApdu(0x00,0xa4,0x04,0x00,Buffer.from(constants.ETH_AID,"hex"))
    },
    get_xpub(path: string, verify_flag: boolean): Buffer {
      return get_pubkey(path, 0x53,verify_flag)
    },
    register_address(address: Buffer = Buffer.alloc(0)): Buffer {
      return register_address(0x56,address)
    },
    prepare_sign(data: Buffer = Buffer.alloc(0)): Buffer[] {
      return prepare_sign(0x51,data)
    },
    sign_digest(path: string): Buffer {
      return sign_digest(0x52, 0x00, 0x00, path)
    },
    prepare_personal_sign(data: Buffer = Buffer.alloc(0)): Buffer[] {
      return prepare_sign(0x54,data)
    },
    personal_sign(path: string): Buffer {
      return sign_digest(0x55, 0x00, 0x00, path)
    },
};
};
function genApdu (
  cla: number,
  ins: number,
  p1: number,
  p2: number,
  data: Buffer = Buffer.alloc(0)
): Buffer{
  const response =
    Buffer.concat([
      Buffer.from([cla, ins, p1, p2]),
      Buffer.from([data.length]),
      data,
      Buffer.from([0x00]),
    ])
  return response;
}
function get_pubkey( path: string, ins: number, verify_flag: boolean) : Buffer {
  let p1 = verify_flag ? 0x01 : 0x00 ;
  return  genApdu(0x80,ins,p1,0x00,Buffer.from(path,"ascii"));
}
function register_address( ins: number, data: Buffer = Buffer.alloc(0)) : Buffer {
  return  genApdu(0x80,ins,0x00,0x00,data);
}
function sign_digest( ins: number,index: number, hashtype: number, path:string) : Buffer {

  return  genApdu(0x80,ins,index,hashtype,Buffer.from(path,"ascii"));
}
function prepare_sign( ins: number ,data:Buffer) : Buffer[] {
  let apduList = [];
  let size = Math.ceil(data.length / constants.LC_MAX);
  for(let i=0 ;i<size;i++){
    let p1 = (i==0) ? 0x00 : 0x80;
    let p2,lc;
    if(i==size-1){
      p2=0x80;
      lc=data.length-constants.LC_MAX*(size-1);
    }else{
      p2=0x00;
      lc=0xF5;
    }
    apduList.push(genApdu(0x80,ins,p1,p2,data.slice(i * constants.LC_MAX, i  * constants.LC_MAX + lc)));
  }
  return  apduList;
}
export default ethApdu;
