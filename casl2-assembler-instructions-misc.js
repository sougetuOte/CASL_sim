import { CASL2AssemblerInstructionsBase } from './casl2-assembler-instructions-base.js';

export class CASL2AssemblerInstructionsMisc extends CASL2AssemblerInstructionsBase {
    assembleStack(instruction, r) {
        console.log('Assembling Stack instruction:', instruction, r);
        if (instruction !== 'PUSH' && instruction !== 'POP') {
            throw new Error(`Invalid stack instruction: ${instruction}`);
        }
        const op = instruction === 'PUSH' ? 0x70 : 0x71;
        const gr = this.assemblerUtils.parseRegister(r);
        const result = (op << 8) | (gr << 4);
        console.log('Stack instruction result:', result.toString(16));
        return result;
    }

    assembleSVC(num) {
        console.log('Assembling SVC instruction:', num);
        const svcNum = parseInt(num, 10);
        if (isNaN(svcNum) || svcNum < 0 || svcNum > 255) {
            throw new Error(`無効なSVC番号: ${num}`);
        }
        const result = (0xF0 << 8) | svcNum;
        console.log('SVC instruction result:', result.toString(16));
        return result;
    }

    assembleDC(value) {
        console.log('Assembling DC instruction:', value);
        let result;
        if (value.startsWith("'") && value.endsWith("'")) {
            result = value.charCodeAt(1);
        } else {
            const intValue = parseInt(value, 10);
            if (isNaN(intValue)) {
                throw new Error(`無効な定数値: ${value}`);
            }
            result = intValue & 0xFFFF;
        }
        console.log('DC instruction result:', result.toString(16));
        return result;
    }

    assembleIO(instruction, r, address) {
        console.log('Assembling IO instruction:', instruction, r, address);
        const opcode = instruction === 'IN' ? 0x90 : 0x91;
        console.log('IO opcode:', opcode.toString(16));
        
        const rCode = this.assemblerUtils.parseRegister(r);
        console.log('Register:', rCode.toString(16));
        
        const addr = this.assemblerUtils.resolveAddress(address, this.labelTable);
        console.log('Address:', addr.toString(16));
        
        const firstWord = (opcode << 8) | (rCode << 4) | ((addr >> 8) & 0xF);
        console.log('First word:', firstWord.toString(16));
        
        const secondWord = addr & 0xFFFF;
        console.log('Second word:', secondWord.toString(16));
        
        return [firstWord, secondWord];
    }
}
