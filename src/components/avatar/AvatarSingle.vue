<template>

      <div v-bind:style="{ backgroundColor: getRandomColor() }" class="flex items-center justify-center w-8 h-8 font-bold rounded-full select-none text-cyan-800 bg-cyan-100 twxt-white">
       <p class="text-white ">  {{ getInitials(initials) }}</p>
    </div>
    </template>
    
    <script>
    import { defineComponent, toRaw} from 'vue'
    
    export default defineComponent({
      components: {
      },
    props: ["initials"],
      data() {
       
        
        
    
        return {
            colors: [
        "#F44336",
        "#E91E63",
        "#9C27B0",
        "#673AB7",
        "#3F51B5",
        "#2196F3",
        "#03A9F4",
        "#00BCD4",
        "#009688",
        "#4CAF50",
        "#8BC34A",
        "#FF9800",
        "#FF5722"
      ],
          loading: false
        }
      },
    
      created() {
      },
      computed: {
        currentUser() {
          return toRaw(this.$store.state.auth.user)
        },
    
      },
      mounted() {
      },
    methods: {
        getInitials(data) {
            console.log('avartar single name', data)
          if (data != null) {
            let chr;
            const d = data?.toUpperCase();
            chr = d.split(" ");
            if (chr.length >= 2) {
              return chr[0][0];
            } else {
              return d[0];
            }
          }
          return "";
        },
        getRandomColor() {
          let randomIndex = Math.floor(Math.random() * this.colors.length);
          return this.colors[randomIndex];
        },
      },
    })
    </script>
    <style scoped>
    .avatar-icon {
     
      width: 40px;
      height: 40px;
      text-align: center;
      line-height: 2.4;
      color: #ffffff;
      font-weight: bold;
      border-radius: 50%;
      margin-right: 5px;
    }
    </style>
    
    