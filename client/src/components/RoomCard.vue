<template>
  <div class="card col-sm-3">
    <img
      :src="
        'https://avatars.dicebear.com/api/bottts/' + this.room.admin + '.svg'
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
      <h4 class="card-title">{{ this.room.name }}</h4>
      <h5 class="card-title">Admin: {{ this.room.admin }}</h5>
      <h5 class="card-text">players: {{ this.room.users.length }}</h5>

      <div>
        <button @click="joinRoom(room.name)">Join Room</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RoomCard",
  props: ["room"],
};
</script>

<style>
</style>