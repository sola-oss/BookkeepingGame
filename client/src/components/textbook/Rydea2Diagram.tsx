import rydea2Image from "@assets/image_1772101891334.png";

export default function Rydea2Diagram() {
  return (
    <div className="w-full p-4 md:p-6 space-y-4" data-testid="rydea2-diagram">
      <h3 className="text-lg font-bold text-foreground text-center" data-testid="text-rydea2-title">Rydea 2.0（簡易版）</h3>
      <div className="flex justify-center">
        <div className="bg-white rounded-lg p-2 shadow-sm max-w-[500px] w-full">
          <img
            src={rydea2Image}
            alt="Rydea 2.0 簡易版 - B/SとP/Lの関係図"
            className="w-full h-auto"
            data-testid="img-rydea2"
          />
        </div>
      </div>
    </div>
  );
}
