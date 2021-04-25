<template>
  <v-card
      class="mx-auto lesson"
      max-width="444"
      outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          {{$t('Lesson')}}
        </div>
        <v-list-item-title class="headline mb-1">
          {{ lesson.title }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ lesson.subtitle }}</v-list-item-subtitle>
        <v-list-item-subtitle> {{ lesson.description }}</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
          tile
          size="120"
          color="grey"
      >
        <v-img
            v-if="lesson.imageUrl"
            :src="lesson.imageUrl"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
          outlined
          rounded
          text
          v-on:click="select(lesson)"
      >
        {{$t('Continue')}}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {Lesson} from "@/models/Lessons";

@Component({
  components: {},
})
export default class QuizCard extends Vue {
  @Prop({required: false})
  public lesson: Lesson | undefined

  public select = (lesson: Lesson) => {
    this.$store.dispatch('setSelectedLessonAction', lesson)
    this.$router.push({ name: 'LessonMainMenu', params: { lessonId:lesson.id } })

  }

}
</script>
<style>
.lesson {
  margin:30px
}
</style>