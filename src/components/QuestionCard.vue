<template>
  <v-card
      class="mx-auto lesson"
      max-width="444"
      outlined
      v-if="question"
  >
    <v-list-item          three-line>
      <v-list-item-content>
        <v-list-item-title class="headline mb-1">
          {{ question.questionText }}
        </v-list-item-title>
        <div class="answer" v-for="(answer, answerIndex) in question.answerOptions"
             :key="answer+ answerIndex">
          <input type="checkbox" :checked="isChecked(answerIndex)" @change="check(answerIndex)"/> {{answer}}
        </div>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="120"
          color="grey"
          v-if="quiz.imageUrl"
      >
        <v-img

            :src="quiz.imageUrl"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Question, Quiz} from "../models/Quiz";
import {Course} from "@/models/Course";
import {ChosenAnswerMultichoice, QuizUserSolution} from "@/models/QuizUserSolution";
import {saveUserSolutions} from "@/services/dbService";

@Component({
  components: {},
})
export default class QuestionCard extends Vue {
  @Prop({required: false})
  public quiz: Quiz | undefined

  @Prop({required: false})
  public quizUserSolution: QuizUserSolution

  @Prop({required: false})
  public questionIndex: number

  public question: Question | undefined

  async created() {
    console.log("----")
    this.question = (this.quiz as Quiz).questions[this.questionIndex]
    this.$forceUpdate()
  }

  async saveUserSolutionDb(){
    console.log(this.quizUserSolution)
    await saveUserSolutions(this.quizUserSolution)
  }

  isChecked = (answerIndex: number): boolean => {
    console.log(this.quizUserSolution, this.quizUserSolution.userAnswers, answerIndex)
    if (this.question && this.quizUserSolution.userAnswers) {
      const answer = this.quizUserSolution.userAnswers.find((answ) => answ.questionIndex == this.questionIndex) as ChosenAnswerMultichoice
      if (!answer) return false
      return answer.selectedOptions.includes(answerIndex)
    }
    return false
  }


  check = (answerIndex: number) => {
    console.log(this.quizUserSolution,this.quizUserSolution.userAnswers)
    if (this.quizUserSolution && this.quizUserSolution.userAnswers) {
      let answer = this.quizUserSolution.userAnswers.find((answ) => answ.questionIndex == this.questionIndex) as ChosenAnswerMultichoice
      console.log(answer)
      if (!answer) {
        answer = {questionIndex:this.questionIndex} as ChosenAnswerMultichoice
        answer.selectedOptions = []
        this.quizUserSolution.userAnswers.push(answer)
      }
      this.checkResponseInAnswer(answer, answerIndex)
      this.saveUserSolutionDb()
      console.log(this.quizUserSolution.userAnswers)
    }
  }

  checkResponseInAnswer = (answer: ChosenAnswerMultichoice, answerIndex: number) => {
    if (answer.selectedOptions.includes(answerIndex)) {
      answer.selectedOptions.splice(answer.selectedOptions.indexOf(answerIndex), 1)
    } else {
      answer.selectedOptions.push(answerIndex)
      answer.selectedOptions = answer.selectedOptions.filter((element: number, i: number) => i === answer.selectedOptions.indexOf(element))
    }
  }


}
</script>
<style>
.card {
  margin:30px
}
</style>