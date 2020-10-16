<template>
  <section id="rooms">
    <h1>Rooms</h1>
    <form @submit.prevent="createRoom">
      <input v-model="roomName" type="text" placeholder="create a room" />
    </form>
    <div v-if="this.rooms.length != 0">
      <div class="row">
        <RoomCard v-for="(room, i) in this.rooms" :key="i" :room="room">
        </RoomCard>
      </div>
      <!-- <div v-for="(room, i) in this.rooms" :key="i">
        <h4>{{ room.name }}</h4>
        <button @click="joinRoom(room.name)">Join Room</button>
      </div> -->
    </div>
    <div v-else>
      <h1>No Room</h1>
    </div>
  </section>
</template>

<script>
import RoomCard from "@/components/RoomCard.vue";
export default {
  name: "Home",
  components: {
    RoomCard,
  },
  data() {
    return {
      // rooms: [],
      roomName: "",
    };
  },
  sockets: {
<<<<<<< HEAD
    "get-rooms"() {
      return this.$store.state.rooms;
    },
=======
    // "get-rooms"(data) {
    //   console.log("dariget-rooms", data);
    //   this.rooms = data;
    // },
>>>>>>> development
    // "updated-room"(data) {
    //   this.rooms = data;
    // },
  },
  computed: {
    rooms() {
      return this.$store.state.rooms;
    },
  },
  created() {
    // socket.on("get-rooms", (data) => {
    //   this.rooms = data;
    // });
    // this.$socket.emit("updated-room", (data) => {
    //   this.rooms = data;
    // });
    this.getRoom()
  },
  methods: {
    joinRoom(name) {
      let payload = {
        "room-name": name,
        username: localStorage.username,
      };
      console.log(payload["room-name"], "<< join roomName");
      this.$socket.emit("join-room", payload);
      this.$router.push(`/playroom/${name}`);
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
    getRoom () {
      return this.$store.state.rooms;
    }
  },
};
</script>

<style>
</style>
