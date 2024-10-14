import { CASL2Simulator } from '../casl2-core.js';

describe('CASL2 Input and Comparison Test', () => {
  let simulator;

  beforeEach(() => {
    simulator = new CASL2Simulator();
  });

  test('Input operation', () => {
    const inputValue = 42;
    const result = simulator.executeInstruction(0x90, 1, 0, 0); // IN GR1, 0
    expect(result).toEqual({ type: 'IN', register: 1, address: 0 });
    // 注: 実際の入力操作はUIに依存するため、ここではシミュレータの動作のみをテストします
  });

  test('Comparison operation (CPA)', () => {
    simulator.updateRegister(1, 10);
    simulator.updateRegister(2, 5);
    simulator.executeInstruction(0x40, 1, 2, 0); // CPA GR1, GR2
    expect(simulator.FR & 0x01).toBe(0); // ZF should be 0
    expect(simulator.FR & 0x04).toBe(0); // SF should be 0
  });

  // 他の比較操作（CPL, CPH）のテストケースも追加できます
});
