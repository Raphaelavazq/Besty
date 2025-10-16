#!/usr/bin/env python3
"""
Dialogue Catalog Generator for DTZ Sprechen Teil 3
Generates complete JSON catalog with all 59 scenarios
"""

import json

# All 59 Aufgabe and Leitpunkte from your requirements
scenarios_data = [
    {
        "number": 1,
        "title": "Hausfest mit Partner/in planen",
        "theme": "Feiern & Veranstaltungen",
        "aufgabe": "Sie möchten mit Ihrer Partnerin/Ihrem Partner bald ein Hausfest machen. Planen Sie, was Sie machen!",
        "leitpunkte": ["Wo?", "Wann?", "Essen und Trinken?", "Andere Ideen?", "Einladungen?"]
    },
    {
        "number": 2,
        "title": "Essen für Bekannte planen",
        "theme": "Feiern & Veranstaltungen",
        "aufgabe": "Sie und Ihre Freundin/Ihr Freund haben am nächsten Wochenende Bekannte zu sich nach Hause eingeladen. Sie möchten Sie mit einem Essen überraschen. Planen Sie den Abend!",
        "leitpunkte": ["Kochen: was?", "Getränke: welche?", "Einkaufen: wann?", "Nach dem Essen: was unternehmen?"]
    },
    {
        "number": 3,
        "title": "Hausparty in neuer Wohnung",
        "theme": "Feiern & Veranstaltungen",
        "aufgabe": "Sie sind in eine neue Wohnung gezogen und möchten eine Hausparty machen! Planen Sie die Party!",
        "leitpunkte": ["Wann?", "Wie viele Leute?", "Essen und Trinken?", "Nachbarn einladen?", "Wer macht was?"]
    },
    {
        "number": 4,
        "title": "Fest mit Nachbarn organisieren",
        "theme": "Nachbarschaft & Wohnen",
        "aufgabe": "Sie wohnen in einem großen Haus zur Miete und möchten gemeinsam mit den Nachbarn ein Fest machen. Organisieren Sie das Fest!",
        "leitpunkte": ["Wann?", "Essen/Getränke?", "Wer bezahlt dafür?", "Was brauchen Sie noch (Musik, Spiele für Kinder)?", "Wer macht was?"]
    },
    {
        "number": 5,
        "title": "Ausflug mit Nachbarn",
        "theme": "Nachbarschaft & Freizeit",
        "aufgabe": "Sie möchten mit Ihren Nachbarn einen Ausflug machen. Planen Sie den Ausflug!",
        "leitpunkte": ["Wann?", "Wohin?", "Wie lange?", "Verkehrsmittel?", "Essen/Getränke?"]
    },
    {
        "number": 6,
        "title": "Sommerfest planen",
        "theme": "Feiern & Nachbarschaft",
        "aufgabe": "Planen Sie ein Sommerfest mit allen Nachbarn!",
        "leitpunkte": ["Wann?", "Wo?", "Einladung?", "Essen/Getränke?", "Unterhaltung?", "Wer bezahlt?"]
    },
    {
        "number": 7,
        "title": "Gemeinsame Geburtstagsparty für Kinder",
        "theme": "Kinder & Feiern",
        "aufgabe": "Ihr Kind und das Kind Ihrer Nachbarin haben am selben Tag Geburtstag. Organisieren Sie eine gemeinsame Party!",
        "leitpunkte": ["Wann?", "Wo?", "Wer kommt?", "Geschenk?", "Unterhaltung/Dekoration?"]
    },
    {
        "number": 8,
        "title": "Geschenk für Nachbars Hochzeit",
        "theme": "Feiern & Geschenke",
        "aufgabe": "Ein Nachbar heiratet. Sie sind eingeladen und suchen ein passendes Geschenk.",
        "leitpunkte": ["Welches Geschenk?", "Wer kauft es?", "Wie teuer?", "Geld bei Nachbarn einsammeln?"]
    },
    {
        "number": 9,
        "title": "Sportlicher Nachmittag mit Nachbarn",
        "theme": "Sport & Freizeit",
        "aufgabe": "Sie sind Nachbarn und wollen zusammen einen Nachmittag mit sportlichen Aktivitäten verbringen. Planen Sie den Nachmittag!",
        "leitpunkte": ["Wann?", "Was machen?", "Mit wem?", "Nach dem Sport?", "Zu einem Kurs anmelden?"]
    },
    {
        "number": 10,
        "title": "Lärm durch Nachbar – Was tun?",
        "theme": "Nachbarschaft & Probleme",
        "aufgabe": "Ihr Nachbar renoviert seine Wohnung. Jeden Sonntag hören Sie laute Maschinen und anderen Krach. Überlegen Sie, was Sie tun können!",
        "leitpunkte": ["Mit dem Nachbarn reden?", "Beim Vermieter anrufen?", "Andere Nachbarn ansprechen?", "Dem Nachbarn helfen?", "Die Polizei anrufen?"]
    },
    {
        "number": 11,
        "title": "Wochenendfeier planen",
        "theme": "Feiern & Freunde",
        "aufgabe": "Sie wollen am Wochenende mit Ihren Freunden in Ihrer Wohnung feiern. Planen Sie die Party!",
        "leitpunkte": ["Wann genau?", "Welches Essen?", "Wie viele Gäste?", "Nachbarn informieren?", "Musik?"]
    },
    {
        "number": 12,
        "title": "Kursabschluss-Ausstellung",
        "theme": "Deutschkurs & Lernen",
        "aufgabe": "Zum Kursabschluss wollen Sie eine Ausstellung machen: Fotos und Texte der Kursteilnehmer! Organisieren Sie die Ausstellung!",
        "leitpunkte": ["Wer macht die Fotos?", "Wo/wann ist die Ausstellung?", "Einladungen?", "Getränke?", "Begrüßung?"]
    },
    {
        "number": 13,
        "title": "Abschiedsparty vom Deutschkurs",
        "theme": "Deutschkurs & Feiern",
        "aufgabe": "Sie möchten zum Ende Ihres Deutschkurses eine Abschiedsparty feiern. Planen Sie das Fest!",
        "leitpunkte": ["Wo?", "Wann?", "Essen Getränke?", "Musik?", "Wer kommt?"]
    },
    {
        "number": 14,
        "title": "Heimatland im Deutschkurs vorstellen",
        "theme": "Deutschkurs & Präsentation",
        "aufgabe": "Sie sollen im Deutschkurs Ihr Heimatland vorstellen. Planen Sie gemeinsam die Präsentation!",
        "leitpunkte": ["Wo treffen Sie sich?", "Wann treffen?", "Wo finden Sie Informationen?", "Was brauchen Sie? (Fotos, Musik...)?", "Essen/ Getränke?"]
    },
    {
        "number": 15,
        "title": "B1-Prüfung gemeinsam vorbereiten",
        "theme": "Deutschkurs & Lernen",
        "aufgabe": "Sie möchten sich gemeinsam auf die B1-Prüfung vorbereiten!",
        "leitpunkte": ["Wann?", "Wo?", "Wie oft?", "Material (Bücher, ...)?", "Nach dem Lernen?"]
    },
    {
        "number": 16,
        "title": "Wochenendreise mit Deutschkurs",
        "theme": "Deutschkurs & Reisen",
        "aufgabe": "Sie möchten zum Abschluss Ihres Deutschkurses ein Wochenende gemeinsam verreisen. Planen Sie die Reise!",
        "leitpunkte": ["Wann?", "Wohin?", "Wer soll teilnehmen?", "Übernachtung?", "Welches Verkehrsmittel?"]
    },
    {
        "number": 17,
        "title": "Klassentreffen nach B1-Prüfung",
        "theme": "Deutschkurs & Feiern",
        "aufgabe": "Zwei Jahre nach Ihrer B1-Prüfung möchten Sie ein Klassentreffen machen. Planen Sie gemeinsam!",
        "leitpunkte": ["Wann/wo?", "Was machen?", "Adressen?", "Einladungen?", "Wer kommt?", "Kosten?"]
    },
    {
        "number": 18,
        "title": "Krankem Freund aus Deutschkurs helfen",
        "theme": "Deutschkurs & Helfen",
        "aufgabe": "Ihr Freund aus dem Deutschkurs ist krank. Sie haben in zwei Wochen einen Test. Überlegen Sie, wie Sie ihm helfen können.",
        "leitpunkte": ["Wann treffen?", "Wo?", "Material?", "Lehrer fragen?", "Verkehrsmittel?"]
    },
    {
        "number": 19,
        "title": "Dreitägige Reise mit Deutschkurs",
        "theme": "Deutschkurs & Reisen",
        "aufgabe": "Sie möchten mit Ihrem Deutschkurs eine dreitägige Reise machen. Planen Sie gemeinsam!",
        "leitpunkte": ["Wann/wohin?", "Verkehrsmittel?", "Unterkunft?", "Kosten?", "Teilnehmer fragen?"]
    },
    {
        "number": 20,
        "title": "Party zum Deutschkurs-Ende",
        "theme": "Deutschkurs & Feiern",
        "aufgabe": "Der Deutschkurs ist zu Ende und Sie möchten eine Party feiern. Verschiedene Aufgaben müssen gemacht werden. Planen Sie gemeinsam!",
        "leitpunkte": ["Wann?", "Wo?", "Raum vorbereiten?", "Einladungen schreiben?", "Essen/ Getränke?"]
    },
    {
        "number": 21,
        "title": "Krankem Freund für Umwelt-Test helfen",
        "theme": "Deutschkurs & Umwelt",
        "aufgabe": "Ihr Freund aus dem Deutschkurs ist krank. Sie haben in zwei Wochen einen Test zum Thema „Umwelt". Überlegen Sie, wie Sie ihm helfen können!",
        "leitpunkte": ["Wann mit ihm treffen?", "Wo treffen?", "Welches Material?", "Lehrer fragen?", "Verkehrsmittel?"]
    },
    {
        "number": 22,
        "title": "Vortrag Umwelt und Klimawandel",
        "theme": "Deutschkurs & Umwelt",
        "aufgabe": "Sie sollen in Ihrer Klasse einen Vortrag zum Thema „Umwelt und Klimawandel" halten. Planen Sie die Präsentation!",
        "leitpunkte": ["Informationsmaterial?", "Welche Themen?", "Wer macht was?", "Wann treffen?", "Wo treffen?"]
    },
    {
        "number": 23,
        "title": "Freund bei Ausbildungswahl beraten",
        "theme": "Beratung & Beruf",
        "aufgabe": "Ein Freund von Ihnen aus dem Deutschkurs möchte nach der B1-Prüfung eine Ausbildung machen. Er weiß nicht, für welche Ausbildung er sich entscheiden soll. Beraten Sie ihn!",
        "leitpunkte": ["Wann?", "Wo?", "Welche Ausbildung?", "Informationen (woher)?", "Hilfe bei der Bewerbung?"]
    },
    {
        "number": 24,
        "title": "Ganztägiger Deutschkurs-Ausflug",
        "theme": "Deutschkurs & Ausflüge",
        "aufgabe": "Sie wollen einen Ausflug vorbereiten, an dem alle Schüler des Deutschkurses teilnehmen sollen. Dieser Ausflug ist der Abschluss des Kurses und soll den ganzen Tag dauern.",
        "leitpunkte": ["Wann und wohin?", "Verkehrsmittel?", "Kosten?", "Was machen?", "Essen/Getränke?"]
    },
    {
        "number": 25,
        "title": "Gemeinsam Deutsch lernen am Wochenende",
        "theme": "Deutschkurs & Lernen",
        "aufgabe": "Sie haben einige Bekannte aus Ihrem Deutschkurs am Wochenende zu sich nach Hause eingeladen, weil Sie gemeinsam Deutsch lernen wollen. Planen Sie!",
        "leitpunkte": ["Wann genau?", "Wo?", "Welche Bücher?", "Welches andere Lernmaterial?", "Essen/Getränke?"]
    },
    {
        "number": 26,
        "title": "Kurs-Beitrag für Sprachschulfeier",
        "theme": "Deutschkurs & Feiern",
        "aufgabe": "Ihre Sprachschule macht bald eine große Feier. Jeder Kurs soll etwas machen. Planen Sie etwas für Ihren Kurs.",
        "leitpunkte": ["Was machen?", "Welches Material?", "Material/Deko kaufen oder leihen?", "Wann vorbereiten?", "Andere Kursteilnehmer informieren?"]
    },
    {
        "number": 27,
        "title": "VHS-Kurs zusammen besuchen",
        "theme": "Weiterbildung & Freizeit",
        "aufgabe": "Sie möchten zu zweit einen Kurs an der VHS besuchen. Überlegen Sie gemeinsam, welcher Kurs Ihnen gefallen könnte!",
        "leitpunkte": ["Welcher Kurs (Kochen, Sprachen...)?", "Wann?", "Wann anmelden?", "Zusammen anmelden?", "Wie zur VHS kommen?"]
    },
    {
        "number": 28,
        "title": "Gesünder leben – Stress reduzieren",
        "theme": "Gesundheit & Freizeit",
        "aufgabe": "Sie und Ihre Partnerin/Ihr Partner haben immer sehr viel Stress. Sie möchten gesünder leben! Planen Sie!",
        "leitpunkte": ["Was machen?", "Wann?", "Wo?", "Mit wem?", "Weitere Ideen?"]
    },
    {
        "number": 29,
        "title": "Gemeinsam einen Kurs besuchen",
        "theme": "Weiterbildung",
        "aufgabe": "Sie und Ihre Partnerin/Ihr Partner möchten zusammen einen Kurs besuchen. Planen Sie gemeinsam.",
        "leitpunkte": ["Was für ein Kurs?", "Wann am besten?", "Wie anmelden?", "Wer macht das?", "Wie zum Kurs kommen?"]
    },
    {
        "number": 30,
        "title": "Geburtstagsfeier der Kollegin",
        "theme": "Arbeit & Feiern",
        "aufgabe": "Ihre Kollegin, Rita Schwarz, wird in drei Wochen 50 Jahre alt. Sie hat Sie und andere Kollegen zu einer Geburtstagsfeier eingeladen. Planen Sie!",
        "leitpunkte": ["Welches Verkehrsmittel?", "Geschenk?", "Geld einsammeln?", "Überraschung für Frau Schwarz?"]
    },
    {
        "number": 31,
        "title": "Hochzeitsfeier in Neuburg",
        "theme": "Feiern & Reisen",
        "aufgabe": "Sie sind beide am Wochenende zu einer Hochzeitsfeier eingeladen. Die Hochzeit findet in Neuburg statt, das etwa 100km von Ihnen entfernt liegt. Sie waren noch nie dort und kennen sich nicht aus.",
        "leitpunkte": ["Verkehrsmittel?", "Stadtplan?", "Geschenk?", "Kleidung?", "Treffpunkt?"]
    },
    {
        "number": 32,
        "title": "Katzen der Freundin versorgen",
        "theme": "Helfen & Tiere",
        "aufgabe": "Ihre Freundin hat zwei Katzen. Jetzt muss sie für eine Woche ins Krankenhaus. Sie sollen sich um die Katzen kümmern. Planen Sie!",
        "leitpunkte": ["Was fressen Katzen?", "Was trinken sie?", "Wer kauft was?", "Wer spielt mit den Tieren?", "Sand für die Katzentoilette?"]
    },
    {
        "number": 33,
        "title": "Besprechung in der Firma organisieren",
        "theme": "Arbeit & Organisation",
        "aufgabe": "Sie und Ihre Partnerin/Ihr Partner sollen zusammen eine Besprechung in der Firma organisieren. Machen Sie einen Plan!",
        "leitpunkte": ["Getränke/Material bestellen?", "Raum vorbereiten?", "Mail an Teilnehmer schreiben?", "Danach aufräumen?", "Protokoll schreiben: wer?"]
    },
    {
        "number": 34,
        "title": "Auf 6-jährigen Sohn aufpassen",
        "theme": "Kinder & Helfen",
        "aufgabe": "Eine Freundin von Ihnen ist für ein Wochenende in den Urlaub gefahren. Sie und Ihre Partnerin/Ihr Partner sollen in dieser Zeit auf ihren 6-jährigen Sohn Philip aufpassen.",
        "leitpunkte": ["Aktivitäten bei gutem Wetter?", "Aktivitäten bei schlechtem Wetter?", "Essen/Getränke?", "Was tun am Abend?", "Schlafenszeit?"]
    },
    {
        "number": 35,
        "title": "Ausflug am Wochenende",
        "theme": "Freizeit & Ausflüge",
        "aufgabe": "Sie möchten zu zweit am Wochenende einen Ausflug machen. Planen Sie!",
        "leitpunkte": ["Wann genau?", "Wohin?", "Wie lange?", "Verkehrsmittel?", "Was mitnehmen?"]
    },
    {
        "number": 36,
        "title": "Fahrradausflug planen",
        "theme": "Sport & Ausflüge",
        "aufgabe": "Sie wollen zusammen einen Ausflug mit dem Rad machen. Planen Sie!",
        "leitpunkte": ["Wann?", "Wohin?", "Wer soll mitkommen?", "Wie lange?", "Was nehmen Sie mit?"]
    },
    {
        "number": 37,
        "title": "Grillen mit Freunden",
        "theme": "Freizeit & Feiern",
        "aufgabe": "Sie möchten am Wochenende mit Freunden grillen.",
        "leitpunkte": ["Wann genau?", "Wo?", "Was grillen?", "Wie viele Leute?", "Getränke?"]
    },
    {
        "number": 38,
        "title": "Überraschungsparty für Freund aus Amerika",
        "theme": "Freunde & Feiern",
        "aufgabe": "Sie möchten eine Überraschungsparty für Ihren Freund machen, der nach einem Jahr aus Amerika zurückkommt. Planen Sie!",
        "leitpunkte": ["Wann?", "Wo?", "Welche Gäste?", "Essen/Getränke?", "Abholen am Flughafen?"]
    },
    {
        "number": 39,
        "title": "Freund in London besuchen",
        "theme": "Freunde & Reisen",
        "aufgabe": "Sie möchten gemeinsam Ihren Freund in London besuchen. Planen Sie die Reise!",
        "leitpunkte": ["Wann?", "Wie lange?", "Verkehrsmittel?", "Geschenk für Freund?", "Sehenswürdigkeiten besuchen?"]
    },
    {
        "number": 40,
        "title": "Picknick mit Familie",
        "theme": "Familie & Freizeit",
        "aufgabe": "Sie möchten mit Ihrer Familie ein Picknick machen. Planen Sie!",
        "leitpunkte": ["Wann?", "Wo?", "Essen/Getränke?", "Spiele?", "Verkehrsmittel?"]
    },
    {
        "number": 41,
        "title": "Samstagabend gemeinsam planen",
        "theme": "Freizeit & Freunde",
        "aufgabe": "Sie möchten am Samstagabend etwas zusammen machen. Planen Sie den Abend!",
        "leitpunkte": ["Was?", "Wo?", "Andere Freunde einladen?", "Essen/Getränke?", "Wie lange?"]
    },
    {
        "number": 42,
        "title": "Neue Möbel fürs Wohnzimmer kaufen",
        "theme": "Wohnen & Einkaufen",
        "aufgabe": "Sie möchten gemeinsam neue Möbel für das Wohnzimmer kaufen. Planen Sie den Einkauf!",
        "leitpunkte": ["Termin?", "Wo?", "Was brauchen Sie?", "Hilfe?", "Transportmittel?"]
    },
    {
        "number": 43,
        "title": "Kindergeburtstag organisieren",
        "theme": "Kinder & Feiern",
        "aufgabe": "Sie wollen gemeinsam einen Kindergeburtstag organisieren. Verschiedene Aufgaben müssen erledigt werden.",
        "leitpunkte": ["Einladungen schreiben?", "Dekoration?", "Wer kommt?", "Spiele?", "Essen/Getränke?"]
    },
    {
        "number": 44,
        "title": "Familie beim Umzug helfen",
        "theme": "Helfen & Umzug",
        "aufgabe": "Eine befreundete Familie mit zwei kleinen Kindern zieht in eine neue Wohnung Sie haben versprochen, beim Umzug zu helfen. Organisieren Sie den Umzug.",
        "leitpunkte": ["Termin?", "Transportmittel: Auto/LKW?", "Wer kann noch helfen?", "Essen/Getränke für die Helfer?", "Wer kümmert sich um die Kinder?"]
    },
    {
        "number": 45,
        "title": "Hausaufgabenraum in Schule einrichten",
        "theme": "Schule & Organisation",
        "aufgabe": "Sie möchten in der Schule einen Hausaufgabenraum einrichten. Überlegen Sie, was Sie dazu brauchen!",
        "leitpunkte": ["Was kaufen?", "Wo kaufen?", "Betreuung?", "Essen anbieten?", "Öffnungszeiten?"]
    },
    {
        "number": 46,
        "title": "Umwelt schützen – Was tun?",
        "theme": "Umwelt & Nachhaltigkeit",
        "aufgabe": "Überlegen Sie, wie Sie die Umwelt schützen können.",
        "leitpunkte": ["Bioprodukte?", "Verkehrsmittel?", "Müll?", "Alternative Energien?", "Zuhause?"]
    },
    {
        "number": 47,
        "title": "Bericht zum Umweltschutz schreiben",
        "theme": "Umwelt & Lernen",
        "aufgabe": "Sie sollen einen Bericht zum Thema „Umweltschutz" schreiben. Überlegen Sie gemeinsam!",
        "leitpunkte": ["Welche Themen?", "Woher Informationen?", "Wann schreiben?", "Wo treffen?", "Was brauchen Sie?"]
    },
    {
        "number": 48,
        "title": "Schulausflug zum Thema Umwelt",
        "theme": "Schule & Umwelt",
        "aufgabe": "Sie sind bei einem Elternabend. Die Lehrerin möchte einen Ausflug zum Thema „Umwelt" machen und bittet Sie um Hilfe. Planen Sie gemeinsam!",
        "leitpunkte": ["Wohin?", "Wann?", "Transportmittel?", "Kosten?", "Betreuer?"]
    },
    {
        "number": 49,
        "title": "Ehrenamtlich für Umwelt engagieren",
        "theme": "Umwelt & Ehrenamt",
        "aufgabe": "Sie möchten ehrenamtlich arbeiten und sich für die Umwelt engagieren. Überlegen Sie, was Sie machen können.",
        "leitpunkte": ["Bei der Stadt nachfragen?", "Müll sammeln?", "Menschen informieren?", "Bei einer Umweltorganisation anmelden?"]
    },
    {
        "number": 50,
        "title": "Klassenfest für Kinder planen",
        "theme": "Schule & Feiern",
        "aufgabe": "Planen Sie ein Klassenfest für Ihre Kinder!",
        "leitpunkte": ["Wann?", "Wo?", "Was machen?", "Lehrer fragen?", "Eltern auch einladen?"]
    },
    {
        "number": 51,
        "title": "Stadtausflug als Kursabschluss",
        "theme": "Deutschkurs & Ausflüge",
        "aufgabe": "Ihre Kursleiterin bittet Sie als Abschluss des Kurses einen Ausflug in die Stadt zu planen. Organisieren Sie gemeinsam!",
        "leitpunkte": ["Wann?", "Verkehrsmittel (Tickets kaufen)?", "Wie lange?", "Sehenswürdigkeiten?", "Einladung?"]
    },
    {
        "number": 52,
        "title": "Ausflug mit Menschen im Rollstuhl",
        "theme": "Ehrenamt & Inklusion",
        "aufgabe": "Sie arbeiten ehrenamtlich und betreuen junge Menschen, die im Rollstuhl sitzen. Planen Sie gemeinsam einen Ausflug!",
        "leitpunkte": ["Wann?", "Wohin?", "Transportmittel?", "Verpflegung?", "Wie viele Betreuer?"]
    },
    {
        "number": 53,
        "title": "Eröffnungsfeier fürs Geschäft",
        "theme": "Geschäft & Feiern",
        "aufgabe": "Sie und Ihre Partnerin/Ihr Partner eröffnen bald zusammen ein Geschäft. Planen Sie die Eröffnungsfeier.",
        "leitpunkte": ["Wann?", "Wo?", "Wie lange?", "Wer wird eingeladen?", "Essen/Getränke?"]
    },
    {
        "number": 54,
        "title": "Kinder in Mathe und Englisch unterstützen",
        "theme": "Kinder & Schule",
        "aufgabe": "Ihre Kinder sind in Mathematik und Englisch nicht gut in der Schule. Planen Sie, was Sie tun können.",
        "leitpunkte": ["Wann treffen?", "Wo treffen?", "Nachhilfe?", "Mit Lehrer sprechen?", "Hausaufgabenbetreuung?"]
    },
    {
        "number": 55,
        "title": "Freund bei Hauskauf beraten",
        "theme": "Beratung & Wohnen",
        "aufgabe": "Ihr Freund möchte ein Haus kaufen. Er weiß nicht, ob er in die Stadt oder auf's Land ziehen soll. Beraten Sie ihn!",
        "leitpunkte": ["Wann treffen?", "Wo treffen?", "Was raten (Vorteile/ Nachteile)?", "Andere Freunde fragen?", "Aktivität nach der Beratung?"]
    },
    {
        "number": 56,
        "title": "Gemeinsam Auto kaufen",
        "theme": "Einkaufen & Verkehr",
        "aufgabe": "Sie und Ihr Partner/Ihre Partnerin wollen zusammen ein Auto kaufen. Überlegen Sie gemeinsam.",
        "leitpunkte": ["Wann?", "Welches Auto?", "Wie teuer?", "Wo kaufen?", "Welche Versicherung?"]
    },
    {
        "number": 57,
        "title": "Freund beim Autokauf beraten",
        "theme": "Beratung & Verkehr",
        "aufgabe": "Ihr Freund möchte ein Auto kaufen. Beraten Sie ihn!",
        "leitpunkte": ["Welches Auto?", "Neu- oder Gebrauchtwagen?", "Welche Versicherung?", "Wann kaufen?", "Wo kaufen?"]
    },
    {
        "number": 58,
        "title": "Oktoberfest in Heimatstadt besuchen",
        "theme": "Feiern & Kultur",
        "aufgabe": "In Ihrer Heimatstadt findet ein Oktoberfest statt. Sie wollen gemeinsam dorthin gehen. Planen Sie!",
        "leitpunkte": ["Wann?", "Kleidung?", "Mit wem?", "Wo treffen?", "Eintrittskarten bestellen?"]
    },
    {
        "number": 59,
        "title": "Auto versichern",
        "theme": "Verkehr & Versicherung",
        "aufgabe": "Sie haben ein Auto gekauft. Überlegen Sie gemeinsam, wie Sie das Auto versichern!",
        "leitpunkte": ["Wo informieren?", "Freunde fragen?", "Haftpflichtversicherung?", "Kaskoversicherung?", "Wann Auto anmelden?"]
    }
]

