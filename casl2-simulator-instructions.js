export class InstructionExecutor {
    constructor(simulator) {
        this.simulator = simulator;
    }

    execute(opcode, r1, r2, address) {
        switch (opcode) {
            case 0x10: return this.executeLD(r1, r2, address);
            case 0x11: return this.executeST(r1, r2, address);
            case 0x12: return this.executeLAD(r1, r2, address);
            case 0x20: return this.executeADDA(r1, r2);
            case 0x21: return this.executeSUBA(r1, r2);
            case 0x22: return this.executeADDL(r1, r2);
            case 0x23: return this.executeSUBL(r1, r2);
            case 0x30: return this.executeAND(r1, r2);
            case 0x31: return this.executeOR(r1, r2);
            case 0x32: return this.executeXOR(r1, r2);
            case 0x40: return this.executeCPA(r1, r2);
            case 0x41: return this.executeCPL(r1, r2);
            case 0x50: return this.executeSLA(r1, r2);
            case 0x51: return this.executeSRA(r1, r2);
            case 0x52: return this.executeSLL(r1, r2);
            case 0x53: return this.executeSRL(r1, r2);
            case 0x61: return this.executeJMI(address);
            case 0x62: return this.executeJNZ(address);
            case 0x63: return this.executeJZE(address);
            case 0x64: return this.executeJUMP(address);
            case 0x65: return this.executeJPL(address);
            case 0x66: return this.executeJOV(address);
            case 0x70: return this.executePUSH(r1);
            case 0x71: return this.executePOP(r1);
            case 0x80: return this.executeCALL(address);
            case 0x81: return this.executeRET();
            case 0xF0: return this.executeSVC(address);
            default:
                throw new Error(`Unimplemented instruction: 0x${opcode.toString(16).padStart(2, '0').toUpperCase()}`);
        }
    }

    executeLD(r1, r2, address) {
        // Load: GR[r1] ← GR[r2] または GR[r1] ← M[address]
        if (r2 === 0) {
            this.simulator.registers[r1] = this.simulator.memory[address];
        } else {
            this.simulator.registers[r1] = this.simulator.registers[r2];
        }
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeST(r1, r2, address) {
        // Store: M[address] ← GR[r1]
        this.simulator.memory[address] = this.simulator.registers[r1];
        return `M[${address}] = ${this.simulator.registers[r1]}`;
    }

    executeLAD(r1, r2, address) {
        // Load Address: GR[r1] ← address
        this.simulator.registers[r1] = address;
        return `GR${r1} = ${address}`;
    }

    executeADDA(r1, r2) {
        // Add Arithmetic: GR[r1] ← GR[r1] + GR[r2]
        const result = this.simulator.registers[r1] + this.simulator.registers[r2];
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeSUBA(r1, r2) {
        // Subtract Arithmetic: GR[r1] ← GR[r1] - GR[r2]
        const result = this.simulator.registers[r1] - this.simulator.registers[r2];
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeADDL(r1, r2) {
        // Add Logical: GR[r1] ← GR[r1] + GR[r2] (論理加算)
        const result = (this.simulator.registers[r1] + this.simulator.registers[r2]) & 0xFFFF;
        this.simulator.registers[r1] = result;
        this.setFR(result);
        return `GR${r1} = ${result}`;
    }

    executeSUBL(r1, r2) {
        // Subtract Logical: GR[r1] ← GR[r1] - GR[r2] (論理減算)
        const result = (this.simulator.registers[r1] - this.simulator.registers[r2]) & 0xFFFF;
        this.simulator.registers[r1] = result;
        this.setFR(result);
        return `GR${r1} = ${result}`;
    }

    executeAND(r1, r2) {
        // Logical AND: GR[r1] ← GR[r1] & GR[r2]
        this.simulator.registers[r1] &= this.simulator.registers[r2];
        this.setFR(this.simulator.registers[r1]);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeOR(r1, r2) {
        // Logical OR: GR[r1] ← GR[r1] | GR[r2]
        this.simulator.registers[r1] |= this.simulator.registers[r2];
        this.setFR(this.simulator.registers[r1]);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeXOR(r1, r2) {
        // Logical XOR: GR[r1] ← GR[r1] ^ GR[r2]
        this.simulator.registers[r1] ^= this.simulator.registers[r2];
        this.setFR(this.simulator.registers[r1]);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeCPA(r1, r2) {
        // Compare Arithmetic: GR[r1] - GR[r2] の結果でFRを設定
        const result = this.simulator.registers[r1] - this.simulator.registers[r2];
        this.setFR(result);
        return `FR = ${this.simulator.FR}`;
    }

    executeCPL(r1, r2) {
        // Compare Logical: GR[r1] - GR[r2] の論理比較結果でFRを設定
        const result = (this.simulator.registers[r1] - this.simulator.registers[r2]) & 0xFFFF;
        this.setFR(result);
        return `FR = ${this.simulator.FR}`;
    }

    executeSLA(r1, r2) {
        // Shift Left Arithmetic: GR[r1]を算術的に左シフト
        const shiftAmount = this.simulator.registers[r2] & 0xFF;
        const result = this.simulator.registers[r1] << shiftAmount;
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeSRA(r1, r2) {
        // Shift Right Arithmetic: GR[r1]を算術的に右シフト
        const shiftAmount = this.simulator.registers[r2] & 0xFF;
        const result = (this.simulator.registers[r1] << 16 >> 16) >> shiftAmount;
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeSLL(r1, r2) {
        // Shift Left Logical: GR[r1]を論理的に左シフト
        const shiftAmount = this.simulator.registers[r2] & 0xFF;
        const result = this.simulator.registers[r1] << shiftAmount;
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeSRL(r1, r2) {
        // Shift Right Logical: GR[r1]を論理的に右シフト
        const shiftAmount = this.simulator.registers[r2] & 0xFF;
        const result = this.simulator.registers[r1] >>> shiftAmount;
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeJMI(address) {
        // Jump on Minus: SFが1の場合、PRをaddressに設定
        if (this.simulator.FR & 0x04) {
            this.simulator.PR = address;
            return `Jump to ${address}`;
        }
        return 'No jump';
    }

    executeJNZ(address) {
        // Jump on Non Zero: ZFが0の場合、PRをaddressに設定
        if (!(this.simulator.FR & 0x01)) {
            this.simulator.PR = address;
            return `Jump to ${address}`;
        }
        return 'No jump';
    }

    executeJZE(address) {
        // Jump on Zero: ZFが1の場合、PRをaddressに設定
        if (this.simulator.FR & 0x01) {
            this.simulator.PR = address;
            return `Jump to ${address}`;
        }
        return 'No jump';
    }

    executeJUMP(address) {
        // Unconditional Jump: PRをaddressに設定
        this.simulator.PR = address;
        return `Jump to ${address}`;
    }

    executeJPL(address) {
        // Jump on Plus: SFが0の場合、PRをaddressに設定
        if (!(this.simulator.FR & 0x04)) {
            this.simulator.PR = address;
            return `Jump to ${address}`;
        }
        return 'No jump';
    }

    executeJOV(address) {
        // Jump on Overflow: OFが1の場合、PRをaddressに設定
        if (this.simulator.FR & 0x02) {
            this.simulator.PR = address;
            return `Jump to ${address}`;
        }
        return 'No jump';
    }

    executePUSH(r1) {
        // Push: SP--; M[SP] ← GR[r1]
        this.simulator.SP = (this.simulator.SP - 1) & 0xFFFF;
        this.simulator.memory[this.simulator.SP] = this.simulator.registers[r1];
        return `Push GR${r1} to stack`;
    }

    executePOP(r1) {
        // Pop: GR[r1] ← M[SP]; SP++
        this.simulator.registers[r1] = this.simulator.memory[this.simulator.SP];
        this.simulator.SP = (this.simulator.SP + 1) & 0xFFFF;
        return `Pop to GR${r1} from stack`;
    }

    executeCALL(address) {
        // Call: SP--; M[SP] ← PR; PR ← address
        this.simulator.SP = (this.simulator.SP - 1) & 0xFFFF;
        this.simulator.memory[this.simulator.SP] = this.simulator.PR;
        this.simulator.PR = address;
        return `Call to ${address}`;
    }

    executeRET() {
        // Return: PR ← M[SP]; SP++
        this.simulator.PR = this.simulator.memory[this.simulator.SP];
        this.simulator.SP = (this.simulator.SP + 1) & 0xFFFF;
        return `Return to ${this.simulator.PR}`;
    }

    executeSVC(address) {
        // Supervisor Call: 特権モードへの移行と特定の処理の実行
        // この実装は簡略化されています
        console.log(`SVC called with address: ${address}`);
        return `SVC ${address}`;
    }

    setFR(result) {
        this.simulator.FR = 0;
        if (result > 0xFFFF) this.simulator.FR |= 0x02; // OF
        if (result & 0x8000) this.simulator.FR |= 0x04; // SF
        if ((result & 0xFFFF) === 0) this.simulator.FR |= 0x01; // ZF
    }
}
