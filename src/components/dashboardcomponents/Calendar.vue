<template>
<div class="col-span-12 md:col-span-6 xl:col-span-4 2xl:col-span-12 xl:col-start-1 xl:row-start-2 2xl:col-start-auto 2xl:row-start-auto mt-3">
<div class="intro-x flex items-center h-10"><h2 class="text-lg font-medium truncate mr-5">Schedules</h2>
<a href="" class="ml-auto text-primary truncate flex items-center">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" 
stroke-linecap="round" stroke-linejoin="round" class="lucide w-4 h-4 mr-1"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> Add New Schedules </a></div><div class="mt-5"><div class="intro-x box"><div class="p-5"><div class="flex"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-5 h-5 text-slate-500"><polyline points="15 18 9 12 15 6"></polyline></svg><div class="font-medium text-base mx-auto">April</div><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide w-5 h-5 text-slate-500"><polyline points="9 18 15 12 9 6"></polyline></svg></div><div class="grid grid-cols-7 gap-4 mt-5 text-center"><div class="font-medium">Su</div><div class="font-medium">Mo</div><div class="font-medium">Tu</div><div class="font-medium">We</div><div class="font-medium">Th</div><div class="font-medium">Fr</div><div class="font-medium">Sa</div><div class="py-0.5 rounded relative text-slate-500">29</div><div class="py-0.5 rounded relative text-slate-500">30</div><div class="py-0.5 rounded relative text-slate-500">31</div><div class="py-0.5 rounded relative">1</div><div class="py-0.5 rounded relative">2</div><div class="py-0.5 rounded relative">3</div><div class="py-0.5 rounded relative">4</div><div class="py-0.5 rounded relative">5</div><div class="py-0.5 bg-success/20 dark:bg-success/30 rounded relative"> 6 </div><div class="py-0.5 rounded relative">7</div><div class="py-0.5 bg-primary text-white rounded relative"> 8 </div><div class="py-0.5 rounded relative">9</div><div class="py-0.5 rounded relative">10</div><div class="py-0.5 rounded relative">11</div><div class="py-0.5 rounded relative">12</div><div class="py-0.5 rounded relative">13</div><div class="py-0.5 rounded relative">14</div><div class="py-0.5 rounded relative">15</div><div class="py-0.5 rounded relative">16</div><div class="py-0.5 rounded relative">17</div><div class="py-0.5 rounded relative">18</div><div class="py-0.5 rounded relative">19</div><div class="py-0.5 rounded relative">20</div><div class="py-0.5 rounded relative">21</div><div class="py-0.5 rounded relative">22</div><div class="py-0.5 bg-pending/20 dark:bg-pending/30 rounded relative"> 23 </div><div class="py-0.5 rounded relative">24</div><div class="py-0.5 rounded relative">25</div><div class="py-0.5 rounded relative">26</div><div class="py-0.5 bg-primary/10 dark:bg-primary/50 rounded relative"> 27 </div><div class="py-0.5 rounded relative">28</div><div class="py-0.5 rounded relative">29</div><div class="py-0.5 rounded relative">30</div><div class="py-0.5 rounded relative text-slate-500">1</div><div class="py-0.5 rounded relative text-slate-500">2</div><div class="py-0.5 rounded relative text-slate-500">3</div><div class="py-0.5 rounded relative text-slate-500">4</div><div class="py-0.5 rounded relative text-slate-500">5</div><div class="py-0.5 rounded relative text-slate-500">6</div><div class="py-0.5 rounded relative text-slate-500">7</div><div class="py-0.5 rounded relative text-slate-500">8</div><div class="py-0.5 rounded relative text-slate-500">9</div></div></div><div class="border-t border-slate-200/60 p-5"><div class="flex items-center"><div class="w-2 h-2 bg-pending rounded-full mr-3"></div><span class="truncate">UI/UX Workshop</span><span class="font-medium xl:ml-auto">23th</span></div><div class="flex items-center mt-4"><div class="w-2 h-2 bg-primary rounded-full mr-3">
</div><span class="truncate">VueJs Frontend Development</span><span class="font-medium xl:ml-auto">10th</span></div><div class="flex items-center mt-4">
<div class="w-2 h-2 bg-warning rounded-full mr-3"></div><span class="truncate">Laravel Rest API</span><span class="font-medium xl:ml-auto">
31th</span></div></div></div></div></div> 
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
