import type { Binary, Grouping, Literal, Unary, Visitor, Expr } from './index';

export class AstPrinter implements Visitor<string> {
    print(expr: Expr): string {
        return expr.accept(this)
    }
    visitBinaryExpr(expr: Binary): string {
        return this.parenthesize(expr.operator.lexeme, expr.left, expr.right);
    }

    visitUnaryExpr(expr: Unary): string {
        return this.parenthesize(expr.operator.lexeme, expr.right);
    }

    visitLiteralExpr<T>(expr: Literal<T>): string {
        return JSON.stringify(expr.value);
    }

    visitGroupingExpr(expr: Grouping): string {
        return this.parenthesize('group', expr.expression);
    }

    private parenthesize(name: string, ...expressions: Expr[]): string {
        let result = `(${name} `;
        for (const expression of expressions) {
            result += `${expression.accept(this)}`;
        }
        result += ')';
        return result;
    }
}