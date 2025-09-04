
function buildViewImage(_time) {
	if (!viewCanvas)
		return;

	var thisView = getCurrentView();
	var zoom = v(parseInt(document.getElementById("zoom").value, 10));
	var w = thisView.w * zoom;
	var h = thisView.h * zoom;
	viewCanvas.width = w;
	viewCanvas.height = h;
	viewContext.width = w;
	viewContext.height = h;
	viewContext.imageSmoothingEnabled = false;
	viewContext.drawImage(workCanvas, 0, 0, thisView.w, thisView.h, 0, 0, w, h);
	var size = v(parseInt(document.getElementById("size").value, 10));
	RECT_W = size;
	RECT_H = size;

	showGrab(_time, zoom);
}


function showSprites(_time, zoom, w, h)  {
	var ctx = viewContext;
	var thisView = spriteWindow;

	var sprtC = parseInt(document.getElementById('sprtC').value,10);
	var originalsprtC = sprtC;
	var maxsprtC = 0;
	var sprtH = zoom * parseInt(document.getElementById('sprtH').value,10);
	var sprtW = zoom * 16;

	var startX = thisView.x * zoom;
	var endX = startX + thisView.w * zoom;
	var startY = thisView.y * zoom;
	var endY = startY + thisView.h * zoom;
	for (var y = startY; y < endY; y += sprtH) {
		for (var x = startX; x < endX; x += sprtW) {
			if (sprtC > 0) {
				ctx.beginPath();
				ctx.moveTo(x,y);
				ctx.lineTo(x+sprtW,y);
				ctx.lineTo(x+sprtW,y+sprtH);
				ctx.lineTo(x,y+sprtH);
				ctx.lineTo(x,y);
				ctx.stroke();			
				sprtC--;	
			} else {
				ctx.fillRect(x,y,sprtW,sprtH);
			}
			maxsprtC++;
		}	
	}
	if (originalsprtC > maxsprtC) {
		document.getElementById('sprtC').value = maxsprtC;
	}
	if (startX > 0)
		ctx.fillRect(0,0,startX-1,viewContext.height);
	if (endX < viewContext.width)
		ctx.fillRect(endX,0,viewContext.width-endX,viewContext.height);
	if (startY > 0)
		ctx.fillRect(0,0,viewContext.width,startY-1);
	if (endY < viewContext.height)
		ctx.fillRect(0,endY,viewContext.width,viewContext.height-endY);

} 



function showBobs(_time, zoom, w, h)  {
	var ctx = viewContext;
	var thisView = spriteWindow;
	var startX = thisView.x * zoom;
	var endX = startX + thisView.w * zoom;
	var startY = thisView.y * zoom;
	var endY = startY + thisView.h * zoom;

	var bobW = zoom * parseInt(document.getElementById('bobW').value,10);
	var bobH = zoom * parseInt(document.getElementById('bobH').value,10);
	var bobC = parseInt(document.getElementById('bobC').value,10);
	var originalBobC = bobC;
	var maxBobC = 0;
	for (var y = startY; y < endY; y += bobH) {
		for (var x = startX; x < endX; x += bobW) {
			if (bobC > 0) {
				ctx.beginPath();
				ctx.moveTo(x,y);
				ctx.lineTo(x+bobW,y);
				ctx.lineTo(x+bobW,y+bobH);
				ctx.lineTo(x,y+bobH);
				ctx.lineTo(x,y);
				ctx.stroke();			
				bobC--;	
			} else {
				ctx.fillRect(x,y,bobW,bobH);
			}
			maxBobC++;
		}	
	}
	if (originalBobC > maxBobC) {
		document.getElementById('bobC').value = maxBobC;
	}
	if (startX > 0)
		ctx.fillRect(0,0,startX-1,viewContext.height);
	if (endX < viewContext.width)
		ctx.fillRect(endX,0,viewContext.width-endX,viewContext.height);
	if (startY > 0)
		ctx.fillRect(0,0,viewContext.width,startY-1);
	if (endY < viewContext.height)
		ctx.fillRect(0,endY,viewContext.width,viewContext.height-endY);
} 

function showGrab(_time, zoom)  {
	var ctx = viewContext;
	ctx.strokeStyle = "rgba(255, 255, 255, 1)";
	var zoom = v(parseInt(document.getElementById("zoom").value, 10));

	viewContext.imageSmoothingEnabled = false;
	let ZX = RECT_X * zoom;
	let ZY = RECT_Y * zoom;
	let ZW = RECT_W * zoom;
	let ZH = RECT_H * zoom;
	if(document.getElementById("invert").checked) {
		viewContext.drawImage(workCanvas, RECT_X, RECT_Y, RECT_W, RECT_H, ZX, ZY+200*zoom, ZW, ZH);
		ctx.strokeRect(ZX, ZY+200*zoom, ZW, ZH);
	} else {
		viewContext.drawImage(workCanvas, RECT_X, RECT_Y+200, RECT_W, RECT_H, ZX, ZY, ZW, ZH);
		ctx.strokeRect(ZX, ZY, ZW, ZH);
	}
	RECT_X += RECT_SPDX;
	RECT_Y += RECT_SPDY;
	if (RECT_X < 0) { RECT_X = 0; RECT_SPDX *= -1;}
	if (RECT_Y < 0) { RECT_Y = 0; RECT_SPDY *= -1;}
	if (RECT_X + RECT_W > 319) { RECT_X = 319 - RECT_W; RECT_SPDX *= -1;}
	if (RECT_Y + RECT_H > 199) { RECT_Y = 199 - RECT_H; RECT_SPDY *= -1;}
} 
