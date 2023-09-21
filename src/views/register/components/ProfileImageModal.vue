<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10 font-sans">
      <TransitionChild>
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
      </TransitionChild>

      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild>
            <DialogPanel
                class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-5xl sm:w-full">
              <!-- modal header -->
              <div class="px-3 pt-4 sm:p-6 sm:pb-2">
                <div class="flex justify-between items-start border-b border-gray-300">
                  <h3 class="text-xl font-bold font-sans text-yellow-650">
                    {{ t('patients.forms.profileImage') }}
                  </h3>
                  <button type="button" id="closePreview"
                          class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-yellow-650 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
                          data-modal-toggle="defaultModal" @click="$emit('close')">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                      <path fill-rule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clip-rule="evenodd"></path>
                    </svg>
                  </button>
                </div>
              </div>


              <div class="p-6 space-y-6">
                <div v-if="imageSizeWarning"
                     class="p-2 rounded-md bg-red-600 flex items-center text-white font-sans">
                  {{ t('patients.forms.fileIsTooBig') }}
                </div>
                <div class="camera-button">
                  <!-- :class="{ 'is-primary': !isCameraOpen, 'is-danger': isCameraOpen }" -->
                  <i class="fa-thin fa-camera-slash"></i>
                  <i class="fa-solid fa-camera-viewfinder"></i>
                  <Button type="button" class="button is-rounded" @click="toggleCamera"
                          :icon="!isCameraOpen ? 'fa fa-camera' : 'fa fa-camera'"
                          :label="!isCameraOpen ? t('patients.forms.openCamera') : t('patients.forms.closeCamera')"/>
                </div>

                <div class="border-y py-2 flex items-center justify-center">
                  <h3 class="">{{ t('patients.forms.or') }}</h3>
                </div>

                <Button :icon="'fa fa-upload'" :label="t('patients.forms.uploadImage')"
                        @click="toggleInput" type="button"/>

                <div v-show="isCameraOpen && isLoading" class="camera-loading">
                  <ul class="loader-circle">
                    <li></li>
                    <li></li>
                    <li></li>
                  </ul>
                </div>

                <div v-if="isFileInput">
                  <input type="file"
                         class="!block !w-full !text-sm !text-gray-900 !border !border-gray-300 !rounded-lg !cursor-pointer !bg-gray-50 !focus:outline-none"
                         accept="image/*" name="file" id="" @change="handleChange">
                  <p class="mt-1 text-sm text-gray-500" id="file_input_help">
                    {{ t('patients.forms.fileFormat') }}</p>

                </div>

                <div v-if="isCameraOpen" v-show="!isLoading" class="camera-box"
                     :class="{ 'flash': isShotPhoto }">

                  <div class="camera-shutter" :class="{ 'flash': isShotPhoto }"></div>

                  <video v-show="!isPhotoTaken" ref="camera" :width="450" :height="337.5"
                         autoplay></video>

                  <canvas v-show="isPhotoTaken" id="photoTaken" ref="canvas" :width="450"
                          :height="337.5"></canvas>
                </div>

                <div class="flex items-center justify-between">
                  <div v-if="isCameraOpen && !isLoading" class="camera-shoot">
                    <Button type="button" :label="t('patients.forms.takePhoto')"
                            @click="takePhoto"/>
                    <!-- <button type="button" class="button" @click="takePhoto">
                        <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                    </button> -->
                  </div>
                  <div v-if="isPhotoUploaded && isFileInput" class="camera-download">
                    <Button type="button" :label="t('patients.forms.save')"
                            @click="handleSaveImage"/>
                  </div>
                  <div v-if="isPhotoTaken && isCameraOpen" class="camera-download">
                    <Button type="button" :label="t('patients.forms.save')"
                            @click="handleSaveImage"/>
                    <!-- <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" -->
                    <!-- @click="downloadImage"> -->
                    <!-- Download -->
                    <!-- </a> -->
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import {defineComponent, ref} from 'vue';
import {Dialog, DialogPanel, TransitionChild, TransitionRoot} from '@headlessui/vue';
import Button from './Button.vue';
import {useI18n} from "vue-i18n";

