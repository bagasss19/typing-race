<template>
  <div class="card col-sm-2">
    <img
      :src="
        'https://avatars.dicebear.com/api/bottts/' + this.user.username + '.svg'
      "
      width="50px"
      class="card-img-top"
    />
    <!-- room:{
      admin: ...,
      users: [
        {
          username: a
        },
        {
          username: b
        },
      ],
      name: <nama roomnya>
    } -->
    <div class="card-body">
      <h4 class="card-title">{{ this.user.username }}</h4>
      <h4 class="card-text">
        <span class="fa fa-star checked" v-if="this.user.score>=10"></span>
        <span class="fa fa-star checked" v-if="this.user.score>=20"></span>
        <span class="fa fa-star checked" v-if="this.user.score>=30"></span>
        <span class="fa fa-star checked" v-if="this.user.score>=40"></span>
        <span class="fa fa-star checked" v-if="this.user.score>=50"></span>
      </h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScoreCard",
  props: ["user"],
};
</script>

<style>
.checked {
  color: orange;
}
</style>