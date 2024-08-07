import { useToolbarStore } from '../store'
import { useDraw } from '../hooks/useDraw'
import CanvasToolbar from './CanvasToolbar'
import SaveImage from './SaveImage'

interface HeightProp {
    width: number
    canvasHeight: number
}

const DrawCanvas = ({ width, canvasHeight }: HeightProp) => {
    const { canvasBg, brushThickness, color, downloadSelect } = useToolbarStore();

    const { canvasRef, onMouseDown, clear } = useDraw(drawLine);

    function drawLine({ prevPoint, currPoint, ctx }: Draw) {
        const { x: currX, y: currY } = currPoint;

        const lineWidth = brushThickness;
        const lineColor = color;

        let startPoint = prevPoint ?? currPoint;
        ctx.beginPath();
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = lineColor;
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(currX, currY);
        ctx.stroke();
        ctx.fillStyle = lineColor;
        ctx.beginPath();
        ctx.arc(startPoint.x, startPoint.y, 2, 0, 2 * Math.PI);
        ctx.fill();
    };

    return (
        <div className='relative'>
            <CanvasToolbar
                clear={clear}
            />

            <canvas
                className='cursor-crosshair'
                width={`${width}px`}
                height={`${canvasHeight}px`}
                ref={canvasRef}
                onMouseDown={onMouseDown}
                onTouchStart={onMouseDown}
                style={{ background: canvasBg }}
            />

            {downloadSelect && <SaveImage canvasRef={canvasRef} />}
        </div>
    )
}

export default DrawCanvas