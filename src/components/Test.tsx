import { type Session } from "next-auth";
import { signOut } from "next-auth/react";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";

type Answer = {
  content: string;
};

type QuestionCategory =
  | "Numbers_and_Quantity"
  | "Algebra"
  | "Functions"
  | "Geometry"
  | "Statistics_and_Probability"
  | "Integrating_Essential_Skills"
  | "Modeling";

type Question = {
  // index: number,
  content: {
    type: "image" | "raw";
    content: string;
  };
  category: QuestionCategory[];
  answers: [Answer, Answer, Answer, Answer, Answer];
  correctAnswer: 0 | 1 | 2 | 3 | 4;
  currentAnswer: 0 | 1 | 2 | 3 | 4 | null;
  useAltLetters?: boolean;
};

const indexToLetter = ["A", "B", "C", "D", "E", "F", "G", "H", "J", "K"];

/*
{
  answers: [{content: ""},{content: ""},{content: ""},{content: ""},{content: ""}],
  category: [""],
  content: {
    content: "",
    type: "image"
  },
  correctAnswer: 0,
  currentAnswer: null
}
*/

const initialQuestions: Question[] = [
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Statistics_and_Probability"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvTGb2JztXOMw32lvrPbGDgUjfk58cdiJxs9WN",
      type: "image",
    },
    correctAnswer: 1,
    currentAnswer: null,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Numbers_and_Quantity"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdv6D78OGxUxifvWNd8PpHXTVDCwnUr3suRJtzQ",
      type: "image",
    },
    correctAnswer: 3,
    currentAnswer: null,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Algebra"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvy5J68dc3lxJwID5BKZOTevqLtc4pG2CQagMd",
      type: "image",
    },
    correctAnswer: 0,
    currentAnswer: null,
    useAltLetters: true,
  },
  // https://utfs.io/f/ahGurVmlPhdvB3QO0RXULP1e8Ay7NsmkMuzVHriEDRpwhXKC
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Geometry"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvB3QO0RXULP1e8Ay7NsmkMuzVHriEDRpwhXKC",
      type: "image",
    },
    correctAnswer: 2,
    currentAnswer: null,
    useAltLetters: true,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Functions"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvhJvm2f2TOHafRyvVB9NMbSoqTEtFGzgw5rnY",
      type: "image",
    },
    correctAnswer: 0,
    currentAnswer: null,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Statistics_and_Probability"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvfuAWL54Iz9jLZp5cwoRNaAVYb3nEQ0W8OKMU",
      type: "image",
    },
    correctAnswer: 4,
    currentAnswer: null,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Numbers_and_Quantity"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvaJkpolmlPhdvYxD8wI9nkm0fsoy6McEF3AtH",
      type: "image",
    },
    correctAnswer: 0,
    currentAnswer: null,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Algebra"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvHW8edz2P4LERm12ibC5dxo6IF03G7yNAr9ac",
      type: "image",
    },
    correctAnswer: 3,
    currentAnswer: null,
  },
  // https://utfs.io/f/ahGurVmlPhdvB3QO0RXULP1e8Ay7NsmkMuzVHriEDRpwhXKC
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Geometry"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvkn9Tl1bratnBjNSgA7W0CQXO4sT3mbq5IJfv",
      type: "image",
    },
    correctAnswer: 4,
    currentAnswer: null,
    useAltLetters: true,
  },
  {
    answers: [
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
      { content: "" },
    ],
    category: ["Functions"],
    content: {
      content:
        "https://utfs.io/f/ahGurVmlPhdvkRffeabratnBjNSgA7W0CQXO4sT3mbq5IJfv",
      type: "image",
    },
    correctAnswer: 2,
    currentAnswer: null,
    useAltLetters: true,
  },
];

