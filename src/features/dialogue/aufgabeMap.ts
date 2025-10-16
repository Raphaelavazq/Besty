// Full Aufgabe texts for Dialogtrainer B1 (1–59)
const aufgabeMap: { [key: number]: string } = {
  1: `Sie möchten mit Ihrer Partnerin/Ihrem Partner bald ein Hausfest machen. Planen Sie , was Sie machen!
Wo?-Wann?-Essen und Trinken?-Andere Ideen?-Einladungen?`,
  2: `Sie und Ihre Freundin/Ihr Freund haben am nächsten Wochenende Bekannte zu sich nach Hause eingeladen. Sie möchten Sie mit einem Essen überraschen. Planen Sie den Abend!
Kochen: was?-Getränke: welche?-Einkaufen: wann?-Nach dem Essen: was unternehmen?`,
  3: `Sie sind in eine neue Wohnung gezogen und möchten eine Hausparty machen! Planen Sie die Party!
Wann?-Wie viele Leute?-Essen und Trinken?-Nachbarn einladen?-Wer macht was?`,
  4: `Sie wohnen in einem großen Haus zur Miete und möchten gemeinsam mit den Nachbarn ein Fest machen. Organisieren Sie das Fest!
Wann?-Essen/Getränke?-Wer bezahlt dafür?-Was brauchen Sie noch (Musik, Spiele für Kinder)?-Wer macht was?`,
  5: `Sie möchten mit Ihren Nachbarn einen Ausflug machen. Planen Sie den Ausflug!
Wann?-Wohin?-Wie lange?-Verkehrsmittel?-Essen/Getränke?`,
  6: `Planen Sie ein Sommerfest mit allen Nachbarn!
Wann?-Wo?-Einladung?-Essen/Getränke?-Unterhaltung?-Wer bezahlt?`,
  7: `Ihr Kind und das Kind Ihrer Nachbarin haben am selben Tag Geburtstag. Organisieren Sie eine gemeinsame Party!
Wann?-Wo?-Wer kommt?-Geschenk?-Unterhaltung/Dekoration?`,
  8: `Ein Nachbar heiratet. Sie sind eingeladen und suchen ein passendes Geschenk.
Welches Geschenk?-Wer kauft es?-Wie teuer?-Geld bei Nachbarn einsammeln?`,
  9: `Sie sind Nachbarn und wollen zusammen einen Nachmittag mit sportlichen Aktivitäten verbringen. Planen Sie den Nachmittag!
Wann?-Was machen?-Mit wem?-Nach dem Sport?-Zu einem Kurs anmelden?`,
  10: `Ihr Nachbar renoviert seine Wohnung. Jeden Sonntag hören Sie laute Maschinen und anderen Krach. Überlegen Sie, was Sie tun können!
Mit dem Nachbarn reden?-Beim Vermieter anrufen?-Andere Nachbarn ansprechen?-Dem Nachbarn helfen?-Die Polizei anrufen?`,
  11: `Sie wollen am Wochenende mit Ihren Freunden in Ihrer Wohnung feiern. Planen Sie die Party!
Wann genau?-Welches Essen?-Wie viele Gäste?-Nachbarn informieren?-Musik?`,
  12: `Zum Kursabschluss wollen Sie eine Ausstellung machen: Fotos und Texte der Kursteilnehmer! Organisieren Sie die Ausstellung!
Wer macht die Fotos?-Wo/wann ist die Ausstellung?-Einladungen?-Getränke?-Begrüßung?`,
  13: `Sie möchten zum Ende Ihres Deutschkurses eine Abschiedsparty feiern. Planen Sie das Fest!
Wo?-Wann?-Essen Getränke?-Musik?-Wer kommt?`,
  14: `Sie sollen im Deutschkurs Ihr Heimatland vorstellen. Planen Sie gemeinsam die Präsentation!
Wo treffen Sie sich?-Wann treffen?-Wo finden Sie Informationen?-Was brauchen Sie? (Fotos, Musik...)?-Essen/ Getränke?`,
  15: `Sie möchten sich gemeinsam auf die B1-Prüfung vorbereiten!
Wann?-Wo?-Wie oft?-Material (Bücher, ...)?-Nach dem Lernen?`,
  16: `Sie möchten zum Abschluss Ihres Deutschkurses ein Wochenende gemeinsam verreisen. Planen Sie die Reise!
Wann?-Wohin?-Wer soll teilnehmen?-Übernachtung?-Welches Verkehrsmittel?`,
  17: `Zwei Jahre nach Ihrer B1-Prüfung möchten Sie ein Klassentreffen machen. Planen Sie gemeinsam!
Wann/wo?- Was machen?-Adressen?-Einladungen?-Wer kommt-Kosten?`,
  18: `Ihr Freund aus dem Deutschkurs ist krank. Sie haben in zwei Wochen einen Test. Überlegen Sie, wie Sie ihm helfen können.
Wann treffen?-Wo?-Material?-Lehrer fragen?-Verkehrsmittel?`,
  19: `Sie möchten mit Ihrem Deutschkurs eine dreitägige Reise machen. Planen Sie gemeinsam!
Wann/wohin?-Verkehrsmittel?-Unterkunft?-Kosten?-Teilnehmer fragen?`,
  20: `Der Deutschkurs ist zu Ende und Sie möchten eine Party feiern. Verschiedene Aufgaben müssen gemacht werden. Planen Sie gemeinsam!
Wann?-Wo?-Raum vorbereiten?-Einladungen schreiben?-Essen/ Getränke?`,
  21: `Ihr Freund aus dem Deutschkurs ist krank. Sie haben in zwei Wochen einen Test zum Thema „Umwelt“. Überlegen Sie, wie Sie ihm helfen können!
Wann mit ihm treffen?-Wo treffen?-Welches Material?- Lehrer fragen?-Verkehrsmittel?`,
  22: `Sie sollen in Ihrer Klasse einen Vortrag zum Thema „Umwelt und Klimawandel“ halten. Planen Sie die Präsentation!
Informationsmaterial?-Welche Themen?-Wer macht was?-Wann treffen?-Wo treffen?`,
  23: `Ein Freund von Ihnen aus dem Deutschkurs möchte nach der B1-Prüfung eine Ausbildung machen. Er weiß nicht, für welche Ausbildung er sich entscheiden soll. Beraten Sie ihn!
Wann?-Wo?-Welche Ausbildung?-Informationen (woher)?-Hilfe bei der Bewerbung?`,
  24: `Sie wollen einen Ausflug vorbereiten, an dem alle Schüler des Deutschkurses teilnehmen sollen. Dieser Ausflug ist der Abschluss des Kurses und soll den ganzen Tag dauern.
Wann und wohin?-Verkehrsmittel?-Kosten?-Was machen?-Essen/Getränke?`,
  25: `Sie haben einige Bekannte aus Ihrem Deutschkurs am Wochenende zu sich nach Hause eingeladen, weil Sie gemeinsam Deutsch lernen wollen. Planen Sie!
Wann genau?-Wo?-Welche Bücher?-Welches andere Lernmaterial?-Essen/Getränke?`,
  26: `Ihre Sprachschule macht bald eine große Feier. Jeder Kurs soll etwas machen. Planen Sie etwas für Ihren Kurs.
Was machen?-Welches Material?-Material/Deko kaufen oder leihen?-Wann vorbereiten?-Andere Kursteilnehmer informieren?`,
  27: `Sie möchten zu zweit einen Kurs an der VHS besuchen. Überlegen Sie gemeinsam, welcher Kurs Ihnen gefallen könnte!
Welcher Kurs (Kochen, Sprachen...)?-Wann?-Wann anmelden?-Zusammen anmelden?-Wie zur VHS kommen?`,
  28: `Sie und Ihre Partnerin/Ihr Partner haben immer sehr viel Stress. Sie möchten gesünder leben! Planen Sie!
Was machen?-Wann?-Wo?-Mit wem?-Weitere Ideen?`,
  29: `Sie und Ihre Partnerin/Ihr Partner möchten zusammen einen Kurs besuchen. Planen Sie gemeinsam.
Was für ein Kurs?-Wann am besten?-Wie anmelden?-Wer macht das?-Wie zum Kurs kommen?`,
  30: `Ihre Kollegin, Rita Schwarz, wird in drei Wochen 50 Jahre alt. Sie hat Sie und andere Kollegen zu einer Geburtstagsfeier eingeladen. Planen Sie!
Welches Verkehrsmittel?- Geschenk?-Geld einsammeln?- Überraschung für Frau Schwarz?-...`,
  31: `Sie sind beide am Wochenende zu einer Hochzeitsfeier eingeladen. Die Hochzeit findet in Neuburg statt, das etwa 100km von Ihnen entfernt liegt. Sie waren noch nie dort und kennen sich nicht aus.
Verkehrsmittel?-Stadtplan?-Geschenk?-Kleidung?-Treffpunkt?`,
  32: `Ihre Freundin hat zwei Katzen. Jetzt muss sie für eine Woche ins Krankenhaus. Sie sollen sich um die Katzen kümmern. Planen Sie!
Was fressen Katzen?-Was trinken sie?-Wer kauft was?-Wer spielt mit den Tieren?-Sand für die Katzentoilette?`,
  33: `Sie und Ihre Partnerin/Ihr Partner sollen zusammen eine Besprechung in der Firma organisieren. Machen Sie einen Plan!
Getränke/Material bestellen?-Raum vorbereiten- Mail an Teilnehmer schreiben-Danach aufräumen- Protokoll schreiben: wer?`,
  34: `Eine Freundin von Ihnen ist für ein Wochenende in den Urlaub gefahren. Sie und Ihre Partnerin/Ihr Partner sollen in dieser Zeit auf ihren 6-jährigen Sohn Philip aufpassen.
Aktivitäten bei gutem Wetter?-Aktivitäten bei schlechtem Wetter?-Essen/Getränke?-Was tun am Abend?-Schlafenszeit?`,
  35: `Sie möchten zu zweit am Wochenende einen Ausflug machen. Planen Sie!
Wann genau?-Wohin?-Wie lange?-Verkehrsmittel?-Was mitnehmen?`,
  36: `Sie wollen zusammen einen Ausflug mit dem Rad machen. Planen Sie!
Wann?-Wohin?-Wer soll mitkommen?-Wie lange?-Was nehmen Sie mit?`,
  37: `Sie möchten am Wochenende mit Freunden grillen.
Wann genau?-Wo?-Was grillen?-Wie viele Leute?-Getränke?`,
  38: `Sie möchten eine Überraschungsparty für Ihren Freund machen, der nach einem Jahr aus Amerika zurückkommt. Planen Sie!
Wann?-Wo?-Welche Gäste?-Essen/Getränke?-Abholen am Flughafen?`,
  39: `Sie möchten gemeinsam Ihren Freund in London besuchen. Planen Sie die Reise!
Wann?-Wie lange?-Verkehrsmittel?-Geschenk für Freund?-Sehenswürdigkeiten besuchen?`,
  40: `Sie möchten mit Ihrer Familie ein Picknick machen. Planen Sie!
Wann?-Wo?-Essen/Getränke?-Spiele?-Verkehrsmittel?`,
  41: `Sie möchten am Samstagabend etwas zusammen machen. Planen Sie den Abend!
Was?-Wo?-Andere Freunde einladen?-Essen/Getränke?-Wie lange?`,
  42: `Sie möchten gemeinsam neue Möbel für das Wohnzimmer kaufen. Planen Sie den Einkauf!
Termin?-Wo?-Was brauchen Sie?-Hilfe?-Transportmittel?`,
  43: `Sie wollen gemeinsam einen Kindergeburtstag organisieren. Verschiedene Aufgaben müssen erledigt werden.
Einladungen schreiben?- Dekoration?- Wer kommt?-Spiele?-Essen/Getränke`,
  44: `Eine befreundete Familie mit zwei kleinen Kindern zieht in eine neue Wohnung Sie haben versprochen, beim Umzug zu helfen. Organisieren Sie den Umzug.
Termin?-Transportmittel: Auto/LKW?-Wer kann noch helfen?-Essen/Getränke für die Helfer?-Wer kümmert sich um die Kinder?`,
  45: `Sie möchten in der Schule einen Hausaufgabenraum einrichten. Überlegen Sie, was Sie dazu brauchen!
Was kaufen?-Wo kaufen?-Betreuung?-Essen anbieten?-Öffnungszeiten?`,
  46: `Überlegen Sie, wie Sie die Umwelt schützen können.
Bioprodukte-Verkehrsmittel- Müll-alternative Energien- Zuhause`,
  47: `Sie sollen einen Bericht zum Thema „Umweltschutz“ schreiben. Überlegen Sie gemeinsam!
Welche Themen?- Woher Informationen?-Wann schreiben?-Wo treffen?-Was brauchen Sie?`,
  48: `Sie sind bei einem Elternabend. Die Lehrerin möchte einen Ausflug zum Thema „Umwelt“ machen und bittet Sie um Hilfe. Planen Sie gemeinsam!
Wohin?-Wann?-Transportmittel?-Kosten?-Betreuer?`,
  49: `Sie möchten ehrenamtlich arbeiten und sich für die Umwelt engagieren. Überlegen Sie, was Sie machen können.
Bei der Stadt nachfragen?-Müll sammeln?-Menschen informieren?-Bei einer Umweltorganisation anmelden?...`,
  50: `Planen Sie ein Klassenfest für Ihre Kinder!
Wann?-Wo?-Was machen?-Lehrer fragen?-Eltern auch einladen?`,
  51: `Ihre Kursleiterin bittet Sie als Abschluss des Kurses einen Ausflug in die Stadt zu planen. Organisieren Sie gemeinsam!
Wann?-Verkehrsmittel (Tickets kaufen)?-Wie lange?-Sehenswürdigkeiten?-Einladung?`,
  52: `Sie arbeiten ehrenamtlich und betreuen junge Menschen, die im Rollstuhl sitzen. Planen Sie gemeinsam einen Ausflug!
Wann?-Wohin?-Transportmittel?-Verpflegung?-Wie viele Betreuer?`,
  53: `Sie und Ihre Partnerin/Ihr Partner eröffnen bald zusammen ein Geschäft. Planen Sie die Eröffnungsfeier.
Wann?-Wo?-Wie lange?-Wer wird eingeladen?-Essen/Getränke?`,
  54: `Ihre Kinder sind in Mathematik und Englisch nicht gut in der Schule. Planen Sie, was Sie tun können.
Wann treffen?-Wo treffen?-Nachhilfe?-Mit Lehrer sprechen?-Hausaufgabenbetreuung?`,
  55: `Ihr Freund möchte ein Haus kaufen. Er weiß nicht, ob er in die Stadt oder aufs Land ziehen soll. Beraten Sie ihn!
Wann treffen?-Wo treffen?-Was raten (Vorteile/Nachteile)?-Andere Freunde fragen?-Aktivität nach der Beratung?`,
  56: `Sie und Ihr Partner/Ihre Partnerin wollen zusammen ein Auto kaufen. Überlegen Sie gemeinsam.
Wann?-Welches Auto?-Wie teuer?-Wo kaufen?-Welche Versicherung?`,
  57: `Ihr Freund möchte ein Auto kaufen. Beraten Sie ihn!
Welches Auto?-Neu oder Gebrauchtwagen?-Welche Versicherung?-Wann kaufen?-Wo kaufen?`,
  58: `In Ihrer Heimatstadt findet ein Oktoberfest statt. Sie wollen gemeinsam dorthin gehen. Planen Sie!
Wann?-Kleidung?-Mit wem?-Wo treffen?-Eintrittskarten bestellen?`,
  59: `Sie haben ein Auto gekauft. Überlegen Sie gemeinsam, wie Sie das Auto versichern!
Wo informieren?-Freunde fragen?-Haftpflichtversicherung?-Kaskoversicherung?-Wann Auto anmelden?`,
};
export default aufgabeMap;
