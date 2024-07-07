// expression     → equality ;
// equality       → comparison ( ( "!=" | "==" ) comparison )* ;
// comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
// term           → factor ( ( "-" | "+" ) factor )* ;
// factor         → unary ( ( "/" | "*" ) unary )* ;
// unary          → ( "!" | "-" ) unary
//                | primary ;
// primary        → NUMBER | STRING | "true" | "false" | "nil"
//                | "(" expression ")" ;

import type { Token } from "./token";
import { Binary, Expr, Grouping, Literal, Unary } from "./ast";
import { TokenType } from "./tokenType";

export class Parser {
    tokens: Token[] = []
    current: number = 0
    constructor(tokens: Token[]) {
        this.tokens = tokens
    }
    public parse() {
        return this.expression()
    }
    private match(...types: TokenType[]) {
        for (const type of types) {
            if (this.check(type)) {

                this.advance()
                return true
            }
        }
        return false
    }
    private check(type: TokenType) {
        if (this.isAtEnd()) return false
        return this.peek().type == type
    }
    private isAtEnd() {
        return this.peek().type == TokenType.EOF
    }
    private advance() {
        if (!this.isAtEnd()) this.current++
        return this.previous()
    }
    private peek() {
        return this.tokens[this.current]
    }
    private previous() {
        return this.tokens[this.current - 1]
    }
    private expression(): Expr {
        return this.equality()
    }
    private equality(): Expr {
        let expr: Expr = this.comparison()
        while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
            let operator = this.previous()
            let right = this.comparison()
            expr = new Binary(expr, operator, right)
        }
        return expr
    }
    private comparison(): Expr {
        let expr: Expr = this.term()
        while (this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)) {
            const operator = this.previous()
            const right = this.term()
            expr = new Binary(expr, operator, right)
        }
        return expr
    }
    private term(): Expr {
        let expr = this.factor()
        while (this.match(TokenType.MINUS, TokenType.PLUS)) {
            const operator = this.previous()
            const right = this.factor()
            expr = new Binary(expr, operator, right)
        }
        return expr
    }
    private factor(): Expr {
        let expr = this.unary()
        while (this.match(TokenType.SLASH, TokenType.STAR)) {
            const operator = this.previous()
            const right = this.unary()
            expr = new Binary(expr, operator, right)
        }
        return expr
    }
    private unary(): Expr {
        while (this.match(TokenType.BANG, TokenType.MINUS)) {
            let operator = this.previous()
            let right = this.unary()
            return new Unary(operator, right)
        }
        return this.primary()

    }
    private primary(): Expr {
        if (this.match(TokenType.FALSE)) return new Literal(false)
        if (this.match(TokenType.TRUE)) return new Literal(true)
        if (this.match(TokenType.NIL)) return new Literal(null)
        if (this.match(TokenType.NUMBER, TokenType.STRING)) return new Literal(this.previous().literal)
        if (this.match(TokenType.LEFT_PAREN)) {
            const expr = this.expression()
            this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.")
            throw (this.peek(), "Expect ')' after expression.")
        }
        throw (this.peek(), "Expect expression.")
    }

    consume(type: TokenType, message: string) {
        if (this.check(type)) return this.advance()
        throw (this.peek(), message)
    }
}
