import * as vscode from 'vscode';
import { renderJsonAsHtml } from './renderer';

export class JsonViewer {
  static getWebviewContent(panel: vscode.WebviewPanel, extensionUri: vscode.Uri, json: any): string {
    const webview = panel.webview;

    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(extensionUri, 'media', 'main.js')
    );

    const nonce = getNonce(); // セキュリティ対策としてnonceを利用

    const renderedHtml = renderJsonAsHtml(json);

    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Security-Policy"
              content="default-src 'none'; style-src 'unsafe-inline'; script-src 'nonce-${nonce}';">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: sans-serif; padding: 1em; }
          table { border-collapse: collapse; margin-bottom: 1em; }
          th, td { border: 1px solid #ccc; padding: 4px 8px; text-align: left; }
          summary { cursor: pointer; font-weight: bold; }
          details { margin-left: 1em; margin-bottom: 0.5em; }
        </style>
      </head>
      <body>
        ${renderedHtml}
        <script nonce="${nonce}" src="${scriptUri}"></script>
      </body>
      </html>
    `;
  }
}

// CSP対策用のランダム文字列
function getNonce() {
  return [...Array(16)].map(() => Math.floor(Math.random() * 36).toString(36)).join('');
}
