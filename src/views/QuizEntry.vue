<template>
  <v-container v-if="quiz">
    <v-card
        class="mx-auto description"
        max-width="544"
    >
      <v-img
          v-if="quiz.imageUrl"
          :src="quiz.imageUrl"
      ></v-img>
      <v-card-text>
        <div>{{$t('Quiz')}}</div>
        <p class="display-1 text--primary">
          {{ quiz.title }}
        </p>
        <p>{{ quiz.subtitle }}</p>
        <div class="text--primary">
          {{ quiz.description }}
        </div>
      </v-card-text>
    </v-card>

    <div           v-for="(question, questionIndex) in quiz.questions"
                   :key="question.questionText + questionIndex"

    >
      <QuestionCard
          :questionIndex="questionIndex"
          :question="question"
          :quiz="quiz"
          :quizUserSolution="quizUserSolution"
      >
      </QuestionCard>
    </div>

  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {getQuiz, getUserSolutions, saveUserSolutions} from "@/services/dbService";
import {Quiz} from "@/models/Quiz";
import {ChosenAnswerMultichoice, QuizUserSolution} from "@/models/QuizUserSolution";
import {v4 as uuidv4} from "uuid";
import QuestionCard from "@/components/QuestionCard.vue";

@Component({
  components: {QuestionCard},
})
export default class QuizEntry extends Vue {
  public quiz: Quiz | undefined
  public quizUserSolution: QuizUserSolution = {} as QuizUserSolution

  get user() {
    return this.$store.state.user
  }

  async getPreviousSolution (quizId: string) {
    if (this.user.uid) {
      const prevSol = await getUserSolutions(quizId, this.user.uid) as QuizUserSolution
      if (prevSol) {
        this.quizUserSolution = Object.assign({}, prevSol)
        console.log(this.quizUserSolution,this.quizUserSolution.userAnswers)

      } else {
        const answers = [] as ChosenAnswerMultichoice[]
        this.quizUserSolution.userAnswers = answers
        this.quizUserSolution.startedAt = new Date()
        this.quizUserSolution.userId = this.user.uid
        this.quizUserSolution.quizId = quizId
        this.quizUserSolution.id = uuidv4()
      }
    }
  }

  async created() {
    this.quiz = await getQuiz( this.$route.params.quizId) as Quiz
    await this.getPreviousSolution(this.$route.params.quizId)
    console.log(this.quizUserSolution)
    this.$forceUpdate()
  }

}
</script>

<style>
.description{
  margin: 30px
}
.answer{
  margin: 10px;
}
</style>