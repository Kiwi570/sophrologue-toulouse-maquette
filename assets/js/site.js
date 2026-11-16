/* Effets propres à Marianne Meyzen Récalde (direction « Souffle »). Le socle gère l'ouverture, le voile en iris,
   l'en-tête, le menu, les boucles, les mesures et la bibliothèque d'effets posés par attributs dans les pages.
   Effets du plan (data-effet) : souffle, souffle-appel, respiration, etoiles, onde-apaisee, bandeau-ouvre,
   mise-au-point, choix. */
import { demarrer, boucle, etat, versObjet, centreOuverture } from './socle/index.js?v=2';

const gsap = window.gsap;
const ST = window.ScrollTrigger;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const borne = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const doux = (p) => 0.5 - Math.cos(Math.PI * borne(p)) / 2;

/* Courbe d'une respiration : 4 s d'inspiration, 6 s d'expiration ; 0 = poumons vides, 1 = pleins. */
const souffleA = (t) => { const c = t % 10; return c < 4 ? doux(c / 4) : 1 - doux((c - 4) / 6); };

/* ---------- souffle : anneaux autour du grand cercle de l'accueil (et de l'appel final) ---------- */
function anneaux(sel, amp) {
  $$(sel).forEach((el) => {
    const r = $$('span', el);
    /* L'image du cercle respire aussi (l'image, pas la figure : l'objet d'ouverture garde sa taille). */
    const img = el.nextElementSibling && el.nextElementSibling.matches('.souffle-media') ? $('img', el.nextElementSibling) : null;
    const aura = el.parentElement && $(':scope > .aura', el.parentElement);
    boucle(el, (dt, t) => {
      const s = souffleA(t);
      if (img) img.style.transform = `scale(${(1.02 + 0.05 * s).toFixed(4)})`;
      if (aura) { aura.style.transform = `scale(${(0.92 + 0.16 * s).toFixed(4)})`; aura.style.opacity = (0.55 + 0.45 * s).toFixed(3); }
      r.forEach((a, i) => {
        a.style.transform = `scale(${(1 + (i + 1) * amp * s).toFixed(4)}) rotate(${(i === 2 ? t * 4 : 0).toFixed(2)}deg)`;
        a.style.opacity = (0.95 - i * 0.22 - s * 0.25).toFixed(3);
      });
    });
  });
}

/* ---------- respiration : « Respirez une minute avec moi » ---------- */
function respiration() {
  const el = $('[data-effet="respiration"]');
  if (!el) return;
  const disque = $('.respiration-disque', el), halo = $('.respiration-halo', el);
  const consigne = $('[data-consigne]', el), compte = $('[data-compte]', el), bouton = $('.respiration-bouton', el);
  const progres = $('.respiration-progres circle', el);
  const d = { ...el.dataset, ...bouton.dataset };
  let actif = false, temps = 0, dernierCycle = -1, derniereConsigne = '';
  const ecrire = (txt, n) => {
    if (txt !== derniereConsigne) { consigne.textContent = txt; derniereConsigne = txt; }
    if (n !== dernierCycle) { compte.textContent = n > 0 ? d.cycle.replace('{n}', n) : ' '; dernierCycle = n; }
  };
  const arreter = (txt) => {
    actif = false; temps = 0;
    bouton.textContent = d.commencer; bouton.setAttribute('aria-pressed', 'false');
    ecrire(txt || d.repos, 0);
  };
  bouton.addEventListener('click', () => {
    if (actif) { arreter(); return; }
    actif = true; temps = 0;
    bouton.textContent = d.arreter; bouton.setAttribute('aria-pressed', 'true');
  });
  boucle(el, (dt, t) => {
    let s;
    if (actif) {
      temps += dt;
      if (temps >= 60) { arreter(d.fini); s = 0; } else {
        const c = temps % 10;
        s = souffleA(temps);
        ecrire(c < 4 ? d.inspirez : d.expirez, Math.floor(temps / 10) + 1);
      }
    } else s = 0.12 + 0.18 * souffleA(t * 0.8);
    const e = 0.5 + 0.5 * s;
    disque.style.transform = `scale(${e.toFixed(4)})`;
    if (progres) progres.style.strokeDashoffset = (100 - (actif ? Math.min(100, (temps / 60) * 100) : 0)).toFixed(2);
    halo.style.transform = `scale(${(0.96 + 0.08 * s).toFixed(4)}) rotate(${(t * 6).toFixed(2)}deg)`;
  });
}

