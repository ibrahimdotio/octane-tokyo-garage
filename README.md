# Octane — Tokyo, Drift.

[Ouvrir le site](https://ibrahimdotio.github.io/octane-tokyo-garage/)

## Déploiement

La branche `main` contient les sources et la branche `gh-pages` contient uniquement le site compilé issu de `dist`. GitHub Pages publie automatiquement chaque mise à jour de `gh-pages`, avec la source réglée sur cette branche et le dossier `/`. Tous les chemins des assets restent relatifs, pour fonctionner sous l’URL du dépôt. Le code et les modèles 3D sont hébergés dans le dépôt, sans lecteur externe.

Installation et build : `npm ci && npm run build`.

Après modification : reconstruire avec `npm run build`, enregistrer les changements dans un commit sur `main`, envoyer `main` avec `git push`, puis publier les fichiers compilés avec `npm run publish:pages`. Cette publication fonctionne avec les permissions GitHub actuelles et ne demande aucun secret supplémentaire.

Prototype complet du parcours Octane, dans la direction C nocturne épurée : choix d’une voiture, carte des parcours avec aperçu vidéo, date et passagers, récapitulatif et paiement de démonstration, puis itinéraire à télécharger. Français et anglais. HTML, CSS et JavaScript avec Three.js ; les assets publics sont dans `dist`. `npm ci && npm run build` reconstruit le viewer depuis `src/car-experience.js`.

Les quatre voitures (Skyline R34, GT-R R35, GR Supra et AE86) partagent le même viewer natif. Leur illustration initiale reste affichée pendant le chargement différé de Three.js et du seul modèle sélectionné. Une bande de maillage issue du modèle progresse du nez vers l’arrière, puis laisse la place au rendu 3D, sans ligne lumineuse. Le survol ajoute un léger mouvement horizontal ; le glissement conserve l’angle choisi. Les flèches tournent le modèle et Home restaure sa pose. Les modèles déjà chargés sont gardés en mémoire et chaque voiture retrouve son angle. Aucun lecteur externe, iframe ou badge n’est utilisé.

Le chargement commence après celui de la page, pendant une période inactive du navigateur. Le mode d’économie de données, une panne WebGL ou une erreur de chargement conservent la photo. La réduction des animations désactive le balayage et le suivi de la souris. Le rendu fonctionne à la demande, s’arrête hors du garage ou lorsque la page est masquée, et le ratio de pixels est limité à 2. La Supra a été simplifiée de 625 664 à 326 372 triangles et de 26,46 à 9,73 Mo, avec ses normales et matériaux conservés.

Les peintures utilisent des teintes sRGB et un vernis distinct du métal. Une lumière neutre et un tone mapping Neutral préservent les couleurs. L’environnement de réflexion est lié à chaque matériau : son intensité est réglée séparément pour la peinture, les vitres, les jantes et le caoutchouc, sans être remplacée par le réglage global de la scène.

Les vitres de l’habitacle sont opaques et écrivent dans le tampon de profondeur : le réglage désactivé par GLTFLoader pour les matériaux BLEND est restauré, afin que les feux arrière ne soient plus dessinés par-dessus les fenêtres. Les feux restent visibles depuis l’arrière. Le garage est suggéré par une lumière diffuse et une zone de lumière au sol en CSS, sans média supplémentaire ni animation permanente.

Une fiche sous la voiture présente moteur, cylindrée, puissance et transmission. Elle suit le modèle sélectionné et la langue. Le lien « specs d’origine » indique le millésime et ouvre la source constructeur. Ces valeurs représentent des versions de série de référence, pas les puissances des voitures préparées d’Octane ; elles devront être remplacées par les données confirmées de la flotte avant son lancement commercial. Les puissances PS/ch sont métriques ; celle de l’AE86 est le chiffre historique brut de 130 PS.

Les modèles publics servent de prototype : peinture, roues, cadrage et éclairage sont adaptés. Leurs géométries ne correspondent pas exactement aux illustrations initiales ou aux voitures d’Octane. Pour un raccord réellement identique et une utilisation commerciale, confirmer la flotte et produire des visuels à partir des modèles définitifs.

Le choix du parcours reste dans le site. La carte de Tokyo est une maquette illustrée, avec un trajet et une zone éclairés ; une petite fenêtre montre la vidéo nocturne du site actuel d’Octane. Les trois choix utilisent des passages différents de cette même vidéo, et ne prétendent pas être des films propres à chaque parcours. Tokyo Bay et City Lights sont des propositions de parcours.

Le calendrier propose des créneaux de démonstration, des horaires locaux JST, des départs complets et des limites de passagers selon la voiture. Les sélections, prix et coordonnées sont conservés en mémoire lors des retours et changements de langue. Les totaux sont indicatifs, en JPY. Aucun créneau réel n’est interrogé, aucune réservation n’est créée, aucun paiement n’est prélevé et aucun e-mail n’est envoyé. Le formulaire ne demande aucune donnée bancaire et ne transmet ni ne stocke les coordonnées. Le fichier calendrier est marqué provisoire. L’itinéraire propose ensuite un lien vers Octane pour une réservation réelle.

La mise en production de réservations exige l’intégration du fournisseur d’Octane, ses tarifs, disponibilités, limites de passagers, règles d’annulation et moyens de paiement autorisés.

Pour prévisualiser : `python3 -m http.server 4173 --directory dist`, puis ouvrir `http://127.0.0.1:4173/`.

## Sources des éléments visuels

- Logo officiel : https://octane-team.com/brand/octane-text-white.png
- Les quatre illustrations initiales et la maquette de Tokyo ont été générées pour cette proposition.
- Vidéo nocturne : vidéo de fond du site https://octane-team.com/, récupérée à la demande de l’utilisateur ; appartient à Octane et à ses ayants droit.
- Corps du texte : Manrope, SIL OFL 1.1, issue des assets du site Octane.
- Titre : Russo One de Jovanny Lemonad, SIL OFL 1.1. La conversion WOFF2 porte le nom interne Octane Display. Licences dans `dist/assets/fonts`.
- R34 : [Nissan Skyline R34 GT-R](https://sketchfab.com/3d-models/nissan-skyline-r34-gt-r-ff8fb2251dfa4bb9979e7022c5a6666c), Lexyc16, CC BY 4.0.
- R35 : [Custom 2017 Nissan GTR](https://sketchfab.com/3d-models/custom-2017-nissan-gtr-a79151120b524854a958ce46a3b064a8), Socksthecat, CC BY 4.0.
- Supra : [Toyota GR Supra](https://sketchfab.com/3d-models/toyota-gr-supra-86f609515557438e93bd3c6145ef99ca), 3dmodels.cars (anciennement Rtag63), CC BY 4.0. Simplification, peinture et finitions adaptées.
- AE86 : [Toyota Corolla AE86 Trueno](https://sketchfab.com/3d-models/toyota-corolla-ae86-trueno-fe02fba6302e450ea8424591493341ea), Lexyc16, CC BY 4.0.
- GLB issus de la distribution publique [Objaverse](https://huggingface.co/datasets/allenai/objaverse). Crédits complets et modifications dans `dist/assets/models/CREDITS.txt`, accessible depuis « How it works ».
- Three.js : licence MIT incluse dans `dist/assets/models/THREE-LICENSE.txt`.
- Référence de marque : https://www.instagram.com/octane_tokyo/

## Références des fiches voitures

- Skyline R34 : [Nissan Heritage — 2000 GT-R V·spec II](https://www.nissan-global.com/EN/HERITAGE_COLLECTION/280_skyline_gt-r_v-spec_ii.html), RB26DETT, 2 568 cc, 280 PS.
- GT-R R35 : [Nissan — modèle 2017 au Japon](https://global.nissannews.com/ja-JP/releases/160711-01-j) et [fiche technique Nissan MY17](https://www-europe.nissan-cdn.net/content/dam/Nissan/es/brochures/E-Catalago_GTR_ES.pdf), VR38DETT, 3 799 cc, 570 PS, 4WD.
- GR Supra : [Toyota — lancement 2019](https://newsroom.toyota.eu/2019-the-new-toyota-gr-supra/), 3,0 L six cylindres en ligne, 340 ch DIN, propulsion ; [fiche Toyota 3,0 L](https://newsroom.toyota.eu/download/15b358dc-2945-4ff5-9e7a-65915888dcaa/grsupraspecifications-may2025.pdf), cylindrée de 2 998 cc.
- AE86 Trueno : [Toyota — Sprinter Trueno 1983](https://www.toyota-global.com/company/history_of_toyota/75years/vehicle_lineage/car/id60009032/), 4A-GEU, 1 587 cc, 130 PS, propulsion ; [Toyota — Corolla Levin 1983](https://www.toyota-global.com/company/history_of_toyota/75years/vehicle_lineage/car/id60003763/index.html) précise la mesure historique brute du même moteur.
