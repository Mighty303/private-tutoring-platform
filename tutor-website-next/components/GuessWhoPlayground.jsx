"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ─── Python Parser ────────────────────────────────────────────────────────────
function parsePythonCharacters(code) {
  try {
    const match = code.match(/characters\s*=\s*\{([\s\S]*?)\}/);
    if (!match) return null;

    const body = match[1];
    const entries = {};
    const lineRegex = /["'](\w+)["']\s*:\s*\[([\s\S]*?)\]/g;
    let m;
    while ((m = lineRegex.exec(body)) !== null) {
      const name = m[1];
      const vals = m[2]
        .split(",")
        .map((v) => v.trim().replace(/^['"]|['"]$/g, ""));
      if (vals.length >= 4) {
        entries[name] = {
          gender: vals[0],
          outfit: vals[1],
          accessory: vals[2],
          face: vals[3],
        };
      }
    }
    return Object.keys(entries).length > 0 ? entries : null;
  } catch {
    return null;
  }
}

const FACE_EMOJI = {
  smile: "😊", happy: "😄", cool: "😎", determined: "😤",
  sweet: "🥰", silly: "🤪", serious: "😐", sad: "😢",
  angry: "😠", surprised: "😲", wink: "😉", neutral: "😶",
};
const ACCESSORY_ICON = {
  none: null, shades: "🕶️", cape: "🦸", crown: "👑",
  wings: "🪽", hat: "🎩", mask: "🎭", bow: "🎀",
};
const OUTFIT_COLOR = {
  "classic noob": "#44cf6c", "bacon hair": "#e05a5a", guest: "#94a3b8",
  superhero: "#6366f1", princess: "#ec4899", wizard: "#8b5cf6",
  ninja: "#1e293b", pirate: "#b45309", astronaut: "#0ea5e9", knight: "#64748b",
};

function CharacterCard({ name, data, isSelected, isRevealed, isEliminated, onClick }) {
  const faceEmoji = FACE_EMOJI[data.face.toLowerCase()] || "😶";
  const accessoryEmoji = ACCESSORY_ICON[data.accessory.toLowerCase()];
  const outfitColor = OUTFIT_COLOR[data.outfit.toLowerCase()] || "#6366f1";
  const genderColor = data.gender.toLowerCase() === "female" ? "#f472b6" : "#60a5fa";

  return (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center rounded-xl border-2 p-3 transition-all duration-300 text-left w-full
        ${isEliminated ? "opacity-30 scale-95 border-slate-700 bg-slate-900" : ""}
        ${isSelected ? "border-yellow-400 bg-yellow-400/10 shadow-[0_0_20px_rgba(250,204,21,0.3)]" : ""}
        ${!isSelected && !isEliminated ? "border-slate-600 bg-slate-800 hover:border-slate-400 hover:bg-slate-700" : ""}
        ${isRevealed && !isEliminated ? "border-emerald-400 bg-emerald-400/10 shadow-[0_0_20px_rgba(52,211,153,0.3)]" : ""}
      `}
    >
      {isEliminated && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-red-500 text-4xl font-black opacity-60">✕</span>
        </div>
      )}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-1 relative"
        style={{ backgroundColor: outfitColor + "33", border: `2px solid ${outfitColor}` }}
      >
        {faceEmoji}
        {accessoryEmoji && (
          <span className="absolute -top-2 -right-1 text-base">{accessoryEmoji}</span>
        )}
      </div>
      <p className="font-bold text-white text-xs capitalize tracking-wide truncate w-full text-center">{name}</p>
      <div className="mt-1 space-y-0.5 w-full">
        <p className="text-xs text-slate-400 truncate"><span style={{ color: genderColor }}>⚥</span> {data.gender}</p>
        <p className="text-xs text-slate-400 truncate"><span style={{ color: outfitColor }}>👕</span> {data.outfit}</p>
        <p className="text-xs text-slate-400 truncate">✨ {data.accessory}</p>
      </div>
      {isRevealed && <div className="mt-1 text-xs font-bold text-emerald-400">← ANSWER</div>}
    </button>
  );
}

function GuessWhoGame({ characters }) {
  const names = Object.keys(characters);
  const [secretKey, setSecretKey] = useState(() => names[Math.floor(Math.random() * names.length)]);
  const [cluesLeft, setCluesLeft] = useState(2);
  const [askedClues, setAskedClues] = useState([]);
  const [eliminated, setEliminated] = useState(new Set());
  const [gameState, setGameState] = useState("playing");
  const [guessInput, setGuessInput] = useState("");
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [message, setMessage] = useState(null);
  const [difficulty, setDifficulty] = useState(2);

  const reset = useCallback((newDiff = difficulty) => {
    const newNames = Object.keys(characters);
    setSecretKey(newNames[Math.floor(Math.random() * newNames.length)]);
    setCluesLeft(newDiff);
    setAskedClues([]);
    setEliminated(new Set());
    setGameState("playing");
    setGuessInput("");
    setSelectedGuess(null);
    setMessage(null);
    setDifficulty(newDiff);
  }, [characters, difficulty]);

  const askClue = (attr) => {
    if (cluesLeft <= 0 || gameState !== "playing") return;
    const val = characters[secretKey][attr];
    setAskedClues((prev) => [...prev, { attr, val }]);
    setCluesLeft((c) => c - 1);
    const newElim = new Set(eliminated);
    Object.entries(characters).forEach(([name, data]) => {
      if (data[attr] !== val) newElim.add(name);
    });
    setEliminated(newElim);
  };

  const makeGuess = () => {
    const guess = (selectedGuess || guessInput).toLowerCase().trim();
    if (!guess || gameState !== "playing") return;
    if (cluesLeft > 0) {
      setMessage({ text: `You have ${cluesLeft} clue${cluesLeft > 1 ? "s" : ""} left — use them first!` });
      return;
    }
    setGameState(guess === secretKey ? "won" : "lost");
  };

  const attrLabels = [
    { key: "gender", label: "Gender", emoji: "⚥" },
    { key: "outfit", label: "Outfit", emoji: "👕" },
    { key: "accessory", label: "Accessory", emoji: "✨" },
    { key: "face", label: "Face", emoji: "😊" },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="text-white font-bold text-sm">🎮 Live Game Preview</h3>
          <p className="text-slate-400 text-xs">I've picked a secret character…</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((d) => (
            <button key={d} onClick={() => reset(d)}
              className={`text-xs px-2 py-1 rounded-full border transition-all ${difficulty === d ? "border-violet-400 text-violet-300 bg-violet-400/10" : "border-slate-600 text-slate-400 hover:border-slate-400"}`}>
              {d === 1 ? "Hard" : d === 2 ? "Normal" : "Easy"} ({d})
            </button>
          ))}
          <button onClick={() => reset()} className="text-xs px-3 py-1 rounded-full bg-slate-700 text-slate-300 hover:bg-slate-600 border border-slate-600 transition-all">New Game</button>
        </div>
      </div>

      {gameState === "playing" && (
        <div className="flex flex-wrap gap-2">
          {attrLabels.map(({ key, label, emoji }) => {
            const alreadyAsked = askedClues.some((c) => c.attr === key);
            return (
              <button key={key} onClick={() => askClue(key)} disabled={cluesLeft <= 0 || alreadyAsked}
                className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium
                  ${alreadyAsked || cluesLeft <= 0 ? "border-slate-700 text-slate-600 cursor-not-allowed" : "border-violet-500 text-violet-300 hover:bg-violet-500/20 bg-violet-500/10"}`}>
                {emoji} Ask {label}
              </button>
            );
          })}
          <span className="ml-auto text-xs text-slate-400 self-center">{cluesLeft} clue{cluesLeft !== 1 ? "s" : ""} left</span>
        </div>
      )}

      {askedClues.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {askedClues.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5 bg-slate-700/50 border border-slate-600 rounded-full px-3 py-1">
              <span className="text-slate-400 text-xs capitalize">{c.attr}:</span>
              <span className="text-white font-semibold text-xs">{c.val}</span>
            </div>
          ))}
        </div>
      )}

      {gameState === "playing" && cluesLeft === 0 && (
        <div className="flex gap-2">
          <input value={guessInput} onChange={(e) => { setGuessInput(e.target.value); setSelectedGuess(null); }}
            onKeyDown={(e) => e.key === "Enter" && makeGuess()}
            placeholder={selectedGuess ? `Guessing: ${selectedGuess}` : "Type a name or click a card…"}
            className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 focus:outline-none focus:border-violet-400" />
          <button onClick={makeGuess} className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-bold rounded-lg transition-all">Guess!</button>
        </div>
      )}

      {message && <div className="text-xs text-yellow-400 bg-yellow-400/10 border border-yellow-400/30 rounded-lg px-3 py-2">⚠️ {message.text}</div>}

      {gameState !== "playing" && (
        <div className={`rounded-xl border p-4 text-center ${gameState === "won" ? "border-emerald-400 bg-emerald-400/10" : "border-red-400 bg-red-400/10"}`}>
          <p className="text-2xl mb-1">{gameState === "won" ? "🎉" : "❌"}</p>
          <p className={`font-bold text-lg ${gameState === "won" ? "text-emerald-300" : "text-red-300"}`}>{gameState === "won" ? "YOU WIN!" : "YOU LOST!"}</p>
          <p className="text-slate-400 text-sm mt-1">The character was <span className="text-white font-bold capitalize">{secretKey}</span></p>
          <button onClick={() => reset()} className="mt-3 px-5 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg border border-slate-500 transition-all">Play Again</button>
        </div>
      )}

      <div className="grid gap-2" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))" }}>
        {Object.entries(characters).map(([name, data]) => (
          <CharacterCard key={name} name={name} data={data}
            isSelected={selectedGuess === name}
            isRevealed={gameState !== "playing" && name === secretKey}
            isEliminated={eliminated.has(name)}
            onClick={gameState === "playing" && cluesLeft === 0 ? () => { setSelectedGuess(name); setGuessInput(""); } : undefined}
          />
        ))}
      </div>
    </div>
  );
}

