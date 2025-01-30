import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, TextPath, Text } from "react-konva";

const Home = () => {
  const [shapes, setShapes] = useState([{}]);

  const [shapeType, setShapeType] = useState("rect"); // circle
  const canvasRef = useRef(null);

  let idRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      let canvasEl = canvasRef.current;
      let x = 0;
      let y = 0;
      let height = 0;
      let width = 0;
      let isDrawing = false;

      canvasEl.addEventListener("mousedown", (e) => {
        isDrawing = true;
        x = e.clientX;
        y = e.clientY;

        idRef.current = Date.now();

        console.log(shapeType);

        let shape = {
          x: x,
          y: y,
          width: 0,
          height: 0,
          radius: 0,
          type: shapeType,
          fill: "red",
          stroke: "white",
          strokeWidth: 30,
          opacity: 0.5,
          id: idRef.current,
        };

        setShapes((p) => [...p, shape]);
      });

      canvasEl.addEventListener("mousemove", (e) => {
        if (!isDrawing) return;

        setShapes((shapes) => {
          return shapes.map((shape) => {
            if (shape.type === "rect" && shape.id === idRef.current) {
              shape.height = e.clientY - y;
              shape.width = e.clientX - x;
            } else if (shape.type === "circle" && shape.id === idRef.current) {
              let d = (e.clientX - x) ** 2 + (e.clientY - y) ** 2;
              let r = Math.sqrt(d);

              shape.radius = r;
            }
            return shape;
          });
        });
      });

      canvasEl.addEventListener("mouseup", (e) => {
        isDrawing = false;
        width = e.clientX - x;
        height = e.clientY - y;
      });

      return () => {
        canvasEl.removeEventListener("mouseup");
        canvasEl.removeEventListener("mousedown");
        canvasEl.removeEventListener("mousemove");
      };
    }
  }, [shapeType]);

  return (
    <>
      <div className="fixed z-40 top-4 flex justify-center items-center w-full">
        <div className="w-48 text-white flex gap-4">
          <button
            onClick={() => setShapeType("rect")}
            className="border-2 border-amber-100
             px-4 py-2 rounded-2xl cursor-pointer"
          >
            Rectangle
          </button>
          <button
            onClick={() => setShapeType("circle")}
            className="border-2 border-amber-100
             px-4 py-2 rounded-2xl cursor-pointer"
          >
            Circle
          </button>
        </div>
      </div>

      <Stage
        className="bg-zinc-950 min-h-screen text-slate-100"
        width={window.innerWidth}
        height={window.innerHeight}
        ref={canvasRef}
      >
        <Layer>
          {shapes.map((shape) => {
            if (shape.type === "rect") {
              return (
                <Rect
                  key={shape.id}
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  fill={shape.fill}
                  draggable
                  strokeWidth={5}
                  opacity={0.8}
                  stroke={"white"}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  fill={"red"}
                  draggable
                  strokeWidth={5}
                  opacity={0.8}
                  stroke={"white"}
                />
              );
            }
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Home;
