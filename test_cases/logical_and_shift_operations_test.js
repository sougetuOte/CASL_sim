import { CASL2Simulator } from '../casl2-core.js';

describe('CASL2 Logical and Shift Operations Test', () => {
  let simulator;

  beforeEach(() => {
    simulator = new CASL2Simulator();
  });

  test('Logical AND operation', () => {
    simulator.updateRegister(1, 0b1010);
    simulator.updateRegister(2, 0b1100);
    simulator.executeInstruction(0x30, 1, 2, 0); // AND GR1, GR2
    expect(simulator.registers[1]).toBe(0b1000);
  });

  test('Logical OR operation', () => {
    simulator.updateRegister(1, 0b1010);
    simulator.updateRegister(2, 0b0101);
    simulator.executeInstruction(0x31, 1, 2, 0); // OR GR1, GR2
    expect(simulator.registers[1]).toBe(0b1111);
  });

  test('Logical XOR operation', () => {
    simulator.updateRegister(1, 0b1010);
    simulator.updateRegister(2, 0b1100);
    simulator.executeInstruction(0x32, 1, 2, 0); // XOR GR1, GR2
    expect(simulator.registers[1]).toBe(0b0110);
  });

  // シフト操作のテストケースは、CASL2シミュレータにシフト命令が実装されている場合に追加してください
});
