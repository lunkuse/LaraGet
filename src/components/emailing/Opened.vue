<template>
<!-- <div class="col-12 box inset-0 flex flex-col p-4 text-gray-900  top-6 dark:text-white"> -->
  <div class="col-12 box inset-0 flex flex-col p-4 text-gray-900 top-6" style="max-height: 100vh; overflow-y: auto;">

  <!-- <div class="col-12 box inset-0 flex flex-col p-4 text-gray-900 bg-gray-100 dark:bg-gray-900 dark:text-white top-6"> -->
    <div class="flex justify-between ">
          <router-link
                    class="whitespace-nowrap"
                    :to="{
                      name: 'side-menu-communication'
                    }"
                  >
      
        <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
        </svg><!-- icon back -->
      </router-link>
    
     <Button
              :label="`${$t('translation.print_text')}`"
              @click="printMessage()"
            ></Button>
            <div
              class="max-h-44 flex flex-1 flex-col z-10 border-1 rounded-sm absolute text-sm doctor_search-dropdown2 bg-white"
              v-if="loadingexport"
            >
              <div
                class="flex flex-col justify-between items-center cursor-pointer bg-white w-auto"
                style="margin-top: 13px"
              >
                <div
                  class="flex h-auto gap-2 w-full text-sm text-gray-800 justify-center items-center p-2"
                >
                  <svg
                    class="animate-spin h-6 w-6 text-yellow-650"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      class="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="#FF782E"
                      stroke-width="4"
                    />
                    <path
                      class="opacity-1"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  <p>
                    {{ $t('translation.printing_text') }}..
                  </p>
                </div>
              </div>
            </div>
    </div> <!-- email header -->
    <div class="flex items-center text-lg intro-y  ">
      <div class="flex flex-wrap items-center pb-2">
      {{ subject }}
      </div>
      <div>
 
      </div>

    </div>





  
      <div  >
      <div class="flex " >
        <Avatars v-if="fullName" v-bind:initials="fullName"  class="rounded-full"/>
         <div class="w-full leading-none text-gray-800 col-span-12 space-y-1 dark:text-gray-200 pl-5">
        <div   class="custom-container w-full " >
        <span class="text-black">  {{fullName}} </span>
          <span class="ml-2 text-gray-500  text-xxs dark:text-gray-400 custom-float-right"> 
            {{moment(messageInfo?.created_at, "DD-MM-YYYY").format("DD-MM-YYYY")}}  ({{ moment(messageInfo?.created_at ).fromNow()}})
            </span>
        </div>
        <div class="flex text-gray-500">
          <div>
            {{ $t('translation.to_me_text') }} 
          </div>
          <svg xmlns="http://www.w3.org/2000/svg" class="w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div> 
      
      </div> 
     

  
    </div>

    <div class="flex flex-col justify-between flex-1  overflow-auto  pl-3">
      <div>
     
        <p  class="mt-3 mb-3 dark:text-white ml-10"  v-html="myMessage"></p>
          <hr>
                        <div class="read-content-attachment"  >
                            <div class="container mx-auto justify-center mt-4" style="display: flex;
     align-items: center; text-align: center;">
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-6">

                            <div class="row attachment" v-for="doc_attachment in attachments" :key="doc_attachment">
                              
                                <div class="text-gray-600">
                                  
            
     <div class="intro-x flex items-center h-10 hover:text-theme-36 hover:underline" @click="SaveAs(doc_attachment.docs)">
                    <h2 class="font-medium truncate mr-5">{{doc_attachment.docs.substring(doc_attachment.docs.lastIndexOf('/')+1) }}</h2>

                    <a
                      href="javascript:;"
                      data-toggle="modal"
                      data-target="#static-backdrop-modal-preview"
                      
                    >
                      <DownloadIcon class="w-4 h-4"/>
                    </a>
                  </div>
              



<img
                alt=""
                :src="
            (doc_attachment.docs.split('.').pop()) === 'png'
              ? doc_attachment.docs
              : (doc_attachment.docs.split('.').pop()) === 'jpeg'
              ? doc_attachment.docs
              : (doc_attachment.docs.split('.').pop()) === 'jpg'
              ? doc_attachment.docs
              : (doc_attachment.docs.split('.').pop()) === 'pdf'
              ? pdflogo
              : (doc_attachment.docs.split('.').pop()) === 'txt'
              ? textlogo
              : (doc_attachment.docs.split('.').pop()) === 'xls'
              ? excellogo
              : (doc_attachment.docs.split('.').pop()) === 'xlsx'
              ? excellogo
              : (doc_attachment.docs.split('.').pop()) === 'docx'
              ? doclogo
               : doc_attachment.docs.substring(doc_attachment.docs.split('.').pop()) === 'doc'
              ? doclogo
              : 'https://via.placeholder.com/150'
          "

                
                class="rounded-md border border-white max-h-24"
                data-action="zoom"
                @click="SaveAs(doc_attachment.docs)"
                
              />



 
            </div>

       </div>  </div>
    

                            </div>
                        </div>
                        <hr v-if="doc_attachment">
        <!-- <p class="mt-4">Regards,</p>
        <p v-if="viewMgs">Metadent</p> -->
      </div>



