import { createSignal, For, Show } from "solid-js";

interface DbVector {
  id: string;
  x: number;
  y: number;
  type: "safe" | "toxic";
}

interface QueryVector {
  id: string;
  x: number;
  y: number;
  label: string;
  toxic: boolean;
}

interface KnnResult {
  label: string;
  score: number;
}

const DB_VECTORS: DbVector[] = [
  { id: "s1", x: 18, y: 58, type: "safe" },
  { id: "s2", x: 22, y: 72, type: "safe" },
  { id: "s3", x: 30, y: 64, type: "safe" },
  { id: "s4", x: 25, y: 50, type: "safe" },
  { id: "s5", x: 38, y: 76, type: "safe" },
  { id: "s6", x: 42, y: 60, type: "safe" },
  { id: "s7", x: 14, y: 80, type: "safe" },
  { id: "s8", x: 33, y: 82, type: "safe" },
  { id: "s9", x: 44, y: 70, type: "safe" },
  { id: "s10", x: 20, y: 42, type: "safe" },
  { id: "t1", x: 62, y: 22, type: "toxic" },
  { id: "t2", x: 70, y: 18, type: "toxic" },
  { id: "t3", x: 78, y: 30, type: "toxic" },
  { id: "t4", x: 58, y: 35, type: "toxic" },
  { id: "t5", x: 75, y: 40, type: "toxic" },
  { id: "t6", x: 65, y: 12, type: "toxic" },
  { id: "t7", x: 84, y: 22, type: "toxic" },
  { id: "t8", x: 55, y: 18, type: "toxic" },
];

const QUERY_VECTORS: QueryVector[] = [
  { id: "q_safe", x: 32, y: 68, label: "query_safe", toxic: false },
  { id: "q_toxic", x: 70, y: 25, label: "query_toxic", toxic: true },
];

const TARGET_NEIGHBOR_IDS = new Set(["t1", "t2", "t3"]);

const KNN_RESULTS: KnnResult[] = [
  { label: "doc_0x1A2F", score: 0.97 },
  { label: "doc_0x3C8D", score: 0.94 },
  { label: "doc_0x7E4B", score: 0.91 },
];

const STAGE_LABELS = ["Index Space", "Query Projection", "K-Nearest Neighbors"];

const STAGE_DESCRIPTIONS = [
  "Encoded vectors are stored in the index. Safe and toxic messages form distinct clusters in the embedding space.",
  "Incoming query vectors are projected into the same space for similarity comparison.",
  "The 3 nearest neighbors to the toxic query are retrieved by cosine similarity score.",
];

const GRID_LINES = [20, 40, 60, 80];

