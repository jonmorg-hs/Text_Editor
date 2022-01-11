// Import methods to save and get data from the indexedDB database in './database.js'
import { getDb, putDb } from "./database";
import { header } from "./header";

export default class {
  constructor() {
    const localData = localStorage.getItem("content");
    // check if CodeMirror is loaded
    if (typeof CodeMirror === "undefined") {
      throw new Error("CodeMirror is not loaded");
    }

    this.editor = CodeMirror(document.querySelector("#main"), {
      value: "",
      mode: "javascript",
      theme: "monokai",
      lineNumbers: true,
      lineWrapping: true,
      autofocus: true,
      indentUnit: 2,
      tabSize: 2,
    });

    getDb().then((data) => {
      this.editor.setValue(header);
      for (let i = 0; i < data.length; i++) {
        this.editor.setValue(data[i]["id"]);
      }
    });

    this.editor.on("change", () => {
      let str = this.editor.getValue();
      str = str.replace(
        "/*       _____  ____________      / /   |/_  __/ ____/ __  / / /| | / / / __/   / /_/ / ___ |/ / / /___    ____/_/  |_/_/ /_____/   just another text editor*/ "
      );
      localStorage.setItem("content", str);
      putDb(str);
    });

    // Save the content of the editor when the editor itself is loses focus
    this.editor.on("blur", () => {
      console.log("The editor has lost focus");
      let str = this.editor.getValue();
      str = str.replace(
        "/*       _____  ____________      / /   |/_  __/ ____/ __  / / /| | / / / __/   / /_/ / ___ |/ / / /___    ____/_/  |_/_/ /_____/   just another text editor*/ "
      );
      localStorage.setItem("content", str);
      putDb(str);
    });
  }
}
