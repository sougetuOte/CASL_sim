// CASL2シミュレータのデバッガー機能

import { getMessage } from './config.js';

export class CASL2Debugger {
    constructor(simulator) {
        this.simulator = simulator;
        this.breakpoints = new Set();
    }

    setBreakpoint(address) {
        if (address >= 0 && address < this.simulator.memory.length) {
            this.breakpoints.add(address);
            return getMessage('setBreakpoint') + address.toString(16);
        } else {
            throw new Error(getMessage('invalidBreakpointAddress'));
        }
    }

    clearBreakpoint(address) {
        if (this.breakpoints.delete(address)) {
            return getMessage('clearBreakpoint') + address.toString(16);
        } else {
            return getMessage('breakpointNotFound') + address.toString(16);
        }
    }

    isBreakpoint(address) {
        return this.breakpoints.has(address);
    }

    step() {
        // ステップ実行の実装
        return this.simulator.executeInstruction();
    }

    getDebugInfo() {
        // 現在の実行状態のデバッグ情報を取得
        return {
            registers: [...this.simulator.registers],
            PR: this.simulator.PR,
            SP: this.simulator.SP,
            FR: this.simulator.FR,
            currentInstruction: this.simulator.memory[this.simulator.PR],
            executionHistory: [...this.simulator.executionHistory],
            breakpoints: Array.from(this.breakpoints)
        };
    }

    formatDebugInfo(info) {
        return `
            Registers: ${info.registers.map((r, i) => `GR${i}:${r.toString(16).padStart(4, '0')}`).join(', ')}
            PR: ${info.PR.toString(16).padStart(4, '0')}
            SP: ${info.SP.toString(16).padStart(4, '0')}
            FR: ${info.FR.toString(2).padStart(3, '0')}
            Current Instruction: ${info.currentInstruction.toString(16).padStart(4, '0')}
            Breakpoints: ${info.breakpoints.map(bp => bp.toString(16).padStart(4, '0')).join(', ')}
        `;
    }
}
