// This contains all the functions related to generation of graphics

export function drawBackground(ctx: CanvasRenderingContext2D, color: string, width: number, height: number) {
	ctx.fillStyle = color;
	ctx.fillRect(0,0, width, height);
}
