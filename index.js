import TWEEN from "@tweenjs/tween.js";
const fireImg = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACsAAAAoCAMAAABQF/NcAAAAllBMVEUAAADoFxfoFxfoGBfoGRfoJxfoLRfoFxfoUBfoGxfoURfoOBfoJhfoYxfrbDb4xLzoLhfonxfoTBfoRRfo3xfoaxfoOBfoURfoKRfoFxfuU1LqoSzoWxfyknzodxfoqRfoSxf////oJRfozhfoLhfyfn7oaxfn6BfohxfozhfoORf////oFxfohxfosRfolRf73Nzo3xdfNxMbAAAAMHRSTlMACxUeJzlMRburooJoRv7769fKk4uLcGddLv79+fjr6OTc28G9u7uqpaKiin14cVstNgSrAAAAmUlEQVQ4y+2SRw7DMAwEvSvJvZfYTu+9/v9zQV5AHXLUgMfBgsTSczhkANibirASmaUT38KFB/px3HWDgeiSponDKGqU6JI8h/W2WrWgvK2p1uU8z59aDKZOwrpczIrXqMTcMbnul8X0EBiKueyTaPd5X4JM3AHaPI6nzS3tM/k2pf0hbe82ZQBaUQeBVccASWX3O/iNw/FfvsQpBuPiNz4DAAAAAElFTkSuQmCC";
function Firestar(container, count, duration, imgsrc) {
	
	var c = document.createElement("canvas");
	if (!c || !c.getContext) {
		return;
	}
	if (!container) {
		container = document.getElementsByName("body")[0];
	}
	if (!count) {
		count = 30;
	}
	if (!duration) {
		duration = 5;
	}
	if (!imgsrc) {
		imgsrc = fireImg;
	}
	var n = count;
	container.appendChild(c);
	// c.width = container.width;
	// c.height = container.height
	var ctx = c.getContext("2d"),
		cw = (c.width = container.offsetWidth),
		ch = (c.height = container.offsetHeight),
		img = new Image(),
		particles = [],
		particleNumber = 0,
		Particle = function (_i) {
			this.index = _i;
			this.draw = function () {
				ctx.globalAlpha = this.alpha;
				ctx.globalCompositeOperation = "lighter";

				ctx.drawImage(img, this.position.x, this.position.y, this.position.size * 2, this.position.size * 2);
			};
		};

	function setParticle(p) {
		particleNumber++;
		var _size = rand(4, 12), // px width + height
			_dur = rand(duration, duration + _size / 10);

		p.position = { x: rand(-_size, cw), y: ch, size: _size };

		if (particleNumber < n) {
			//fast forward on first run
			var jindu = Math.random();
			_dur = _dur * (1 - jindu);
			p.position.y = ch * (1 - jindu);
		}

		var tween = new TWEEN.Tween(p.position)
			.to({ x: p.position.x + rand(_size * -10, _size * 45), y: -_size, size: 15 }, _dur * 1000)
			// .easing(TWEEN.Easing.Quadratic.In)
			.onComplete((obj) => {
				setParticle(p);
			})
			.start();
	}

	// First run
	for (var i = 0; i < n; i++) {
		particles.push(new Particle(i));
		setParticle(particles[i]);
	}

	function animate() {
		ctx.clearRect(0, 0, cw, ch);
		for (var i = 0; i < n; i++) particles[i].draw();
		requestAnimationFrame(animate);
		TWEEN.update();
	}
	animate();

	window.addEventListener("resize", function () {
		particleNumber = 0;
		cw = c.width = container.offsetWidth;
		ch = c.height = container.offsetHeight;
	});

	function rand(min, max) {
		var min = min || 0;
		var max = max || 1;
		return min + (max - min) * Math.random();
	}

	img.src = imgsrc;
}
export default Firestar;
