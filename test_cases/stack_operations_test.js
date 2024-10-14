import { CASL2Simulator } from '../casl2-core.js';

describe('CASL2 Stack Operations Test', () => {
  let simulator;

  beforeEach(() => {
    simulator = new CASL2Simulator();
  });

  test('PUSH operation', () => {
    simulator.updateRegister(1, 42);
    simulator.executeInstruction(0x70, 1, 0, 0); // PUSH GR1
    expect(simulator.memory[simulator.SP - 1]).toBe(42);
  });

  test('POP operation', () => {
    simulator.push(24);
    simulator.executeInstruction(0x71, 2, 0, 0); // POP GR2
    expect(simulator.registers[2]).toBe(24);
  });

  test('RPUSH operation', () => {
    for (let i = 0; i < 8; i++) {
      simulator.updateRegister(i, i * 10);
    }
    simulator.executeInstruction(0x72, 0, 0, 0); // RPUSH
    for (let i = 0; i < 8; i++) {
      expect(simulator.memory[simulator.SP - 8 + i]).toBe(i * 10);
    }
  });

  test('RPOP operation', () => {
    for (let i = 0; i < 8; i++) {
      simulator.push((7 - i) * 10);
    }
    simulator.executeInstruction(0x73, 0, 0, 0); // RPOP
    for (let i = 0; i < 8; i++) {
      expect(simulator.registers[i]).toBe((7 - i) * 10);
    }
  });
});
