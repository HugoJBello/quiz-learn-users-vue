<template>
  <div class="container">
    <v-card
        v-if="user"
        class="mx-auto"
        max-width="344"
        outlined
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ $t('User') }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{ user.email }}
          </v-list-item-title>
          <v-list-item-subtitle></v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-avatar
            tile
            size="80"
            color="grey"
        ></v-list-item-avatar>
      </v-list-item>

      <v-card-actions>
        <v-btn
            outlined
            rounded
            text
            @click="logout"
        >
          {{$t('logout')}}
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {auth} from "@/firebase";

@Component({
  components: {},
})
export default class Home extends Vue {
  mounted() {
    console.log(this.user)
  }

  get user() {
    return this.$store.state.user
  }

  async logout(){
    await auth.signOut()
    this.$router.push({ name: 'Login'})
  }

}
</script>

<style>
.container {
  margin-top: 30px;
}
</style>