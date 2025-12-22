import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export interface LedgerRow {
  month: string;
  day: string;
  memo: string;
  sourceEntryId: string | number;
  debit: number;
  credit: number;
  balance: number;
  balanceSide: "借" | "貸" | "";
}

interface LedgerSheetProps {
  accountName: string;
  rows: LedgerRow[];
  meta: {
    unit: string;
    companyName: string;
    period: string;
  };
}

export function LedgerSheet({ accountName, rows, meta }: LedgerSheetProps) {
  return (
    <Card className="bg-white dark:bg-zinc-950 p-4 sm:p-6 rounded-none border shadow-sm font-serif overflow-hidden">
      {/* 帳票ヘッダー */}
      <div className="text-center mb-6 relative">
        <h2 className="text-2xl font-bold tracking-[0.5em] border-b-2 border-double border-zinc-800 dark:border-zinc-200 inline-block px-12 pb-1 mb-2">
          総勘定元帳
        </h2>
        <div className="flex justify-between items-end mt-4 px-2">
          <div className="text-left">
            <h3 className="text-lg font-bold border-b border-zinc-400 dark:border-zinc-600 px-4">
              勘定： <span className="underline decoration-double underline-offset-4">{accountName}</span>
            </h3>
          </div>
          <div className="text-right text-[10px] space-y-0.5">
            <p>{meta.companyName}</p>
            <p>{meta.period}</p>
            <p>（単位：{meta.unit}）</p>
          </div>
        </div>
      </div>

      {/* 帳票テーブル */}
      <div className="overflow-x-auto -mx-4 sm:mx-0 border-t border-b border-zinc-800 dark:border-zinc-200">
        <Table className="min-w-[600px] border-collapse text-[11px] sm:text-xs">
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
            <TableRow className="hover:bg-transparent border-b border-zinc-800 dark:border-zinc-200 h-10">
              <TableHead className="w-16 border-r text-center font-bold px-1">
                <div className="flex flex-col text-[9px] leading-tight">
                  <span>日　付</span>
                  <div className="flex justify-around border-t border-zinc-300 mt-1 pt-0.5">
                    <span>月</span>
                    <span>日</span>
                  </div>
                </div>
              </TableHead>
              <TableHead className="border-r text-center font-bold">摘　要</TableHead>
              <TableHead className="w-12 border-r text-center font-bold text-[10px]">仕丁</TableHead>
              <TableHead className="w-24 border-r text-center font-bold">借　方</TableHead>
              <TableHead className="w-24 border-r text-center font-bold">貸　方</TableHead>
              <TableHead className="w-10 border-r text-center font-bold text-[10px]">借/貸</TableHead>
              <TableHead className="w-28 text-center font-bold">残　高</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 h-8 border-b border-zinc-200 dark:border-zinc-800 border-dotted last:border-solid last:border-zinc-800">
                <TableCell className="border-r text-center p-0">
                  <div className="flex justify-around items-center h-full">
                    <span className="w-1/2">{row.month}</span>
                    <span className="w-1/2 border-l border-zinc-200 dark:border-zinc-800 h-full flex items-center justify-center">{row.day}</span>
                  </div>
                </TableCell>
                <TableCell className="border-r px-2 truncate max-w-[150px]">{row.memo}</TableCell>
                <TableCell className="border-r text-center text-[10px] text-muted-foreground">{row.sourceEntryId}</TableCell>
                <TableCell className="border-r text-right px-2 font-mono">
                  {row.debit > 0 ? row.debit.toLocaleString() : ""}
                </TableCell>
                <TableCell className="border-r text-right px-2 font-mono">
                  {row.credit > 0 ? row.credit.toLocaleString() : ""}
                </TableCell>
                <TableCell className="border-r text-center font-bold text-[10px]">
                  {row.balanceSide}
                </TableCell>
                <TableCell className="text-right px-2 font-mono font-bold">
                  {row.balance.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {/* 余白行（帳票らしさの演出） */}
            {Array.from({ length: Math.max(0, 5 - rows.length) }).map((_, i) => (
              <TableRow key={`empty-${i}`} className="h-8 border-b border-zinc-200 dark:border-zinc-800 border-dotted last:border-solid last:border-zinc-800">
                <TableCell className="border-r p-0"><div className="flex justify-around"><span className="w-1/2"></span><span className="w-1/2 border-l border-zinc-200 dark:border-zinc-800 min-h-[32px]"></span></div></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell className="border-r"></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* 帳票下部飾り */}
      <div className="mt-4 flex justify-end opacity-20">
        <div className="w-32 h-1 border-b-2 border-double border-zinc-400"></div>
      </div>
    </Card>
  );
}
