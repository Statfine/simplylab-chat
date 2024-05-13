"use client"; // This is a client component
import CryptoJS from "crypto-js";
import { decompressSync, strFromU8 } from "fflate";
import { decode } from "js-base64";
import { useState } from "react";

// 加密密钥
const secretKey = "reelshort-web-password";

// 获取加密存储方法
const getDecryptedItem = (value: string) => {
  try {
    // 使用 AES 解密数据
    const bytes = CryptoJS.AES.decrypt(value, secretKey);
    const decryptedValue = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedValue;
  } catch (error) {
    console.error("Error getting decrypted item:", error);
    return null;
  }
};

/**返回解密后的response */
function atob(str: string) {
  return Buffer.from(str, "base64").toString("binary");
}
export function aesDescryptResponse(textStr: string = "") {
  if (!textStr || textStr.indexOf("Error") > -1 || typeof textStr != "string") {
    return {};
  }
  var key = CryptoJS.enc.Utf8.parse("VvRSNGFynLBW7aCP");
  var iv = CryptoJS.enc.Utf8.parse("gLn8sxqpzyNjehDP");
  let bytes = CryptoJS.AES.decrypt(textStr, key, {
    mode: CryptoJS.mode.CBC,
    iv,
  });
  const resultDecipher = bytes.toString(CryptoJS.enc.Base64);
  const secendDecodedText = decode(resultDecipher);
  const thirdDecodedText = atob(secendDecodedText);
  const willDecompressString = thirdDecodedText;
  const charData = willDecompressString.split("").map(function (x) {
    return x.charCodeAt(0);
  });
  const binData = new Uint8Array(charData);
  const decompressed = decompressSync(binData);
  const origText = strFromU8(decompressed);
  return JSON.parse(origText);
}

export default function Video() {
  const [value, setValue] = useState<string>();
  const [result, setResult] = useState<string>();

  const [respond, setRespond] = useState<string>();
  const [respondResult, setRespondResult] = useState<string>();

  const handleChangeValue = (e: any) => setValue(e.target.value);
  const handleDecode = () => {
    const decodeValue = getDecryptedItem(value as string);
    setResult(decodeValue);
  };

  const handleChangeRespondValue = (e: any) => setRespond(e.target.value);
  const handleRespondDecode = () => {
    const decodeRespondValue = aesDescryptResponse(respond as string);
    console.log(decodeRespondValue);
    setRespondResult(JSON.stringify(decodeRespondValue));
  };

  return (
    <div>
      <textarea
        style={{ width: 600, height: 100 }}
        value={value}
        onChange={handleChangeValue}
      />
      <button onClick={handleDecode}>ab解密</button>
      <p>{result}</p>
      <textarea
        style={{ width: 600, height: 100 }}
        value={respond}
        onChange={handleChangeRespondValue}
      />
      <button onClick={handleRespondDecode}>Respond解密</button>
      <p>{respondResult}</p>
    </div>
  );
}
