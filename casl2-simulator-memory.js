export class MemoryManager {
    constructor() {
        this.memory = new Uint16Array(65536); // 65536ワードのメモリ
    }

    read(address) {
        if (this.isValidAddress(address)) {
            return this.memory[address];
        }
        throw new Error(`Invalid memory address: ${address}`);
    }

    write(address, value) {
        if (this.isValidAddress(address)) {
            this.memory[address] = value & 0xFFFF;
        } else {
            throw new Error(`Invalid memory address: ${address}`);
        }
    }

    isValidAddress(address) {
        return address >= 0 && address < this.memory.length;
    }

    get size() {
        return this.memory.length;
    }
}
