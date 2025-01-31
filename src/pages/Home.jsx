import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, TextPath, Text, Line } from "react-konva";
import { FaRegSquare } from "react-icons/fa6";
import { FaRegCircle } from "react-icons/fa";
import { LuPencil } from "react-icons/lu";
import Sidebar from "../components/Sidebar";

const colors = ["white", "red", "green", "blue", "yellow"];

const Home = () => {
  const savedShapes = JSON.parse(localStorage.getItem("shapes")) || [];

  const [shapes, setShapes] = useState(savedShapes);
  const [strokeColor, setStrokeColor] = useState("white");
  const [bgColor, setBgColor] = useState("white");
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [opacity, setOpacity] = useState(1);
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

        let shape = {
          points: [x, y],
          x: x,
          y: y,
          width: 0,
          height: 0,
          radius: 0,
          type: shapeType,
          fill: bgColor,
          stroke: strokeColor,
          strokeWidth: strokeWidth,
          opacity: opacity,
          id: idRef.current,
        };

        setShapes((p) => {
          localStorage.setItem("shapes", JSON.stringify([...p, shape]));
          return [...p, shape];
        });
      };

      const handleMouseMove = (e) => {
        if (!isDrawing) return;

        setShapes((shapes) => {
          let newArray = shapes.map((shape) => {
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

          localStorage.setItem("shapes", JSON.stringify(newArray));
          return newArray;
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
  }, [shapeType, strokeColor, bgColor, strokeWidth, opacity]);

  function handleDragEnd(e, id) {
    // you can call some function on that e object to
    // get current x and y

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

    // todo save to locaStorage
  }

  useEffect(() => {
    setShapes(JSON.parse(localStorage.getItem("shapes")) || []);
  }, []);

  return (
    <>
      <Sidebar
        setStrokeColor={setStrokeColor}
        setBgColor={setBgColor}
        setStrokeWidth={setStrokeWidth}
        setOpacity={setOpacity}
        opacity={opacity}
      />
      <div className="fixed z-40 top-4 flex justify-center items-center w-full">
        <div className=" text-white flex gap-4 p-1 bg-[#232329] rounded-lg">
          {/* todo improve this : - create array for shapes and
           use map on that array to return all these buttons */}
          <button
            onClick={() => setShapeType("rect")}
            className={`px-4 py-3 rounded-lg cursor-pointer hover:bg-[#403e6a80] ${
              shapeType === "rect" && "bg-[#403E6A]"
            }`}
          >
            <FaRegSquare />
          </button>
          <button
            onClick={() => setShapeType("circle")}
            className={`px-4 py-3 rounded-lg cursor-pointer hover:bg-[#403e6a80] ${
              shapeType === "circle" && "bg-[#403E6A]"
            }`}
          >
            <FaRegCircle />
          </button>
          <button
            onClick={() => setShapeType("line")}
            className={`px-4 py-3 rounded-lg cursor-pointer hover:bg-[#403e6a80] ${
              shapeType === "line" && "bg-[#403E6A]"
            }`}
          >
            <LuPencil />
          </button>
        </div>
      </div>

      <Stage
        className="bg-[#121212] min-h-screen text-slate-100"
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
                  strokeWidth={shape.strokeWidth}
                  opacity={shape.opacity}
                  stroke={shape.stroke}
                  onDragEnd={(e) => handleDragEnd(e, shape.id)}
                />
              );
            } else if (shape.type === "circle") {
              return (
                <Circle
                  x={shape.x}
                  y={shape.y}
                  radius={shape.radius}
                  fill={shape.fill}
                  draggable
                  strokeWidth={shape.strokeWidth}
                  opacity={shape.opacity}
                  stroke={shape.stroke}
                />
              );
            } else if (shape.type === "line") {
              return (
                <Line
                  points={shape.points}
                  stroke={shape.stroke}
                  strokeWidth={shape.strokeWidth}
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
