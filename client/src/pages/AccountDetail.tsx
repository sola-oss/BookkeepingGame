import { useEffect } from "react";
import { useLocation } from "wouter";

export default function AccountDetail() {
  const [, navigate] = useLocation();
  
  useEffect(() => {
    navigate("/accounts", { replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <p className="text-muted-foreground">リダイレクト中...</p>
    </div>
  );
}
