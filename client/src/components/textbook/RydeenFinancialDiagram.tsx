import { useState } from "react";

type ViewMode = "standard" | "rydeen" | "graph";

function ViewTabs({ active, onChange, labels }: { active: ViewMode; onChange: (v: ViewMode) => void; labels: Record<ViewMode, string> }) {
  return (
    <div className="flex border-b border-slate-200 dark:border-slate-700 mb-3">
      {(["standard", "rydeen", "graph"] as ViewMode[]).map((id) => (
        <button
          key={id}
          onClick={() => onChange(id)}
          className={`flex-1 px-2 py-1.5 text-[11px] md:text-xs font-bold transition-colors ${
            active === id
              ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/50"
              : "text-muted-foreground"
          }`}
          data-testid={`tab-${id}`}
          aria-selected={active === id}
        >
          {labels[id]}
        </button>
      ))}
    </div>
  );
}

function Row({ label, amount, indent = 0, bold = false, borderTop = false, negative = false }: {
  label: string; amount: number | string; indent?: number; bold?: boolean; borderTop?: boolean; negative?: boolean;
}) {
  const formatted = typeof amount === "number"
    ? (negative ? `△${amount.toLocaleString()}` : amount.toLocaleString())
    : amount;
  return (
    <div className={`flex justify-between gap-2 text-[10px] md:text-[11px] py-[2px] ${bold ? "font-bold" : ""} ${borderTop ? "border-t border-slate-200 dark:border-slate-700 pt-1 mt-1" : ""}`}>
      <span className="text-foreground" style={{ paddingLeft: `${indent * 10}px` }}>{label}</span>
      <span className="text-foreground font-mono whitespace-nowrap text-right">{formatted}</span>
    </div>
  );
}

function SectionHeader({ children, color }: { children: string; color: string }) {
  return (
    <div className={`text-[10px] md:text-[11px] font-bold py-1 px-2 rounded ${color} mb-1`}>
      {children}
    </div>
  );
}

function BSStandard() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[500px] flex gap-[1px] bg-slate-300 dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded text-[10px]">
        <div className="flex-1 bg-background p-2 space-y-0.5">
          <div className="font-bold text-center text-muted-foreground mb-1 text-[9px]">（借方）</div>
          <SectionHeader color="bg-slate-100 dark:bg-slate-800">(資産の部)</SectionHeader>
          <Row label="流動資産" amount={61642919} bold />
          <Row label="現金及び預金" amount={19370146} indent={1} />
          <Row label="受取手形" amount={8696971} indent={1} />
          <Row label="電子記録債権" amount={2875527} indent={1} />
          <Row label="売掛金" amount={24092541} indent={1} />
          <Row label="たな卸資産" amount={6433888} indent={1} />
          <Row label="前払費用" amount={814150} indent={1} />
          <Row label="貸倒引当金" amount={640304} indent={1} negative />
          <Row label="固定資産" amount={116515659} bold borderTop />
          <Row label="有形固定資産" amount={106797432} indent={1} />
          <Row label="建物" amount={19744500} indent={2} />
          <Row label="構築物" amount={11552875} indent={2} />
          <Row label="機械及び装置" amount={10812757} indent={2} />
          <Row label="車両及び運搬具" amount={15042238} indent={2} />
          <Row label="器具及び備品" amount={2305062} indent={2} />
          <Row label="土地" amount={45900000} indent={2} />
          <Row label="リース資産" amount={1440000} indent={2} />
          <Row label="無形固定資産" amount={492584} indent={1} />
          <Row label="投資その他の資産" amount={9225643} indent={1} />
          <Row label="資産合計" amount={178158578} bold borderTop />
        </div>
        <div className="flex-1 bg-background p-2 space-y-0.5">
          <div className="font-bold text-center text-muted-foreground mb-1 text-[9px]">（貸方）</div>
          <SectionHeader color="bg-rose-50 dark:bg-rose-950">(負債の部)</SectionHeader>
          <Row label="流動負債" amount={44582343} bold />
          <Row label="支払手形" amount={5039988} indent={1} />
          <Row label="電子記録債権" amount={1514925} indent={1} />
          <Row label="買掛金" amount={17794554} indent={1} />
          <Row label="短期借入金" amount={12226231} indent={1} />
          <Row label="未払金" amount={798843} indent={1} />
          <Row label="未払費用" amount={432468} indent={1} />
          <Row label="未払法人税等" amount={1655000} indent={1} />
          <Row label="未払消費税等" amount={3341200} indent={1} />
          <Row label="預り金" amount={1779134} indent={1} />
          <Row label="固定負債" amount={73875490} bold borderTop />
          <Row label="長期借入金" amount={71962275} indent={1} />
          <Row label="長期未払金" amount={1913215} indent={1} />
          <Row label="負債合計" amount={140457833} bold borderTop />
          <SectionHeader color="bg-blue-50 dark:bg-blue-950">(純資産の部)</SectionHeader>
          <Row label="資本金" amount={10000000} indent={1} />
          <Row label="利益剰余金" amount={49700745} indent={1} />
          <Row label="純資産合計" amount={59700745} bold borderTop />
          <Row label="負債・純資産合計" amount={178158578} bold borderTop />
        </div>
      </div>
    </div>
  );
}

