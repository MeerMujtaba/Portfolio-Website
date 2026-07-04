document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================================================
    // 1. LOADING SCREEN ANIMATION
    // ==========================================================================
    const loadingScreen = document.getElementById("loading");
    const letters = document.querySelectorAll(".loading-text span");
    
    if (loadingScreen && letters.length > 0) {
        let delay = 0;
        
        letters.forEach((letter, index) => {
            // Fade in letter
            setTimeout(() => {
                letter.style.opacity = "1";
            }, delay);
            
            // Turn white briefly
            setTimeout(() => {
                letter.style.color = "#ffffff";
            }, delay + 200);
            
            // Turn glow on
            setTimeout(() => {
                letter.classList.add("glow");
            }, delay + 200);
            
            // Revert back to dim
            setTimeout(() => {
                letter.style.color = "rgba(255,255,255,0.1)";
            }, delay + 600);
            
            delay += 150; // stagger 150ms
        });
        
        // Hide loading screen after all animations
        setTimeout(() => {
            loadingScreen.style.opacity = "0";
            setTimeout(() => {
                loadingScreen.style.display = "none";
            }, 800);
        }, delay + 800);
    }
    
    // ==========================================================================
    // 2. SCROLL PROGRESS BAR
    // ==========================================================================
    const scrollIndicator = document.getElementById("scroll-indicator");
    
    function updateScrollProgress() {
        if (!scrollIndicator) return;
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0) {
            const scrollPercent = (scrollTop / docHeight) * 100;
            scrollIndicator.style.height = scrollPercent + "%";
        }
    }
    
    window.addEventListener("scroll", updateScrollProgress);
    
    // ==========================================================================
    // 3. NAVBAR SCROLL EFFECT & SCROLL SPY
    // ==========================================================================
    const navbar = document.getElementById("navbar");
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    
    function handleNavbarScroll() {
        // Scrolled background
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
        
        // Scroll spy
        const scrollY = window.scrollY;
        
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute("id");
            
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === "#" + sectionId) {
                        link.classList.add("active");
                    }
                });
            }
        });
    }
    
    window.addEventListener("scroll", handleNavbarScroll);
    
    // ==========================================================================
    // 4. MOBILE NAVIGATION
    // ==========================================================================
    const navToggle = document.getElementById("navToggle");
    const navMenu = document.getElementById("navLinks");
    
    if (navToggle && navMenu) {
        navToggle.addEventListener("click", () => {
            navToggle.classList.toggle("active");
            navMenu.classList.toggle("active");
            
            // Toggle body overflow to prevent scrolling when menu is open
            if (navMenu.classList.contains("active")) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "";
            }
        });
        
        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener("click", () => {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            });
        });
        
        // Close menu on click outside
        document.addEventListener("click", (e) => {
            if (!navbar.contains(e.target) && navMenu.classList.contains("active")) {
                navToggle.classList.remove("active");
                navMenu.classList.remove("active");
                document.body.style.overflow = "";
            }
        });
    }
    
    // ==========================================================================
    // 5. SMOOTH SCROLL FOR IN-PAGE LINKS
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            const targetId = this.getAttribute("href");
            if (targetId === "#") return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offset = 80; // Navbar height offset
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
    
    // ==========================================================================
    // 6. SCROLL REVEAL ANIMATION
    // ==========================================================================
    const revealElements = document.querySelectorAll(".reveal");
    
    const revealOptions = {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    };
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Determine if element has siblings that are also reveal elements
                const parent = entry.target.parentElement;
                if (parent) {
                    const siblings = Array.from(parent.children).filter(child => child.classList.contains("reveal"));
                    if (siblings.length > 1) {
                        const index = siblings.indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 100}ms`;
                    }
                }
                
                entry.target.classList.add("active");
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, revealOptions);
    
    revealElements.forEach(el => revealObserver.observe(el));
    
    // ==========================================================================
    // 7. TYPING EFFECT
    // ==========================================================================
    const typingContainer = document.querySelector(".typing-text");
    
    if (typingContainer) {
        const words = ['Computer Systems Engineer', 'AI & ML Enthusiast', 'Java Developer', 'Software Builder'];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typingContainer.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingContainer.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 40 : 80;
            
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; // Pause at end of word
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before starting new word
            }
            
            setTimeout(typeEffect, typeSpeed);
        }
        
        // Start typing effect after a small delay
        setTimeout(typeEffect, 1000);
    }
    
    // ==========================================================================
    // 8. WEBGL LINE WAVES BACKGROUND (HERO)
    // ==========================================================================
    function initLineWaves(containerId, options = {}) {
        const container = document.getElementById(containerId);
        if (!container) return;
        
        const defaults = {
            speed: 0.3,
            innerLineCount: 32.0,
            outerLineCount: 40.0,
            warpIntensity: 1.0,
            rotation: -23,
            edgeFadeWidth: 0.0,
            colorCycleSpeed: 1.0,
            brightness: 0.2,
            color1: '#6C63FF',
            color2: '#00D4FF',
            color3: '#6C63FF',
            enableMouseInteraction: true,
            mouseInfluence: 2.0
        };
        const opts = {...defaults, ...options};
        
        function hexToVec3(hex) {
            const h = hex.replace('#', '');
            return [
                parseInt(h.slice(0, 2), 16) / 255,
                parseInt(h.slice(2, 4), 16) / 255,
                parseInt(h.slice(4, 6), 16) / 255
            ];
        }
        
        const canvas = document.createElement('canvas');
        canvas.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;display:block;';
        container.appendChild(canvas);
        
        const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false });
        if (!gl) return;
        
        const vertexShaderSrc = `
            attribute vec2 aPosition;
            void main() {
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
        
        const fragmentShaderSrc = `
            precision highp float;
            
            uniform float uTime;
            uniform vec2 uResolution;
            uniform float uSpeed;
            uniform float uInnerLines;
            uniform float uOuterLines;
            uniform float uWarpIntensity;
            uniform float uRotation;
            uniform float uEdgeFadeWidth;
            uniform float uColorCycleSpeed;
            uniform float uBrightness;
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            uniform vec3 uColor3;
            uniform vec2 uMouse;
            uniform float uMouseInfluence;
            uniform bool uEnableMouse;
            
            #define HALF_PI 1.5707963
            
            float hashF(float n) {
                return fract(sin(n * 127.1) * 43758.5453123);
            }
            
            float smoothNoise(float x) {
                float i = floor(x);
                float f = fract(x);
                float u = f * f * (3.0 - 2.0 * f);
                return mix(hashF(i), hashF(i + 1.0), u);
            }
            
            float displaceA(float coord, float t) {
                float result = sin(coord * 2.123) * 0.2;
                result += sin(coord * 3.234 + t * 4.345) * 0.1;
                result += sin(coord * 0.589 + t * 0.934) * 0.5;
                return result;
            }
            
            float displaceB(float coord, float t) {
                float result = sin(coord * 1.345) * 0.3;
                result += sin(coord * 2.734 + t * 3.345) * 0.2;
                result += sin(coord * 0.189 + t * 0.934) * 0.3;
                return result;
            }
            
            vec2 rotate2D(vec2 p, float angle) {
                float c = cos(angle);
                float s = sin(angle);
                return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
            }
            
            void main() {
                vec2 coords = gl_FragCoord.xy / uResolution;
                coords = coords * 2.0 - 1.0;
                coords.x *= uResolution.x / uResolution.y;
                coords = rotate2D(coords, uRotation);
                
                float halfT = uTime * uSpeed * 0.5;
                float fullT = uTime * uSpeed;
                
                float mouseWarp = 0.0;
                if (uEnableMouse) {
                    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
                    mPos.x *= uResolution.x / uResolution.y;
                    float mDist = length(coords - mPos);
                    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
                }
                
                float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
                float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
                float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
                float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;
                
                vec2 fieldA = vec2(warpAx, warpAy);
                vec2 fieldB = vec2(warpBx, warpBy);
                vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));
                
                float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
                float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
                float vMask = 1.0 - max(fadeTop, fadeBottom);
                
                float tileCount = mix(uOuterLines, uInnerLines, vMask);
                float scaledY = blended.y * tileCount;
                float nY = smoothNoise(abs(scaledY));
                
                float ridge = pow(
                    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
                    5.0
                );
                
                float lines = 0.0;
                for (float i = 1.0; i < 3.0; i += 1.0) {
                    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
                }
                
                float pattern = vMask * lines;
                
                float cycleT = fullT * uColorCycleSpeed;
                float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
                float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
                float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);
                
                vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
                float alpha = clamp(length(col), 0.0, 1.0);
                
                gl_FragColor = vec4(col, alpha);
            }
        `;
        
        function createShader(type, source) {
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Shader compile error:', gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }
        
        const vs = createShader(gl.VERTEX_SHADER, vertexShaderSrc);
        const fs = createShader(gl.FRAGMENT_SHADER, fragmentShaderSrc);
        if (!vs || !fs) return;
        
        const program = gl.createProgram();
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);
        
        const quadVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, quadVerts, gl.STATIC_DRAW);
        
        const aPosition = gl.getAttribLocation(program, 'aPosition');
        gl.enableVertexAttribArray(aPosition);
        gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);
        
        const uTimeLoc = gl.getUniformLocation(program, 'uTime');
        const uResLoc = gl.getUniformLocation(program, 'uResolution');
        const uSpeedLoc = gl.getUniformLocation(program, 'uSpeed');
        const uInnerLoc = gl.getUniformLocation(program, 'uInnerLines');
        const uOuterLoc = gl.getUniformLocation(program, 'uOuterLines');
        const uWarpLoc = gl.getUniformLocation(program, 'uWarpIntensity');
        const uRotLoc = gl.getUniformLocation(program, 'uRotation');
        const uFadeLoc = gl.getUniformLocation(program, 'uEdgeFadeWidth');
        const uCycleLoc = gl.getUniformLocation(program, 'uColorCycleSpeed');
        const uBrightLoc = gl.getUniformLocation(program, 'uBrightness');
        const uC1Loc = gl.getUniformLocation(program, 'uColor1');
        const uC2Loc = gl.getUniformLocation(program, 'uColor2');
        const uC3Loc = gl.getUniformLocation(program, 'uColor3');
        const uMouseLoc = gl.getUniformLocation(program, 'uMouse');
        const uMouseInfLoc = gl.getUniformLocation(program, 'uMouseInfluence');
        const uEnableMouseLoc = gl.getUniformLocation(program, 'uEnableMouse');
        
        const rotRad = (opts.rotation * Math.PI) / 180;
        gl.uniform1f(uSpeedLoc, opts.speed);
        gl.uniform1f(uInnerLoc, opts.innerLineCount);
        gl.uniform1f(uOuterLoc, opts.outerLineCount);
        gl.uniform1f(uWarpLoc, opts.warpIntensity);
        gl.uniform1f(uRotLoc, rotRad);
        gl.uniform1f(uFadeLoc, opts.edgeFadeWidth);
        gl.uniform1f(uCycleLoc, opts.colorCycleSpeed);
        gl.uniform1f(uBrightLoc, opts.brightness);
        gl.uniform3fv(uC1Loc, hexToVec3(opts.color1));
        gl.uniform3fv(uC2Loc, hexToVec3(opts.color2));
        gl.uniform3fv(uC3Loc, hexToVec3(opts.color3));
        gl.uniform1i(uEnableMouseLoc, opts.enableMouseInteraction ? 1 : 0);
        gl.uniform1f(uMouseInfLoc, opts.mouseInfluence);
        
        let mouseX = 0.5;
        let mouseY = 0.5;
        
        if (opts.enableMouseInteraction) {
            window.addEventListener('mousemove', (e) => {
                mouseX = e.clientX / window.innerWidth;
                mouseY = 1.0 - (e.clientY / window.innerHeight);
            });
        }
        
        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uResLoc, canvas.width, canvas.height);
        }
        
        window.addEventListener('resize', resize);
        resize();
        
        const startTime = performance.now();
        
        function render() {
            const t = (performance.now() - startTime) / 1000.0;
            gl.uniform1f(uTimeLoc, t);
            gl.uniform2f(uMouseLoc, mouseX, mouseY);
            
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
            requestAnimationFrame(render);
        }
        
        render();
    }
    
    // Initialize WebGL background
    initLineWaves('line-waves-container');
    
    // ==========================================================================
    // 9. GITHUB CONTRIBUTION GRID
    // ==========================================================================
    const contributionGrid = document.getElementById("contributionGrid");
    
    if (contributionGrid) {
        const totalCells = 52 * 7; // 364 days
        const fragment = document.createDocumentFragment();
        
        // Distribution of contribution levels (approximate)
        const levels = [
            { class: 'level-0', weight: 60 },
            { class: 'level-1', weight: 15 },
            { class: 'level-2', weight: 12 },
            { class: 'level-3', weight: 8 },
            { class: 'level-4', weight: 5 }
        ];
        
        // Create weighted array for random selection
        const weightedArray = [];
        levels.forEach(level => {
            for (let i = 0; i < level.weight; i++) {
                weightedArray.push(level.class);
            }
        });
        
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement("div");
            cell.classList.add("contribution-cell");
            
            // Assign random level based on weight
            const randomLevel = weightedArray[Math.floor(Math.random() * weightedArray.length)];
            if (randomLevel !== 'level-0') {
                cell.classList.add(randomLevel);
            }
            
            fragment.appendChild(cell);
        }
        
        contributionGrid.appendChild(fragment);
    }
    
    // ==========================================================================
    // 10. COUNTER ANIMATION
    // ==========================================================================
    const statValues = document.querySelectorAll(".stat-value[data-count]");
    
    // Easing function
    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const targetCount = parseInt(element.getAttribute("data-count"), 10);
                const suffix = element.getAttribute("data-suffix") || "";
                const duration = 2000;
                let startTime = null;
                
                function updateCounter(currentTime) {
                    if (!startTime) startTime = currentTime;
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const easedProgress = easeOutQuart(progress);
                    
                    const currentCount = Math.floor(easedProgress * targetCount);
                    element.textContent = currentCount + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateCounter);
                    } else {
                        element.textContent = targetCount + suffix;
                    }
                }
                
                requestAnimationFrame(updateCounter);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => counterObserver.observe(stat));
    
    // ==========================================================================
    // 11. CARD HOVER TILT
    // ==========================================================================
    const tiltCards = document.querySelectorAll(".project-card, .cert-card, .skill-category");
    
    tiltCards.forEach(card => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Max rotation 3.5 deg
            const rotateX = ((y - centerY) / centerY) * -3.5;
            const rotateY = ((x - centerX) / centerX) * 3.5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener("mouseleave", () => {
            card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
            // Add short transition for reset
            card.style.transition = "transform 0.5s ease";
            setTimeout(() => {
                card.style.transition = ""; // Remove transition to not interfere with mousemove
            }, 500);
        });
    });
    
    // ==========================================================================
    // 12. BACK TO TOP BUTTON
    // ==========================================================================
    const backToTopBtn = document.getElementById("backToTop");
    
    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 500) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });
        
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

});
