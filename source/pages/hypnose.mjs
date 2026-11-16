/* Hypnose : ouverture scindée inversée (voilage dans une arche à droite, titre qui se met au point),
   idée reçue, six raisons de venir, en pratique, appel. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/commun.mjs';

export const page = { cle: 'hypnose', fichier: 'hypnose', imagePartage: 'grok/hypnose-ouverture-1280.webp' };

export default (c) => html`
<section class="ouv-arche" id="debut">
  <div class="conteneur ouv-arche-grille">
    <div class="ouv-arche-texte">
      <p class="surtitre" data-anime="gsap">${c.t('hypnose.hero.surtitre')}</p>
      <h1 class="ouv-titre ouv-titre--focus" data-effet="mise-au-point" data-grille="typo">${c.t('hypnose.hero.titre')}</h1>
      <p class="ouv-texte masque-ecran-tres-bas" data-anime="gsap">${c.t('hypnose.hero.texte')}</p>
      <div class="ouv-actions" data-anime="gsap">
        ${c.lien('rendez-vous', { ancre: 'demande', params: 'sujet=hypnose', classe: 'bouton', texte: c.t('hypnose.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
        <p class="ouv-info" data-info-cle>${c.t('hypnose.hero.info')}</p>
      </div>
    </div>
    <div class="arche">
      ${c.media({ nom: 'grok/hypnose-ouverture', alt: c.s('hypnose.hero.alt'), priorite: true, classe: 'arche-media', cadrage: '62% 50%', sizes: '(max-width: 760px) 90vw, 42vw', attrs: 'data-fx="parallaxe" data-fx-force="8" data-iris-centre' })}
      <span class="arche-trait" aria-hidden="true"></span>
    </div>
  </div>
</section>

<section class="section idees fond-ciel" id="idees">
  <div class="conteneur idees-grille">
    ${c.media({ nom: 'grok/carte-hypnose', alt: c.s('hypnose.idees.alt'), classe: 'idees-media', sizes: '(max-width: 760px) 100vw, 34vw', attrs: 'data-anime="rideau"' })}
    <div>
      <p class="surtitre" data-anime>${c.t('hypnose.idees.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('hypnose.idees.titre')}</h2>
      <div class="avant-apres" data-anime="cascade">
        <div class="avant"><p class="surtitre">${c.t('hypnose.idees.onImagine')}</p><p>${c.t('hypnose.idees.onImagineTexte')}</p></div>
        <div class="apres"><p class="surtitre">${c.t('hypnose.idees.enRealite')}</p><p>${c.t('hypnose.idees.enRealiteTexte')}</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section indications" id="indications">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('hypnose.indications.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('hypnose.indications.titre')}</h2>
    </div>
    <ol class="indic-grille" data-anime="cascade">
      ${c.donnees.indications.map((x, i) => html`<li class="indic" data-survol="incline" data-survol-force="4"><span class="indic-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><h3>${x.titre}</h3><p>${x.texte}</p></li>`)}
    </ol>
  </div>
</section>

<section class="section pratique-hyp sombre" id="pratique">
  <div class="conteneur pratique-hyp-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('hypnose.pratique.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('hypnose.pratique.titre')}</h2>
      <p data-anime>${c.t('hypnose.pratique.texte')}</p>
      <p data-anime>${c.lien('rendez-vous', { ancre: 'demande', params: 'sujet=hypnose', classe: 'bouton bouton--clair', texte: c.t('hypnose.pratique.action') })}</p>
    </div>
    <ul class="chiffres-cles chiffres-cles--clair" data-anime="cascade">
      <li><strong>${c.t('hypnose.pratique.duree')}</strong> ${c.t('hypnose.pratique.dureeTexte')}</li>
      <li data-prix><strong><span data-compteur="60">60</span></strong> ${c.t('hypnose.pratique.prixTexte')}</li>
      <li data-prix><strong><span data-compteur="40">40</span></strong> ${c.t('hypnose.pratique.reduitTexte')}</li>
    </ul>
  </div>
  <svg class="ronds" viewBox="0 0 400 400" aria-hidden="true" data-fx="trace"><path d="M200 172 a28 28 0 1 1 -0.1 0 M200 144 a56 56 0 1 1 -0.1 0 M200 112 a88 88 0 1 1 -0.1 0 M200 76 a124 124 0 1 1 -0.1 0 M200 36 a164 164 0 1 1 -0.1 0" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
</section>

${appel(c)}
`;
