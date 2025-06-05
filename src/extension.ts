import * as vscode from 'vscode';
import { JsonViewer } from './panel/JsonViewer';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('jsonTreeTable.view', async () => {
        const panel = vscode.window.createWebviewPanel(
            'jsonTreeTable',
            'JSON Tree Table Viewer',
            vscode.ViewColumn.One,
            {
                enableScripts: true
            }
        );

        // 任意：アクティブエディタの JSON 文字列を取得（なければサンプル使用）
        const editor = vscode.window.activeTextEditor;
        let json: any;

        try {
            const text = editor?.document.getText();
            json = text ? JSON.parse(text) : getSampleJson();
        } catch (err) {
            vscode.window.showErrorMessage('JSON の解析に失敗しました。ファイルの形式を確認してください。');
            json = getSampleJson(); // fallback
        }

        panel.webview.html = JsonViewer.getWebviewContent(panel, context.extensionUri, json);
    });

    context.subscriptions.push(disposable);
}

export function deactivate() { }

function getSampleJson(): any {
    return {
        "a": [
            { "b1": "c1", "b2": "c2" },
            { "b1": "d1", "b2": "d2" }
        ],
        "b": [
            { "b1": "c1", "b2": "c2" },
            { "b1": "d1", "b2": "d2" }
        ]
    };
}
