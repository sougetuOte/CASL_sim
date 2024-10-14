export class InstructionExecutor {
    constructor(simulator) {
        this.simulator = simulator;
    }

    execute(opcode, r1, r2, address) {
        switch (opcode) {
            case 0x10: return this.executeLD(r1, r2, address);
            case 0x20: return this.executeADDA(r1, r2);
            case 0x21: return this.executeSUBA(r1, r2);
            // 他の命令も同様に実装
            default:
                throw new Error(`Unimplemented instruction: ${opcode.toString(16)}`);
        }
    }

    executeLD(r1, r2, address) {
        if (r2 === 0) {
            this.simulator.registers[r1] = address;
        } else {
            this.simulator.registers[r1] = this.simulator.registers[r2];
        }
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeADDA(r1, r2) {
        const result = this.simulator.registers[r1] + this.simulator.registers[r2];
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    executeSUBA(r1, r2) {
        const result = this.simulator.registers[r1] - this.simulator.registers[r2];
        this.simulator.registers[r1] = result & 0xFFFF;
        this.setFR(result);
        return `GR${r1} = ${this.simulator.registers[r1]}`;
    }

    setFR(result) {
        this.simulator.FR = 0;
        if (result > 0xFFFF) this.simulator.FR |= 0x02; // OF
        if (result & 0x8000) this.simulator.FR |= 0x04; // SF
        if ((result & 0xFFFF) === 0) this.simulator.FR |= 0x01; // ZF
    }

    // 他の命令の実装も追加
}
