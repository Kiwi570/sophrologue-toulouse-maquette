# Plans de la v1 : direction Souffle

Palette : fond #F4F5F2, second fond bleu souffle #DCE7EC, sombre bleu-violet nuit #2A2740 (celui du logo), texte #1E1D2B, accent violette de Toulouse #6A47A3. Titres Fraunces (SOFT 100, un mot en italique violet), texte Figtree.
Fonds : clair dominant ; bleu souffle pour « Respirez », « Comment se passe une séance » et les tarifs ; sombre pour Les Amis de Buck (ciel étoilé) et le pied de page. Voile de transition en iris (le cercle du souffle), bleu-violet nuit, logo et nom de la page.

## Plan du site (v1)
| Page | Ouverture | Sections |
|---|---|---|
| Accueil `/` | Scindée : grand titre à gauche, grand cercle qui respire à droite (ciel), médaillon portrait | Ce que j'accompagne (4 grandes cartes) · Respirez une minute avec moi · Les Amis de Buck (nuit étoilée) · Acouphènes (lac, onde) · Comment se passe une séance (6 temps) · Qui je suis (portrait, formations, engagements) · Ils en parlent (témoignages) · Tarifs en bref et lieux · Appel final (aube, devise) |
| Les Amis de Buck `/les-amis-de-buck` | Plein cadre : chien qui court vers l'aube, titre à gauche, étoiles qui s'allument | L'histoire de Buck · Ce que vous pourrez vivre (6 points) · Le protocole (6 séances, 3 mois, premier échange offert) · Pour les enfants · Citation Lamartine · Témoignages (6) · Engagements et médias · Tarifs du protocole · Appel |
| Sophrologie `/sophrologie` | Grand titre puis bandeau panoramique qui s'ouvre (collines à l'aube) | Le mental en harmonie avec le corps (Caycedo, sôs-phren-logos) · Trois techniques (relaxation dynamique, respiration, visualisation) · 11 domaines (filtres) · Protocole acouphènes (onde, parcours pluridisciplinaire) · Déroulé d'une séance · Ateliers en entreprise · Témoignage · Tarifs · Appel |
| Hypnose `/hypnose` | Scindée inversée : voilage à droite, titre « Dialogue avec l'inconscient » qui se met au point | Ce n'est pas dormir · Pour quoi venir (5 indications) · En pratique (1 h 30, 60 € / 40 €, seule ou avec la sophrologie) · Appel |
| Tarifs et rendez-vous `/rendez-vous` | Prix d'appel en très grand + deux choix « En cabinet » / « En ligne » | Choisir sa séance (cabinet : agenda en ligne ; en ligne : téléphone) · Tarifs avec calculateur (accompagnement × profil → séance, forfait) · Règlement et mutuelle · Le cabinet (photo, plan dessiné, accès, parking) · Demande de rendez-vous (formulaire simulé, choix prérempli) · Questions pratiques |
| 404 | Porte ouverte sur un jardin | Retour à l'accueil |

## Plan d'animation
**Intro (≈ 2,3 s), à chaque arrivée et rechargement** : 0 s fond bleu-violet nuit, petit disque clair au centre ; 0,5 s le disque inspire (grandit, deux anneaux s'écartent), le mot « Inspirez » apparaît en dessous ; 1 s le logo se dessine dans le disque ; 1,5 s le disque expire légèrement, « Expirez » remplace « Inspirez » ; 2 s le disque glisse vers le cercle de la page (versObjet) et le panneau s'ouvre en cercle sur lui ; le titre monte ligne à ligne pendant l'ouverture. Clic : accélère, second clic : passe.

**Effets propres** (data-effet) :
- `souffle` : le grand cercle de l'ouverture respire en continu (anneaux 4 s / 6 s), et son image se resserre au défilement.
- `respiration` : module « Respirez une minute avec moi » : cercle guide (inspirez 4 s, expirez 6 s), bouton Commencer / Arrêter, compte des cycles ; au repos il respire doucement.
- `etoiles` : étoiles qui s'allument une à une au défilement sur le ciel de Buck (accueil) et à l'ouverture de la page Buck.
- `onde-apaisee` : une onde sonore agitée qui s'apaise en ligne douce à mesure qu'on descend dans la section acouphènes.
- Ouvertures : `bandeau-ouvre` (Sophrologie), `mise-au-point` (Hypnose : lettres dispersées qui se rangent), `choix` (Rendez-vous : les deux cartes glissent l'une vers l'autre).

**Bibliothèque** : titres en lignes, cascade des cartes, parallaxe et zoom des images, rideau sur les photos, trace du fil des 6 temps de séance, compteurs (8 millions, 6 séances…), magnétique et inclinaison au survol.

## Plan des images
Vraies images : logo (et sa version claire, tirés du site), logo Les Amis de Buck, portrait (image de vidéo recadrée, en médaillon et en moyen), labrador noir (en vignette, Buck à confirmer), cabinet (en moyen, page rendez-vous). Écartées : banques d'images, vignettes YouTube, visuels avec texte.
Grok (20 fichiers, document `_suivi/sophrologue-toulouse-images-grok.docx`) : cercle du souffle, 4 cartes d'accompagnement, ciel de Buck, lac des acouphènes, verre d'eau, aube de l'appel final, ouvertures Buck / Sophrologie / Hypnose / Rendez-vous (ordinateur et téléphone), souvenirs (collier), salle de réunion, porte de la 404.
