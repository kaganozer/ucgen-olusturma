import React, { useRef, useEffect } from 'react'

const Canvas = props => {
    const {draw, shape, ...rest} = props;
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.font = "bold 16px Source Code Pro";
        context.clearRect(0, 0, canvas.width, canvas.height);
        draw(context, shape);
    }, [draw, shape]);
    
    return <canvas ref={canvasRef} {...rest}/>
}

export default Canvas;
