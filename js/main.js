/* ============================================================
   main.js — rendu, i18n, filtres, ciel étoilé, globe, effets
   ============================================================ */

(function () {
  "use strict";

  const PI2 = Math.PI * 2;

  /* ---------- État langue ---------- */
  let lang = localStorage.getItem("ab-lang") || "fr";
  const t = (key) => (I18N[lang] && I18N[lang][key]) || key;
  const tx = (val) => (val && typeof val === "object") ? (val[lang] || val.fr) : val;

  /* =========================================================
     RENDU DYNAMIQUE
     ========================================================= */

  function renderValues() {
    const el = document.getElementById("valuesList");
    el.innerHTML = DATA.values[lang].map((v) => `<li>${v}</li>`).join("");
  }

  function renderStats() {
    const el = document.getElementById("stats");
    el.innerHTML = DATA.stats.map((s) => `
      <div class="stat">
        <div class="stat-num" ${s.raw ? "" : `data-count="${s.value}"`}>${s.raw ? s.value : "0"}${s.plus ? '<span class="plus">+</span>' : ""}</div>
        <div class="stat-label">${tx(s.label)}</div>
      </div>`).join("");
  }

  const projectCount = (key) => DATA.projects.filter((p) => p.competences.includes(key)).length;

  /* Liste de repli (chips) + panneau de détail sous le système solaire */
  function renderSolarUI() {
    const list = document.getElementById("solarList");
    const panel = document.getElementById("solarPanel");
    if (!list || !panel) return;
    list.innerHTML = DATA.competences.map((c) => `
      <button class="solar-chip ${activeFilter === c.key ? "active" : ""}" data-competence="${c.key}" data-cursor="link">
        <span class="chip-dot"></span>${tx(c.title)}<span class="chip-n">${projectCount(c.key)}</span>
      </button>`).join("");
    list.querySelectorAll(".solar-chip").forEach((btn) => {
      btn.addEventListener("click", () => toggleFilter(btn.dataset.competence));
    });
    renderSolarPanel();
  }

  function solarEmptyHTML() {
    return `<div class="sp-empty"><span class="sp-sun-ic">☀</span><p>${t("skills.hint_panel")}</p></div>`;
  }

  function solarPanelHTML(key) {
    const c = DATA.competences.find((x) => x.key === key);
    if (!c) return solarEmptyHTML();
    const count = projectCount(key);
    const word = count > 1 ? t("projects.count_many") : t("projects.count_one");
    return `
      <p class="sp-kicker">${t("skills.domain")}</p>
      <h3>${tx(c.title)}</h3>
      <p class="sp-desc">${tx(c.desc)}</p>
      <p class="sp-count"><span>${count}</span>${word}</p>
      <button class="sp-link" id="solarToProjects" data-cursor="link">${t("skills.see_projects")} ↓</button>`;
  }

  function renderSolarPanel() {
    const panel = document.getElementById("solarPanel");
    if (!panel) return;
    panel.innerHTML = activeFilter ? solarPanelHTML(activeFilter) : solarEmptyHTML();
    const toProj = document.getElementById("solarToProjects");
    if (toProj) toProj.addEventListener("click", () => {
      document.getElementById("projets").scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* Reflète le filtre courant sur les chips, le panneau et le canvas */
  function syncSolar() {
    document.querySelectorAll(".solar-chip").forEach((c) => {
      c.classList.toggle("active", c.dataset.competence === activeFilter);
    });
    renderSolarPanel();
    if (solarState) { solarState.selected = activeFilter; if (solarState.redraw) solarState.redraw(); }
  }

  function competenceLabel(key) {
    const c = DATA.competences.find((x) => x.key === key);
    return c ? tx(c.title) : key;
  }

  function renderProjects() {
    const el = document.getElementById("projectsGrid");
    el.innerHTML = DATA.projects.map((p) => {
      const badges = p.competences.map((k) => `<span>${competenceLabel(k)}</span>`).join("");
      const tags = p.tech.map((tg) => `<span>${tg}</span>`).join("");
      const links = [];
      if (p.github) links.push(`<a href="${p.github}" target="_blank" rel="noopener" data-cursor="link">↗ ${t("links.github")}</a>`);
      if (p.demo)   links.push(`<a href="${p.demo}" target="_blank" rel="noopener" data-cursor="link">↗ ${t("links.demo")}</a>`);
      const title = tx(p.title);
      return `
      <article class="project-card ${p.featured ? "featured" : ""}" data-competences="${p.competences.join(" ")}" data-cursor="link">
        <div class="project-thumb">
          <img src="${p.image}" alt="${title}" onerror="this.classList.add('missing')" />
          <span class="thumb-fallback">${title}</span>
        </div>
        <div class="project-body">
          <div class="project-meta"><span>${tx(p.role)}</span><span>${p.year}</span></div>
          <h3>${title}</h3>
          <p class="project-tagline">${tx(p.tagline)}</p>
          <p class="project-desc">${tx(p.desc)}</p>
          <div class="project-tags">${tags}</div>
          <div class="project-badges">${badges}</div>
          ${links.length ? `<div class="project-links">${links.join("")}</div>` : ""}
        </div>
      </article>`;
    }).join("");
  }

  function renderCertifs() {
    const el = document.getElementById("certifs");
    const seeLabel = tx({ fr: "Voir le certificat ↓", en: "View certificate ↓" });
    el.innerHTML = DATA.certifications.map((c) => `
      <div class="certif-card">
        <h4>${tx(c.name)}</h4>
        <p class="c-org">${c.org}</p>
        <p class="c-year">${tx(c.year)}</p>
        ${c.file ? `<a class="c-file" href="${c.file}" target="_blank" rel="noopener" data-cursor="link">${seeLabel}</a>` : ""}
      </div>`).join("");
  }

  function renderRecommendations() {
    const el = document.getElementById("recoGrid");
    if (!el) return;
    el.innerHTML = DATA.recommendations.map((r) => `
      <figure class="reco-card">
        <div class="quote-mark">&ldquo;</div>
        <blockquote class="reco-quote">${tx(r.quote)}</blockquote>
        <figcaption class="reco-author">
          <span class="reco-avatar">${r.initials}</span>
          <span class="reco-meta">
            <span class="reco-name">${r.name}</span>
            <span class="reco-role">${tx(r.role)}</span>
            <span class="reco-rel">${tx(r.relation)}</span>
          </span>
        </figcaption>
      </figure>`).join("");
  }

  function renderLanguages() {
    const el = document.getElementById("langGrid");
    el.innerHTML = DATA.languages.map((l) => `
      <div class="lang-card">
        <div class="l-head"><span class="l-name">${tx(l.name)}</span><span class="l-level">${tx(l.level)}</span></div>
        <div class="lang-bar"><i data-level="${l.value}"></i></div>
        <p class="l-desc">${tx(l.desc)}</p>
      </div>`).join("");
  }

  function renderAll() {
    renderValues();
    renderStats();
    renderConstelUI();
    renderSolarUI();
    renderProjects();
    renderGlobeUI();
    renderCertifs();
    renderRecommendations();
    renderLanguages();
    applyStaticI18n();
    bindCursorTargets();
    observeReveals();
  }

  /* =========================================================
     I18N statique
     ========================================================= */
  function applyStaticI18n() {
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.getAttribute("data-i18n"));
    });
    document.documentElement.lang = lang;
    document.querySelectorAll(".lang-opt").forEach((o) => {
      o.classList.toggle("is-active", o.dataset.lang === lang);
    });
  }

  function setLang(next) {
    if (next === lang) return;
    lang = next;
    localStorage.setItem("ab-lang", lang);
    clearFilter();
    renderAll();
    animateBars();
    animateCounters(true);
  }

  /* =========================================================
     FILTRE PAR COMPÉTENCE
     ========================================================= */
  let activeFilter = null;

  function toggleFilter(key) {
    if (activeFilter === key) { clearFilter(); return; }
    activeFilter = key;
    document.querySelectorAll(".project-card").forEach((p) => {
      const match = p.dataset.competences.split(" ").includes(key);
      p.classList.toggle("dimmed", !match);
    });
    syncSolar();
    const reset = document.getElementById("filterReset");
    const info = document.getElementById("filterInfo");
    const count = projectCount(key);
    const word = count > 1 ? t("projects.count_many") : t("projects.count_one");
    info.textContent = `${t("projects.filtered_by")} ${competenceLabel(key)} — ${count} ${word}`;
    info.hidden = false;
    reset.hidden = false;
  }

  function clearFilter() {
    activeFilter = null;
    document.querySelectorAll(".project-card").forEach((p) => p.classList.remove("dimmed"));
    syncSolar();
    const reset = document.getElementById("filterReset");
    const info = document.getElementById("filterInfo");
    if (reset) reset.hidden = true;
    if (info) info.hidden = true;
  }

  /* =========================================================
     CIEL ÉTOILÉ (formation) + VOYAGE IMMERSIF
     ========================================================= */

  /* Liste de repli (chips) sous le ciel */
  function renderConstelUI() {
    const list = document.getElementById("constelList");
    if (!list) return;
    const items = DATA.formation;
    list.innerHTML = items.map((f, i) => `
      <button class="constel-chip" data-f="${i}" data-cursor="link">
        <span class="chip-star">✦</span>${f.short || tx(f.title)}
      </button>`).join("");
    list.querySelectorAll(".constel-chip").forEach((btn) => {
      btn.addEventListener("click", () => openWarp(parseInt(btn.dataset.f, 10)));
    });
  }

  /* Le ciel de la section (étoiles + étoiles-formations cliquables) */
  function initSky() {
    const canvas = document.getElementById("skyCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = "45,91,255";
    const items = DATA.formation;
    // Placées dans la moitié basse pour ne pas tomber derrière le titre/texte.
    const anchors = [
      { x: 0.28, y: 0.62 }, { x: 0.56, y: 0.55 }, { x: 0.80, y: 0.70 },
      { x: 0.44, y: 0.84 }, { x: 0.70, y: 0.88 }, { x: 0.16, y: 0.80 }
    ];
    let w = 0, h = 0, dpr = 1, time = 0, hover = -1, bg = [];

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      bg = Array.from({ length: Math.max(140, Math.round(w * h / 2200)) }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.3 + 0.2, ph: Math.random() * PI2,
        sp: Math.random() * 1.6 + 0.3, base: Math.random() * 0.5 + 0.15
      }));
    }

    const fpos = (i) => ({ x: anchors[i % anchors.length].x * w, y: anchors[i % anchors.length].y * h });

    function drawFlare(x, y, len, alpha) {
      ctx.strokeStyle = `rgba(255,255,255,${alpha})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x - len, y); ctx.lineTo(x + len, y);
      ctx.moveTo(x, y - len); ctx.lineTo(x, y + len);
      ctx.stroke();
    }

    function draw() {
      ctx.clearRect(0, 0, w, h);
      // étoiles décoratives (le ciel infini)
      bg.forEach((s) => {
        const tw = reduce ? s.base : (s.base + (1 - s.base) * (0.5 + 0.5 * Math.sin(time * s.sp + s.ph)));
        ctx.globalAlpha = tw;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, PI2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      // étoiles-formations (brillantes, cliquables)
      items.forEach((f, i) => {
        const p = fpos(i); f._x = p.x; f._y = p.y;
        const hov = hover === i;
        const pulse = reduce ? 1 : (0.78 + 0.22 * Math.sin(time * 2 + i * 1.3));
        const r = (hov ? 8 : 5.5) * pulse;
        ctx.beginPath(); ctx.arc(p.x, p.y, r + (hov ? 18 : 12), 0, PI2);
        ctx.fillStyle = `rgba(${accent},${0.16 * pulse})`; ctx.fill();
        drawFlare(p.x, p.y, r * 3.4, 0.5 * pulse);
        ctx.save();
        ctx.shadowColor = `rgba(${accent},0.95)`; ctx.shadowBlur = 16;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath(); ctx.arc(p.x, p.y, r * 0.62, 0, PI2); ctx.fill();
        ctx.restore();
        if (hov) {
          ctx.font = "600 13px 'Space Grotesk', system-ui, sans-serif";
          ctx.fillStyle = "#ffffff"; ctx.textAlign = "center";
          ctx.fillText(f.short || "", p.x, p.y - r - 16);
        }
      });
    }

    function frame() { time += 0.016; draw(); requestAnimationFrame(frame); }

    function hit(mx, my) {
      let best = -1, bd = 28;
      items.forEach((f, i) => {
        const d = Math.hypot(mx - f._x, my - f._y);
        if (d < bd) { bd = d; best = i; }
      });
      return best;
    }
    function pointer(e) {
      const rect = canvas.getBoundingClientRect();
      return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
    }
    canvas.addEventListener("mousemove", (e) => {
      const { mx, my } = pointer(e);
      hover = hit(mx, my);
      canvas.style.cursor = hover >= 0 ? "pointer" : "default";
    });
    canvas.addEventListener("click", (e) => {
      const { mx, my } = pointer(e);
      const i = hit(mx, my);
      if (i >= 0) openWarp(i);
    });

    resize();
    if (reduce) draw(); else frame();
    window.addEventListener("resize", () => { resize(); if (reduce) draw(); });
  }

  /* Moteur de "warp" plein écran (la plongée vers l'étoile) */
  let warp = null;
  function initWarp() {
    const canvas = document.getElementById("warpCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accentSoft = "126,160,255";
    let w = 0, h = 0, dpr = 1, cx = 0, cy = 0;
    let stars = [], speed = 0, mode = "idle", pt = 0, running = false;
    let arriveCb = null, doneCb = null;
    const easeOut = (p) => 1 - Math.pow(1 - p, 3);
    const easeIn = (p) => p * p * p;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth; h = window.innerHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
    }
    function makeStar() {
      return { x: (Math.random() * 2 - 1), y: (Math.random() * 2 - 1), z: Math.random() * 0.7 + 0.25 };
    }
    function reset() { stars = Array.from({ length: 420 }, makeStar); }
    function proj(s) {
      const k = Math.max(w, h) * 0.9;
      return { x: cx + (s.x / s.z) * k, y: cy + (s.y / s.z) * k };
    }

    function loop() {
      if (!running) return;
      pt += 0.016;
      if (mode === "dive") {
        const p = Math.min(pt / 1.15, 1);
        speed = easeOut(p) * 3.4 + 0.15;
        if (p >= 1) { mode = "cruise"; if (arriveCb) { arriveCb(); arriveCb = null; } }
      } else if (mode === "cruise") {
        speed = 0.22;
      } else if (mode === "back") {
        // accélération continue (ne se termine pas seul : c'est closeWarp qui pilote le fondu puis stop())
        const p = Math.min(pt / 0.6, 1);
        speed = 0.22 + easeIn(p) * 5.5;
      }
      ctx.fillStyle = "rgba(6,7,15,0.28)";
      ctx.fillRect(0, 0, w, h);
      for (const s of stars) {
        const a = proj(s);
        s.z -= speed * 0.016;
        if (s.z < 0.04) { s.x = Math.random() * 2 - 1; s.y = Math.random() * 2 - 1; s.z = 0.95; continue; }
        const b = proj(s);
        const depth = Math.min(1, 1 - s.z);
        const isAccent = Math.random() < 0.16;
        ctx.strokeStyle = isAccent ? `rgba(${accentSoft},${0.4 + 0.5 * depth})` : `rgba(255,255,255,${0.35 + 0.55 * depth})`;
        ctx.lineWidth = Math.max(0.6, depth * 2.6);
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      }
      requestAnimationFrame(loop);
    }

    function dive(cb) {
      resize(); reset();
      if (reduce) {
        ctx.fillStyle = "#06070f"; ctx.fillRect(0, 0, w, h);
        for (const s of stars) { const a = proj(s); ctx.fillStyle = "rgba(255,255,255,0.55)"; ctx.fillRect(a.x, a.y, 1.6, 1.6); }
        if (cb) cb();
        return;
      }
      speed = 0; pt = 0; mode = "dive"; arriveCb = cb; running = true;
      requestAnimationFrame(loop);
    }
    function back() {
      if (!running) return;
      pt = 0; mode = "back";
    }
    function stop() {
      running = false;
      ctx.clearRect(0, 0, w, h);
    }

    window.addEventListener("resize", () => { if (running) resize(); });
    warp = { dive, back, stop };
  }

  function warpDetailHTML(f) {
    return `
      <p class="wc-year">${f.year || ""}</p>
      <h3>${tx(f.title)}</h3>
      <p class="wc-meta">${tx(f.meta)}</p>
      <p class="wc-desc">${tx(f.desc)}</p>`;
  }

  function openWarp(i) {
    const overlay = document.getElementById("warpOverlay");
    const content = document.getElementById("warpContent");
    const f = DATA.formation[i];
    if (!overlay || !content || !warp) return;
    content.innerHTML = warpDetailHTML(f);
    content.classList.remove("show");
    overlay.classList.remove("arrived");
    overlay.hidden = false;
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => overlay.classList.add("active"));
    warp.dive(() => { content.classList.add("show"); overlay.classList.add("arrived"); });
  }

  function closeWarp() {
    const overlay = document.getElementById("warpOverlay");
    const content = document.getElementById("warpContent");
    if (!overlay || overlay.hidden) return;
    content.classList.remove("show");
    overlay.classList.remove("arrived");
    if (warp) warp.back();                                      // les étoiles repartent en accélérant
    setTimeout(() => overlay.classList.remove("active"), 350);  // le ciel se dissout dans le site (fondu CSS)
    setTimeout(() => {
      overlay.hidden = true;
      document.body.style.overflow = "";
      if (warp) warp.stop();
    }, 350 + 1400);
  }

  /* =========================================================
     GLOBE INTERACTIF (parcours)
     ========================================================= */
  let globeState = null;

  function buildLocations() {
    const map = new Map();
    DATA.stages.forEach((s) => {
      const key = s.city;
      if (!map.has(key)) map.set(key, { city: s.city, lat: s.lat, lng: s.lng, type: "exp", items: [] });
      map.get(key).items.push(s);
    });
    const locs = Array.from(map.values());
    const g = DATA.goal;
    locs.push({ city: g.city, lat: g.lat, lng: g.lng, type: "goal", goal: g, items: [] });
    return locs;
  }

  function globeEmptyHTML() {
    return `<div class="gp-empty"><span class="gp-globe-ic">◍</span><p>${t("globe.hint")}</p></div>`;
  }

  function globePanelHTML(loc) {
    if (loc.type === "goal") {
      return `
        <div class="gp-flag">★</div>
        <p class="gp-city">${loc.city} · USA</p>
        <h3>${tx(loc.goal.title)}</h3>
        <p class="gp-desc">${tx(loc.goal.desc)}</p>`;
    }
    const word = loc.items.length > 1 ? t("globe.exp_many") : t("globe.exp_one");
    const items = loc.items.map((s) => `
      <div class="gp-item">
        <span class="gp-period">${tx(s.period)}</span>
        <h4>${tx(s.title)}</h4>
        <p class="gp-org">${tx(s.org)}</p>
        <p class="gp-itemdesc">${tx(s.desc)}</p>
        ${s.report ? `<a class="t-report" href="${s.report}" download data-cursor="link">${t("journey.report")}</a>` : ""}
      </div>`).join("");
    return `
      <p class="gp-city">${loc.city}</p>
      <h3>${loc.items.length} ${word}</h3>
      <div class="gp-items">${items}</div>`;
  }

  function renderGlobeUI() {
    const list = document.getElementById("globeList");
    const panel = document.getElementById("globePanel");
    if (!list || !panel) return;
    const locs = (globeState && globeState.locations) ? globeState.locations : buildLocations();
    const sel = globeState ? globeState.selected : null;
    list.innerHTML = locs.map((l, i) => `
      <button class="globe-chip ${l.type === "goal" ? "is-goal" : ""} ${sel === i ? "active" : ""}" data-loc="${i}" data-cursor="link">
        <span class="chip-dot"></span>${l.city}
      </button>`).join("");
    list.querySelectorAll(".globe-chip").forEach((btn) => {
      btn.addEventListener("click", () => selectLocation(parseInt(btn.dataset.loc, 10)));
    });
    panel.innerHTML = (sel != null && locs[sel]) ? globePanelHTML(locs[sel]) : globeEmptyHTML();
  }

  function selectLocation(i) {
    if (globeState && globeState.select) globeState.select(i);
    else { if (globeState) globeState.selected = i; renderGlobeUI(); }
  }

  function initGlobe() {
    const canvas = document.getElementById("globeCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = "45,91,255";
    const locations = buildLocations();
    globeState = { locations, selected: null };

    const D2R = Math.PI / 180;

    // Anneaux de terres densifiés une fois (lat/lng) : crée des points intermédiaires
    // pour que la découpe de l'hémisphère et le suivi du limbe soient précis.
    function densify(ring) {
      const out = [], n = ring.length;
      for (let k = 0; k < n; k += 2) {
        const lo1 = ring[k], la1 = ring[k + 1];
        const k2 = (k + 2) % n, lo2 = ring[k2], la2 = ring[k2 + 1];
        let dlo = lo2 - lo1; if (dlo > 180) dlo -= 360; if (dlo < -180) dlo += 360;
        const dla = la2 - la1;
        out.push(lo1, la1);
        const steps = Math.max(1, Math.ceil(Math.max(Math.abs(dlo), Math.abs(dla)) / 3));
        for (let s = 1; s < steps; s++) out.push(lo1 + dlo * s / steps, la1 + dla * s / steps);
      }
      return out;
    }
    const LAND = (window.LAND_RINGS || []).map(densify);
    const TILT0 = 0.32;     // inclinaison de repos (vue légèrement plongeante)
    const ZOOM_IN = 2.4;    // facteur de « plongée » sur un lieu sélectionné

    let w = 0, h = 0, R = 0, cx = 0, cy = 0, dpr = 1;
    let rot = 0.5;
    let targetRot = null;
    let tilt = TILT0, targetTilt = TILT0;
    let zoom = 1, targetZoom = 1;
    let autorotate = !reduce;
    let hoverIdx = -1;
    let tick = 0;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const size = canvas.clientWidth || 420;
      w = size; h = size;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2; R = Math.min(w, h) * 0.42;
    }

    // lat/lng -> vecteur unitaire orienté (rotation + inclinaison). z = profondeur (>0 = face visible)
    function toVec(latDeg, lngDeg) {
      const lat = latDeg * D2R, lng = lngDeg * D2R + rot;
      const x = Math.cos(lat) * Math.sin(lng);
      const y = Math.sin(lat);
      const z = Math.cos(lat) * Math.cos(lng);
      return {
        x: x,
        y: y * Math.cos(tilt) - z * Math.sin(tilt),
        z: y * Math.sin(tilt) + z * Math.cos(tilt),
      };
    }
    function sx(v) { return cx + v.x * R * zoom; }
    function sy(v) { return cy - v.y * R * zoom; }

    // Découpe un anneau contre l'hémisphère visible (plan z>=0), Sutherland-Hodgman.
    // Les points de coupe sont ramenés sur le limbe pour épouser le bord du globe.
    function clipFront(verts) {
      const out = [];
      const n = verts.length;
      for (let i = 0; i < n; i++) {
        const A = verts[i], B = verts[(i + 1) % n];
        const Ain = A.z >= 0, Bin = B.z >= 0;
        if (Ain) out.push(A);
        if (Ain !== Bin) {
          const t = A.z / (A.z - B.z);
          let ix = A.x + (B.x - A.x) * t, iy = A.y + (B.y - A.y) * t;
          const m = Math.hypot(ix, iy) || 1;
          out.push({ x: ix / m, y: iy / m, z: 0, limb: true });
        }
      }
      return out;
    }

    function drawEarth() {
      const er = R * zoom;
      ctx.save();
      ctx.beginPath(); ctx.arc(cx, cy, er, 0, Math.PI * 2);
      // océans : surface claire (encre pâle)
      const og = ctx.createLinearGradient(0, cy - er, 0, cy + er);
      og.addColorStop(0, "#f4f6fb");
      og.addColorStop(1, "#e2e6f1");
      ctx.fillStyle = og; ctx.fill();
      ctx.clip();

      // terres : encre sombre (bichromie). Entre deux points de coupe, on longe
      // l'arc du limbe (et non une corde droite) pour ne pas déformer les continents.
      ctx.fillStyle = "#171a30";
      for (const ring of LAND) {
        const verts = [];
        for (let k = 0; k < ring.length; k += 2) verts.push(toVec(ring[k + 1], ring[k]));
        const clip = clipFront(verts);
        if (clip.length < 3) continue;
        ctx.beginPath();
        ctx.moveTo(sx(clip[0]), sy(clip[0]));
        for (let j = 0; j < clip.length; j++) {
          const a = clip[j], b = clip[(j + 1) % clip.length];
          if (a.limb && b.limb) {
            let ta = Math.atan2(a.y, a.x), tb = Math.atan2(b.y, b.x), d = tb - ta;
            while (d > Math.PI) d -= 2 * Math.PI;
            while (d < -Math.PI) d += 2 * Math.PI;
            const m = Math.max(2, Math.ceil(Math.abs(d) / 0.12));
            for (let s = 1; s <= m; s++) {
              const th = ta + d * s / m;
              ctx.lineTo(cx + Math.cos(th) * er, cy - Math.sin(th) * er);
            }
          } else {
            ctx.lineTo(sx(b), sy(b));
          }
        }
        ctx.fill();
      }

      // ombrage sphérique : lumière en haut-gauche, ombre sur le limbe bas-droit
      const sg = ctx.createRadialGradient(cx - er * 0.38, cy - er * 0.38, er * 0.1, cx, cy, er * 1.05);
      sg.addColorStop(0, "rgba(255,255,255,0.14)");
      sg.addColorStop(0.55, "rgba(255,255,255,0)");
      sg.addColorStop(1, "rgba(6,7,15,0.30)");
      ctx.fillStyle = sg;
      ctx.beginPath(); ctx.arc(cx, cy, er, 0, Math.PI * 2); ctx.fill();
      ctx.restore();

      // halo d'atmosphère cobalt + liseré du limbe
      ctx.beginPath(); ctx.arc(cx, cy, er, 0, Math.PI * 2);
      ctx.shadowColor = `rgba(${accent},0.35)`; ctx.shadowBlur = 18;
      ctx.strokeStyle = `rgba(${accent},0.22)`; ctx.lineWidth = 1.5; ctx.stroke();
      ctx.shadowBlur = 0;
      ctx.beginPath(); ctx.arc(cx, cy, er, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(11,11,12,0.18)"; ctx.lineWidth = 1; ctx.stroke();
    }

    function roundRect(x, y, ww, hh, r) {
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, ww, hh, r);
      else { ctx.moveTo(x + r, y); ctx.arcTo(x + ww, y, x + ww, y + hh, r); ctx.arcTo(x + ww, y + hh, x, y + hh, r); ctx.arcTo(x, y + hh, x, y, r); ctx.arcTo(x, y, x + ww, y, r); ctx.closePath(); }
    }

    function drawMarkers() {
      locations.forEach((loc, i) => {
        const v = toVec(loc.lat, loc.lng);
        const X = sx(v), Y = sy(v);
        const front = v.z > -0.02;
        loc._sx = X; loc._sy = Y; loc._front = front;
        if (!front) return; // marqueurs de la face cachée : invisibles
        const depth = Math.max(0, v.z);
        const isGoal = loc.type === "goal";
        const sel = globeState.selected === i;
        const r = (sel ? 6 : 4.5) * (0.6 + 0.4 * depth);

        // halo cobalt (objectif ou sélection), avec pulsation douce
        if (isGoal || sel) {
          const pulse = reduce ? 0 : (tick % 140) / 140;
          ctx.beginPath();
          ctx.arc(X, Y, r + 6 + (reduce ? 0 : pulse * 9), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${accent},${0.18 * (1 - pulse)})`; ctx.fill();
        }
        // point : cobalt (objectif) ou blanc cerclé d'encre (lisible sur terre comme sur mer)
        ctx.beginPath(); ctx.arc(X, Y, r, 0, Math.PI * 2);
        if (isGoal || sel) {
          ctx.fillStyle = `rgba(${accent},${0.65 + 0.35 * depth})`;
          ctx.shadowColor = `rgba(${accent},0.9)`; ctx.shadowBlur = 12; ctx.fill(); ctx.shadowBlur = 0;
          ctx.lineWidth = 1.6; ctx.strokeStyle = "rgba(255,255,255,0.95)"; ctx.stroke();
        } else {
          ctx.fillStyle = `rgba(255,255,255,${0.85 + 0.15 * depth})`; ctx.fill();
          ctx.lineWidth = 1.6; ctx.strokeStyle = `rgba(11,11,12,${0.55 + 0.35 * depth})`; ctx.stroke();
        }

        // étiquette : pastille claire + texte encre, lisible partout
        if (sel || hoverIdx === i || isGoal || depth > 0.55) {
          ctx.font = "600 12px 'Space Grotesk', system-ui, sans-serif";
          ctx.textAlign = "left"; ctx.textBaseline = "middle";
          const tw = ctx.measureText(loc.city).width;
          const px = X + r + 7, py = Y;
          roundRect(px - 5, py - 10, tw + 12, 20, 10);
          ctx.fillStyle = "rgba(255,255,255,0.92)"; ctx.fill();
          ctx.lineWidth = 1; ctx.strokeStyle = "rgba(11,11,12,0.10)"; ctx.stroke();
          ctx.fillStyle = "rgba(11,11,12,0.92)";
          ctx.fillText(loc.city, px + 2, py + 0.5);
          ctx.textBaseline = "alphabetic";
        }
      });
    }

    function frame() {
      tick++;
      if (autorotate && targetRot == null) rot += 0.0016;
      if (targetRot != null) {
        rot += (targetRot - rot) * 0.08;
        if (Math.abs(targetRot - rot) < 0.0008) { rot = targetRot; if (globeState.selected == null) targetRot = null; }
      }
      tilt += (targetTilt - tilt) * 0.08;
      zoom += (targetZoom - zoom) * 0.08;
      ctx.clearRect(0, 0, w, h);
      drawEarth(); drawMarkers();
      requestAnimationFrame(frame);
    }

    function renderStatic() { ctx.clearRect(0, 0, w, h); drawEarth(); drawMarkers(); }

    function hitTest(mx, my) {
      let best = -1, bd = 22;
      locations.forEach((loc, i) => {
        if (loc._front) {
          const d = Math.hypot(mx - loc._sx, my - loc._sy);
          if (d < bd) { bd = d; best = i; }
        }
      });
      return best;
    }

    function pointer(e) {
      const rect = canvas.getBoundingClientRect();
      return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
    }

    canvas.addEventListener("click", (e) => {
      const { mx, my } = pointer(e);
      const i = hitTest(mx, my);
      if (i >= 0) doSelect(i); else doDeselect();
    });
    canvas.addEventListener("mousemove", (e) => {
      const { mx, my } = pointer(e);
      hoverIdx = hitTest(mx, my);
      canvas.style.cursor = hoverIdx >= 0 ? "pointer" : "grab";
    });

    // Sélection : on recentre le lieu (longitude + latitude) puis on « plonge » dessus.
    function doSelect(i) {
      globeState.selected = i;
      autorotate = false;
      targetRot = -locations[i].lng * D2R;
      targetTilt = locations[i].lat * D2R;
      targetZoom = ZOOM_IN;
      renderGlobeUI();
      if (reduce) { rot = targetRot; tilt = targetTilt; zoom = targetZoom; renderStatic(); }
    }
    function doDeselect() {
      globeState.selected = null;
      autorotate = !reduce;
      targetRot = null;
      targetTilt = TILT0;
      targetZoom = 1;
      renderGlobeUI();
      if (reduce) { tilt = TILT0; zoom = 1; renderStatic(); }
    }

    globeState.select = doSelect;

    resize();
    renderGlobeUI();
    if (reduce) renderStatic();
    else frame();

    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
  }

  /* =========================================================
     SYSTÈME SOLAIRE (compétences pratiques)
     ========================================================= */
  let solarState = null;

  function initSolar() {
    const canvas = document.getElementById("solarCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = "45,91,255";
    const items = DATA.competences;
    const n = items.length;
    const tilt = 0.42; // aplatissement des orbites (perspective)

    // Une planète par domaine. Taille ∝ nombre de projets qui le démontrent.
    const planets = items.map((c, i) => ({
      key: c.key,
      orbit: i,
      angle: (i / n) * PI2,
      speed: 0.0040 - 0.0020 * (i / (n - 1)), // intérieur = plus rapide
      pr: 4.5 + projectCount(c.key) * 0.95
    }));
    solarState = { selected: activeFilter, planets, redraw: null };

    let w = 0, h = 0, dpr = 1, cx = 0, cy = 0, R = 0, hoverKey = null;

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = w / 2; cy = h / 2;
      R = Math.min(w / 2 - 56, (h / 2 - 30) / tilt);
    }

    const orbitR = (i) => R * (0.34 + 0.66 * (i / (n - 1)));

    function pos(p) {
      const r = orbitR(p.orbit);
      const x = cx + Math.cos(p.angle) * r;
      const y = cy + Math.sin(p.angle) * r * tilt;
      const depth = (Math.sin(p.angle) + 1) / 2; // 0 = fond (haut), 1 = avant (bas)
      return { x, y, depth };
    }

    function drawOrbits() {
      for (let i = 0; i < n; i++) {
        const r = orbitR(i);
        ctx.beginPath();
        ctx.ellipse(cx, cy, r, r * tilt, 0, 0, PI2);
        ctx.strokeStyle = "rgba(11,11,12,0.09)";
        ctx.lineWidth = 1; ctx.stroke();
      }
    }

    function drawSun() {
      const g = ctx.createRadialGradient(cx, cy, 2, cx, cy, 34);
      g.addColorStop(0, `rgba(${accent},0.38)`);
      g.addColorStop(1, `rgba(${accent},0)`);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, 34, 0, PI2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 9, 0, PI2);
      ctx.fillStyle = "#0b0b0c"; ctx.fill();
      ctx.beginPath(); ctx.arc(cx, cy, 9, 0, PI2);
      ctx.strokeStyle = `rgba(${accent},0.85)`; ctx.lineWidth = 1.5; ctx.stroke();
    }

    function drawPlanets() {
      const order = planets.slice().sort((a, b) => pos(a).depth - pos(b).depth);
      for (const p of order) {
        const pt = pos(p);
        p._x = pt.x; p._y = pt.y;
        const sel = solarState.selected === p.key;
        const hov = hoverKey === p.key;
        const r = p.pr * (0.62 + 0.38 * pt.depth) * (sel ? 1.5 : 1);
        if (sel) {
          ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = `rgba(${accent},0.35)`; ctx.lineWidth = 1.2; ctx.stroke();
        }
        if (sel || hov) {
          ctx.beginPath(); ctx.arc(pt.x, pt.y, r + 8, 0, PI2);
          ctx.fillStyle = `rgba(${accent},0.13)`; ctx.fill();
        }
        ctx.beginPath(); ctx.arc(pt.x, pt.y, r, 0, PI2);
        if (sel) {
          ctx.fillStyle = `rgba(${accent},1)`;
          ctx.shadowColor = `rgba(${accent},0.9)`; ctx.shadowBlur = 14;
        } else {
          ctx.fillStyle = `rgba(11,11,12,${0.4 + 0.45 * pt.depth})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill(); ctx.shadowBlur = 0;
        if (sel || hov) {
          ctx.font = "600 12.5px 'Space Grotesk', system-ui, sans-serif";
          ctx.textAlign = "center";
          ctx.fillStyle = sel ? `rgba(${accent},1)` : "rgba(11,11,12,0.92)";
          ctx.fillText(competenceLabel(p.key), pt.x, pt.y - r - 10);
        }
      }
    }

    function render() {
      ctx.clearRect(0, 0, w, h);
      drawOrbits(); drawSun(); drawPlanets();
    }
    solarState.redraw = render;

    function step() {
      for (const p of planets) {
        if (solarState.selected === p.key) {
          // la planète sélectionnée glisse vers l'avant et s'y maintient
          let d = Math.PI / 2 - p.angle;
          d = Math.atan2(Math.sin(d), Math.cos(d));
          p.angle += d * 0.08;
        } else {
          p.angle += p.speed;
        }
      }
    }

    function frame() { step(); render(); requestAnimationFrame(frame); }

    function hit(mx, my) {
      let best = null, bd = 22;
      for (const p of planets) {
        const d = Math.hypot(mx - p._x, my - p._y);
        if (d < bd) { bd = d; best = p.key; }
      }
      return best;
    }
    function pointer(e) {
      const rect = canvas.getBoundingClientRect();
      return { mx: e.clientX - rect.left, my: e.clientY - rect.top };
    }
    canvas.addEventListener("mousemove", (e) => {
      const { mx, my } = pointer(e);
      hoverKey = hit(mx, my);
      canvas.style.cursor = hoverKey ? "pointer" : "default";
      if (reduce) render();
    });
    canvas.addEventListener("click", (e) => {
      const { mx, my } = pointer(e);
      const k = hit(mx, my);
      if (k) toggleFilter(k); else clearFilter();
    });

    resize();
    if (reduce) render(); else frame();
    window.addEventListener("resize", () => { resize(); if (reduce) render(); });
  }

  /* =========================================================
     EFFETS
     ========================================================= */

  let revealObserver;
  function observeReveals() {
    if (revealObserver) revealObserver.disconnect();
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); revealObserver.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  }

  function animateCounters(force) {
    document.querySelectorAll("[data-count]").forEach((el) => {
      if (el.dataset.done && !force) return;
      const target = parseInt(el.dataset.count, 10);
      const start = performance.now();
      const dur = 1300;
      function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
        el.firstChild.nodeValue = String(val);
        if (p < 1) requestAnimationFrame(step);
      }
      el.dataset.done = "1";
      requestAnimationFrame(step);
    });
  }

  function animateBars() {
    document.querySelectorAll(".lang-bar i").forEach((bar) => {
      const lvl = bar.dataset.level;
      requestAnimationFrame(() => { bar.style.width = lvl + "%"; });
    });
  }

  function initCursor() {
    if (window.matchMedia("(hover: none)").matches) return;
    const ring = document.querySelector(".cursor");
    const dot = document.querySelector(".cursor-dot");
    let rx = 0, ry = 0, dx = 0, dy = 0;
    document.addEventListener("mousemove", (e) => {
      dx = e.clientX; dy = e.clientY;
      dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%,-50%)`;
    });
    function loop() {
      rx += (dx - rx) * 0.18; ry += (dy - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;
      requestAnimationFrame(loop);
    }
    loop();
  }

  function bindCursorTargets() {
    if (window.matchMedia("(hover: none)").matches) return;
    const ring = document.querySelector(".cursor");
    document.querySelectorAll('[data-cursor="link"], a, button').forEach((el) => {
      if (el.dataset.cursorBound) return;
      el.dataset.cursorBound = "1";
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  }

  /* Fond hero : vaisseaux de lumière le long de la grille */
  function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    const accent = "45,91,255";
    const gap = 64;
    let w = 0, h = 0, dpr = 1, particles = [];

    const rnd = (a, b) => a + Math.random() * (b - a);

    function makeP() {
      const cols = Math.max(2, Math.floor(w / gap));
      const rows = Math.max(2, Math.floor(h / gap));
      const axis = Math.random() < 0.5 ? "h" : "v";
      const dir = Math.random() < 0.5 ? 1 : -1;
      const line = axis === "h"
        ? Math.round(rnd(1, rows - 1)) * gap
        : Math.round(rnd(1, cols - 1)) * gap;
      const span = axis === "h" ? w : h;
      return {
        axis, dir, line,
        pos: Math.random() * span,
        speed: rnd(0.5, 1.7) * dir,
        len: rnd(70, 180),
        alpha: rnd(0.25, 0.75),
        white: Math.random() < 0.22
      };
    }

    function reset(p) {
      Object.assign(p, makeP());
      const span = p.axis === "h" ? w : h;
      p.pos = p.dir > 0 ? -p.len - Math.random() * span * 0.4
                        : span + p.len + Math.random() * span * 0.4;
    }

    function initParticles() {
      const count = Math.min(20, Math.max(8, Math.round((w * h) / 85000)));
      particles = Array.from({ length: count }, makeP);
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    }

    function draw(p) {
      let x1, y1, x2, y2;
      if (p.axis === "h") { y1 = y2 = p.line; x1 = p.pos; x2 = p.pos - p.dir * p.len; }
      else                { x1 = x2 = p.line; y1 = p.pos; y2 = p.pos - p.dir * p.len; }
      const col = p.white ? "255,255,255" : accent;
      const g = ctx.createLinearGradient(x1, y1, x2, y2);
      g.addColorStop(0, `rgba(${col},${p.alpha})`);
      g.addColorStop(1, `rgba(${col},0)`);
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.6;
      ctx.shadowColor = `rgba(${accent},.85)`;
      ctx.shadowBlur = 8;
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.shadowBlur = 12;
      ctx.fillStyle = `rgba(${col},${Math.min(1, p.alpha + 0.3)})`;
      ctx.beginPath(); ctx.arc(x1, y1, 1.7, 0, Math.PI * 2); ctx.fill();
      ctx.shadowBlur = 0;
    }

    function loop() {
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.pos += p.speed;
        const span = p.axis === "h" ? w : h;
        if (p.dir > 0 && p.pos - p.len > span) reset(p);
        else if (p.dir < 0 && p.pos + p.len < 0) reset(p);
        draw(p);
      }
      requestAnimationFrame(loop);
    }

    resize();
    loop();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(resize, 200); });
  }

  /* Header + barre de progression */
  function initScroll() {
    const header = document.getElementById("siteHeader");
    const progress = document.getElementById("scrollProgress");
    function onScroll() {
      const y = window.scrollY;
      header.classList.toggle("scrolled", y > 10);
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (docH > 0 ? (y / docH) * 100 : 0) + "%";
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /* Menu mobile */
  function initBurger() {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("primaryNav");
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      nav.classList.toggle("open");
    });
    nav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => {
      burger.classList.remove("open"); nav.classList.remove("open");
    }));
  }

  /* Photo hero : fallback si absente */
  function initPhoto() {
    const img = document.getElementById("heroPhoto");
    img.addEventListener("error", () => img.classList.add("missing"));
    if (img.complete && img.naturalWidth === 0) img.classList.add("missing");
  }

  /* =========================================================
     INIT
     ========================================================= */
  document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    document.getElementById("langToggle").addEventListener("click", () => setLang(lang === "fr" ? "en" : "fr"));
    document.getElementById("filterReset").addEventListener("click", clearFilter);
    initCursor();
    initHeroCanvas();
    initSky();
    initWarp();
    initSolar();
    initGlobe();
    initScroll();
    initBurger();
    initPhoto();

    const back = document.getElementById("warpBack");
    if (back) back.addEventListener("click", closeWarp);
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeWarp(); });

    const aboutObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateCounters(false); aboutObs.disconnect(); } });
    }, { threshold: 0.3 });
    const stats = document.getElementById("stats"); if (stats) aboutObs.observe(stats);

    const langObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { animateBars(); langObs.disconnect(); } });
    }, { threshold: 0.3 });
    const lg = document.getElementById("langGrid"); if (lg) langObs.observe(lg);
  });
})();
