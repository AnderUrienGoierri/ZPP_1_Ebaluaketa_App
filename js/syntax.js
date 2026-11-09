/**
 * ZPP Syntax Highlighter - Robust Java Tokenizer
 * Java iturburu-kodeari kolore profesionalak ezartzeko (VS Code / JetBrains Dark Style)
 * Token guztiak (aldagaiak, metodoak, tipoak, gako-hitzak, eragileak) koloreztatzen ditu.
 * Slot markatzaileak (__INPUT_SLOT_X__) ukitu gabe mantentzen ditu hutsuneak betetzeko.
 */

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function highlightJava(code) {
  if (!code) return '';

  // Token Regex Egitura:
  // 1. Slot markatzaileak: __INPUT_SLOT_\d+__
  // 2. Iruzkinak: // edo /* */
  // 3. Kateak (Single-line seguruak, \ eta komatxo ihesekin): "..." edo '...'
  // 4. Anotazioak: @Override, etab.
  // 5. Java Gako-hitzak (Keywords): public, private, volatile, synchronized, if, while...
  // 6. Oinarrizko Datu-Motak (Primitive Types): boolean, byte, char, double, float, int, long, short, void
  // 7. Klaseak eta Datu-Mota Konplexuak (PascalCase): ProcessBuilder, Thread, String, AtomicInteger...
  // 8. Funtzio / Metodo Deiak: metodoIzena(...)
  // 9. Zenbakiak: 100, 0.1, 1000L...
  // 10. Eragileak / Operadoreak: ==, !=, &&, ||, ++, =, +, -, -> ...
  // 11. Aldagaiak / Identifikatzaileak: zatiak, komandoa, pid, prozesua...
  // 12. Puntuazioa: ;, (, ), {, }, [, ], ., ,
  // 13. Zuriuneak eta bestelako karaktereak banan-banan
  const tokenRegex = /(__INPUT_SLOT_\d+__)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\\n])*"|'(?:\\.|[^'\\\n])*')|(@[A-Za-z0-9_]+)|\b(abstract|assert|break|case|catch|class|const|continue|default|do|else|enum|extends|false|final|finally|for|goto|if|implements|import|instanceof|interface|native|new|null|package|private|protected|public|return|static|strictfp|super|switch|synchronized|this|throw|throws|transient|true|try|volatile|while)\b|\b(boolean|byte|char|double|float|int|long|short|void)\b|\b([A-Z][a-zA-Z0-9_]*)\b|\b([a-z_][a-zA-Z0-9_]*)(?=\s*\()|\b(\d+L?|\d+\.\d+(?:f|d)?)\b|(==|!=|<=|>=|&&|\|\||\+\+|--|->|\+=|-=|\*=|\/=|[-+*\/%=!<>~&|^?:])|\b([a-zA-Z_][a-zA-Z0-9_]*)\b|([()[\]{}.,;:])|(\s+)|(.)/g;

  let result = '';
  let match;
  tokenRegex.lastIndex = 0;

  while ((match = tokenRegex.exec(code)) !== null) {
    const [full, slot, comment, string, annotation, keyword, primType, type, method, number, operator, variable, punct, space, other] = match;

    if (slot) {
      result += slot;
    } else if (comment) {
      result += `<span class="token-comment">${escapeHtml(comment)}</span>`;
    } else if (string) {
      result += `<span class="token-string">${escapeHtml(string)}</span>`;
    } else if (annotation) {
      result += `<span class="token-annotation">${escapeHtml(annotation)}</span>`;
    } else if (keyword) {
      result += `<span class="token-keyword">${escapeHtml(keyword)}</span>`;
    } else if (primType || type) {
      result += `<span class="token-type">${escapeHtml(primType || type)}</span>`;
    } else if (method) {
      result += `<span class="token-method">${escapeHtml(method)}</span>`;
    } else if (number) {
      result += `<span class="token-number">${escapeHtml(number)}</span>`;
    } else if (operator) {
      result += `<span class="token-operator">${escapeHtml(operator)}</span>`;
    } else if (variable) {
      result += `<span class="token-variable">${escapeHtml(variable)}</span>`;
    } else if (punct) {
      result += `<span class="token-punct">${escapeHtml(punct)}</span>`;
    } else {
      result += escapeHtml(full);
    }
  }

  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { highlightJava };
}