export function Question({
  // questions,
  setQuestions,
  question,
  questionIndex,
}: {
  questions: Question[];
  setQuestions: Dispatch<SetStateAction<Question[]>>;
  question: Question;
  questionIndex: number;
}) {
  const [currentAnswer, setCurrentAnswer] = useState<0 | 1 | 2 | 3 | 4 | null>(
    null,
  );

  useEffect(() => {
    setQuestions((prevQuestions) =>
      prevQuestions.map((prevQuestion, index) =>
        index === questionIndex
          ? { ...prevQuestion, currentAnswer }
          : prevQuestion,
      ),
    );
  }, [currentAnswer, questionIndex, setQuestions]);

  return (
    <div className="flex h-full flex-col gap-3 py-3">
      {question.content.type === "image" ? (
        <img
          src={question.content.content}
          className="h-auto w-full"
          alt="Question Content"
        />
      ) : (
        <div className="w-full px-4 pt-2 font-serif font-bold sm:px-2">
          {question.content.content}
        </div>
      )}
      <div className="mt-auto flex flex-row items-center justify-between border-t bg-white">
        {question.answers.map((answer, index) => (
          <button
            key={index}
            className={`flex flex-row items-center gap-2 bg-white px-4 py-4 sm:px-2 sm:py-2 ${currentAnswer === index ? "hover:bg-white" : "hover:bg-gray-50"}`}
            onClick={() =>
              currentAnswer === index
                ? setCurrentAnswer(null)
                : setCurrentAnswer(index as 1 | 2 | 3 | 4)
            }
          >
            <p
              className={`flex h-8 min-h-8 w-8 min-w-8 items-center justify-center rounded-full border-2 text-sm font-medium ${currentAnswer === index ? "border-blue-600 bg-blue-600 text-white" : "text-black"}`}
            >
              {question.useAltLetters
                ? indexToLetter[index + 5]
                : indexToLetter[index]}
            </p>
            {/* <p className="font-serif font-bold">{answer.content}</p> */}
          </button>
        ))}
      </div>
    </div>
  );
}

