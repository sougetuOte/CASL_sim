import { CASL2Simulator } from './casl2-core.js';
import { CASL2Assembler } from './casl2-assembler.js';
import { multiplicationTest } from './test_cases/multiplication_test.js';
import { inputComparisonTest } from './test_cases/input_comparison_test.js';
import { arithmeticOperationsTest } from './test_cases/arithmetic_operations_test.js';
import { logicalAndShiftOperationsTest } from './test_cases/logical_and_shift_operations_test.js';
import { conditionalAndComparisonTest } from './test_cases/conditional_and_comparison_test.js';
import { stackOperationsTest } from './test_cases/stack_operations_test.js';

export class CASL2TestSuite {
    constructor() {
        this.simulator = new CASL2Simulator();
        this.assembler = new CASL2Assembler();
        this.testCases = [
            multiplicationTest,
            inputComparisonTest,
            ...arithmeticOperationsTest,
            ...logicalAndShiftOperationsTest,
            ...conditionalAndComparisonTest,
            stackOperationsTest
        ];
    }

    runTests() {
        console.log('CASL2 Test Suite: Starting tests');
        this.testCases.forEach(testCase => {
            console.log(`Running test: ${testCase.name}`);
            const assembleResult = this.assembler.assemble(testCase.code);
            if (!assembleResult.success) {
                console.error(`Assembly failed for test ${testCase.name}: ${assembleResult.error}`);
                return;
            }

            this.simulator.reset();
            this.simulator.memory = assembleResult.memory;

            if (testCase.testCases) {
                // Multiple input cases
                testCase.testCases.forEach((subCase, index) => {
                    console.log(`  Subcase ${index + 1}`);
                    this.runSingleTest(subCase, testCase.name);
                });
            } else {
                // Single test case
                this.runSingleTest(testCase, testCase.name);
            }
        });
        console.log('CASL2 Test Suite: All tests completed');
    }

    runSingleTest(testCase, testName) {
        if (testCase.input) {
            // Set up input for the test
            this.simulator.input = testCase.input;
        }

        this.simulator.run();

        const testPassed = this.checkResults(testCase.expectedResults);
        console.log(`Test ${testName}: ${testPassed ? 'PASSED' : 'FAILED'}`);
        if (!testPassed) {
            console.log('Expected:', testCase.expectedResults);
            console.log('Actual:', this.getActualResults());
        }
    }

    checkResults(expectedResults) {
        const actualResults = this.getActualResults();
        return JSON.stringify(actualResults) === JSON.stringify(expectedResults);
    }

    getActualResults() {
        return {
            registers: [...this.simulator.registers],
            memory: [...this.simulator.memory.slice(0, 100)], // 最初の100ワードのみ
            output: this.simulator.output
        };
    }
}

// テストスイートのインスタンスを作成
const testSuite = new CASL2TestSuite();

// テストを実行する関数
export function runCASL2Tests() {
    testSuite.runTests();
}
