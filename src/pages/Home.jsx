import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, TextPath, Text } from "react-konva";

const Home = () => {
  const [shapes, setShapes] = useState([{}]);

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

        let shape = {
          x: x,
          y: y,
          width: 0,
          height: 0,
          type: "rect",
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
            if (shape.id === idRef.current) {
              shape.height = e.clientY - y;
              shape.width = e.clientX - x;
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
  }, []);

  return (
    <>
      <Stage
        className="bg-slate-800 min-h-screen text-slate-100"
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
            }
          })}
        </Layer>
      </Stage>
    </>
  );
};

export default Home;
