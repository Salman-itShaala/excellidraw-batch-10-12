import React from "react";

const Sidebar = ({
  setStrokeColor,
  setBgColor,
  setStrokeWidth,
  setOpacity,
  opacity,
}) => {
  return (
    <div className="fixed flex flex-col gap-4 z-50 p-4 h-[80vh] top-[10vh] left-[1vw] w-[20vw] rounded-2xl bg-[#232329]">
      <div className="flex flex-col">
        <p className="text-slate-200 text-lg">Stroke</p>
        <div className="flex gap-1">
          <button
            onClick={() => setStrokeColor("white")}
            className="bg-white h-8 w-8 rounded hover:border-3 border-white"
          ></button>
          <button
            onClick={() => setStrokeColor("red")}
            className="bg-red-500 h-8 w-8 rounded hover:border-3 border-white"
          ></button>
          <button
            onClick={() => setStrokeColor("green")}
            className="bg-green-500 h-8 w-8 rounded hover:border-3 border-white"
          ></button>
          <button
            onClick={() => setStrokeColor("blue")}
            className="bg-blue-500 h-8 w-8 rounded hover:border-3 hover:border-white"
          ></button>
          <button
            onClick={() => setStrokeColor("yellow")}
            className="bg-yellow-500 h-8 w-8 rounded hover:border-3 hover:border-white"
          ></button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-slate-200 text-lg">Background</p>
        <div className="flex gap-1">
          <button
            onClick={() => setBgColor("white")}
            className="bg-white h-8 w-8 rounded hover:border-3 border-white"
          ></button>
          <button
            onClick={() => setBgColor("red")}
            className="bg-red-500 h-8 w-8 rounded hover:border-3 border-white"
          ></button>
          <button
            onClick={() => setBgColor("green")}
            className="bg-green-500 h-8 w-8 rounded hover:border-3 border-white"
          ></button>
          <button
            onClick={() => setBgColor("blue")}
            className="bg-blue-500 h-8 w-8 rounded hover:border-3 hover:border-white"
          ></button>
          <button
            onClick={() => setBgColor("yellow")}
            className="bg-yellow-500 h-8 w-8 rounded hover:border-3 hover:border-white"
          ></button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-slate-200 text-lg">Stroke Width</p>
        <div className="flex gap-1">
          <button
            onClick={() => setStrokeWidth(2)}
            className="h-8 w-8 rounded bg-[#403E6A] flex justify-center items-center"
          >
            <span className="w-[75%] h-0.5 bg-white"></span>
          </button>
          <button
            onClick={() => setStrokeWidth(4)}
            className="h-8 w-8 rounded bg-[#403E6A] flex justify-center items-center"
          >
            <span className="w-[75%] h-1 bg-white"></span>
          </button>
          <button
            onClick={() => setStrokeWidth(6)}
            className="h-8 w-8 rounded bg-[#403E6A] flex justify-center items-center"
          >
            <span className="w-[75%] h-2 bg-white"></span>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-slate-200 text-lg">Opacity</p>
        <div className="flex gap-1">
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            onChange={(e) => setOpacity(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
