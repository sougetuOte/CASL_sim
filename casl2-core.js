import { getMessage } from './config.js';
import { getOpcode, getInstructionFormat } from './instruction-set.js';

export class CASL2Simulator {
    constructor() {
        this.memory = new Uint16Array(65536); // 65536ワードのメモリ
        this.registers = new Uint16Array(8);  // GR0-GR7の8つの汎用レジスタ
        this.PR = 0;  // プログラムレジスタ
        this.SP = 0;  // スタックポインタ
        this.FR = 0;  // フラグレジスタ (OF, SF, ZF)

        this.labelTable = new Map();  // ラベルテーブル
        this.currentAddress = 0;      // 現在のアドレス

        this.running = false;         // プログラムが実行中かどうか
        this.breakpoints = new Set(); // ブレークポイントのセット

        this.ioLog = [];              // 入出力ログ
        this.executionHistory = [];   // 実行履歴
        this.debugLog = [];           // デバッグログ
    }

    updateRegister(index, value) {
        if (index >= 0 && index < 8) {
            this.registers[index] = value & 0xFFFF;
            this.log(`Register GR${index} updated: ${value & 0xFFFF}`);
        } else {
            throw new Error(getMessage('invalidRegisterIndex', { index }));
        }
    }

    push(value) {
        if (this.SP >= this.memory.length) {
            throw new Error(getMessage('stackOverflow'));
        }
        this.memory[this.SP] = value & 0xFFFF;
        this.SP++;
        this.log(`Push: value=${value & 0xFFFF}, SP=${this.SP}`);
    }

    pop() {
        if (this.SP <= 0) {
            throw new Error(getMessage('stackUnderflow'));
        }
        this.SP--;
        const value = this.memory[this.SP];
        this.log(`Pop: value=${value}, SP=${this.SP}`);
        return value;
    }

    executeInstruction(opcode, r1, r2, address) {
        this.log(`Executing instruction: opcode=${opcode.toString(16)}, r1=${r1}, r2=${r2}, address=${address}`);
        switch (opcode) {
            case 0x10: // LD
                if (r2 === 0) {
                    // 即値のロード
                    this.updateRegister(r1, address);
                } else {
                    this.updateRegister(r1, this.registers[r2]);
                }
                return `GR${r1} = ${this.registers[r1]}`;
            case 0x20: // ADDA
                this.updateRegister(r1, this.add(this.registers[r1], this.registers[r2]));
                return `GR${r1} = ${this.registers[r1]}`;
            case 0x21: // SUBA
                this.updateRegister(r1, this.sub(this.registers[r1], this.registers[r2]));
                return `GR${r1} = ${this.registers[r1]}`;
            case 0x30: // AND
                this.updateRegister(r1, this.registers[r1] & this.registers[r2]);
                return `GR${r1} = ${this.registers[r1]}`;
            case 0x31: // OR
                this.updateRegister(r1, this.registers[r1] | this.registers[r2]);
                return `GR${r1} = ${this.registers[r1]}`;
            case 0x32: // XOR
                this.updateRegister(r1, this.registers[r1] ^ this.registers[r2]);
                return `GR${r1} = ${this.registers[r1]}`;
            case 0x40: // CPA
                this.compare(this.registers[r1], this.registers[r2]);
                return `FR = ${this.FR}`;
            case 0x63: // JZE
                if (this.FR & 0x01) {
                    this.PR = address;
                } else {
                    this.PR++;
                }
                return `PR = ${this.PR}`;
            case 0x70: // PUSH
                this.push(this.registers[r1]);
                return `PUSH GR${r1}`;
            case 0x71: // POP
                this.updateRegister(r1, this.pop());
                return `POP to GR${r1}`;
            case 0x72: // RPUSH
                this.pushAllRegisters();
                return 'RPUSH';
            case 0x73: // RPOP
                this.popAllRegisters();
                return 'RPOP';
            case 0x81: // RET
                if (this.SP > 0) {
                    this.SP--;
                    if (!this.isValidAddress(this.SP)) {
                        throw new Error(getMessage('invalidStackPointer', { SP: this.SP }));
                    }
                    this.PR = this.memory[this.SP];
                } else {
                    this.running = false;
                }
                return `PR = ${this.PR}`;
            case 0x90: // IN
                return this.executeIN(r1, address);
            case 0x91: // OUT
                return this.executeOUT(r1, address);
            default:
                throw new Error(getMessage('unimplementedInstruction', { opcode: opcode.toString(16) }));
        }
    }

    compare(a, b) {
        if (a === b) {
            this.FR = 0x01; // ZF = 1
        } else if (a < b) {
            this.FR = 0x04; // SF = 1
        } else {
            this.FR = 0x00;
        }
    }

    add(a, b) {
        const result = a + b;
        this.setFR(result);
        return result & 0xFFFF;
    }

    sub(a, b) {
        const result = a - b;
        this.setFR(result);
        return result & 0xFFFF;
    }

    setFR(result) {
        this.FR = 0;
        if (result > 0xFFFF) this.FR |= 0x02; // OF
        if (result & 0x8000) this.FR |= 0x04; // SF
        if ((result & 0xFFFF) === 0) this.FR |= 0x01; // ZF
        this.log(`FR updated: OF=${!!(this.FR & 0x02)}, SF=${!!(this.FR & 0x04)}, ZF=${!!(this.FR & 0x01)}`);
    }

    pushAllRegisters() {
        for (let i = 0; i < this.registers.length; i++) {
            this.push(this.registers[i]);
        }
        this.log('RPUSH: All registers pushed to stack');
    }

    popAllRegisters() {
        for (let i = this.registers.length - 1; i >= 0; i--) {
            this.updateRegister(i, this.pop());
        }
        this.log('RPOP: All registers popped from stack');
    }

    executeIN(r, address) {
        // この実装は、UIに依存するため、実際の処理はUI側で行う
        this.log(`IN instruction: register=${r}, address=${address}`);
        return { type: 'IN', register: r, address };
    }

    executeOUT(r, address) {
        const value = this.registers[r];
        this.log(`OUT instruction: register=${r}, address=${address}, value=${value}`);
        return { type: 'OUT', value, address };
    }

    log(message) {
        this.debugLog.push(`[${new Date().toISOString()}] ${message}`);
    }

    isValidAddress(address) {
        return address >= 0 && address < this.memory.length;
    }
}
