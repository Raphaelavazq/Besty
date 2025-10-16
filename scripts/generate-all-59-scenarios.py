#!/usr/bin/env python3
"""
Generate complete DTZ Sprechen Teil 3 catalog with all 59 scenarios
For AI-powered trainer - only Aufgabe and Leitpunkte needed
"""

import json

def create_all_59_scenarios():
    """
    Creates all 59 DTZ Sprechen Teil 3 scenarios with Aufgabe and Leitpunkte.
    AI will generate the actual conversations dynamically.
    """
    
    scenarios = [
        # Theme 1: Feiern & Veranstaltungen (Celebrations & Events) - 10 scenarios
        {
            "id": "1", "number": 1,
            "title": "Hausfest mit Partner/in planen",
            "theme": "Feiern & Veranstaltungen",
            "aufgabe": "Sie möchten mit Ihrer Partnerin/Ihrem Partner bald ein Hausfest machen. Planen Sie, was Sie machen!",
            "leitpunkte": ["Wo?", "Wann?", "Essen und Trinken?", "Andere Ideen?", "Einladungen?"]
        },
        {
            "id": "2", "number": 2,
            "title": "Essen für Bekannte planen",
            "theme": "Feiern & Veranstaltungen",
            "aufgabe": "Sie möchten Bekannte zu einem Essen einladen. Planen Sie gemeinsam, was Sie machen!",
            "leitpunkte": ["Kochen oder Restaurant?", "Wer kommt?", "Getränke?", "Einkaufen gehen?", "Nach dem Essen?"]
        },
        {
            "id": "3", "number": 3,
            "title": "Hausparty in neuer Wohnung",
            "theme": "Feiern & Veranstaltungen",
            "aufgabe": "Sie sind in eine neue Wohnung gezogen und möchten eine Hausparty machen. Überlegen Sie gemeinsam!",
            "leitpunkte": ["Wann?", "Wie viele Leute?", "Essen und Trinken?", "Nachbarn einladen?", "Wer macht was?"]
        },
        {
            "id": "4", "number": 4,
            "title": "Fest mit Nachbarn organisieren",
            "theme": "Nachbarschaft & Wohnen",
            "aufgabe": "Sie möchten gemeinsam mit den Nachbarn ein Fest machen. Planen Sie!",
            "leitpunkte": ["Wann?", "Essen/Getränke?", "Wer bezahlt dafür?", "Musik, Spiele für Kinder?", "Wer macht was?"]
        },
        {
            "id": "5", "number": 5,
            "title": "Ausflug mit Nachbarn",
            "theme": "Nachbarschaft & Wohnen",
            "aufgabe": "Sie möchten mit Ihren Nachbarn einen Ausflug machen. Planen Sie zusammen!",
            "leitpunkte": ["Wann?", "Wohin?", "Wie lange?", "Verkehrsmittel?", "Essen/Getränke?"]
        },
        {
            "id": "6", "number": 6,
            "title": "Sommerfest mit Nachbarn",
            "theme": "Feiern & Veranstaltungen",
            "aufgabe": "Sie möchten ein Sommerfest mit den Nachbarn organisieren. Überlegen Sie gemeinsam!",
            "leitpunkte": ["Wann?", "Wo?", "Essen und Trinken?", "Musik?", "Aktivitäten?"]
        },
        {
            "id": "7", "number": 7,
            "title": "Gemeinsame Geburtstagsparty für Kinder",
            "theme": "Familie & Kinder",
            "aufgabe": "Ihre Kinder haben im gleichen Monat Geburtstag. Sie planen eine gemeinsame Party.",
            "leitpunkte": ["Wann?", "Wo?", "Wie viele Kinder?", "Spiele?", "Kuchen und Essen?"]
        },
        {
            "id": "8", "number": 8,
            "title": "Geschenk für Nachbars Hochzeit",
            "theme": "Nachbarschaft & Wohnen",
            "aufgabe": "Ein Nachbar heiratet. Sie sind eingeladen und suchen ein passendes Geschenk.",
            "leitpunkte": ["Welches Geschenk?", "Wer kauft es?", "Wie teuer?", "Geld bei Nachbarn einsammeln?", "Wann kaufen?"]
        },
        {
            "id": "9", "number": 9,
            "title": "Sportlicher Nachmittag mit Nachbarn",
            "theme": "Freizeit & Sport",
            "aufgabe": "Sie sind Nachbarn und wollen zusammen einen Nachmittag mit sportlichen Aktivitäten verbringen.",
            "leitpunkte": ["Wann?", "Was machen?", "Mit wem?", "Nach dem Sport?", "Zu einem Kurs anmelden?"]
        },
        {
            "id": "10", "number": 10,
            "title": "Lärm durch Nachbar – Was tun?",
            "theme": "Probleme lösen",
            "aufgabe": "Ihr Nachbar renoviert seine Wohnung. Jeden Sonntag hören Sie laute Maschinen. Was tun Sie?",
            "leitpunkte": ["Mit dem Nachbarn reden?", "Beim Vermieter anrufen?", "Andere Nachbarn ansprechen?", "Dem Nachbarn helfen?", "Die Polizei anrufen?"]
        },
        
        # Theme 2: Deutschkurs & Lernen (German Course & Learning) - 10 scenarios
        {
            "id": "11", "number": 11,
            "title": "Lerngruppe für DTZ-Prüfung",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie möchten sich gemeinsam auf die DTZ-Prüfung vorbereiten. Planen Sie eine Lerngruppe!",
            "leitpunkte": ["Wann?", "Wo?", "Mit wem?", "Material?", "Aktivität nach dem Lernen?"]
        },
        {
            "id": "12", "number": 12,
            "title": "Ausflug mit dem Deutschkurs",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie sind im Deutschkurs und möchten zusammen einen Ausflug machen. Planen Sie!",
            "leitpunkte": ["Wohin?", "Wann?", "Wie fahren?", "Kosten?", "Was machen?"]
        },
        {
            "id": "13", "number": 13,
            "title": "Abschiedsfest für Deutschkurs",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Der Deutschkurs ist bald zu Ende. Sie möchten ein Abschiedsfest organisieren.",
            "leitpunkte": ["Wann?", "Wo?", "Essen und Trinken?", "Geschenk für Lehrerin?", "Wer macht was?"]
        },
        {
            "id": "14", "number": 14,
            "title": "Tandem-Partner finden",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie möchten Ihr Deutsch verbessern und suchen einen Tandem-Partner. Besprechen Sie die Details!",
            "leitpunkte": ["Wie oft treffen?", "Wo treffen?", "Themen?", "Online oder persönlich?", "Welche Sprachen?"]
        },
        {
            "id": "15", "number": 15,
            "title": "Bibliothek zum Lernen nutzen",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie möchten regelmäßig in die Bibliothek gehen, um Deutsch zu lernen. Planen Sie gemeinsam!",
            "leitpunkte": ["Wann gehen?", "Welche Bibliothek?", "Was lernen?", "Wie lange bleiben?", "Zusammen oder alleine?"]
        },
        {
            "id": "16", "number": 16,
            "title": "Konversationskurs organisieren",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie möchten einen Konversationskurs für Deutschlernende organisieren.",
            "leitpunkte": ["Wann?", "Wo?", "Wie viele Teilnehmer?", "Themen?", "Lehrer oder selbst organisiert?"]
        },
        {
            "id": "17", "number": 17,
            "title": "Deutsche Filme zusammen schauen",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie möchten deutsche Filme schauen, um Ihr Deutsch zu verbessern. Planen Sie Filmabende!",
            "leitpunkte": ["Wann?", "Wo?", "Welche Filme?", "Mit oder ohne Untertitel?", "Essen und Trinken?"]
        },
        {
            "id": "18", "number": 18,
            "title": "Sprachcafé besuchen",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "In der Stadt gibt es ein Sprachcafé. Sie möchten zusammen hingehen.",
            "leitpunkte": ["Wann gehen?", "Wo ist das Café?", "Wie oft besuchen?", "Was kostet es?", "Andere Leute mitbringen?"]
        },
        {
            "id": "19", "number": 19,
            "title": "Deutsche Bücher lesen",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Sie möchten deutsche Bücher lesen, um Ihr Deutsch zu verbessern. Planen Sie eine Lesegruppe!",
            "leitpunkte": ["Welches Buch?", "Wann treffen?", "Wo treffen?", "Wie viele Seiten pro Woche?", "Diskussion auf Deutsch?"]
        },
        {
            "id": "20", "number": 20,
            "title": "Deutschkurs-Projekt: Stadtteil vorstellen",
            "theme": "Deutschkurs & Lernen",
            "aufgabe": "Im Deutschkurs sollen Sie ein Projekt machen: Stellen Sie Ihren Stadtteil vor!",
            "leitpunkte": ["Was zeigen?", "Fotos machen?", "Präsentation erstellen?", "Wer macht was?", "Wann fertig?"]
        },
        
        # Theme 3: Umwelt & Natur (Environment & Nature) - 10 scenarios
        {
            "id": "21", "number": 21,
            "title": "Umweltprojekt in der Schule",
            "theme": "Umwelt & Natur",
            "aufgabe": "In der Schule Ihrer Kinder soll ein Umweltprojekt starten. Sie sind bei einem Elternabend.",
            "leitpunkte": ["Welches Projekt?", "Wer macht mit?", "Material?", "Kosten?", "Wann beginnen?"]
        },
        {
            "id": "22", "number": 22,
            "title": "Müll im Park sammeln",
            "theme": "Umwelt & Natur",
            "aufgabe": "Im Park liegt viel Müll. Sie möchten mit Nachbarn eine Aufräumaktion machen.",
            "leitpunkte": ["Wann?", "Wie viele Leute?", "Material mitbringen?", "Wer organisiert?", "Nach der Aktion?"]
        },
        {
            "id": "23", "number": 23,
            "title": "Gemeinschaftsgarten anlegen",
            "theme": "Umwelt & Natur",
            "aufgabe": "Sie möchten mit den Nachbarn einen Gemeinschaftsgarten anlegen.",
            "leitpunkte": ["Wo?", "Was pflanzen?", "Wer macht mit?", "Kosten teilen?", "Wann starten?"]
        },
        {
            "id": "24", "number": 24,
            "title": "Recycling im Haus organisieren",
            "theme": "Umwelt & Natur",
            "aufgabe": "In Ihrem Haus gibt es keine gute Mülltrennung. Sie möchten das verbessern.",
            "leitpunkte": ["Welche Container?", "Wo aufstellen?", "Wer bezahlt?", "Informationen für Nachbarn?", "Regeln festlegen?"]
        },
        {
            "id": "25", "number": 25,
            "title": "Fahrrad-Reparatur-Workshop",
            "theme": "Umwelt & Natur",
            "aufgabe": "Sie möchten einen Workshop organisieren, wo man lernt, Fahrräder zu reparieren.",
            "leitpunkte": ["Wo?", "Wann?", "Wer leitet Workshop?", "Material?", "Kosten?"]
        },
        {
            "id": "26", "number": 26,
            "title": "Carsharing für Nachbarn",
            "theme": "Umwelt & Natur",
            "aufgabe": "Sie überlegen, ob Sie mit Nachbarn ein Auto teilen können (Carsharing).",
            "leitpunkte": ["Welches Auto?", "Kosten teilen?", "Regeln?", "Versicherung?", "Wie organisieren?"]
        },
        {
            "id": "27", "number": 27,
            "title": "Bäume pflanzen in der Nachbarschaft",
            "theme": "Umwelt & Natur",
            "aufgabe": "Die Stadt erlaubt, dass Bürger Bäume pflanzen. Sie möchten mitmachen.",
            "leitpunkte": ["Wo pflanzen?", "Welche Bäume?", "Wann?", "Wer hilft?", "Pflege übernehmen?"]
        },
        {
            "id": "28", "number": 28,
            "title": "Tauschbörse organisieren",
            "theme": "Umwelt & Natur",
            "aufgabe": "Sie möchten eine Tauschbörse organisieren, wo Nachbarn Sachen tauschen können.",
            "leitpunkte": ["Wann?", "Wo?", "Was tauschen?", "Regeln?", "Werbung machen?"]
        },
        {
            "id": "29", "number": 29,
            "title": "Wasser sparen im Haus",
            "theme": "Umwelt & Natur",
            "aufgabe": "Die Wasserkosten sind sehr hoch. Sie überlegen mit Nachbarn, wie man Wasser sparen kann.",
            "leitpunkte": ["Welche Ideen?", "Regenwasser nutzen?", "Waschmaschine gemeinsam?", "Informationen verteilen?", "Kosten vergleichen?"]
        },
        {
            "id": "30", "number": 30,
            "title": "Plastik vermeiden",
            "theme": "Umwelt & Natur",
            "aufgabe": "Sie möchten mit Familie/Freunden weniger Plastik verwenden. Besprechen Sie Ideen!",
            "leitpunkte": ["Beim Einkaufen?", "Verpackungen?", "Alternativen?", "Zusammen einkaufen?", "Was ist schwierig?"]
        },
        
        # Theme 4: Gesundheit & Sport (Health & Sports) - 10 scenarios
        {
            "id": "31", "number": 31,
            "title": "Fitnessstudio zusammen besuchen",
            "theme": "Gesundheit & Sport",
            "aufgabe": "Sie möchten regelmäßig ins Fitnessstudio gehen. Planen Sie gemeinsam!",
            "leitpunkte": ["Welches Studio?", "Wann gehen?", "Wie oft?", "Kosten?", "Zusammen oder alleine?"]
        },
        {
            "id": "32", "number": 32,
            "title": "Laufgruppe gründen",
            "theme": "Gesundheit & Sport",
            "aufgabe": "Sie möchten eine Laufgruppe in der Nachbarschaft gründen.",
            "leitpunkte": ["Wann laufen?", "Wo treffen?", "Wie lange laufen?", "Für Anfänger oder Fortgeschrittene?", "Regelmäßig oder flexibel?"]
        },
        {
            "id": "33", "number": 33,
            "title": "Yoga-Kurs für Nachbarn",
            "theme": "Gesundheit & Sport",
            "aufgabe": "Sie möchten einen Yoga-Kurs für die Nachbarn organisieren.",
            "leitpunkte": ["Wann?", "Wo?", "Lehrer finden?", "Kosten?", "Wie viele Teilnehmer?"]
        },
        {
            "id": "34", "number": 34,
            "title": "Schwimmen gehen mit Kindern",
            "theme": "Familie & Kinder",
            "aufgabe": "Sie möchten mit Ihren Kindern regelmäßig schwimmen gehen. Planen Sie gemeinsam!",
            "leitpunkte": ["Welches Schwimmbad?", "Wann gehen?", "Schwimmkurs für Kinder?", "Kosten?", "Andere Familien mitnehmen?"]
        },
        {
            "id": "35", "number": 35,
            "title": "Gesunde Ernährung besprechen",
            "theme": "Gesundheit & Sport",
            "aufgabe": "Sie möchten sich gesünder ernähren. Sprechen Sie mit Freunden darüber!",
            "leitpunkte": ["Was ändern?", "Zusammen kochen?", "Rezepte austauschen?", "Einkaufen wo?", "Motivation?"]
        },
        {
            "id": "36", "number": 36,
            "title": "Fahrradtour am Wochenende",
            "theme": "Freizeit & Sport",
            "aufgabe": "Sie planen eine Fahrradtour am Wochenende mit Freunden.",
            "leitpunkte": ["Wohin?", "Wie lange?", "Was mitnehmen?", "Pause machen wo?", "Bei Regen?"]
        },
        {
            "id": "37", "number": 37,
            "title": "Wanderung in den Bergen",
            "theme": "Freizeit & Sport",
            "aufgabe": "Sie möchten eine Wanderung in den Bergen machen. Planen Sie gemeinsam!",
            "leitpunkte": ["Welche Route?", "Wie lange?", "Was mitnehmen?", "Übernachten?", "Wer fährt Auto?"]
        },
        {
            "id": "38", "number": 38,
            "title": "Fußballteam organisieren",
            "theme": "Gesundheit & Sport",
            "aufgabe": "Sie möchten ein Fußballteam mit Kollegen/Nachbarn gründen.",
            "leitpunkte": ["Wann spielen?", "Wo spielen?", "Wie viele Spieler?", "Trikots kaufen?", "In Liga anmelden?"]
        },
        {
            "id": "39", "number": 39,
            "title": "Tanzkurs zusammen machen",
            "theme": "Freizeit & Sport",
            "aufgabe": "Sie möchten einen Tanzkurs machen. Überlegen Sie zusammen!",
            "leitpunkte": ["Welcher Tanz?", "Wo?", "Wann?", "Kosten?", "Mit Partner oder alleine?"]
        },
        {
            "id": "40", "number": 40,
            "title": "Rückenschmerzen – Was hilft?",
            "theme": "Gesundheit & Sport",
            "aufgabe": "Sie haben Rückenschmerzen. Sprechen Sie über Lösungen!",
            "leitpunkte": ["Zum Arzt gehen?", "Sport machen?", "Physiotherapie?", "Neuer Stuhl für Arbeit?", "Entspannung?"]
        },
        
        # Theme 5: Familie & Kinder (Family & Children) - 10 scenarios
        {
            "id": "41", "number": 41,
            "title": "Kindergeburtstag planen",
            "theme": "Familie & Kinder",
            "aufgabe": "Sie planen einen Kindergeburtstag für Ihr Kind. Überlegen Sie gemeinsam!",
            "leitpunkte": ["Wann?", "Wo?", "Wie viele Kinder?", "Spiele?", "Kuchen und Essen?"]
        },
        {
            "id": "42", "number": 42,
            "title": "Babysitter finden",
            "theme": "Familie & Kinder",
            "aufgabe": "Sie suchen einen Babysitter für Ihre Kinder. Besprechen Sie die Details!",
            "leitpunkte": ["Wann gebraucht?", "Wie viele Stunden?", "Kosten?", "Wo finden?", "Qualifikationen?"]
        },
        {
            "id": "43", "number": 43,
            "title": "Spielplatz renovieren",
            "theme": "Familie & Kinder",
            "aufgabe": "Der Spielplatz in Ihrer Nähe ist alt und kaputt. Sie möchten ihn renovieren.",
            "leitpunkte": ["Mit wem sprechen?", "Geld sammeln?", "Freiwillige finden?", "Was reparieren?", "Wann anfangen?"]
        },
        {
            "id": "44", "number": 44,
            "title": "Hausaufgabenbetreuung organisieren",
            "theme": "Familie & Kinder",
            "aufgabe": "Sie möchten eine Hausaufgabenbetreuung für Kinder organisieren.",
            "leitpunkte": ["Wo?", "Wann?", "Wer hilft?", "Kosten?", "Material?"]
        },
        {
            "id": "45", "number": 45,
            "title": "Ferienbetreuung planen",
            "theme": "Familie & Kinder",
            "aufgabe": "In den Ferien arbeiten Sie. Sie brauchen eine Betreuung für Ihre Kinder.",
            "leitpunkte": ["Wo?", "Kosten?", "Programm?", "Essen?", "Öffnungszeiten?"]
        },
        {
            "id": "46", "number": 46,
            "title": "Elternabend vorbereiten",
            "theme": "Familie & Kinder",
            "aufgabe": "Es gibt bald einen Elternabend in der Schule. Sie möchten sich vorbereiten.",
            "leitpunkte": ["Welche Fragen stellen?", "Mit anderen Eltern sprechen?", "Probleme ansprechen?", "Vorschläge machen?", "Wer geht hin?"]
        },
        {
            "id": "47", "number": 47,
            "title": "Familienausflug planen",
            "theme": "Familie & Kinder",
            "aufgabe": "Sie möchten einen Familienausflug machen. Planen Sie gemeinsam!",
            "leitpunkte": ["Wohin?", "Wann?", "Was machen?", "Essen mitbringen?", "Kosten?"]
        },
        {
            "id": "48", "number": 48,
            "title": "Kind will Haustier – Besprechen",
            "theme": "Familie & Kinder",
            "aufgabe": "Ihr Kind möchte ein Haustier. Sie besprechen die Vor- und Nachteile.",
            "leitpunkte": ["Welches Tier?", "Wer kümmert sich?", "Kosten?", "Platz in Wohnung?", "Erlaubt vom Vermieter?"]
        },
        {
            "id": "49", "number": 49,
            "title": "Musikunterricht für Kind",
            "theme": "Familie & Kinder",
            "aufgabe": "Ihr Kind möchte ein Instrument lernen. Planen Sie gemeinsam!",
            "leitpunkte": ["Welches Instrument?", "Wo Unterricht?", "Wann?", "Kosten?", "Instrument kaufen oder leihen?"]
        },
        {
            "id": "50", "number": 50,
            "title": "Großeltern zu Besuch",
            "theme": "Familie & Kinder",
            "aufgabe": "Die Großeltern kommen zu Besuch. Sie planen die Zeit gemeinsam.",
            "leitpunkte": ["Wann kommen sie?", "Wo schlafen?", "Was zusammen machen?", "Essen kochen?", "Ausflüge?"]
        },
        
        # Theme 6: Arbeit & Beruf (Work & Career) - 9 scenarios
        {
            "id": "51", "number": 51,
            "title": "Abschiedsfest für Kollegen",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Ein Kollege verlässt die Firma. Sie organisieren ein Abschiedsfest.",
            "leitpunkte": ["Wann?", "Wo?", "Geschenk?", "Wer organisiert was?", "Wie viele Personen?"]
        },
        {
            "id": "52", "number": 52,
            "title": "Betriebsausflug planen",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Ihre Firma plant einen Betriebsausflug. Sie helfen bei der Organisation.",
            "leitpunkte": ["Wohin?", "Wann?", "Transport?", "Aktivitäten?", "Budget?"]
        },
        {
            "id": "53", "number": 53,
            "title": "Fortbildung besuchen",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Sie möchten eine Fortbildung machen. Besprechen Sie die Details!",
            "leitpunkte": ["Welcher Kurs?", "Wann?", "Kosten?", "Bezahlt Firma?", "Online oder vor Ort?"]
        },
        {
            "id": "54", "number": 54,
            "title": "Neue Kaffeemaschine für Büro",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Die Kaffeemaschine im Büro ist kaputt. Sie organisieren eine neue.",
            "leitpunkte": ["Welche kaufen?", "Kosten teilen?", "Wer kauft?", "Kaffee auch gemeinsam kaufen?", "Wartung?"]
        },
        {
            "id": "55", "number": 55,
            "title": "Mittagspause zusammen machen",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Sie möchten mit Kollegen regelmäßig zusammen Mittagspause machen.",
            "leitpunkte": ["Wann treffen?", "Wo essen?", "Selbst mitbringen oder kaufen?", "Wie oft?", "Kosten?"]
        },
        {
            "id": "56", "number": 56,
            "title": "Fahrgemeinschaft zur Arbeit",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Sie möchten mit Kollegen eine Fahrgemeinschaft zur Arbeit bilden.",
            "leitpunkte": ["Wer fährt?", "Kosten teilen?", "Abfahrtszeit?", "Treffpunkt?", "Was bei Krankheit?"]
        },
        {
            "id": "57", "number": 57,
            "title": "Sommerfest in der Firma",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Ihre Firma plant ein Sommerfest. Sie helfen bei der Planung.",
            "leitpunkte": ["Wann?", "Wo?", "Programm?", "Essen und Trinken?", "Familie einladen?"]
        },
        {
            "id": "58", "number": 58,
            "title": "Arbeitszimmer einrichten",
            "theme": "Arbeit & Beruf",
            "aufgabe": "Sie arbeiten von zu Hause und möchten Ihr Arbeitszimmer einrichten.",
            "leitpunkte": ["Welche Möbel?", "Wo kaufen?", "Kosten?", "Lampe?", "Pflanzen?"]
        },
        {
            "id": "59", "number": 59,
            "title": "Probleme mit Kollegen lösen",
            "theme": "Probleme lösen",
            "aufgabe": "Sie haben Probleme mit einem Kollegen. Besprechen Sie, was Sie tun können.",
            "leitpunkte": ["Mit Kollegen sprechen?", "Mit Chef sprechen?", "Mediator?", "Ignorieren?", "Team-Meeting vorschlagen?"]
        }
    ]
    
    # Create catalog structure
    catalog = {
        "meta": {
            "version": "5.0",
            "level": "B1",
            "total_scenarios": 59,
            "generator": "AI-powered (GPT-4o-mini)",
            "description": "Alle 59 DTZ Sprechen Teil 3 Szenarien für KI-gestütztes Training. Die KI führt natürliche B1-Gespräche basierend auf Aufgabe und Leitpunkten."
        },
        "scenarios": scenarios
    }
    
    return catalog

def main():
    print("🚀 Generating all 59 DTZ Sprechen Teil 3 scenarios...")
    
    catalog = create_all_59_scenarios()
    
    # Write to file
    output_path = "public/data/sprechen/dialogues-catalog.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Successfully generated {catalog['meta']['total_scenarios']} scenarios!")
    print(f"📁 Saved to: {output_path}")
    print(f"\n📊 Scenarios by theme:")
    
    # Count by theme
    themes = {}
    for scenario in catalog['scenarios']:
        theme = scenario['theme']
        themes[theme] = themes.get(theme, 0) + 1
    
    for theme, count in sorted(themes.items()):
        print(f"   - {theme}: {count} scenarios")
    
    print(f"\n🤖 All scenarios ready for AI-powered training!")
    print(f"💡 No dialogues needed - AI generates conversations dynamically!")

if __name__ == "__main__":
    main()
