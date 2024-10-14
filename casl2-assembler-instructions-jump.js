import { CASL2AssemblerInstructionsBase } from './casl2-assembler-instructions-base.js';

export class CASL2AssemblerInstructionsJump extends CASL2AssemblerInstructionsBase {
    assembleJump(instruction, adr) {
        console.log('Assembling Jump instruction:', instruction, adr);
        const opMap = { 'JMI': 0x61, 'JNZ': 0x62, 'JZE': 0x63, 'JUMP': 0x64 };
        const op = opMap[instruction];
        if (op === undefined) {
            throw new Error(`無効な命令: ${instruction}`);
        }
        const address = this.assemblerUtils.resolveAddress(adr, this.labelTable);
        return (op << 8) | address;
    }

    assembleCall(adr) {
        console.log('Assembling Call instruction:', adr);
        const address = this.assemblerUtils.resolveAddress(adr, this.labelTable);
        return (0x80 << 8) | address;
    }

    assembleRet() {
        console.log('Assembling Ret instruction');
        return 0x8100;
    }
}
