<template>
  <!-- BEGIN: User Verification Alerts -->
<div
    class="cursor-pointer fixed bottom-0 right-0  w-40 h-12 flex items-center justify-center z-50 mb-24 mr-6"
 >
   <!-- End: User Verification Alerts -->

   <div>
    <div class="">

      <!-- BEGIN: Chat Content -->
      <!--message icon-->
       <div
              class="
                chat__chat-list
                overflow-y-auto
                scrollbar-hidden
                pr-1
                pt-1
                mt-4
              "
            >
              <div
                v-for="(faker, fakerKey) in $_.take($f(), 1)"
                :key="fakerKey"
                class="
                  cursor-pointer
                  relative
                  flex
                  items-center
                "
                :class="{ 'mt-5': fakerKey }"
                @click="showChatBox"
              >
               <Content v-if="chatBox"/>

               <MessageCircleIcon style="color: blue; width: 50px; height: 50px;"
               @click="showChatBox"
              />
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                  </div>
                </div>
                <div
                  v-if="faker.trueFalse[0]"
                  class="
                    w-5
                    h-5
                    flex
                    items-center
                    justify-center
                    absolute
                    top-10px
                    right-10px
                    text-xs text-white
                    rounded-full
                    bg-theme-1
                    font-medium
                  "
                >
                  {{ faker.notificationCount }}
                </div>
              </div>
            </div>
      <!-- END: Chat Content -->
    </div>
  </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRaw } from 'vue'
import Content from '../chart-content/Main.vue'

export default defineComponent({
  components: {
    Content
  },
  setup() {
    const chatBox = ref(false)
    const showChatBox = () => {
      chatBox.value = !chatBox.value
    }

    return {
      chatBox,
      showChatBox
    }
  },
  computed: {
    currentUser() {
      console.log(toRaw(this.$store.state.auth.user))
      return toRaw(this.$store.state.auth.user)
    }
  }
})
</script>