/* ---------- étoiles : elles s'allument au fil du défilement et scintillent ---------- */
function etoiles() {
  $$('[data-effet="etoiles"]').forEach((svg, k) => {
    const points = $$('circle', svg);
    let x = 17 + k * 31;
    const alea = () => ((x = (x * 9301 + 49297) % 233280) / 233280);
    const seuils = points.map(() => alea() * 0.75), vit = points.map(() => 0.6 + alea() * 1.8), ph = points.map(() => alea() * 6.3);
    let progres = 0.5;
    if (ST) ST.create({ trigger: svg.parentElement, start: 'top bottom', end: 'bottom top', onUpdate: (s) => { progres = s.progress; } });
    boucle(svg, (dt, t) => {
      points.forEach((c, i) => {
        const allume = borne((progres - seuils[i]) * 5);
        const sc = 0.72 + 0.28 * Math.sin(t * vit[i] + ph[i]);
        c.style.opacity = (0.12 + 0.88 * allume * sc).toFixed(3);
      });
    });
  });
}

/* ---------- onde-apaisee : l'onde agitée se calme à mesure qu'on descend ---------- */
function ondes() {
  $$('[data-effet="onde-apaisee"]').forEach((svg) => {
    const [p1, p2] = $$('path', svg);
    let progres = 0;
    if (ST) ST.create({ trigger: svg.closest('section'), start: 'top 85%', end: 'bottom 35%', onUpdate: (s) => { progres = s.progress; } });
    const N = 120;
    const trace = (t, decal, ampl) => {
      const agit = 1 - doux(progres);
      let d = '';
      for (let i = 0; i <= N; i++) {
        const u = i / N, xx = u * 1200;
        const enveloppe = Math.sin(Math.PI * u);
        const y = 80 + enveloppe * ampl * (
          (10 + 52 * agit) * Math.sin(u * 9 + t * 1.1 + decal)
          + agit * 26 * Math.sin(u * 47 + t * 3.3 + decal * 2)
          + agit * agit * 14 * Math.sin(u * 113 - t * 5.1));
        d += (i ? 'L' : 'M') + xx.toFixed(1) + ' ' + y.toFixed(1);
      }
      return d;
    };
    boucle(svg, (dt, t) => {
      p1.setAttribute('d', trace(t, 0, 1));
      p2.setAttribute('d', trace(t * 0.8, 1.7, 0.6));
    });
  });
}

/* ---------- bandeau-ouvre : le panorama de la page Sophrologie s'ouvre au défilement ---------- */
function bandeau() {
  const fig = $('[data-effet="bandeau-ouvre"]');
  if (!fig || !gsap || !ST) return;
  const etroit = () => (window.innerWidth > 760 ? 'inset(0% 13% 0% 13% round 32px)' : 'inset(0% 6% 0% 6% round 22px)');
  gsap.fromTo(fig, { clipPath: etroit }, { clipPath: 'inset(0% 0% 0% 0% round 32px)', ease: 'none',
    scrollTrigger: { trigger: fig, start: 'top 85%', end: 'bottom 40%', scrub: 0.6, invalidateOnRefresh: true } });
  const img = $('img', fig);
  gsap.fromTo(img, { scale: 1.12 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: fig, start: 'top 85%', end: 'bottom top', scrub: 0.6 } });
}

