import { CASL2Simulator } from '../casl2-core.js';

describe('CASL2 Conditional and Comparison Test', () => {
  let simulator;

  beforeEach(() => {
    simulator = new CASL2Simulator();
  });

  test('Conditional jump (JZE) when zero flag is set', () => {
    simulator.FR = 0x01; // Set zero flag
    simulator.PR = 100;
    simulator.executeInstruction(0x63, 0, 0, 200); // JZE 200
    expect(simulator.PR).toBe(200);
  });

  test('Conditional jump (JZE) when zero flag is not set', () => {
    simulator.FR = 0x00; // Clear zero flag
    simulator.PR = 100;
    simulator.executeInstruction(0x63, 0, 0, 200); // JZE 200
    expect(simulator.PR).toBe(101); // PR should be incremented by 1
  });

  // 他の条件分岐命令（JMI, JPL, JOV, JUMP）のテストケースも追加できます
});
