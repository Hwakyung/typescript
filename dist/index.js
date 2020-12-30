"use strict";
// class Human {
//     public name: string;
//     public age: number;
//     public gender: string;
//     constructor(name: string, age: number, gender: string) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;
Object.defineProperty(exports, "__esModule", { value: true });
//     }
// }
// const lynn = new Human("Lynn", 18, "female")
// //인자에 물음표가 붙여지면 옵션값임
// const sayHi = (person: Human): string => {
//     return `hello ${person.name}, you are ${person.age} you are a ${person.gender}`
// }
// //void empty를 의미 반환 값이 없음
// console.log(sayHi(lynn))
const CryptoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
Block.cacluateBlockHash = (index, previousHash, timestamp, data) => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.vaidateStructure = (aBlock) => typeof aBlock.index === "number" &&
    typeof aBlock.hash === "string" &&
    typeof aBlock.previousHash === "string" &&
    typeof aBlock.timestamp === "number"
    && typeof aBlock.data === "string";
const genesisBlock = new Block(0, "20202020202", "", "hello", 123456);
let blockchain = [genesisBlock];
const getBlockchain = () => blockchain;
const getLatestBlock = () => blockchain[blockchain.length - 1];
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimestamp = getNewTimeStamp();
    const newHash = Block.cacluateBlockHash(newIndex, previousBlock.hash, newTimestamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashforBlock = (aBlock) => Block.cacluateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.vaidateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
};
createNewBlock("second blocks");
createNewBlock("third block");
createNewBlock("fourth block");
console.log(blockchain);
//# sourceMappingURL=index.js.map