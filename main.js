const SHA256 = require("crypto-js/sha256")

class Block {
    constructor(index, data, previousHash = "") {
        this.index = index
        this.date = new Date()
        this.data = data
        this.previousHash = previousHash
        this.hash = this.createHash()
    }

    createHash() {
        return SHA256(this.index + this.data + this.date).toString()
    }
}

class BlockChain {
    constructor(genesis) {
        this.chain = [this.createFirstBlock(genesis)]
    }
    createFirstBlock(genesis) {
        return new Block(0, genesis)
    }
    getLastBlock() {
        return this.chain[this.chain.length - 1]
    }
    addBlock(data) {
        let prevBlock = this.getLastBlock()
        let block = new Block(prevBlock.index + 1, data, prevBlock.hash)
        this.chain.push(block)
    }
}

let johnCoin = new BlockChain("Begin ALL")
johnCoin.addBlock("nuevos datos")
johnCoin.addBlock("test block")
johnCoin.addBlock("nueva prueba")
johnCoin.addBlock("cadena funcionando")

console.log(JSON.stringify(johnCoin.chain, null, 2))
