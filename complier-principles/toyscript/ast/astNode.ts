import type { Token } from "../token"
export interface Visitor<R> {
    visitBinaryExpr(expr: Binary): R
    visitUnaryExpr(expr: Unary): R
    visitLiteralExpr<T>(expr: Literal<T>): R
    visitGroupingExpr(expr: Grouping): R

}
export abstract class Expr {
    abstract accept<R>(visitor: Visitor<R>): R
}
export class Binary extends Expr {
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitBinaryExpr(this)
    }

    left: Expr
    operator: Token
    right: Expr
    constructor(left: Expr, operator: Token, right: Expr) {
        super()
        this.left = left
        this.operator = operator
        this.right = right
    }
}
export class Unary extends Expr {
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitUnaryExpr(this)
    }

    operator: Token
    right: Expr
    constructor(operator: Token, right: Expr) {
        super()
        this.operator = operator
        this.right = right
    }
}
export class Literal<T> extends Expr {
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitLiteralExpr(this)
    }

    value: T
    constructor(value: T) {
        super()
        this.value = value
    }
}
export class Grouping extends Expr {
    accept<R>(visitor: Visitor<R>): R {
        return visitor.visitGroupingExpr(this)
    }

    expression: Expr
    constructor(expression: Expr) {
        super()
        this.expression = expression
    }
}


