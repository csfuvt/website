import { createFileRoute } from '@tanstack/react-router';
import { KBanner } from '../../../../-components/KBanner/KBanner';
import { KTitle } from '../../../../-components/KTitle/KTitle';
import styles from './calls.module.css';

const CallsPage = () => {
  return (
    <div>
      <KBanner label="CIEFT 2024 - Apel la comunicari" />
      <div className={styles.pageContainer}>
        <KTitle label="Appel à contributions - Dialogues francophones, no 28, 2024" />
        <div className={styles.line}>
          Dossier thématique : Monstres et monstruosités
          <br></br>
          <br></br>
          Numéro coordonné par Neli Biben (Université de l'Ouest de Timisoara,
          Roumanie) et
          <br></br>Ioana Marcu (Université de l'Ouest de Timisoara, Roumanie)
          <br></br>
          <br></br>
          Apparentée à l'extraordinaire, à l'étranger, à l'inexplicable, à
          l'indicible, la question des monstres et des monstruosités a toujours
          fasciné et intrigué l'individu en stimulant son imaginaire. Depuis
          l'Antiquité, les auteurs ont consacré des volets conséquents de leurs
          écrits à des créatures hors-normes - l'autre des humains - et à leurs
          errements. De nombreuses œuvres littéraires sont peuplées de
          personnages ténébreux qui inspirent de la crainte et de l'indignation
          à cause de leurs actes cruels commis (in)volontairement ou de la
          transgression des normes et des codes de bienséance imposés par la
          société. Le Sphinx, le Cerbère, le Minotaure, le Cyclope, la Méduse,
          la Sirène, les Géants dans la mythologie grecque; le vampire ou le
          zombi dans la littérature baroque et fantastique; les créatures
          surhumaines de la littérature de science-fiction; les criminels, les
          violeurs, les personnages corrompus du roman noir et autres figures de
          l'autorité oppressive (dictateurs, kidnappeurs) des fictions modernes
          et ultracontemporaines ne seraient que quelques exemples de “monstres”
          inoubliables qui, à travers le temps, ont envoûté un lectorat jeune ou
          adulte. Les contes populaires dont on retrouve les traces dans la
          fiction foisonnent eux aussi en ogres, loups et autres animaux
          prédateurs, elfes, sorcières, etc.
          <br></br>
          Visibles ou invisibles, réels ou imaginaires, émanant à la fois de
          l'humain et de l'animal, ces êtres bizarres sont souvent dotés de
          superpouvoirs dont ils se servent dans des buts maléfiques. Informes
          de par leur nature, ils s'illustrent par un éventail d'anomalies
          d'ordre physique (créatures hybrides mi-humaines, mi-animales ; corps
          atrophiés ; maladies dégénératives), psychique (hallucinations,
          narcissisme, égocentrisme) ou moral (comportements criminels,
          asservissement/oppression de l'autre par force, manipulation et
          malveillance). Lorsqu'ils s'approchent de quelqu'un, ils inspirent la
          terreur, l'horreur ou l'affolement par leur morphologie anormale ou
          par leurs comportements insolites en opposition avec la raison,
          l'éthique et la morale. Pour le numéro 28/2024 de la revue Dialogues
          francophones on invite les contributeurs et les contributrices à
          approfondir la question de la monstruosité telle qu'elle se présente
          dans les œuvres littéraires françaises et francophones des XXe et XXIe
          siècles. Dans le cas des monstres, les questions portent surtout sur
          ce qui est inexplicable, incompréhensible.
          <br></br>
          <br></br>
          Pistes (non-exhaustives) de réflexion:
          <ul>
            <li>
              Littérature SF/fantastique/gothique/« horrifique » francophone ;
            </li>
            <li>
              Hermaphrodite, corps difformes, corps grotesques, corps
              maltraités, anomalies corporelles, malformations ;
            </li>
            <li>
              Bêtes, monstres, spectres, esprits, zombies, vampires, diables,
              cadavres, extraterrestres ;
            </li>
            <li>
              Humain vs non-humain/inhumain ; monstre/humain ; antihumain ;
              surhomme/sous-homme ;
            </li>
            <li>Zoomorphisme, lycanthropie, thérianthropie ;</li>
            <li>
              Marginalité, altérité, hybridité, singularité, étrangeté,
              anormalité, anomalie, excentricité ;
            </li>
            <li>
              Désordre, chaos, catastrophes, déviation, transgression des
              limites, peur, inconnu ;
            </li>
            <li>
              Crimes, génocides, perversités, atrocités, vices, actions
              immorales, débauches, fantasmes, exploitation de l'individu,
              péchés ;
            </li>
            <li>
              Horrible, inclassable, incompréhensible, inimaginable, trouble,
              contre-nature.
            </li>
          </ul>
          <br></br>
          <br></br>
          Les textes doivent être envoyés à
          revue.dialoguesfrancophones@gmail.com.
          <br></br>
          <br />
          Les articles compteront entre 25000 et 40000 signes (espaces compris)
          et seront accompagnés du titre (en français et en anglais), d'un
          résumé (en français et en anglais) de 200-250 mots, de minimum 5
          mots-clés (en français et en anglais) et d'une brève notice
          bio-bibliographique.
          <br></br>
          <br />
          Les articles seront évalués anonymement par deux lecteurs issus du
          comité scientifique/spécialistes de la thématique du numéro.
          <br />
          <br />
          <b>Calendrier</b>
          <br />
          Dernier délai pour la réception des articles: le 1er juin 2024
          <br />
          Réponse aux auteurs: à partir du 10 septembre 2024
          <br />
          Remise des articles revus et corrigés : avant le 10 octobre 2024
          <br />
          Publication prévue : fin novembre 2024
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute(
  '/events/conferences/cieft/current-year/calls'
)({
  component: CallsPage,
});

export default CallsPage;
