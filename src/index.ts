// class Human {
//     public name: string;
//     public age: number;
//     public gender: string;
//     constructor(name: string, age: number, gender: string) {
//         this.name = name;
//         this.age = age;
//         this.gender = gender;

//     }
// }

// const lynn = new Human("Lynn", 18, "female")
// //인자에 물음표가 붙여지면 옵션값임
// const sayHi = (person: Human): string => {
//     return `hello ${person.name}, you are ${person.age} you are a ${person.gender}`
// }
// //void empty를 의미 반환 값이 없음
// console.log(sayHi(lynn))
import * as CryptoJS from "crypto-js"

class Block {


    static cacluateBlockHash = (index: number, previousHash: string, timestamp: number, data: string): string => CryptoJS.SHA256(index + previousHash + timestamp + data).toString();

    static vaidateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === "number" &&
        typeof aBlock.hash === "string" &&
        typeof aBlock.previousHash === "string" &&
        typeof aBlock.timestamp === "number"
        && typeof aBlock.data === "string";

    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;

    constructor(index: number, hash: string, previousHash: string, data: string, timestamp: number) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}


const genesisBlock: Block = new Block(0, "20202020202", "", "hello", 123456);



let blockchain: [Block] = [genesisBlock];
const getBlockchain = (): Block[] => blockchain;

const getLatestBlock = (): Block => blockchain[blockchain.length - 1]

const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000)

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimestamp: number = getNewTimeStamp();
    const newHash: string = Block.cacluateBlockHash(newIndex, previousBlock.hash, newTimestamp, data)
    const newBlock: Block = new Block(newIndex, newHash, previousBlock.hash, data, newTimestamp)
    addBlock(newBlock)
    return newBlock;
}

const getHashforBlock = (aBlock: Block): string => Block.cacluateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data)

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.vaidateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashforBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
}

const addBlock = (candidateBlock: Block): void => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockchain.push(candidateBlock);
    }
}

createNewBlock("second blocks");
createNewBlock("third block");
createNewBlock("fourth block");

console.log(blockchain)
export { };