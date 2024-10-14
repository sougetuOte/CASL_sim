import { CASL2AssemblerInstructionsBase } from './casl2-assembler-instructions-base.js';

export class CASL2AssemblerInstructionsRX extends CASL2AssemblerInstructionsBase {
    assembleRX(instruction, r, x) {
        console.log('Assembling RX instruction:', instruction, r, x);
        const opMap = { 'CPA': 0x40, 'CPL': 0x41 };
        const op = opMap[instruction];
        if (op === undefined) {
            throw new Error(`無効な命令: ${instruction}`);
        }
        console.log('Opcode:', op.toString(16));
        
        const gr = this.assemblerUtils.parseRegister(r);
        console.log('Register:', gr.toString(16));
        
        let indexRegister = 0;
        let address;
        
        if (x.includes(',')) {
            const [addr, index] = x.split(',').map(s => s.trim());
            indexRegister = this.assemblerUtils.parseRegister(index);
            address = this.assemblerUtils.resolveAddress(addr, this.labelTable);
        } else {
            address = this.assemblerUtils.resolveAddress(x, this.labelTable);
        }
        
        console.log('Address:', address.toString(16));
        console.log('Index Register:', indexRegister.toString(16));
        
        const firstWord = (op << 8) | (gr << 4) | indexRegister;
        console.log('First word:', firstWord.toString(16));
        
        const secondWord = address & 0xFFFF;
        console.log('Second word:', secondWord.toString(16));
        
        return [firstWord, secondWord];
    }
}