const DEFAULT_CODE = `import random

characters = {
    "noob": ["Male", "Classic Noob", "None", "Smile"],
    "bacon": ["Male", "Bacon Hair", "None", "Happy"],
    "guest": ["Female", "Guest", "Shades", "Cool"],
    "robby": ["Male", "Superhero", "Cape", "Determined"],
    "victoria": ["Female", "Princess", "Crown", "Sweet"]
}

clues_remaining = 2

# Pick a random character
secret = random.choice(list(characters.keys()))

while True:
    command = input("What would you like to do? ")
    
    if command == "list":
        for name, info in characters.items():
            print(f"{name}: {info}")
    
    elif command == "gender" and clues_remaining > 0:
        print(f"Clue: {characters[secret][0]}")
        clues_remaining -= 1
    
    elif command.startswith("guess "):
        name = command.split(" ")[1]
        if name == secret:
            print("🎉 YOU WIN!")
        else:
            print(f"❌ YOU LOST! It was {secret}!")
        break
`;

export default function GuessWhoPlayground() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [characters, setCharacters] = useState(null);
  const [parseError, setParseError] = useState(null);
  const [activeTab, setActiveTab] = useState("split");
  const textareaRef = useRef(null);

  useEffect(() => {
    const parsed = parsePythonCharacters(code);
    if (parsed) { setCharacters(parsed); setParseError(null); }
    else setParseError("Could not find a valid `characters` dictionary.");
  }, [code]);

  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const newCode = code.substring(0, start) + "    " + code.substring(end);
      setCode(newCode);
      setTimeout(() => { e.target.selectionStart = e.target.selectionEnd = start + 4; }, 0);
    }
  };

  const lineCount = code.split("\n").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col" style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}>
      <header className="border-b border-slate-800 px-4 py-3 flex items-center justify-between gap-4 bg-slate-900">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-sm">🎮</div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-tight">Guess Who — Roblox Edition</h1>
            <p className="text-slate-500 text-xs">Edit your Python → watch the game update live</p>
          </div>
        </div>
        <div className="flex gap-1 bg-slate-800 p-1 rounded-lg text-xs">
          {["split", "Code Only", "Game Only"].map(([val, label], i) => (
            <button key={val} onClick={() => setActiveTab(val)}
              className={`px-3 py-1.5 rounded-md transition-all font-medium ${activeTab === val ? "bg-violet-600 text-white" : "text-slate-400 hover:text-white"}`}>
              {label}
            </button>
          ))}
        </div>
      </header>

      <div className="bg-violet-900/30 border-b border-violet-800/50 px-4 py-2 flex items-center gap-2 text-xs text-violet-300">
        <span>💡</span>
        <span>Add or edit characters in the <code className="bg-violet-800/40 px-1 rounded">characters</code> dict — the game board updates instantly!</span>
      </div>

      <div className={`flex-1 flex overflow-hidden ${activeTab === "split" ? "flex-row" : "flex-col"}`}>
        {(activeTab === "split" || activeTab === "code") && (
          <div className={`flex flex-col ${activeTab === "split" ? "w-1/2 border-r border-slate-800" : "flex-1"}`}>
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
                <span className="ml-2 text-slate-500 text-xs">guess_who.py</span>
              </div>
              {parseError
                ? <span className="text-red-400 text-xs">⚠ Parse error</span>
                : <span className="text-emerald-400 text-xs">● {Object.keys(characters || {}).length} characters loaded</span>}
            </div>
            <div className="flex-1 overflow-auto flex bg-slate-950">
              <div className="select-none text-right pr-3 pt-4 pb-4 pl-4 text-slate-600 text-xs leading-6 sticky left-0" style={{ minWidth: "3rem" }}>
                {Array.from({ length: lineCount }, (_, i) => <div key={i}>{i + 1}</div>)}
              </div>
              <textarea ref={textareaRef} value={code} onChange={(e) => setCode(e.target.value)} onKeyDown={handleKeyDown}
                spellCheck={false}
                className="flex-1 bg-transparent text-slate-100 text-xs leading-6 pt-4 pb-4 pr-4 resize-none focus:outline-none"
                style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace", caretColor: "#a78bfa", whiteSpace: "pre", overflowX: "auto" }} />
            </div>
            {parseError && <div className="border-t border-red-900/50 bg-red-950/30 px-4 py-2 text-xs text-red-400">⚠ {parseError}</div>}
          </div>
        )}

        {(activeTab === "split" || activeTab === "game") && (
          <div className={`flex flex-col overflow-auto ${activeTab === "split" ? "w-1/2" : "flex-1"}`}>
            <div className="px-4 py-2 bg-slate-900 border-b border-slate-800 flex items-center gap-2">
              <span className="text-xs text-slate-400">🎮 Live Preview</span>
              {characters && <span className="ml-auto text-xs text-slate-500">{Object.keys(characters).length} characters</span>}
            </div>
            <div className="flex-1 p-4 overflow-auto bg-slate-950">
              {characters
                ? <GuessWhoGame key={JSON.stringify(Object.keys(characters))} characters={characters} />
                : <div className="flex flex-col items-center justify-center h-full text-center gap-3 text-slate-500">
                    <div className="text-5xl">🎭</div>
                    <p className="text-sm">Define your <code className="bg-slate-800 px-1.5 py-0.5 rounded text-violet-400">characters</code> dictionary to see the game!</p>
                  </div>}
            </div>
          </div>
        )}
      </div>

      <footer className="border-t border-slate-800 bg-slate-900 px-4 py-2 flex gap-6 text-xs text-slate-500 overflow-x-auto">
        <span>Tab → 4 spaces</span>
        <span>|</span>
        <span>Format: <code className="text-slate-400">[Gender, Outfit, Accessory, Face]</code></span>
        <span>|</span>
        <span>Click a card to guess (when 0 clues left)</span>
      </footer>
    </div>
  );
}