<div class="col-12 flex flex-col  text-gray-900 top-6" >
<div class="intro-y box p-5 mt-5" v-if="loading">
   
     
     <span
        
        class="flex flex-col w-full col-span-12 sm:w-auto items-center mt-10"
      >
        <LoadingIcon icon="oval" class="w-10 h-10" />
        <span> {{ $t('translation.loading_text') }}..</span>
      </span></div> 
        <div class="row attachment" v-for="reply in messageReplies" :key="reply.id">
          <!-- {{reply.subject}} -->

          <div class="mt-6">


            <div class="flex " >
        <Avatars v-if="fullName" v-bind:initials="reply.from_fname + reply.from_lname"  class="rounded-full"/>
         <div class="w-full leading-none text-gray-800 col-span-12 space-y-1 dark:text-gray-200 pl-5">
        <div   class="custom-container w-full " >
           
                 <span > {{reply.from_fname}} {{reply.from_lname}} </span>
          <span class="ml-2 text-gray-500  text-xxs dark:text-gray-400 custom-float-right"> 
            {{moment(reply.created_at, "DD-MM-YYYY").format("DD-MM-YYYY")}}  ({{ moment(reply.created_at ).fromNow()}})
            </span>
        </div>
        <div class="flex text-gray-500">
          <div>
            <div v-if="reply.from_user_id === myId">{{$t("translation.to_text") }} {{reply.to_user}}</div>
                   <div v-else>to me</div>
          </div>
         
        </div>
      </div> </div> 



                <div class="flex flex-col justify-between flex-1 overflow-auto ml-10 pl-3">
            <div>
         
              <p  class="mt-1 mb-3 dark:text-white">{{reply.replyMessage}}</p>
            </div>
          </div>
          
          </div>

         
        </div>
      </div>













      <div class="flex px-1 pt-4 pb-2 space-x-2 	lg:pl-24 lg:pr-24" >
        <a href="#replyform" v-on:click="seen = !seen" class="flex items-center justify-center flex-1 p-2 border border-gray-300 rounded-full dark:border-gray-500 transition-all ring-gray-50 focus:border-theme-36">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          {{$t("translation.reply_text") }}
        </a>
        <!-- <a href="#replyform" v-on:click="seen = !seen" class="flex items-center justify-center flex-1 p-2 border border-gray-300 rounded-full dark:border-gray-500 transition-all ring-gray-50 focus:border-theme-36	">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 mr-2 scale-x-flip" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          {{$t("translation.forward_text") }}
        </a> -->
      </div>
        </div>
<div class="col-12 inset-0 flex flex-col mb-10 text-gray-900  top-6" 	   id="replyform">
      <form  @submit.prevent="reply" v-if="seen">
                        <div class="mb-3 pt-3">
                            <textarea name="reply_email" v-model="reply_email" cols="30" rows="2" class="form-control" placeholder="message" ></textarea>
                        </div>
                        <div class="">
                       
                        <button
                        type="submit"
                        class="btn bg-theme-32 w-40 mr-auto text-white"
                      >
                        <LoadingIcon
                          v-if="loadingbutton"
                          icon="spinning-circles"
                          color="white"
                          class="w-4 h-4 ml-2"
                        />
                        <span v-else> {{$t("translation.send_text") }}</span>
                      </button>
                    </div>
                        </form>
                        
                         <!-- BEGIN: Success Notification Content -->
                      <div id="success-notification-content-reply" class="toastify-content hidden flex">
                        <CheckCircleIcon class="text-theme-9" />
                        <div class="ml-4 mr-4">
                          <div class="font-medium">{{$t("translation.replySent") }} </div>
                        </div>
                    
    </div>
 </div>
   
  </div> 
</template>

<script>
// eslint-disable-next-line no-unused-vars
import moment from 'moment';
// eslint-disable-next-line import/no-cycle
import axios from "axios";
// eslint-disable-next-line no-unused-vars
import avatar from '../../assets/images/placeholder.jpg';
import router from '../../router'
import Avatars from '@/components/avatar/AvatarSingle.vue';
import  newpdflogo from '../../assets/images/pdfthumbnail.png';