function BSRydeen() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[460px] flex gap-[1px] bg-slate-300 dark:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded text-[10px]">
        <div className="flex-1 bg-background p-2 space-y-1">
          <div className="font-bold text-center text-muted-foreground mb-1 text-[9px]">（資産の部）</div>
          <div className="rounded p-1.5 bg-sky-100 dark:bg-sky-900/60 space-y-0.5">
            <SectionHeader color="bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200">運転資金資産</SectionHeader>
            <Row label="受取手形" amount={8696971} indent={1} />
            <Row label="電子記録債権" amount={2875527} indent={1} />
            <Row label="売掛金" amount={24092541} indent={1} />
            <Row label="" amount={35665039} bold />
          </div>
          <div className="rounded p-1.5 bg-green-100 dark:bg-green-900/60 space-y-0.5">
            <SectionHeader color="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200">バッファー</SectionHeader>
            <Row label="現金及び預金" amount={19370146} indent={1} />
            <Row label="" amount={19370146} bold />
          </div>
          <div className="rounded p-1.5 bg-pink-100 dark:bg-pink-900/60 space-y-0.5">
            <SectionHeader color="bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200">生産手段資産</SectionHeader>
            <Row label="たな卸資産" amount={6433888} indent={1} />
            <Row label="前払費用" amount={814150} indent={1} />
            <Row label="貸倒引当金" amount={640304} indent={1} negative />
            <Row label="建物" amount={19744500} indent={1} />
            <Row label="構築物" amount={11552875} indent={1} />
            <Row label="機械及び装置" amount={10812757} indent={1} />
            <Row label="車両及び運搬具" amount={15042238} indent={1} />
            <Row label="器具及び備品" amount={2305062} indent={1} />
            <Row label="土地" amount={45900000} indent={1} />
            <Row label="リース資産" amount={1440000} indent={1} />
            <Row label="ソフトウェア" amount={417600} indent={1} />
            <Row label="電話加入権" amount={74984} indent={1} />
            <Row label="出資金" amount={155260} indent={1} />
            <Row label="長期前払費用" amount={9070383} indent={1} />
            <Row label="" amount={123123393} bold />
          </div>
          <Row label="資産合計" amount={178158578} bold borderTop />
        </div>
        <div className="flex-1 bg-background p-2 space-y-1">
          <div className="font-bold text-center text-muted-foreground mb-1 text-[9px]">（負債・純資産の部）</div>
          <div className="rounded p-1.5 bg-sky-100 dark:bg-sky-900/60 space-y-0.5">
            <SectionHeader color="bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200">運転資金負債</SectionHeader>
            <Row label="支払手形" amount={5039988} indent={1} />
            <Row label="電子記録債権" amount={1514925} indent={1} />
            <Row label="買掛金" amount={17794554} indent={1} />
            <Row label="" amount={24349467} bold />
          </div>
          <div className="rounded p-1.5 bg-yellow-100 dark:bg-yellow-900/60 space-y-0.5">
            <SectionHeader color="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200">その他負債</SectionHeader>
            <Row label="未払金" amount={798843} indent={1} />
            <Row label="未払費用" amount={432468} indent={1} />
            <Row label="未払法人税等" amount={1655000} indent={1} />
            <Row label="未払消費税等" amount={3341200} indent={1} />
            <Row label="預り金" amount={1779134} indent={1} />
            <Row label="" amount={8006645} bold />
          </div>
          <div className="rounded p-1.5 bg-pink-100 dark:bg-pink-900/60 space-y-0.5">
            <SectionHeader color="bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200">借入金</SectionHeader>
            <Row label="短期借入金" amount={18226231} indent={1} />
            <Row label="長期借入金" amount={67875490} indent={1} />
            <Row label="" amount={86101721} bold />
          </div>
          <div className="rounded p-1.5 bg-slate-100 dark:bg-slate-700/60 space-y-0.5">
            <SectionHeader color="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200">資本金</SectionHeader>
            <Row label="資本金" amount={10000000} indent={1} />
            <Row label="利益剰余金" amount={49700745} indent={1} />
            <Row label="" amount={59700745} bold />
          </div>
          <Row label="負債・純資産合計" amount={178158578} bold borderTop />
        </div>
      </div>
    </div>
  );
}