export default function VectorSpaceVisualizer() {
  const [stage, setStage] = createSignal(0);

  const toxicQuery = QUERY_VECTORS.find((q) => q.toxic)!;
  const neighborVectors = DB_VECTORS.filter((v) => TARGET_NEIGHBOR_IDS.has(v.id));

  return (
    <div class="my-8 rounded-xl border border-slate-200 overflow-hidden bg-white not-prose">
      {/* Stage header */}
      <div class="flex items-center gap-4 px-4 py-3 border-b border-slate-200 bg-slate-50 overflow-x-auto">
        <For each={STAGE_LABELS}>
          {(label, i) => (
            <button
              onClick={() => setStage(i())}
              class={`flex items-center gap-2 shrink-0 cursor-pointer transition-colors ${stage() === i() ? "text-blue-600" : "text-slate-400 hover:text-slate-600"}`}
            >
              <span
                class={`inline-flex items-center justify-center w-5 h-5 rounded-full border text-[10px] transition-colors ${stage() === i()
                  ? "border-blue-600 bg-blue-600 text-white"
                  : stage() > i()
                    ? "border-slate-300 bg-slate-100 text-slate-500"
                    : "border-slate-300 text-slate-400"
                  }`}
              >
                {i() + 1}
              </span>
              <span class="text-xs font-[family-name:var(--font-monospace)]">{label}</span>
            </button>
          )}
        </For>
      </div>

      {/* Canvas */}
      <div class="relative w-full aspect-[4/3] bg-slate-50 overflow-hidden select-none">

        {/* Grid */}
        <svg
          class="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <For each={GRID_LINES}>
            {(v) => (
              <>
                <line x1={v} y1="0" x2={v} y2="100" stroke="rgb(226,232,240)" stroke-width="0.4" />
                <line x1="0" y1={v} x2="100" y2={v} stroke="rgb(226,232,240)" stroke-width="0.4" />
              </>
            )}
          </For>
          <line x1="5" y1="95" x2="95" y2="95" stroke="rgb(148,163,184)" stroke-width="1" />
          <line x1="5.5" y1="5" x2="5.5" y2="95" stroke="rgb(148,163,184)" stroke-width="1" />
        </svg>

        {/* Connection lines at stage 2 */}
        <Show when={stage() >= 2}>
          <svg
            class="absolute inset-0 w-full h-full pointer-events-none"
            style="z-index: 1;"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <For each={neighborVectors}>
              {(neighbor) => (
                <line
                  x1={toxicQuery.x}
                  y1={toxicQuery.y}
                  x2={neighbor.x}
                  y2={neighbor.y}
                  stroke="rgb(239,68,68)"
                  stroke-width="0.6"
                  stroke-dasharray="2 1.5"
                  stroke-dashoffset="1000"
                  stroke-linecap="round"
                  opacity="0.7"
                  style="animation: vsv-draw-line 0.6s ease-out forwards;"
                />
              )}
            </For>
          </svg>
        </Show>

        {/* DB vector dots */}
        <For each={DB_VECTORS}>
          {(vec) => (
            <div
              class={`absolute w-2.5 h-2.5 rounded-full -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${vec.type === "safe" ? "bg-blue-500 opacity-60" : "bg-red-500 opacity-60"
                } ${stage() >= 2 && TARGET_NEIGHBOR_IDS.has(vec.id)
                  ? "ring-2 ring-offset-1 ring-red-400 opacity-100 scale-125"
                  : ""
                }`}
              style={`left: ${vec.x}%; top: ${vec.y}%; z-index: 2;`}
            />
          )}
        </For>

        {/* Query vectors at stage >= 1 */}
        <Show when={stage() >= 1}>
          <For each={QUERY_VECTORS}>
            {(qv) => (
              <div
                class="absolute w-4 h-4 -translate-x-1/2 -translate-y-1/2"
                style={`left: ${qv.x}%; top: ${qv.y}%; z-index: 10;`}
              >
                {/* Radar ping — absolutely centered on the wrapper's own box */}
                <Show when={qv.toxic && stage() >= 2}>
                  <div
                    class="absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/3 w-5 h-5 rounded-full border border-red-400"
                    style="animation: vsv-radar-ping 1.5s ease-out infinite;"
                  />
                </Show>

                {/* Diamond dot */}
                <div
                  class={`w-4 h-4 rotate-0 border-2 transition-colors duration-300 ${qv.toxic
                    ? "bg-red-50 border-red-500"
                    : "bg-blue-50 border-blue-600"
                    }`}
                  style="animation: vsv-fade-in 0.3s ease-out both;"
                />

                {/* Label */}
                <span
                  class={`absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-[family-name:var(--font-monospace)] px-1 py-px rounded border border-slate-200 bg-white/90 ${qv.toxic ? "text-red-600" : "text-blue-600"
                    }`}
                >
                  {qv.label}
                </span>
              </div>
            )}
          </For>
        </Show>

        {/* Axis labels */}
        <span class="absolute bottom-1.5 right-2 text-[9px] font-[family-name:var(--font-monospace)] text-slate-400 pointer-events-none">
          dim[0]
        </span>
        <span
          class="absolute top-2 left-3 text-[9px] font-[family-name:var(--font-monospace)] text-slate-400 pointer-events-none"
          style="writing-mode: vertical-rl; transform: rotate(180deg);"
        >
          dim[1]
        </span>

        {/* Legend */}
        <div class="bg-white absolute top-5 left-12 flex flex-col gap-1.5 pointer-events-none p-3 rounded-lg" style="z-index: 5;">
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-blue-500 opacity-60 shrink-0" />
            <span class="text-[9px] font-[family-name:var(--font-monospace)] text-slate-500">safe_cluster</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-red-500 opacity-60 shrink-0" />
            <span class="text-[9px] font-[family-name:var(--font-monospace)] text-slate-500">toxic_cluster</span>
          </div>
        </div>

        {/* KNN results panel at stage 2 */}
        <Show when={stage() >= 2}>
          <div
            class="absolute bottom-10 right-5 w-44 rounded-lg border border-slate-200 bg-white/90 p-3 shadow-sm"
            style="z-index: 20; animation: vsv-fade-in 0.3s ease-out both 0.4s;"
          >
            <p class="text-[9px] font-[family-name:var(--font-monospace)] text-slate-400 mb-2 uppercase tracking-wider">
              top-3 / cosine
            </p>
            <div class="flex flex-col gap-1.5">
              <For each={KNN_RESULTS}>
                {(result) => (
                  <div class="flex items-center justify-between">
                    <span class="text-[10px] font-[family-name:var(--font-monospace)] text-slate-600">
                      {result.label}
                    </span>
                    <span class="text-[10px] font-[family-name:var(--font-monospace)] text-red-600 font-semibold tabular-nums">
                      {result.score.toFixed(2)}
                    </span>
                  </div>
                )}
              </For>
            </div>
          </div>
        </Show>
      </div>

      {/* Stage description */}
      <div class="px-4 py-3 border-t border-slate-100 min-h-[3rem] flex items-center">
        <p class="text-sm text-slate-500 leading-snug font-[family-name:var(--font-monospace)]">
          {STAGE_DESCRIPTIONS[stage()]}
        </p>
      </div>

      {/* Navigation */}
      <div class="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
        <button
          onClick={() => setStage((s) => Math.max(0, s - 1))}
          disabled={stage() === 0}
          class="flex items-center gap-1.5 text-xs font-[family-name:var(--font-monospace)] text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
          prev
        </button>

        <span class="text-[10px] font-[family-name:var(--font-monospace)] text-slate-400 tabular-nums">
          {stage() + 1} / {STAGE_LABELS.length}
        </span>

        <button
          onClick={() => setStage((s) => Math.min(STAGE_LABELS.length - 1, s + 1))}
          disabled={stage() === STAGE_LABELS.length - 1}
          class="flex items-center gap-1.5 text-xs font-[family-name:var(--font-monospace)] text-slate-500 hover:text-slate-900 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
        >
          next
          <svg xmlns="http://www.w3.org/2000/svg" width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
