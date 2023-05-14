import { useEffect, useRef } from "react";

const Canvas = ({ triangle }) => {
    const canvasRef = useRef();

    const draw = (ctx) => {
        const WIDTH = ctx.canvas.width;
        const min = Math.min(triangle.A, triangle.B);
        const max = Math.max(triangle.A, triangle.B);
        const resize = 225;
        const cx = (WIDTH - resize) / 2;
        const cy = 25;
        const resizeMin = min * resize / max;
        const cos = triangle.cos;
        const sin = Math.sqrt(1 - cos**2);

        const vertices = [
            [[cx, cy], "#210761"],
            [[cx + resize, cy], "#a80022"],
            [[cx + resizeMin*cos, cy + resizeMin*sin], "#540930"]
        ];

        ctx.strokeStyle="white";
        ctx.beginPath();
        ctx.arc(cx, cy, 15, 0, Math.acos(cos));
        ctx.stroke();
        ctx.closePath();

        vertices.forEach((vertice, index) => {
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.moveTo(...vertice[0]);
            ctx.lineTo(...vertices[(index+1) % vertices.length][0]);
            ctx.strokeStyle = vertice[1];
            ctx.stroke();
            ctx.closePath;
        });

        ctx.font = "20px Montserrat";
        ctx.fillStyle = triangle.A === max ? "#210761" : "#540930";
        ctx.fillText(`A = ${triangle.A}`, 15, 35);
        ctx.fillStyle = triangle.A === max ? "#540930" : "#210761";
        ctx.fillText(`B = ${triangle.B}`, 15, 60);
        ctx.fillStyle = "#a80022";
        ctx.fillText(`C = ${triangle.C}`, 15, 85);
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.font = "bold 16px Source Code Pro";
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw(ctx);
    }, [triangle]);

    return <canvas
        ref={canvasRef}
        width={500}
        height={275}
    />;
}

export default Canvas;