(function () {
            const N = 600;
    const SIZE = 400;
    const DOT_RADIUS = 2;
    const MARGIN = 2;
    const DURATION = 3;
    const GOLDEN_ANGLE = Math.PI * (3 - Math.sqrt(5));
    const CENTER = SIZE / 2;
    const MAX_RADIUS = CENTER - MARGIN - DOT_RADIUS;
    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");

    svg.setAttribute("width", SIZE);
    svg.setAttribute("height", SIZE);
    svg.setAttribute("viewBox", `0 0 ${SIZE} ${SIZE}`);

    document.getElementById("spiral").appendChild(svg);
    for (let i = 0; i < N; i++) {
                const idx = i + 0.5;
    const frac = idx / N;
    const r = Math.sqrt(frac) * MAX_RADIUS;
    const theta = idx * GOLDEN_ANGLE;
    const x = CENTER + r * Math.cos(theta);
    const y = CENTER + r * Math.sin(theta);
    const c = document.createElementNS(svgNS, "circle");

    c.setAttribute("cx", x);
    c.setAttribute("cy", y);
    c.setAttribute("r", DOT_RADIUS);
    svg.appendChild(c);

    const animR = document.createElementNS(svgNS, "animate");
    animR.setAttribute("attributeName", "r");
    animR.setAttribute(
    "values",
    `${DOT_RADIUS * 0.5}; ${DOT_RADIUS * 1.5}; ${DOT_RADIUS * 0.5}`
    );

    animR.setAttribute("dur", `${DURATION}s`);
    animR.setAttribute("begin", `${frac * DURATION}s`);
    animR.setAttribute("repeatCount", "indefinite");
    animR.setAttribute("calcMode", "spline");
    animR.setAttribute("keySplines", "0.4 0 0.6 1; 0.4 0 0.6 1");
    c.appendChild(animR);

    const animO = document.createElementNS(svgNS, "animate");
    animO.setAttribute("attributeName", "opacity");
    animO.setAttribute("values", "0.3; 1; 0.3");
    animO.setAttribute("dur", `${DURATION}s`);
    animO.setAttribute("begin", `${frac * DURATION}s`);
    animO.setAttribute("repeatCount", "indefinite");
    animO.setAttribute("calcMode", "spline");
    animO.setAttribute("keySplines", "0.4 0 0.6 1; 0.4 0 0.6 1");
    c.appendChild(animO);
            }
            
})();
