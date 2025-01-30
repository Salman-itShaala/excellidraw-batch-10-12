import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, TextPath, Text, Line } from "react-konva";

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
      let isDrawing = false;

      const handleMouseDown = (e) => {
        isDrawing = true;
        x = e.clientX;
        y = e.clientY;

        idRef.current = Date.now();

        console.log(shapeType);

        let shape = {
          points: [x, y],
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
      };

      const handleMouseMove = (e) => {
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
            } else if (shape.type === "line" && shape.id === idRef.current) {
              shape.points = [...shape.points, e.clientX, e.clientY];
            }
            return shape;
          });
        });
      };

      const handleMouseUp = (e) => {
        isDrawing = false;
      };

      canvasEl.addEventListener("mousedown", handleMouseDown);

      canvasEl.addEventListener("mousemove", handleMouseMove);

      canvasEl.addEventListener("mouseup", handleMouseUp);

      return () => {
        canvasEl.removeEventListener("mouseup", handleMouseUp);
        canvasEl.removeEventListener("mousedown", handleMouseDown);
        canvasEl.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [shapeType]);

  function handleDragEnd(e, id) {
    console.log(e.evt);

    setShapes((shapes) => {
      return shapes.map((shape) => {
        if (shape.id === id) {
          // not correct
          shape.x = e.evt.clientX;
          shape.y = e.evt.clientY;
        }
        return shape;
      });
    });
  }

  return (
    <>
      <div className="fixed z-40 top-4 flex justify-center items-center w-full">
        <div className=" text-white flex gap-4 p-2 bg-slate-500 rounded-2xl">
          {/* todo improve this : - create array for shapes and
           use map on that array to return all these buttons */}
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
          <button
            onClick={() => setShapeType("line")}
            className="border-2 border-amber-100
             px-4 py-2 rounded-2xl cursor-pointer"
          >
            Draw
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
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
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
            } else if (shape.type === "line") {
              return (
                <Line
                  points={shape.points}
                  stroke={"green"}
                  strokeWidth={2}
                  lineJoin="round"
                  // dash={[33, 10]}
                  lineCap="round"
                  tension={0.5}
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
