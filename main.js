
// Implementation of Block-chain Technologies in JavaScript
//  *************  PikaCoin ***********

// Importing Hashing Function 

const SHA256 = require('crypto-js/sha256');

class Block{
    constructor(index,timestamp,data, previousHash= ''){
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }
    calculateHash(){
        return SHA256(this.index + this.previousHash + JSON.stringify(this.data + this.nonce ).toString());
    }
    /// adding proof-of-work to our block generation to avoid chain tampering by any hacker
    mineBlock( difficulty ) {
        while(this.hash.toString().substring(0,difficulty)  !== Array(difficulty + 1).join("0") )
        {
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log(" Block Mined :" + this.hash);
    }
}



class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 4;
    }

    createGenesisBlock(){
        return new Block(0,'10/12/2020','Genesis Block','0');
    }

    getLatestBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock){
        newBlock.previousHash = (this.getLatestBlock()).hash;
        newBlock.mineBlock(this.difficulty);
        this.chain.push(newBlock);
    }
    isChainValid(){
        for( let i=1; i<this.chain.legnth ; i++)
        {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];
            if(currentBlock.hash !== currentBlock.calculateHash())
            {
                return false;
            }
            if( currentBlock.previousHash != previousBlock.hash){
                return false;
            }
        }
        return true;
    }
}



let PikaCoin =  new BlockChain();

console.log('Mining Block 1 ....')
PikaCoin.addBlock(new Block(1,"11/12/2020", {amount : 4}));

console.log('Mining Block 2 ....')
PikaCoin.addBlock(new Block(2,"12/12/2020", {amount : 20}));

console.log('Mining Block 3 ....')
PikaCoin.addBlock(new Block(3,"13/12/2020", {amount : 230}));

console.log('Mining Block 4 ....')
PikaCoin.addBlock(new Block(4,"14/12/2020", {amount : 10}));