/* ---------- mise-au-point : les lettres du titre de l'hypnose se rangent, puis se dispersent un peu au défilement ---------- */
let lettresFocus = [], motsFocus = [];
function preparerFocus() {
  const h = $('[data-effet="mise-au-point"]');
  if (!h) return;
  const texte = h.textContent.trim();
  h.setAttribute('aria-label', texte);
  const conteneur = document.createElement('span');
  conteneur.setAttribute('aria-hidden', 'true');
  texte.split(/\s+/).forEach((mot, i, tous) => {
    const m = document.createElement('span'); m.className = 'focus-mot';
    [...mot].forEach((ch) => { const l = document.createElement('span'); l.className = 'focus-lettre'; l.textContent = ch; m.appendChild(l); });
    conteneur.appendChild(m);
    if (i < tous.length - 1) conteneur.appendChild(document.createTextNode(' '));
  });
  h.textContent = ''; h.appendChild(conteneur);
  lettresFocus = $$('.focus-lettre', h); motsFocus = $$('.focus-mot', h);
  if (!gsap) return;
  let x = 5;
  const alea = () => ((x = (x * 9301 + 49297) % 233280) / 233280 - 0.5);
  if (etat.arrivee !== 'retour') gsap.set(lettresFocus, { x: () => alea() * 70, y: () => alea() * 46, rotation: () => alea() * 40, opacity: 0.08 });
  if (ST) gsap.fromTo(motsFocus, { y: 0, opacity: 1 }, { y: (i) => (i % 2 ? -1 : 1) * (10 + i * 6), opacity: 0.55, ease: 'none',
    scrollTrigger: { trigger: h.closest('section'), start: 'top top', end: 'bottom top', scrub: 0.5 } });
}
const jouerFocus = (delai = 0) => lettresFocus.length && gsap.to(lettresFocus, { x: 0, y: 0, rotation: 0, opacity: 1, duration: 1.3, ease: 'expo.out', stagger: { each: 0.03, from: 'random' }, delay: delai });

/* ---------- choix : les deux portes du rendez-vous s'écartent doucement au défilement ---------- */
function choix() {
  const el = $('[data-effet="choix"]');
  if (!el || !gsap || !ST) return;
  const [a, b] = $$('.porte', el);
  const st = { trigger: el, start: 'top 70%', end: 'bottom top', scrub: true };
  gsap.fromTo(a, { y: 0 }, { y: -26, ease: 'none', scrollTrigger: st });
  gsap.fromTo(b, { y: 0 }, { y: 26, ease: 'none', scrollTrigger: { ...st } });
  const img = $('.porte-media img', el);
  if (img) gsap.fromTo(img, { scale: 1.12, yPercent: -4 }, { scale: 1.12, yPercent: 4, ease: 'none', scrollTrigger: { ...st, start: 'top bottom' } });
}

/* ---------- Calculateur de tarifs ---------- */
function calculateur() {
  const f = $('[data-calcul]');
  if (!f) return;
  const T = JSON.parse($('[data-calcul-donnees]', f).textContent);
  const prix = $('[data-calcul-prix]', f), detail = $('[data-calcul-detail]', f), sortie = $('[data-calcul-resultat]', f);
  const euros = (n) => `${n} €`;
  const p = new URLSearchParams(location.search).get('accompagnement');
  if (p) { const r = f.querySelector(`input[name="accompagnement"][value="${CSS.escape(p)}"]`); if (r) r.checked = true; }
  let affiche = 50;
  const majPrix = (n) => {
    if (!gsap || n == null) { prix.textContent = n == null ? '–' : euros(n); affiche = n ?? affiche; return; }
    const o = { v: affiche };
    gsap.to(o, { v: n, duration: 0.6, ease: 'power3.out', onUpdate: () => { prix.textContent = euros(Math.round(o.v)); } });
    gsap.fromTo(prix, { scale: 1.12 }, { scale: 1, duration: 0.5, ease: 'back.out(3)' });
    affiche = n;
  };
  const calculer = () => {
    const acc = f.accompagnement.value, prof = f.profil.value;
    const cle = acc === 'acouphenes' ? 'sophrologie' : acc;
    const ligne = T[cle].lignes.find((l) => l.profil === prof);
    if (!ligne) { majPrix(null); detail.textContent = sortie.dataset.nonPropose; return; }
    majPrix(ligne.prix);
    const morceaux = [T[cle].duree];
    if (acc === 'buck') morceaux.push(`${euros(ligne.prix * 6)} les 6 séances${prof === 'groupe' ? ' par personne' : ''}`);
    else if (acc === 'acouphenes') morceaux.push(`6 à 8 séances : de ${euros(ligne.prix * 6)} à ${euros(ligne.prix * 8)}${ligne.forfait ? `, ou ${euros(ligne.forfait)} les 10` : ''}`);
    else if (ligne.forfait) morceaux.push(`${euros(ligne.forfait)} les 10 séances, au lieu de ${euros(ligne.prix * 10)}`);
    if (prof === 'groupe') morceaux.push('par personne');
    detail.textContent = morceaux.join(' · ');
  };
  const lien = $('[data-calcul-lien]');
  const majLien = () => {};
  /* Lien vers la demande, sur la même page : l'accompagnement choisi est reporté dans le formulaire. */
  if (lien) lien.addEventListener('click', () => { const sel = $('#f-sujet'); if (sel) sel.value = f.accompagnement.value; });
  f.addEventListener('change', () => { calculer(); majLien(); });
  calculer(); majLien();
}

