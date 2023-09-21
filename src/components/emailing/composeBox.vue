<template>
  <div class="mx-5 ml-0 ml-sm-4 ml-sm-0 w-10/12">
    <div class="toolbar mb-4" role="toolbar"></div>
    <div class="compose-content">
      <b>{{ statusMgs }}</b>
      <form @submit.prevent="SentMail">
        <!-- <div class="form-group">
         

          <singleSelect
       
            v-bind="{
              
              label: t('translation.to_text'),
              class: 'form-control form-control-sm',
              options: emailLists
            }"
            @option_email="selectedEmail"
          />
          
        </div> -->
      
        <!-- <div class="form-group pt-5">
          <input
            type="text"
            class="form-control border-gray-200 focus:border-theme-36 col-span-4 bg-transparent"
           
            :placeholder="`${$t('translation.subject_text')}`"
            v-model="email.subject"
          />
        </div> -->
     
        <ClassicEditor v-model="editorData"
        :config="editorConfig"
        @focus="changeFocus"
        />
        <span
        v-if="isRequired"
          style="font-size: 13px"
          class="text-theme-6 p-2"
        >Required</span>
        <!-- <div class="form-group pt-5 hidden">
          <textarea
            id="email-compose-editor"
            class="textarea_edißtor form-control  boxß"
                
            rows="10"
           
            :placeholder="`${$t('translation.enter_text')}`"
            v-model="email.message"
          ></textarea>
        </div> -->

        <h5 class="mb-4">
          <i class="fa fa-paperclip"></i>
          <span>{{ $t('translation.attachment_text') }}</span>
        </h5>
        <!-- <div class="fallback">
          <input
            name="attachments"
            type="file"
            multiple
            @change="fieldChange"
          />
        </div> -->
        <div class="fallback">
  <input
    name="attachments"
    type="file"
    multiple
    accept=".jpg, .jpeg, .png, .pdf" 
    id="fileInput"
    @change="fieldChange"
    style="display: none;"
  />
  <label for="fileInput" class="text-gray-300   custom-file-input-label bg-theme-1">
    <UploadCloudIcon class="text-gray-300 " />
    {{ $t('translation.choose_file_text') }}</label>
</div>
        <div v-for="doc in attachpreview" :key="doc.id" class="row pt-2">
          <div>
            <b>{{ doc }}</b>
            <div class="progress w-72 h-3">
              <div
                class="progress-bar progress-bar-striped progress-bar-animated text-gray-500"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                :style="{ width: percentage + '%' }"
              >
                <b>{{ doc }}</b>
              </div>
            </div>
          </div>
          <!-- <img :src="doc"> -->
        </div>
        <!-- <form action="#" class="dropzone"> -->
        <!-- </form> -->
        <!-- <div class="w-full mt-4 flex">
          <button
            class="btn btn-danger "
            type="button"
            @click="sendDraft()"
          >
           
            <p>{{ $t('translation.discard_text') }}</p>
          </button>

          <button type="submit" class="btn bg-theme-32  mr-auto text-white">
            <LoadingIcon
              v-if="loading"
              icon="spinning-circles"
              color="white"
              class="w-4 h-4 ml-2"
            />
            <span v-else>
              <p>{{ $t('translation.send_text') }}</p>
            </span>
          </button>

        </div> -->
        <div class="w-full mt-4 button-container">
  <button class="btn btn-danger" type="button" @click="clearMessage()">
    <p>{{ $t('translation.clear_text') }}</p>
  </button>

  <button type="submit" class="btn bg-theme-32 text-white !focus:border-none">
    <LoadingIcon
      v-if="loading"
      icon="spinning-circles"
      color="white"
      class="w-4 h-4 ml-2"
    />
    <span v-else>
      <p>{{ $t('translation.send_text') }}</p>
    </span>
  </button>
</div>

      </form>
      <!-- BEGIN: Success Notification Content -->
      <div
        id="success-notification-content-email"
        class="toastify-content hidden flex"
      >
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Email has been Successfully sent</div>
        </div>
      </div>
      <!-- draft -->
      <div
        id="success-notification-content-draft"
        class="toastify-content hidden flex"
      >
        <CheckCircleIcon class="text-theme-9" />
        <div class="ml-4 mr-4">
          <div class="font-medium">Draft Email has been Successfully saved</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// eslint-disable-next-line import/no-cycle
