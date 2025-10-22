#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outPath = path.resolve(__dirname, "..", "data", "bild-beschreiben.json");

const manifest = {
  themes: {
    "lernen-bildung": [
      {
        id: "1",
        file: "/images/sprechen/bild-beschreiben/1.png",
        title: "Lernen und Bildung",
        alt: "Lernen und Bildung - Schülerin am Schreibtisch",
        description:
          "Einleitung: Auf dem Bild ist zu sehen, wie ein junges Mädchen an einem Schreibtisch sitzt und lernt. Der Tisch ist mit Heften, Stiften und einem geöffneten Laptop ausgestattet. Hauptteil: Im Vordergrund arbeitet das Mädchen konzentriert in einem Heft; sie hält einen Stift in der Hand und hat den Kopf leicht geneigt. Links neben ihr steht der Laptop, daneben liegen rote Kopfhörer. Im Hintergrund sind bunte Aufbewahrungsboxen und Schulmaterial sichtbar, was auf einen organisierten Arbeitsplatz hindeutet. Die Kleidung wirkt lässig, das Umfeld ruhig und auf Lernen ausgelegt. Schluss: Ich vermute, dass sie sich auf eine Prüfung oder Hausaufgaben vorbereitet, weil sie fokussiert schreibt. Meiner Meinung nach zeigt das Bild, wie wichtig eine strukturierte Lernumgebung ist, da sie die Konzentration fördert und produktives Arbeiten ermöglicht.",
      },
      {
        id: "25",
        file: "/images/sprechen/bild-beschreiben/25.jpg",
        title: "Schule und Bildung",
        alt: "Gruppe von Kindern im Klassenzimmer",
        description:
          "Auf dem Foto sehe ich eine Gruppe von Kindern in einem Klassenzimmer. Die Kinder sitzen an ihren Tischen und heben die Hand, wahrscheinlich, um eine Frage zu beantworten. Im Vordergrund sitzt ein Junge mit einem Heft und bunten Stiften. Die Lehrerin steht vorne, lächelt und spricht mit den Schülern. Das Klassenzimmer ist hell, mit großen Fenstern, gelben Vorhängen und Pflanzen auf der Fensterbank. Die Kinder sehen glücklich und interessiert aus. Die Stimmung ist freundlich, und man merkt, dass die Lehrerin den Unterricht spannend gestaltet. Das Thema des Fotos ist ‚Schule und Bildung‘. Ich finde, Schule ist sehr wichtig für die Zukunft der Kinder. Dort lernen sie nicht nur Lesen, Schreiben und Rechnen, sondern auch, mit anderen Menschen umzugehen. Gute Lehrerinnen und Lehrer können Kinder motivieren und ihnen helfen, selbstbewusster zu werden. In meinem Heimatland ist die Schule ähnlich wie hier, aber oft sind die Klassen größer und es gibt weniger moderne Materialien. Ich finde das deutsche Schulsystem gut, weil Kinder hier viel praktisch lernen und Lehrer oft sehr nett sind. Eltern und Lehrer sollten zusammenarbeiten, damit Kinder Freude am Lernen haben.",
      },
    ],
    "familie-kinder": [
      {
        id: "2",
        file: "/images/sprechen/bild-beschreiben/2.jpg",
        title: "Familie und Kinder - Wohnzimmer",
        alt: "Familie und Kinder - Eltern mit Baby",
        description:
          "Einleitung: Auf dem Foto ist eine junge Familie im Wohnzimmer zu sehen; ein Elternteil hält ein Baby im Arm. Hauptteil: Im Vordergrund sitzt der Vater mit dem Baby auf einem grauen Sofa, die Mutter sitzt daneben und lächelt. Das Baby trägt ein helles Kleid; die Eltern wirken entspannt und liebevoll. Im Hintergrund erkennt man helle Wände, Pflanzen und eine dezente Wanddekoration. Die Atmosphäre ist gemütlich und familiär. Schluss: Wahrscheinlich verbringen die Personen einen ruhigen Nachmittag zu Hause. Ich denke, das Bild betont die Bedeutung von familiären Momenten und zeigt, wie wichtig Nähe und Zuneigung im Alltag sind.",
      },
      {
        id: "3",
        file: "/images/sprechen/bild-beschreiben/3.png",
        title: "Familie und Freizeit",
        alt: "Drei Personen spielen mit Bauklötzen",
        description:
          'Auf dem Foto sehe ich drei Personen: ein Kind, einen Mann und eine Frau. Wahrscheinlich handelt es sich um eine Familie - Vater, Mutter und Sohn. Sie sitzen an einem Tisch und spielen gemeinsam mit bunten Bauklötzen. Links sitzt der Mann. Er trägt ein helles Langarmshirt und hat einen dichten Bart. Er lacht freundlich und schaut auf das Kind. In der Mitte sitzt der kleine Junge. Er hat blonde Haare und trägt ein weißes Hemd mit kleinen Punkten. Der Junge spielt konzentriert mit den Bauklötzen und scheint Spaß zu haben. Rechts sitzt die Frau. Sie hat lange dunkle Haare und trägt ein grünes Oberteil. Sie hilft dem Kind beim Bauen und lächelt dabei. Auf dem Tisch liegen viele bunte Bauklötze in Blau, Rot, Gelb und Grün. Im Hintergrund sehe ich Stofftiere und eine Tafel. Vielleicht verbringen die drei Personen gerade ihre Freizeit zu Hause. Wahrscheinlich spielen sie zusammen, um Zeit miteinander zu verbringen und Spaß zu haben. Die Stimmung wirkt warm, harmonisch und glücklich. Das Thema des Fotos ist "Familie und Freizeit". Ich finde es sehr wichtig, dass Eltern Zeit mit ihren Kindern verbringen. Das stärkt die Beziehung und gibt den Kindern Sicherheit. Außerdem lernen Kinder beim Spielen viele neue Dinge, zum Beispiel Farben, Formen und auch Kreativität. In meiner Kindheit habe ich auch oft mit Bauklötzen oder Lego gespielt. Das hat mir immer sehr viel Spaß gemacht. Heute finde ich, dass solche Spiele nicht nur unterhaltsam, sondern auch pädagogisch wertvoll sind. Zusatzfragen: Sollten Eltern viel Zeit mit ihren Kindern verbringen? Ja, unbedingt. Gemeinsame Zeit ist wichtig für die Entwicklung und für eine gute Beziehung in der Familie. Was lernen Kinder beim Spielen? Kinder lernen Kreativität, Konzentration, Geduld und auch soziale Fähigkeiten, wenn sie zusammen mit anderen spielen. Haben Sie als Kind gern mit Bauklötzen gespielt? Ja, sehr gern. Ich habe oft Häuser und Türme gebaut. Das war immer spannend. Wie verbringen Sie Ihre Freizeit? In meiner Freizeit lese ich gern, treffe Freunde und gehe spazieren. Manchmal spiele ich auch mit meinen kleinen Verwandten.',
      },
    ],
    einkaufen: [
      {
        id: "4",
        file: "/images/sprechen/bild-beschreiben/4.jpg",
        title: "Einkaufen und Ernährung",
        alt: "Menschen auf einem Wochenmarkt",
        description:
          'Einkaufen auf dem Markt. Auf dem Foto sehe ich mehrere Menschen auf einem Wochenmarkt. Im Vordergrund steht eine Frau mit einer schwarz-weiß gestreiften Bluse und einer Tasche über der Schulter. Neben ihr steht ein Mann mit einem gestreiften Pullover. Beide schauen auf das frische Obst. Hinter dem Stand steht eine Verkäuferin mit einer grauen Jacke. Sie wiegt das Obst auf einer Waage. Auf dem Tisch liegen viele grüne Kisten mit Äpfeln, Trauben und anderen Früchten. Im Hintergrund sieht man noch mehr Marktstände und Menschen, die einkaufen. Es ist ein sonniger Tag, und die Stimmung wirkt freundlich und ruhig. Vielleicht fragt die Frau gerade nach dem Preis oder kauft etwas ein. Der Mann wartet neben ihr. Das Foto zeigt eine typische Alltagsszene auf einem Wochenmarkt. Ich finde es sehr schön, auf dem Markt einzukaufen. Das Obst und Gemüse ist dort meistens frischer als im Supermarkt, und man kann mit den Verkäufern sprechen. In meiner Heimat gehe ich oft auf den Wochenmarkt, besonders am Wochenende. Ich kaufe dort gern Obst, Gemüse und Blumen. Ich finde es wichtig, regionale Produkte zu unterstützen und gesunde Lebensmittel zu essen. Das Thema des Fotos ist "Einkaufen und Ernährung".',
      },
      {
        id: "16",
        file: "/images/sprechen/bild-beschreiben/16.png",
        title: "Online einkaufen",
        alt: "Person sitzt auf dem Sofa mit Laptop zum Online-Shoppen",
        description:
          'Thema: Online einkaufen. Auf dem Foto sehe ich eine Person, die auf einem Sofa sitzt und mit einem Laptop im Internet einkauft. Auf dem Bildschirm sieht man eine Webseite mit einem Online-Shop. Die Person schaut sich Kleidung an – ein Hemd in verschiedenen Größen und Farben. Sie trägt ein kariertes Hemd, Jeans und eine Armbanduhr. Im Hintergrund sieht man den Holzboden, einen Stuhl und etwas von der Wohnungseinrichtung. Die Situation zeigt eine ganz typische Alltagsszene: jemand kauft bequem von zu Hause aus ein. Man braucht keinen Laden zu besuchen, sondern kann einfach online bestellen. Das Foto wirkt ruhig und modern. Das Thema des Fotos ist "Online einkaufen". Ich finde, Online-Shopping ist heute sehr praktisch und spart viel Zeit. Man kann rund um die Uhr einkaufen, Preise vergleichen und hat eine große Auswahl. Besonders Kleidung, Technik oder Bücher kaufe ich oft im Internet, weil es schnell und einfach ist. Aber es gibt auch Nachteile. Man kann die Produkte nicht vorher sehen oder anprobieren, und manchmal passt etwas nicht oder sieht anders aus als auf dem Foto. Auch die Rücksendung kann manchmal kompliziert sein.',
      },
      {
        id: "17",
        file: "/images/sprechen/bild-beschreiben/17.png",
        title: "Einkaufen im Geschäft",
        alt: "Frau im Kleidungsgeschäft vor einem Spiegel hält zwei Jeans",
        description:
          'Thema: Einkaufen im Geschäft. Auf dem Foto sehe ich eine Frau in einem Kleidungsgeschäft. Sie steht vor einem Spiegel und hält zwei Jeans in den Händen – eine blaue und eine hellgraue. Die Frau überlegt wahrscheinlich, welche Hose ihr besser gefällt oder besser passt. Im Hintergrund sehe ich viele bunte Kleidungsstücke, die an Kleiderständern hängen – Pullover, Jacken und T-Shirts. Die Frau trägt ein helles Sommerkleid und hat lockige blonde Haare. Die Atmosphäre im Laden wirkt ruhig und ordentlich. Das Foto zeigt eine typische Alltagssituation: Einkaufen in einem Modegeschäft. Das Thema des Fotos ist "Einkaufen im Geschäft". Ich persönlich kaufe Kleidung lieber im Geschäft als online, weil ich gern verschiedene Größen und Farben anprobiere. Online ist es manchmal schwierig, die richtige Passform zu finden.',
      },
    ],
    gesundheit: [
      {
        id: "5",
        file: "/images/sprechen/bild-beschreiben/5.jpg",
        title: "Gesundheit und Arztbesuch",
        alt: "Ärztin mit Patientin (schwangere Frau) im Behandlungszimmer",
        description:
          "Thema: Gesundheit und Arztbesuch. Auf dem Foto sehe ich zwei Frauen in einem Arztzimmer. Links sitzt eine Ärztin mit einem weißen Kittel. Sie hält ein Tablet oder eine Mappe in der Hand und erklärt etwas. Rechts sitzt eine schwangere Frau. Sie trägt ein hellblaues Hemd und eine Jeans. Man sieht ihren Bauch, sie ist wahrscheinlich im letzten Trimester. Neben den beiden steht ein medizinisches Gerät, vielleicht ein Ultraschallgerät. Im Hintergrund sehe ich eine Pflanze und helle Wände – der Raum wirkt sauber und freundlich. Das Foto zeigt eine Situation beim Arzt, wahrscheinlich während einer Untersuchung oder Beratung. Die Ärztin erklärt der Frau etwas über die Schwangerschaft oder die Untersuchungsergebnisse. Ich finde es sehr wichtig, regelmäßig zum Arzt zu gehen, besonders in der Schwangerschaft. Die Gesundheit von Mutter und Kind ist sehr wichtig, und man sollte die Arzttermine ernst nehmen.",
      },
    ],
    wohnen: [
      {
        id: "6",
        file: "/images/sprechen/bild-beschreiben/6.jpg",
        title: "Wohnen und Umzug",
        alt: "Frau in neuer Wohnung freut sich",
        description:
          "Thema: Wohnen und Umzug. Auf dem Foto sehe ich eine junge Frau, die in einer hellen Wohnung steht. Sie lacht und breitet die Arme weit aus. Sie wirkt sehr glücklich und stolz. Im Hintergrund sehe ich eine moderne Küche mit weißen Schränken, einem Herd, einem Waschbecken und einer Dunstabzugshaube. Der Boden ist aus Holz, und vor dem Fenster liegt ein Teppich. Es scheint, als sei die Wohnung neu oder gerade frisch renoviert. Durch das große Fenster kommt viel Licht in den Raum. Ich denke, die Frau ist gerade eingezogen und freut sich über ihre neue Wohnung.",
      },
      {
        id: "29",
        file: "/images/sprechen/bild-beschreiben/29.jpg",
        title: "Umzug und Wohnen",
        alt: "Junges Paar beim Umzug mit Kartons",
        description:
          "Thema: Umzug und Wohnen. Auf dem Foto sehe ich ein junges Paar, das gerade beim Umzug ist. Beide tragen gemeinsam einen großen Karton. Im Hintergrund sieht man viele Umzugskartons, Möbel und eine helle Wohnung mit modernen Möbeln. An der Wand hängen einige Bilderrahmen, und auf dem Tisch stehen noch Gegenstände, die wahrscheinlich eingepackt werden müssen. Das Paar sieht glücklich und motiviert aus, obwohl die Arbeit anstrengend scheint.",
      },
    ],
    "arbeit-beruf": [
      {
        id: "7",
        file: "/images/sprechen/bild-beschreiben/7.jpg",
        title: "Arbeit und Familie – Homeoffice",
        alt: "Frau arbeitet am Laptop mit Kind auf dem Schoß",
        description:
          "Thema: Arbeit und Familie. Auf dem Foto sehe ich eine Frau, die an einem Schreibtisch sitzt. Sie arbeitet am Laptop, spricht am Handy und schreibt gleichzeitig etwas in ein Heft. Auf ihrem Schoß sitzt ein kleines Kind, das einen Teddybären hält. Die Frau trägt eine Brille und sieht freundlich und konzentriert aus. Das Kind schaut auf das Heft und scheint ruhig zu sein. Im Hintergrund sehe ich Pflanzen, einen schwarzen Hintergrund mit Notizen und viel Licht, das durch das Fenster kommt. Das Foto zeigt eine typische Situation im Homeoffice. Die Frau arbeitet von zu Hause, während sie sich gleichzeitig um ihr Kind kümmert. Das ist heutzutage sehr häufig, vor allem bei Eltern, die Beruf und Familie verbinden möchten.",
      },
      {
        id: "30",
        file: "/images/sprechen/bild-beschreiben/30.jpg",
        title: "Arbeit und Beruf - Friseursalon",
        alt: "Friseurinnen beim Haareschneiden in einem Salon",
        description:
          "Thema: Arbeit und Beruf. Auf dem Foto sehe ich mehrere Frauen in einem Friseursalon. Im Vordergrund sitzt eine Kundin mit blonden Haaren, die gerade frisiert wird. Zwei Friseurinnen föhnen und stylen ihr die Haare und sehen dabei freundlich und konzentriert aus. Im Hintergrund kann man weitere Kundinnen sehen, die ebenfalls frisiert werden. Der Raum ist hell und modern eingerichtet, mit großen Fenstern und Spiegeln.",
      },
    ],
    "essen-trinken": [
      {
        id: "8",
        file: "/images/sprechen/bild-beschreiben/8.png",
        title: "Kochen und Familie",
        alt: "Mann und Kind kochen zusammen in der Küche",
        description:
          "Thema: Kochen und Familie. Auf dem Foto sehe ich einen Mann und ein Kind, die zusammen in der Küche kochen. Der Mann trägt ein hellblaues Hemd und lächelt. Das Kind sitzt auf der Arbeitsfläche und trägt ein dunkelblau gestreiftes T-Shirt. Beide wirken fröhlich und haben Spaß. Das Kind schneidet rotes Gemüse, wahrscheinlich Paprika, während der Vater in einer Pfanne kocht. Auf dem Tisch liegen verschiedene frische Zutaten: Tomaten, Paprika, Gurken und vielleicht auch Melone. Die Küche sieht modern und hell aus, mit weißen und braunen Farben. Das Foto zeigt eine schöne Familienszene. Ich denke, der Vater kocht mit seinem Sohn, um gemeinsam Zeit zu verbringen und dem Kind etwas beizubringen. Das Kochen kann nicht nur praktisch, sondern auch eine schöne Familienaktivität sein.",
      },
      {
        id: "27",
        file: "/images/sprechen/bild-beschreiben/27.jpg",
        title: "Kochen und Ernährung",
        alt: "Junges Paar kocht zusammen in der Küche",
        description:
          "Thema: Kochen und Ernährung. Auf dem Foto sehe ich ein junges Paar in der Küche. Beide stehen nebeneinander und bereiten gemeinsam das Essen vor. Die Frau rührt Nudeln in einem Topf, während der Mann Gemüse schneidet – ich sehe Zucchini, Karotten und Paprika. Auf dem Tisch liegen Zwiebeln, Knoblauch und Olivenöl, daneben steht auch ein Glas Rotwein. Die Stimmung wirkt sehr angenehm und harmonisch, beide lächeln und scheinen Spaß beim Kochen zu haben.",
      },
    ],
    "reisen-verkehr": [
      {
        id: "9",
        file: "/images/sprechen/bild-beschreiben/9.jpeg",
        title: "Reisen und Urlaub",
        alt: "Familie auf dem Bahnsteig mit Koffer",
        description:
          "Thema: Reisen und Urlaub. Auf dem Foto sehe ich drei Personen – ein Mann, eine Frau und ein Kind. Sie stehen auf einem Bahnsteig und scheinen auf eine Reise zu gehen. Der Mann trägt eine braune Lederjacke und hält einen großen blauen Koffer in der Hand. Das Kind trägt eine braune Jacke, eine dunkle Mütze und einen Rucksack. Die Frau trägt einen hellen Mantel und ebenfalls eine Tasche über der Schulter. Im Hintergrund sieht man einen Zug, der wahrscheinlich bald abfährt. Das Wetter scheint schön zu sein, denn der Himmel ist blau und die Sonne scheint.",
      },
    ],
    "medien-kommunikation": [
      {
        id: "10",
        file: "/images/sprechen/bild-beschreiben/10.jpg",
        title: "Freizeit, Freunde und Medien",
        alt: "Gruppe junger Leute im Park mit Smartphones",
        description:
          "Thema: Freizeit, Freunde und Medien. Auf dem Foto sehe ich fünf junge Leute, die im Park auf dem Gras sitzen. Alle tragen Sommerkleidung – T-Shirts, Shorts, Sonnenbrillen und leichte Schuhe. Das Wetter ist schön, die Sonne scheint, und im Hintergrund sieht man grüne Bäume und Büsche. Alle Jugendlichen haben ein Smartphone in der Hand und schauen konzentriert auf den Bildschirm. Sie sitzen nah beieinander, lachen und wirken gut gelaunt. Das Foto zeigt eine typische Situation aus dem Alltag junger Menschen: Sie treffen sich draußen mit Freunden, aber trotzdem beschäftigt sich jeder mit seinem Handy. Vielleicht machen sie Fotos, hören Musik oder chatten miteinander. Ich benutze mein Handy jeden Tag, aber ich versuche, nicht zu viel Zeit damit zu verbringen. Am Wochenende treffe ich mich lieber mit Freunden ohne Handy, gehe spazieren oder trinke einen Kaffee.",
      },
    ],
    "sport-fitness": [
      {
        id: "11",
        file: "/images/sprechen/bild-beschreiben/11.jpg",
        title: "Gesundheit und Sport",
        alt: "Paar joggt auf einem Waldweg",
        description:
          "Thema: Gesundheit und Sport. Auf dem Foto sehe ich eine Frau und einen Mann, die draußen joggen. Sie laufen auf einem schmalen Weg durch den Wald. Es ist ein sonniger Tag, und die Umgebung ist grün und friedlich. Beide tragen Sportkleidung: Die Frau hat eine weiße Sporttop und eine rosafarbene Leggings an, der Mann trägt ein blaues T-Shirt und schwarze Shorts. Sie sehen fit und fröhlich aus und unterhalten sich beim Laufen. Das Foto zeigt eine typische Freizeitaktivität vieler Menschen – Sport an der frischen Luft.",
      },
      {
        id: "22",
        file: "/images/sprechen/bild-beschreiben/22.jpg",
        title: "Hobbys und Bewegung - Tennis",
        alt: "Vier Personen auf einem Tennisplatz mit Schlägern",
        description:
          "Thema: Hobbys und Bewegung. Auf dem Foto sehe ich vier junge Erwachsene. Sie stehen auf einem Tennisplatz. Links steht ein junger Mann. Er trägt ein graues T-Shirt, gelbe Shorts und schwarze Sportschuhe. Er sieht sportlich und entspannt aus und hält einen Tennisschläger in der Hand. Neben ihm steht eine junge Frau. Sie trägt ein weißes Tennis-Kleid und eine weiße Kappe. Sie wirkt glücklich und lacht leicht. Die dritte Person ist auch eine junge Frau. Sie trägt ein ähnliches weißes Kleid und helle Turnschuhe. Sie schaut freundlich in die Kamera. Rechts steht ein weiterer junger Mann. Er trägt ein weißes Polo-Shirt und schwarze Shorts. In seiner Hand hält er einen Tennisschläger und einen Tennisball. Er wirkt ruhig und konzentriert. Im Vordergrund sehe ich einen Korb mit vielen Tennisbällen. Im Hintergrund gibt es Bäume, und der Platz scheint im Freien zu sein. Das Wetter sieht schön und sonnig aus.",
      },
    ],
    "natur-umwelt": [
      {
        id: "12",
        file: "/images/sprechen/bild-beschreiben/12.jpg",
        title: "Umwelt und Mülltrennung",
        alt: "Überfüllte Mülltonne mit gemischtem Abfall",
        description:
          'Thema: Umwelt und Mülltrennung. Auf dem Foto sehe ich eine überfüllte Mülltonne. Der Deckel ist offen, weil zu viel Müll darin ist. Ich erkenne viele verschiedene Sachen – Plastikflaschen, Glas, Dosen, Papier und Plastiktüten. Die Tonne ist grün und hat ein Schild mit der Aufschrift "Weißglas", aber darin liegt auch anderer Müll, der dort eigentlich nicht hineingehört. Im Hintergrund sieht man einen grauen Boden und eine Mauer. Das Foto zeigt ein typisches Problem: Menschen trennen ihren Müll nicht richtig oder werfen zu viel weg. Ich denke, dass viele Leute nicht genau wissen, welcher Müll wohin gehört, oder sie sind einfach zu bequem. Das ist schlecht für die Umwelt, weil der Müll dann nicht recycelt werden kann.',
      },
      {
        id: "19",
        file: "/images/sprechen/bild-beschreiben/19.png",
        title: "Sperrmüll und Entsorgung",
        alt: "Alte Möbel auf dem Gehweg (Sperrmüll)",
        description:
          "Thema: Umwelt und Müllentsorgung. Auf dem Foto sehe ich alte Möbel, die auf einer Straße stehen. Es liegt ein braunes Sofa, ein Tisch und ein roter Sessel dort. Rechts sieht man auch einen alten Weihnachtsbaum. Die Gegenstände stehen vor einer gelben Backsteinwand auf dem Gehweg. Es scheint Winter zu sein, weil man etwas Schnee auf der Straße sieht. Das Foto zeigt eine typische Situation von Sperrmüll. Wahrscheinlich haben die Leute alte Möbel und den Tannenbaum nach Weihnachten auf die Straße gestellt, damit sie abgeholt werden. Die Situation erinnert an das Thema Umwelt und Müllentsorgung. Ich finde, es ist sehr wichtig, dass wir unseren Müll richtig trennen und entsorgen.",
      },
      {
        id: "20",
        file: "/images/sprechen/bild-beschreiben/20.png",
        title: "Müllabfuhr und Sauberkeit in der Stadt",
        alt: "Müllabfuhrfahrzeug und Arbeiter in orangefarbener Kleidung",
        description:
          "Thema: Müllabfuhr und Sauberkeit in der Stadt. Auf dem Foto sehe ich mehrere Männer in orangefarbener Arbeitskleidung. Sie arbeiten für die Müllabfuhr und leeren Mülltonnen in ein großes orangefarbenes Müllauto. Das Fahrzeug steht am Straßenrand einer Wohnstraße mit vielen Häusern und parkenden Autos. Man sieht auch Fahrräder und Mülltonnen auf dem Gehweg. Die Männer tragen Handschuhe und reflektierende Streifen an der Kleidung – das ist wichtig für die Sicherheit im Straßenverkehr. Die Situation zeigt eine typische Szene aus dem Alltag in der Stadt.",
      },
    ],
    "feste-feiern": [
      {
        id: "13",
        file: "/images/sprechen/bild-beschreiben/13.jpg",
        title: "Feste und Feiern – Hochzeit",
        alt: "Brautpaar und Gäste bei einer Hochzeit",
        description:
          "Thema: Feste und Feiern – Hochzeit. Auf dem Foto sehe ich eine Hochzeitsszene. Im Vordergrund sitzen einige Gäste auf Stühlen und schauen nach vorne. Im Hintergrund steht ein Brautpaar – die Braut trägt ein weißes, elegantes Hochzeitskleid mit Schleier und hält einen Blumenstrauß in der Hand. Der Bräutigam trägt einen grauen Anzug und liest etwas von einem Blatt Papier vor, vielleicht sein Eheversprechen. Neben dem Paar steht ein Mann in schwarzer Kleidung – wahrscheinlich der Standesbeamte oder der Trauredner. Der Raum ist hell und modern, mit großen Fenstern und viel Tageslicht.",
      },
    ],
    freizeit: [
      {
        id: "14",
        file: "/images/sprechen/bild-beschreiben/14.jpeg",
        title: "Freizeit und Urlaub - Schwimmbad",
        alt: "Familie am Pool mit Sonnenbrillen",
        description:
          "Thema: Freizeit und Urlaub. Auf dem Foto sehe ich eine Familie im Schwimmbad oder am Pool. Im Vordergrund sind zwei Erwachsene – eine Frau und ein Mann – und zwei Kinder. Alle vier tragen Badebekleidung und Sonnenbrillen. Sie liegen am Rand des Pools und lächeln einander freundlich an. Im Hintergrund sieht man das blaue Wasser und einige Schwimmringe. Das Wetter scheint sehr warm und sonnig zu sein. Die Familie sieht sehr glücklich und entspannt aus.",
      },
      {
        id: "28",
        file: "/images/sprechen/bild-beschreiben/28.jpg",
        title: "Freizeit und Familie - Picknick",
        alt: "Familie macht Picknick im Park auf einer Decke",
        description:
          "Thema: Freizeit und Familie. Auf dem Foto sehe ich eine Familie, die zusammen ein Picknick im Park macht. Die Eltern sitzen mit ihren zwei kleinen Kindern auf einer Decke auf dem Gras. Auf der Decke liegen ein Picknickkorb, Brot, Saft und Obst. Das Mädchen isst gerade einen Apfel, und der Junge sitzt neben ihr und lächelt. Im Hintergrund sieht man grüne Bäume und schönes Wetter — es scheint ein sonniger Tag zu sein. Die Stimmung auf dem Foto ist sehr fröhlich und entspannt.",
      },
    ],
    freundschaft: [
      {
        id: "15",
        file: "/images/sprechen/bild-beschreiben/15.jpeg",
        title: "Freundschaft und Freizeit - Café",
        alt: "Gruppe junger Leute sitzt draußen im Café und lacht",
        description:
          "Thema: Freundschaft und Freizeit. Auf dem Foto sehe ich eine Gruppe von fünf jungen Menschen, die gemeinsam in einem Café sitzen. Alle lachen und scheinen gute Laune zu haben. Auf dem Tisch stehen mehrere Tassen mit Kaffee oder Cappuccino, und Smartphones. Die Freunde sitzen draußen an einem kleinen runden Tisch – vielleicht ist es Frühling oder Sommer, weil sie leichte Kleidung tragen. Im Hintergrund kann man ein Café oder Restaurant sehen.",
      },
      {
        id: "18",
        file: "/images/sprechen/bild-beschreiben/18.png",
        title: "Nachbarn und Nachbarschaft / Hilfsbereitschaft",
        alt: "Zwei Personen sprechen über einen Gartenzaun; Hilfe mit Lebensmitteln",
        description:
          "Thema: Nachbarn und Nachbarschaft / Hilfsbereitschaft. Auf dem Foto sehe ich zwei Personen, die miteinander sprechen. Ein Mann lehnt sich über einen Gartenzaun und lächelt freundlich. Er trägt ein kariertes Hemd und scheint gut gelaunt zu sein. Vor ihm steht eine Frau, die ihm zuhört – sie trägt ebenfalls ein kariertes Hemd. Im Hintergrund sieht man ein Haus mit einem Garten voller Blumen und Pflanzen. Die Sonne scheint, es ist wahrscheinlich Nachmittag oder früher Abend. Die Situation zeigt ein typisches Gespräch zwischen Nachbarn.",
      },
    ],
    misc: [
      {
        id: "21",
        file: "/images/sprechen/bild-beschreiben/21.jpg",
        title: "Müllabfuhr und Sauberkeit",
        alt: "Müllabfuhr arbeitet in einer Wohnstraße",
        description:
          "Thema: Müllabfuhr und Sauberkeit in der Stadt. Auf dem Foto sehe ich mehrere Männer in orangefarbener Arbeitskleidung. Sie arbeiten für die Müllabfuhr und leeren Mülltonnen in ein großes orangefarbenes Müllauto. Das Fahrzeug steht am Straßenrand einer Wohnstraße mit vielen Häusern und parkenden Autos. Man sieht auch Fahrräder und Mülltonnen auf dem Gehweg. Die Männer tragen Handschuhe und reflektierende Streifen an der Kleidung – das ist wichtig für die Sicherheit im Straßenverkehr.",
      },
    ],
  },
};

fs.writeFileSync(outPath, JSON.stringify(manifest, null, 2) + "\n", "utf8");
console.log("Wrote manifest to", outPath);
