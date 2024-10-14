import { CASL2AssemblerInstructionsBase } from './casl2-assembler-instructions-base.js';

export class CASL2AssemblerInstructionsRS extends CASL2AssemblerInstructionsBase {
    assembleRS(instruction, r, s) {
        console.log('Assembling RS instruction:', instruction, r, s);
        const opMap = { 'SLA': 0x50, 'SRA': 0x51, 'SLL': 0x52, 'SRL': 0x53 };
        const op = opMap[instruction];
        if (op === undefined) {
            throw new Error(`無効な命令: ${instruction}`);
        }
        const gr = this.assemblerUtils.parseRegister(r);
        const shift = parseInt(s, 10);
        if (isNaN(shift) || shift < 0 || shift > 15) {
            throw new Error(`無効なシフト量: ${s}`);
        }
        return (op << 8) | (gr << 4) | shift;
    }
}
