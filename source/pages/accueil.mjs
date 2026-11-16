/* Accueil : le souffle. Ouverture scindée (titre, grand cercle qui respire), quatre accompagnements,
   exercice de respiration, Les Amis de Buck sous un ciel qui s'étoile, acouphènes (onde qui s'apaise),
   déroulé d'une séance, qui je suis, témoignages, tarifs et lieux, appel final. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/commun.mjs';
import { etoiles, guillemet } from '../gabarits/decor.mjs';

export const page = { cle: 'accueil', fichier: 'index', imagePartage: 'grok/accueil-souffle-1280.webp' };



export default (c) => {
  const k = c.site.contact;
  const t = c.donnees.tarifs;
  return html`
<section class="hero" id="debut">
  <div class="hero-texte">
    <p class="surtitre hero-sur" data-anime="gsap">${c.t('accueil.hero.surtitre')}</p>
    <h1 class="hero-titre" data-anime="gsap">
      <span class="ligne-masque"><span class="hero-ligne">${c.tb('accueil.hero.titre1')}</span></span>
      <span class="ligne-masque"><span class="hero-ligne">${c.tb('accueil.hero.titre2')}</span></span>
      <span class="ligne-masque"><span class="hero-ligne">${c.tb('accueil.hero.titre3')}</span></span>
    </h1>
    <p class="hero-intro masque-ecran-tres-bas" data-anime="gsap">${c.t('accueil.hero.texte')}</p>
    <div class="hero-actions" data-anime="gsap">
      ${c.lien('rendez-vous', { ancre: 'choisir', classe: 'bouton', texte: c.t('accueil.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <a class="bouton bouton--contour" href="#accompagnements">${c.t('accueil.hero.action2')}</a>
    </div>
    <p class="hero-info" data-info-cle data-anime="gsap"><span class="point-vert" aria-hidden="true"></span>${c.t('accueil.hero.info')}</p>
  </div>
  <div class="hero-visuel">
    <div class="souffle" data-effet="souffle" aria-hidden="true"><span></span><span></span><span></span></div>
    ${c.media({ nom: 'grok/accueil-souffle', alt: c.s('accueil.hero.alt'), priorite: true, classe: 'souffle-media', sizes: '(max-width: 760px) 80vw, 42vw', attrs: 'data-iris-centre="disque"' })}
    <figure class="medaillon" data-anime="gsap">
      ${c.media({ nom: 'marianne', alt: c.s('accueil.qui.alt'), cadrage: '50% 30%', classe: 'medaillon-media', sizes: '120px' })}
      <figcaption>${c.t('accueil.hero.nom')}</figcaption>
    </figure>
  </div>
</section>

<section class="section accompagnements" id="accompagnements">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('accueil.accompagnements.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.accompagnements.titre')}</h2>
      <p class="chapo" data-anime>${c.t('accueil.accompagnements.texte')}</p>
    </div>
    <p class="glisser" aria-hidden="true">${c.t('commun.glisser')}</p>
    <div class="rangee" data-galerie tabindex="0" role="region" aria-label="${c.s('accueil.accompagnements.surtitre')}">
    <ul class="cartes-acc" data-anime="cascade">
      ${c.donnees.accompagnements.map((a) => html`<li class="carte-acc" data-survol="incline" data-survol-force="4">
        <a href="${c.url(a.page, a.ancre)}" data-libelle="${c.libelle(a.page)}" class="carte-acc-lien">
          ${c.media({ nom: a.image, alt: a.alt, classe: 'carte-acc-media', sizes: '(max-width: 760px) 86vw, (max-width: 1100px) 45vw, 22vw', attrs: 'data-fx="zoom"' })}
          <span class="carte-acc-corps">
            <span class="surtitre">${a.surtitre}</span>
            <span class="carte-acc-titre">${a.titre}</span>
            <span class="carte-acc-texte">${a.texte}</span>
            <span class="carte-acc-repere">${a.repere}</span>
            <span class="carte-acc-plus">${c.t('accueil.accompagnements.lien')} <span aria-hidden="true">→</span></span>
          </span>
        </a>
      </li>`)}
    </ul>
    </div>
  </div>
</section>

<section class="section respirer fond-ciel" id="respirer">
  <div class="conteneur respirer-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('accueil.respirer.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.respirer.titre')}</h2>
      <p data-anime>${c.t('accueil.respirer.texte')}</p>
      <blockquote class="petite-citation" data-anime><p>${c.t('accueil.respirer.citation')}</p></blockquote>
      <p class="note" data-anime>${c.t('accueil.respirer.note')}</p>
    </div>
    <div class="respiration" data-effet="respiration" data-grille="manipuler" data-repos="${c.s('accueil.respirer.repos')}" data-inspirez="${c.s('commun.inspirez')}" data-expirez="${c.s('commun.expirez')}" data-fini="${c.s('accueil.respirer.fini')}" data-cycle="${c.s('accueil.respirer.cycle')}">
      <div class="respiration-cercle" aria-hidden="true" data-visuel><span class="respiration-halo"></span><span class="respiration-disque"></span></div>
      <p class="respiration-consigne" aria-live="polite"><span data-consigne>${c.t('accueil.respirer.repos')}</span><small data-compte>&nbsp;</small></p>
      <button type="button" class="bouton respiration-bouton" data-commencer="${c.s('accueil.respirer.commencer')}" data-arreter="${c.s('accueil.respirer.arreter')}" aria-pressed="false">${c.t('accueil.respirer.commencer')}</button>
    </div>
  </div>
</section>

<section class="section buck-bande sombre" id="amis-de-buck">
  ${c.media({ nom: 'grok/buck-nuit', alt: '', classe: 'buck-bande-fond', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="8"' })}
  ${etoiles(70, 7)}
  <div class="conteneur buck-bande-grille">
    <div class="buck-bande-texte">
      <img class="badge-buck" src="/assets/images/logo-amis-de-buck-240.webp" alt="${c.s('accueil.buck.logoAlt')}" width="96" height="109" loading="lazy" data-anime>
      <p class="surtitre" data-anime>${c.t('accueil.buck.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.buck.titre')}</h2>
      <p data-anime>${c.t('accueil.buck.texte')}</p>
      <p data-anime>${c.lien('les-amis-de-buck', { classe: 'bouton bouton--clair', texte: c.t('accueil.buck.action'), attrs: 'data-survol="magnetique"' })}</p>
    </div>
    <div class="buck-bande-cote">
      <ul class="points-buck" data-anime="cascade">
        <li>${c.t('accueil.buck.point1')}</li>
        <li>${c.t('accueil.buck.point2')}</li>
        <li>${c.t('accueil.buck.point3')}</li>
        <li>${c.t('accueil.buck.point4')}</li>
      </ul>
      <blockquote class="citation-nuit" data-anime>
        <p>${c.t('accueil.buck.citation')}</p>
        <footer>${c.t('accueil.buck.auteur')}</footer>
      </blockquote>
    </div>
  </div>
</section>

<section class="section acouphenes" id="acouphenes">
  <div class="conteneur acouphenes-grille">
    <div class="acouphenes-texte">
      <p class="surtitre" data-anime>${c.t('accueil.acouphenes.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.acouphenes.titre')}</h2>
      <p data-anime>${c.t('accueil.acouphenes.texte')}</p>
      <p class="grand-chiffre" data-anime><strong><span data-compteur="8">8</span> ${c.t('accueil.acouphenes.chiffreUnite')}</strong> ${c.t('accueil.acouphenes.chiffreTexte')}</p>
      <p class="note" data-anime>${c.t('accueil.acouphenes.complement')}</p>
      <p data-anime>${c.lien('sophrologie', { ancre: 'acouphenes', classe: 'bouton bouton--contour', texte: c.t('accueil.acouphenes.action') })}</p>
    </div>
    ${c.media({ nom: 'grok/acouphenes-eau', alt: c.s('sophro.acouphenes.alt'), classe: 'acouphenes-media', sizes: '(max-width: 760px) 100vw, 55vw', attrs: 'data-anime="rideau"' })}
  </div>
  <svg class="onde" viewBox="0 0 1200 160" preserveAspectRatio="none" aria-hidden="true" data-effet="onde-apaisee"><path d="M0 80 L1200 80"/><path class="onde-2" d="M0 80 L1200 80"/></svg>
</section>

<section class="section seance fond-ciel" id="seance">
  <div class="conteneur seance-grille">
    <div class="seance-tete">
      <p class="surtitre" data-anime>${c.t('accueil.seance.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.seance.titre')}</h2>
      <div class="durees" data-anime="cascade">
        <p><strong>${c.t('accueil.seance.duree1')}</strong> ${c.t('accueil.seance.duree1Texte')}</p>
        <p><strong>${c.t('accueil.seance.duree2')}</strong> ${c.t('accueil.seance.duree2Texte')}</p>
      </div>
      ${c.media({ nom: 'grok/seance-eau', alt: c.s('sophro.techniques.alt'), classe: 'seance-media masque-ecran-tres-bas', sizes: '(max-width: 760px) 100vw, 30vw', attrs: 'data-fx="parallaxe"' })}
    </div>
    <div class="temps">
      <svg class="temps-fil" viewBox="0 0 4 600" preserveAspectRatio="none" aria-hidden="true" data-visuel data-fx="trace"><path d="M2 0 V600" fill="none" stroke="currentColor" stroke-width="2"/></svg>
      <ol class="temps-liste" data-anime="cascade">
        ${c.donnees.seance.map((e, i) => html`<li><span class="temps-num" aria-hidden="true">${i + 1}</span><h3>${e.titre}</h3><p>${e.texte}</p></li>`)}
      </ol>
      <p class="note" data-anime>${c.t('accueil.seance.secret')}</p>
    </div>
  </div>
</section>

<section class="section qui" id="qui">
  <div class="conteneur qui-grille">
    <div class="qui-portrait">
      ${c.media({ nom: 'marianne', alt: c.s('accueil.qui.alt'), cadrage: '50% 30%', classe: 'qui-media', sizes: '(max-width: 760px) 70vw, 28vw', attrs: 'data-anime="rideau"' })}
      <span class="qui-cercle" aria-hidden="true" data-fx="vitesse" data-fx-force="4"></span>
    </div>
    <div>
      <p class="surtitre" data-anime>${c.t('accueil.qui.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.qui.titre')}</h2>
      <p class="chapo" data-anime>${c.t('accueil.qui.texte')}</p>
      <ul class="formations" data-anime="cascade">
        ${[1, 2, 3, 4].map((n) => html`<li><strong>${c.t(`accueil.qui.f${n}Titre`)}</strong><span>${c.t(`accueil.qui.f${n}Texte`)}</span></li>`)}
      </ul>
      <p class="engagements" data-anime><span aria-hidden="true">♥</span> ${c.t('accueil.qui.engagements')}</p>
    </div>
  </div>
</section>

<section class="section temoignages" id="temoignages">
  <div class="conteneur">
    <div class="tete-section">
      ${guillemet}
      <p class="surtitre" data-anime>${c.t('accueil.temoignages.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.temoignages.titre')}</h2>
    </div>
    <p class="glisser" aria-hidden="true">${c.t('commun.glisser')}</p>
    <div class="rangee" data-galerie tabindex="0" role="region" aria-label="${c.s('accueil.temoignages.surtitre')}">
    <ul class="avis" data-anime="cascade">
      ${c.donnees.temoignages.filter((x) => ['lea', 'jean-baptiste', 'victoria', 'michel'].includes(x.cle)).map((x) => html`<li class="avis-carte"><blockquote><p>${x.texte}</p><footer><strong>${x.nom}</strong> · ${x.sujet}</footer></blockquote></li>`)}
    </ul>
    </div>
    <p class="centre" data-anime><a class="lien-fleche" href="${k.avis}" target="_blank" rel="noopener">${c.t('accueil.temoignages.avis')} <span aria-hidden="true">↗</span><span class="visuellement-cache"> ${c.t('commun.nouvelOnglet')}</span></a></p>
  </div>
</section>

<section class="section pratique fond-ciel" id="pratique">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('accueil.pratique.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('accueil.pratique.titre')}</h2>
    </div>
    <ul class="prix-tuiles" data-anime="cascade">
      <li><span class="prix-nom">${c.t('accueil.pratique.sophro')}</span><strong class="prix" data-prix><span data-compteur="${t.sophrologie.lignes[0].prix}">${t.sophrologie.lignes[0].prix}</span> €</strong><span>${c.t('commun.parSeance')}, ${c.t('accueil.pratique.sophroDetail')}</span></li>
      <li><span class="prix-nom">${c.t('accueil.pratique.buck')}</span><strong class="prix" data-prix><span data-compteur="${t.buck.lignes[0].prix}">${t.buck.lignes[0].prix}</span> €</strong><span>${c.t('commun.parSeance')}, ${c.t('accueil.pratique.buckDetail')}</span></li>
      <li><span class="prix-nom">${c.t('accueil.pratique.hypnose')}</span><strong class="prix" data-prix><span data-compteur="${t.hypnose.lignes[0].prix}">${t.hypnose.lignes[0].prix}</span> €</strong><span>${c.t('commun.parSeance')}, ${c.t('accueil.pratique.hypnoseDetail')}</span></li>
    </ul>
    <div class="lieux" data-anime="cascade">
      <div class="lieu">
        ${c.media({ nom: 'cabinet', alt: c.s('rdv.cabinet.photoAlt'), classe: 'lieu-media', sizes: '(max-width: 760px) 90vw, 20vw' })}
        <div><h3>${c.t('accueil.pratique.cabinetTitre')}</h3><p>${c.t('accueil.pratique.cabinetTexte')}</p></div>
      </div>
      <div class="lieu lieu--ligne">
        <span class="lieu-icone" aria-hidden="true"><svg viewBox="0 0 48 48"><rect x="6" y="10" width="36" height="24" rx="4" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M18 40h12M24 34v6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><circle cx="24" cy="22" r="5" fill="currentColor"/></svg></span>
        <div><h3>${c.t('accueil.pratique.ligneTitre')}</h3><p>${c.t('accueil.pratique.ligneTexte')}</p></div>
      </div>
    </div>
    <p class="centre" data-anime>${c.lien('rendez-vous', { classe: 'bouton', texte: c.t('accueil.pratique.action'), attrs: 'data-survol="magnetique"' })}</p>
  </div>
</section>

${appel(c)}
`;
};