export default defineComponent({

  data() {
    return {
      isCameraOpen: false,
      isPhotoTaken: false,
      isPhotoUploaded: false,
      isShotPhoto: false,
      isFileInput: false,
      isLoading: false,
      image: '',
      link: '#',
      imageSizeWarning: false,
    }
  },
  components: {
    Dialog, DialogPanel, TransitionChild, TransitionRoot, Button
  },
  methods: {
    toggleInput() {
      if (this.isCameraOpen) {
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      }
      this.isFileInput = true;
    },
    toggleCamera() {
      if (this.isCameraOpen) {
        this.isFileInput = false;
        this.isCameraOpen = false;
        this.isPhotoTaken = false;
        this.isShotPhoto = false;
        this.stopCameraStream();
      } else {
        this.isCameraOpen = true;
        this.createCameraElement();
      }
    },

    createCameraElement() {
      this.isLoading = true;

      const constraints = (window.constraints = {
        audio: false,
        video: true
      });


      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(stream => {
            this.isLoading = false;
            this.$refs.camera.srcObject = stream;
          })
          .catch(error => {
            this.isLoading = false;
            alert(this.t('patients.forms.errorOpeningCamera'));
          });
    },

    stopCameraStream() {
      let tracks = this.$refs.camera.srcObject.getTracks();

      tracks.forEach(track => {
        track.stop();
      });
    },
    blobToFile(theBlob, fileName) {
      return new File([theBlob], fileName, {
        lastModified: new Date().getTime(),
        type: theBlob.type,
      });
    },
    async takePhoto() {
      if (!this.isPhotoTaken) {
        this.isShotPhoto = true;

        const FLASH_TIMEOUT = 50;

        setTimeout(() => {
          this.isShotPhoto = false;
        }, FLASH_TIMEOUT);
      }

      this.isPhotoTaken = !this.isPhotoTaken;

      const context = this.$refs.canvas.getContext('2d');
      context.drawImage(this.$refs.camera, 0, 0, 450, 337.5);
      const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");
      const blob = await (await fetch(canvas)).blob();
      this.image = this.blobToFile(blob, 'profile_image');
    },
    async downloadImage() {
      // const download = document.getElementById("downloadPhoto");
      // const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg")
      // .replace("image/jpeg", "image/octet-stream");
      // console.log('the context is', canvas)
      // download.setAttribute("href", canvas);
      const download = document.getElementById("downloadPhoto");
      const canvas = document.getElementById("photoTaken").toDataURL("image/jpeg");
      const blob = await (await fetch(canvas)).blob();
      this.image = this.blobToFile(blob, 'profile_image');
      // this.$emit('setImage', this.image)
      // console.log(image)
      // .replace("image/jpeg", "image/octet-stream");
      // console.log('the context is', canvas)
      // download.setAttribute("href", canvas);
    },
    handleChange(e) {
      // console.log("the file size is", e.target.files[0].size);
      if (e.target.files[0].size > 2000000) {
        this.imageSizeWarning = true;
        this.isPhotoUploaded = false;
        this.image = '';
      } else {
        this.imageSizeWarning = false;
        this.isPhotoUploaded = true
        this.image = e.target.files[0];
      }
      // this.$emit('setImage', this.image)
    },
    handleSaveImage() {
      this.$emit('setImage', this.image);
      this.$emit('close');
    }
  },
  setup() {
    const open = ref(true);
    const {t} = useI18n();
    return {
      open,
      t
    };
  },
})

</script>

<style scoped>
.loader-circle {
  display: block;
  height: 14px;
  margin: 0 auto;
  top: 50%;
  left: 100%;
  transform: translateY(-50%);
  transform: translateX(-50%);
  position: absolute;
  width: 100%;
  padding: 0;
}

li {
  display: block;
  float: left;
  width: 10px;
  height: 10px;
  line-height: 10px;
  padding: 0;
  position: relative;
  margin: 0 0 0 4px;
  background: #999;
  animation: preload 1s infinite;
  top: -50%;
  border-radius: 100%;

  /* &:nth-child(2) {
      animation-delay: .2s;
  }

  &:nth-child(3) {
      animation-delay: .4s;
  } */
}
</style>