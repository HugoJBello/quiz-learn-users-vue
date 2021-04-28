export interface QuizResults {
    id: string,
    quizId: string,
    lessonId: string,
    userId: string,
    completed:boolean,
    correctAnswers: number[],
    wrongAnswers: number[],
    score:number
}

export interface LessonResults {
    id: string,
    lessonId: string,
    userId: string,
    quizResults: QuizResults[],
    initialQuizResult: QuizResults,
    finalQuizResult: QuizResults,
    totalScore: number
    improvement: number

}
