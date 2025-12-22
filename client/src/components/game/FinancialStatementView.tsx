import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CompanyMeta, StatementSection } from "@/data/financialStatementsSample";

interface FinancialStatementViewProps {
  meta: CompanyMeta;
  statementType: "BS" | "PL";
  data: StatementSection[];
}

export function FinancialStatementView({ meta, statementType, data }: FinancialStatementViewProps) {
  const title = statementType === "BS" ? "貸借対照表" : "損益計算書";
  const periodLabel = statementType === "BS" ? `${meta.endDate}現在` : `${meta.startDate}〜${meta.endDate}`;

  return (
    <div className="space-y-4 font-sans text-foreground p-1">
      <div className="text-center space-y-1">
        <h3 className="text-lg font-bold border-b-2 border-double border-foreground/30 inline-block px-8 pb-1">
          {title}
        </h3>
        <div className="flex justify-between items-end text-[10px] text-muted-foreground px-1">
          <div className="text-left">
            <p>{meta.name}</p>
            <p>{meta.fiscalPeriod} ({periodLabel})</p>
          </div>
          <div>（単位：{meta.unit}）</div>
        </div>
      </div>

      <div className="border border-foreground/10 rounded-sm overflow-hidden bg-card/50">
        <Table className="border-collapse">
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="h-8 text-[11px] font-bold text-foreground py-1 px-3 border-r">科目</TableHead>
              <TableHead className="h-8 text-[11px] font-bold text-foreground py-1 px-3 text-right">金額</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((section, sIdx) => (
              <React.Fragment key={sIdx}>
                {section.heading && (
                  <TableRow className="bg-muted/10 hover:bg-transparent border-t">
                    <TableCell colSpan={2} className="py-1 px-3 text-[11px] font-bold">
                      {section.heading}
                    </TableCell>
                  </TableRow>
                )}
                {section.lines.map((line, lIdx) => (
                  <TableRow 
                    key={lIdx} 
                    className={`hover:bg-primary/5 border-none ${line.isTotal ? "bg-muted/5" : ""}`}
                  >
                    <TableCell className="py-1.5 px-3 text-[11px]">
                      <span style={{ paddingLeft: `${(line.indent || 0) * 1.5}rem` }} className={line.isTotal ? "font-bold" : ""}>
                        {line.label}
                      </span>
                    </TableCell>
                    <TableCell className={`py-1.5 px-3 text-[11px] text-right font-mono ${line.isTotal ? "font-bold border-t border-foreground/30" : ""}`}>
                      {line.amount < 0 ? `△${Math.abs(line.amount).toLocaleString()}` : line.amount.toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </div>
      
      <p className="text-[9px] text-muted-foreground text-right italic">
        ※学習用サンプル（数値は整合性を考慮した架空のものです）
      </p>
    </div>
  );
}

import React from "react";
