<template>
  <v-container>
    <v-row justify="space-around">
      <v-card width="400" v-if="lesson">
        <v-img
            v-if="lesson.imageUrl"
            :src="lesson.imageUrl"
        >
          <v-app-bar
              flat
              color="rgba(0, 0, 0, 0)"
          >
            <v-app-bar-nav-icon color="white"></v-app-bar-nav-icon>

            <v-toolbar-title class="title white--text pl-0" style="background-color:rgba(0, 0, 0, 0.5);">
              {{ lesson.title }}
            </v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn
                color="white"
                icon
            >
              <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
          </v-app-bar>

          <v-card-title class="white--text mt-8">
            <p class="ml-3">
              {{ lesson.subtitle }}
            </p>
          </v-card-title>
        </v-img>

        <v-card-text>
          <div class="font-weight-bold ml-8 mb-2">
            {{ $t('Progress') }}
          </div>

          <v-timeline
              align-top
              dense
          >
            <v-timeline-item
                small
                @click="initalQuizClick()"
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
                <div> </div>
              </div>
            </v-timeline-item>

            <v-timeline-item
                small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t('Explanation') }}:</strong> {{ $t('see how it is done') }}
                </div>
                <div></div>
              </div>
            </v-timeline-item>

            <v-timeline-item
                small
            >
              <div>
                <div class="font-weight-normal">
                  <strong>{{ $t('test') }}:</strong> {{ $t('see how much you picked up') }}
                </div>
                <div></div>
              </div>
            </v-timeline-item>

            <v-timeline-item
                small
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
              v-on:click="startQuizz()"
          >
            {{$t('Start')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Lesson} from "@/models/Lessons";
import {getLesson} from "@/services/dbService";

@Component({
  components: {},
})
export default class LessonMainMenu extends Vue {
  public lesson: Lesson | undefined

  public initalQuizClick(){
    this.$router.push({ name: 'QuizEntry', params: { quizId:(this.lesson as Lesson).initialQuiz.id } })

  }
  async created() {
    this.lesson = await getLesson( this.$route.params.lessonId) as Lesson
    console.log(this.lesson)
    this.$forceUpdate()
  }

}
</script>
