import { CASL2AssemblerInstructionsBase } from './casl2-assembler-instructions-base.js';

export class CASL2AssemblerInstructionsRR extends CASL2AssemblerInstructionsBase {
    assembleRR(instruction, r1, r2, r3) {
        console.log('Assembling RR instruction:', instruction, r1, r2, r3);
        const opMap = { 'LD': 0x10, 'ST': 0x11, 'LAD': 0x12, 'ADDA': 0x20, 'SUBA': 0x21, 'ADDL': 0x22, 'SUBL': 0x23, 'AND': 0x24, 'OR': 0x25, 'XOR': 0x26 };
        const op = opMap[instruction];
        if (op === undefined) {
            throw new Error(`無効な命令: ${instruction}`);
        }
        const gr1 = this.assemblerUtils.parseRegister(r1);
        
        if (instruction === 'LAD') {
            const address = this.assemblerUtils.resolveAddress(r2, this.labelTable);
            return (op << 8) | (gr1 << 4) | 0x0000 | address;
        } else if (instruction === 'LD' && r3) {
            // LD GR1, 0, GR2 形式の命令
            const gr2 = this.assemblerUtils.parseRegister(r3);
            const offset = parseInt(r2, 10);
            return (op << 8) | (gr1 << 4) | gr2 | (offset << 8);
        } else if (r2.startsWith('=')) {
            // 即値ロードの場合
            const immediateValue = this.assemblerUtils.handleImmediate(r2);
            return ((op << 8) | (gr1 << 4) | 0x0F) + immediateValue;
        } else if (r2.startsWith('#')) {
            // アドレス指定の場合
            const address = this.assemblerUtils.resolveAddress(r2, this.labelTable);
            return (op << 8) | (gr1 << 4) | address;
        } else {
            const gr2 = this.assemblerUtils.parseRegister(r2);
            return (op << 8) | (gr1 << 4) | gr2;
        }
    }
}
