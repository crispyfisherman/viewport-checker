import { useEffect, useState, } from 'react'
import './App.css'

function App() {
  const [info, setInfo] = useState<{
    innerWidth: number;
    innerHeight: number;
    screenWidth: number;
    screenHeight: number;
    devicePixelRatio: number;
    visualViewportWidth: number | string;
    visualViewportHeight: number | string;
    userAgent: string;
  }>({
    innerWidth: 0,
    innerHeight: 0,
    screenWidth: 0,
    screenHeight: 0,
    devicePixelRatio: 0,
    visualViewportWidth: 0,
    visualViewportHeight: 0,
    userAgent: '',
  });

  useEffect(() => {
    const update = () => {
      setInfo({
        innerWidth: window.innerWidth,
        innerHeight: window.innerHeight,
        screenWidth: screen.width,
        screenHeight: screen.height,
        devicePixelRatio: window.devicePixelRatio,
        visualViewportWidth: window.visualViewport?.width ?? "N/A",
        visualViewportHeight: window.visualViewport?.height ?? "N/A",
        userAgent: navigator.userAgent,
      });
    };

    update();
    window.addEventListener("resize", update);
    window.visualViewport?.addEventListener("resize", update);
    window.visualViewport?.addEventListener("scroll", update);

    return () => {
      window.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("resize", update);
      window.visualViewport?.removeEventListener("scroll", update);
    };
  }, []);

  const rows = [
    { label: "innerWidth", value: `${info?.innerWidth}px` },
    { label: "innerHeight", value: `${info?.innerHeight}px` },
    { label: "screen", value: `${info.screenWidth} × ${info.screenHeight}` },
    { label: "devicePixelRatio", value: info?.devicePixelRatio },
    { label: "visualViewport W", value: `${info?.visualViewportWidth}px` },
    { label: "visualViewport H", value: `${info?.visualViewportHeight}px` },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white p-5 font-mono">
      <h1 className="text-xl font-bold mb-1">Viewport Diagnostic</h1>
      <p className="text-gray-500 text-xs mb-5">
        Open this in your wallet browser (Slush, Phantom, etc.)
      </p>

      <div className="space-y-2">
        {rows.map((r) => (
          <div
            key={r.label}
            className="flex justify-between items-center bg-gray-900 rounded-lg px-4 py-3"
          >
            <span className="text-gray-400 text-sm">{r.label}</span>
            <span className="text-lg font-bold tabular-nums">{r.value}</span>
          </div>
        ))}
      </div>

      <details className="mt-6">
        <summary className="text-gray-500 text-xs cursor-pointer">
          User Agent
        </summary>
        <p className="text-gray-600 text-xs mt-2 break-all">
          {info?.userAgent}
        </p>
      </details>
    </div>
  )
}

export default App
