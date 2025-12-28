
const BASE = "http://localhost:4000";

export async function processInvoice(data: any) {
  const res = await fetch(`${BASE}/api/invoice/process`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  return res.json();
}

export async function getMemory() {
  const res = await fetch(`${BASE}/api/memory`);
  return res.json();
}

export async function runDemo() {
  const res = await fetch(`${BASE}/api/demo/run`, { method: "POST" });
  return res.text();
}
