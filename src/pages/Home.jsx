import React, { useState } from "react";
import { Stage, Layer, Rect, Circle, TextPath, Text } from "react-konva";

const Home = () => {
  const [shapes, setShapes] = useState([{}]);

  /*
    
    {
    "id": "T5-srFFohXmZMaagnYGJb",
    "type": "rectangle",
    "x": 20851.096308390297,
    "y": 72849.8097795759,
    "width": 3326.6668701171875,
    "height": 3766.6668701171875,
    "angle": 0,
    "strokeColor": "#2f9e44",
    "backgroundColor": "#b2f2bb",
    "strokeWidth": 1,
    }
    */

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
