"use client";

import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import { generateEdgeTable, getCords } from "@/lib/map";
import { drawBackground } from "@/lib/graphics";

export default function GamePage() {
  // To access canvas element
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [gameSize, setGameSize] = useState<{ width: number; height: number }>({
    width: 10,
    height: 10,
  });

  // Set only onece
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null);
  const [error, setError] = useState<string | null>(null);
  // User position x -> how far from the first block horizontally
  // y -> how far from the first block vertically
  const [position, setPoisition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  // This is important when determining the possible moves
  const edges = useMemo(() => {
    return generateEdgeTable(gameSize.width, gameSize.height);
  }, [gameSize]);

  const saveDimensions = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setDimensions({
      width: 500,
      height: 500,
    });
  }, []);

  const keyDownAction = () => {
    console.log("Keypress");
    setPoisition(({ x, y }) => {
      return { x: ++x, y: ++y };
    });
  };

  const draw = useCallback(() => {
    if (ctx) {
      // Setting the background
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, dimensions.width, dimensions.height);
      const colBlocks = gameSize.width;
      const rowBlocks = gameSize.height;
      const rectWidth = dimensions.width / colBlocks;
      const rectHeight = dimensions.height / rowBlocks;
      ctx.strokeStyle = "#7c7d7c";

      for(let block = 0; block < gameSize.width * gameSize.height; ++block) {
        const [x,y] = getCords(block, gameSize.width, gameSize.height);
      }
    }
  }, [ctx, dimensions, gameSize]);

  useEffect(() => {
    console.log(generateEdgeTable(2, 2));
    //console.log(getCords(3,2,2));
    const canvas = canvasRef.current;
    // Need to capture window dimensions at the beggining
    saveDimensions();
    // At each resize save the window dimensions
    window.addEventListener("resize", saveDimensions);
    if (canvas) {
      // Setting the canvas dimensions
      canvas.width = 500;
      canvas.height = 500;

      const ctx = canvas.getContext("2d");
      if (ctx) setCtx(ctx);
      else setError("Error while rendering.");

      // To add keyboard event listenersr
      canvas.tabIndex = 1;
      canvas.focus();

      // Adding key press event listener
      canvas.addEventListener("keydown", keyDownAction);
    }

    return () => {
      // Removing any duplicate event listeners
      if (canvas) canvas.removeEventListener("keydown", keyDownAction);
      window.removeEventListener("resize", saveDimensions);
    };
  }, [saveDimensions]);

  // Redrawn for every resize and position change
  useEffect(() => {
    draw();
  }, [position, draw]);

  return (
    <main>
      <canvas
        id="game-canvas"
        className="fixed top-0 left-0"
        ref={canvasRef}
      ></canvas>
    </main>
  );
}
