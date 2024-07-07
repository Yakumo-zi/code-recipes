import { Lox } from './lox'
import { AstPrinter, Expr, Binary, Unary, Grouping, Literal } from './ast'
import { TokenType } from './tokenType'
import { Token } from './token'

const expression = new Binary(
    new Unary(
        new Token(TokenType.MINUS, '-', null, 1),
        new Literal(123)
    ),
    new Token(TokenType.STAR, '*', null, 1),
    new Grouping(
        new Literal(45.67)
    )
)
console.log(new AstPrinter().print(expression))