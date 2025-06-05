"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderJsonAsHtml = renderJsonAsHtml;
function renderJsonAsHtml(json) {
    return renderNode('', json);
}
function renderNode(key, value) {
    if (Array.isArray(value)) {
        return renderArray(key, value);
    }
    else if (typeof value === 'object' && value !== null) {
        return renderObject(key, value);
    }
    else {
        return `<div>${key ? `<b>${key}:</b> ` : ''}${String(value)}</div>`;
    }
}
function renderObject(key, obj) {
    const children = Object.entries(obj)
        .map(([k, v]) => renderNode(k, v))
        .join('');
    return `
    <details open>
      <summary>${key}</summary>
      ${children}
    </details>
  `;
}
function renderArray(key, arr) {
    if (arr.length === 0) {
        return `<details><summary>${key} (empty array)</summary><i>No data</i></details>`;
    }
    const isTableCandidate = typeof arr[0] === 'object' && !Array.isArray(arr[0]);
    if (isTableCandidate) {
        const headers = Array.from(new Set(arr.flatMap(obj => Object.keys(obj))));
        const rows = arr.map(obj => `
      <tr>
        ${headers.map(h => `<td>${obj[h] !== undefined ? obj[h] : ''}</td>`).join('')}
      </tr>
    `).join('');
        return `
      <details open>
        <summary>${key}</summary>
        <table>
          <thead><tr>${headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </details>
    `;
    }
    else {
        return `
      <details open>
        <summary>${key}</summary>
        ${arr.map((v, i) => renderNode(`[${i}]`, v)).join('')}
      </details>
    `;
    }
}
