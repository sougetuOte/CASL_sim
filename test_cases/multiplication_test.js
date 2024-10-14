import { CASL2Simulator } from '../casl2-core.js';

describe('CASL2 Multiplication Test', () => {
  let simulator;

  beforeEach(() => {
    simulator = new CASL2Simulator();
  });

  test('Multiplication of two positive numbers', () => {
    // 3 * 4 = 12 をシミュレート
    simulator.updateRegister(1, 3);  // GR1 = 3 (multiplicand)
    simulator.updateRegister(2, 4);  // GR2 = 4 (multiplier)
    simulator.updateRegister(3, 0);  // GR3 = 0 (result)
    
    // Multiplication loop
    for (let i = 0; i < simulator.registers[2]; i++) {
      simulator.executeInstruction(0x20, 3, 1, 0); // ADDA GR3, GR1
    }
    
    expect(simulator.registers[3]).toBe(12);
  });

  test('Multiplication by zero', () => {
    simulator.updateRegister(1, 5);  // GR1 = 5 (multiplicand)
    simulator.updateRegister(2, 0);  // GR2 = 0 (multiplier)
    simulator.updateRegister(3, 0);  // GR3 = 0 (result)

    // No multiplication needed
    expect(simulator.registers[3]).toBe(0);
  });

  test('Multiplication by one', () => {
    simulator.updateRegister(1, 7);  // GR1 = 7 (multiplicand)
    simulator.updateRegister(2, 1);  // GR2 = 1 (multiplier)
    simulator.updateRegister(3, 0);  // GR3 = 0 (result)

    // One iteration of addition
    simulator.executeInstruction(0x20, 3, 1, 0); // ADDA GR3, GR1

    expect(simulator.registers[3]).toBe(7);
  });
});
