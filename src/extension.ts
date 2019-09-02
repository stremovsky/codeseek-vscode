// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  function selectWord(editor: vscode.TextEditor): boolean {
    const selection = editor.selection;
    const doc = editor.document;
    if (selection.isEmpty) {
      const cursorWordRange = doc.getWordRangeAtPosition(selection.active);

      if (cursorWordRange) {
        const newSe = new vscode.Selection(
          cursorWordRange.start.line,
          cursorWordRange.start.character,
          cursorWordRange.end.line,
          cursorWordRange.end.character
        );
        editor.selection = newSe;
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  let disposable = vscode.commands.registerCommand("extension.codeseek", () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;

    if (!editor) {
      return;
    }
    // check if there is no selection
    if (editor.selection.isEmpty) {
      selectWord(editor);
    }
    let text = editor.document.getText(editor.selection);
    if (text === "") {
      return;
    }
    var open = require("open");
    if (open) {
      if (text.length > 1024) {
        text = text.slice(0, 1024);
      }
      text = require("querystring").escape(text);
      const finalUrl = "https://codeseek.com/?s=vscode&q=" + text;
      open(finalUrl);
    }
  });
  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
