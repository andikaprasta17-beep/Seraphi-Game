import fs from 'fs';

const rows = JSON.parse(fs.readFileSync('temp_check/final_audit_rows.json', 'utf8'));

console.log('Total rows:', rows.length);

const byCat = {};
for (const r of rows) {
  if (!byCat[r.category]) byCat[r.category] = [];
  byCat[r.category].push(r);
}

let out = '';
for (const [cat, list] of Object.entries(byCat)) {
  out += `### ${cat} (${list.length} slots)\n\n`;
  out += `| Entity | Asset URL | Visual Description Aktual | Relevance | Duplicate | HTTP |\n`;
  out += `|---|---|---|---|---|---|\n`;
  for (const item of list) {
    out += `| **${item.entity}** | \`${item.url}\` | ${item.desc} | **${item.relevance}** | ${item.duplicate} | ${item.http} |\n`;
  }
  out += '\n';
}

fs.writeFileSync('temp_check/audit_report_tables.md', out);
console.log('Audit tables written to temp_check/audit_report_tables.md');
