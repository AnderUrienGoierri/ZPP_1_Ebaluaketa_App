/**
 * ZPP Syntax Highlighter - Robust Tokenizer
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

  // Token Regex Egitura (ordenan ebaluatzen da):
  // 1. Slot markatzaileak: __INPUT_SLOT_\d+__
  // 2. Iruzkinak: // edo /* */
  // 3. Kateak / Karaktereak: "..." edo '...'
  // 4. Anotazioak: @Override, etab.
  // 5. Java Gako-hitzak (Keywords): public, private, volatile, synchronized, if, while...
  // 6. Klaseak eta Datu-Motak (Types): Thread, Runnable, ProcessBuilder, String, int...
  // 7. Zenbakiak: 100, 0.1, 1000L...
  // 8. Funtzio / Metodo Deiak: metodoIzena(...)
  // 9. Eragileak / Operadoreak: ==, !=, &&, ||, ++, =, +, -, -> ...
  // 10. Aldagaiak / Identifikatzaileak: giltza, irabazlea, lasterketaAmaituta...
  // 11. Beste edozer (espazioak, puntuazio sinpleak)
  const tokenRegex = /(__INPUT_SLOT_\d+__)|(\/\/[^\n]*|\/\*[\s\S]*?\*\/)|("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])')|(@[A-Za-z0-9_]+)|\b(abstract|assert|break|case|catch|class|const|continue|default|do|else|enum|extends|false|final|finally|for|goto|if|implements|import|instanceof|interface|native|new|null|package|private|protected|public|return|static|strictfp|super|switch|synchronized|this|throw|throws|transient|true|try|volatile|while)\b|\b(boolean|byte|char|double|float|int|long|short|void|String|ProcessBuilder|Process|ProcessHandle|Thread|Runnable|Timer|TimerTask|SystemTray|TrayIcon|ArrayList|List|Map|HashMap|Set|HashSet|Collections|ConcurrentHashMap|CopyOnWriteArrayList|BlockingQueue|ArrayBlockingQueue|AtomicInteger|AtomicBoolean|AtomicLong|ReentrantLock|Lock|Condition|Semaphore|CountDownLatch|CyclicBarrier|Instant|LocalDateTime|ZoneId|DateTimeFormatter|JFrame|JPanel|JButton|JLabel|JTextField|JProgressBar|SwingUtilities|SwingWorker|Color|Object|System|Exception|InterruptedException|IOException)\b|\b(\d+L?|\d+\.\d+(?:f|d)?)\b|\b([a-zA-Z0-9_]+)(?=\s*\()|(==|!=|<=|>=|&&|\|\||\+\+|--|->|\+=|-=|\*=|\/=|[-+*\/%=!<>~&|^?:])|\b([a-zA-Z_][a-zA-Z0-9_]*)\b|(\s+|[^\s\w]+)/g;

  let result = '';
  let match;

  while ((match = tokenRegex.exec(code)) !== null) {
    const [full, slot, comment, string, annotation, keyword, type, number, method, operator, variable, other] = match;

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
    } else if (type) {
      result += `<span class="token-type">${escapeHtml(type)}</span>`;
    } else if (number) {
      result += `<span class="token-number">${escapeHtml(number)}</span>`;
    } else if (method) {
      result += `<span class="token-method">${escapeHtml(method)}</span>`;
    } else if (operator) {
      result += `<span class="token-operator">${escapeHtml(operator)}</span>`;
    } else if (variable) {
      result += `<span class="token-variable">${escapeHtml(variable)}</span>`;
    } else {
      result += escapeHtml(full);
    }
  }

  return result;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { highlightJava };
}
