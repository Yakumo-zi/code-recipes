import fs from 'node:fs/promises';
import readline from 'readline'
import { Scanner } from './scanner';
export class Lox {
    static hadError: boolean = false;
    static scanner: Scanner;
    static rl: readline.Interface = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    static async runFile(path: string) {
        const source = await fs.readFile(path, 'utf-8');
        Lox.run(source)
        if (this.hadError) process.exit(65)
    }

    static async runPrompt() {
        Lox.rl.setPrompt("lox>")
        Lox.rl.prompt()
        Lox.rl.on('line', (line) => {
            Lox.run(line)
            Lox.rl.prompt()
            Lox.hadError = false
        })
    }
    private static async run(source: string) {
        this.scanner = new Scanner(source)
        const tokens = this.scanner.scanTokens()
        console.log(tokens)
    }
    static error(line: number, message: string) {
        this.report(line, "", message)
    }
    private static report(line: number, where: string, message: string) {
        console.log(`[Line ${line}] Error ${where}: ${message}`)
    }
}