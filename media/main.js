(function () {
  const vscode = acquireVsCodeApi();

  // 例: クリックイベントのログ
  document.addEventListener('click', (event) => {
    const target = event.target;
    if (target.tagName === 'TD') {
      console.log('セルがクリックされました:', target.textContent);
      // vscode.postMessage({ type: 'cellClick', value: target.textContent });
    }
  });

  // 例: VS Code 側からのメッセージ受信
  window.addEventListener('message', event => {
    const message = event.data;
    switch (message.type) {
      case 'update':
        console.log('受信したデータ:', message.payload);
        break;
    }
  });
})();
