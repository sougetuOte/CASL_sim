import { CASL2AssemblerInstructionsBase } from './casl2-assembler-instructions-base.js';
import { CASL2AssemblerInstructionsRR } from './casl2-assembler-instructions-rr.js';
import { CASL2AssemblerInstructionsRX } from './casl2-assembler-instructions-rx.js';
import { CASL2AssemblerInstructionsRS } from './casl2-assembler-instructions-rs.js';
import { CASL2AssemblerInstructionsJump } from './casl2-assembler-instructions-jump.js';
import { CASL2AssemblerInstructionsMisc } from './casl2-assembler-instructions-misc.js';

export class CASL2AssemblerInstructions extends CASL2AssemblerInstructionsBase {
    constructor(assemblerUtils, labelTable) {
        super(assemblerUtils, labelTable);
        this.rr = new CASL2AssemblerInstructionsRR(assemblerUtils, labelTable);
        this.rx = new CASL2AssemblerInstructionsRX(assemblerUtils, labelTable);
        this.rs = new CASL2AssemblerInstructionsRS(assemblerUtils, labelTable);
        this.jump = new CASL2AssemblerInstructionsJump(assemblerUtils, labelTable);
        this.misc = new CASL2AssemblerInstructionsMisc(assemblerUtils, labelTable);
    }

    assembleRR(...args) {
        return this.rr.assembleRR(...args);
    }

    assembleRX(...args) {
        return this.rx.assembleRX(...args);
    }

    assembleRS(...args) {
        return this.rs.assembleRS(...args);
    }

    assembleJump(...args) {
        return this.jump.assembleJump(...args);
    }

    assembleCall(...args) {
        return this.jump.assembleCall(...args);
    }

    assembleRet() {
        return this.jump.assembleRet();
    }

    assembleStack(...args) {
        return this.misc.assembleStack(...args);
    }

    assembleSVC(...args) {
        return this.misc.assembleSVC(...args);
    }

    assembleDC(...args) {
        return this.misc.assembleDC(...args);
    }

    assembleIO(...args) {
        return this.misc.assembleIO(...args);
    }
}
