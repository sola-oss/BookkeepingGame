import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LedgerRow } from "@/data/ledgerData";

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
    <Card className="bg-white dark:bg-zinc-950 p-2 sm:p-4 rounded-xl border shadow-sm font-sans overflow-hidden">
      {/* 帳票ヘッダー */}
      <div className="text-center mb-4 relative">
        <h2 className="text-xl font-bold tracking-[0.2em] border-b-2 border-double border-zinc-800 dark:border-zinc-200 inline-block px-8 pb-1 mb-1">
          総勘定元帳
        </h2>
        <div className="flex justify-between items-end mt-2 px-1">
          <div className="text-left">
            <h3 className="text-base font-bold border-b border-zinc-400 dark:border-zinc-600 px-2">
              勘定： <span className="underline decoration-double underline-offset-4">{accountName}</span>
            </h3>
          </div>
          <div className="text-right text-[9px] leading-tight space-y-0">
            <p>{meta.companyName}</p>
            <p>{meta.period}</p>
            <p>（単位：{meta.unit}）</p>
          </div>
        </div>
      </div>

      {/* 帳票テーブル */}
      <div className="overflow-x-auto -mx-2 sm:mx-0 border-t border-b border-zinc-800 dark:border-zinc-200">
        <Table className="min-w-full border-collapse text-[9px] sm:text-[10px] table-fixed">
          <TableHeader className="bg-zinc-50 dark:bg-zinc-900/50">
            <TableRow className="hover:bg-transparent border-b border-zinc-800 dark:border-zinc-200 h-8">
              <TableHead className="w-[12%] border-r text-center font-bold px-0">
                <div className="flex flex-col text-[7px] leading-tight">
                  <span>日 付</span>
                  <div className="flex justify-around border-t border-zinc-300 mt-0.5 pt-0.5">
                    <span>月</span>
                    <span>日</span>
                  </div>
                </div>
              </TableHead>
              <TableHead className="w-[28%] border-r text-center font-bold px-1">摘 要</TableHead>
              <TableHead className="w-[8%] border-r text-center font-bold text-[8px] px-0">仕丁</TableHead>
              <TableHead className="w-[15%] border-r text-center font-bold px-1">借 方</TableHead>
              <TableHead className="w-[15%] border-r text-center font-bold px-1">貸 方</TableHead>
              <TableHead className="w-[7%] border-r text-center font-bold text-[8px] px-0">借/貸</TableHead>
              <TableHead className="w-[15%] text-center font-bold px-1">残 高</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row, idx) => (
              <TableRow key={idx} className="hover:bg-zinc-100/50 dark:hover:bg-zinc-800/30 h-7 border-b border-zinc-200 dark:border-zinc-800 border-dotted last:border-solid last:border-zinc-800">
                <TableCell className="border-r text-center p-0">
                  <div className="flex justify-around items-center h-full text-[8px]">
                    <span className="w-1/2">{row.month}</span>
                    <span className="w-1/2 border-l border-zinc-200 dark:border-zinc-800 h-full flex items-center justify-center">{row.day}</span>
                  </div>
                </TableCell>
                <TableCell className="border-r px-1 truncate">{row.memo}</TableCell>
                <TableCell className="border-r text-center text-[8px] text-muted-foreground p-0">{row.sourceEntryId}</TableCell>
                <TableCell className="border-r text-right px-1 font-mono tabular-nums">
                  {row.debit > 0 ? row.debit.toLocaleString() : ""}
                </TableCell>
                <TableCell className="border-r text-right px-1 font-mono tabular-nums">
                  {row.credit > 0 ? row.credit.toLocaleString() : ""}
                </TableCell>
                <TableCell className="border-r text-center font-bold text-[8px] p-0">
                  {row.balanceSide}
                </TableCell>
                <TableCell className="text-right px-1 font-mono font-bold tabular-nums">
                  {row.balance.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
            {/* 余白行の削減 */}
            {Array.from({ length: Math.max(0, 3 - rows.length) }).map((_, i) => (
              <TableRow key={`empty-${i}`} className="h-7 border-b border-zinc-200 dark:border-zinc-800 border-dotted last:border-solid last:border-zinc-800">
                <TableCell className="border-r p-0"><div className="flex justify-around"><span className="w-1/2"></span><span className="w-1/2 border-l border-zinc-200 dark:border-zinc-800 min-h-[28px]"></span></div></TableCell>
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

      {/* 帳票下部飾りの削減 */}
      <div className="mt-2 flex justify-end opacity-20">
        <div className="w-24 h-0.5 border-b-2 border-double border-zinc-400"></div>
      </div>
    </Card>
  );
}
