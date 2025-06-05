"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
const JsonViewer_1 = require("./panel/JsonViewer");
function activate(context) {
    const disposable = vscode.commands.registerCommand('jsonTreeTable.view', () => __awaiter(this, void 0, void 0, function* () {
        const panel = vscode.window.createWebviewPanel('jsonTreeTable', 'JSON Tree Table Viewer', vscode.ViewColumn.One, {
            enableScripts: true
        });
        // 任意：アクティブエディタの JSON 文字列を取得（なければサンプル使用）
        const editor = vscode.window.activeTextEditor;
        let json;
        try {
            const text = editor === null || editor === void 0 ? void 0 : editor.document.getText();
            json = text ? JSON.parse(text) : getSampleJson();
        }
        catch (err) {
            vscode.window.showErrorMessage('JSON の解析に失敗しました。ファイルの形式を確認してください。');
            json = getSampleJson(); // fallback
        }
        panel.webview.html = JsonViewer_1.JsonViewer.getWebviewContent(panel, context.extensionUri, json);
    }));
    context.subscriptions.push(disposable);
}
function deactivate() { }
function getSampleJson() {
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
