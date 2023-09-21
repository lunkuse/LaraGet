<template>
<div
      id="static-backdrop-modal-preview-resend"
      class="modal "
     
      tabindex="-1"
      aria-hidden="true"
      >
    <div class="modal-dialog modal-lg box ">
      <div class="modal-content">
        <!-- BEGIN: Modal Header -->
        <div class="modal-header">
          <h2 class="font-medium text-base mr-auto">New Message</h2>
       

          <div class="dropdown sm:hidden">
            <a
              class="dropdown-toggle w-5 h-5 block"
              href="javascript:;"
              aria-expanded="false"
            >
              <i
                data-feather="more-horizontal"
                class="w-5 h-5 text-gray-600 dark:text-gray-600"
              ></i>
            </a>
          </div>
        </div>





  <div class="p-5">
    <div class="toolbar mb-4" role="toolbar"></div>
    <div class="">
      <b>{{statusMgs}}</b>
      <form @submit.prevent="SentMail">
        <div class="form-group">
          <singleSelect
            v-bind="{
                            label: 'TO:',
                            class: 'form-control form-control-sm',
                            options: emailLists,
                          }"
            @option_email="selectedEmail"
          />
        </div>
        <!-- <div class="form-group">
                        <input type="text" class="form-control bg-transparent" placeholder=" To:" v-model="email.toUsers">
        </div>-->
        <div class="form-group pt-5">
          <input
            type="text"
            class="form-control bg-transparent"
            placeholder=" Subject:"
            v-model="email.subject"
          />
        </div>
        <div class="form-group pt-5">
          <textarea
            id="email-compose-editor"
            class="textarea_editor form-control bg-transparent"
            rows="10"
            placeholder="Enter text ..."
            v-model="email.message"
          ></textarea>
        </div>

        <h5 class="mb-4">
          <i class="fa fa-paperclip"></i> Attatchment
        </h5>
        <div class="fallback">
          <input name="attachments" type="file" multiple @change="fieldChange" />
        </div>
        <div v-for="doc in attachpreview" :key="doc.id" class="row">
          <div>
            <b>{{doc}}</b>
            <div class="progress w-72 h-3">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated text-gray-200"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{'width' : percentage + '%'}"
              >
                <b>{{doc}}</b>
              </div>
            </div>
          </div>
          <!-- <img :src="doc"> -->
        </div>
        <!-- <form action="#" class="dropzone"> -->
        <!-- </form> -->
        <div class="text-right mt-4">
             <!-- <button
                            type="reset"
                            data-dismiss="modal"
                            class="btn closeBTN btn-danger w-40 mr-auto"
                          >Cancel</button> -->
                           <button class="btn btn-danger light btn-sl-sm w-40" type="button"   data-dismiss="modal">
            <span class="mr-2">
              <i class="fa fa-times" aria-hidden="true"></i>
            </span>Cancel
          </button>
          <!-- <button class="btn btn-danger light btn-sl-sm w-40" type="button" @click="sendDraft()">
            <span class="mr-2">
              <i class="fa fa-times" aria-hidden="true"></i>
            </span>Discard
          </button> -->

          <button type="submit" class="btn bg-theme-32 w-40 mr-auto text-white">
            <LoadingIcon v-if="loading" icon="spinning-circles" color="white" class="w-4 h-4 ml-2" />
            <span v-else>Send</span>
          </button>

          <!-- <button class="btn btn-primary btn-sl-sm mr-2" type="submit"><span class="mr-2"><i class="fa fa-paper-plane"></i></span>Send</button> -->
        </div>
      </form>
      <!-- BEGIN: Success Notification Content -->
      <div id="success-notification-content-email" class="toastify-content hidden flex">
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Email has been Successfully sent</div>
        </div>
      </div>
      <!-- draft -->
       <div id="success-notification-content-draft" class="toastify-content hidden flex">
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Draft Email has been Successfully saved</div>
        </div>
      </div>
    </div>
  </div>
  </div>
  </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-cycle
import axios from 'axios'
import singleSelect from '@/components/inputs/emailSearch.vue'

