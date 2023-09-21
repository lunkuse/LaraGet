<template>
  <!-- BEGIN: Dark Mode Switcher-->
  <div>
  <div
    class=" chat cursor-pointer fixed bottom-0 right-0 w-40 h-12 flex items-center justify-center z-50 mb-24 mr-10"
    @click="showChatBox"
  >
    <!-- <span class="badge">3</span> -->

     <MessageCircleIcon style="color: blue; width: 50px; height: 50px;" />
  </div>
  <div v-if="chatBox" class=" shadow-md rounded-md chat-container fixed bottom-0 right-0 w-40 h-12 flex items-center justify-center z-50 mb-32 mr-10">
     <ChatContent/>
  </div>
  </div>
  <!-- END: Dark Mode Switcher-->
</template>
<script>
import { defineComponent, ref } from 'vue'
import ChatContent from './content.vue'
export default defineComponent({
  components: {
    ChatContent
  },
  setup() {
    const chatBox = ref(false)
    const showChatBox = () => {
      console.log('clicked', chatBox.value)
      chatBox.value = !chatBox.value
      console.log('new', chatBox.value)
    }

    return {
      chatBox,
      showChatBox
    }
  }
})
</script>
<style scoped>
.chat-container{
 background: white;
 padding: 8px;
 height: calc(60vh);
 width: 400px;
 margin-bottom: 150px;
}
  /* .chat:hover {
    background: red;
  } */

  .chat .badge {
    position: absolute;
    top: 5px;
    right: 5px;
    padding: 5px 10px;
    border-radius: 50%;
    background: rgb(52, 7, 212);
    color: white;
  }
  .chat .badge:hover {
    cursor: pointer;
  }
</style>
