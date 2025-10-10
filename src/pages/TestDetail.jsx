import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  FileText,
  Play,
  CheckCircle,
  XCircle,
  Volume2,
} from "lucide-react";
import AudioPlayer from "../components/AudioPlayer";

export default function TestDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [started, setStarted] = useState(false);
  const [essayText, setEssayText] = useState("");

  useEffect(() => {
    fetch("/data/tests.json")
      .then((res) => res.json())
      .then((data) => {
        const foundTest = data.find((t) => t.id === id);
        setTest(foundTest);
      })
      .catch((err) => console.error("Error loading test:", err));
  }, [id]);

  // Timer
  useEffect(() => {
    if (started && !showResults) {
      const timer = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [started, showResults]);

  if (!test) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Test wird geladen...</p>
          </div>
        </div>
      </div>
    );
  }

  const currentQ = test.questions[currentQuestion];
  const totalTime = parseInt(test.duration) * 60; // Convert to seconds
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const timeProgress = (timeElapsed / totalTime) * 100;

  const handleStart = () => {
    setStarted(true);
  };

  if (!started) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {test.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">{test.subtitle}</p>

            {test.officialTest && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                  <span className="font-semibold text-blue-800">
                    Offizieller DTZ Übungstest
                  </span>
                </div>
                <p className="text-blue-700 text-sm">
                  Basiert auf authentischen telc Prüfungsmaterialien
                </p>
              </div>
            )}
          </div>

          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <h2 className="font-semibold text-lg mb-4">Prüfungshinweise</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="flex items-center">
                <Clock className="w-5 h-5 text-primary mr-3" />
                <div>
                  <div className="font-medium">Bearbeitungszeit</div>
                  <div className="text-gray-600">{test.duration}</div>
                </div>
              </div>
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary mr-3" />
                <div>
                  <div className="font-medium">Aufgaben</div>
                  <div className="text-gray-600">
                    {test.totalQuestions} Fragen
                  </div>
                </div>
              </div>
              {test.audioRequired && (
                <div className="flex items-center">
                  <Volume2 className="w-5 h-5 text-primary mr-3" />
                  <div>
                    <div className="font-medium">Audio erforderlich</div>
                    <div className="text-gray-600">
                      Stellen Sie sicher, dass der Ton funktioniert
                    </div>
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 text-primary mr-3" />
                <div>
                  <div className="font-medium">Niveau</div>
                  <div className="text-gray-600">{test.level}</div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <h3 className="font-medium text-yellow-800 mb-2">
                Wichtige Regeln:
              </h3>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Lesen Sie alle Anweisungen sorgfältig</li>
                <li>• Hören Sie bei Audio-Aufgaben genau zu</li>
                <li>• Sie können nicht zur vorherigen Frage zurückkehren</li>
                <li>• Nutzen Sie die Zeit effektiv</li>
              </ul>
            </div>

            <div className="border-t pt-4">
              <p className="text-gray-600 mb-4">{test.instructions}</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleStart}
              className="bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary/90 transition-colors inline-flex items-center text-lg"
            >
              <Play className="w-5 h-5 mr-2" />
              Test starten
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleAnswer = (questionId, answer) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = () => {
    setShowResults(true);
  };

  const calculateScore = () => {
    if (test.questionType === "essay") return null;

    let correct = 0;
    test.questions?.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return {
      correct,
      total: test.questions?.length || 0,
      percentage: Math.round((correct / (test.questions?.length || 1)) * 100),
    };
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Start screen
  if (!started) {
    return (
      <div className="max-w-4xl mx-auto">
        <Link
          to="/tests"
          className="btn-secondary inline-flex items-center gap-2 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Zurück zu Tests
        </Link>

        <div className="card">
          <div className="mb-6">
            <span className="badge badge-primary mb-4">{test.level}</span>
            <h1 className="text-3xl font-bold mb-2">{test.title}</h1>
            <p className="text-gray-600 text-lg">{test.subtitle}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              Anweisungen
            </h3>
            <p className="text-gray-700 mb-4">{test.instructions}</p>

            <div className="grid md:grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Dauer</div>
                  <div className="font-semibold">{test.duration}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-500">Aufgaben</div>
                  <div className="font-semibold">
                    {test.totalQuestions || test.questions?.length || 0}
                  </div>
                </div>
              </div>
              {test.audioRequired && (
                <div className="flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-500">Audio</div>
                    <div className="font-semibold text-blue-600">
                      Erforderlich
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Context (for reading tests) */}
          {test.context && (
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
              <h3 className="font-semibold mb-3">Textmaterial</h3>
              <div className="prose prose-sm max-w-none whitespace-pre-line">
                {test.context}
              </div>
            </div>
          )}

          <button
            onClick={() => setStarted(true)}
            className="btn-primary w-full flex items-center justify-center gap-2 text-lg py-3"
          >
            <Play className="w-5 h-5" />
            Test starten
          </button>
        </div>
      </div>
    );
  }

  // Results screen
  if (showResults) {
    const score = calculateScore();

    return (
      <div className="max-w-4xl mx-auto">
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Test abgeschlossen!</h1>
            <p className="text-gray-600">Zeit: {formatTime(timeElapsed)}</p>
          </div>

          {test.questionType === "essay" ? (
            <div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                <h3 className="font-semibold mb-3">Ihre Antwort</h3>
                <div className="bg-white p-4 rounded border">
                  <p className="whitespace-pre-wrap">{essayText}</p>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Wortanzahl: {essayText.split(/\s+/).filter((w) => w).length}{" "}
                  Wörter
                </p>
              </div>

              {test.evaluationCriteria && (
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Bewertungskriterien</h3>
                  <div className="space-y-3">
                    {test.evaluationCriteria.map((criteria, idx) => (
                      <div key={idx} className="bg-gray-50 p-4 rounded">
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-medium">
                            {criteria.criterion}
                          </span>
                          <span className="text-sm text-gray-600">
                            max. {criteria.maxPoints} Punkte
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {criteria.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {test.sampleAnswer && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                  <h3 className="font-semibold mb-3 text-green-900">
                    Musterantwort
                  </h3>
                  <p className="whitespace-pre-wrap text-gray-700">
                    {test.sampleAnswer}
                  </p>
                </div>
              )}
            </div>
          ) : (
            score && (
              <div>
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-white text-center mb-8">
                  <div className="text-5xl font-bold mb-2">
                    {score.percentage}%
                  </div>
                  <div className="text-xl">
                    {score.correct} von {score.total} richtig
                  </div>
                </div>

                <div className="space-y-4">
                  {test.questions?.map((q, idx) => (
                    <div
                      key={q.id}
                      className={`border rounded-lg p-4 ${
                        answers[q.id] === q.correctAnswer
                          ? "bg-green-50 border-green-200"
                          : "bg-red-50 border-red-200"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        {answers[q.id] === q.correctAnswer ? (
                          <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                        ) : (
                          <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                        )}
                        <div className="flex-1">
                          <p className="font-medium mb-2">
                            Aufgabe {idx + 1}: {q.questionText}
                          </p>
                          {test.questionType === "matching" ? (
                            <div className="space-y-1 text-sm">
                              <p>
                                Ihre Antwort:{" "}
                                <strong>{q.options[answers[q.id]]}</strong>
                              </p>
                              <p className="text-green-700">
                                Richtige Antwort:{" "}
                                <strong>{q.options[q.correctAnswer]}</strong>
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-1 text-sm">
                              <p>Ihre Antwort: {q.options[answers[q.id]]}</p>
                              {answers[q.id] !== q.correctAnswer && (
                                <p className="text-green-700">
                                  Richtige Antwort: {q.options[q.correctAnswer]}
                                </p>
                              )}
                            </div>
                          )}
                          {q.explanation && (
                            <p className="text-sm text-gray-700 mt-2 italic">
                              💡 {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={() => {
                setAnswers({});
                setShowResults(false);
                setStarted(false);
                setTimeElapsed(0);
                setCurrentQuestion(0);
                setEssayText("");
              }}
              className="btn-secondary flex-1"
            >
              Erneut versuchen
            </button>
            <Link to="/tests" className="btn-primary flex-1 text-center">
              Zurück zu Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Essay question
  if (test.questionType === "essay") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Zeit</span>
            <span className="font-mono font-bold text-lg">
              {formatTime(timeElapsed)}
            </span>
          </div>
          <span className="badge badge-primary">{test.level}</span>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">{test.title}</h2>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700 mb-4">{test.instructions}</p>
            <div className="prose prose-sm max-w-none whitespace-pre-line">
              {test.prompt}
            </div>
          </div>

          <textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Schreiben Sie hier Ihre E-Mail..."
            className="w-full h-96 border border-gray-300 rounded-lg p-4 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />

          <div className="flex justify-between items-center mt-4">
            <span className="text-sm text-gray-600">
              {essayText.split(/\s+/).filter((w) => w).length} Wörter
            </span>
            <button
              onClick={handleSubmit}
              disabled={!essayText.trim()}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Test abschließen
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Speaking test
  if (test.questionType === "speaking") {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Zeit</span>
            <span className="font-mono font-bold text-lg">
              {formatTime(timeElapsed)}
            </span>
          </div>
          <span className="badge badge-primary">{test.level}</span>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">{test.title}</h2>

          <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-700 mb-4">{test.instructions}</p>

            {test.topics && (
              <div className="space-y-4 mt-4">
                {test.topics.map((topic, idx) => (
                  <div key={idx} className="bg-white rounded p-4">
                    <h4 className="font-semibold mb-2">{topic.topic}</h4>
                    <ul className="text-sm text-gray-700 space-y-1">
                      {topic.prompts.map((prompt, pIdx) => (
                        <li key={pIdx}>• {prompt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            {test.imagePrompt && (
              <div className="bg-white rounded p-4 mt-4">
                <p className="whitespace-pre-line">{test.imagePrompt}</p>
              </div>
            )}

            {test.scenario && (
              <div className="bg-white rounded p-4 mt-4">
                <p className="font-medium mb-3">{test.scenario}</p>
                {test.planningPoints && (
                  <div className="space-y-2">
                    {test.planningPoints.map((point, idx) => (
                      <div key={idx}>
                        <span className="font-semibold">{point.point}</span>
                        <span className="text-sm text-gray-600">
                          {" "}
                          - {point.details}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {test.questions && (
              <div className="bg-white rounded p-4 mt-4">
                <h4 className="font-semibold mb-2">Fragen:</h4>
                <ul className="space-y-1 text-sm">
                  {test.questions.map((q, idx) => (
                    <li key={idx}>• {q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {(test.tipps || test.nützlicheRedemittel) && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
              {test.tipps && (
                <>
                  <h4 className="font-semibold mb-2">💡 Tipps:</h4>
                  <ul className="text-sm space-y-1 mb-4">
                    {test.tipps.map((tip, idx) => (
                      <li key={idx}>• {tip}</li>
                    ))}
                  </ul>
                </>
              )}
              {test.nützlicheRedemittel && (
                <>
                  <h4 className="font-semibold mb-2">
                    📝 Nützliche Redemittel:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {test.nützlicheRedemittel.map((phrase, idx) => (
                      <span
                        key={idx}
                        className="bg-white px-3 py-1 rounded text-sm"
                      >
                        {phrase}
                      </span>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          <button
            onClick={() => setShowResults(true)}
            className="btn-primary w-full"
          >
            Test abschließen
          </button>
        </div>
      </div>
    );
  }

  // Regular question test (multiple choice / matching)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress bar */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            Frage {currentQuestion + 1} von {test.questions.length}
          </span>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-500" />
              <span className="font-mono font-bold">
                {formatTime(timeElapsed)}
              </span>
            </div>
            <span className="badge badge-primary">{test.level}</span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-indigo-600 h-2 rounded-full transition-all"
            style={{
              width: `${((currentQuestion + 1) / test.questions.length) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="card">
        <h2 className="text-2xl font-bold mb-6">{test.title}</h2>

        {/* Context for reading */}
        {test.context && currentQuestion === 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-3">Lesen Sie den Text:</h3>
            <div className="prose prose-sm max-w-none whitespace-pre-line">
              {test.context}
            </div>
          </div>
        )}

        {/* Question */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          {currentQ.audioFile && (
            <div className="mb-4">
              <AudioPlayer audioFile={currentQ.audioFile} />
            </div>
          )}
          <p className="font-medium text-lg">{currentQ.questionText}</p>
        </div>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {currentQ.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => handleAnswer(currentQ.id, idx)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                answers[currentQ.id] === idx
                  ? "border-indigo-600 bg-indigo-50"
                  : "border-gray-200 hover:border-indigo-300"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    answers[currentQ.id] === idx
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : "border-gray-300"
                  }`}
                >
                  {answers[currentQ.id] === idx && "✓"}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={() => setCurrentQuestion((prev) => prev - 1)}
            disabled={currentQuestion === 0}
            className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ← Zurück
          </button>

          {currentQuestion === test.questions.length - 1 ? (
            <button onClick={handleSubmit} className="btn-primary">
              Test abschließen
            </button>
          ) : (
            <button
              onClick={() => setCurrentQuestion((prev) => prev + 1)}
              className="btn-primary"
            >
              Weiter →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
