// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { env } from "process";
import axios from "axios";
import { json } from "stream/consumers";

interface Model {
  id: String;
}

const callGPT = async () => {
  const options = { method: "GET", url: "http://localhost:4891/v1/models" };
  try {
    const { data } = await axios.request(options);
    console.log(data.keys);
    console.log(typeof data);
    return axios.formToJSON(data);
  } catch (error) {
    console.error(error);
  }
};

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "gpt4all" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const disposable = vscode.commands.registerCommand(
    "gpt4all.helloWorld",
    async () => {
      // The code you place here will be executed every time your command is executed
      // Display a message box to the user
      vscode.window.showInformationMessage("Hello World from gpt4all!");
      // Define the PowerShell command you want to execute

      const models:Model[] = await callGPT();
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
