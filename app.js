document.addEventListener('DOMContentLoaded', () => {
    // 0. Theme Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    // Apply saved theme
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        }
    } else {
        document.documentElement.removeAttribute('data-theme');
        if (themeToggleBtn) {
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.documentElement.getAttribute('data-theme') === 'light';
            if (isLight) {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Hamburger animation
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    });

    // 2. Showcase Console Tabs Switcher
    const tabs = document.querySelectorAll('.console-tab');
    const panels = document.querySelectorAll('.workspace-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs & panels
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Add active to clicked tab
            tab.classList.add('active');
            
            // Add active to target panel
            const targetId = `panel-${tab.dataset.tab}`;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // 3. Multilingual Translation Simulator
    const termSelect = document.getElementById('term-select');
    const langSelect = document.getElementById('lang-select');
    const transSource = document.getElementById('trans-source');
    const transTarget = document.getElementById('trans-target');
    const transTag = document.getElementById('trans-tag');
    const linguisticNotes = document.getElementById('linguistic-notes');
    const playBtn = document.getElementById('play-pronunciation');
    const audioStatus = document.querySelector('.audio-status');

    const translations = {
        photosynthesis: {
            english: "Photosynthesis is the process by which green plants use sunlight to synthesize nutrients from carbon dioxide and water.",
            yoruba: {
                title: "Yoruba Translation",
                text: "Photosynthesis ni ìlànà tí àwọn koríko àti ewéko fi ń lo ìmọ́lẹ̀ oòrùn láti fi yí afẹ́fẹ́ carbon dioxide àti omi padà sí oúnjẹ.",
                note: "Linguistic Integration Node: Translated term utilizes 'Ìtúsílẹ̀ oúnjẹ láti ara ewé' ensuring local learners connect structural botany to native concepts without losing technical accuracy."
            },
            twi: {
                title: "Twi Translation",
                text: "Photosynthesis yɛ ɔkwan a afifide afoforo fa so de owia kanea, mframa a yɛfrɛ no carbon dioxide, ne nsu yɛ aduan.",
                note: "Linguistic Integration Node: Custom translation resolves contextual learning gaps using 'Owia-kanea aduanyɛ' to establish botanical mechanics within standard Twi dialects."
            },
            swahili: {
                title: "Swahili Translation",
                text: "Usanishaji-mwanga (photosynthesis) ni mchakato ambao mimea ya kijani hutumia mwanga wa jua kutengeneza virutubisho kutoka kwa kaboni dayoksidi na maji.",
                note: "Linguistic Integration Node: Swahili standard academic councils adopt 'Usanishaji-mwanga' as a compound concept merging 'sanisha' (synthesize) and 'mwanga' (light)."
            },
            hausa: {
                title: "Hausa Translation",
                text: "Photosynthesis shine tsarin da tsirrai kore ke amfani da hasken rana don kera abinci daga carbon dioxide da ruwa.",
                note: "Linguistic Integration Node: Formulated via local terms 'Hada Abinci ta Haske' (Making food via light) to aid primary comprehension in rural school districts."
            },
            igbo: {
                title: "Igbo Translation",
                text: "Photosynthesis bụ usoro ihe ọkụkụ ndụmọdụ na-eji ọkụ anyanwụ emepụta nri site na carbon dioxide na mmiri.",
                note: "Linguistic Integration Node: Incorporates Igbo expression 'Mmepụta nri site na anwụ' directly mapping botanical biology to intuitive ecosystem terms."
            }
        },
        gravity: {
            english: "Gravity is a fundamental force of attraction acting between all matter, proportional to their masses and inversely proportional to the square of their distance.",
            yoruba: {
                title: "Yoruba Translation",
                text: "Agbára òòfà (gravity) jẹ́ ipá àdánidá tí ó ń fa àwọn nǹkan tí ó ní ìwọ̀n wá sí ọ̀dọ̀ ara wọn, gẹ́gẹ́ bí ìwọ̀n wọn àti jíjìn wọn sí ara wọn.",
                note: "Linguistic Integration Node: Uses 'Agbára òòfà ewì' (the pulling force of physical entities) separating conceptual gravity from general magnetic draw."
            },
            twi: {
                title: "Twi Translation",
                text: "Twetwe-yɛ (gravity) yɛ ahoɔden a ɛtwe nneɛma nyinaa ba fam, a egyina nneɛma no mu duru ne mfaso a ɛda wɔn ntam so.",
                note: "Linguistic Integration Node: Core concept maps to 'Twetweyɛ'—combining 'twe' (pull) and 'yɛ' (act) to illustrate gravitational acceleration limits."
            },
            swahili: {
                title: "Swahili Translation",
                text: "Nguvu ya mvutano (gravity) ni kani ya asili inayovuta vitu vyenye masi kuelekeana, kulingana na uzito wao na umbali uliopo kati yao.",
                note: "Linguistic Integration Node: Renders standard mechanics using 'Nguvu ya mvutano' ensuring alignment with Tanzanian national STEM curriculum structures."
            },
            hausa: {
                title: "Hausa Translation",
                text: "Karfin duba (gravity) shine karfin dake jawo abubuwa zuwa kasa, wanda ya dogara da nauyin abun da nisan dake tsakaninsu.",
                note: "Linguistic Integration Node: Bridges learning barriers using 'Karfin duba kasa' to explain exact physical acceleration parameters without confusion."
            },
            igbo: {
                title: "Igbo Translation",
                text: "Mvuta-ume (gravity) bụ ike na-adọta ihe niile nwere nha na ibe ha, dabere na nha ha na otú ha siri dị anya na ibe ha.",
                note: "Linguistic Integration Node: Employs 'Mvuta-ume' as a physics-grade terminology preserving vectors and inverse square law connotations."
            }
        },
        mitochondria: {
            english: "The mitochondria is the power plant of the cell, converting chemical energy from food into adenosine triphosphate (ATP) via cellular respiration.",
            yoruba: {
                title: "Yoruba Translation",
                text: "Mitochondria jẹ́ ibùdó agbára fún alààyè tí ó kéré jùlọ (cell), tí ó ń yí agbára kẹ́míkà inú oúnjẹ padà sí agbára ATP fún ara lò.",
                note: "Linguistic Integration Node: Resolves structural translation using 'Ibùdó agbára alààyè' (cell power station) explaining metabolic function clearly."
            },
            twi: {
                title: "Twi Translation",
                text: "Mitochondria yɛ afifide anaa aboa mu nkwammoaa aduanyɛbea, a ɛsesa ahoɔden fi aduan mu kɔyɛ ahoɔden kronkron (ATP).",
                note: "Linguistic Integration Node: Formulates energy extraction cycles using 'Nkwammoaa ahoɔden-afase' to avoid abstract biochemical gaps."
            },
            swahili: {
                title: "Swahili Translation",
                text: "Mitokondria (mitochondria) ni kituo cha kuzalisha nishati kwenye seli, ikibadilisha nishati ya kemikali kutoka kwenye chakula kuwa ATP.",
                note: "Linguistic Integration Node: Standardized as 'Mitokondria' with structural label 'Kinu cha nishati cha seli' indicating cellular respiratory operations."
            },
            hausa: {
                title: "Hausa Translation",
                text: "Mitochondria shine gidan wutar lantarki na tantanin halitta, yana canza makamashin sinadarai daga abinci zuwa ATP.",
                note: "Linguistic Integration Node: Translates 'gidan wuta' (powerhouse) indicating cellular ATP conversion paths dynamically."
            },
            igbo: {
                title: "Igbo Translation",
                text: "Mitochondria bụ ụlọ ọrụ mmepụta ike nke sel, na-agbanwe ike kemịkal si na nri gaa na ike ATP.",
                note: "Linguistic Integration Node: Standardized representation incorporates 'Ụlọ ọrụ mmepụta ike sel' to prevent cognitive dissociation."
            }
        }
    };

    function updateTranslation() {
        const concept = termSelect.value;
        const lang = langSelect.value;
        
        const data = translations[concept];
        transSource.textContent = data.english;
        transTarget.textContent = data[lang].text;
        transTag.textContent = data[lang].title;
        linguisticNotes.innerHTML = `<strong>Linguistic Integration Node:</strong> ${data[lang].note}`;
    }

    if (termSelect && langSelect) {
        termSelect.addEventListener('change', updateTranslation);
        langSelect.addEventListener('change', updateTranslation);
    }

    if (playBtn) {
        playBtn.addEventListener('click', () => {
            audioStatus.style.display = 'inline';
            audioStatus.textContent = 'Modulating synthetic voice wave... 🔊';
            setTimeout(() => {
                audioStatus.textContent = 'Playing Yoruba phonetic simulation: "Phó-tó-sín-thé-sìs..."';
                setTimeout(() => {
                    audioStatus.style.display = 'none';
                }, 3000);
            }, 1000);
        });
    }

    // 4. SymPy Deterministic Solver
    const presets = document.querySelectorAll('.formula-preset');
    const sympyConsole = document.getElementById('sympy-console');

    const formulaDemos = {
        escape_velocity: [
            `<div class="line prompt">>>> import sympy as sp</div>`,
            `<div class="line prompt">>>> R, G, M, v = sp.symbols('R G M v')</div>`,
            `<div class="line prompt">>>> Eq = sp.Eq(0.5 * M * v**2 - G * M / R, 0)</div>`,
            `<div class="line prompt">>>> sp.solve(Eq, v)[1]</div>`,
            `<div class="line result text-gold">sqrt(2*G*M/R)</div>`,
            `<div class="line info">✓ Verification complete: Escape velocity math checked with SymPy server kernel.</div>`
        ],
        kinetic_energy: [
            `<div class="line prompt">>>> import sympy as sp</div>`,
            `<div class="line prompt">>>> m, v, F, s, a = sp.symbols('m v F s a')</div>`,
            `<div class="line prompt">>>> # Applying Work-Energy Theorem (W = F * s)</div>`,
            `<div class="line prompt">>>> F = m * a; s = v**2 / (2 * a)</div>`,
            `<div class="line prompt">>>> W = sp.simplify(F * s)</div>`,
            `<div class="line result text-gold">m * v**2 / 2</div>`,
            `<div class="line info">✓ Verification complete: Derivation proven correct. Error probability = 0%.</div>`
        ],
        quadratic: [
            `<div class="line prompt">>>> import sympy as sp</div>`,
            `<div class="line prompt">>>> a, b, c, x = sp.symbols('a b c x')</div>`,
            `<div class="line prompt">>>> Eq = sp.Eq(a*x**2 + b*x + c, 0)</div>`,
            `<div class="line prompt">>>> sp.solve(Eq, x)</div>`,
            `<div class="line result text-gold">[(-b - sqrt(b**2 - 4*a*c))/(2*a), (-b + sqrt(b**2 - 4*a*c))/(2*a)]</div>`,
            `<div class="line info">✓ Verification complete: Quadratic equation roots solved algebraically.</div>`
        ]
    };

    presets.forEach(btn => {
        btn.addEventListener('click', () => {
            presets.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            
            const lines = formulaDemos[btn.dataset.formula];
            sympyConsole.innerHTML = '<div class="line info">Computing equation verification with SymPy...</div>';
            
            let currentLine = 0;
            const interval = setInterval(() => {
                if (currentLine === 0) {
                    sympyConsole.innerHTML = '';
                }
                if (currentLine < lines.length) {
                    sympyConsole.innerHTML += lines[currentLine];
                    currentLine++;
                } else {
                    clearInterval(interval);
                }
            }, 250);
        });
    });

    // 5. Universal Scene Graph (Interactive Physics)
    const gravitySlider = document.getElementById('gravity-slider');
    const lengthSlider = document.getElementById('length-slider');
    const gravityVal = document.getElementById('gravity-val');
    const lengthVal = document.getElementById('length-val');
    const pendulumRod = document.getElementById('pendulum-rod');
    const pendulumBob = document.getElementById('pendulum-bob');
    const simMathText = document.getElementById('sim-math-text');

    let simAngle = 0;
    let simTime = 0;

    function updateSimulation() {
        const g = parseFloat(gravitySlider.value);
        const L = parseInt(lengthSlider.value);
        
        gravityVal.textContent = `${g.toFixed(1)} m/s²`;
        lengthVal.textContent = `${L}px`;

        // Calculate pendulum period T = 2 * pi * sqrt(L/g)
        // Scaled values for better UX visualization
        const scaleG = g * 10;
        const scaleL = L / 100;
        const period = 2 * Math.PI * Math.sqrt(scaleL / scaleG);
        simMathText.textContent = `T = 2π√(L/g) = ${period.toFixed(2)}s`;
    }

    if (gravitySlider && lengthSlider) {
        gravitySlider.addEventListener('input', updateSimulation);
        lengthSlider.addEventListener('input', updateSimulation);
    }

    // Pendulum Animation Loop
    function animatePendulum() {
        if (!gravitySlider || !lengthSlider) return;

        const g = parseFloat(gravitySlider.value);
        const L = parseInt(lengthSlider.value);
        
        const scaleG = g * 2.5; 
        const scaleL = L;
        
        simTime += 0.04;
        // Simple harmonic motion theta = theta_max * cos(omega * t)
        const omega = Math.sqrt(scaleG / scaleL);
        const thetaMax = 0.5; // ~30 degrees
        const currentAngle = thetaMax * Math.cos(omega * simTime);

        // Vector trigonometry for pendulum rod coordinates
        const xOffset = scaleL * Math.sin(currentAngle);
        const yOffset = scaleL * Math.cos(currentAngle);

        const pivotX = 200;
        const pivotY = 30;
        const bobX = pivotX + xOffset;
        const bobY = pivotY + yOffset;

        pendulumRod.setAttribute('x2', bobX);
        pendulumRod.setAttribute('y2', bobY);
        pendulumBob.setAttribute('cx', bobX);
        pendulumBob.setAttribute('cy', bobY);

        requestAnimationFrame(animatePendulum);
    }

    if (pendulumRod && pendulumBob) {
        animatePendulum();
    }

    // 6. Pipeline Flow Scroll Activation / Auto-Progress
    const steps = document.querySelectorAll('.pipeline-step');
    const progressBar = document.getElementById('pipeline-progress');

    if (steps.length > 0) {
        steps.forEach((step, idx) => {
            step.addEventListener('click', () => {
                steps.forEach(s => s.classList.remove('active'));
                
                // Activate clicked and preceding steps
                for (let i = 0; i <= idx; i++) {
                    steps[i].classList.add('active');
                }
                
                // Set progress width
                const percentage = (idx / (steps.length - 1)) * 100;
                progressBar.style.width = `${percentage}%`;
            });
        });
    }

    // 7. Modular Learning Workflows - Modals
    const workflowCards = document.querySelectorAll('.workflow-card');
    const modal = document.getElementById('workflow-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalWorkspace = document.getElementById('modal-workspace');

    const modalContentTemplates = {
        see: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-eye"></i> "See It" Simulation Preview</h3>
                <p class="modal-desc">Interactive cell structural diagrams. Click on cell parts to see localized anatomical translations.</p>
                <div class="interactive-cell-demo">
                    <svg viewBox="0 0 400 200" width="100%" height="200" style="background:#090E11; border-radius:12px; border: 1px solid var(--bg-card-border);">
                        <!-- Cell structure drawing -->
                        <path d="M 50 100 C 50 40, 350 40, 350 100 C 350 160, 50 160, 50 100" fill="rgba(80,124,124,0.15)" stroke="var(--teal)" stroke-width="2"/>
                        <circle cx="180" cy="100" r="30" fill="rgba(212,175,55,0.2)" stroke="var(--gold)" stroke-width="2" class="cell-nucleus" style="cursor:pointer;"/>
                        <path d="M 240 80 Q 260 110, 240 120" stroke="var(--cyan)" stroke-width="3" fill="none" class="cell-mitochondria" style="cursor:pointer;"/>
                        <text x="180" y="105" fill="#fff" font-size="10" font-family="Space Grotesk" text-anchor="middle">Nucleus</text>
                        <text x="260" y="90" fill="#fff" font-size="8" font-family="Space Grotesk">Mitochondria</text>
                    </svg>
                    <div class="cell-details" style="margin-top:16px; font-size:12px; color:var(--mint); text-align:center;">
                        💡 Click on the Nucleus (center circle) or Mitochondria to inspect native descriptions.
                    </div>
                </div>
            </div>
        `,
        say: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-microphone"></i> "Say It" Oral Examination Portal</h3>
                <p class="modal-desc">Verifying understanding by talking aloud in your own dialect. Try explaining "Gravity" aloud.</p>
                <div class="oral-demo-box" style="background:#090E11; border-radius:12px; border:1px solid var(--bg-card-border); padding:24px; text-align:center;">
                    <div class="mic-wave" style="display:flex; justify-content:center; gap:4px; margin-bottom:16px; height:30px;">
                        <span class="wave-bar" style="width:3px; background:var(--mint); height:10px; border-radius:3px;"></span>
                        <span class="wave-bar" style="width:3px; background:var(--mint); height:25px; border-radius:3px;"></span>
                        <span class="wave-bar" style="width:3px; background:var(--mint); height:15px; border-radius:3px;"></span>
                        <span class="wave-bar" style="width:3px; background:var(--mint); height:20px; border-radius:3px;"></span>
                    </div>
                    <button class="btn btn-primary" id="test-mic-btn">Start Speaking</button>
                    <div id="transcription-result" style="margin-top:16px; font-size:13px; color:#94A3B8;">
                        Click button to simulate speech-to-text response...
                    </div>
                </div>
            </div>
        `,
        retrieve: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-bullseye"></i> "Retrieve It" Adaptive Quiz</h3>
                <p class="modal-desc">Calibrated concept check. Questions shift based on prior response friction points.</p>
                <div class="quiz-demo-box" style="background:#090E11; border-radius:12px; border:1px solid var(--bg-card-border); padding:24px;">
                    <h5 style="margin-bottom:12px; font-size:14px;">Q1: Why does a heavier mass not fall faster in a vacuum than a lighter mass?</h5>
                    <div class="options-list" style="display:flex; flex-direction:column; gap:8px;">
                        <button class="btn btn-secondary quiz-opt" style="text-align:left; font-size:12px; justify-content:flex-start;">A. Air resistance acts more on heavy objects.</button>
                        <button class="btn btn-secondary quiz-opt" style="text-align:left; font-size:12px; justify-content:flex-start;" data-correct="true">B. Ratio of gravitational force to inertial mass is constant.</button>
                        <button class="btn btn-secondary quiz-opt" style="text-align:left; font-size:12px; justify-content:flex-start;">C. Gravity does not pull on mass.</button>
                    </div>
                    <div id="quiz-feedback" style="margin-top:12px; font-size:12px; display:none;"></div>
                </div>
            </div>
        `,
        remember: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-layer-group"></i> "Remember It" Flashcards</h3>
                <p class="modal-desc">Move beyond terminology matching. Apply physical formulas to native contexts.</p>
                <div class="flashcard-demo" style="perspective:1000px; display:flex; justify-content:center; margin-top:20px;">
                    <div class="f-card" id="f-card-element" style="width:300px; height:180px; transform-style:preserve-3d; transition:transform 0.6s; position:relative; cursor:pointer;">
                        <div class="f-card-side f-front" style="position:absolute; inset:0; background:rgba(80,124,124,0.15); border:1px solid var(--teal); border-radius:12px; display:flex; align-items:center; justify-content:center; padding:20px; text-align:center; backface-visibility:hidden;">
                            <strong>Front: Explain what happens to Escape Velocity if planet mass double?</strong>
                        </div>
                        <div class="f-card-side f-back" style="position:absolute; inset:0; background:rgba(212,175,55,0.15); border:1px solid var(--gold); border-radius:12px; display:flex; align-items:center; justify-content:center; padding:20px; text-align:center; transform:rotateY(180deg); backface-visibility:hidden;">
                            <strong>Back: Increases by factor of √2 (~1.41) since Escape Velocity = √(2GM/R).</strong>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; font-size:11px; margin-top:12px; color:#64748B;">💡 Click card to flip</div>
            </div>
        `,
        ask: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-comments"></i> "Ask It" Socratic Tutor</h3>
                <p class="modal-desc">Ask your study assistant questions grounded strictly in the syllabus.</p>
                <div class="chat-demo-box" style="background:#090E11; border-radius:12px; border:1px solid var(--bg-card-border); padding:16px; display:flex; flex-direction:column; gap:12px; height:240px; justify-content:space-between;">
                    <div class="chat-history" style="overflow-y:auto; font-size:12px; display:flex; flex-direction:column; gap:8px;">
                        <div class="chat-msg user" style="align-self:flex-end; background:var(--teal); color:#fff; padding:6px 12px; border-radius:12px 12px 0 12px; max-width:80%;">What is inertia?</div>
                        <div class="chat-msg bot" style="align-self:flex-start; background:rgba(255,255,255,0.05); padding:6px 12px; border-radius:12px 12px 12px 0; border:1px solid rgba(80,124,124,0.2); max-width:80%;">Let's think together. If a heavy box is at rest on the floor, what does it take to move it compared to a light box?</div>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <input type="text" placeholder="Type a response..." style="flex-grow:1; background:var(--bg-dark); border:1px solid var(--bg-card-border); border-radius:6px; color:#fff; padding:6px 12px; font-size:12px; outline:none;">
                        <button class="btn btn-primary" style="padding:6px 14px; font-size:11px;">Send</button>
                    </div>
                </div>
            </div>
        `,
        find: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-magnifying-glass"></i> "Find It" Semantic Search</h3>
                <p class="modal-desc">Search documents by mathematical or physical conceptual meaning, not just keywords.</p>
                <div class="search-demo-box" style="background:#090E11; border-radius:12px; border:1px solid var(--bg-card-border); padding:20px;">
                    <div style="display:flex; gap:8px; margin-bottom:12px;">
                        <input type="text" value="forces on moving objects in fluid" style="flex-grow:1; background:var(--bg-dark); border:1px solid var(--bg-card-border); border-radius:6px; color:#fff; padding:8px 12px; font-size:12px; outline:none;">
                        <button class="btn btn-primary" id="demo-search-btn" style="padding:8px 16px; font-size:12px;">Search</button>
                    </div>
                    <div id="search-results" style="font-size:12px; display:flex; flex-direction:column; gap:8px;">
                        <div style="padding:8px; background:rgba(80,124,124,0.1); border-radius:6px; border-left:2px solid var(--cyan);">
                            <strong>Document: Physics Chap 4 (Viscous Drag)</strong><br>
                            <span style="color:#94A3B8;">...relevance score: 98% (Matches: Fluid Friction, Drag Forces, Stokes' Law).</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    workflowCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.workflow;
            modalWorkspace.innerHTML = modalContentTemplates[type];
            modal.classList.add('active');

            // Wire up internal interactive elements inside the modal after injection
            setupModalInteractions(type);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', () => {
            modal.classList.remove('active');
        });
    }

    // Close modal if clicked outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    function setupModalInteractions(type) {
        if (type === 'see') {
            const nucleus = document.querySelector('.cell-nucleus');
            const mito = document.querySelector('.cell-mitochondria');
            const details = document.querySelector('.cell-details');
            
            if (nucleus) {
                nucleus.addEventListener('click', () => {
                    details.innerHTML = `<strong>Nucleus (Ìbùdó àlàyé cell):</strong> Contains cellular DNA and genetic code coordinates.`;
                });
            }
            if (mito) {
                mito.addEventListener('click', () => {
                    details.innerHTML = `<strong>Mitochondria (Mitokondria / Kinu Nishati):</strong> Cellular respiration powerhouse generating ATP vectors.`;
                });
            }
        }
        
        if (type === 'say') {
            const micBtn = document.getElementById('test-mic-btn');
            const transcription = document.getElementById('transcription-result');
            let isRecording = false;

            if (micBtn) {
                micBtn.addEventListener('click', () => {
                    if (!isRecording) {
                        isRecording = true;
                        micBtn.textContent = 'Listening... 🔴';
                        transcription.textContent = 'Awaiting vocal input signal...';
                        
                        // Pulse wave bars
                        const bars = document.querySelectorAll('.wave-bar');
                        bars.forEach((bar, i) => {
                            bar.style.animation = `floatMascot ${0.4 + i * 0.1}s ease-in-out infinite`;
                        });
                        
                        setTimeout(() => {
                            transcription.innerHTML = `🗣️ <strong>Transcribed Twi:</strong> "Twetwe-yɛ no kyerɛ ahoɔden a ɛma nneɛma duba kasa." <br><span style="color:var(--mint);">✓ Hunuko Speech Analysis: Understanding confirmed! (Matches inverse-square laws and pulling parameters).</span>`;
                            micBtn.textContent = 'Start Speaking';
                            bars.forEach(bar => bar.style.animation = 'none');
                            isRecording = false;
                        }, 2500);
                    }
                });
            }
        }

        if (type === 'retrieve') {
            const options = document.querySelectorAll('.quiz-opt');
            const feedback = document.getElementById('quiz-feedback');
            
            options.forEach(opt => {
                opt.addEventListener('click', () => {
                    options.forEach(o => o.style.borderColor = 'rgba(255,255,255,0.08)');
                    if (opt.dataset.correct === 'true') {
                        opt.style.borderColor = 'var(--mint)';
                        feedback.style.display = 'block';
                        feedback.style.color = 'var(--mint)';
                        feedback.innerHTML = `✓ Correct! Galileo's experiment demonstrated that constant acceleration is independent of body mass due to exact compensation of inertial resistance.`;
                    } else {
                        opt.style.borderColor = 'rgba(239, 68, 68, 0.5)';
                        feedback.style.display = 'block';
                        feedback.style.color = '#EF4444';
                        feedback.innerHTML = `✗ Incorrect. Try again! Think about how the force pulling a heavy mass is larger, but its inertia resisting acceleration is also proportionally larger.`;
                    }
                });
            });
        }

        if (type === 'remember') {
            const cardEl = document.getElementById('f-card-element');
            if (cardEl) {
                cardEl.addEventListener('click', () => {
                    const isFlipped = cardEl.style.transform === 'rotateY(180deg)';
                    cardEl.style.transform = isFlipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
                });
            }
        }

        if (type === 'find') {
            const btn = document.getElementById('demo-search-btn');
            const results = document.getElementById('search-results');
            if (btn) {
                btn.addEventListener('click', () => {
                    results.innerHTML = `<div style="padding:8px; background:rgba(80,124,124,0.1); border-radius:6px; border-left:2px solid var(--cyan);">
                        <strong>Document: Physics Chap 4 (Viscous Drag)</strong><br>
                        <span style="color:#94A3B8;">...relevance score: 98% (Stokes' Equation & Terminal velocity mechanics matched).</span>
                    </div>
                    <div style="padding:8px; background:rgba(212,175,55,0.08); border-radius:6px; border-left:2px solid var(--gold);">
                        <strong>Lecture Notes: Aerodynamics Introduction</strong><br>
                        <span style="color:#94A3B8;">...relevance score: 86% (Matches boundary layer viscosity and turbulent flows).</span>
                    </div>`;
                });
            }
        }
    }

    // 8. Footer Terminal Widget Easter Egg
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');
    
    if (termInput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                termInput.value = '';
                
                let response = '';
                switch(cmd) {
                    case 'help':
                        response = 'Available protocols: [status] [mascot] [hunuko] [verify] [clear]';
                        break;
                    case 'status':
                        response = 'ANIMATRIX System V2.0: ACTIVE | Quantum local inference nodes sync OK.';
                        break;
                    case 'mascot':
                        response = 'Mascot Status: Levitation systems at 100%. Holographic simulator outputting F=ma.';
                        break;
                    case 'hunuko':
                        response = 'Hunuko Core online. Multi-lingual pipeline ready. SymPy verification engines operational.';
                        break;
                    case 'verify':
                        response = 'Running check: SymPy returns exact algebra values. Verification: 100% correct.';
                        break;
                    case 'clear':
                        termOutput.innerHTML = '';
                        return;
                    default:
                        response = `Protocol "${cmd}" unrecognized. Type "help" for a list of nodes.`;
                }
                
                termOutput.innerHTML = `<div>&gt; ${cmd}</div><div style="color:var(--mint); margin-bottom:8px;">${response}</div>`;
                termOutput.scrollTop = termOutput.scrollHeight;
            }
        });
    }
});
