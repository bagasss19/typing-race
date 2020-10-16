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
        <b>{{ this.user.score }}</b>
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
</style>