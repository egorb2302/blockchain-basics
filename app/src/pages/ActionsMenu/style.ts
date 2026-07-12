const styles = {
    base: "min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6",
    inputs: "w-full rounded-lg bg-slate-800 border border-slate-700 px-3 py-2 text-sm outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed",
    spacing: "space-y-1",
    postbase: "w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-xl p-6 space-y-4",
    purpleBtn: "rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-2 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600",
    darkBtn: "rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors px-3 py-2 text-sm font-medium border border-slate-700 cursor-pointer",
    greenBtn: "rounded-lg bg-emerald-700 hover:bg-emerald-600 transition-colors px-3 py-2 text-sm font-medium cursor-pointer",
    actionsGrid: "grid grid-cols-2 gap-3 pt-2",
    labelsP: "text-sm text-slate-400",
    title: "text-2xl font-semibold tracking-tight",
    tinyTxt: "text-xs text-slate-500 pt-2 text-center",
    tiWrapper: "flex flex-col items-center",

    fullBtn: "w-full rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors px-3 py-2.5 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-indigo-600",
    greenBtnFull: "w-full rounded-lg bg-emerald-700 hover:bg-emerald-600 transition-colors px-3 py-2.5 text-sm font-medium cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-emerald-700",

    divider: "h-px bg-slate-800",

    balanceCard: "rounded-lg bg-slate-800/60 border border-slate-700 px-4 py-3 flex items-center justify-between",
    balanceLabel: "text-xs text-slate-400",
    balanceValue: "text-lg font-semibold text-slate-100 font-mono mt-0.5",
    refreshBtn: "text-xs text-indigo-400 hover:text-indigo-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",

    errorBox: "rounded-lg border border-red-900/50 bg-red-950/40 px-3 py-2.5",
    errorText: "text-xs text-red-400 break-words",

    successBox: "rounded-lg border border-emerald-900/50 bg-emerald-950/30 px-3 py-2.5 flex items-center justify-between gap-3",
    successText: "text-xs text-emerald-400 shrink-0",

    copyButton: "flex items-center gap-1.5 max-w-[70%] group cursor-pointer bg-transparent border-0 p-0",
    copyValue: "text-xs text-slate-300 font-mono truncate",
    copyIcon: "text-[11px] shrink-0 transition-colors text-slate-500 group-hover:text-indigo-400",
    copyIconDone: "text-[11px] shrink-0 text-emerald-400",
}

export default styles