function BSGraph() {
  const total = 178158578;
  const assetItems = [
    { label: "運転資金資産", value: 35665039, color: "bg-sky-300 dark:bg-sky-700" },
    { label: "バッファー", value: 19370146, color: "bg-green-300 dark:bg-green-700" },
    { label: "生産手段資産", value: 123123393, color: "bg-pink-300 dark:bg-pink-700" },
  ];
  const liabItems = [
    { label: "運転資金負債", value: 24349467, color: "bg-sky-300 dark:bg-sky-700" },
    { label: "その他負債", value: 8006645, color: "bg-yellow-300 dark:bg-yellow-700" },
    { label: "借入金", value: 86101721, color: "bg-pink-300 dark:bg-pink-700" },
    { label: "資本金", value: 59700745, color: "bg-slate-300 dark:bg-slate-600" },
  ];

  return (
    <div className="space-y-3">
      <div className="flex gap-4 justify-center">
        <div className="text-center">
          <div className="text-[10px] font-bold text-muted-foreground mb-1">資産</div>
          <div className="w-20 md:w-24 border border-slate-300 dark:border-slate-600 rounded overflow-hidden" style={{ height: "280px" }}>
            {assetItems.map((item) => (
              <div
                key={item.label}
                className={`${item.color} flex items-center justify-center border-b border-white/30`}
                style={{ height: `${(item.value / total) * 100}%` }}
              >
                <div className="text-center px-0.5">
                  <div className="text-[8px] md:text-[9px] font-bold text-foreground leading-tight">{item.label}</div>
                  <div className="text-[7px] md:text-[8px] text-foreground/70">{(item.value / 1000000).toFixed(0)}百万</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <div className="text-[10px] font-bold text-muted-foreground mb-1">負債・純資産</div>
          <div className="w-20 md:w-24 border border-slate-300 dark:border-slate-600 rounded overflow-hidden" style={{ height: "280px" }}>
            {liabItems.map((item) => (
              <div
                key={item.label}
                className={`${item.color} flex items-center justify-center border-b border-white/30`}
                style={{ height: `${(item.value / total) * 100}%` }}
              >
                <div className="text-center px-0.5">
                  <div className="text-[8px] md:text-[9px] font-bold text-foreground leading-tight">{item.label}</div>
                  <div className="text-[7px] md:text-[8px] text-foreground/70">{(item.value / 1000000).toFixed(0)}百万</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function PLStandard() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[320px] p-2 border border-slate-300 dark:border-slate-600 rounded space-y-0.5 text-[10px]">
        <Row label="売上高" amount={230980493} bold />
        <Row label="売上原価" amount="" />
        <Row label="労務費" amount={84216571} indent={1} />
        <Row label="外注費" amount={46872159} indent={1} />
        <Row label="材料費" amount={18458621} indent={1} />
        <Row label="その他原価" amount={15142079} indent={1} />
        <Row label="" amount={164689430} indent={2} />
        <Row label="売上総利益" amount={66291063} bold borderTop />
        <Row label="販売費及び一般管理費" amount="" />
        <Row label="役員報酬" amount={10564330} indent={1} />
        <Row label="給与手当" amount={16854626} indent={1} />
        <Row label="法定福利費" amount={2309106} indent={1} />
        <Row label="福利厚生費" amount={792995} indent={1} />
        <Row label="接待交際費" amount={326593} indent={1} />
        <Row label="販売促進費" amount={10617972} indent={1} />
        <Row label="旅費交通費" amount={1877761} indent={1} />
        <Row label="研究開発費" amount={1154524} indent={1} />
        <Row label="修繕費" amount={80486} indent={1} />
        <Row label="減価償却費" amount={2806700} indent={1} />
        <Row label="地代家賃" amount={134655} indent={1} />
        <Row label="租税公課" amount={2556486} indent={1} />
        <Row label="消耗品費" amount={1781455} indent={1} />
        <Row label="保険料" amount={3436249} indent={1} />
        <Row label="雑費" amount={3504101} indent={1} />
        <Row label="" amount={58798039} indent={2} />
        <Row label="営業利益" amount={7493024} bold borderTop />
        <Row label="営業外収益" amount="" />
        <Row label="受取利息" amount={2019} indent={1} />
        <Row label="受取配当金" amount={4320} indent={1} />
        <Row label="雑収入" amount={529937} indent={1} />
        <Row label="" amount={536276} indent={2} />
        <Row label="営業外費用" amount="" />
        <Row label="支払利息" amount={1355525} indent={1} />
        <Row label="" amount={1355525} indent={2} />
        <Row label="経常利益" amount={6673775} bold borderTop />
        <Row label="特別利益" amount={0} />
        <Row label="特別損失" amount={0} />
        <Row label="税引前当期純利益" amount={6673775} bold borderTop />
        <Row label="法人税、住民税及び事業税" amount={1655000} />
        <Row label="当期純利益" amount={5018775} bold borderTop />
      </div>
    </div>
  );
}

function PLRydeen() {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[360px] p-2 border border-slate-300 dark:border-slate-600 rounded space-y-1 text-[10px]">
        <div className="rounded p-1.5 bg-green-100 dark:bg-green-900/60 space-y-0.5">
          <SectionHeader color="bg-green-200 dark:bg-green-800 text-green-800 dark:text-green-200">変動費</SectionHeader>
          <div className="pl-2 space-y-0.5">
            <div className="text-[10px] font-bold text-green-700 dark:text-green-300 py-0.5">ヒト</div>
            <Row label="外注費" amount={46872159} indent={2} />
            <Row label="" amount={46872159} indent={3} bold />
            <div className="text-[10px] font-bold text-green-700 dark:text-green-300 py-0.5">モノ</div>
            <Row label="材料費" amount={18458621} indent={2} />
            <Row label="" amount={18458621} indent={3} bold />
            <div className="text-[10px] font-bold text-green-700 dark:text-green-300 py-0.5">その他原価</div>
            <Row label="その他原価" amount={15142079} indent={2} />
            <Row label="" amount={15142079} indent={3} bold />
          </div>
          <Row label="変動費合計" amount={80472859} bold borderTop />
        </div>

        <div className="rounded p-1.5 bg-blue-100 dark:bg-blue-900/60 space-y-0.5">
          <SectionHeader color="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200">人件費用</SectionHeader>
          <Row label="労務費" amount={84216571} indent={1} />
          <Row label="給与手当" amount={16854626} indent={1} />
          <Row label="法定福利費" amount={2309106} indent={1} />
          <Row label="福利厚生費" amount={792995} indent={1} />
          <Row label="" amount={104173298} bold />
        </div>

        <div className="rounded p-1.5 bg-sky-100 dark:bg-sky-900/60 space-y-0.5">
          <SectionHeader color="bg-sky-200 dark:bg-sky-800 text-sky-800 dark:text-sky-200">投資費用</SectionHeader>
          <Row label="接待交際費" amount={326593} indent={1} />
          <Row label="販売促進費" amount={10617972} indent={1} />
          <Row label="旅費交通費" amount={1877761} indent={1} />
          <Row label="研究開発費" amount={1154524} indent={1} />
          <Row label="" amount={13976850} bold />
        </div>

        <div className="rounded p-1.5 bg-slate-100 dark:bg-slate-700/60 space-y-0.5">
          <SectionHeader color="bg-slate-200 dark:bg-slate-600 text-slate-800 dark:text-slate-200">その他費用</SectionHeader>
          <Row label="修繕費" amount={80486} indent={1} />
          <Row label="地代家賃" amount={134655} indent={1} />
          <Row label="租税公課" amount={2556486} indent={1} />
          <Row label="消耗品費" amount={1781455} indent={1} />
          <Row label="保険料" amount={3436249} indent={1} />
          <Row label="支払利息" amount={1355525} indent={1} />
          <Row label="雑費" amount={3504101} indent={1} />
          <Row label="" amount={12848957} bold />
        </div>

        <Row label="固定費合計" amount={130999105} bold borderTop />

        <Row label="税引前当期純利益" amount={20044805} bold borderTop />

        <div className="rounded p-1.5 bg-orange-100 dark:bg-orange-900/60 space-y-0.5 mt-1">
          <SectionHeader color="bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200">売上高</SectionHeader>
          <Row label="売上高" amount={230980493} bold />
        </div>

        <div className="border-2 border-green-400 dark:border-green-600 rounded p-1.5 my-1 bg-green-50 dark:bg-green-950/30">
          <Row label="粗利" amount={150507634} bold />
        </div>

        <Row label="営業利益" amount={19508529} bold borderTop />

        <div className="rounded p-1.5 bg-orange-50 dark:bg-orange-900/30 space-y-0.5 mt-1">
          <SectionHeader color="bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200">営業外収益</SectionHeader>
          <Row label="受取利息" amount={2019} indent={1} />
          <Row label="受取配当金" amount={4320} indent={1} />
          <Row label="雑収入" amount={529937} indent={1} />
          <Row label="" amount={536276} bold />
        </div>

        <Row label="経常利益" amount={20044805} bold borderTop />
        <Row label="特別利益" amount={0} />
        <Row label="特別損失" amount={0} />

        <div className="bg-slate-100 dark:bg-slate-800 rounded p-2 mt-2 space-y-0.5">
          <div className="text-[10px] font-bold text-muted-foreground mb-1">使えるおカネの配分</div>
          <Row label="返済" amount={6000000} indent={1} />
          <Row label="税金" amount={1655000} indent={1} />
          <Row label="役員報酬" amount={10564330} indent={1} />
          <Row label="余剰金" amount={1825475} bold borderTop />
        </div>
      </div>
    </div>
  );
}

function PLGraph() {
  const sales = 230980493;
  const variable = 80472859;
  const fixed = 130999105;
  const pretax = 20044805;
  const gross = 150507634;

  const topH = 340;
  const variablePct = variable / sales;
  const fixedPct = fixed / sales;
  const pretaxPct = pretax / sales;
  const grossPct = gross / sales;
  const bottomH = topH * grossPct;

  return (
    <div className="space-y-2" data-testid="pl-graph">
      <div className="text-center text-[10px] font-bold text-muted-foreground mb-1">損益計算書（グラフ）</div>

      <div className="relative mx-auto" style={{ maxWidth: "320px" }}>
        <div className="flex" style={{ height: `${topH}px` }}>
          <div className="flex-1 border-2 border-slate-400 dark:border-slate-500 rounded-l overflow-hidden flex flex-col">
            <div
              className="bg-green-400 dark:bg-green-600 flex items-center justify-center border-b-2 border-slate-400 dark:border-slate-500"
              style={{ height: `${variablePct * 100}%` }}
            >
              <div className="text-center px-1">
                <div className="text-[9px] md:text-[10px] font-bold text-foreground">変動費</div>
                <div className="text-[8px] md:text-[9px] text-foreground/80 font-mono">{variable.toLocaleString()}</div>
              </div>
            </div>
            <div
              className="bg-blue-400 dark:bg-blue-600 flex items-center justify-center border-b-2 border-slate-400 dark:border-slate-500"
              style={{ height: `${fixedPct * 100}%` }}
            >
              <div className="text-center px-1">
                <div className="text-[9px] md:text-[10px] font-bold text-white">固定費</div>
                <div className="text-[8px] md:text-[9px] text-white/80 font-mono">{fixed.toLocaleString()}</div>
              </div>
            </div>
            <div
              className="bg-yellow-300 dark:bg-yellow-600 flex items-center justify-center flex-1"
            >
              <div className="text-center px-1">
                <div className="text-[8px] md:text-[9px] font-bold text-foreground">税引前利益 {pretax.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 border-2 border-l-0 border-slate-400 dark:border-slate-500 rounded-r overflow-hidden flex items-center justify-center bg-orange-300 dark:bg-orange-600">
            <div className="text-center px-1">
              <div className="text-[10px] md:text-[11px] font-bold text-foreground">売上高</div>
              <div className="text-[9px] md:text-[10px] text-foreground/80 font-mono">{sales.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-1 mt-0.5 mb-1">
          <span className="text-[10px] font-bold text-muted-foreground">費用</span>
          <span className="text-[10px] font-bold text-muted-foreground">収入</span>
        </div>

        <div className="mt-3" />

        <div className="flex" style={{ height: `${bottomH}px` }}>
          <div className="flex-1 border-2 border-slate-400 dark:border-slate-500 rounded-l overflow-hidden flex flex-col">
            <div
              className="bg-blue-400 dark:bg-blue-600 flex items-center justify-center border-b-2 border-slate-400 dark:border-slate-500"
              style={{ height: `${(fixed / gross) * 100}%` }}
            >
              <div className="text-center px-1">
                <div className="text-[9px] md:text-[10px] font-bold text-white">固定費</div>
                <div className="text-[8px] md:text-[9px] text-white/80 font-mono">{fixed.toLocaleString()}</div>
              </div>
            </div>
            <div
              className="bg-yellow-300 dark:bg-yellow-600 flex items-center justify-center flex-1"
            >
              <div className="text-center px-1">
                <div className="text-[8px] md:text-[9px] font-bold text-foreground">税引前利益 {pretax.toLocaleString()}</div>
              </div>
            </div>
          </div>
          <div className="flex-1 border-2 border-l-0 border-red-400 dark:border-red-500 rounded-r overflow-hidden flex items-center justify-center bg-orange-200 dark:bg-orange-700">
            <div className="text-center px-1">
              <div className="text-[10px] md:text-[11px] font-bold text-foreground">粗利</div>
              <div className="text-[9px] md:text-[10px] text-foreground/80 font-mono">{gross.toLocaleString()}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-1 mt-0.5">
          <span className="text-[10px] font-bold text-muted-foreground">費用</span>
          <span className="text-[10px] font-bold text-muted-foreground">収入</span>
        </div>
      </div>
    </div>
  );
}

export default function RydeenFinancialDiagram() {
  const [bsView, setBsView] = useState<ViewMode>("rydeen");
  const [plView, setPlView] = useState<ViewMode>("rydeen");

  const bsLabels: Record<ViewMode, string> = { standard: "勘定式", rydeen: "RYDEEN式", graph: "グラフ" };
  const plLabels: Record<ViewMode, string> = { standard: "報告式", rydeen: "RYDEEN式", graph: "グラフ" };

  return (
    <div className="w-full p-4 md:p-6 space-y-6" data-testid="rydeen-financial-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-rydeen-title">RYDEEN式決算書（例）</h3>

      <div className="space-y-6">
        <div data-testid="section-bs">
          <h4 className="text-sm font-bold text-foreground mb-2 text-center" data-testid="text-bs-title">貸借対照表（BS）</h4>
          <ViewTabs active={bsView} onChange={setBsView} labels={bsLabels} />
          {bsView === "standard" && <BSStandard />}
          {bsView === "rydeen" && <BSRydeen />}
          {bsView === "graph" && <BSGraph />}
        </div>

        <div className="border-t border-slate-200 dark:border-slate-700 pt-4" data-testid="section-pl">
          <h4 className="text-sm font-bold text-foreground mb-2 text-center" data-testid="text-pl-title">損益計算書（PL）</h4>
          <ViewTabs active={plView} onChange={setPlView} labels={plLabels} />
          {plView === "standard" && <PLStandard />}
          {plView === "rydeen" && <PLRydeen />}
          {plView === "graph" && <PLGraph />}
        </div>
      </div>
    </div>
  );
}
