import ifetch from "../request.js";
import { isJson, randomString } from "../tool.js";
import { encode, decode } from "../base64.js";

console.log("\nTEST:isJson", isJson("ddd"));

console.log("\nTEST:randomString", randomString(33));

console.log("\nTEST:base64", encode(33), decode("MzM="));





ifetch("http://baidu.com").then(text => console.log(text))