import { useState } from "react";
import { FileText, Brain, PlayCircle, CheckCircle, XCircle, AlertCircle, TrendingUp, Zap, BarChart3, Clock, Sparkles, ArrowRight, Settings, Download, Activity, Target, Shield, Layers } from "lucide-react";

const processInvoice = async (invoice) => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  return {
    decision: "approved",
    confidence: 0.92,
    requiresHumanReview: Math.random() > 0.5,
    analysis: { vendor: invoice.vendor, amount: "€1,234.56", anomalies: [], matchScore: 0.95 }
  };
};

const getMemory = async () => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return {
    totalInvoices: 247,
    vendors: ["Supplier GmbH", "TechCorp AG", "Office Solutions"],
    patterns: { avgProcessingTime: "2.3s", approvalRate: "94%" }
  };
};

const runDemo = async () => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return "Demo completed: 3 invoices processed successfully";
};

export default function Dashboard() {
  const [invoice, setInvoice] = useState('{\n  "id": "INV-A-001",\n  "vendor": "Supplier GmbH",\n  "invoiceNumber": "A-001",\n  "rawText": "Leistungsdatum: 2024-01-10"\n}');
  const [result, setResult] = useState(null);
  const [memory, setMemory] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleProcess() {
    setLoading(true);
    setStatus("");
    const res = await processInvoice(JSON.parse(invoice));
    setResult(res);
    setLoading(false);
  }

  async function handleApprove(approved) {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setStatus(approved ? "✅ Invoice approved & learned successfully" : "❌ Invoice rejected");
    setResult(null);
    setLoading(false);
  }

  async function loadMemory() {
    setLoading(true);
    const data = await getMemory();
    setMemory(data);
    setLoading(false);
  }

  async function runDemoFlow() {
    setLoading(true);
    const out = await runDemo();
    alert(out);
    setLoading(false);
  }

  const stats = [
    { icon: FileText, label: "Total Processed", value: "247", trend: "+12%", iconBg: "bg-blue-500/10" },
    { icon: TrendingUp, label: "Approval Rate", value: "94%", trend: "+3%", iconBg: "bg-green-500/10" },
    { icon: Clock, label: "Avg Processing", value: "2.3s", trend: "-15%", iconBg: "bg-purple-500/10" },
    { icon: Zap, label: "AI Performance", value: "98%", trend: "+5%", iconBg: "bg-orange-500/10" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-950 to-pink-950 p-4 md:p-8 relative overflow-hidden">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(to right, rgba(79,79,79,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(79,79,79,0.1) 1px, transparent 1px)', backgroundSize: '14px 24px'}}></div>
        </div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/50 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        <div className="space-y-6 mb-12">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl blur-xl opacity-70 animate-pulse"></div>
                  <div className="relative p-4 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-3xl shadow-2xl">
                    <Brain className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 bg-clip-text text-transparent tracking-tight">
                    InvoiceAI Pro
                  </h1>
                  <p className="text-lg text-purple-200/80 mt-1">Next-generation intelligent invoice processing</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="group p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 text-white/60 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/20">
                <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <button className="group p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all duration-300 text-white/60 hover:text-white backdrop-blur-xl border border-white/10 hover:border-white/20">
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="group relative bg-white/5 backdrop-blur-2xl rounded-3xl p-6 border border-white/10 hover:border-white/20 transition-all duration-500 overflow-hidden hover:scale-105 hover:shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`p-3 ${stat.iconBg} rounded-2xl backdrop-blur-xl`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-2 py-1 rounded-lg">
                      <ArrowRight className="w-3 h-3" style={{transform: 'rotate(-45deg)'}} />
                      {stat.trend}
                    </div>
                  </div>
                  <p className="text-4xl font-black text-white mb-1 tracking-tight">{stat.value}</p>
                  <p className="text-sm text-white/50 font-medium">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2 space-y-6">
            <div className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/30 shadow-2xl transition-all duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
                      <FileText className="w-7 h-7 text-blue-300" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-white tracking-tight">Invoice Input</h2>
                      <p className="text-sm text-white/50 mt-1">Paste or upload your invoice data</p>
                    </div>
                  </div>
                  <Sparkles className="w-6 h-6 text-yellow-300/50 animate-pulse" />
                </div>
                
                <textarea
                  className="w-full bg-slate-950/50 border border-white/10 rounded-2xl p-6 font-mono text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all resize-none backdrop-blur-xl shadow-inner"
                  rows={12}
                  value={invoice}
                  onChange={(e) => setInvoice(e.target.value)}
                  placeholder="Paste invoice JSON here..."
                />

                <div className="flex gap-3 flex-wrap">
                  <button
                    onClick={handleProcess}
                    disabled={loading}
                    className="group/btn flex items-center gap-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden"
                  >
                    <FileText className="w-5 h-5" />
                    <span>Process Invoice</span>
                  </button>

                  <button
                    onClick={loadMemory}
                    disabled={loading}
                    className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <Brain className="w-5 h-5" />
                    <span>View Memory</span>
                  </button>

                  <button
                    onClick={runDemoFlow}
                    disabled={loading}
                    className="flex items-center gap-3 bg-gradient-to-r from-rose-600 to-fuchsia-600 hover:from-rose-700 hover:to-fuchsia-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-pink-500/30 hover:shadow-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95"
                  >
                    <PlayCircle className="w-5 h-5" />
                    <span>Run Demo</span>
                  </button>
                </div>
              </div>
            </div>

            {loading && (
              <div className="relative bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="flex items-center justify-center gap-4">
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 bg-indigo-950 rounded-full"></div>
                  </div>
                  <span className="text-white font-bold text-lg">Processing your invoice...</span>
                </div>
              </div>
            )}

            {result && (
              <div className="group relative bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/30 shadow-2xl animate-fadeIn overflow-hidden">
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl backdrop-blur-xl border border-white/10">
                        <CheckCircle className="w-7 h-7 text-green-300" />
                      </div>
                      <div>
                        <h2 className="text-3xl font-bold text-white">Decision Result</h2>
                        <p className="text-sm text-white/50 mt-1">AI analysis complete</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10">
                      <p className="text-white/50 text-sm mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Decision
                      </p>
                      <p className="text-3xl font-black text-green-300 capitalize">{result.decision}</p>
                    </div>
                    
                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10">
                      <p className="text-white/50 text-sm mb-2 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Confidence
                      </p>
                      <p className="text-3xl font-black text-blue-300">{(result.confidence * 100).toFixed(0)}%</p>
                    </div>
                    
                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10 md:col-span-2">
                      <p className="text-white/50 text-sm mb-3 flex items-center gap-2">
                        <Layers className="w-4 h-4" />
                        Vendor
                      </p>
                      <p className="text-xl font-bold text-white">{result.analysis.vendor}</p>
                    </div>
                  </div>

                  <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10">
                    <p className="text-white/50 text-sm mb-3 flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Full Analysis
                    </p>
                    <pre className="text-xs text-purple-200 overflow-x-auto">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>

                  {result.requiresHumanReview && (
                    <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/30 rounded-2xl p-6">
                      <div className="space-y-4">
                        <div className="flex items-center gap-3">
                          <AlertCircle className="w-6 h-6 text-yellow-300" />
                          <div>
                            <span className="font-bold text-yellow-100 text-lg">Human Review Required</span>
                            <p className="text-sm text-yellow-200/70">Please approve or reject this invoice</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <button
                            onClick={() => handleApprove(true)}
                            disabled={loading}
                            className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-4 rounded-xl font-bold shadow-xl disabled:opacity-50 transition-all duration-300 hover:scale-105"
                          >
                            <CheckCircle className="w-5 h-5" />
                            <span>Approve & Learn</span>
                          </button>

                          <button
                            onClick={() => handleApprove(false)}
                            disabled={loading}
                            className="flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white px-6 py-4 rounded-xl font-bold shadow-xl disabled:opacity-50 transition-all duration-300 hover:scale-105"
                          >
                            <XCircle className="w-5 h-5" />
                            <span>Reject Invoice</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {status && (
              <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-2xl border border-green-500/30 rounded-2xl p-6 shadow-2xl animate-fadeIn">
                <div className="flex items-center gap-4">
                  <CheckCircle className="w-6 h-6 text-green-300" />
                  <span className="text-white font-bold text-lg">{status}</span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            {memory ? (
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl animate-fadeIn">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10">
                      <Brain className="w-7 h-7 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">Memory Bank</h2>
                      <p className="text-sm text-white/50 mt-1">AI knowledge</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10">
                      <p className="text-white/40 text-xs uppercase mb-2">Total Invoices</p>
                      <p className="text-5xl font-black text-transparent bg-gradient-to-r from-purple-300 to-pink-300 bg-clip-text">{memory.totalInvoices}</p>
                    </div>

                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10">
                      <p className="text-white/40 text-xs uppercase mb-4">Top Vendors</p>
                      <div className="space-y-3">
                        {memory.vendors.map((vendor, idx) => (
                          <div key={idx} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl">
                            <span className="text-sm text-white">{vendor}</span>
                            <span className="text-xs text-purple-300 bg-purple-500/20 px-3 py-1 rounded-full">#{idx + 1}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10 space-y-3">
                      <div>
                        <p className="text-white/40 text-xs uppercase mb-1">Processing Time</p>
                        <p className="text-2xl font-bold text-white">{memory.patterns.avgProcessingTime}</p>
                      </div>
                      <div>
                        <p className="text-white/40 text-xs uppercase mb-1">Approval Rate</p>
                        <p className="text-2xl font-bold text-green-300">{memory.patterns.approvalRate}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-2xl rounded-3xl p-8 border border-white/20 shadow-2xl">
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl border border-white/10">
                      <BarChart3 className="w-7 h-7 text-purple-300" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">System Status</h2>
                      <p className="text-sm text-white/50 mt-1">Real-time metrics</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-slate-900/70 rounded-2xl p-6 border border-white/10">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-white/50 text-sm">System Health</p>
                        <span className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
                      </div>
                      <div className="w-full bg-slate-700 rounded-full h-2">
                        <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{width: '98%'}}></div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl p-6 border border-white/10">
                      <p className="text-white/50 text-xs mb-2">Tip</p>
                      <p className="text-sm text-white">Click "View Memory" to see detailed system intelligence</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        
        .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}