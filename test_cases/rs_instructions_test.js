import { CASL2AssemblerInstructionsRS } from '../casl2-assembler-instructions-rs.js';
import { CASL2AssemblerUtils } from '../casl2-assembler-utils.js';

describe('CASL2 Assembler RS Instructions Test', () => {
  let assemblerRS;
  let assemblerUtils;
  let labelTable;

  beforeEach(() => {
    assemblerUtils = new CASL2AssemblerUtils();
    labelTable = new Map();
    assemblerRS = new CASL2AssemblerInstructionsRS(assemblerUtils, labelTable);
  });

  test('SLA instruction assembly', () => {
    const result = assemblerRS.assembleRS('SLA', 'GR1', '2');
    expect(result).toBe(0x5012); // 0101 0000 0001 0010
  });

  test('SRA instruction assembly', () => {
    const result = assemblerRS.assembleRS('SRA', 'GR2', '3');
    expect(result).toBe(0x5123); // 0101 0001 0010 0011
  });

  test('SLL instruction assembly', () => {
    const result = assemblerRS.assembleRS('SLL', 'GR3', '4');
    expect(result).toBe(0x5234); // 0101 0010 0011 0100
  });

  test('SRL instruction assembly', () => {
    const result = assemblerRS.assembleRS('SRL', 'GR4', '5');
    expect(result).toBe(0x5345); // 0101 0011 0100 0101
  });

  test('Invalid shift amount', () => {
    expect(() => {
      assemblerRS.assembleRS('SLA', 'GR1', '16');
    }).toThrow('無効なシフト量: 16');
  });

  test('Invalid instruction', () => {
    expect(() => {
      assemblerRS.assembleRS('INVALID', 'GR1', '2');
    }).toThrow('無効な命令: INVALID');
  });
});
