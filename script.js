document.addEventListener('DOMContentLoaded', () => {
    // ========================================================
    // 0. Theme Toggle
    // ========================================================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('animatrix-theme') || 'dark';

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
                localStorage.setItem('animatrix-theme', 'dark');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('animatrix-theme', 'light');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
            }
        });
    }

    // ========================================================
    // 1. Navigation, Mobile Menu & Accessible Product Dropdown
    // ========================================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');
    const productDropdown = document.getElementById('nav-product-dropdown');
    const productDropdownBtn = document.getElementById('product-dropdown-btn');
    const productDropdownMenu = document.getElementById('product-dropdown-menu');

    function closeMobileMenu() {
        if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            if (mobileToggle) {
                mobileToggle.classList.remove('active');
                mobileToggle.setAttribute('aria-expanded', 'false');
                const spans = mobileToggle.querySelectorAll('span');
                if (spans.length === 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        }
        closeDropdown();
    }

    function toggleDropdown(forceState) {
        if (!productDropdown || !productDropdownBtn) return;
        const isOpen = typeof forceState === 'boolean' 
            ? forceState 
            : !productDropdown.classList.contains('is-open');

        if (isOpen) {
            productDropdown.classList.add('is-open');
            productDropdownBtn.setAttribute('aria-expanded', 'true');
        } else {
            productDropdown.classList.remove('is-open');
            productDropdownBtn.setAttribute('aria-expanded', 'false');
        }
    }

    function closeDropdown() {
        toggleDropdown(false);
    }

    // Dropdown Button Click (Toggles dropdown on click/touch/keyboard)
    if (productDropdownBtn) {
        productDropdownBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleDropdown();
        });

        // Dropdown keyboard navigation: Escape closes dropdown
        productDropdownBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
                productDropdownBtn.focus();
            }
        });
    }

    if (productDropdownMenu) {
        productDropdownMenu.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                closeDropdown();
                if (productDropdownBtn) productDropdownBtn.focus();
            }
        });
    }

    // Close dropdown on click outside
    document.addEventListener('click', (e) => {
        if (productDropdown && !productDropdown.contains(e.target)) {
            closeDropdown();
        }
    });

    // Mobile Hamburger Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            const isActive = navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            mobileToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');

            const spans = mobileToggle.querySelectorAll('span');
            if (spans.length === 3) {
                if (isActive) {
                    spans[0].style.transform = 'rotate(45deg) translateY(8px)';
                    spans[1].style.opacity = '0';
                    spans[2].style.transform = 'rotate(-45deg) translateY(-8px)';
                } else {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }

    // ========================================================
    // 2. Smooth Scrolling with Navbar Offset
    // ========================================================
    const navAnchors = document.querySelectorAll('a[href^="#"]');
    navAnchors.forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const href = anchor.getAttribute('href');
            if (href === '#' || !href.startsWith('#')) return;

            const targetElement = document.querySelector(href);
            if (targetElement) {
                e.preventDefault();
                closeMobileMenu();

                const nav = document.querySelector('.navbar');
                const navHeight = nav ? nav.offsetHeight : 76;
                const elementTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementTop - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Update active link state visually
                document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
                if (anchor.classList.contains('nav-link')) {
                    anchor.classList.add('active');
                }
            }
        });
    });

    // ========================================================
    // 3. Showcase Console Tabs Switcher
    // ========================================================
    const tabs = document.querySelectorAll('.console-tab');
    const panels = document.querySelectorAll('.workspace-panel');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const targetId = `panel-${tab.dataset.tab}`;
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    // ========================================================
    // 4. Multilingual Translation Simulator
    // ========================================================
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
                text: "Ike ndọda (gravity) bụ ike okike na-adọta ihe niile nwere oke n'ebe ibe ha nọ, dabere na oke ha na anya dị n'etiti ha.",
                note: "Linguistic Integration Node: Leverages 'Ike ndọda' (the inherent pull downward) helping students ground cosmological mechanics in everyday observation."
            }
        },
        mitochondria: {
            english: "The mitochondrion is a membrane-bound cell organelle that generates most of the chemical energy needed to power the cell's biochemical reactions, stored in adenosine triphosphate (ATP).",
            yoruba: {
                title: "Yoruba Translation",
                text: "Mitochondria jẹ́ ẹ̀yà ara inú cell tí ó ń pèsè ọ̀pọ̀lọpọ̀ agbára kẹ́míkà (ATP) tí cell nílò láti ṣe àwọn iṣẹ́ ẹ̀dá ara.",
                note: "Linguistic Integration Node: Expressed through 'Ilé-iṣẹ́ agbára cell' (cellular powerhouse factory) establishing cellular bioenergetics with crystalline clarity."
            },
            twi: {
                title: "Twi Translation",
                text: "Mitochondria yɛ baabi a cell no nya n'ahoɔden nyinaa wɔ mu, fa kwan a ɛyɛ aduannuru a yɛfrɛ no ATP so na ama cell no atumi ayɛ n'adwuma yiye.",
                note: "Linguistic Integration Node: Termed 'Ahoɔden fibea' (source of vital force) to disambiguate biochemical cellular respiration from pulmonary breathing."
            },
            swahili: {
                title: "Swahili Translation",
                text: "Mitokondria ni ogani ya seli inayozalisha sehemu kubwa ya nishati ya kikemia (ATP) inayohitajika kuendesha shughuli zote za seli.",
                note: "Linguistic Integration Node: 'Kinu cha nishati ya seli' provides an immediate mental model for metabolic synthesis in secondary school biology."
            },
            hausa: {
                title: "Hausa Translation",
                text: "Mitochondria wani bangare ne a cikin sel da ke samar da mafi yawan kuzarin sinadarai (ATP) da sel ke bukata don gudanar da ayyukanta.",
                note: "Linguistic Integration Node: Uses 'Dakin samar da kuzari' (energy generation room) to anchor molecular cellular dynamics."
            },
            igbo: {
                title: "Igbo Translation",
                text: "Mitokondria bụ akụkụ dị n'ime sel nke na-emepụta ọtụtụ ike kemịkalụ (ATP) dị mkpa iji mee ka mmeghachi omume biochemical nke sel gaa n'ihu.",
                note: "Linguistic Integration Node: 'Ụlọ ike nke sel' maps organelle functions to intuitive metabolic power conversion."
            }
        }
    };

    function updateTranslation() {
        if (!termSelect || !langSelect || !transSource || !transTarget || !transTag || !linguisticNotes) return;
        const currentTerm = termSelect.value;
        const currentLang = langSelect.value;
        const data = translations[currentTerm];

        transSource.textContent = data.english;
        const targetData = data[currentLang];
        transTag.textContent = targetData.title;
        transTarget.textContent = targetData.text;
        linguisticNotes.innerHTML = `<strong>Linguistic Integration Node:</strong> ${targetData.note.replace('Linguistic Integration Node: ', '')}`;
    }

    if (termSelect && langSelect) {
        termSelect.addEventListener('change', updateTranslation);
        langSelect.addEventListener('change', updateTranslation);
    }

    if (playBtn && audioStatus) {
        playBtn.addEventListener('click', () => {
            const currentLang = langSelect ? langSelect.options[langSelect.selectedIndex].text : 'Native';
            audioStatus.style.display = 'inline';
            audioStatus.textContent = 'Modulating synthetic vocal waveform... 🔊';
            setTimeout(() => {
                audioStatus.textContent = `Playing ${currentLang} phonetic simulation...`;
                setTimeout(() => {
                    audioStatus.style.display = 'none';
                }, 3000);
            }, 1000);
        });
    }

    // ========================================================
    // 5. SymPy Deterministic Solver
    // ========================================================
    const presets = document.querySelectorAll('.formula-preset');
    const sympyConsole = document.getElementById('sympy-console');

    const formulaDemos = {
        escape_velocity: [
            `<div class="line prompt">&gt;&gt;&gt; import sympy as sp</div>`,
            `<div class="line prompt">&gt;&gt;&gt; R, G, M, v = sp.symbols('R G M v')</div>`,
            `<div class="line prompt">&gt;&gt;&gt; Eq = sp.Eq(0.5 * M * v**2 - G * M / R, 0)</div>`,
            `<div class="line prompt">&gt;&gt;&gt; sp.solve(Eq, v)[1]</div>`,
            `<div class="line result text-gold">sqrt(2*G*M/R)</div>`,
            `<div class="line info">✓ Verification complete: Escape velocity algebra mathematically sound. Error probability = 0.00%.</div>`
        ],
        kinetic_energy: [
            `<div class="line prompt">&gt;&gt;&gt; import sympy as sp</div>`,
            `<div class="line prompt">&gt;&gt;&gt; m, v, F, s, a = sp.symbols('m v F s a')</div>`,
            `<div class="line prompt">&gt;&gt;&gt; # Applying Work-Energy Theorem (W = F * s)</div>`,
            `<div class="line prompt">&gt;&gt;&gt; F = m * a; s = v**2 / (2 * a)</div>`,
            `<div class="line prompt">&gt;&gt;&gt; W = sp.simplify(F * s)</div>`,
            `<div class="line result text-gold">m * v**2 / 2</div>`,
            `<div class="line info">✓ Verification complete: Derivation algebraically proven. Zero neural hallucination risk.</div>`
        ],
        quadratic: [
            `<div class="line prompt">&gt;&gt;&gt; import sympy as sp</div>`,
            `<div class="line prompt">&gt;&gt;&gt; a, b, c, x = sp.symbols('a b c x')</div>`,
            `<div class="line prompt">&gt;&gt;&gt; Eq = sp.Eq(a*x**2 + b*x + c, 0)</div>`,
            `<div class="line prompt">&gt;&gt;&gt; sp.solve(Eq, x)</div>`,
            `<div class="line result text-gold">[(-b - sqrt(b**2 - 4*a*c))/(2*a), (-b + sqrt(b**2 - 4*a*c))/(2*a)]</div>`,
            `<div class="line info">✓ Verification complete: Quadratic roots derived strictly via deterministic algebra kernel.</div>`
        ]
    };

    presets.forEach(btn => {
        btn.addEventListener('click', () => {
            presets.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');

            const formulaKey = btn.dataset.formula;
            const lines = formulaDemos[formulaKey];
            if (!sympyConsole || !lines) return;

            sympyConsole.innerHTML = '<div class="line info">Executing deterministic SymPy kernel...</div>';

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

    // ========================================================
    // 6. Universal Scene Graph (Interactive Pendulum Physics)
    // ========================================================
    const gravitySlider = document.getElementById('gravity-slider');
    const lengthSlider = document.getElementById('length-slider');
    const gravityVal = document.getElementById('gravity-val');
    const lengthVal = document.getElementById('length-val');
    const pendulumRod = document.getElementById('pendulum-rod');
    const pendulumBob = document.getElementById('pendulum-bob');
    const simMathText = document.getElementById('sim-math-text');

    let simTime = 0;

    function updateSimulation() {
        if (!gravitySlider || !lengthSlider || !gravityVal || !lengthVal || !simMathText) return;
        const g = parseFloat(gravitySlider.value);
        const L = parseInt(lengthSlider.value, 10);

        gravityVal.textContent = `${g.toFixed(1)} m/s²`;
        lengthVal.textContent = `${L}px`;

        const scaleG = g * 10;
        const scaleL = L / 100;
        const period = 2 * Math.PI * Math.sqrt(scaleL / scaleG);
        simMathText.textContent = `T = 2π√(L/g) = ${period.toFixed(2)}s`;
    }

    if (gravitySlider && lengthSlider) {
        gravitySlider.addEventListener('input', updateSimulation);
        lengthSlider.addEventListener('input', updateSimulation);
    }

    function animatePendulum() {
        if (!gravitySlider || !lengthSlider || !pendulumRod || !pendulumBob) return;

        const g = parseFloat(gravitySlider.value);
        const L = parseInt(lengthSlider.value, 10);

        const scaleG = g * 2.5;
        const scaleL = L;

        simTime += 0.04;
        const omega = Math.sqrt(scaleG / scaleL);
        const thetaMax = 0.45; // ~26 degrees
        const currentAngle = thetaMax * Math.cos(omega * simTime);

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

    // ========================================================
    // 7. Pipeline Flow Step Selection
    // ========================================================
    const steps = document.querySelectorAll('.pipeline-step');
    const progressBar = document.getElementById('pipeline-progress');

    if (steps.length > 0 && progressBar) {
        steps.forEach((step, idx) => {
            step.addEventListener('click', () => {
                steps.forEach(s => s.classList.remove('active'));
                for (let i = 0; i <= idx; i++) {
                    steps[i].classList.add('active');
                }
                const percentage = (idx / (steps.length - 1)) * 100;
                progressBar.style.width = `${percentage}%`;
            });
        });
    }

    // ========================================================
    // 8. Modular Learning Workflows - Modals
    // ========================================================
    const workflowCards = document.querySelectorAll('.workflow-card');
    const modal = document.getElementById('workflow-modal');
    const modalClose = document.getElementById('modal-close-btn');
    const modalWorkspace = document.getElementById('modal-workspace');

    const modalContentTemplates = {
        see: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-eye"></i> "See It" Simulation Preview</h3>
                <p class="modal-desc" style="color:var(--text-secondary); margin: 8px 0 16px;">Interactive cell structural diagram. Click on organelles to see localized anatomical explanations.</p>
                <div class="interactive-cell-demo">
                    <svg viewBox="0 0 400 200" width="100%" height="200" style="background:#050807; border-radius:12px; border: 1px solid rgba(16, 185, 129, 0.25);">
                        <path d="M 50 100 C 50 40, 350 40, 350 100 C 350 160, 50 160, 50 100" fill="rgba(16, 185, 129, 0.12)" stroke="var(--teal)" stroke-width="2"/>
                        <circle cx="180" cy="100" r="32" fill="rgba(245, 158, 11, 0.2)" stroke="var(--gold)" stroke-width="2" class="cell-nucleus" style="cursor:pointer;"/>
                        <path d="M 250 80 Q 270 110, 250 120" stroke="var(--cyan)" stroke-width="4" fill="none" class="cell-mitochondria" style="cursor:pointer;"/>
                        <text x="180" y="105" fill="#F4F6F4" font-size="11" font-family="Space Grotesk" text-anchor="middle" font-weight="700">Nucleus</text>
                        <text x="270" y="90" fill="#38BDF8" font-size="10" font-family="Space Grotesk" font-weight="700">Mitochondria</text>
                    </svg>
                    <div class="cell-details" style="margin-top:16px; font-size:13px; color:var(--mint); text-align:center; min-height:40px;">
                        💡 Click on the <strong>Nucleus</strong> (center circle) or <strong>Mitochondria</strong> to inspect native descriptions.
                    </div>
                </div>
            </div>
        `,
        say: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-microphone"></i> "Say It" Oral Examination Portal</h3>
                <p class="modal-desc" style="color:var(--text-secondary); margin: 8px 0 16px;">Verifying conceptual understanding by defending physics aloud in your native dialect.</p>
                <div class="oral-demo-box" style="background:#050807; border-radius:14px; border:1px solid rgba(16, 185, 129, 0.25); padding:24px; text-align:center;">
                    <div class="mic-wave" style="display:flex; justify-content:center; gap:6px; margin-bottom:16px; height:32px; align-items:center;">
                        <span class="wave-bar" style="width:4px; background:var(--mint); height:12px; border-radius:3px;"></span>
                        <span class="wave-bar" style="width:4px; background:var(--mint); height:28px; border-radius:3px;"></span>
                        <span class="wave-bar" style="width:4px; background:var(--mint); height:16px; border-radius:3px;"></span>
                        <span class="wave-bar" style="width:4px; background:var(--mint); height:24px; border-radius:3px;"></span>
                    </div>
                    <button class="btn btn-primary" id="test-mic-btn">Start Speaking</button>
                    <div id="transcription-result" style="margin-top:16px; font-size:14px; color:var(--text-secondary); line-height:1.6;">
                        Click button to simulate speech-to-text oral examination...
                    </div>
                </div>
            </div>
        `,
        retrieve: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-bullseye"></i> "Retrieve It" Adaptive Quiz</h3>
                <p class="modal-desc" style="color:var(--text-secondary); margin: 8px 0 16px;">Calibrated concept check. Questions dynamically adapt to target your conceptual misconceptions.</p>
                <div class="quiz-demo-box" style="background:#050807; border-radius:14px; border:1px solid rgba(16, 185, 129, 0.25); padding:24px;">
                    <h5 style="margin-bottom:14px; font-size:15px; color:#F4F6F4;">Q1: Why does a heavier mass not fall faster in a vacuum than a lighter mass?</h5>
                    <div class="options-list" style="display:flex; flex-direction:column; gap:10px;">
                        <button class="btn btn-secondary quiz-opt" style="text-align:left; font-size:13px; justify-content:flex-start;">A. Air resistance acts equally on all objects.</button>
                        <button class="btn btn-secondary quiz-opt" style="text-align:left; font-size:13px; justify-content:flex-start;" data-correct="true">B. Ratio of gravitational force to inertial mass is constant (F/m = g).</button>
                        <button class="btn btn-secondary quiz-opt" style="text-align:left; font-size:13px; justify-content:flex-start;">C. Gravity does not accelerate mass in a vacuum.</button>
                    </div>
                    <div id="quiz-feedback" style="margin-top:14px; font-size:13px; line-height:1.5; display:none;"></div>
                </div>
            </div>
        `,
        remember: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-layer-group"></i> "Remember It" Flashcards</h3>
                <p class="modal-desc" style="color:var(--text-secondary); margin: 8px 0 16px;">Move beyond surface rote memorization. Test deep formula mechanics in realistic problem settings.</p>
                <div class="flashcard-demo" style="perspective:1000px; display:flex; justify-content:center; margin-top:20px;">
                    <div class="f-card" id="f-card-element" style="width:340px; height:190px; transform-style:preserve-3d; transition:transform 0.6s; position:relative; cursor:pointer;">
                        <div class="f-card-side f-front" style="position:absolute; inset:0; background:rgba(18, 26, 22, 0.95); border:1px solid var(--mint); border-radius:14px; display:flex; align-items:center; justify-content:center; padding:24px; text-align:center; backface-visibility:hidden;">
                            <strong style="color:#F4F6F4; font-size:15px;">Front: What happens to Escape Velocity (v_esc) if a planet's mass doubles while radius stays constant?</strong>
                        </div>
                        <div class="f-card-side f-back" style="position:absolute; inset:0; background:rgba(18, 26, 22, 0.95); border:1px solid var(--gold); border-radius:14px; display:flex; align-items:center; justify-content:center; padding:24px; text-align:center; transform:rotateY(180deg); backface-visibility:hidden;">
                            <strong style="color:var(--gold); font-size:15px;">Back: Increases by √2 (~1.414×) since v_esc = √(2GM/R).</strong>
                        </div>
                    </div>
                </div>
                <div style="text-align:center; font-size:12px; margin-top:14px; color:var(--text-muted);">💡 Click the card to flip</div>
            </div>
        `,
        ask: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-comments"></i> "Ask It" Socratic Tutor</h3>
                <p class="modal-desc" style="color:var(--text-secondary); margin: 8px 0 16px;">Interact with an AI tutor grounded strictly in verified curriculum parameters.</p>
                <div class="chat-demo-box" style="background:#050807; border-radius:14px; border:1px solid rgba(16, 185, 129, 0.25); padding:20px; display:flex; flex-direction:column; gap:12px; height:250px; justify-content:space-between;">
                    <div class="chat-history" style="overflow-y:auto; font-size:13px; display:flex; flex-direction:column; gap:10px;">
                        <div class="chat-msg user" style="align-self:flex-end; background:var(--gold); color:#050B08; font-weight:600; padding:8px 14px; border-radius:14px 14px 2px 14px; max-width:85%;">What is inertia and why does mass determine it?</div>
                        <div class="chat-msg bot" style="align-self:flex-start; background:rgba(18, 26, 22, 0.9); color:#CBD5E1; padding:8px 14px; border-radius:14px 14px 14px 2px; border:1px solid rgba(16, 185, 129, 0.25); max-width:85%;">Let's think together. If a massive boulder is resting on the ground, why does it resist changes to its state of motion more than a pebble?</div>
                    </div>
                    <div style="display:flex; gap:8px;">
                        <input type="text" placeholder="Type an answer..." style="flex-grow:1; background:rgba(18, 26, 22, 0.85); border:1px solid rgba(16, 185, 129, 0.25); border-radius:8px; color:#F4F6F4; padding:8px 14px; font-size:13px; outline:none;">
                        <button class="btn btn-primary" style="padding:8px 16px; font-size:12px;">Send</button>
                    </div>
                </div>
            </div>
        `,
        find: `
            <div class="modal-showcase">
                <h3 class="gradient-text"><i class="fa-solid fa-magnifying-glass"></i> "Find It" Semantic Search</h3>
                <p class="modal-desc" style="color:var(--text-secondary); margin: 8px 0 16px;">Search lecture documents and textbooks by conceptual meaning rather than verbatim keyword matches.</p>
                <div class="search-demo-box" style="background:#050807; border-radius:14px; border:1px solid rgba(16, 185, 129, 0.25); padding:20px;">
                    <div style="display:flex; gap:8px; margin-bottom:14px;">
                        <input type="text" value="forces on moving objects in fluid" style="flex-grow:1; background:rgba(18, 26, 22, 0.85); border:1px solid rgba(16, 185, 129, 0.25); border-radius:8px; color:#F4F6F4; padding:8px 14px; font-size:13px; outline:none;">
                        <button class="btn btn-primary" id="demo-search-btn" style="padding:8px 16px; font-size:13px;">Search</button>
                    </div>
                    <div id="search-results" style="font-size:13px; display:flex; flex-direction:column; gap:10px;">
                        <div style="padding:10px 14px; background:rgba(16, 185, 129, 0.15); border-radius:8px; border-left:3px solid var(--cyan);">
                            <strong style="color:#F4F6F4;">Document: Physics Chap 4 (Viscous Drag & Stokes' Law)</strong><br>
                            <span style="color:var(--text-secondary);">...semantic similarity score: 98.4% (Matched concept: Fluid friction, terminal velocity vectors).</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    };

    function wireModalInteractivity(type) {
        if (type === 'see') {
            const nucleus = document.querySelector('.cell-nucleus');
            const mito = document.querySelector('.cell-mitochondria');
            const details = document.querySelector('.cell-details');
            if (nucleus && details) {
                nucleus.addEventListener('click', () => {
                    details.innerHTML = `<strong>Nucleus (Ìbùdó àlàyé cell / Ahoɔden fibea):</strong> Contains cellular genomic coordinates and directs metabolic operations.`;
                });
            }
            if (mito && details) {
                mito.addEventListener('click', () => {
                    details.innerHTML = `<strong>Mitochondria (Mitokondria / Kinu cha nishati):</strong> Bioenergetic power organelle synthesizing high-energy ATP vectors.`;
                });
            }
        }

        if (type === 'say') {
            const micBtn = document.getElementById('test-mic-btn');
            const transcription = document.getElementById('transcription-result');
            let isRecording = false;

            if (micBtn && transcription) {
                micBtn.addEventListener('click', () => {
                    if (!isRecording) {
                        isRecording = true;
                        micBtn.textContent = 'Listening... 🔴';
                        transcription.textContent = 'Analyzing vocal waveform in Twi dialect...';

                        const bars = document.querySelectorAll('.wave-bar');
                        bars.forEach((bar, i) => {
                            bar.style.animation = `floatMascot ${0.4 + i * 0.1}s ease-in-out infinite`;
                        });

                        setTimeout(() => {
                            transcription.innerHTML = `🗣️ <strong>Transcribed:</strong> "Twetwe-yɛ no kyerɛ ahoɔden a ɛtwe nneɛma nyinaa ba fam."<br><span style="color:var(--mint); font-weight:600;">✓ Hunuko Speech Engine: Full comprehension confirmed! (Accurate mapping to gravitational acceleration).</span>`;
                            micBtn.textContent = 'Start Speaking';
                            bars.forEach(bar => bar.style.animation = 'none');
                            isRecording = false;
                        }, 2200);
                    }
                });
            }
        }

        if (type === 'retrieve') {
            const options = document.querySelectorAll('.quiz-opt');
            const feedback = document.getElementById('quiz-feedback');

            options.forEach(opt => {
                opt.addEventListener('click', () => {
                    options.forEach(o => {
                        o.style.borderColor = 'rgba(52, 211, 153, 0.5)';
                        o.style.background = 'rgba(18, 26, 22, 0.75)';
                    });

                    if (opt.dataset.correct === 'true') {
                        opt.style.borderColor = 'var(--mint)';
                        opt.style.background = 'rgba(16, 185, 129, 0.25)';
                        if (feedback) {
                            feedback.style.display = 'block';
                            feedback.style.color = 'var(--mint)';
                            feedback.innerHTML = `✓ <strong>Correct!</strong> Galileo demonstrated that constant acceleration in a vacuum is independent of object mass because gravitational force and inertia scale identically (F/m = g).`;
                        }
                    } else {
                        opt.style.borderColor = '#EF4444';
                        opt.style.background = 'rgba(239, 68, 68, 0.15)';
                        if (feedback) {
                            feedback.style.display = 'block';
                            feedback.style.color = '#EF4444';
                            feedback.innerHTML = `✗ <strong>Incorrect.</strong> Remember: While a heavier mass experiences a greater gravitational force, it also has proportionally greater inertia resisting acceleration.`;
                        }
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
            if (btn && results) {
                btn.addEventListener('click', () => {
                    results.innerHTML = `
                        <div style="padding:10px 14px; background:rgba(16, 185, 129, 0.15); border-radius:8px; border-left:3px solid var(--cyan);">
                            <strong style="color:#F4F6F4;">Document: Physics Chap 4 (Viscous Drag & Stokes' Law)</strong><br>
                            <span style="color:var(--text-secondary);">...semantic similarity score: 98.4% (Matched concept: Fluid friction, terminal velocity vectors).</span>
                        </div>
                        <div style="padding:10px 14px; background:rgba(245, 158, 11, 0.12); border-radius:8px; border-left:3px solid var(--gold);">
                            <strong style="color:#F4F6F4;">Lecture Notes: Fluid Dynamics & Laminar Flow</strong><br>
                            <span style="color:var(--text-secondary);">...relevance score: 87.2% (Matched concept: Viscosity coefficient and boundary layers).</span>
                        </div>
                    `;
                });
            }
        }
    }

    workflowCards.forEach(card => {
        card.addEventListener('click', () => {
            const type = card.dataset.workflow;
            if (modalWorkspace && modalContentTemplates[type]) {
                modalWorkspace.innerHTML = modalContentTemplates[type];
                if (modal) {
                    modal.classList.add('active');
                    modal.setAttribute('aria-hidden', 'false');
                }
                wireModalInteractivity(type);
            }
        });
    });

    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
        }
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });

    // ========================================================
    // 9. Footer Terminal Widget Easter Egg
    // ========================================================
    const termInput = document.getElementById('terminal-input');
    const termOutput = document.getElementById('terminal-output');

    if (termInput && termOutput) {
        termInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const cmd = termInput.value.trim().toLowerCase();
                termInput.value = '';

                let response = '';
                switch (cmd) {
                    case 'help':
                        response = 'Available protocols: [status] [mascot] [hunuko] [verify] [reviews] [clear]';
                        break;
                    case 'status':
                        response = 'ANIMATRIX System V2.2: ACTIVE | Localized inference & SymPy verification operational.';
                        break;
                    case 'mascot':
                        response = 'Mascot Status: Levitation at 100%. Holographic simulator outputting F=ma in real-time.';
                        break;
                    case 'hunuko':
                        response = 'Hunuko Core online. Multilingual translation ready. SymPy verification engines operational.';
                        break;
                    case 'verify':
                        response = 'Verification check: SymPy returns exact algebraic proofs. Zero hallucination guarantee: Active.';
                        break;
                    case 'reviews':
                        response = 'Cohort Rating: 4.9/5 across 1,200+ evaluations. Concept retention gain: +94.2%.';
                        break;
                    case 'clear':
                        termOutput.innerHTML = '';
                        return;
                    default:
                        response = `Protocol "${cmd}" unrecognized. Type "help" for valid commands.`;
                }

                termOutput.innerHTML = `<div>&gt; ${cmd}</div><div style="color:var(--mint); margin-bottom:8px;">${response}</div>`;
                termOutput.scrollTop = termOutput.scrollHeight;
            }
        });
    }
});