// import axios from 'axios'
import axios from '../../axios'
import singleSelect from '@/components/inputs/emailSearch.vue'
import Toastify from 'toastify-js'
import router from '../../router'
import { inject } from 'vue'
import $ from 'cash-dom'
import { useI18n } from "vue-i18n";
import ClassicEditor from '../../global-components/ckeditor/ClassicEditor.vue';


export default {
  name: 'composeBox',
  components: {
    singleSelect,
    ClassicEditor
  },
  data() {
    return {
      loading: false,
      stat: 0,
      percentage: 0,
      isRequired:false,
      // valuenow: 95,
      statusMgs: '',
      attachments: [],
      attachpreview: [],
      emailLists: [],
      email: {
        // toUsers: '',
        selectedEmail: '',
        subject: '',
        message: ''},
        editorData:'',
        editorConfig: {
        toolbar: [
          'heading',
          '|',
          'bold',
          'italic',
          'link',
          'bulletedList',
          'numberedList',
          '|',
          'blockQuote',
          'undo',
          'redo',
        ],
        language: 'nl', // Set the editor's language
        placeholder: this.t('translation.enter_text'), // Set a placeholder text
        fontSize: {
          options: [9, 10, 11, 12, 14, 16, 18, 20, 24, 30, 36], // Set font size options
        },
        fontColor: {
          colors: [
            {
              color: 'hsl(0, 0%, 0%)', // Black
              label: 'Black',
            },
            {
              color: 'hsl(0, 0%, 30%)', // Dark Gray
              label: 'Dark Gray',
            },
            // Add more color options as needed
          ],
        },
        fontFamily: {
          options: [
            'Arial, sans-serif',
            'Georgia, serif',
            'Impact, Charcoal, sans-serif',
            'Tahoma, Geneva, sans-serif',
            'Times New Roman, Times, serif',
            'Verdana, Geneva, sans-serif',
          ], // Set font family options
        },
        // Other CKEditor configuration options can be added here.
      },
  

      
    }
  },

  methods: {
    clearMessage(){
      this.editorData = ""
    },
       
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
              Authorization: 'Bearer ' + token
              // 'Content-Type': 'multipart/form-data'
            }
          }
        )
        .then((response) => {
          console.log('my emails', response.data.payload)
          let emailList = []
          response.data.payload.forEach((i) => {
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
        .catch(function (err) {
          // console.log('expired session error new', err.response.status)
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
    changeFocus(){
      this.isRequired = false
    },
    SentMail() {
      if(this.editorData === ''){
        this.isRequired = true
      }
      else{
    
      this.loading = true
      console.log('editor text', this.editorData)
      // console.log(JSON.parse(this.attachments));
      const formData = new FormData()
      const token = localStorage.getItem('token')
      for (let i = 0; i < this.attachments.length; i += 1) {
        let file = this.attachments[i]
        // console.log('each image', file);
        formData.append('attachment[' + i + ']', file)
      }
      console.log('loop images', ...formData)
      // formData.append('toUsers', this.email.selectedEmail)
      // formData.append('subject', this.email.subject)
      // formData.append('message', this.email.message)
      
      formData.append('message', this.editorData)
      formData.append('status', this.stat)
      formData.append('under_category', 'private_care')
      // console.log(...formData);

      axios
        .post('/v2/mails/send_mail', formData, {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then((response) => {
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
        .catch((error) => {
          console.log(error)
        })
      //    alert('trying to add data');
    }},
    sendDraft() {
      if (this.email.subject !== '') {
        if (this.email.message !== '') {
          this.loading = true
        
          const formData = new FormData()
          const token = localStorage.getItem('token')

          formData.append('toUsers', this.email.selectedEmail)
          formData.append('subject', this.email.subject)
          formData.append('message', this.email.message)
          formData.append('status', this.stat)
          formData.append('under_category', 'private_care')
          console.log('discard message', formData)
          axios
            .post('/v2/mails/save_draft', formData, {
              headers: {
                Authorization: 'Bearer ' + token,
                'Content-Type': 'multipart/form-data'
              }
            })
            .then((response) => {
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
            .catch((error) => {
              console.log(error)
            })
        } else {
          console.log('message is empty')
        }
      } else {
        console.log('subject is empty')
      }
    }
    // progressbar(){

    // },
  },
  created() {
    // this.fetchMails()
    // this.anotherMethod();
    
    
  },
  setup() {
    const { t } = useI18n({});
    return {
      t
    }
  }
}
</script>
<style scoped>

.button-container {
  display: flex;
  justify-content: space-between;
}

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
.custom-file-input-label {
    
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
