import argparse
import uvicorn
 
from . import config
 
 
def main():
    parser = argparse.ArgumentParser(description="Intelligent Investor Agent")
    parser.add_argument(
        "--local", "-l",
        action="store_true",
        help="Use local Ollama LLM instead of Anthropic cloud",
    )
    parser.add_argument(
        "--port", "-p",
        type=int,
        default=8000,
        help="Port to run the server on (default: 8000)",
    )
    args = parser.parse_args()
 
    config.USE_LOCAL_LLM = args.local
 
    if args.local:
        print(f"Using local Ollama LLM ({config.OLLAMA_MODEL})")
    else:
        print(f"Using Anthropic cloud LLM ({config.ANTHROPIC_MODEL})")
 
    uvicorn.run("src.main:app", host="0.0.0.0", port=args.port)
 
 
if __name__ == "__main__":
    main()