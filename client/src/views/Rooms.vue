<template>
  <section id="rooms">
    <h1>Rooms</h1>
    <form @submit.prevent="createRoom">
      <input v-model="roomName" type="text" placeholder="create a room" />
    </form>
    <div v-if="rooms.length != 0">
      <div v-for="(room, i) in rooms" :key="i">
        <h4>{{ room.name }}</h4>
        <button @click="joinRoom(room.name)">Join Room</button>
      </div>
    </div>
    <div v-else>
      <h1>No Room</h1>
    </div>
  </section>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      rooms: [],
      roomName: "",
    };
  },
  sockets: {
    "get-rooms"(data) {
      this.rooms = data;
    },
    "updated-room"(data) {
      this.rooms = data;
    },
  },
  created() {
    // socket.on("get-rooms", (data) => {
    //   this.rooms = data;
    // });
    // this.$socket.emit("updated-room", (data) => {
    //   this.rooms = data;
    // });
  },
  methods: {
    joinRoom(name) {
      let payload = {
        "room-name": name,
        username: localStorage.username,
      };
      this.$socket.emit("join-room", payload);
      this.$router.push(`/playroom/${roomName}`);
    },
    createRoom() {
      let payload = {
        "room-name": this.roomName,
        admin: localStorage.username,
      };
      console.log(payload, "<< payload create room");
      this.$socket.emit("create-room", payload);
      this.roomName = "";
    },
  },
};
</script>

<style>
</style>
