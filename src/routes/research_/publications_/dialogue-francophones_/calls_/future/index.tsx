import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../../-components/KBanner/KBanner.tsx';
import { KTitle } from '../../../../../-components/KTitle/KTitle.tsx';
import { KParagraph } from '../../../../../-components/KParagraph/KParagraph.tsx';
import './styles.css';

export const Route = createFileRoute(
  '/research/publications/dialogue-francophones/calls/future/'
)({
  component: () => (
    <div>
      <KBanner label="Dialogues Francophones - Apel la contribuții 2024" />
      <div className="calls">
        <KTitle label="Appel à contributions - Dialogues francophones, no 28, 2024" />
        <KParagraph text="Dossier thématique: Monstres et monstruosités" />
        <KParagraph text="Numéro coordonné par Neli Eiben (Université de l’Ouest de Timisoara, Roumanie) et Ioana Marcu (Université de l’Ouest de Timisoara, Roumanie)" />
        <KParagraph text="Apparentée à l’extraordinaire, à l’étranger, à l’inexplicable, à l’indicible, la question des monstres et des monstruosités a toujours fasciné et intrigué l’individu en stimulant son imaginaire. Depuis l’Antiquité, les auteurs ont consacré des volets conséquents de leurs écrits à des créatures hors-normes – l’autre des humains - et à leurs errements. De nombreuses œuvres littéraires sont peuplées de personnages ténébreux qui inspirent de la crainte et de l’indignation à cause de leurs actes cruels commis (in)volontairement ou de la transgression des normes et des codes de bienséance imposés par la société. Le Sphinx, le Cerbère, le Minotaure, le Cyclope, la Méduse, la Sirène, les Géants dans la mythologie grecque; le vampire ou le zombi dans la littérature baroque et fantastique; les créatures surhumaines de la littérature de science-fiction; les criminels, les violeurs, les personnages corrompus du roman noir et autres figures de l’autorité oppressive (dictateurs, kidnappeurs) des fictions modernes et ultracontemporaines ne seraient que quelques exemples de “monstres” inoubliables qui, à travers le temps, ont envoûté un lectorat jeune ou adulte. Les contes populairesdont on retrouve les traces dans la fiction foisonnent eux aussi en ogres, loups et autres animaux prédateurs, elfes, sorcières, etc." />
        <KParagraph text="Visibles ou invisibles, réels ou imaginaires, émanant à la fois de l’humain et de l’animal, ces êtres bizarres sont souvent dotés de superpouvoirs dont ils se servent dans des buts maléfiques. Informes de par leur nature, ils s’illustrent par un éventail d’anomalies d’ordre physique (créatures hybrides mi-humaines, mi-animales ; corps atrophiés ; maladies dégénératives), psychique (hallucinations, narcissisme, égocentrisme) ou moral(comportements criminels, asservissement/oppression de l’autre par force, manipulation et malveillance). Lorsqu’ils s’approchent de quelqu’un, ils inspirent la terreur, l’horreur ou l’affolement par leur morphologie anormale ou par leurs comportements insolites en opposition avec la raison, l’éthique et la morale. Pour le numéro 28/2024 de la revue Dialogues francophones on invite les contributeurs et les contributrices à approfondir la question de la monstruosité telle qu’elle se présente dans les œuvres littéraires françaises et francophones des XXe et XXIe siècles. Dans le cas des monstres, les questions portent surtout sur ce qui est inexplicable, incompréhensible." />
        <KParagraph
          text="Pistes (non-exhaustives) de réflexion:"
          list
          listElements={[
            'Littérature SF/fantastique/gothique/«horrifique» francophone',
            'Hermaphrodite, corps difformes, corps grotesques, corps maltraités, anomalies corporelles, malformations',
            'Bêtes, monstres, spectres, esprits, zombis, vampires, diables, cadavres, extraterrestres',
            'Humain vs non-humain/inhumain; homme-animal; homme-machine; surhomme/sous-homme',
            'Zoomorphisme, lycanthropie, thérianthropie',
            'Marginalité, altérité, hybridité, singularité, étrangeté, anormalité, anomalie, excentricité',
            'Désordre, chaos, catastrophes, déviation, transgression des limites, peur, inconnu',
            'Crimes, génocides, perversités, atrocités, vices, actions immorales, débauches, fanatisme, exploitation de l’individu, péchés',
            'Horrible, inclassable, incompréhensible, impensable, trouble, contre-nature.',
          ]}
        />
        <KParagraph text="Les textes doivent être envoyés à revue.dialoguesfrancophones@gmail.com." />
        <KParagraph text="Les articles compteront entre 25000 et 40000 signes (espaces compris) et seront accompagnés du titre (en français et en anglais), d’un résumé (en français et en anglais) de 200-250 mots, de minimum 5 mots-clés (en français et en anglais) et d’une brève notice bio-bibliographique." />
        <KParagraph
          text="Calendier"
          list
          listElements={[
            'Dernier délai pour la réception des articles: le 1er juin 2024',
            'Réponse aux auteurs: à partir du 10 septembre 2024',
            'Remise des articles revus et corrigés : avant le 10 octobre 2024',
            'Publication prévue : fin novembre 2024',
          ]}
        />
      </div>
    </div>
  ),
});
