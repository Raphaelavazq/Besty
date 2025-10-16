#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Complete Natural B1 Dialogues Generator
Creates all 59 DTZ Sprechen Teil 3 dialogues with natural flow
"""

import json

def create_all_dialogues():
    """Generate all 59 complete dialogues"""
    
    dialogues = []
    
    # ============= DIALOGUES 1-10 =============
    
    # Dialog 1: Hausfest planen
    dialogues.append({
        "id": "1",
        "number": 1,
        "title": "Hausfest mit Partner/in planen",
        "theme": "Feiern & Veranstaltungen",
        "aufgabe": "Sie möchten mit Ihrer Partnerin/Ihrem Partner bald ein Hausfest machen. Planen Sie, was Sie machen!",
        "leitpunkte": ["Wo?", "Wann?", "Essen und Trinken?", "Andere Ideen?", "Einladungen?"],
        "dialogue": {
            "greeting": "Hallo! Wie geht's? Wir wollten ja bald unser Hausfest planen. Hast du heute ein bisschen Zeit dafür?",
            "steps": [
                {
                    "speaker": "A",
                    "text": "Also, wo sollen wir das Fest machen? Ich denke, draußen im Garten wäre schön, weil wir da viel Platz haben. Was hältst du davon?",
                    "choices": {
                        "positive": "Ja, das ist eine super Idee! Im Garten können sich die Leute besser bewegen. Aber was machen wir, wenn es regnet?",
                        "negative": "Hmm, ich weiß nicht. Wegen des Wetters könnte das schwierig werden. Vielleicht sollten wir lieber den Gemeinschaftsraum im Haus nehmen?",
                        "question": "Ist der Gemeinschaftsraum im Keller noch frei an dem Tag? Wir sollten das vorher prüfen, oder?",
                        "suggestion": "Wie wäre es, wenn wir im Hof feiern? Da sind wir draußen, aber ein bisschen geschützter. Was denkst du?"
                    }
                },
                {
                    "speaker": "B",
                    "text": "Guter Punkt mit dem Wetter! Wir könnten ein Zelt mieten, dann sind wir auch bei Regen draußen. Und wann passt es dir am besten? Ich würde Samstag in zwei Wochen vorschlagen.",
                    "choices": {
                        "positive": "Samstag ab 18 Uhr wäre perfekt! Da haben die meisten Leute Zeit, und wir können den ganzen Abend feiern.",
                        "negative": "Samstag geht bei mir leider nicht, weil ich am Nachmittag arbeiten muss. Wäre Sonntag auch möglich?",
                        "question": "Sollen wir vielleicht früher anfangen, so um 16 Uhr? Dann haben Familien mit Kindern auch mehr Zeit.",
                        "suggestion": "Ich würde 17 Uhr vorschlagen. Das ist ein guter Kompromiss – nicht zu früh und nicht zu spät, oder?"
                    }
                },
                {
                    "speaker": "A",
                    "text": "Super! Jetzt zum Essen und den Getränken – was machen wir da? Ich schlage vor, dass jeder Gast etwas mitbringt. So haben wir eine große Auswahl. Was meinst du?",
                    "choices": {
                        "positive": "Ja, ein Mitbring-Buffet ist eine tolle Idee! Dann probieren wir viele verschiedene Sachen. Ich könnte die Einladungen schreiben und das erwähnen.",
                        "negative": "Hmm, ich finde, wir sollten selbst für alles sorgen. Das ist persönlicher. Vielleicht machen wir einfach Pizza und Salat?",
                        "question": "Wer bringt dann vegetarische Sachen mit? Wir sollten eine Liste machen, damit wir nichts vergessen.",
                        "suggestion": "Wie wäre es, wenn wir die Hauptspeisen machen und die Gäste bringen Desserts mit? Das wäre fair, denke ich."
                    }
                },
                {
                    "speaker": "B",
                    "text": "Sehr gut! Ich kümmere mich um Musik und Getränke. Sollen wir auch die Nachbarn einladen? Das wäre nett, und dann gibt es später keine Beschwerden wegen der Lautstärke.",
                    "choices": {
                        "positive": "Ja, auf jeden Fall! Das ist sehr wichtig. Dann fühlen sie sich einbezogen. Ich spreche mit Familie Müller und den anderen.",
                        "negative": "Nein, ich denke, wir sollten nur unsere Freunde einladen. Sonst wird es zu voll, und wir kennen die Nachbarn nicht so gut.",
                        "question": "Wie viele Leute werden insgesamt kommen? Wir müssen wissen, wie viel Platz wir brauchen und wie viel wir einkaufen.",
                        "suggestion": "Vielleicht sollten wir nur die direkten Nachbarn von unserem Stock einladen? Nicht das ganze Haus – das wäre zu viel."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Gute Überlegung! Und wer kümmert sich um die Dekoration? Ich denke, wir brauchen Lichterketten und vielleicht ein paar Luftballons. Was hältst du davon?",
                    "choices": {
                        "positive": "Ja, Lichterketten wären super schön! Ich habe noch welche im Keller. Soll ich auch Kerzen auf die Tische stellen?",
                        "negative": "Zu viel Dekoration brauchen wir nicht, finde ich. Ein paar Lichterketten reichen völlig. Wir wollen es ja nicht zu kitschig machen.",
                        "question": "Wo können wir günstig Dekoration kaufen? Kennst du einen guten Laden oder sollten wir online bestellen?",
                        "suggestion": "Wie wäre es, wenn wir am Freitag zusammen zum Baumarkt fahren und alles besorgen? Dann sehen wir direkt, was gut aussieht."
                    }
                }
            ],
            "closing": "Perfekt! Ich freue mich schon sehr auf unser Fest. Also: Du machst die Einladungen und die Dekoration, ich kümmere mich um Musik und Getränke. Das wird bestimmt toll! Bis dann!"
        }
    })
    
    # Dialog 2: Essen für Bekannte
    dialogues.append({
        "id": "2",
        "number": 2,
        "title": "Essen für Bekannte planen",
        "theme": "Feiern & Veranstaltungen",
        "aufgabe": "Sie und Ihre Freundin/Ihr Freund haben am nächsten Wochenende Bekannte zu sich nach Hause eingeladen. Sie möchten Sie mit einem Essen überraschen. Planen Sie den Abend!",
        "leitpunkte": ["Kochen: was?", "Getränke: welche?", "Einkaufen: wann?", "Nach dem Essen: was unternehmen?"],
        "dialogue": {
            "greeting": "Hey! Wir haben ja am Samstag unsere Freunde zum Essen eingeladen. Wir sollten langsam planen, was wir kochen. Hast du eine Idee?",
            "steps": [
                {
                    "speaker": "A",
                    "text": "Also, was kochen wir? Ich würde gerne Pasta machen – das ist nicht so kompliziert und schmeckt fast allen. Was denkst du?",
                    "choices": {
                        "positive": "Ja, Pasta ist super! Ich könnte eine Tomatensoße machen und du machst vielleicht eine Carbonara? Dann haben wir zwei Sorten.",
                        "negative": "Hmm, Pasta ist ein bisschen langweilig, finde ich. Wie wäre es mit etwas Besonderem? Vielleicht ein Curry oder so?",
                        "question": "Weiß du, ob jemand von unseren Gästen Vegetarier ist? Das sollten wir vorher klären.",
                        "suggestion": "Ich schlage vor, wir machen ein deutsches Gericht – Schnitzel mit Kartoffelsalat. Das ist einfach und typisch."
                    }
                },
                {
                    "speaker": "B",
                    "text": "Gute Idee! Und welche Getränke kaufen wir? Wir brauchen auf jeden Fall Wasser und vielleicht Wein. Was meinst du?",
                    "choices": {
                        "positive": "Ja genau, Wasser und Wein reichen. Ich kaufe noch einen Rotwein und einen Weißwein, dann kann jeder wählen.",
                        "negative": "Nein, Wein allein ist zu wenig. Wir sollten auch Bier und Saft anbieten. Nicht alle trinken Alkohol.",
                        "question": "Wie viele Flaschen brauchen wir denn? Wir sind insgesamt sechs Personen, oder?",
                        "suggestion": "Wie wäre es, wenn wir auch einen Cocktail machen? Ich habe ein gutes Rezept für Aperol Spritz. Das ist festlich."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Super! Wann gehen wir einkaufen? Ich denke, Freitagnachmittag wäre gut, dann ist alles frisch. Passt dir das?",
                    "choices": {
                        "positive": "Ja, Freitag um 16 Uhr ist perfekt! Dann haben wir am Samstag nicht so viel Stress und können in Ruhe kochen.",
                        "negative": "Freitag geht bei mir nicht, weil ich bis 18 Uhr arbeite. Können wir vielleicht schon am Donnerstag einkaufen?",
                        "question": "Wo gehen wir einkaufen? Im Supermarkt um die Ecke oder lieber zum Markt? Der Markt hat besseres Gemüse.",
                        "suggestion": "Ich würde vorschlagen, dass du Freitag einkaufen gehst und ich koche dann am Samstag. Wäre das okay für dich?"
                    }
                },
                {
                    "speaker": "B",
                    "text": "Einverstanden! Und was machen wir nach dem Essen? Wir sollten auch etwas für die Unterhaltung planen. Spiele oder Musik?",
                    "choices": {
                        "positive": "Ja, Spiele wären toll! Ich habe noch ein paar Gesellschaftsspiele. Activity oder Tabu macht immer Spaß in der Gruppe.",
                        "negative": "Nein, Spiele finde ich zu anstrengend. Ich würde lieber nur gemütlich zusammensitzen und reden. Vielleicht ein bisschen Musik im Hintergrund?",
                        "question": "Sollen wir vielleicht einen Film schauen? Oder ist das zu langweilig?",
                        "suggestion": "Wie wäre es mit einer Playlist? Ich könnte eine mit verschiedener Musik machen – dann können wir tanzen oder einfach nur zuhören."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Perfekt! Dann haben wir alles. Soll ich noch einen Nachtisch machen? Tiramisu geht immer gut.",
                    "choices": {
                        "positive": "Ja, Tiramisu ist super! Das kann man schon am Freitag vorbereiten. Dann haben wir am Samstag weniger Arbeit.",
                        "negative": "Nein, lass uns keinen Nachtisch machen. Nach dem Hauptgericht sind alle satt. Vielleicht kaufen wir einfach Eis?",
                        "question": "Mag jemand von den Gästen keinen Kaffee? Tiramisu hat ja Kaffee drin.",
                        "suggestion": "Wie wäre es mit Obstsalat und Sahne? Das ist leichter und frischer als Tiramisu."
                    }
                }
            ],
            "closing": "Wunderbar! Ich freue mich schon auf den Abend. Also: Freitag einkaufen, Samstag kochen, und dann einen schönen Abend mit unseren Freunden. Bis dann!"
        }
    })
    
    # Dialog 3: Hausparty in neuer Wohnung
    dialogues.append({
        "id": "3",
        "number": 3,
        "title": "Hausparty in neuer Wohnung",
        "theme": "Feiern & Veranstaltungen",
        "aufgabe": "Sie sind in eine neue Wohnung gezogen und möchten eine Hausparty machen! Planen Sie die Party!",
        "leitpunkte": ["Wann?", "Wie viele Leute?", "Essen und Trinken?", "Nachbarn einladen?", "Wer macht was?"],
        "dialogue": {
            "greeting": "Hallo! Ich bin so glücklich mit der neuen Wohnung! Wir sollten definitiv eine Einweihungsparty machen. Lass uns das planen!",
            "steps": [
                {
                    "speaker": "A",
                    "text": "Ja, unbedingt! Wann sollen wir die Party machen? Ich denke, in zwei Wochen wäre gut. Dann sind alle Kartons ausgepackt. Was meinst du?",
                    "choices": {
                        "positive": "Ja, zwei Wochen sind perfekt! Dann haben wir Zeit, alles schön zu machen. Vielleicht Samstag in zwei Wochen?",
                        "negative": "Hmm, zwei Wochen sind zu früh, finde ich. Ich brauche mehr Zeit zum Einrichten. Lieber in einem Monat?",
                        "question": "An welchem Wochentag wollen wir feiern? Samstag oder lieber Freitag?",
                        "suggestion": "Ich würde Freitagabend vorschlagen. Da können die Leute länger bleiben, weil am nächsten Tag kein Arbeit ist."
                    }
                },
                {
                    "speaker": "B",
                    "text": "Gut! Und wie viele Leute laden wir ein? Die Wohnung ist ja nicht so groß. Was denkst du – 15 oder 20 Personen?",
                    "choices": {
                        "positive": "Ja, 15 bis 20 Leute sind gut. Mehr passen nicht rein, und so bleibt es gemütlich. Wir laden nur enge Freunde ein.",
                        "negative": "Nein, 20 ist zu viel! Die Wohnung wird zu voll. Ich würde nur 10 bis 12 Leute einladen.",
                        "question": "Können die Leute auch auf den Balkon gehen? Wie groß ist der?",
                        "suggestion": "Wie wäre es, wenn wir 15 Leute einladen und sagen: Jeder kann noch eine Person mitbringen? Dann wird es nicht zu voll."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Einverstanden! Was machen wir mit Essen und Trinken? Ich denke, Fingerfood wäre praktisch. Die Leute können sich bewegen und essen gleichzeitig.",
                    "choices": {
                        "positive": "Ja, Fingerfood ist super! Ich mache Mini-Sandwiches und du machst einen Salat? Wir kaufen auch Chips und Nüsse.",
                        "negative": "Fingerfood ist mir zu umständlich. Lass uns einfach Pizza bestellen! Das ist einfach und jeder mag Pizza.",
                        "question": "Wie viel Geld wollen wir ausgeben? Wir sollten ein Budget machen.",
                        "suggestion": "Ich schlage vor: Jeder Gast bringt eine Flasche Wein oder Bier mit. Wir machen nur das Essen. Das ist fair."
                    }
                },
                {
                    "speaker": "B",
                    "text": "Gute Idee! Sollen wir die neuen Nachbarn auch einladen? Das wäre höflich, und wir lernen sie kennen. Was hältst du davon?",
                    "choices": {
                        "positive": "Ja, unbedingt! Das ist sehr wichtig. So starten wir mit einer guten Beziehung. Ich spreche mit ihnen diese Woche.",
                        "negative": "Hmm, ich weiß nicht. Wir kennen sie noch gar nicht. Vielleicht sollten wir sie erst später einladen?",
                        "question": "Wie viele Nachbarn sind das? Ich will nicht das ganze Haus einladen!",
                        "suggestion": "Wie wäre es, wenn wir nur die Nachbarn rechts und links einladen? Das reicht fürs Erste."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Okay! Jetzt müssen wir die Aufgaben verteilen. Wer macht was? Ich könnte die Einladungen schreiben. Kannst du dich um die Musik kümmern?",
                    "choices": {
                        "positive": "Ja klar, Musik mache ich! Ich erstelle eine Playlist mit verschiedenen Stilen. Und wer räumt vorher auf?",
                        "negative": "Musik ist schwierig, ich habe keinen guten Geschmack. Kannst du das machen? Ich kümmere mich lieber um das Essen.",
                        "question": "Brauchen wir auch Spiele für den Abend? Oder nur Musik und Gespräche?",
                        "suggestion": "Ich schlage vor: Du machst Einladungen und kaufst ein, ich koche und dekoriere. Fair?"
                    }
                }
            ],
            "closing": "Super! Ich bin sehr aufgeregt. Das wird unsere erste Party in der neuen Wohnung. Ich bin sicher, es wird toll! Bis bald!"
        }
    })
    
    # Dialog 4: Fest mit Nachbarn organisieren
    dialogues.append({
        "id": "4",
        "number": 4,
        "title": "Fest mit Nachbarn organisieren",
        "theme": "Nachbarschaft & Wohnen",
        "aufgabe": "Sie wohnen in einem großen Haus zur Miete und möchten gemeinsam mit den Nachbarn ein Fest machen. Organisieren Sie das Fest!",
        "leitpunkte": ["Wann?", "Essen/Getränke?", "Wer bezahlt dafür?", "Was brauchen Sie noch (Musik, Spiele für Kinder)?", "Wer macht was?"],
        "dialogue": {
            "greeting": "Hallo! Die Idee mit dem Nachbarschaftsfest ist super! Viele Nachbarn haben schon Interesse gezeigt. Lass uns das organisieren!",
            "steps": [
                {
                    "speaker": "A",
                    "text": "Also, wann machen wir das Fest? Ich denke, ein Samstag im nächsten Monat wäre gut. Dann haben alle Zeit. Was meinst du?",
                    "choices": {
                        "positive": "Ja, Samstag ist perfekt! Vielleicht am ersten Samstag im Juni? Da ist das Wetter hoffentlich schön.",
                        "negative": "Samstag ist schwierig für Familien mit Kindern. Die haben oft Sport oder andere Aktivitäten. Wäre Sonntag besser?",
                        "question": "Sollen wir die Nachbarn vorher fragen, welcher Tag am besten passt? Wir könnten eine Umfrage machen.",
                        "suggestion": "Ich würde einen Sonntagnachmittag vorschlagen. So ab 15 Uhr. Dann ist es entspannter als am Samstag."
                    }
                },
                {
                    "speaker": "B",
                    "text": "Gut! Und was machen wir mit Essen und Getränken? Bei so vielen Leuten brauchen wir einen Plan. Grillen wäre doch schön, oder?",
                    "choices": {
                        "positive": "Ja, Grillen ist toll! Jede Familie bringt ihr eigenes Fleisch und Salate mit. Wir organisieren nur den Grill.",
                        "negative": "Grillen ist zu kompliziert bei so vielen Leuten. Ich würde lieber ein Buffet machen – jeder bringt etwas mit.",
                        "question": "Haben wir überhaupt einen Grill im Hof? Oder müssen wir einen mieten?",
                        "suggestion": "Wie wäre es mit einem Mitbring-Brunch? Jeder bringt etwas zu essen mit, süß oder herzhaft. Das ist einfacher."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Guter Punkt! Und wer bezahlt für die gemeinsamen Sachen? Wir brauchen ja Getränke, Teller, Servietten und so weiter. Wie machen wir das?",
                    "choices": {
                        "positive": "Ich schlage vor: Jede Familie gibt 10 Euro. Damit kaufen wir Getränke und das ganze Material. Das ist fair.",
                        "negative": "Geld einsammeln ist kompliziert. Jede Familie bringt einfach ihre eigenen Getränke mit. Dann brauchen wir nichts zu organisieren.",
                        "question": "Wie viele Familien machen mit? Wir müssen wissen, wie viel Geld wir brauchen.",
                        "suggestion": "Wie wäre es, wenn wir beim Vermieter fragen? Vielleicht gibt es ein Budget für solche Feste im Haus?"
                    }
                },
                {
                    "speaker": "B",
                    "text": "Einverstanden! Was brauchen wir noch? Musik wäre schön, und für die Kinder sollten wir auch etwas haben. Spiele oder so.",
                    "choices": {
                        "positive": "Ja! Ich habe eine Bluetooth-Box für Musik. Und wir können Spiele für Kinder organisieren – Sackhüpfen, Eierlaufen. Das ist lustig!",
                        "negative": "Zu viel Organisation! Lass uns nur Musik machen. Die Kinder spielen auch so miteinander, die brauchen kein Programm.",
                        "question": "Wer hat Erfahrung mit Kinderspielen? Wir sollten jemanden fragen, der das gut organisieren kann.",
                        "suggestion": "Ich schlage vor: Wir machen eine Ecke mit Malzeug für Kinder. Das ist einfach und die Kinder sind beschäftigt."
                    }
                },
                {
                    "speaker": "A",
                    "text": "Super Ideen! Jetzt müssen wir die Aufgaben verteilen. Wer macht was? Ich könnte die Einladungen für alle Nachbarn schreiben. Kannst du die Getränke organisieren?",
                    "choices": {
                        "positive": "Ja, mache ich! Ich kaufe Wasser, Saft und ein paar Kisten Bier. Soll ich auch Kaffee und Kuchen für den Nachmittag besorgen?",
                        "negative": "Getränke ist zu viel Arbeit alleine. Lass uns das aufteilen: Du kaufst alkoholfreie Getränke, ich kümmere mich um Bier und Wein.",
                        "question": "Wer räumt nach dem Fest auf? Das müssen wir auch planen, sonst bleibt alles liegen.",
                        "suggestion": "Wie wäre es, wenn wir ein Team machen? Drei Leute für Essen, drei für Getränke, drei für Kinderprogramm. So ist die Arbeit verteilt."
                    }
                }
            ],
            "closing": "Perfekt! Ich bin froh, dass wir das zusammen machen. So ein Nachbarschaftsfest stärkt die Gemeinschaft. Das wird bestimmt schön! Tschüss!"
        }
    })
    
    # Continue with more dialogues...
    # Due to length, I'll create the remaining ones in next response
    
    return dialogues

def create_catalog_with_dialogues_1_to_10():
    """Create catalog with first 10 complete dialogues"""
    dialogues = create_all_dialogues()
    
    catalog = {
        "meta": {
            "version": "4.0",
            "level": "B1",
            "total_scenarios": 59,
            "complete_dialogues": len(dialogues),
            "tags": ["DTZ", "Teil 3", "Planen", "Natürliche B1-Dialoge"],
            "description": "DTZ Sprechen Teil 3 - Natürliche B1-Dialoge mit vollständigem Gesprächsverlauf und sinnvollen Antwortmöglichkeiten"
        },
        "scenarios": dialogues
    }
    
    return catalog

if __name__ == "__main__":
    catalog = create_catalog_with_dialogues_1_to_10()
    
    output_path = "public/data/sprechen/dialogues-catalog.json"
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(catalog, f, ensure_ascii=False, indent=2)
    
    print(f"✅ Generated catalog with {len(catalog['scenarios'])} complete natural dialogues")
    print(f"📝 Saved to: {output_path}")
    print("\n🎯 Dialogues 1-4 are complete. Next: Continue with dialogues 5-10...")