def generate_catalog():
    """Generate complete catalog JSON"""
    
    catalog = {
        "meta": {
            "version": "3.0",
            "level": "B1",
            "total_scenarios": 59,
            "tags": ["DTZ", "Teil 3", "Planen", "Natürliche Dialoge"],
            "description": "Vollständiger Katalog aller 59 DTZ Sprechen Teil 3 Dialoge mit Aufgaben und Leitpunkten"
        },
        "scenarios": []
    }
    
    for data in scenarios_data:
        scenario = {
            "id": str(data["number"]),
            "number": data["number"],
            "title": data["title"],
            "theme": data["theme"],
            "aufgabe": data["aufgabe"],
            "leitpunkte": data["leitpunkte"],
            "greeting": "Hallo! Wie geht's? Schön, dass wir Zeit haben, das zusammen zu planen.",
            "steps": [
                {
                    "id": 1,
                    "examinerPrompt": f"Also, lass uns überlegen: {data['leitpunkte'][0] if data['leitpunkte'] else 'Was denkst du?'}",
                    "choices": {
                        "positive": "Ja, das ist eine gute Idee! Das finde ich auch wichtig.",
                        "negative": "Hmm, ich weiß nicht. Vielleicht sollten wir etwas anderes machen?",
                        "question": "Was hältst du davon? Hast du schon eine Idee?",
                        "suggestion": "Ich würde vorschlagen, dass wir das so machen. Was denkst du?"
                    }
                },
                {
                    "id": 2,
                    "examinerPrompt": f"Gut! Und {data['leitpunkte'][1] if len(data['leitpunkte']) > 1 else 'was machen wir noch?'}",
                    "choices": {
                        "positive": "Perfekt! Das passt gut.",
                        "negative": "Das geht leider nicht, weil ich da keine Zeit habe.",
                        "question": "Sollen wir vielleicht auch noch etwas anderes überlegen?",
                        "suggestion": "Wie wäre es, wenn wir das kombinieren?"
                    }
                },
                {
                    "id": 3,
                    "examinerPrompt": f"Super! Jetzt noch: {data['leitpunkte'][2] if len(data['leitpunkte']) > 2 else 'Haben wir alles?'}",
                    "choices": {
                        "positive": "Ja, genau! Das ist wichtig.",
                        "negative": "Nein, das brauchen wir nicht unbedingt.",
                        "question": "Wer könnte das organisieren?",
                        "suggestion": "Ich könnte das übernehmen, wenn du möchtest."
                    }
                }
            ],
            "closing": "Perfekt! Ich denke, wir haben jetzt einen guten Plan. Das wird bestimmt gut!"
        }
        
        catalog["scenarios"].append(scenario)
    
    return catalog

if __name__ == "__main__":
    catalog = generate_catalog()
    
    # Write to file
    output_path = "public/data/sprechen/dialogues-catalog-complete.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generated complete catalog with {len(catalog['scenarios'])} scenarios")
    print(f"📝 Saved to: {output_path}")
    print("\nNext steps:")
    print("1. Review the generated catalog")
    print("2. Replace the old catalog: mv dialogues-catalog-complete.json dialogues-catalog.json")
    print("3. Test the interface")
    print("4. Enhance individual dialogues with more natural conversation flows")
