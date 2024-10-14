import { CASL2AssemblerInstructions } from './casl2-assembler-instructions.js';
import { CASL2AssemblerUtils } from './casl2-assembler-utils.js';

export class CASL2Assembler {
    constructor() {
        this.instructions = new Set(['LD', 'ST', 'LAD', 'ADDA', 'SUBA', 'ADDL', 'SUBL', 'AND', 'OR', 'XOR', 'CPA', 'CPL', 'SLA', 'SRA', 'SLL', 'SRL', 'JMI', 'JNZ', 'JZE', 'JUMP', 'PUSH', 'POP', 'CALL', 'RET', 'SVC', 'NOP', 'DS', 'DC', 'IN', 'OUT', 'START', 'END']);
        this.labelTable = new Map();
        this.currentAddress = 0;
        this.memory = new Uint16Array(65536);
        this.assemblerUtils = new CASL2AssemblerUtils();
        this.assemblerInstructions = new CASL2AssemblerInstructions(this.assemblerUtils, this.labelTable);
    }

    assemble(code) {
        console.log('Starting assembly process');
        const lines = code.split('\n');
        this.labelTable.clear();
        this.currentAddress = 0;
        this.memory.fill(0);

        try {
            console.log('First pass: Collecting labels');
            this.firstPass(lines);

            console.log('Second pass: Assembling instructions');
            this.secondPass(lines);

            console.log('Assembly completed successfully');
            return {
                success: true,
                memory: this.memory,
                labelTable: this.labelTable
            };
        } catch (error) {
            console.error('Assembly failed:', error.message);
            return {
                success: false,
                error: error.message
            };
        }
    }

    firstPass(lines) {
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === '' || trimmedLine.startsWith(';')) continue;

            console.log('Processing line:', trimmedLine);
            const parts = trimmedLine.split(/\s+/);
            if (parts[0] === 'START') {
                this.currentAddress = parseInt(parts[1], 10) || 0;
                console.log('START instruction found, setting address to:', this.currentAddress);
                continue;
            }

            if (parts[0] && !this.isInstruction(parts[0])) {
                this.labelTable.set(parts[0], this.currentAddress);
                console.log('Label found:', parts[0], 'at address:', this.currentAddress);
                parts.shift();
            }

            if (parts.length === 0) continue; // ラベルのみの行を処理

            if (parts[0] === 'DS') {
                this.currentAddress += parseInt(parts[1], 10) || 0;
                console.log('DS instruction, new address:', this.currentAddress);
            } else if (parts[0] === 'DC') {
                this.currentAddress++;
            } else if (parts[0] !== 'END') {
                this.currentAddress++;
            }
        }
        console.log('Label table after first pass:', this.labelTable);
    }

    secondPass(lines) {
        this.currentAddress = 0;
        for (const line of lines) {
            const trimmedLine = line.trim();
            if (trimmedLine === '' || trimmedLine.startsWith(';')) continue;

            console.log('Assembling line:', trimmedLine);
            const parts = trimmedLine.split(/\s+/);
            if (parts[0] === 'START') {
                this.currentAddress = parseInt(parts[1], 10) || 0;
                continue;
            }

            if (parts[0] && !this.isInstruction(parts[0])) {
                parts.shift();
            }

            if (parts.length === 0) continue; // ラベルのみの行を処理

            if (parts[0] === 'DS') {
                this.currentAddress += parseInt(parts[1], 10) || 0;
            } else if (parts[0] === 'DC') {
                const assembled = this.assemblerInstructions.assembleDC(parts[1]);
                this.memory[this.currentAddress] = assembled;
                console.log('Assembled DC:', assembled.toString(16), 'at address:', this.currentAddress);
                this.currentAddress++;
            } else if (parts[0] === 'END') {
                break;
            } else {
                const assembled = this.assemblerInstructions.assembleLine(parts);
                if (assembled !== null) {
                    this.memory[this.currentAddress] = assembled;
                    console.log('Assembled instruction:', assembled.toString(16), 'at address:', this.currentAddress);
                    this.currentAddress++;
                }
            }
        }
    }

    isInstruction(word) {
        return this.instructions.has(word);
    }
}
