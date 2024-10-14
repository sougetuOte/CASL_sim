import { CASL2Simulator } from '../casl2-core.js';

describe('CASL2 Arithmetic Operations Test', () => {
  let simulator;

  beforeEach(() => {
    simulator = new CASL2Simulator();
  });

  test('Addition of two positive numbers', () => {
    simulator.updateRegister(1, 5);
    simulator.updateRegister(2, 3);
    simulator.executeInstruction(0x20, 1, 2, 0); // ADDA GR1, GR2
    expect(simulator.registers[1]).toBe(8);
  });

  test('Subtraction of two positive numbers', () => {
    simulator.updateRegister(1, 10);
    simulator.updateRegister(2, 4);
    simulator.executeInstruction(0x21, 1, 2, 0); // SUBA GR1, GR2
    expect(simulator.registers[1]).toBe(6);
  });

  // 他のテストケースを追加
});