import Toastify from 'toastify-js'
import router from '../../router'
import $ from 'cash-dom'
export default {
  name: 'composeBox',
  components: {
    singleSelect
  },
  data() {
    return {
      loading: false,
      stat: 0,
      percentage: 0,
      // valuenow: 95,
      statusMgs: '',
      attachments: [],
      attachpreview: [],
      emailLists: [],
      email: {
        // toUsers: '',
        selectedEmail: '',
        subject: '',
        message: ''
      }
    }
  },

  methods: {
    fieldChange(e) {
      let selectFiles = e.target.files

      for (let i = 0; i < selectFiles.length; i += 1) {
        this.attachments.push(selectFiles[i])
        this.attachpreview.push(selectFiles[i].name)
        // let src = URL.createObjectURL(selectFiles[i]);
      }
      if (this.attachments.length) {
        // alert('interval start');
        let interVal = setInterval(() => {
          if (this.percentage < 100) {
            this.percentage += 1
          } else {
            clearInterval(interVal)
          }
        }, 10)
      }
      // for (let i = 0; i < this.attachpreview.length; i += 1) {
      // let file = this.attachments[i];
      // }
      console.log(e)
    },
    fetchMails() {
      const token = localStorage.getItem('token')
      axios
        .post(
          '/v2/mails/drs_emailist',
          {},
          {
            headers: {
              Authorization: 'Bearer ' + token,
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then(response => {
          console.log(response.data.payload)
          let emailList = []
          response.data.payload.forEach(i => {
            emailList.push({
              first_option: i.first_name,
              last_option: i.last_name,
              email_option: i.email,
              photo_option: i.phone,
              mails: i.email
            })
          })
          this.emailLists = emailList
        })
        // .catch((error) => console.log(error));
        .catch(function(err) {
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
    selectedEmail(mails) {
      this.email.selectedEmail = mails
    },
    status(id) {
      this.stat = id
      if (id === 1) {
        this.statusMgs = 'private email'
      }
      if (id === 2) {
        this.statusMgs = 'Support email'
      }
      if (id === 3) {
        this.statusMgs = 'Social email'
      }
      if (id === 4) {
        this.statusMgs = 'Work email'
      }
    },
    SentMail() {
      this.loading = true
      // console.log(JSON.parse(this.attachments));
      const formData = new FormData()
      const token = localStorage.getItem('token')
      for (let i = 0; i < this.attachments.length; i += 1) {
        let file = this.attachments[i]
        // console.log('each image', file);
        formData.append('attachments[' + i + ']', file)
      }
      console.log('loop images', ...formData)
      formData.append('toUsers', this.email.selectedEmail)
      formData.append('subject', this.email.subject)
      formData.append('message', this.email.message)
      formData.append('status', this.stat)
      formData.append('under_category', 'private_care')
      // console.log(...formData);

      axios
        .post('/v2/mails/sendmail', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          //   //    let data = response.data;
          console.log('mail sent status', response.data.status)

          if (response.data.status === 'SUCCESS') {
            Toastify({
              node: $('#success-notification-content-email')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.loading = false
            router.push('/dashboard/sent-email')
            // this.$router.push('');
          }
          this.email = []
          this.emailList = []
          this.attachpreview = []
          this.attachments = []
        })
        .catch(error => {
          console.log(error)
        })
      //    alert('trying to add data');
    },
    sendDraft(){
      if(this.email.subject !== ''){
         if(this.email.message !== ''){
       this.loading = true
      // console.log(JSON.parse(this.attachments));
      const formData = new FormData()
      const token = localStorage.getItem('token')
     
      formData.append('toUsers', this.email.selectedEmail)
      formData.append('subject', this.email.subject)
      formData.append('message', this.email.message)
      formData.append('status', this.stat)
      formData.append('under_category', 'private_care')
      console.log("discard message", formData)
         axios.post('/v2/mails/save_draft', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(response => {
          //   //    let data = response.data;
          console.log('mail sent status', response.data.status)

          if (response.data.status === 'SUCCESS') {
            Toastify({
              node: $('#success-notification-content-draft')
                .clone()
                .removeClass('hidden')[0],
              duration: 3000,
              newWindow: true,
              close: true,
              gravity: 'top',
              position: 'right',
              stopOnFocus: true
            }).showToast()
            this.loading = false
            router.push('/dashboard/draft-email')
            // this.$router.push('');
          }
          this.email = []
          this.emailList = []
          this.attachpreview = []
          this.attachments = []
        })
        .catch(error => {
          console.log(error)
        })
}
else{ console.log('message is empty') }
}
else{ console.log('subject is empty') }



    }
    // progressbar(){

    // },
  },
  created() {
    this.fetchMails()
    // this.anotherMethod();
  }
}
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
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  z-index: 1;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