/* ---------- FAQ : ouverture et fermeture animées ---------- */
function faq() {
  if (!gsap) return;
  $$('details.faq-item').forEach((d) => {
    const s = $('summary', d), corps = $('p', d);
    if (!s || !corps) return;
    s.addEventListener('click', (e) => {
      e.preventDefault();
      if (d.dataset.anim) return;
      d.dataset.anim = '1';
      if (!d.open) {
        d.open = true;
        gsap.fromTo(corps, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.45, ease: 'power2.out', onComplete: () => { gsap.set(corps, { clearProps: 'height,opacity' }); delete d.dataset.anim; } });
      } else {
        gsap.to(corps, { height: 0, opacity: 0, duration: 0.35, ease: 'power2.in', onComplete: () => { d.open = false; gsap.set(corps, { clearProps: 'height,opacity' }); delete d.dataset.anim; } });
      }
    });
  });
}

/* ---------- Le mot « souffle » du titre respire (axe de graisse de Fraunces) ---------- */
function motQuiRespire() {
  const mot = $('.hero-titre em');
  if (!mot) return;
  mot.style.display = 'inline-block';
  mot.style.textAlign = 'center';
  mot.style.fontWeight = '500';
  const large = Math.ceil(mot.getBoundingClientRect().width);
  mot.style.minWidth = `${large}px`;
  mot.style.fontWeight = '';
  mot.setAttribute('data-effet', 'mot-souffle');
  boucle(mot, (dt, t) => { mot.style.fontWeight = String(Math.round(370 + 130 * souffleA(t))); });
}

/* ---------- Filtres des domaines (gardés dans l'adresse) ---------- */
function filtres() {
  const zone = $('[data-filtres]');
  if (!zone) return;
  const cartes = $$('.domaine'), annonce = $('[data-filtre-compte]');
  const appliquer = (f, anime = true) => {
    $$('[data-filtre]', zone).forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filtre === f)));
    const montrer = cartes.filter((c) => f === 'tous' || c.dataset.famille === f);
    cartes.forEach((c) => c.classList.toggle('cache', !montrer.includes(c)));
    if (anime && gsap) gsap.fromTo(montrer, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.45, stagger: 0.04, ease: 'power2.out', clearProps: 'transform,opacity' });
    if (annonce) annonce.textContent = annonce.dataset.filtreCompte.replace('{n}', montrer.length);
    const u = new URL(location.href);
    if (f === 'tous') u.searchParams.delete('domaine'); else u.searchParams.set('domaine', f);
    history.replaceState(history.state, '', u);
  };
  zone.addEventListener('click', (e) => { const b = e.target.closest('[data-filtre]'); if (b) appliquer(b.dataset.filtre); });
  const depart = new URLSearchParams(location.search).get('domaine');
  if (depart && $(`[data-filtre="${CSS.escape(depart)}"]`, zone)) appliquer(depart, false);
}

