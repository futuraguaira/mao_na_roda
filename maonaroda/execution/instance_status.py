from pathlib import Path

root = Path(__file__).resolve().parent.parent
expected = [
    root / "directives",
    root / "execution",
    root / ".tmp",
    root / "AGENTE.md",
    root / ".env.example",
]

missing = [path.name for path in expected if not path.exists()]

print("Instância do agente: Mão na Roda")
print("Diretórios e arquivos verificados:")
for path in expected:
    status = "ok" if path.exists() else "faltando"
    print(f"- {path.relative_to(root)}: {status}")

if missing:
    print("\nItens ausentes:")
    for item in missing:
        print(f"- {item}")
    raise SystemExit(1)

print("\nInstância pronta para uso.")
