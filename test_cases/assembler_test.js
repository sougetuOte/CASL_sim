import { CASL2Assembler } from '../casl2-assembler-main.js';

describe('CASL2 Assembler Test', () => {
  let assembler;

  beforeEach(() => {
    assembler = new CASL2Assembler();
  });

  test('Simple program assembly', () => {
    const code = `
      CASL START
      LAD GR1, 5
      LAD GR2, 3
      ADDA GR1, GR2
      RET
      END
    `;
    const result = assembler.assemble(code);
    expect(result.success).toBe(true);
    expect(result.memory).toBeDefined();
    expect(result.memory.length).toBeGreaterThan(0);
  });

  test('Invalid instruction', () => {
    const code = `
      CASL START
      INVALID GR1, 5
      END
    `;
    const result = assembler.assemble(code);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });

  test('Complex program with labels', () => {
    const code = `
      CASL START
      LAD GR1, 0
      LAD GR2, 10
    LOOP
      ADDA GR1, =1
      SUBA GR2, =1
      JNZ LOOP
      RET
      END
    `;
    const result = assembler.assemble(code);
    expect(result.success).toBe(true);
    expect(result.memory).toBeDefined();
    expect(result.memory.length).toBeGreaterThan(0);
  });

  test('Program with data section', () => {
    const code = `
      CASL START
      LAD GR1, DATA
      LD GR2, 0, GR1
      RET
    DATA DC 42
      END
    `;
    const result = assembler.assemble(code);
    expect(result.success).toBe(true);
    expect(result.memory).toBeDefined();
    expect(result.memory.length).toBeGreaterThan(0);
  });

  test('Invalid operand', () => {
    const code = `
      CASL START
      LAD GR1, INVALID_LABEL
      END
    `;
    const result = assembler.assemble(code);
    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
