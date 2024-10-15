import { CASL2AssemblerInstructionsRX } from '../casl2-assembler-instructions-rx.js';
import { CASL2AssemblerUtils } from '../casl2-assembler-utils.js';

describe('CASL2 Assembler RX Instructions Test', () => {
  let assemblerRX;
  let assemblerUtils;
  let labelTable;

  beforeEach(() => {
    assemblerUtils = new CASL2AssemblerUtils();
    labelTable = new Map();
    assemblerRX = new CASL2AssemblerInstructionsRX(assemblerUtils, labelTable);
  });

  test('CPA instruction assembly', () => {
    const result = assemblerRX.assembleRX('CPA', 'GR1', '#1000');
    expect(result).toEqual([0x4010, 0x03E8]); // [0100 0000 0001 0000, 0000 0011 1110 1000]
  });

  test('CPL instruction assembly', () => {
    const result = assemblerRX.assembleRX('CPL', 'GR2', '#2000');
    expect(result).toEqual([0x4120, 0x07D0]); // [0100 0001 0010 0000, 0000 0111 1101 0000]
  });

  test('CPA instruction with label', () => {
    labelTable.set('DATA', 0x1234);
    const result = assemblerRX.assembleRX('CPA', 'GR3', 'DATA');
    expect(result).toEqual([0x4030, 0x1234]); // [0100 0000 0011 0000, 0001 0010 0011 0100]
  });

  test('CPL instruction with label', () => {
    labelTable.set('BUFFER', 0x5678);
    const result = assemblerRX.assembleRX('CPL', 'GR4', 'BUFFER');
    expect(result).toEqual([0x4140, 0x5678]); // [0100 0001 0100 0000, 0101 0110 0111 1000]
  });

  test('CPA instruction with index register', () => {
    const result = assemblerRX.assembleRX('CPA', 'GR1', '#1000, GR2');
    expect(result).toEqual([0x4012, 0x03E8]); // [0100 0000 0001 0010, 0000 0011 1110 1000]
  });

  test('CPL instruction with index register and label', () => {
    labelTable.set('DATA', 0x1234);
    const result = assemblerRX.assembleRX('CPL', 'GR3', 'DATA, GR4');
    expect(result).toEqual([0x4134, 0x1234]); // [0100 0001 0011 0100, 0001 0010 0011 0100]
  });

  test('Invalid instruction', () => {
    expect(() => {
      assemblerRX.assembleRX('INVALID', 'GR1', '#1000');
    }).toThrow('無効な命令: INVALID');
  });

  test('Invalid address', () => {
    expect(() => {
      assemblerRX.assembleRX('CPA', 'GR1', 'INVALID_LABEL');
    }).toThrow('アドレス解決エラー: 未定義のラベル: INVALID_LABEL');
  });

  test('Invalid index register', () => {
    expect(() => {
      assemblerRX.assembleRX('CPA', 'GR1', '#1000, INVALID');
    }).toThrow('無効なレジスタ指定: INVALID (GRで始まる必要があります)');
  });
});