/* ---------- Premier écran : éléments animés par le projet ---------- */
const premiers = () => $$('main > section:first-child [data-anime="gsap"]');
function arriveePremierEcran(debut = 0) {
  if (!gsap) return;
  const lignes = $$('.hero-ligne');
  const autres = premiers().filter((e) => !e.classList.contains('hero-titre') && !e.classList.contains('medaillon'));
  const titre = $('.hero-titre');
  if (titre) {
    gsap.set(titre, { opacity: 1 });
    gsap.fromTo(lignes, { yPercent: 140 }, { yPercent: 0, duration: 1, stagger: 0.11, ease: 'expo.out', delay: debut });
  }
  gsap.fromTo(autres, { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.85, stagger: 0.08, ease: 'power3.out', delay: debut + 0.12 });
  const med = $('.medaillon');
  if (med) gsap.fromTo(med, { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.9, ease: 'back.out(1.8)', delay: debut + 0.5 });
  if (lettresFocus.length) jouerFocus(debut);
  const portes = $$('[data-effet="choix"] .porte');
  if (portes.length) gsap.fromTo(portes, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: debut + 0.25, clearProps: 'opacity' });
}

demarrer({
  preparer() {
    anneaux('[data-effet="souffle"]', 0.06);
    anneaux('[data-effet="souffle-appel"]', 0.09);
    respiration();
    etoiles();
    ondes();
    bandeau();
    preparerFocus();
    choix();
    calculateur();
    filtres();
    faq();
    motQuiRespire();
  },
  /* Intro, environ 2,4 s : le disque inspire, expire, puis glisse et grandit jusqu'à l'objet d'ouverture
     de la page ; le panneau s'ouvre en cercle depuis lui (versObjet). */
  jouer() {
    if (!gsap) return null;
    const disque = $('.intro-disque'), img = disque && $('img', disque);
    const anneauxIntro = $$('.intro-anneau'), motIn = $('.intro-mot--in'), motEx = $('.intro-mot--ex'), nom = $('.ouverture-nom');
    const tl = gsap.timeline({ defaults: { ease: 'sine.inOut' } });
    const A = 1.35, D = 0.45;
    /* Mesures avant toute transformation du disque. */
    const c = centreOuverture('[data-iris-centre]');
    const r = disque.getBoundingClientRect();
    const base = disque.offsetWidth || 150;
    const echelle = c.el ? borne((2 * c.r) / base, 0.4, 6) : 1;
    tl.fromTo(disque, { scale: 0.55 }, { scale: 1, duration: 0.9 }, 0.05)
      .fromTo(anneauxIntro, { scale: 0.6, opacity: 0 }, { scale: (i) => 1.35 + i * 0.3, opacity: 0.7, duration: 0.9, stagger: 0.08 }, 0.05)
      .fromTo(motIn, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.35 }, 0.12)
      .to(motIn, { opacity: 0, duration: 0.2 }, 0.85)
      .to(disque, { scale: 0.86, duration: 0.45 }, 0.95)
      .to(anneauxIntro, { scale: 1, opacity: 0, duration: 0.45 }, 0.95)
      .fromTo(motEx, { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.3 }, 1.0)
      .to([motEx, nom], { opacity: 0, duration: 0.2 }, A - 0.15)
      .to(disque, { x: c.x - (r.left + r.width / 2), y: c.y - (r.top + r.height / 2), scale: echelle, duration: D, ease: 'power3.inOut' }, A);
    if (img) tl.to(img, { opacity: 0, duration: 0.2 }, A);
    /* Le trou du panneau : objet factice, le disque est déplacé ci-dessus. */
    versObjet(tl, { a: A, duree: D, ouverture: 0.6, objet: document.createElement('i') });
    tl.call(() => arriveePremierEcran(0), null, A + D);
    return tl;
  },
  etatFinal() {
    if (!gsap) return;
    gsap.set([...premiers(), ...$$('.hero-ligne'), ...lettresFocus, ...$$('[data-effet="choix"] .porte')], { clearProps: 'transform,opacity' });
  },
  arrivee() { arriveePremierEcran(0.1); },
});