export function Test({ user }: { user: Session }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [complete, setComplete] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [scoreReport, setScoreReport] = useState<ScoreReport | null>(null);

  useEffect(() => {
    if (complete) setScoreReport(generateScoreReport(questions));
  }, [complete, questions]);

  const questionsAnswered = questions.filter(
    (question) => question.currentAnswer != null,
  ).length;

  return (
    <div className="flex h-screen w-full max-w-sm flex-col p-2">
      <nav className="flex flex-col gap-2 border-b pb-3">
        <div className="flex flex-row rounded-md bg-blue-800 p-3 text-xs font-medium text-white">
          <p>
            Signed in as: <span className="italic">{user.user.email}</span>
          </p>
          <a
            className="ml-auto cursor-pointer underline"
            onClick={() => signOut()}
          >
            Sign Out
          </a>
        </div>
        {!complete && (
          <>
            <div className="flex flex-row gap-2 overflow-x-auto py-3">
              {questions.map((question, index) => (
                <button
                  key={index}
                  className={`flex h-10 min-h-10 w-10 min-w-10 items-center justify-center rounded-full border-2 border-blue-600 font-medium sm:h-8 sm:min-h-8 sm:w-8 sm:min-w-8 ${question.currentAnswer != null ? "bg-blue-600 text-white" : "bg-white text-blue-600"} cursor-pointer hover:border-blue-800 hover:bg-blue-800 hover:text-white disabled:border-blue-700 disabled:bg-blue-700 disabled:text-white`}
                  disabled={currentQuestion === index}
                  onClick={() => setCurrentQuestion(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>

            <p className="text-sm">
              {Math.round((questionsAnswered / questions.length) * 100)}%
              complete — {questionsAnswered}/{questions.length} answered
            </p>
          </>
        )}
      </nav>
      {!complete ? (
        <>
          {questions.map((question, questionIndex) => (
            <div
              key={questionIndex}
              className={`h-full w-full flex-col ${questionIndex === currentQuestion ? "flex" : "hidden"}`}
            >
              <Question
                questions={questions}
                setQuestions={setQuestions}
                question={question}
                questionIndex={questionIndex}
              />
            </div>
          ))}

          <footer className="mt-auto grid w-full grid-cols-2 gap-2">
            <button
              className={
                "rounded-md bg-blue-600 px-6 py-6 text-lg font-semibold text-white hover:bg-blue-700 disabled:cursor-default disabled:bg-gray-300 disabled:hover:bg-gray-300 sm:py-3"
              }
              disabled={currentQuestion === 0}
              onClick={() => setCurrentQuestion((cq) => cq - 1)}
            >
              Previous
            </button>
            <button
              className={
                "rounded-md bg-blue-600 px-6 py-6 text-lg font-semibold text-white hover:bg-blue-700 disabled:cursor-default disabled:bg-gray-300 disabled:hover:bg-gray-300 sm:py-3"
              }
              // disabled={currentQuestion === questions.length - 1}
              onClick={() =>
                currentQuestion === questions.length - 1
                  ? setComplete(true)
                  : setCurrentQuestion((cq) => cq + 1)
              }
            >
              {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
            </button>
          </footer>
        </>
      ) : (
        <>
          {scoreReport && (
            <div className="py-3">
              <p>
                Overall Score:{" "}
                <span className="font-bold">
                  {(scoreReport?.totalCorrect / scoreReport?.totalQuestions) *
                    100}
                  % ({scoreReport.totalCorrect}/{scoreReport.totalQuestions})
                </span>
              </p>
              <p>Section Breakdown</p>
              <div className="flex flex-col">
                <div className="border-b bg-white p-2">
                  Algebra -{" "}
                  {(scoreReport.cats.Algebra.correct /
                    scoreReport.cats.Algebra.total) *
                    100}
                  %
                </div>
                <div className="border-b bg-white p-2">
                  Functions -{" "}
                  {(scoreReport.cats.Functions.correct /
                    scoreReport.cats.Functions.total) *
                    100}
                  %
                </div>
                <div className="border-b bg-white p-2">
                  Geometry -{" "}
                  {(scoreReport.cats.Geometry.correct /
                    scoreReport.cats.Geometry.total) *
                    100}
                  %
                </div>
                <div className="border-b bg-white p-2">
                  Num & Quant -{" "}
                  {(scoreReport.cats.Numbers_and_Quantity.correct /
                    scoreReport.cats.Numbers_and_Quantity.total) *
                    100}
                  %
                </div>
                <div className="border-b bg-white p-2">
                  Stat & Prob -{" "}
                  {(scoreReport.cats.Statistics_and_Probability.correct /
                    scoreReport.cats.Statistics_and_Probability.total) *
                    100}
                  %
                </div>
              </div>
            </div>
          )}
          <div className="mt-4 grid grid-cols-5 gap-4">
            {questions.map((question, index) => (
              <div
                key={index}
                className={`flex aspect-square items-center justify-center rounded-sm font-semibold text-white ${question.correctAnswer === question.currentAnswer ? "bg-green-600" : "bg-red-600"}`}
              >
                {index + 1}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type ScoreReport = {
  totalQuestions: number;
  totalCorrect: number;
  cats: Record<
    QuestionCategory,
    {
      correct: number;
      total: number;
    }
  >;
};

function generateScoreReport(questions: Question[]): ScoreReport {
  const sectCorrects = (c: QuestionCategory) =>
    questions.filter(
      (q) => q.category.includes(c) && q.correctAnswer === q.currentAnswer,
    ).length;
  const sectTotal = (c: QuestionCategory) =>
    questions.filter((q) => q.category.includes(c)).length;
  const cats: Record<QuestionCategory, { correct: number; total: number }> = {
    Algebra: {
      correct: sectCorrects("Algebra"),
      total: sectTotal("Algebra"),
    },
    Functions: {
      correct: sectCorrects("Functions"),
      total: sectTotal("Functions"),
    },
    Geometry: {
      correct: sectCorrects("Geometry"),
      total: sectTotal("Geometry"),
    },
    Integrating_Essential_Skills: {
      correct: sectCorrects("Integrating_Essential_Skills"),
      total: sectTotal("Integrating_Essential_Skills"),
    },
    Modeling: {
      correct: sectCorrects("Modeling"),
      total: sectTotal("Modeling"),
    },
    Numbers_and_Quantity: {
      correct: sectCorrects("Numbers_and_Quantity"),
      total: sectTotal("Numbers_and_Quantity"),
    },
    Statistics_and_Probability: {
      correct: sectCorrects("Statistics_and_Probability"),
      total: sectTotal("Statistics_and_Probability"),
    },
  };

  return {
    totalQuestions: questions.length,
    totalCorrect: questions.filter((q) => q.correctAnswer === q.currentAnswer)
      .length,
    cats,
  };
}
