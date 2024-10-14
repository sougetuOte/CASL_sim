import { CASL2AssemblerUtils } from './casl2-assembler-utils.js';

export class CASL2AssemblerInstructionsBase {
    constructor(assemblerUtils, labelTable) {
        this.assemblerUtils = assemblerUtils;
        this.labelTable = labelTable;
    }

    assembleLine(parts) {
        console.log('Assembling line parts:', parts);
        if (parts.length === 0) {
            return null; // 空の行を無視
        }
        const [instruction, ...args] = parts;
        console.log(`Assembling instruction: ${instruction} with args:`, args);
        let result;
        try {
            switch (instruction) {
                case 'START':
                    return null;
                case 'LD':
                case 'ST':
                case 'LAD':
                case 'ADDA':
                case 'SUBA':
                case 'ADDL':
                case 'SUBL':
                case 'AND':
                case 'OR':
                case 'XOR':
                    result = this.assembleRR(instruction, ...args);
                    break;
                case 'CPA':
                case 'CPL':
                    result = this.assembleRX(instruction, ...args);
                    break;
                case 'SLA':
                case 'SRA':
                case 'SLL':
                case 'SRL':
                    result = this.assembleRS(instruction, ...args);
                    break;
                case 'JMI':
                case 'JNZ':
                case 'JZE':
                case 'JUMP':
                    result = this.assembleJump(instruction, ...args);
                    break;
                case 'PUSH':
                case 'POP':
                    result = this.assembleStack(instruction, ...args);
                    break;
                case 'CALL':
                    result = this.assembleCall(...args);
                    break;
                case 'RET':
                    result = this.assembleRet();
                    break;
                case 'SVC':
                    result = this.assembleSVC(...args);
                    break;
                case 'NOP':
                    result = 0x0000;
                    break;
                case 'DC':
                    result = this.assembleDC(...args);
                    break;
                case 'IN':
                case 'OUT':
                    result = this.assembleIO(instruction, ...args);
                    break;
                default:
                    throw new Error(`未知の命令: ${instruction}`);
            }
            console.log(`Assembled result for ${instruction}:`, result);
            return result;
        } catch (error) {
            console.error(`Error assembling ${instruction}:`, error);
            throw error;
        }
    }

    // デフォルトの実装を持つ抽象メソッド
    assembleRR(instruction, ...args) { 
        throw new Error(`assembleRR not implemented for instruction: ${instruction}, args: ${args}`); 
    }
    assembleRX(instruction, ...args) { 
        throw new Error(`assembleRX not implemented for instruction: ${instruction}, args: ${args}`); 
    }
    assembleRS(instruction, ...args) { 
        throw new Error(`assembleRS not implemented for instruction: ${instruction}, args: ${args}`); 
    }
    assembleJump(instruction, ...args) { 
        throw new Error(`assembleJump not implemented for instruction: ${instruction}, args: ${args}`); 
    }
    assembleStack(instruction, ...args) { 
        throw new Error(`assembleStack not implemented for instruction: ${instruction}, args: ${args}`); 
    }
    assembleCall(...args) { 
        throw new Error(`assembleCall not implemented, args: ${args}`); 
    }
    assembleRet() { 
        throw new Error('assembleRet not implemented'); 
    }
    assembleSVC(...args) { 
        throw new Error(`assembleSVC not implemented, args: ${args}`); 
    }
    assembleDC(...args) { 
        throw new Error(`assembleDC not implemented, args: ${args}`); 
    }
    assembleIO(instruction, ...args) { 
        throw new Error(`assembleIO not implemented for instruction: ${instruction}, args: ${args}`); 
    }
}
