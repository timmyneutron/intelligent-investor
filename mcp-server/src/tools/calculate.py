import ast
import json
import operator

from fastmcp import FastMCP
from simpleeval import SimpleEval


def _create_evaluator() -> SimpleEval:
    s = SimpleEval()
    s.operators = {
        ast.Add: operator.add,
        ast.Sub: operator.sub,
        ast.Mult: operator.mul,
        ast.Div: operator.truediv,
        ast.FloorDiv: operator.floordiv,
        ast.Mod: operator.mod,
        ast.Pow: operator.pow,
        ast.USub: operator.neg,
        ast.UAdd: operator.pos,
    }
    s.functions = {
        "abs": abs,
        "round": round,
        "min": min,
        "max": max,
    }
    return s


def register(mcp: FastMCP) -> None:
    @mcp.tool(
        description="Evaluate a mathematical expression. Supports arithmetic "
        "(+, -, *, /, //, %, **), parentheses, and the functions "
        "abs(), round(), min(), max(). "
        "Example: 'round((1500.50 - 1200.75) * 12, 2)'",
    )
    async def calculate(expression: str) -> str:
        evaluator = _create_evaluator()
        result = evaluator.eval(expression)
        return json.dumps({"expression": expression, "result": result})
