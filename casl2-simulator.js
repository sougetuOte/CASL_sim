import { getMessage } from './config.js';
import { MemoryManager } from './casl2-simulator-memory.js';
import { InstructionExecutor } from './casl2-simulator-instructions.js';
import { Logger } from './casl2-simulator-utils.js';

export class CASL2Simulator {
    constructor() {
        this.memory = new MemoryManager();
        this.registers = new Uint16Array(8);  // GR0-GR7の8つの汎用レジスタ
        this.PR = 0;  // プログラムレジスタ
        this.SP = 0;  // スタックポインタ
        this.FR = 0;  // フラグレジスタ (OF, SF, ZF)

        this.labelTable = new Map();  // ラベルテーブル
        this.currentAddress = 0;      // 現在のアドレス

        this.running = false;         // プログラムが実行中かどうか
        this.breakpoints = new Set(); // ブレークポイントのセット

        this.ioLog = [];              // 入出力ログ
        this.executionHistory = [];   // 実行履歴
        this.logger = new Logger();

        this.instructionExecutor = new InstructionExecutor(this);
    }

    run() {
        this.running = true;
        while (this.running && this.PR < this.memory.size) {
            const instruction = this.memory.read(this.PR);
            const opcode = instruction >> 8;
            const r1 = (instruction >> 4) & 0xF;
            const r2 = instruction & 0xF;
            const address = this.memory.read(this.PR + 1);

            this.PR += 2;

            try {
                const result = this.instructionExecutor.execute(opcode, r1, r2, address);
                this.executionHistory.push({
                    address: this.PR - 2,
                    instruction: instruction.toString(16),
                    result: result
                });

                if (this.breakpoints.has(this.PR)) {
                    this.running = false;
                    this.logger.log(`Breakpoint hit at address ${this.PR}`);
                    break;
                }
            } catch (error) {
                this.running = false;
                this.logger.log(`Error at address ${this.PR - 2}: ${error.message}`);
                throw error;
            }
        }
        this.running = false;
    }

    output(message) {
        this.ioLog.push(message);
        this.logger.log(message);
    }

    // その他のメソッドは必要に応じて追加
}
