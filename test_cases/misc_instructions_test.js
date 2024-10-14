import { CASL2AssemblerInstructionsMisc } from '../casl2-assembler-instructions-misc.js';
import { CASL2AssemblerUtils } from '../casl2-assembler-utils.js';

describe('CASL2 Assembler Misc Instructions Test', () => {
  let assemblerMisc;
  let assemblerUtils;
  let labelTable;

  beforeEach(() => {
    assemblerUtils = new CASL2AssemblerUtils();
    labelTable = new Map();
    assemblerMisc = new CASL2AssemblerInstructionsMisc(assemblerUtils, labelTable);
  });

  test('PUSH instruction assembly', () => {
    const result = assemblerMisc.assembleStack('PUSH', 'GR1');
    expect(result).toBe(0x7010); // 0111 0000 0001 0000
  });

  test('POP instruction assembly', () => {
    const result = assemblerMisc.assembleStack('POP', 'GR2');
    expect(result).toBe(0x7120); // 0111 0001 0010 0000
  });

  test('SVC instruction assembly', () => {
    const result = assemblerMisc.assembleSVC('1');
    expect(result).toBe(0xF001); // 1111 0000 0000 0001
  });

  test('DC instruction assembly with number', () => {
    const result = assemblerMisc.assembleDC('42');
    expect(result).toBe(42);
  });

  test('DC instruction assembly with character', () => {
    const result = assemblerMisc.assembleDC("'A'");
    expect(result).toBe(65); // ASCII code for 'A'
  });

  test('IN instruction assembly', () => {
    labelTable.set('BUFFER', 0x1000);
    const result = assemblerMisc.assembleIO('IN', 'GR1', 'BUFFER');
    expect(result).toEqual([0x9010, 0x1000]); // [1001 0000 0001 0000, 0001 0000 0000 0000]
  });

  test('OUT instruction assembly', () => {
    labelTable.set('BUFFER', 0x2000);
    const result = assemblerMisc.assembleIO('OUT', 'GR2', 'BUFFER');
    expect(result).toEqual([0x9120, 0x2000]); // [1001 0001 0010 0000, 0010 0000 0000 0000]
  });

  test('Invalid SVC number', () => {
    expect(() => {
      assemblerMisc.assembleSVC('256');
    }).toThrow('無効なSVC番号: 256');
  });

  test('Invalid DC value', () => {
    expect(() => {
      assemblerMisc.assembleDC('INVALID');
    }).toThrow('無効な定数値: INVALID');
  });

  test('Invalid stack instruction', () => {
    expect(() => {
      assemblerMisc.assembleStack('INVALID', 'GR1');
    }).toThrow('Invalid stack instruction: INVALID');
  });
});
