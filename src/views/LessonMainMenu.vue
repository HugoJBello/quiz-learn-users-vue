<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="500" v-if="lesson">
        <v-img
            v-if="lesson.imageUrl"
            :src="lesson.imageUrl"
        >
        </v-img>

        <v-progress-linear
            v-if="lessonProgress"
            :value="''+lessonProgress.percentDone"
        ></v-progress-linear>
        <v-card-title class="white--text mt-8">
          {{ lesson.title }}
        </v-card-title>
        <v-card-subtitle>
          {{ lesson.subtitle }}

        </v-card-subtitle>


        <v-card-text>

          <v-timeline
              align-top
              dense
          >
            <v-timeline-item
                v-if="lesson.initialQuiz && lesson.initialQuiz.id"
                small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t("Initial test") }}:</strong> {{ $t('see how much you already know') }}
                  <v-btn
                      text
                      color="teal accent-4"
                      v-on:click="initalQuizClick()"
                  >
                    <v-icon>mdi-chevron-double-right</v-icon>
                  </v-btn>

                </div>
                <div></div>
              </div>
            </v-timeline-item>

            <v-timeline-item
                small
                v-if="lesson.parts && lesson.parts.length>0"
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t('Explanation') }}:</strong> {{ $t('see how it is done') }}
                  <v-btn
                      text
                      color="teal accent-4"
                      v-on:click="goToLesson()"
                  >
                    <v-icon>mdi-chevron-double-right</v-icon>
                  </v-btn>
                </div>
                <div></div>
              </div>
            </v-timeline-item>

            <v-timeline-item
                small
                v-if="lesson.finalQuiz && lesson.finalQuiz.id"
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t('Test') }}:</strong> {{ $t('see how much you picked up') }}
                  <v-btn
                      text
                      color="teal accent-4"
                      v-on:click="finalQuizClick()"
                  >
                    <v-icon>mdi-chevron-double-right</v-icon>
                  </v-btn>
                </div>
                <div></div>
              </div>
            </v-timeline-item>

            <v-timeline-item
                small
                v-if="lesson.finalQuiz && lesson.finalQuiz.id"
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t('Results') }}:</strong> {{ $t('how did you do') }}
                </div>
                <div></div>
              </div>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
        <v-card-actions>
          <v-btn
              text
              color="teal accent-4"
              v-if="showStart()"
              v-on:click="startLesson()"
          >
            {{ $t('Start') }}
          </v-btn>
          <v-btn
              text
              color="teal accent-4"
              v-if="showContinue()"
              v-on:click="continueLesson()"
          >
            {{ $t('Continue') }}
          </v-btn>
          <v-btn
              text
              color="teal accent-4"
              v-if="showReview()"
              v-on:click="reviewLesson()"
          >
            {{ $t('Review') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <div class="button">
      <v-btn
          text
          color="teal accent-4"
          v-on:click="otherLessons()"
      >
        <v-icon>mdi-chevron-double-left</v-icon>
        {{ $t('Other lessons') }}
      </v-btn>
    </div>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Lesson} from "@/models/Lessons";
import {getLesson, getLessonProgress, getUserSolutions} from "@/services/dbService";
import {QuizUserSolution} from "@/models/QuizUserSolution";
import {LessonsProgress} from "@/models/Progress";

@Component({
  components: {},
})
export default class LessonMainMenu extends Vue {
  public lesson: Lesson | undefined
  public initialTestSolution: QuizUserSolution
  public finalTestSolution: QuizUserSolution
  public lessonProgress: LessonsProgress | null

  get user() {
    return this.$store.state.user
  }

  public initalQuizClick() {
    if (this.initialTestSolution && this.initialTestSolution.completed) {
      console.log(this.initialTestSolution.completed)
      this.$router.push({name: 'QuizResults', params: {quizId: (this.lesson as Lesson).initialQuiz.id}})
    } else {
      this.$router.push({name: 'QuizEntry', params: {quizId: (this.lesson as Lesson).initialQuiz.id}})
    }
  }

  public finalQuizClick() {
    if (this.finalTestSolution && this.finalTestSolution.completed) {
      this.$router.push({name: 'QuizResults', params: {quizId: (this.lesson as Lesson).finalQuiz.id}})
    } else {
      this.$router.push({name: 'QuizEntry', params: {quizId: (this.lesson as Lesson).finalQuiz.id}})
    }
  }

  public otherLessons() {
    this.$router.push({name: 'Lessons', params: {courseId: (this.lesson as Lesson).courseId}})
  }

  public goToLesson() {
    this.$router.push({name: 'LessonPart', params: {quizId: (this.lesson as Lesson).id}})
  }

  async getUserSolutions() {
    if (this.user.uid) {
      console.log((this.lesson as Lesson).finalQuiz.id)
      if ((this.lesson as Lesson).initialQuiz && (this.lesson as Lesson).initialQuiz.id) {
        const prevInitialSol = await getUserSolutions((this.lesson as Lesson).initialQuiz.id, this.user.uid) as QuizUserSolution
        if (prevInitialSol) {
          this.initialTestSolution = Object.assign({}, prevInitialSol)
        }
      }

      if ((this.lesson as Lesson).finalQuiz && (this.lesson as Lesson).finalQuiz.id) {
        const prevFinalSol = await getUserSolutions((this.lesson as Lesson).finalQuiz.id, this.user.uid) as QuizUserSolution
        if (prevFinalSol) {
          this.finalTestSolution = Object.assign({}, prevFinalSol)
        }
      }
    }
    console.log(this.initialTestSolution, this.finalTestSolution)
  }

  public showStart() {
    return (!this.initialTestSolution)
  }

  public startLesson() {
    this.$router.push({name: 'QuizResults', params: {quizId: (this.lesson as Lesson).initialQuiz.id}})
  }

  public showContinue() {
    return (this.initialTestSolution && !this.finalTestSolution)
  }

  public continueLesson() {
    this.$router.push({name: 'LessonPart', params: {quizId: (this.lesson as Lesson).id}})
  }

  public showReview() {
    return (this.finalTestSolution)
  }

  public reviewLesson() {
    this.$router.push({name: 'LessonPart', params: {quizId: (this.lesson as Lesson).id}})
  }

  async created() {
    this.lesson = await getLesson(this.$route.params.lessonId) as Lesson
    console.log(this.lesson)

    this.lessonProgress = await getLessonProgress(this.lesson.id, this.user.uid)
    await this.getUserSolutions()
    this.$forceUpdate()
  }

}
</script>
