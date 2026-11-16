# Maquette : Marianne Meyzen Récalde, sophrologue (Toulouse)

Maquette de présentation du futur site de www.sophrologue-toulouse.com, direction « Souffle ».
Adresse de la maquette : https://sophrologue-toulouse-maquette.vercel.app

## Pages de la v1
- Accueil `/`
- Les Amis de Buck `/les-amis-de-buck` (deuil animalier)
- Sophrologie `/sophrologie` (domaines, protocole acouphènes, séances, entreprise)
- Hypnose `/hypnose`
- Tarifs et rendez-vous `/rendez-vous` (calculateur, règlement, cabinet, demande)
- Page 404

Pages du site actuel non reprises en v1 (disponibles en v2) : « Actualités de nos compagnons » (revue de presse), page séparée « Comment se déroulent les séances ? » (son contenu est repris sur l'accueil et la page Sophrologie), les deux pages acouphènes (fusionnées dans la page Sophrologie).

## Fiche : ce que le client doit fournir
| Élément | Où | État |
|---|---|---|
| Mentions légales (éditeur, SIRET ou équivalent, assurance professionnelle) | pied de page | à compléter |
| Politique de confidentialité | pied de page et formulaire de demande | à compléter |
| Hébergeur : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis (adresse à vérifier au moment de la mise en ligne) | mentions légales | à compléter |
| Crédits : les images marquées « Illustration générée » ont été créées par IA (Grok) | mentions légales | à reporter |
| Photo de Buck : la photo du labrador noir (site actuel, page Deuil animalier) est-elle bien Buck ? Si oui, la légender « Buck » | Les Amis de Buck | à confirmer |
| Un vrai portrait en bonne définition (le portrait actuel vient d'une image de vidéo) | accueil | conseillé |
| Wellbee Space, 3 ter rue du Docteur Charcot, Plaisance-du-Touch : cité dans la description cachée de la page Tarifs, absent des pages. À afficher ou à retirer de la description | Tarifs et rendez-vous | à confirmer |
| Horaires précis des demi-journées (sinon pas d'indication « ouvert maintenant ») | partout | facultatif |
| Note et nombre d'avis Google (seul un lien est affiché) | accueil | facultatif |
| Textes complets des témoignages (Manon, Jeff, Christine C. sont repris en extraits) | Les Amis de Buck | facultatif |
| Liens exacts des deux vidéos (Toumaï Chroniques Animalières, Dr Leclerc) | Les Amis de Buck | facultatif |

Image Grok non utilisée : « buck-ouverture » (le chien y était collé dans un rectangle visible) ; l'ouverture de la page Les Amis de Buck utilise le ciel étoilé. À régénérer en v2 si l'on veut le chien.

Retiré ou remplacé faute d'information : l'étude de 2020 sur le score THI (promesse de résultat, non reprise par prudence), le chiffre de la note Google.

## Corrections apportées au contenu du site actuel
- La devise « Le changement est une porte qui ne s'ouvre que de l'intérieur » est citée avec son auteur, Tom Peters, comme sur la page Tarifs.
- Les textes qui n'existaient qu'en images (déroulé d'une séance, « ce que vous pourrez vivre », origine du mot sophrologie, parcours acouphènes) sont devenus du vrai texte, lisible et accessible.

## À la mise en ligne définitive
- Retirer : `noindex` (balise robots dans `source/gabarits/commun.mjs` et en-tête X-Robots-Tag dans `vercel.json`), le formulaire simulé (le brancher sur un vrai service d'envoi), les mentions « à compléter » du pied de page une fois les textes fournis.
- Garder : la mention « Illustration générée » sur chaque image créée par IA.

## Technique
Site statique (HTML, CSS, JavaScript), généré depuis `donnees/` par `node outils/generer.mjs`. Ne jamais modifier à la main les pages `.html` produites. Images : `plan-images.json` puis le pipeline de la bibliothèque (`produire.mjs`). Audit : `node _audit/audit.mjs` (rapport dans `_audit/rapport/rapport.md`).
