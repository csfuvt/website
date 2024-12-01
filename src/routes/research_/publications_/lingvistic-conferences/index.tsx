import { createFileRoute } from "@tanstack/react-router";
import { KBanner } from "../../../-components/KBanner/KBanner"

import { KActeColocvii } from "../../../-components/KActeColocvii/KActeColocvii";

export const Route = createFileRoute(
'/research/publications/lingvistic-conferences/'
)({
  component: () => (
    <>
      <KBanner label="ACTELE COLOCVIILOR FRANCO-ROMANE DE LINGVISTICA" />

      <div>
      <KActeColocvii 
              summaryText={"Mariana PITAR, Adina TIHU (éds.). De la phrase / énoncé au texte / discours. Perspectives linguistiques et didactiques, Timişoara, Coll. \"Biblioteca de cercetare. Seria Filologie\", Editura Universităţii de Vest, Coll. Biblioteca de cercetare. Seria Filologie, 2019, 247 p. ISBN 978-973-125-709-9."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire1.pdf"}
              bookImage={"/public/ActeColocviiPics/copertavolum.png"} 
              title={"De la phrase / énoncé au texte / discours. Perspectives linguistiques et didactiques"}/>

      <KActeColocvii 
              summaryText={"Cécile AVEZARD-ROGER, Céline CORTEEL, Jan GOES, Belinda LAVIEU-GWOZDZ (éds.). La phrase: carrefour linguistique et didactique, coll. \"Études linguistiques\", Artois Presses Université, oct. 2019, 368 p. ISBN 978-2-84832-350-3, ISSN 2257-1973."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire2.pdf"}
              bookImage={"/public/ActeColocviiPics/carrefour_linguistique_et_didactique.png"} 
              title={"La négation. Études linguistiques, pragmatiques et didactiques"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/La-Phrase-carrefour-linguistique-et-didactique"}/>
                
        <KActeColocvii 
              summaryText={"Jan GOES, Mariana PITAR (éds.), La négation. Études linguistiques, pragmatiques et didactiques, coll. \"Études linguistiques\", Artois Presses Université, juin 2015, 356 p. ISBN 978-2-84832-213-1, ISSN 2256-6317."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire.pdf"}
              bookImage={"/public/ActeColocviiPics/Études_linguistiques.png"} 
              title={"La négation. Études linguistiques, pragmatiques et didactiques"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/La-Negation.-Etudes-linguistiques-pragmatiques-et-didactiques"}/>

 
         
        <KActeColocvii 
              summaryText={"Jan GOES, Caroline LACHET, Angélique MASSET-MARTIN (éds.), NominalisationS: études linguistiques et didactiques, coll. \"Études linguistiques\", Artois Presses Université, nov. 2014, 304 p. ISBN 978-2-84832-192-9, ISSN 2256-6317."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire4.pdf"}
              bookImage={"/public/ActeColocviiPics/linguistiques-et-didactiques.png"} 
              title={"NominalisationS: études linguistiques et didactiques"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/NominalisationS-etudes-linguistiques-et-didactiques"}/>


          <KActeColocvii 
              summaryText={"Eugenia ARJOCA-IEREMIA, Cécile AVEZARD-ROGER, Jan GOES, Estelle MOLINE, Adina TIHU(éds.), Temps, aspect et classes de mots: études théoriques et didactiques, coll. \"Études linguistiques\", Artois Presses Université, avr. 2011, 301 p. ISBN: 9782848324142, ISSN 1272-3355."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire5.pdf"}
              bookImage={"/public/ActeColocviiPics/temps.png"} 
              title={"Temps, aspect et classes de mots: études théoriques et didactiques"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Temps-aspect-et-classes-de-mots-etudes-theoriques-et-didactiques"}
              TexteIntegrallink="https://books.openedition.org/apu/7431"/>

            <KActeColocvii 
              summaryText={"Jan GOES, Estelle MOLINE (éds.), L'adjectif hors de sa catégorie, coll. \"Études linguistiques\", Artois Presses Université, fév. 2010, 356 p. ISBN 978-2-84832-107-3, ISSN 1275-3114."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire6.pdf"}
              bookImage={"/public/ActeColocviiPics/adjectif-hors.png"} 
              title={"L'adjectif hors de sa catégorie"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/L-Adjectif-hors-de-sa-categorie"}/>


            <KActeColocvii 
              summaryText={"Nelly FLAUX, Dejan STOSIC (éds.), Les constructions détachées: entre langue et discours, coll. \"Études linguistiques\", Artois Presses Université, avril 2007, 396 p. ISBN 2-84832-055-9, ISSN 1275-3114."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire7.pdf"}
              bookImage={"/public/ActeColocviiPics/Les-constructions-détachées.png"} 
              title={"Les constructions détachées: entre langue et discours"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Les-Constructions-detachees-entre-langue-et-discours"}/>


            <KActeColocvii 
              summaryText={"Jan GOES (éd.), L'adverbe, un pervers polymorphe, coll. \"Études linguistiques\", Artois Presses Université, févr. 2007, 308 p. ISBN 2-84832-031-1, ISSN 1275-3114."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire8.pdf"}
              bookImage={"/public/ActeColocviiPics/adverbe.png"} 
              title={"L'adverbe, un pervers polymorphe"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/L-Adverbe-un-pervers-polymorphe"}/>


            <KActeColocvii 
              summaryText={"Maria TENCHEA, Adina TIHU (éds.), Prépositions et conjonctions de subordination. Syntaxe et sémantique, Timişoara, Excelsior Art, 2005, 291 p. ISBN 973-592-127-8."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire9.pdf"}
              bookImage={"/public/ActeColocviiPics/prepositions.png"} 
              title={"Prépositions et conjonctions de subordination. Syntaxe et sémantique"}
              />

          <KActeColocvii 
              summaryText={"Dany AMIOT, Walter DE MULDER, Nelly FLAUX (éds.), Le syntagme nominal: syntaxe et sémantique, coll. \"Études linguistiques\", Artois Presses Université, janv. 2001, 374 p. ISBN 2-910663-66-3, ISSN 1275-3114."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire10.pdf"}
              bookImage={"/public/ActeColocviiPics/syntagme.png"} 
              title={"Le syntagme nominal: syntaxe et sémantique"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Le-Syntagme-nominal-syntaxe-et-semantique"}/>
            

            <KActeColocvii 
              summaryText={"Dany AMIOT, Walter DE MULDER, Nelly Flaux, Maria ŢENCHEA (éds.), Fonctions syntaxiques et rôles sémantiques, dans Cahiers scientifiques de l'Université d'Artois 13 /1999, Artois Presses Université, déc. 1998, 216 p. ISBN 2-910663-41-8, ISSN 1275-3114."} 
              Sommairelink={"/public/DocumenteActeColocvii/CFRL_sommaire11.pdf"}
              bookImage={"/public/ActeColocviiPics/functions.png"} 
              title={"Fonctions syntaxiques et rôles sémantiques"}
              APUlink={"http://apu.univ-artois.fr/Revues-et-collections/Etudes-linguistiques/Fonctions-syntaxiques-et-roles-semantiques"}/>
              
      
      </div>
    </>
  ),
});
