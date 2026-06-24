const STORAGE_KEY = "cipher-notes-v1";

const starterNotes = [
  {
    id: crypto.randomUUID(),
    title: "Launch v1.4.1",
    body: "Verify the EditorScreen hotfix, download the release artifact, and route the signal from GitHub into the app cockpit.",
    priority: "high",
    tag: "release",
    updatedAt: new Date().toISOString(),
  },
  {
    id: crypto.randomUUID(),
    title: "Cybernetic upgrade ideas",
    body: "Add encrypted sync, biometric unlock, a graph view for connected notes, and a glitch-mode focus timer.",
    priority: "medium",
    tag: "roadmap",
    updatedAt: new Date(Date.now() - 1000 * 60 * 24).toISOString(),
  },
];

const elements = {
  activeNoteStatus: document.querySelector("#activeNoteStatus"),
  deleteButton: document.querySelector("#deleteButton"),
  exportButton: document.querySelector("#exportButton"),
  form: document.querySelector("#noteForm"),
  newNoteButton: document.querySelector("#newNoteButton"),
  noteBody: document.querySelector("#noteBody"),
  noteCount: document.querySelector("#noteCount"),
  notePriority: document.querySelector("#notePriority"),
  notesList: document.querySelector("#notesList"),
  noteTag: document.querySelector("#noteTag"),
  noteTitle: document.querySelector("#noteTitle"),
  syncStatus: document.querySelector("#syncStatus"),
  wordCount: document.querySelector("#wordCount"),
};

let notes = loadNotes();
let activeNoteId = notes[0]?.id;

function loadNotes() {
  const savedNotes = localStorage.getItem(STORAGE_KEY);

  if (!savedNotes) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(starterNotes));
    return starterNotes;
  }

  try {
    const parsedNotes = JSON.parse(savedNotes);
    return Array.isArray(parsedNotes) && parsedNotes.length > 0 ? parsedNotes : starterNotes;
  } catch {
    return starterNotes;
  }
}

function saveNotes() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  elements.syncStatus.textContent = "saved";
  window.setTimeout(() => {
    elements.syncStatus.textContent = "local";
  }, 900);
}

function getActiveNote() {
  return notes.find((note) => note.id === activeNoteId) ?? notes[0];
}

function countWords() {
  return notes.reduce((total, note) => {
    const words = `${note.title} ${note.body}`.trim().split(/\s+/).filter(Boolean);
    return total + words.length;
  }, 0);
}

function formatTimestamp(isoDate) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(isoDate));
}

function renderNotesList() {
  elements.notesList.innerHTML = "";

  [...notes]
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
    .forEach((note) => {
      const button = document.createElement("button");
      const title = document.createElement("strong");
      const meta = document.createElement("small");
      const timestamp = document.createElement("small");

      button.className = `note-card${note.id === activeNoteId ? " active" : ""}`;
      button.type = "button";
      title.textContent = note.title || "Untitled signal";
      meta.textContent = `${note.priority.toUpperCase()} // ${note.tag || "untagged"}`;
      timestamp.textContent = formatTimestamp(note.updatedAt);

      button.append(title, meta, timestamp);
      button.addEventListener("click", () => {
        activeNoteId = note.id;
        render();
      });
      elements.notesList.append(button);
    });
}

function renderEditor() {
  const activeNote = getActiveNote();
  if (!activeNote) return;

  activeNoteId = activeNote.id;
  elements.noteTitle.value = activeNote.title;
  elements.noteBody.value = activeNote.body;
  elements.notePriority.value = activeNote.priority;
  elements.noteTag.value = activeNote.tag;
  elements.activeNoteStatus.textContent = `${activeNote.title || "Untitled signal"} // ${activeNote.priority} // ${activeNote.tag || "untagged"}`;
}

function renderStats() {
  elements.noteCount.textContent = notes.length;
  elements.wordCount.textContent = countWords();
}

function render() {
  renderNotesList();
  renderEditor();
  renderStats();
}

function updateActiveNote() {
  const activeNote = getActiveNote();
  if (!activeNote) return;

  activeNote.title = elements.noteTitle.value;
  activeNote.body = elements.noteBody.value;
  activeNote.priority = elements.notePriority.value;
  activeNote.tag = elements.noteTag.value;
  activeNote.updatedAt = new Date().toISOString();

  saveNotes();
  renderNotesList();
  renderStats();
  elements.activeNoteStatus.textContent = `${activeNote.title || "Untitled signal"} // ${activeNote.priority} // ${activeNote.tag || "untagged"}`;
}

function createNote() {
  const note = {
    id: crypto.randomUUID(),
    title: "Untitled signal",
    body: "",
    priority: "medium",
    tag: "inbox",
    updatedAt: new Date().toISOString(),
  };
  notes = [note, ...notes];
  activeNoteId = note.id;
  saveNotes();
  render();
  elements.noteTitle.focus();
  elements.noteTitle.select();
}

function deleteActiveNote() {
  if (notes.length === 1) {
    notes = [
      {
        id: crypto.randomUUID(),
        title: "Fresh signal",
        body: "",
        priority: "low",
        tag: "inbox",
        updatedAt: new Date().toISOString(),
      },
    ];
  } else {
    notes = notes.filter((note) => note.id !== activeNoteId);
  }

  activeNoteId = notes[0].id;
  saveNotes();
  render();
}

function exportNotes() {
  const payload = JSON.stringify({ exportedAt: new Date().toISOString(), notes }, null, 2);
  const blob = new Blob([payload], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "cipher-notes-export.json";
  anchor.click();
  URL.revokeObjectURL(url);
}

elements.form.addEventListener("input", updateActiveNote);
elements.newNoteButton.addEventListener("click", createNote);
elements.deleteButton.addEventListener("click", deleteActiveNote);
elements.exportButton.addEventListener("click", exportNotes);

render();
