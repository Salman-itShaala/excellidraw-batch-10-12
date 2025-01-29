import React, { useEffect, useRef, useState } from "react";
import { Stage, Layer, Rect, Circle, TextPath, Text } from "react-konva";

const Home = () => {
  const [shapes, setShapes] = useState([{}]);

  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      let canvasEl = canvasRef.current;
      let x = 0;
      let y = 0;
      let height = 0;
      let width = 0;

      //   canvasEl.addEventListener("mousemove", (e) => {
      //     console.log("X axis is ", e.clientX);
      //     console.log("Y axis is ", e.clientY);
      //   });

      canvasEl.addEventListener("mousedown", (e) => {
        x = e.clientX;
        y = e.clientY;
      });

      canvasEl.addEventListener("mouseup", (e) => {
        width = e.clientX - x;
        height = e.clientY - y;

        console.log("x is ", x, "y is ", y);
        console.log("height is ", height, "widht is ", width);

        let shape = {
          x: x,
          y: y,
          width: width,
          height: height,
          fill: "red",
          type: "rect",
          id: Date.now(),
        };

        setShapes((p) => [...p, shape]);
      });

      return () => {
        canvasEl.removeEventListener("mouseup");
        canvasEl.removeEventListener("mousedown");
        canvasEl.removeEventListener("mousemove");
      };
    }
  }, []);

  function drawRect() {
    // {x, y, width, height, fill, type}

    let shape = {
      x: 200,
      y: 200,
      width: 200,
      height: 200,
      fill: "red",
      type: "rect",
      id: Date.now(),
    };

    setShapes((p) => [...p, shape]);
  }

  return (
    <>
      {shapes.length === 0 ? (
        <div className="bg-slate-800 min-h-screen text-slate-100">
          <p className="text-center text-4xl font-bold">
            Welcome to Excellidraw
          </p>
          <p className="text-center">Worlds #1 note making/drawing app</p>
        </div>
      ) : (
        <>
          <button onClick={drawRect}>Add react</button>
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
                    />
                  );
                }
              })}
            </Layer>
          </Stage>
        </>
      )}
    </>
  );
};

export default Home;
