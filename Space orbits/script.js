
        const canvas = document.getElementById("space");
        const ctx = canvas.getContext("2d");
        let w, h;
        let speed = 2;
        const stars = [];

        function resize() {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
        }

        window.addEventListener("resize", resize);
        resize();

        for (let i = 0; i < 500; i++) {
            stars.push({
                x: Math.random() * w - w / 2,
                y: Math.random() * h - h / 2,
                z: Math.random() * w,
            });
        }

        document.addEventListener("mousemove", e => {
            speed = (e.clientX / w) * 10 + 1;
        });

        function animate() {
            ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
            ctx.fillRect(0, 0, w, h);
            ctx.fillStyle = "#fff";
            stars.forEach(s => {
                s.z -= speed;

                if (s.z <= 0) s.z = w;
                const x = (s.x / s.z) * w + w / 2;
                const y = (s.y / s.z) * h + h / 2;
                const size = (1 - s.z / w) * 3;

                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            });

            requestAnimationFrame(animate);
        }

        animate();