import CryptoJS from "crypto-js";
import { useEffect } from "react";

export default function Crypt() {
    const genCrypt = (crypt,  key) => {
        return CryptoJS.AES.encrypt(crypt, key).toString();
    }

    const genDecrypt = (crypted, key) => {
        const ret = CryptoJS.AES.decrypt(crypted, key);
        return ret.toString(CryptoJS.enc.Utf8);
    }

    useEffect(() => {
        const msg = genCrypt("TEST CRYPT", "MSG1");
        console.log("crypt msg: ", msg);
        const dec = genDecrypt(msg, "MSG1");
        console.log("decrypt msg: ", dec);
    }, [])
    return <h1>CRYPTO</h1>;
}
