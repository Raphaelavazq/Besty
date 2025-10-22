/**
 * Merge exerciseData from component into bild-beschreiben.json manifest
 * This consolidates all content into a single source of truth
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the current manifest
const manifestPath = path.join(__dirname, "../data/bild-beschreiben.json");
const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

// Exercise data extracted from BildBeschreibenDetail.jsx
const exerciseData = {
  1: {
    category: "Lernen & Bildung",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Machen Sie gern Hausaufgaben?",
        answer:
          "Nicht immer, aber sie sind wichtig, um den Unterricht besser zu verstehen.",
      },
      {
        question: "Wie lange lernen Sie normalerweise zu Hause?",
        answer:
          "Ungefähr ein bis zwei Stunden pro Tag, manchmal mehr vor Prüfungen.",
      },
      {
        question: "Welche Vorteile hat Online-Lernen?",
        answer:
          "Man kann bequem von zu Hause lernen, viele Informationen finden und flexibel arbeiten.",
      },
      {
        question: "Braucht man beim Lernen Pausen?",
        answer:
          "Ja, Pausen sind sehr wichtig, damit man konzentriert bleibt und sich besser erinnern kann.",
      },
      {
        question: "Wie haben Sie früher in der Schule gelernt?",
        answer:
          "Ich habe meistens mit Büchern gelernt und viele Übungen im Heft gemacht. Später habe ich auch Computer und Internet benutzt.",
      },
    ],
    duration: "1:19",
  },
  2: {
    category: "Familie & Kinder",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie wichtig ist Familie für Sie?",
        answer:
          "Familie ist sehr wichtig für mich. Sie gibt mir Unterstützung, Liebe und ein Gefühl von Sicherheit.",
      },
      {
        question: "Wie oft sehen Sie Ihre Familie?",
        answer:
          "Ich versuche, meine Familie mindestens einmal pro Woche zu besuchen. Manchmal telefonieren wir auch.",
      },
      {
        question: "Was macht eine gute Familie aus?",
        answer:
          "Eine gute Familie unterstützt sich gegenseitig, verbringt Zeit zusammen und respektiert einander.",
      },
      {
        question: "Ist es wichtig, Zeit mit Kindern zu verbringen?",
        answer:
          "Ja, sehr wichtig. Kinder brauchen Aufmerksamkeit und Liebe von ihren Eltern, um sich gut zu entwickeln.",
      },
      {
        question: "Wie war Ihre Kindheit?",
        answer:
          "Meine Kindheit war schön. Ich habe viel mit meinen Geschwistern gespielt und meine Eltern haben sich gut um uns gekümmert.",
      },
    ],
    duration: "1:20",
  },
  3: {
    category: "Familie & Kinder",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Sollten Eltern viel Zeit mit ihren Kindern verbringen?",
        answer:
          "Ja, unbedingt. Gemeinsame Zeit ist wichtig für die Entwicklung und für eine gute Beziehung in der Familie.",
      },
      {
        question: "Was lernen Kinder beim Spielen?",
        answer:
          "Kinder lernen Kreativität, Konzentration, Geduld und auch soziale Fähigkeiten, wenn sie zusammen mit anderen spielen.",
      },
      {
        question: "Haben Sie als Kind gern mit Bauklötzen gespielt?",
        answer:
          "Ja, sehr gern. Ich habe oft Häuser und Türme gebaut. Das war immer spannend.",
      },
      {
        question: "Wie verbringen Sie Ihre Freizeit?",
        answer:
          "In meiner Freizeit lese ich gern, treffe Freunde und gehe spazieren. Manchmal spiele ich auch mit meinen kleinen Verwandten.",
      },
    ],
    duration: "1:15",
  },
  4: {
    category: "Einkaufen",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Kaufen Sie lieber auf dem Markt oder im Supermarkt ein?",
        answer:
          "Ich kaufe lieber auf dem Markt, weil die Produkte frischer sind und man direkt mit den Verkäufern sprechen kann.",
      },
      {
        question: "Wie oft gehen Sie einkaufen?",
        answer:
          "Ich gehe normalerweise zweimal pro Woche einkaufen – einmal für frisches Obst und Gemüse und einmal für andere Sachen.",
      },
      {
        question: "Was ist Ihnen beim Einkaufen wichtig?",
        answer:
          "Mir ist wichtig, dass die Produkte frisch und von guter Qualität sind. Außerdem achte ich auf den Preis.",
      },
      {
        question: "Sollte man mehr regionale Produkte kaufen?",
        answer:
          "Ja, ich finde das sehr wichtig. Es ist gut für die Umwelt und unterstützt lokale Bauern und Geschäfte.",
      },
    ],
    duration: "1:18",
  },
  5: {
    category: "Gesundheit",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Gehen Sie regelmäßig zum Arzt?",
        answer:
          "Ja, ich gehe mindestens einmal im Jahr zur Vorsorgeuntersuchung. Wenn ich krank bin, gehe ich natürlich auch.",
      },
      {
        question: "Was machen Sie, wenn Sie krank sind?",
        answer:
          "Zuerst versuche ich, mich zu Hause auszuruhen und viel zu trinken. Wenn es nicht besser wird, gehe ich zum Arzt.",
      },
      {
        question: "Ist Gesundheit wichtig für Sie?",
        answer:
          "Ja, sehr wichtig. Ohne Gesundheit kann man nicht arbeiten, sich nicht um die Familie kümmern oder das Leben genießen.",
      },
      {
        question: "Wie kann man gesund bleiben?",
        answer:
          "Man sollte sich ausgewogen ernähren, regelmäßig Sport treiben, genug schlafen und Stress vermeiden.",
      },
    ],
    duration: "1:12",
  },
  6: {
    category: "Wohnen",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie oft sind Sie schon umgezogen?",
        answer:
          "Ich bin zweimal umgezogen – einmal während des Studiums und einmal wegen der Arbeit.",
      },
      {
        question: "Was ist beim Umzug am schwierigsten?",
        answer:
          "Das Packen und Tragen der schweren Möbel ist anstrengend. Auch das Organisieren von allem kann stressig sein.",
      },
      {
        question: "Braucht man Hilfe beim Umzug?",
        answer:
          "Ja, meistens schon. Es ist viel einfacher mit Freunden oder einer Umzugsfirma.",
      },
      {
        question: "Was ist Ihnen bei einer Wohnung wichtig?",
        answer:
          "Mir ist wichtig, dass die Wohnung hell ist, eine gute Lage hat und nicht zu teuer ist.",
      },
    ],
    duration: "1:10",
  },
  7: {
    category: "Arbeit & Familie",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Arbeiten Sie auch manchmal von zu Hause?",
        answer:
          "Ja, ich arbeite ein- oder zweimal pro Woche im Homeoffice. Das ist sehr praktisch.",
      },
      {
        question: "Was sind die Vorteile von Homeoffice?",
        answer:
          "Man spart Zeit für den Arbeitsweg, kann flexibler arbeiten und ist manchmal konzentrierter.",
      },
      {
        question: "Gibt es auch Nachteile?",
        answer:
          "Ja, manchmal fehlt der direkte Kontakt zu Kollegen und es ist schwieriger, Arbeit und Privatleben zu trennen.",
      },
      {
        question: "Wie vereinbaren Sie Arbeit und Familie?",
        answer:
          "Das ist manchmal schwierig, aber ich versuche, feste Arbeitszeiten zu haben und nach der Arbeit Zeit für die Familie einzuplanen.",
      },
    ],
    duration: "1:14",
  },
  8: {
    category: "Essen & Trinken",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Essen Sie oft im Restaurant?",
        answer:
          "Nicht sehr oft, vielleicht ein- oder zweimal im Monat. Meistens koche ich zu Hause.",
      },
      {
        question: "Was ist Ihr Lieblingsessen?",
        answer:
          "Ich esse sehr gern Pasta mit Tomatensoße. Auch Pizza mag ich sehr.",
      },
      {
        question: "Kochen Sie gern?",
        answer:
          "Ja, ich koche gern, besonders am Wochenende, wenn ich mehr Zeit habe.",
      },
      {
        question: "Was halten Sie von Fast Food?",
        answer:
          "Ab und zu ist es okay, aber man sollte nicht zu oft Fast Food essen, weil es nicht gesund ist.",
      },
    ],
    duration: "1:11",
  },
  9: {
    category: "Freizeit",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Lesen Sie gern?",
        answer: "Ja, ich lese sehr gern, besonders Romane und Krimis.",
      },
      {
        question: "Wie oft lesen Sie?",
        answer:
          "Ich versuche, jeden Abend vor dem Schlafen zu lesen, mindestens 30 Minuten.",
      },
      {
        question: "Lesen Sie lieber Bücher oder E-Books?",
        answer:
          "Ich bevorzuge normale Bücher, aber E-Books sind praktisch auf Reisen.",
      },
      {
        question: "Was war das letzte Buch, das Sie gelesen haben?",
        answer:
          "Das letzte Buch war ein Krimi von einem deutschen Autor. Es war sehr spannend.",
      },
    ],
    duration: "1:09",
  },
  10: {
    category: "Sport",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Treiben Sie regelmäßig Sport?",
        answer:
          "Ja, ich gehe zweimal pro Woche joggen und einmal ins Fitnessstudio.",
      },
      {
        question: "Welche Sportart mögen Sie am liebsten?",
        answer:
          "Ich mag Schwimmen am liebsten, weil es gut für den ganzen Körper ist und entspannend wirkt.",
      },
      {
        question: "Ist Sport wichtig für Sie?",
        answer:
          "Ja, sehr wichtig. Sport hält mich fit und gesund und hilft mir, Stress abzubauen.",
      },
      {
        question: "Haben Sie früher Sport gemacht?",
        answer:
          "Ja, als Kind habe ich Fußball gespielt und bin viel Fahrrad gefahren.",
      },
    ],
    duration: "1:13",
  },
  11: {
    category: "Natur & Umwelt",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Mögen Sie die Natur?",
        answer:
          "Ja, sehr. Ich finde es wichtig, Zeit in der Natur zu verbringen, um zu entspannen.",
      },
      {
        question: "Wie oft gehen Sie spazieren?",
        answer:
          "Ich versuche, mindestens dreimal pro Woche spazieren zu gehen, am liebsten im Park oder im Wald.",
      },
      {
        question: "Was können wir für die Umwelt tun?",
        answer:
          "Wir sollten weniger Müll produzieren, Energie sparen, öffentliche Verkehrsmittel nutzen und recyceln.",
      },
      {
        question: "Ist Umweltschutz wichtig?",
        answer:
          "Ja, sehr wichtig. Wir müssen die Umwelt schützen, damit auch zukünftige Generationen gut leben können.",
      },
    ],
    duration: "1:16",
  },
  12: {
    category: "Verkehr",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie kommen Sie zur Arbeit?",
        answer:
          "Ich fahre meistens mit dem Bus und der U-Bahn. Das ist schneller als mit dem Auto.",
      },
      {
        question: "Haben Sie ein Auto?",
        answer:
          "Nein, ich habe kein Auto. In der Stadt brauche ich es nicht wirklich.",
      },
      {
        question: "Was sind die Vorteile von öffentlichen Verkehrsmitteln?",
        answer:
          "Sie sind umweltfreundlicher, oft günstiger und man muss sich nicht um Parkplätze kümmern.",
      },
      {
        question: "Gibt es Nachteile?",
        answer:
          "Manchmal sind die Verkehrsmittel überfüllt oder haben Verspätungen.",
      },
    ],
    duration: "1:08",
  },
  13: {
    category: "Reisen",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Reisen Sie gern?",
        answer:
          "Ja, sehr gern. Ich finde es spannend, neue Länder und Kulturen kennenzulernen.",
      },
      {
        question: "Wohin sind Sie zuletzt gereist?",
        answer: "Zuletzt war ich in Italien. Ich habe Rom und Florenz besucht.",
      },
      {
        question: "Wie bereiten Sie sich auf eine Reise vor?",
        answer:
          "Ich informiere mich über das Land, buche Hotels und packe meinen Koffer rechtzeitig.",
      },
      {
        question: "Was nehmen Sie immer mit auf Reisen?",
        answer:
          "Ich nehme immer meinen Reisepass, mein Handy, bequeme Schuhe und eine Kamera mit.",
      },
    ],
    duration: "1:17",
  },
  14: {
    category: "Technologie",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Nutzen Sie viel Technologie?",
        answer:
          "Ja, ich benutze täglich mein Handy, meinen Computer und manchmal auch ein Tablet.",
      },
      {
        question: "Was sind die Vorteile von Technologie?",
        answer:
          "Man kann schnell Informationen finden, mit Menschen kommunizieren und vieles effizienter erledigen.",
      },
      {
        question: "Gibt es auch Nachteile?",
        answer:
          "Ja, manchmal verbringt man zu viel Zeit am Bildschirm und hat weniger persönliche Kontakte.",
      },
      {
        question: "Könnten Sie ohne Smartphone leben?",
        answer:
          "Das wäre schwierig, aber möglich. Ich würde viele praktische Funktionen vermissen.",
      },
    ],
    duration: "1:07",
  },
  15: {
    category: "Medien",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Sehen Sie oft fern?",
        answer:
          "Nicht sehr oft. Ich schaue lieber Serien online oder höre Podcasts.",
      },
      {
        question: "Was für Sendungen mögen Sie?",
        answer:
          "Ich mag Dokumentationen, Nachrichten und manchmal auch Krimiserien.",
      },
      {
        question: "Lesen Sie Zeitung?",
        answer:
          "Ja, ich lese die Nachrichten meistens online auf meinem Handy.",
      },
      {
        question: "Wie informieren Sie sich über aktuelle Ereignisse?",
        answer:
          "Hauptsächlich über Nachrichten-Apps und manchmal über das Radio.",
      },
    ],
    duration: "1:06",
  },
  16: {
    category: "Einkaufen",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Kaufen Sie oft online ein?",
        answer:
          "Ja, ziemlich oft. Besonders Bücher, Kleidung und Elektronik bestelle ich im Internet.",
      },
      {
        question: "Was sind die Vorteile von Online-Shopping?",
        answer:
          "Es ist bequem, man spart Zeit und hat eine große Auswahl. Man kann auch Preise gut vergleichen.",
      },
      {
        question: "Was sind die Nachteile?",
        answer:
          "Man kann die Produkte nicht vorher sehen oder anprobieren. Manchmal dauert die Lieferung lange.",
      },
      {
        question: "Haben Sie schon einmal etwas zurückgeschickt?",
        answer:
          "Ja, ein paarmal. Meistens, weil die Größe nicht gepasst hat oder die Farbe anders aussah.",
      },
    ],
    duration: "1:15",
  },
  17: {
    category: "Einkaufen",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Kaufen Sie Kleidung lieber im Geschäft oder online?",
        answer:
          "Lieber im Geschäft, weil ich die Kleidung anprobieren und die Qualität prüfen kann.",
      },
      {
        question: "Wie oft kaufen Sie neue Kleidung?",
        answer:
          "Nicht sehr oft, vielleicht alle zwei bis drei Monate, wenn ich wirklich etwas brauche.",
      },
      {
        question: "Was ist Ihnen bei Kleidung wichtig?",
        answer:
          "Mir ist wichtig, dass sie gut passt, bequem ist und nicht zu teuer.",
      },
      {
        question: "Achten Sie auf Mode?",
        answer:
          "Ein bisschen, aber nicht zu sehr. Ich kaufe lieber klassische Kleidung, die lange hält.",
      },
    ],
    duration: "1:12",
  },
  18: {
    category: "Wetter",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Welche Jahreszeit mögen Sie am liebsten?",
        answer:
          "Ich mag den Frühling am liebsten, weil das Wetter angenehm ist und alles blüht.",
      },
      {
        question: "Was machen Sie bei schönem Wetter?",
        answer:
          "Ich gehe gern spazieren, treffe Freunde im Park oder fahre Fahrrad.",
      },
      {
        question: "Was machen Sie bei schlechtem Wetter?",
        answer:
          "Bei Regen bleibe ich lieber zu Hause, lese ein Buch oder schaue einen Film.",
      },
      {
        question: "Beeinflusst das Wetter Ihre Stimmung?",
        answer:
          "Ja, bei Sonnenschein fühle ich mich meistens besser und energiegeladener.",
      },
    ],
    duration: "1:10",
  },
  19: {
    category: "Feste & Feiern",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Feiern Sie gern Geburtstag?",
        answer:
          "Ja, ich feiere gern mit Familie und Freunden, aber nicht zu groß.",
      },
      {
        question: "Wie haben Sie Ihren letzten Geburtstag gefeiert?",
        answer:
          "Ich habe ein kleines Abendessen mit engen Freunden gemacht und dann haben wir gespielt.",
      },
      {
        question: "Welche Feste sind in Ihrer Heimat wichtig?",
        answer:
          "Bei uns sind Weihnachten, Ostern und Neujahr sehr wichtige Feste.",
      },
      {
        question: "Schenken Sie gern?",
        answer:
          "Ja, ich schenke gern, aber ich überlege mir immer gut, was der Person gefallen könnte.",
      },
    ],
    duration: "1:14",
  },
  20: {
    category: "Freundschaft",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Haben Sie viele Freunde?",
        answer:
          "Ich habe nicht sehr viele, aber ein paar enge Freunde, auf die ich mich verlassen kann.",
      },
      {
        question: "Wie oft treffen Sie Ihre Freunde?",
        answer:
          "Mindestens einmal pro Woche, manchmal auch öfter, je nachdem wie viel Zeit wir haben.",
      },
      {
        question: "Was macht eine gute Freundschaft aus?",
        answer:
          "Vertrauen, Ehrlichkeit und dass man füreinander da ist, auch in schwierigen Zeiten.",
      },
      {
        question: "Wie haben Sie Ihre besten Freunde kennengelernt?",
        answer:
          "Die meisten habe ich in der Schule oder bei der Arbeit kennengelernt.",
      },
    ],
    duration: "1:11",
  },
  21: {
    category: "Musik",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Hören Sie gern Musik?",
        answer: "Ja, sehr gern. Musik begleitet mich den ganzen Tag.",
      },
      {
        question: "Was für Musik mögen Sie?",
        answer:
          "Ich höre verschiedene Musikrichtungen – Pop, Rock und manchmal auch Klassik.",
      },
      {
        question: "Spielen Sie ein Instrument?",
        answer: "Nein, leider nicht. Aber ich würde gern Gitarre lernen.",
      },
      {
        question: "Gehen Sie auf Konzerte?",
        answer:
          "Ja, ab und zu. Zuletzt war ich auf einem Konzert meiner Lieblingsband.",
      },
    ],
    duration: "1:09",
  },
  22: {
    category: "Hobbys",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Was sind Ihre Hobbys?",
        answer: "Ich fotografiere gern, lese Bücher und gehe wandern.",
      },
      {
        question: "Seit wann haben Sie diese Hobbys?",
        answer:
          "Mit dem Fotografieren habe ich vor etwa fünf Jahren angefangen.",
      },
      {
        question: "Wie viel Zeit verbringen Sie mit Ihren Hobbys?",
        answer: "Am Wochenende mehrere Stunden, unter der Woche eher weniger.",
      },
      {
        question: "Möchten Sie ein neues Hobby beginnen?",
        answer: "Ja, ich würde gern Malen lernen oder einen Tanzkurs machen.",
      },
    ],
    duration: "1:13",
  },
  23: {
    category: "Sprachen lernen",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie viele Sprachen sprechen Sie?",
        answer:
          "Ich spreche drei Sprachen: meine Muttersprache, Englisch und jetzt lerne ich Deutsch.",
      },
      {
        question: "Wie lernen Sie Deutsch?",
        answer:
          "Ich besuche einen Sprachkurs und übe zu Hause mit Apps und Büchern.",
      },
      {
        question: "Was ist am schwierigsten beim Deutschlernen?",
        answer: "Die Grammatik und die Artikel sind manchmal kompliziert.",
      },
      {
        question: "Warum ist es wichtig, Sprachen zu lernen?",
        answer:
          "Man kann besser kommunizieren, andere Kulturen verstehen und hat mehr berufliche Möglichkeiten.",
      },
    ],
    duration: "1:16",
  },
  24: {
    category: "Haustiere",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Haben Sie ein Haustier?",
        answer: "Ja, ich habe eine Katze. Sie ist sehr lieb und verschmust.",
      },
      {
        question: "Was sind die Vorteile von Haustieren?",
        answer:
          "Sie sind gute Begleiter, man ist nie allein und sie bringen viel Freude.",
      },
      {
        question: "Gibt es auch Nachteile?",
        answer:
          "Ja, man muss sich täglich um sie kümmern und kann nicht spontan verreisen.",
      },
      {
        question: "Welches Haustier würden Sie gern haben?",
        answer:
          "Ich würde gern auch einen Hund haben, aber dafür brauche ich mehr Zeit und Platz.",
      },
    ],
    duration: "1:08",
  },
  25: {
    category: "Schule & Bildung",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie war Ihre Schulzeit?",
        answer:
          "Meine Schulzeit war gut. Ich hatte nette Freunde und interessante Lehrer.",
      },
      {
        question: "Was war Ihr Lieblingsfach?",
        answer: "Ich mochte Geschichte und Biologie am liebsten.",
      },
      {
        question: "Was macht einen guten Lehrer aus?",
        answer:
          "Ein guter Lehrer erklärt gut, ist geduldig und motiviert die Schüler.",
      },
      {
        question: "Ist Bildung wichtig?",
        answer:
          "Ja, sehr wichtig. Bildung öffnet viele Türen und gibt einem mehr Möglichkeiten im Leben.",
      },
    ],
    duration: "1:17",
  },
  26: {
    category: "Kleidung & Mode",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Was tragen Sie am liebsten?",
        answer:
          "Am liebsten trage ich Jeans und ein bequemes T-Shirt oder einen Pullover.",
      },
      {
        question: "Ist Mode wichtig für Sie?",
        answer:
          "Nicht sehr. Mir ist wichtiger, dass Kleidung bequem ist und zu mir passt.",
      },
      {
        question: "Kaufen Sie teure Kleidung?",
        answer: "Nicht immer. Ich achte mehr auf Qualität als auf den Preis.",
      },
      {
        question: "Was denken Sie über Fast Fashion?",
        answer:
          "Ich finde Fast Fashion problematisch, weil es oft schlecht für die Umwelt ist.",
      },
    ],
    duration: "1:10",
  },
  27: {
    category: "Kommunikation",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie kommunizieren Sie mit Freunden?",
        answer:
          "Meistens per WhatsApp oder Telefon, manchmal treffen wir uns auch persönlich.",
      },
      {
        question: "Telefonieren Sie gern?",
        answer: "Ja, mit engen Freunden und Familie telefoniere ich gern.",
      },
      {
        question: "Schreiben Sie lieber oder sprechen Sie lieber?",
        answer:
          "Kommt drauf an. Kurze Infos schreibe ich, aber für längere Gespräche rufe ich lieber an.",
      },
      {
        question: "Hat sich Kommunikation durch Technologie verändert?",
        answer:
          "Ja, sehr. Heute kann man jederzeit und überall Nachrichten schreiben oder videotelefonieren.",
      },
    ],
    duration: "1:12",
  },
  28: {
    category: "Alltag",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Wie sieht Ihr typischer Tag aus?",
        answer:
          "Ich stehe um 7 Uhr auf, frühstücke, gehe zur Arbeit und komme am Abend nach Hause.",
      },
      {
        question: "Was machen Sie nach der Arbeit?",
        answer:
          "Ich koche, esse zu Abend, schaue vielleicht etwas fern oder lese ein Buch.",
      },
      {
        question: "Haben Sie einen regelmäßigen Tagesablauf?",
        answer: "Ja, unter der Woche schon. Am Wochenende bin ich flexibler.",
      },
      {
        question: "Was ist Ihnen im Alltag wichtig?",
        answer:
          "Mir ist wichtig, genug Zeit für mich selbst zu haben und nicht nur zu arbeiten.",
      },
    ],
    duration: "1:11",
  },
  29: {
    category: "Wohnen & Umzug",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question:
          "Haben Sie schon einmal geholfen, jemandem beim Umzug zu helfen?",
        answer:
          "Ja, mehrmals. Ich habe Freunden geholfen, Möbel zu tragen und Kartons zu packen.",
      },
      {
        question: "Was macht man zuerst beim Umzug?",
        answer:
          "Man sollte zuerst aussortieren, was man nicht mehr braucht, und dann alles gut verpacken.",
      },
      {
        question: "Ist ein Umzug immer stressig?",
        answer:
          "Meistens schon, aber mit guter Planung und Hilfe geht es besser.",
      },
      {
        question: "Würden Sie lieber in einer Wohnung oder einem Haus wohnen?",
        answer:
          "Beides hat Vorteile. Eine Wohnung ist pflegeleichter, ein Haus hat mehr Platz und einen Garten.",
      },
    ],
    duration: "1:14",
  },
  30: {
    category: "Arbeit & Beruf",
    questions: [
      "Was sehen Sie auf dem Foto?",
      "Was für eine Situation zeigt dieses Bild?",
      "Welche Erfahrungen haben Sie damit?",
    ],
    additionalQuestions: [
      {
        question: "Was machen Sie beruflich?",
        answer: "Ich arbeite im Büro als Angestellte/r in einer Firma.",
      },
      {
        question: "Mögen Sie Ihre Arbeit?",
        answer:
          "Ja, meistens. Die Aufgaben sind interessant und die Kollegen sind nett.",
      },
      {
        question: "Was ist Ihnen bei der Arbeit wichtig?",
        answer:
          "Mir ist wichtig, dass die Arbeit Sinn macht, das Team gut ist und ich fair bezahlt werde.",
      },
      {
        question: "Möchten Sie den Beruf wechseln?",
        answer:
          "Im Moment nicht, aber ich bin offen für neue Möglichkeiten in der Zukunft.",
      },
    ],
    duration: "1:15",
  },
};

// Function to merge data into manifest
function mergeData() {
  const themes = manifest.themes;

  // Iterate through all themes
  for (const themeKey in themes) {
    const images = themes[themeKey];

    images.forEach((img) => {
      const id = img.id;
      const extraData = exerciseData[id];

      if (extraData) {
        // Add questions and additional data from exerciseData
        img.category = extraData.category || img.category || "";
        img.questions = extraData.questions || [];
        img.additionalQuestions = extraData.additionalQuestions || [];
        img.duration = extraData.duration || "";
      } else {
        // Ensure fields exist even if no exerciseData
        img.category = img.category || "";
        img.questions = img.questions || [];
        img.additionalQuestions = img.additionalQuestions || [];
        img.duration = img.duration || "";
      }
    });
  }

  return manifest;
}

// Execute merge
const mergedManifest = mergeData();

// Write back to file with pretty formatting
fs.writeFileSync(
  manifestPath,
  JSON.stringify(mergedManifest, null, 2),
  "utf-8"
);

console.log("✅ Successfully merged exerciseData into bild-beschreiben.json");
console.log(`📊 Processed ${Object.keys(exerciseData).length} exercises`);
console.log("📁 Updated file:", manifestPath);
