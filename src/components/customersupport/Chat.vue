
<template>
  <div class="mb-10">
    
    <beautiful-chat
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :icons="icons"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="true"
      :deletionConfirmation="true"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"
      @onType="handleOnType"
      @edit="editMessage"
      class="mb-10"
       />
  </div>

</template>

<script>
import { defineComponent, toRaw} from 'vue'
import avatar from '../../assets/images/customer.png';
import avatar3 from '../../assets/images/doc.jpeg';
import titleavatar from '../../assets/images/information.png';

export default defineComponent({
  components: {

  },
 data() {
    return {
      participants: [
        {
          id: 'user1',
          name: 'Support',
          imageUrl: avatar
        }
        ,
        {
          id: 'user2',
          name: 'Ricky Support',
          imageUrl: avatar3
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: titleavatar,
    // titleImageUrl: 'https://via.placeholder.com/150',
      
      messageList: [
        { type: 'text', author: `user1`, data: { text: 'Hello, how can we help you?' } },
          { type: 'text', author: `me`, data: { text: `yes!` } },
         { type: 'text', author: `user2`, data: { text: 'Hello, we are ready to help you' } },
      
          
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      // newMessagesCount: 1,
      newMessagesCount: 1,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
      colors: {
        header: {
          bg: '#FF782E',
          text: '#ffffff'
        },
        launcher: {
          bg: '#FF782E'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#FF782E',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: false, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ 
    }
  },
  methods: {
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'support', type: 'text', data: { text } })
        console.log("message before", text)
      }
    },
    onMessageWasSent (message) {
      // called when the user sends a message
      this.messageList = [ ...this.messageList, message ]
      console.log("message1 sender", message.author)
      console.log("message1 text", message.data)
      console.log("message1 atype", message.type)
    },
    openChat () {
      // called when the user clicks on the fab button to open the chat
      this.isChatOpen = true
      this.newMessagesCount = 0
    },
    closeChat () {
      // called when the user clicks on the botton to close the chat
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType () {
      console.log('Emit typing event')
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
    }
  },
  created(){
    this.newMessagesCount = this.messageList.length
  }
})
</script>

