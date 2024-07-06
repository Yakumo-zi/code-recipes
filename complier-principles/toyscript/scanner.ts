import { Lox } from "./lox";
import { Token } from "./token";
import { TokenType } from "./tokenType";
export class Scanner {
    private source: string;
    private tokens: Token[] = []
    private start: number = 0;
    private current: number = 0;
    private line: number = 1;

    private keywords: Map<string, TokenType> = new Map([
        ["and", TokenType.AND],
        ["class", TokenType.CLASS],
        ["else", TokenType.ELSE],
        ["false", TokenType.FALSE],
        ["for", TokenType.FOR],
        ["fun", TokenType.FUN],
        ["if", TokenType.IF],
        ["nil", TokenType.NIL],
        ["or", TokenType.OR],
        ["print", TokenType.PRINT],
        ["return", TokenType.RETURN],
        ["super", TokenType.SUPER],
        ["this", TokenType.THIS],
        ["true", TokenType.TRUE],
        ["var", TokenType.VAR],
        ["while", TokenType.WHILE]
    ])

    constructor(source: string) {
        this.source = source;
    }

    scanTokens(): Token[] {
        while (!this.isAtEnd()) {
            this.start = this.current
            this.scanToken()
        }
        this.tokens.push(new Token(TokenType.EOF, "", null, this.line))
        return this.tokens
    }

    scanToken() {
        let c = this.advance()
        switch (c) {
            case '(': this.addToken(TokenType.LEFT_PAREN, null); break;
            case ')': this.addToken(TokenType.RIGHT_PAREN, null); break;
            case '{': this.addToken(TokenType.LEFT_BRACE, null); break;
            case '}': this.addToken(TokenType.RIGHT_BRACE, null); break;
            case ',': this.addToken(TokenType.COMMA, null); break;
            case '.': this.addToken(TokenType.DOT, null); break;
            case '-': this.addToken(TokenType.MINUS, null); break;
            case '+': this.addToken(TokenType.PLUS, null); break;
            case ';': this.addToken(TokenType.SEMICOLON, null); break;
            case '*': this.addToken(TokenType.STAR, null); break;
            case '!': this.addToken(this.match('=') ? TokenType.BANG_EQUAL : TokenType.BANG, null); break;
            case '=': this.addToken(this.match('=') ? TokenType.EQUAL_EQUAL : TokenType.EQUAL, null); break;
            case '<': this.addToken(this.match('=') ? TokenType.LESS_EQUAL : TokenType.LESS, null); break;
            case '>': this.addToken(this.match('=') ? TokenType.GREATER_EQUAL : TokenType.GREATER, null); break;
            case '/':
                if (this.match('/')) {
                    while (this.peek() != '\n' && !this.isAtEnd()) this.advance()
                } else if (this.match('*')) {
                    while (this.peek() != '*' && this.peekNext() != '/' && !this.isAtEnd()) {
                        if (this.peek() == '\n') this.line++
                        this.advance()
                    }
                    if (this.isAtEnd()) {
                        Lox.error(this.line, "Unterminated block comment")
                        return
                    }
                    this.advance()
                    this.advance()
                }
                else {
                    this.addToken(TokenType.SLASH, null)
                }
                break;
            case ' ':
            case '\r':
            case '\t':
                break;
            case '\n':
                this.line++
                break;
            case '"':
                this.string()
                break;
            case 'o':
                if (this.peek() == 'r') {
                    this.addToken(TokenType.OR, null)
                } else {
                    this.identifer()
                }
                break;
            case 'a':
                if (this.peek() == 'n' && this.peekNext() == 'd') {
                    this.addToken(TokenType.AND, null)
                } else {
                    this.identifer()
                }
                break;
            default:
                if (this.isDigit(c)) {
                    this.number()
                } else if (this.isAlpha(c)) {
                    this.identifer()
                } else {
                    Lox.error(this.line, "Unexpected character")

                }
                break;
        }
    }
    identifer() {
        while (this.isAlpha(this.peek()) || this.isDigit(this.peek())) this.advance()
        let text = this.source.substring(this.start, this.current)
        let type = this.keywords.get(text)
        if (type == null) type = TokenType.IDENTIFIER
        this.addToken(TokenType.IDENTIFIER, text)
    }
    number() {
        while (this.isDigit(this.peek())) this.advance()
        if (this.peek() == '.' && this.isDigit(this.peekNext())) {
            this.advance()
            while (this.isDigit(this.peek())) this.advance()
        }
        this.addToken(TokenType.NUMBER, parseFloat(this.source.substring(this.start, this.current)))
    }
    string() {
        while (this.peek() != '"' && !this.isAtEnd()) {
            if (this.peek() == '\n') this.line++
            this.advance()
        }
        if (this.isAtEnd()) {
            Lox.error(this.line, "Unterminated string")
            return
        }
        this.advance()
        let value = this.source.substring(this.start + 1, this.current - 1)
        this.addToken(TokenType.STRING, value)
    }

    match(ch: string): boolean {
        if (this.isAtEnd()) return false
        if (this.source.charAt(this.current) != ch) return false;
        this.current++
        return true
    }

    peek(): string {
        if (this.isAtEnd()) return '\0';
        return this.source.charAt(this.current);
    }

    peekNext(): string {
        if (this.current + 1 >= this.source.length) return '\0'
        return this.source.charAt(this.current + 1)
    }

    advance(): string {
        this.current++
        return this.source.charAt(this.current - 1)
    }

    addToken(type: TokenType, literal: any) {
        let text = this.source.substring(this.start, this.current)
        this.tokens.push(new Token(type, text, literal, this.line))
    }

    isDigit(c: string): boolean {
        return c >= '0' && c <= '9'
    }

    isAlpha(c: string): boolean {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z') || c == '_'
    }

    isAtEnd(): boolean {
        return this.current >= this.source.length
    }
}
