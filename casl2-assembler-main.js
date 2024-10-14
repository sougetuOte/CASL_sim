import { CASL2Assembler } from './casl2-assembler-core.js';
import { CASL2AssemblerInstructions } from './casl2-assembler-instructions.js';
import { CASL2AssemblerUtils } from './casl2-assembler-utils.js';

// CASL2Assemblerクラスのインスタンス化と設定
const assemblerUtils = new CASL2AssemblerUtils();
const casl2Assembler = new CASL2Assembler();
const assemblerInstructions = new CASL2AssemblerInstructions(assemblerUtils, casl2Assembler.labelTable);

// CASL2AssemblerクラスにassemblerInstructionsを設定
casl2Assembler.assemblerInstructions = assemblerInstructions;

// CASL2Assemblerクラスをエクスポート
export { CASL2Assembler };

// 使用例
// const assembler = new CASL2Assembler();
// const result = assembler.assemble(codeString);
