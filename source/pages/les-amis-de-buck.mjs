/* Les Amis de Buck : ouverture plein cadre (chien vers l'aube, étoiles qui s'éteignent), histoire de Buck,
   ce que vous pourrez vivre, le protocole, citations sous la nuit, témoignages, engagements, tarifs, appel. */
import { html } from '../../outils/gabarit.mjs';
import { appel } from '../gabarits/commun.mjs';
import { etoiles, guillemet } from '../gabarits/decor.mjs';

export const page = { cle: 'les-amis-de-buck', fichier: 'les-amis-de-buck', imagePartage: 'grok/buck-nuit-1280.webp' };

export default (c) => {
  const k = c.site.contact;
  const lienExt = (href, texte) => html`<a class="lien-fleche" href="${href}" target="_blank" rel="noopener">${texte} <span aria-hidden="true">↗</span><span class="visuellement-cache"> ${c.t('commun.nouvelOnglet')}</span></a>`;
  return html`
<section class="ouv-plein sombre" id="debut">
  ${c.media({ nom: 'grok/buck-nuit', alt: c.s('buck.hero.alt'), priorite: true, classe: 'ouv-plein-media', cadrage: '40% 60%', sizes: '100vw', attrs: 'data-fx="parallaxe" data-fx-force="10"' })}
  ${etoiles(60, 3)}
  <div class="conteneur ouv-plein-contenu">
    <img class="badge-buck badge-buck--grand" src="/assets/images/logo-amis-de-buck-240.webp" alt="" width="120" height="136" data-iris-centre>
    <p class="surtitre" data-anime="gsap">${c.t('buck.hero.surtitre')}</p>
    <h1 class="ouv-titre" data-anime="gsap">${c.tb('buck.hero.titre')}</h1>
    <p class="ouv-texte masque-ecran-tres-bas" data-anime="gsap">${c.t('buck.hero.texte')}</p>
    <div class="ouv-actions" data-anime="gsap">
      ${c.lien('rendez-vous', { ancre: 'demande', params: 'sujet=buck', classe: 'bouton bouton--clair', texte: c.t('buck.hero.action'), attrs: 'data-action-principale data-survol="magnetique"' })}
      <p class="ouv-info" data-info-cle>${c.t('buck.hero.info')}</p>
    </div>
  </div>
</section>

<section class="section histoire" id="histoire">
  <div class="conteneur histoire-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('buck.histoire.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('buck.histoire.titre')}</h2>
      <p class="chapo" data-anime>${c.t('buck.histoire.p1')}</p>
      <p data-anime>${c.t('buck.histoire.p2')}</p>
      <p data-anime>${c.t('buck.histoire.p3')}</p>
    </div>
    <div class="polaroid-zone">
      <figure class="polaroid" data-fx="vitesse" data-fx-force="5">
        ${c.media({ nom: 'chien-noir', alt: c.s('buck.histoire.photoAlt'), classe: 'polaroid-media', sizes: '(max-width: 760px) 70vw, 300px' })}
        <figcaption>${c.t('buck.histoire.photoLegende')}</figcaption>
      </figure>
      <img class="badge-buck badge-buck--flottant" src="/assets/images/logo-amis-de-buck-240.webp" alt="" width="110" height="125" loading="lazy" data-fx="vitesse" data-fx-force="8">
    </div>
  </div>
</section>

<section class="section vivre fond-ciel" id="vivre">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('buck.vivre.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('buck.vivre.titre')}</h2>
      <p class="chapo" data-anime>${c.t('buck.vivre.texte')}</p>
    </div>
    <ol class="vivre-liste" data-anime="cascade">
      ${c.donnees.vivre.map((v, i) => html`<li><span class="vivre-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span><span>${v}</span></li>`)}
    </ol>
  </div>
</section>

<section class="section protocole" id="protocole">
  <div class="conteneur protocole-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('buck.protocole.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('buck.protocole.titre')}</h2>
      <p class="chapo" data-anime>${c.t('buck.protocole.texte')}</p>
      <p data-anime>${c.t('buck.protocole.texte2')}</p>
      <ul class="chiffres-cles" data-anime="cascade">
        <li><strong><span data-compteur="6">6</span></strong> ${c.t('buck.protocole.c1')}</li>
        <li><strong>1 h 30</strong> ${c.t('buck.protocole.c2')}</li>
        <li><strong><span data-compteur="3">3</span></strong> ${c.t('buck.protocole.c3')}</li>
        <li><strong>${c.t('buck.protocole.c4Titre')}</strong> ${c.t('buck.protocole.c4')}</li>
      </ul>
      <p class="encart" data-anime>${c.t('buck.protocole.enfants')}</p>
    </div>
    ${c.media({ nom: 'grok/buck-souvenirs', alt: c.s('buck.protocole.souvenirsAlt'), classe: 'protocole-media', sizes: '(max-width: 760px) 100vw, 40vw', attrs: 'data-anime="rideau"' })}
  </div>
</section>

<section class="section citations sombre" id="citations">
  ${etoiles(50, 11)}
  <div class="conteneur citations-contenu">
    <blockquote class="citation-geante">
      <p data-anime="lignes">${c.t('buck.citations.lamartine')}</p>
      <footer data-anime>${c.t('buck.citations.lamartineAuteur')}</footer>
    </blockquote>
    <blockquote class="citation-petite" data-anime>
      <p>${c.t('buck.citations.racine')}</p>
      <footer>${c.t('buck.citations.racineAuteur')}</footer>
    </blockquote>
  </div>
</section>

<section class="section temoignages" id="temoignages">
  <div class="conteneur">
    <div class="tete-section">
      ${guillemet}
      <p class="surtitre" data-anime>${c.t('buck.temoignages.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('buck.temoignages.titre')}</h2>
    </div>
    <p class="glisser" aria-hidden="true">${c.t('commun.glisser')}</p>
    <div class="rangee" data-galerie tabindex="0" role="region" aria-label="${c.s('buck.temoignages.surtitre')}">
    <ul class="avis avis--mur" data-anime="cascade">
      ${c.donnees.temoignages.filter((x) => !['lea', 'jean-baptiste'].includes(x.cle)).map((x) => html`<li class="avis-carte"><blockquote><p>${x.texte}</p><footer><strong>${x.nom}</strong>${x.cle === 'philippe' ? html` · ${x.sujet}` : ''}</footer></blockquote></li>`)}
    </ul>
    </div>
  </div>
</section>

<section class="section engagements fond-ciel" id="engagements">
  <div class="conteneur">
    <div class="tete-section">
      <p class="surtitre" data-anime>${c.t('buck.engagements.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('buck.engagements.titre')}</h2>
    </div>
    <ul class="engag-grille" data-anime="cascade">
      <li class="engag"><span class="engag-icone" aria-hidden="true">♥</span><h3>${c.t('buck.engagements.bardot')}</h3><p>${c.t('buck.engagements.bardotTexte')}</p>${lienExt('https://www.fondationbrigittebardot.fr/', c.t('buck.engagements.visiter'))}</li>
      <li class="engag"><span class="engag-icone" aria-hidden="true">♥</span><h3>${c.t('buck.engagements.trente')}</h3><p>${c.t('buck.engagements.trenteTexte')}</p>${lienExt('https://www.30millionsdamis.fr/', c.t('buck.engagements.visiter'))}</li>
      <li class="engag"><span class="engag-icone" aria-hidden="true">▶</span><h3>${c.t('buck.engagements.toumai')}</h3><p>${c.t('buck.engagements.toumaiTexte')}</p></li>
      <li class="engag"><span class="engag-icone" aria-hidden="true">✚</span><h3>${c.t('buck.engagements.acacias')}</h3><p>${c.t('buck.engagements.acaciasTexte')}</p>${lienExt('https://clinique-veterinaire-acacias.com/comment-faire-deuil-animal-compagnie/', c.t('buck.engagements.lireArticle'))}</li>
    </ul>
    <p class="centre" data-anime>${lienExt(k.facebook, c.t('buck.engagements.suivre'))}</p>
  </div>
</section>

<section class="section tarifs-bloc" id="tarifs">
  <div class="conteneur tarifs-bloc-grille">
    <div>
      <p class="surtitre" data-anime>${c.t('buck.tarifs.surtitre')}</p>
      <h2 data-anime="lignes">${c.tb('buck.tarifs.titre')}</h2>
      <p class="note" data-anime>${c.t('buck.tarifs.note')}</p>
      <p data-anime>${c.lien('rendez-vous', { ancre: 'tarifs', params: 'accompagnement=buck', classe: 'lien-fleche', texte: c.t('commun.voirTarifs') })}</p>
    </div>
    <table class="table-prix" data-anime>
      <caption class="visuellement-cache">${c.donnees.tarifs.buck.nom}</caption>
      <tbody>${c.donnees.tarifs.buck.lignes.map((l) => html`<tr><th scope="row">${l.libelle}</th><td data-prix>${l.prix} €</td></tr>`)}</tbody>
    </table>
  </div>
</section>

${appel(c)}
`;
};