import  newtextlogo from '../../assets/images/textthumbnail.png';
import  newexcellogo from '../../assets/images/excelthumbnail.png';
import  newdoclogo from '../../assets/images/docthumbnail.png';
import Toastify from "toastify-js";
import $ from 'cash-dom'
import Button from '@/components/shared/buttons/Button.vue'
export default {
  name: 'readMgs',
   props: ['emailId: { type: Object }, messageId: { type: Object }'],
   components: { Avatars, Button},
  data() {
    return {
      reply_email: '',
      myId :'',
      avatar,
      viewMgs: null,
      loading: false,
      loadingbutton: false,
      loadingexport: false,
      seen: false,
      pdflogo: newpdflogo,
      textlogo: newtextlogo,
      excellogo: newexcellogo,
      doclogo: newdoclogo,
      myMessage:'',
      fullName:'',
      fromLastName:'',
      subject:'',
      messageReplies:[],
      from_email:'',
      attachments:[],
      messageInfo:'',
      storedLang: localStorage.getItem("lang"),
   
       
       
    };
  },
  methods: {
    moment,
    
    async printMessage() {
      const defaultLang = this.storedLang ?? "en";
    const lang =defaultLang;
     this.loadingexport=true
      const token = localStorage.getItem('token')
      const config = {
        url: 'v2/mails/download-single-message-pdf',
        method: 'get',
        responseType: 'blob',
        params: {
         id: this.$route.params.newmessageID,
         lang: lang
        },
        headers: {
          Authorization: 'Bearer ' + token,

          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        }
      }
     
      // this.isExporting = true
      axios(config).then(response => {
        const blob = new Blob([response.data], { type: 'application/pdf' })

        // window.open(URL.createObjectURL(blob)).print();
        this.loadingexport=false
        let iframe = document.createElement('iframe') //load content in an iframe to print later
        document.body.appendChild(iframe)

        iframe.style.display = 'none'
        iframe.src = URL.createObjectURL(blob)
        iframe.onload = function() {
          setTimeout(function() {
            iframe.focus()
            iframe.contentWindow.print()
          }, 1)
        }
      })

      // this.hideExportLoader()
    },
    status(id) {
       const token = localStorage.getItem('token')
      // console.log('dropdown', id);
      const mgs_Id = this.$route.params.id;
            axios
       .post('/v2/mail/status', { statusId: id, messageId: mgs_Id },
        { headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'multipart/form-data',
        } })
      // customAxios.post('/v2/mail/status', { statusId: id, messageId: mgs_Id })
      .then((response) => {
        console.log(response.data.payload);
      }).catch(((error) => console.log(error)));
    },
    getMails() {
      // this.myMessage = this.$route.params.message
      // this.fullName=this.$route.params.fullName
    //  messageSubject
      // this.subject =this.$route.params.subject
      console.log('this.$route.params',this.$route.params)
      this.loading = true
      const token = localStorage.getItem('token')
      const data = {
        message_Id: this.$route.params.newmessageID
      }
      axios.post('v2/mails/read_mgs', data, {
          headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
          console.log('expired session response', res)
          this.loading = false
          this.myMessage = res.data.payload[0]?.message
          this.fullName = res.data.payload[0]?.from_fname + res.data.payload[0]?.from_lname
          this.subject =res.data.payload[0]?.subject
          this.from_email =res.data.payload[0]?.from_email

          
        this.messageReplies = res.data.payload[0].all_replies
        this.messageReplies = res.data.payload[0].all_replies
        this.attachments = res.data.payload[0].emailattachments

      this.messageInfo=res.data.payload[0]
      console.log('opened email successfully', this.messageReplies)
      
         
        })
      
           .catch(function (err) {
           console.log('expired session error new', err.response.status)
           const errorCode = err.response.status
            if (errorCode === 401) {
        console.log('expired session')
         localStorage.removeItem('user')
        localStorage.removeItem('token')
        router.go('/login')
    } else {
      // Handle else
    }
         })
    },
    SaveAs(url){
      console.log('url passed', url)
      // document.getElementById('my_iframe').src = url
      const link = document.createElement('a')
        link.href = url
      link.target="_blank"
    link.click()
    },
    
    reply() {
      this.loadingbutton = true
       const token = localStorage.getItem('token') 
      const category = 'private_care';
      const mgs_id = this.$route.params.newmessageID;
    
      const body_email = this.reply_email;
      // const fname = this.viewMgs.first_name;
      // const lname = this.viewMgs.last_name;
      // const to_user = this.$route.params.fromEmail;
      
      axios
     .post('/v2/mails/reply',  {
        under_category: category,
        message_id: mgs_id,
        subject: this.myMessage,
        reply_user: this.from_email,
        replyMessage: body_email },
        {   headers: {
            Authorization: 'Bearer ' + token,

            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
          } })
     
        .then((response) => {
        console.log(response.data.payload);
        if (response.data.status === 'SUCCESS') {
              Toastify({
                    node: $("#success-notification-content-reply")
                      .clone()
                      .removeClass("hidden")[0],
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                  }).showToast();
                  this.getMails()
                  this.reply_email = ""
                  this.loadingbutton = false
                  
          // router.push('/dashboard/sent-email');

      
        }
      }).catch((error) => {
        console.log(error);
         console.log("about to reply error", error);
      });
    },
  },
  created() {
     this.getMails()
     this.myId = localStorage.getItem('userID')
    
  },
  watch: {
    myMessage(newValue, oldValue) {
      this.myMessage = newValue
     
    },
    fullName(newValue, oldValue) {
      this.fullName = newValue
    
    },
    
   subject(newValue, oldValue) {
      this.subject = newValue
    
    }
    
  }

};
</script>
<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 4px 8px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.custom-container {
  overflow: auto; /* Clear float */
}

.custom-float-right {
  float: right;
}
</style>
