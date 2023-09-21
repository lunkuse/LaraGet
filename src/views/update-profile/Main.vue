<template>
  <div class="items-center">
    <div
      id="update-info-modal"
      class="modal items-center justify-center m-10"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="grid grid-cols-12 items-center">
        <div class="col-span-12 mt-8">
          <!-- BEGIN: Display Information -->
          <div class="intro-y box m-10 lg:mt-5">
            <div
              class="flex items-center p-5 border-b border-gray-200 dark:border-dark-5"
            >
              <h2 class="font-medium text-base mr-auto capitalize">
              {{ $t('translation.update_profile_information') }}  
              </h2>
            </div>


            <DataForm />



            

            <div class="p-5 ">
              <form
                class="validate-form hidden"
                @submit.prevent="updateProfile"
                autocomplete="off"
              >
              
                <div class="grid grid-cols-12 gap-4 gap-y-5 mt-5">
                  <!-- first name -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label
                      for="update-profile-form-7"
                      class="form-label font-medium text-bold"
                      v-if="currentUser.first_name"
                    >
                      <p>{{ $t('translation.first_name_text') }}</p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      :placeholder="`${$t('translation.enterFirstName')}`"
                      
                      name="first_name"
                      disabled
                      v-model="currentUser.first_name"
                    />
                    <template v-if="validate.first_name.$error">
                      <div
                        v-for="(error, index) in validate.first_name.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- last name -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-2" class="form-label">
                      <p>{{ $t('translation.last_name_text') }}</p>
                    </label>
                    <input
                      id="input-wizard-2"
                      type="text"
                      class="form-control"
                      name="last_name"
                      placeholder="Enter Last Name"
                      disabled
                      v-model="currentUser.last_name"
                    />
                    <template v-if="validate.last_name.$error">
                      <div
                        v-for="(error, index) in validate.last_name.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- email -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="email" class="form-label">
                      <p>{{ $t('translation.email_text') }}</p>

                      <span class="text-theme-6"></span>
                    </label>

                    <input
                      id="email"
                      type="text"
                      class="form-control"
                      placeholder="Enter Email"
                      name="email"
                     
                      v-model="currentUser.email"
                    />
                    <template v-if="validate.email.$error">
                      <div
                        v-for="(error, index) in validate.email.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- patient_phone -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="email" class="form-label">
                      <p>{{ $t('translation.patient_phone_text') }}</p>
                      <span class="text-theme-6"></span>
                    </label>
                    <input
                      id="phone"
                      type="text"
                      class="form-control"
                      placeholder="Enter patient Phone"
                      name="patient_phone"
                      v-model.trim="validate.patient_phone.$model"
                      :class="{
                        'border-theme-6': validate.patient_phone.$error
                      }"
                  
                    />
                    <template v-if="validate.patient_phone.$error">
                      <div
                        v-for="(error, index) in validate.patient_phone.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- date of birth -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="birth_date" class="form-label">
                      <p>
                        {{ $t('translation.dob_text') }}
                        <span class="text-theme-6">*</span>
                      </p>
                    </label>
                    <input
                      id="birth_date"
                      type="text"
                      class="form-control"
                      placeholder="Enter birth_date"
                      name="birth_date"
                      disabled
                      v-model="currentUser.birth_date"
                    />
                    <!-- <Litepicker
                        v-model.trim="validate.birth_date.$model"
                              :class="{ 'border-theme-6': validate.birth_date.$error }"
                      placeholder="Date of birth*"
                      name="birth_date"
                      :options="{
                        autoApply: false,
                        showWeekNumbers: true,
                        dropdowns: {
                          minYear: 1960,
                          maxYear: null,
                          months: true,
                          years: true,
                        },
                        disable
                      }"
                      class="w-full intro-x form-control bg-gray-100 py-3 px-4 block border-gray-200 focus:border-gray-500"
                      style="box-shadow: 0px 3px 5px #00000007"
                    />-->
                    <template v-if="validate.birth_date.$error">
                      <div
                        v-for="(error, index) in validate.birth_date.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- gender -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="gender" class="form-label">
                      <p >
                        {{ $t('translation.gender_text') }}
                        <span class="text-theme-6">*</span>
                      </p>
                    
                    </label>
                    <TomSelect
                      name="gender"
                      id="gender"
                      placeholder="Choose Gender *"
                      class="w-full"
                      v-model="gender"
                    >
                      <option value="Male">
                        {{ $t('translation.male_text') }}
                      </option>
                      <option value="Female">
                        {{ $t('translation.female_text') }}
                      </option>
                      <option value="Other">
                        {{ $t('translation.other_text') }}
                      </option>
                    </TomSelect>
                    <template v-if="validate.gender.$error">
                      <div
                        v-for="(error, index) in validate.gender.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- marriage status-->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="gender" class="form-label">
                      <p>
                        {{ $t('translation.marital_status_text') }}
                        <span class="text-theme-6">*</span>
                      </p>
                    </label>
                    <TomSelect
                      name="gender"
                      id="gender"
                      placeholder="Choose Gender *"
                      class="w-full"
                      v-model="maritalStatus"
                    >
                      <option value="single">
                        <p>
                          {{ $t('translation.single_text')   }}
                        </p>
                      </option>
                      <option value="married">
                        <p>
                          {{ $t('translation.married_text') }}
                        </p>
                      </option>
                      <option value="divorced">
                        <p >
                          {{ $t('translation.divorced_text') }}
                        </p>
                      </option>
                      <option value="engaged">
                        <p>
                          {{ $t('translation.engaged_text') }}
                        </p>
                      </option>
                      <option value="separated">
                        <p>
                          {{ $t('translation.separated_text') }}
                        </p>
                      </option>
                    </TomSelect>
                    <template v-if="validate.maritalStatus.$error">
                      <div
                        v-for="(error, index) in validate.maritalStatus.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- home address -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-3" class="form-label">
                      <p>
                        {{ $t('translation.home_address__text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-3"
                      type="text"
                      class="form-control"
                      placeholder="Enter address"
                      name="home_address"
                      v-model="home_address"
                    />
                  
                  </div>

                  <!-- nationality -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-3" class="form-label">
                      <p>
                        {{ $t('translation.nationality_text') }}
                      </p>
                    </label>

                    <TomSelect
                      name="nationality"
                      id="nationality"
                      placeholder="Choose Nationality *"
                      class="w-full"
                      v-model="nationality"
                      @change="onchange"
                    >
                      <!-- All nationalities -->

                      <option value>Select your nationality</option>
                      <option value="afghan">Afghan</option>
                      <option value="albanian">Albanian</option>
                      <option value="algerian">Algerian</option>
                      <option value="american">American</option>
                      <option value="andorran">Andorran</option>
                      <option value="angolan">Angolan</option>
                      <option value="anguillan">Anguillan</option>
                      <option value="citizen-of-antigua-and-barbuda">
                        Citizen of Antigua and Barbuda
                      </option>
                      <option value="argentine">Argentine</option>
                      <option value="armenianaustralian">
                        ArmenianAustralian
                      </option>
                      <option value="austrian">Austrian</option>
                      <option value="azerbaijani">Azerbaijani</option>
                      <option value="bahamian">Bahamian</option>
                      <option value="bahraini">Bahraini</option>
                      <option value="bangladeshi">Bangladeshi</option>
                      <option value="barbadian">Barbadian</option>
                      <option value="belarusian">Belarusian</option>
                      <option value="belgian">Belgian</option>
                      <option value="belizean">Belizean</option>
                      <option value="beninese">Beninese</option>
                      <option value="bermudian">Bermudian</option>
                      <option value="bhutanese">Bhutanese</option>
                      <option value="bolivian">Bolivian</option>
                      <option value="citizen-of-bosnia-and-herzegovina">
                        Citizen of Bosnia and Herzegovina
                      </option>
                      <option value="botswanan">Botswanan</option>
                      <option value="brazilian">Brazilian</option>
                      <option value="british">British</option>
                      <option value="british-virgin-islander">
                        British Virgin Islander
                      </option>
                      <option value="bruneian">Bruneian</option>
                      <option value="bulgarian">Bulgarian</option>
                      <option value="burkinan">Burkinan</option>
                      <option value="burmese">Burmese</option>
                      <option value="burundian">Burundian</option>
                      <option value="cambodian">Cambodian</option>
                      <option value="cameroonian">Cameroonian</option>
                      <option value="canadian">Canadian</option>
                      <option value="cape-verdean">Cape Verdean</option>
                      <option value="cayman-islander">Cayman Islander</option>
                      <option value="central-african">Central African</option>
                      <option value="chadian">Chadian</option>
                      <option value="chilean">Chilean</option>
                      <option value="chinese">Chinese</option>
                      <option value="colombian">Colombian</option>
                      <option value="comoran">Comoran</option>
                      <option value="congolese-(congo)">
                        Congolese (Congo)
                      </option>
                      <option value="congolese-(drc)">Congolese (DRC)</option>
                      <option value="cook-islander">Cook Islander</option>
                      <option value="costa-rican">Costa Rican</option>
                      <option value="croatian">Croatian</option>
                      <option value="cuban">Cuban</option>
                      <option value="cymraes">Cymraes</option>
                      <option value="cymro">Cymro</option>
                      <option value="cypriot">Cypriot</option>
                      <option value="czech">Czech</option>
                      <option value="danish">Danish</option>
                      <option value="djiboutian">Djiboutian</option>
                      <option value="dominican">Dominican</option>
                      <option value="citizen-of-the-dominican-republic">
                        Citizen of the Dominican Republic
                      </option>
                      <option value="dutch">Dutch</option>
                      <option value="east-timorese">East Timorese</option>
                      <option value="ecuadorean">Ecuadorean</option>
                      <option value="egyptian">Egyptian</option>
                      <option value="emirati">Emirati</option>
                      <option value="english">English</option>
                      <option value="equatorial-guinean">
                        Equatorial Guinean
                      </option>
                      <option value="eritrean">Eritrean</option>
                      <option value="estonian">Estonian</option>
                      <option value="ethiopian">Ethiopian</option>
                      <option value="faroese">Faroese</option>
                      <option value="fijian">Fijian</option>
                      <option value="filipino">Filipino</option>
                      <option value="finnish">Finnish</option>
                      <option value="french">French</option>
                      <option value="gabonese">Gabonese</option>
                      <option value="gambian">Gambian</option>
                      <option value="georgian">Georgian</option>
                      <option value="german">German</option>
                      <option value="ghanaian">Ghanaian</option>
                      <option value="gibraltarian">Gibraltarian</option>
                      <option value="greek">Greek</option>
                      <option value="greenlandic">Greenlandic</option>
                      <option value="grenadian">Grenadian</option>
                      <option value="guamanian">Guamanian</option>
                      <option value="guatemalan">Guatemalan</option>
                      <option value="citizen-of-guinea-bissau">
                        Citizen of Guinea-Bissau
                      </option>
                      <option value="guinean">Guinean</option>
                      <option value="guyanese">Guyanese</option>
                      <option value="haitian">Haitian</option>
                      <option value="honduran">Honduran</option>
                      <option value="hong-konger">Hong Konger</option>
                      <option value="hungarian">Hungarian</option>
                      <option value="icelandic">Icelandic</option>
                      <option value="indian">Indian</option>
                      <option value="indonesian">Indonesian</option>
                      <option value="iranian">Iranian</option>
                      <option value="iraqi">Iraqi</option>
                      <option value="irish">Irish</option>
                      <option value="israeli">Israeli</option>
                      <option value="italian">Italian</option>
                      <option value="ivorian">Ivorian</option>
                      <option value="jamaican">Jamaican</option>
                      <option value="japanese">Japanese</option>
                      <option value="jordanian">Jordanian</option>
                      <option value="kazakh">Kazakh</option>
                      <option value="kenyan">Kenyan</option>
                      <option value="kittitian">Kittitian</option>
                      <option value="citizen-of-kiribati">
                        Citizen of Kiribati
                      </option>
                      <option value="kosovan">Kosovan</option>
                      <option value="kuwaiti">Kuwaiti</option>
                      <option value="kyrgyz">Kyrgyz</option>
                      <option value="lao">Lao</option>
                      <option value="latvian">Latvian</option>
                      <option value="lebanese">Lebanese</option>
                      <option value="liberian">Liberian</option>
                      <option value="libyan">Libyan</option>
                      <option value="liechtenstein-citizen">
                        Liechtenstein citizen
                      </option>
                      <option value="lithuanian">Lithuanian</option>
                      <option value="luxembourger">Luxembourger</option>
                      <option value="macanese">Macanese</option>
                      <option value="macedonian">Macedonian</option>
                      <option value="malagasy">Malagasy</option>
                      <option value="malawian">Malawian</option>
                      <option value="malaysian">Malaysian</option>
                      <option value="maldivian">Maldivian</option>
                      <option value="malian">Malian</option>
                      <option value="maltese">Maltese</option>
                      <option value="marshallese">Marshallese</option>
                      <option value="martiniquais">Martiniquais</option>
                      <option value="mauritanian">Mauritanian</option>
                      <option value="mauritian">Mauritian</option>
                      <option value="mexican">Mexican</option>
                      <option value="micronesian">Micronesian</option>
                      <option value="moldovan">Moldovan</option>
                      <option value="monegasque">Monegasque</option>
                      <option value="mongolian">Mongolian</option>
                      <option value="montenegrin">Montenegrin</option>
                      <option value="montserratian">Montserratian</option>
                      <option value="moroccan">Moroccan</option>
                      <option value="mosotho">Mosotho</option>
                      <option value="mozambican">Mozambican</option>
                      <option value="namibian">Namibian</option>
                      <option value="nauruan">Nauruan</option>
                      <option value="nepalese">Nepalese</option>
                      <option value="new-zealander">New Zealander</option>
                      <option value="nicaraguan">Nicaraguan</option>
                      <option value="nigerian">Nigerian</option>
                      <option value="nigerien">Nigerien</option>
                      <option value="niuean">Niuean</option>
                      <option value="north-korean">North Korean</option>
                      <option value="northern-irish">Northern Irish</option>
                      <option value="norwegian">Norwegian</option>
                      <option value="omani">Omani</option>
                      <option value="pakistani">Pakistani</option>
                      <option value="palauan">Palauan</option>
                      <option value="palestinian">Palestinian</option>
                      <option value="panamanian">Panamanian</option>
                      <option value="papua-new-guinean">
                        Papua New Guinean
                      </option>
                      <option value="paraguayan">Paraguayan</option>
                      <option value="peruvian">Peruvian</option>
                      <option value="pitcairn-islander">
                        Pitcairn Islander
                      </option>
                      <option value="polish">Polish</option>
                      <option value="portuguese">Portuguese</option>
                      <option value="prydeinig">Prydeinig</option>
                      <option value="puerto-rican">Puerto Rican</option>
                      <option value="qatari">Qatari</option>
                      <option value="romanian">Romanian</option>
                      <option value="russian">Russian</option>
                      <option value="rwandan">Rwandan</option>
                      <option value="salvadorean">Salvadorean</option>
                      <option value="sammarinese">Sammarinese</option>
                      <option value="samoan">Samoan</option>
                      <option value="sao-tomean">Sao Tomean</option>
                      <option value="saudi-arabian">Saudi Arabian</option>
                      <option value="scottish">Scottish</option>
                      <option value="senegalese">Senegalese</option>
                      <option value="serbian">Serbian</option>
                      <option value="citizen-of-seychelles">
                        Citizen of Seychelles
                      </option>
                      <option value="sierra-leonean">Sierra Leonean</option>
                      <option value="singaporean">Singaporean</option>
                      <option value="slovak">Slovak</option>
                      <option value="slovenian">Slovenian</option>
                      <option value="solomon-islander">Solomon Islander</option>
                      <option value="somali">Somali</option>
                      <option value="south-african">South African</option>
                      <option value="south-korean">South Korean</option>
                      <option value="south-sudanese">South Sudanese</option>
                      <option value="spanish">Spanish</option>
                      <option value="sri-lankan">Sri Lankan</option>
                      <option value="st-helenian">St Helenian</option>
                      <option value="st-lucian">St Lucian</option>
                      <option value="stateless">Stateless</option>
                      <option value="sudanese">Sudanese</option>
                      <option value="surinamese">Surinamese</option>
                      <option value="swazi">Swazi</option>
                      <option value="swedish">Swedish</option>
                      <option value="swiss">Swiss</option>
                      <option value="syrian">Syrian</option>
                      <option value="taiwanese">Taiwanese</option>
                      <option value="tajik">Tajik</option>
                      <option value="tanzanian">Tanzanian</option>
                      <option value="thai">Thai</option>
                      <option value="togolese">Togolese</option>
                      <option value="tongan">Tongan</option>
                      <option value="trinidadian">Trinidadian</option>
                      <option value="tristanian">Tristanian</option>
                      <option value="tunisian">Tunisian</option>
                      <option value="turkish">Turkish</option>
                      <option value="turkmen">Turkmen</option>
                      <option value="turks-and-caicos-islander">
                        Turks and Caicos Islander
                      </option>
                      <option value="tuvaluan">Tuvaluan</option>
                      <option value="ugandan">Ugandan</option>
                      <option value="ukrainian">Ukrainian</option>
                      <option value="uruguayan">Uruguayan</option>
                      <option value="uzbek">Uzbek</option>
                      <option value="vatican-citizen">Vatican citizen</option>
                      <option value="citizen-of-vanuatu">
                        Citizen of Vanuatu
                      </option>
                      <option value="venezuelan">Venezuelan</option>
                      <option value="vietnamese">Vietnamese</option>
                      <option value="vincentian">Vincentian</option>
                      <option value="wallisian">Wallisian</option>
                      <option value="welsh">Welsh</option>
                      <option value="yemeni">Yemeni</option>
                      <option value="zambian">Zambian</option>
                      <option value="zimbabwean">Zimbabwean</option>
                    </TomSelect>
                    <template v-if="validate.nationality.$error">
                      <div
                        v-for="(error, index) in validate.nationality.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- country-->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-3" class="form-label">
                      <p>
                        {{ $t('translation.country_text') }}
                      </p>
                    </label>

                    <TomSelect
                      class="w-auto"
                      as="select"
                      name="country"
                      id="country"
                      v-model="country"
                    >
                      <!-- All countries -->
                      <option value="Afghanistan">Afghanistan</option>
                      <option value="Åland Islands">Åland Islands</option>
                      <option value="Albania">Albania</option>
                      <option value="Algeria">Algeria</option>
                      <option value="American Samoa">American Samoa</option>
                      <option value="Andorra">Andorra</option>
                      <option value="Angola">Angola</option>
                      <option value="Anguilla">Anguilla</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Antigua and Barbuda">
                        Antigua and Barbuda
                      </option>
                      <option value="Argentina">Argentina</option>
                      <option value="Armenia">Armenia</option>
                      <option value="Aruba">Aruba</option>
                      <option value="Australia">Australia</option>
                      <option value="Austria">Austria</option>
                      <option value="Azerbaijan">Azerbaijan</option>
                      <option value="Bahamas">Bahamas</option>
                      <option value="Bahrain">Bahrain</option>
                      <option value="Bangladesh">Bangladesh</option>
                      <option value="Barbados">Barbados</option>
                      <option value="Belarus">Belarus</option>
                      <option value="Belgium">Belgium</option>
                      <option value="Belize">Belize</option>
                      <option value="Benin">Benin</option>
                      <option value="Bermuda">Bermuda</option>
                      <option value="Bhutan">Bhutan</option>
                      <option value="Bolivia">Bolivia</option>
                      <option value="Bosnia and Herzegovina">
                        Bosnia and Herzegovina
                      </option>
                      <option value="Botswana">Botswana</option>
                      <option value="Bouvet Island">Bouvet Island</option>
                      <option value="Brazil">Brazil</option>
                      <option value="British Indian Ocean Territory">
                        British Indian Ocean Territory
                      </option>
                      <option value="Brunei Darussalam">
                        Brunei Darussalam
                      </option>
                      <option value="Bulgaria">Bulgaria</option>
                      <option value="Burkina Faso">Burkina Faso</option>
                      <option value="Burundi">Burundi</option>
                      <option value="Cambodia">Cambodia</option>
                      <option value="Cameroon">Cameroon</option>
                      <option value="Canada">Canada</option>
                      <option value="Cape Verde">Cape Verde</option>
                      <option value="Cayman Islands">Cayman Islands</option>
                      <option value="Central African Republic">
                        Central African Republic
                      </option>
                      <option value="Chad">Chad</option>
                      <option value="Chile">Chile</option>
                      <option value="China">China</option>
                      <option value="Christmas Island">Christmas Island</option>
                      <option value="Cocos (Keeling) Islands">
                        Cocos (Keeling) Islands
                      </option>
                      <option value="Colombia">Colombia</option>
                      <option value="Comoros">Comoros</option>
                      <option value="Congo">Congo</option>
                      <option value="Congo, The Democratic Republic of The">
                        Congo, The Democratic Republic of The
                      </option>
                      <option value="Cook Islands">Cook Islands</option>
                      <option value="Costa Rica">Costa Rica</option>
                      <option value="Cote D'ivoire">Cote D'ivoire</option>
                      <option value="Croatia">Croatia</option>
                      <option value="Cuba">Cuba</option>
                      <option value="Cyprus">Cyprus</option>
                      <option value="Czech Republic">Czech Republic</option>
                      <option value="Denmark">Denmark</option>
                      <option value="Djibouti">Djibouti</option>
                      <option value="Dominica">Dominica</option>
                      <option value="Dominican Republic">
                        Dominican Republic
                      </option>
                      <option value="Ecuador">Ecuador</option>
                      <option value="Egypt">Egypt</option>
                      <option value="El Salvador">El Salvador</option>
                      <option value="Equatorial Guinea">
                        Equatorial Guinea
                      </option>
                      <option value="Eritrea">Eritrea</option>
                      <option value="Estonia">Estonia</option>
                      <option value="Ethiopia">Ethiopia</option>
                      <option value="Falkland Islands (Malvinas)">
                        Falkland Islands (Malvinas)
                      </option>
                      <option value="Faroe Islands">Faroe Islands</option>
                      <option value="Fiji">Fiji</option>
                      <option value="Finland">Finland</option>
                      <option value="France">France</option>
                      <option value="French Guiana">French Guiana</option>
                      <option value="French Polynesia">French Polynesia</option>
                      <option value="French Southern Territories">
                        French Southern Territories
                      </option>
                      <option value="Gabon">Gabon</option>
                      <option value="Gambia">Gambia</option>
                      <option value="Georgia">Georgia</option>
                      <option value="Germany">Germany</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Gibraltar">Gibraltar</option>
                      <option value="Greece">Greece</option>
                      <option value="Greenland">Greenland</option>
                      <option value="Grenada">Grenada</option>
                      <option value="Guadeloupe">Guadeloupe</option>
                      <option value="Guam">Guam</option>
                      <option value="Guatemala">Guatemala</option>
                      <option value="Guernsey">Guernsey</option>
                      <option value="Guinea">Guinea</option>
                      <option value="Guinea-bissau">Guinea-bissau</option>
                      <option value="Guyana">Guyana</option>
                      <option value="Haiti">Haiti</option>
                      <option value="Heard Island and Mcdonald Islands">
                        Heard Island and Mcdonald Islands
                      </option>
                      <option value="Holy See (Vatican City State)">
                        Holy See (Vatican City State)
                      </option>
                      <option value="Honduras">Honduras</option>
                      <option value="Hong Kong">Hong Kong</option>
                      <option value="Hungary">Hungary</option>
                      <option value="Iceland">Iceland</option>
                      <option value="India">India</option>
                      <option value="Indonesia">Indonesia</option>
                      <option value="Iran, Islamic Republic of">
                        Iran, Islamic Republic of
                      </option>
                      <option value="Iraq">Iraq</option>
                      <option value="Ireland">Ireland</option>
                      <option value="Isle of Man">Isle of Man</option>
                      <option value="Israel">Israel</option>
                      <option value="Italy">Italy</option>
                      <option value="Jamaica">Jamaica</option>
                      <option value="Japan">Japan</option>
                      <option value="Jersey">Jersey</option>
                      <option value="Jordan">Jordan</option>
                      <option value="Kazakhstan">Kazakhstan</option>
                      <option value="Kenya">Kenya</option>
                      <option value="Kiribati">Kiribati</option>
                      <option value="Korea, Democratic People's Republic of">
                        Korea, Democratic People's Republic of
                      </option>
                      <option value="Korea, Republic of">
                        Korea, Republic of
                      </option>
                      <option value="Kuwait">Kuwait</option>
                      <option value="Kyrgyzstan">Kyrgyzstan</option>
                      <option value="Lao People's Democratic Republic">
                        Lao People's Democratic Republic
                      </option>
                      <option value="Latvia">Latvia</option>
                      <option value="Lebanon">Lebanon</option>
                      <option value="Lesotho">Lesotho</option>
                      <option value="Liberia">Liberia</option>
                      <option value="Libyan Arab Jamahiriya">
                        Libyan Arab Jamahiriya
                      </option>
                      <option value="Liechtenstein">Liechtenstein</option>
                      <option value="Lithuania">Lithuania</option>
                      <option value="Luxembourg">Luxembourg</option>
                      <option value="Macao">Macao</option>
                      <option
                        value="Macedonia, The Former Yugoslav Republic of"
                      >
                        Macedonia, The Former Yugoslav Republic of
                      </option>
                      <option value="Madagascar">Madagascar</option>
                      <option value="Malawi">Malawi</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Maldives">Maldives</option>
                      <option value="Mali">Mali</option>
                      <option value="Malta">Malta</option>
                      <option value="Marshall Islands">Marshall Islands</option>
                      <option value="Martinique">Martinique</option>
                      <option value="Mauritania">Mauritania</option>
                      <option value="Mauritius">Mauritius</option>
                      <option value="Mayotte">Mayotte</option>
                      <option value="Mexico">Mexico</option>
                      <option value="Micronesia, Federated States of">
                        Micronesia, Federated States of
                      </option>
                      <option value="Moldova, Republic of">
                        Moldova, Republic of
                      </option>
                      <option value="Monaco">Monaco</option>
                      <option value="Mongolia">Mongolia</option>
                      <option value="Montenegro">Montenegro</option>
                      <option value="Montserrat">Montserrat</option>
                      <option value="Morocco">Morocco</option>
                      <option value="Mozambique">Mozambique</option>
                      <option value="Myanmar">Myanmar</option>
                      <option value="Namibia">Namibia</option>
                      <option value="Nauru">Nauru</option>
                      <option value="Nepal">Nepal</option>
                      <option value="Netherlands">Netherlands</option>
                      <option value="Netherlands Antilles">
                        Netherlands Antilles
                      </option>
                      <option value="New Caledonia">New Caledonia</option>
                      <option value="New Zealand">New Zealand</option>
                      <option value="Nicaragua">Nicaragua</option>
                      <option value="Niger">Niger</option>
                      <option value="Nigeria">Nigeria</option>
                      <option value="Niue">Niue</option>
                      <option value="Norfolk Island">Norfolk Island</option>
                      <option value="Northern Mariana Islands">
                        Northern Mariana Islands
                      </option>
                      <option value="Norway">Norway</option>
                      <option value="Oman">Oman</option>
                      <option value="Pakistan">Pakistan</option>
                      <option value="Palau">Palau</option>
                      <option value="Palestinian Territory, Occupied">
                        Palestinian Territory, Occupied
                      </option>
                      <option value="Panama">Panama</option>
                      <option value="Papua New Guinea">Papua New Guinea</option>
                      <option value="Paraguay">Paraguay</option>
                      <option value="Peru">Peru</option>
                      <option value="Philippines">Philippines</option>
                      <option value="Pitcairn">Pitcairn</option>
                      <option value="Poland">Poland</option>
                      <option value="Portugal">Portugal</option>
                      <option value="Puerto Rico">Puerto Rico</option>
                      <option value="Qatar">Qatar</option>
                      <option value="Reunion">Reunion</option>
                      <option value="Romania">Romania</option>
                      <option value="Russian Federation">
                        Russian Federation
                      </option>
                      <option value="Rwanda">Rwanda</option>
                      <option value="Saint Helena">Saint Helena</option>
                      <option value="Saint Kitts and Nevis">
                        Saint Kitts and Nevis
                      </option>
                      <option value="Saint Lucia">Saint Lucia</option>
                      <option value="Saint Pierre and Miquelon">
                        Saint Pierre and Miquelon
                      </option>
                      <option value="Saint Vincent and The Grenadines">
                        Saint Vincent and The Grenadines
                      </option>
                      <option value="Samoa">Samoa</option>
                      <option value="San Marino">San Marino</option>
                      <option value="Sao Tome and Principe">
                        Sao Tome and Principe
                      </option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                      <option value="Senegal">Senegal</option>
                      <option value="Serbia">Serbia</option>
                      <option value="Seychelles">Seychelles</option>
                      <option value="Sierra Leone">Sierra Leone</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Slovakia">Slovakia</option>
                      <option value="Slovenia">Slovenia</option>
                      <option value="Solomon Islands">Solomon Islands</option>
                      <option value="Somalia">Somalia</option>
                      <option value="South Africa">South Africa</option>
                      <option
                        value="South Georgia and The South Sandwich Islands"
                      >
                        South Georgia and The South Sandwich Islands
                      </option>
                      <option value="Spain">Spain</option>
                      <option value="Sri Lanka">Sri Lanka</option>
                      <option value="Sudan">Sudan</option>
                      <option value="Suriname">Suriname</option>
                      <option value="Svalbard and Jan Mayen">
                        Svalbard and Jan Mayen
                      </option>
                      <option value="Swaziland">Swaziland</option>
                      <option value="Sweden">Sweden</option>
                      <option value="Switzerland">Switzerland</option>
                      <option value="Syrian Arab Republic">
                        Syrian Arab Republic
                      </option>
                      <option value="Taiwan">Taiwan</option>
                      <option value="Tajikistan">Tajikistan</option>
                      <option value="Tanzania, United Republic of">
                        Tanzania, United Republic of
                      </option>
                      <option value="Thailand">Thailand</option>
                      <option value="Timor-leste">Timor-leste</option>
                      <option value="Togo">Togo</option>
                      <option value="Tokelau">Tokelau</option>
                      <option value="Tonga">Tonga</option>
                      <option value="Trinidad and Tobago">
                        Trinidad and Tobago
                      </option>
                      <option value="Tunisia">Tunisia</option>
                      <option value="Turkey">Turkey</option>
                      <option value="Turkmenistan">Turkmenistan</option>
                      <option value="Turks and Caicos Islands">
                        Turks and Caicos Islands
                      </option>
                      <option value="Tuvalu">Tuvalu</option>
                      <option value="Uganda">Uganda</option>
                      <option value="Ukraine">Ukraine</option>
                      <option value="United Arab Emirates">
                        United Arab Emirates
                      </option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="United States Minor Outlying Islands">
                        United States Minor Outlying Islands
                      </option>
                      <option value="Uruguay">Uruguay</option>
                      <option value="Uzbekistan">Uzbekistan</option>
                      <option value="Vanuatu">Vanuatu</option>
                      <option value="Venezuela">Venezuela</option>
                      <option value="Viet Nam">Viet Nam</option>
                      <option value="Virgin Islands, British">
                        Virgin Islands, British
                      </option>
                      <option value="Virgin Islands, U.S.">
                        Virgin Islands, U.S.
                      </option>
                      <option value="Wallis and Futuna">
                        Wallis and Futuna
                      </option>
                      <option value="Western Sahara">Western Sahara</option>
                      <option value="Yemen">Yemen</option>
                      <option value="Zambia">Zambia</option>
                      <option value="Zimbabwe">Zimbabwe</option>
                    </TomSelect>
                    <template v-if="validate.country.$error">
                      <div
                        v-for="(error, index) in validate.country.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- state -->

                  <!-- state -->

                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      <p>
                        {{ $t('translation.state_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter state"
                      name="state"
                      v-model="state"
                    />
                    <template v-if="validate.state.$error">
                      <div
                        v-for="(error, index) in validate.state.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!--  city -->

                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      <p>
                        {{ $t('translation.city_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter city"
                      name="city"
                      v-model="city"
                    />
                    <template v-if="validate.city.$error">
                      <div
                        v-for="(error, index) in validate.city.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- street -->

                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      <p>
                        {{ $t('translation.street_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter street"
                      name="street"
                      v-model="street"
                    />
                    <template v-if="validate.street.$error">
                      <div
                        v-for="(error, index) in validate.street.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- occupation-->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      <p>
                        {{ $t('translation.occupation_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter Occupation"
                      name="occupation"
                      v-model="occupation"
                    />
                    <template v-if="validate.occupation.$error">
                      <div
                        v-for="(error, index) in validate.occupation.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- postal code -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      <p>
                        {{ $t('translation.occupation_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter postal code"
                      name="postalcode"
                      v-model="postalcode"
                    />
                    <template v-if="validate.postalcode.$error">
                      <div
                        v-for="(error, index) in validate.postalcode.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- home phone -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-4" class="form-label">
                      <p>
                        {{ $t('translation.home_phone_text') }}
                      </p>
                    </label>
                    <div class="input-group">
                      <div id="input-group-email" class="w-full">
                        <TomSelect
                          class="w-auto"
                          as="select"
                          id="home_phone_code"
                          v-model="home_phone_code"
                        >
                          <!-- All countries -->
                          <option value="93">Afghanistan +93</option>
                          <option value="358">Aland Islands +358</option>
                          <option value="355">Albania +355</option>
                          <option value="213">Algeria +213</option>
                          <option value="1684">American Samoa +1684</option>
                          <option value="376">Andorra +376</option>
                          <option value="244">Angola +244</option>
                          <option value="1264">Anguilla +1264</option>
                          <option value="672">Antarctica +672</option>
                          <option value="1268">
                            Antigua and Barbuda +1268
                          </option>
                          <option value="54">Argentina +54</option>
                          <option value="374">Armenia +374</option>
                          <option value="297">Aruba +297</option>
                          <option value="61">Australia +61</option>
                          <option value="43">Austria +43</option>
                          <option value="994">Azerbaijan +994</option>
                          <option value="1242">Bahamas +1242</option>
                          <option value="973">Bahrain +973</option>
                          <option value="880">Bangladesh +880</option>
                          <option value="1246">Barbados +1246</option>
                          <option value="375">Belarus +375</option>
                          <option value="32">Belgium +32</option>
                          <option value="501">Belize +501</option>
                          <option value="229">Benin +229</option>
                          <option value="1441">Bermuda +1441</option>
                          <option value="975">Bhutan +975</option>
                          <option value="591">Bolivia +591</option>
                          <option value="599">
                            Bonaire, Sint Eustatius and Saba +599
                          </option>
                          <option value="387">
                            Bosnia and Herzegovina +387
                          </option>
                          <option value="267">Botswana +267</option>
                          <option value="55">Bouvet Island +55</option>
                          <option value="55">Brazil +55</option>
                          <option value="246">
                            British Indian Ocean Territory +246
                          </option>
                          <option value="673">Brunei Darussalam +673</option>
                          <option value="359">Bulgaria +359</option>
                          <option value="226">Burkina Faso +226</option>
                          <option value="257">Burundi +257</option>
                          <option value="855">Cambodia +855</option>
                          <option value="237">Cameroon +237</option>
                          <option value="1">Canada +1</option>
                          <option value="238">Cape Verde +238</option>
                          <option value="1345">Cayman Islands +1345</option>
                          <option value="236">
                            Central African Republic +236
                          </option>
                          <option value="235">Chad +235</option>
                          <option value="56">Chile +56</option>
                          <option value="86">China +86</option>
                          <option value="61">Christmas Island +61</option>
                          <option value="672">
                            Cocos (Keeling) Islands +672
                          </option>
                          <option value="57">Colombia +57</option>
                          <option value="269">Comoros +269</option>
                          <option value="242">Congo +242</option>
                          <option value="242">
                            Congo, Democratic Republic of the Congo +242
                          </option>
                          <option value="682">Cook Islands +682</option>
                          <option value="506">Costa Rica +506</option>
                          <option value="225">Cote D'Ivoire +225</option>
                          <option value="385">Croatia +385</option>
                          <option value="53">Cuba +53</option>
                          <option value="599">Curacao +599</option>
                          <option value="357">Cyprus +357</option>
                          <option value="420">Czech Republic +420</option>
                          <option value="45">Denmark +45</option>
                          <option value="253">Djibouti +253</option>
                          <option value="1767">Dominica +1767</option>
                          <option value="1809">Dominican Republic +1809</option>
                          <option value="593">Ecuador +593</option>
                          <option value="20">Egypt +20</option>
                          <option value="503">El Salvador +503</option>
                          <option value="240">Equatorial Guinea +240</option>
                          <option value="291">Eritrea +291</option>
                          <option value="372">Estonia +372</option>
                          <option value="251">Ethiopia +251</option>
                          <option value="500">
                            Falkland Islands (Malvinas) +500
                          </option>
                          <option value="298">Faroe Islands +298</option>
                          <option value="679">Fiji +679</option>
                          <option value="358">Finland +358</option>
                          <option value="33">France +33</option>
                          <option value="594">French Guiana +594</option>
                          <option value="689">French Polynesia +689</option>
                          <option value="262">
                            French Southern Territories +262
                          </option>
                          <option value="241">Gabon +241</option>
                          <option value="220">Gambia +220</option>
                          <option value="995">Georgia +995</option>
                          <option value="49">Germany +49</option>
                          <option value="233">Ghana +233</option>
                          <option value="350">Gibraltar +350</option>
                          <option value="30">Greece +30</option>
                          <option value="299">Greenland +299</option>
                          <option value="1473">Grenada +1473</option>
                          <option value="590">Guadeloupe +590</option>
                          <option value="1671">Guam +1671</option>
                          <option value="502">Guatemala +502</option>
                          <option value="44">Guernsey +44</option>
                          <option value="224">Guinea +224</option>
                          <option value="245">Guinea-Bissau +245</option>
                          <option value="592">Guyana +592</option>
                          <option value="509">Haiti +509</option>
                          <option value="0">
                            Heard Island and Mcdonald Islands +0
                          </option>
                          <option value="39">
                            Holy See (Vatican City State) +39
                          </option>
                          <option value="504">Honduras +504</option>
                          <option value="852">Hong Kong +852</option>
                          <option value="36">Hungary +36</option>
                          <option value="354">Iceland +354</option>
                          <option value="91">India +91</option>
                          <option value="62">Indonesia +62</option>
                          <option value="98">
                            Iran, Islamic Republic of +98
                          </option>
                          <option value="964">Iraq +964</option>
                          <option value="353">Ireland +353</option>
                          <option value="44">Isle of Man +44</option>
                          <option value="972">Israel +972</option>
                          <option value="39">Italy +39</option>
                          <option value="1876">Jamaica +1876</option>
                          <option value="81">Japan +81</option>
                          <option value="44">Jersey +44</option>
                          <option value="962">Jordan +962</option>
                          <option value="7">Kazakhstan +7</option>
                          <option value="254">Kenya +254</option>
                          <option value="686">Kiribati +686</option>
                          <option value="850">
                            Korea, Democratic People's Republic of +850
                          </option>
                          <option value="82">Korea, Republic of +82</option>
                          <option value="381">Kosovo +381</option>
                          <option value="965">Kuwait +965</option>
                          <option value="996">Kyrgyzstan +996</option>
                          <option value="856">
                            Lao People's Democratic Republic +856
                          </option>
                          <option value="371">Latvia +371</option>
                          <option value="961">Lebanon +961</option>
                          <option value="266">Lesotho +266</option>
                          <option value="231">Liberia +231</option>
                          <option value="218">
                            Libyan Arab Jamahiriya +218
                          </option>
                          <option value="423">Liechtenstein +423</option>
                          <option value="370">Lithuania +370</option>
                          <option value="352">Luxembourg +352</option>
                          <option value="853">Macao +853</option>
                          <option value="389">
                            Macedonia, the Former Yugoslav Republic of +389
                          </option>
                          <option value="261">Madagascar +261</option>
                          <option value="265">Malawi +265</option>
                          <option value="60">Malaysia +60</option>
                          <option value="960">Maldives +960</option>
                          <option value="223">Mali +223</option>
                          <option value="356">Malta +356</option>
                          <option value="692">Marshall Islands +692</option>
                          <option value="596">Martinique +596</option>
                          <option value="222">Mauritania +222</option>
                          <option value="230">Mauritius +230</option>
                          <option value="269">Mayotte +269</option>
                          <option value="52">Mexico +52</option>
                          <option value="691">
                            Micronesia, Federated States of +691
                          </option>
                          <option value="373">Moldova, Republic of +373</option>
                          <option value="377">Monaco +377</option>
                          <option value="976">Mongolia +976</option>
                          <option value="382">Montenegro +382</option>
                          <option value="1664">Montserrat +1664</option>
                          <option value="212">Morocco +212</option>
                          <option value="258">Mozambique +258</option>
                          <option value="95">Myanmar +95</option>
                          <option value="264">Namibia +264</option>
                          <option value="674">Nauru +674</option>
                          <option value="977">Nepal +977</option>
                          <option value="31">Netherlands +31</option>
                          <option value="599">Netherlands Antilles +599</option>
                          <option value="687">New Caledonia +687</option>
                          <option value="64">New Zealand +64</option>
                          <option value="505">Nicaragua +505</option>
                          <option value="227">Niger +227</option>
                          <option value="234">Nigeria +234</option>
                          <option value="683">Niue +683</option>
                          <option value="672">Norfolk Island +672</option>
                          <option value="1670">
                            Northern Mariana Islands +1670
                          </option>
                          <option value="47">Norway +47</option>
                          <option value="968">Oman +968</option>
                          <option value="92">Pakistan +92</option>
                          <option value="680">Palau +680</option>
                          <option value="970">
                            Palestinian Territory, Occupied +970
                          </option>
                          <option value="507">Panama +507</option>
                          <option value="675">Papua New Guinea +675</option>
                          <option value="595">Paraguay +595</option>
                          <option value="51">Peru +51</option>
                          <option value="63">Philippines +63</option>
                          <option value="64">Pitcairn +64</option>
                          <option value="48">Poland +48</option>
                          <option value="351">Portugal +351</option>
                          <option value="1787">Puerto Rico +1787</option>
                          <option value="974">Qatar +974</option>
                          <option value="262">Reunion +262</option>
                          <option value="40">Romania +40</option>
                          <option value="70">Russian Federation +70</option>
                          <option value="250">Rwanda +250</option>
                          <option value="590">Saint Barthelemy +590</option>
                          <option value="290">Saint Helena +290</option>
                          <option value="1869">
                            Saint Kitts and Nevis +1869
                          </option>
                          <option value="1758">Saint Lucia +1758</option>
                          <option value="590">Saint Martin +590</option>
                          <option value="508">
                            Saint Pierre and Miquelon +508
                          </option>
                          <option value="1784">
                            Saint Vincent and the Grenadines +1784
                          </option>
                          <option value="684">Samoa +684</option>
                          <option value="378">San Marino +378</option>
                          <option value="239">
                            Sao Tome and Principe +239
                          </option>
                          <option value="966">Saudi Arabia +966</option>
                          <option value="221">Senegal +221</option>
                          <option value="381">Serbia +381</option>
                          <option value="381">
                            Serbia and Montenegro +381
                          </option>
                          <option value="248">Seychelles +248</option>
                          <option value="232">Sierra Leone +232</option>
                          <option value="65">Singapore +65</option>
                          <option value="1">Sint Maarten +1</option>
                          <option value="421">Slovakia +421</option>
                          <option value="386">Slovenia +386</option>
                          <option value="677">Solomon Islands +677</option>
                          <option value="252">Somalia +252</option>
                          <option value="27">South Africa +27</option>
                          <option value="500">
                            South Georgia and the South Sandwich Islands +500
                          </option>
                          <option value="211">South Sudan +211</option>
                          <option value="34">Spain +34</option>
                          <option value="94">Sri Lanka +94</option>
                          <option value="249">Sudan +249</option>
                          <option value="597">Suriname +597</option>
                          <option value="47">Svalbard and Jan Mayen +47</option>
                          <option value="268">Swaziland +268</option>
                          <option value="46">Sweden +46</option>
                          <option value="41">Switzerland +41</option>
                          <option value="963">Syrian Arab Republic +963</option>
                          <option value="886">
                            Taiwan, Province of China +886
                          </option>
                          <option value="992">Tajikistan +992</option>
                          <option value="255">
                            Tanzania, United Republic of +255
                          </option>
                          <option value="66">Thailand +66</option>
                          <option value="670">Timor-Leste +670</option>
                          <option value="228">Togo +228</option>
                          <option value="690">Tokelau +690</option>
                          <option value="676">Tonga +676</option>
                          <option value="1868">
                            Trinidad and Tobago +1868
                          </option>
                          <option value="216">Tunisia +216</option>
                          <option value="90">Turkey +90</option>
                          <option value="7370">Turkmenistan +7370</option>
                          <option value="1649">
                            Turks and Caicos Islands +1649
                          </option>
                          <option value="688">Tuvalu +688</option>
                          <option value="256">Uganda +256</option>
                          <option value="380">Ukraine +380</option>
                          <option value="971">United Arab Emirates +971</option>
                          <option value="44">United Kingdom +44</option>
                          <option value="1">United States +1</option>
                          <option value="1">
                            United States Minor Outlying Islands +1
                          </option>
                          <option value="598">Uruguay +598</option>
                          <option value="998">Uzbekistan +998</option>
                          <option value="678">Vanuatu +678</option>
                          <option value="58">Venezuela +58</option>
                          <option value="84">Viet Nam +84</option>
                          <option value="1284">
                            Virgin Islands, British +1284
                          </option>
                          <option value="1340">
                            Virgin Islands, U.s. +1340
                          </option>
                          <option value="681">Wallis and Futuna +681</option>
                          <option value="212">Western Sahara +212</option>
                          <option value="967">Yemen +967</option>
                          <option value="260">Zambia +260</option>
                          <option value="263">Zimbabwe +263</option>
                        </TomSelect>
                      </div>
                      <input
                        id="input-wizard-4"
                        oninput="javascript: if (this.value.length > 9) this.value = this.value.slice(0, 9);"
                        type="number"
                        class="form-control"
                        placeholder="phone"
                        v-model="home_phone_number"
                        maxlength="9"
                      />
                    </div>
                  </div>

                  <!-- N.O.K Fullname -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label
                      for="input-wizard-1"
                      class="form-label text-theme-36"
                    >
                      <p>
                        {{ $t('translation.next_of_kin_information_text') }}
                      </p>
                    </label>
                    <br />
                    <label for="input-wizard-1" class="form-label">
                      <p class="font-medium text-bold">
                        {{ $t('translation.next_of_kin_full_name_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter next of kin name"
                      name="city"
                      v-model="nok_name"
                    />
                    <template v-if="validate.nok_name.$error">
                      <div
                        v-for="(error, index) in validate.nok_name.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                  <!-- N.O.K Fullname -->
                  <div
                    class="intro-y col-span-12 sm:col-span-6 md:pt-7 lg:pt-7"
                  >
                    <label for="input-wizard-1" class="form-label">
                      <p class="font-medium text-bold">
                        {{ $t('translation.next_of_kin_email_address_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter next of kin email"
                      name="nok_email"
                      v-model="nok_email"
                    />
                    <template v-if="validate.nok_email.$error">
                      <div
                        v-for="(error, index) in validate.nok_email.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>

                  <!-- nok phone number-->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      <p class="font-medium text-bold">
                        {{ $t('translation.next_of_kin_phone_number_text') }}
                      </p>
                    </label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter nok phone number"
                      name="nok_phone_number"
                      v-model="nok_phone_number"
                    />
                    <template v-if="validate.nok_phone_number.$error">
                      <div
                        v-for="(error, index) in validate.nok_phone_number
                          .$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>
                <div>
                  <label
                    for="input-wizard-1"
                    class="form-label text-theme-36 pt-5"
                    style="display: none"
                    >{{ $t('translation.family_information_text') }}</label
                  >
                </div>
                <div
                  class="grid grid-cols-12 gap-4 gap-y-5"
                  style="display: none"
                >
                  <!-- Family Fullname -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">
                      {{ $t('translation.family_text') }}</label
                    >
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter family name"
                      name="city"
                      v-model="fm_name"
                    />
                    <template v-if="validate.fm_name.$error">
                      <div
                        v-for="(error, index) in validate.fm_name.$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>

                  <!-- Family phone -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label">{{
                      $t('translation.family_phone_text')
                    }}</label>
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter family phone"
                      name="city"
                      v-model="fm_phone_number"
                    />
                    <template v-if="validate.fm_phone_number.$error">
                      <div
                        v-for="(error, index) in validate.fm_phone_number
                          .$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>

                  <!-- Family Relationship -->
                  <div class="intro-y col-span-12 sm:col-span-6">
                    <label for="input-wizard-1" class="form-label"
                      >Family Relationship</label
                    >
                    <input
                      id="input-wizard-1"
                      type="text"
                      class="form-control"
                      placeholder="Enter family relationship"
                      name="city"
                      v-model="fm_relationship"
                    />
                    <template v-if="validate.fm_relationship.$error">
                      <div
                        v-for="(error, index) in validate.fm_relationship
                          .$errors"
                        :key="index"
                        class="text-theme-6 mt-2"
                      >
                        {{ error.$message }}
                      </div>
                    </template>
                  </div>
                </div>
                <div
                  class="container mx-auto justify-center mt-4"
                  style="display: flex; align-items: center; text-align: center"
                >
                  <div
                    class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                  >
                    <button
                      type="reset"
                      data-dismiss="modal"
                      class="btn closeBTN btn-danger w-40 mr-auto"
                    >
                      {{ $t('translation.cancel_text') }}
                    </button>

                    <button
                      type="reset"
                      class="btn clearBTN btn-warning w-40 mr-auto"
                      style="display: none"
                    >
                      {{ $t('translation.clear_text') }}
                    </button>
                    <button
                      type="submit"
                      class="btn bg-theme-32 w-40 mr-auto text-white"
                    >
                      <LoadingIcon
                        v-if="loading"
                        icon="spinning-circles"
                        color="white"
                        class="w-4 h-4 ml-2"
                      />
                      <span v-else> {{ $t('translation.update_text') }}</span>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <!-- END: Display Information -->
        </div>
      </div>
    </div>
    <!-- notifications -->
    <div
      id="failedbio-notification-content"
      class="toastify-content hidden flex"
    >
      <XCircleIcon class="text-theme-6" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ messagefail }}</div>
        <div class="text-gray-600 mt-1">
          <!-- update_failed_text -->
          {{ $t('translation.update_failed_text') }},
          {{ $t('translation.please_check_the_filled_form_text') }}Please check
          the filled form.
        </div>
      </div>
    </div>
    <div id="failed-notification-content1" class="toastify-content hidden flex">
      <XCircleIcon class="text-theme-6" />
      <div class="ml-4 mr-4">
        <div class="font-medium">{{ messagefail }}</div>
        <div class="text-gray-600 mt-1">
          {{ $t('translation.failed_text') }} ,{{
            $t('translation.please_check_the_filled_form_text')
          }}.
        </div>
      </div>
    </div>
    <div
      id="successbio-notification-content"
      class="toastify-content hidden flex"
    >
      <CheckCircleIcon class="text-theme-9" />
      <div class="ml-4 mr-4">
        <div class="font-medium">
          {{
            $t(
              'translation.your_profile_information_has_been_successfully_updated'
            )
          }}
        </div>
      </div>
    </div>
  </div>

  <!-- <button @click="registrationForm">
    sendData
  </button>-->
</template>

<script>
import { defineComponent, toRaw, reactive, toRefs, inject } from 'vue'
import axios from 'axios'
import Toastify from 'toastify-js'
import { Field } from 'vee-validate'
import moment from 'moment'

// Validations
import { required, minLength } from '@vuelidate/validators'
import { useVuelidate } from '@vuelidate/core'
import router from '../../router'
import $ from 'cash-dom'
import DataForm from '../register/components/PatientBiographyUpdate.vue'
export default defineComponent({
  components: {
    Field,
    DataForm
  },
  data() {
    const formData = reactive({
      first_name: '',
      last_name: '',
      email: '',
      patient_phone: '',
      home_address: '',
      birth_date: '',
      gender: '',
      home_phone: '',
      country: '',
      nationality: '',
      postalcode: '',
      nok_name: '',
      nok_email: '',
      nok_phone_number: '',
      fm_name: '',
      fm_phone_number: '',
      fm_relationship: ''
    })
    const rules = {
      first_name: {
        required,
        minLength: minLength(2)
      },
      middle_name: {},
      last_name: {
        required,
        minLength: minLength(2)
      },
      home_address: {
    
       
      },
      email: {
        required,
        minLength: minLength(2)
      },
      patient_phone: { required, minLength: minLength(2) },
      birth_date: { required, minLength: minLength(2) },
      gender: {},
      maritalStatus: {},
      home_phone: {},
      country: {},
      nationality: {},
      postalcode: {},
      street: {},
      state: {},
      city: {},
      occupation: {},
      nok_name: {},
      nok_email: {},
      nok_phone_number: {},
      fm_name: {},
      fm_phone_number: {},
      fm_relationship: {}
    }
    const validate = useVuelidate(rules, toRefs(formData))

    const updateProfile = () => {
      validate.value.$touch()
      if (validate.value.$invalid) {
        Toastify({
          node: $('#failedbio-notification-content')
            .clone()
            .removeClass('hidden')[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: 'top',
          position: 'right',
          stopOnFocus: true
        }).showToast()
      } else {
        const token = localStorage.getItem('token')
        this.loading = true
        // We will handle form submission here
        const data = new FormData()
        data.append('first_name', this.formData.first_name)
        data.append('last_name', this.formData.last_name)
         
        data.append('birth_date', this.formData.birth_date)
        data.append('home_address', this.home_address )
        data.append('patient_phone', this.formData.patient_phone)
        data.append('gender', this.gender)
        data.append('marital_status', this.maritalStatus)
        data.append('nok_name', this.nok_name)
        data.append('nok_email', this.nok_email)

        data.append('nok_phone_number', this.nok_phone_number)
        data.append('fm_name', this.fm_name)
        data.append('fm_relationship', this.fm_relationship)
        data.append('fm_phone_number', this.fm_phone_number)
        data.append('home_phone', this.home_phone_code + this.home_phone_number)
        data.append('nationality', this.nationality)
        data.append('country', this.country)
        data.append('postalcode', this.postalcode)
        data.append('street', this.street)

        data.append('state', this.state)
        data.append('city', this.city)
        data.append(' occupation', this.occupation)

        console.log('new joined number' + this.home_phone_code)

        // We will handle form submission here

        axios
          // .post(
          //   'http://localhost/mfi-v2/public/client/profileUpdate/' +
          .post(
            // "/profileUpdate/" + this.$store.state.auth.user.id,
            'patients/auth/update_info',
            data,

            {
              headers: {
                Authorization: 'Bearer ' + token,

                'Content-Type': 'multipart/form-data',
                'X-Requested-With': 'XMLHttpRequest'
              }
            }
          )
          .then((response) => {
            const data = response.payload
            const notification = document.querySelector(
              '.toastify-content .notification-message'
            )

            console.log(
              'my status, message, payload',
              response.data.status,
              response.data.message,
              response.data.payload
            )
            if (response.data.status == true) {
              const data = response.data.payload
              this.loading = false
              this.messagefails = response.data.message

              console.log('Profile Profile Information Successfully Updated')
              Toastify({
                node: $('#successbio-notification-content')
                  .clone()
                  .removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
              }).showToast()
              // this.$router.go('/dashboard/profile')
              this.$store.commit('auth/update', { user: data, isUpdate: true })
              router.push({
                name: 'side-menu-profile-overview'
              })
              document.querySelector('.closeBTN').click()
              //     this.$router.go({
              //   name: "side-menu-profile-overview",
              // });
            } else {
              this.loading = false
              this.messagesuccesss = response.data.message
              console.log('Profile Profile Information Failed to Update')
              Toastify({
                node: $('#failedbio-notification-content')
                  .clone()
                  .removeClass('hidden')[0],
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: 'top',
                position: 'right',
                stopOnFocus: true
              }).showToast()
            }
            this.basicNonStickyNotificationToggle()
            console.log('response', response)

            return response.data.user_data
          })
          .then((data) => {
            this.uploadFile = null
            // Commiting to the updates to the store
            // this.$store.commit("auth/update", { user: data, isUpdate: true });
          })
          .catch((error) => {
            console.log('Error', error)
          })
      }
    }

    // Basic non sticky notification
    const basicNonStickyNotificationToggle = () => {
      Toastify({
        node: $('#basic-non-sticky-notification-content1')
          .clone()
          .removeClass('hidden')[0],
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'right',
        stopOnFocus: true
      }).showToast()
    }

    return {
      basicNonStickyNotificationToggle,
      loading: false,
      formData,
      translations: '',
      validate,
      updateProfile,
      photo: '',
      files: '',
      uploadFile: null,
      selectedCountry: '168',
      listCountry: [],
      onchange,
      messagefail: '',
      messagesuccess: '',
      messagefails: '',
      messagesuccesss: '',
      home_phone_code: '31',
      country: '',
      gender: '',
      maritalStatus: '',
      nok_name: '',
      nok_email: '',
      nok_phone_number: '',
      fm_name: '',
      fm_relationship: '',
      fm_phone_number: '',
      nationality: 'dutch',
      street: '',
      state: '',
      city: '',
      occupation: '',
      postalcode: '',
      home_address: '',
      myCurrentUser:''
    }
  },
  computed: {
    userId() {
      return toRaw(this.$store.state.auth.user.id)
    },
    user: function () {
      // console.log(this.user)
      console.log(toRaw(this.$store.state.auth.user.id))
      return toRaw(this.$store.state.auth.user)
    },
    currentUser() {
      this.setUpdateEmail(this.$store.state.auth.user.email)
      // console.log(toRaw(this.$store.state.auth.user.data.user))
      this.setCurrentUser(toRaw(this.$store.state.auth.user))
      this.nationality = this.$store.state.auth.user.nationality
        ? this.$store.state.auth.user.nationality
        : 'dutch'
      this.country = this.$store.state.auth.user.country
        ? this.$store.state.auth.user.country
        : 'Netherlands'
      this.maritalStatus = this.$store.state.auth.user.marital_status
        ? this.$store.state.auth.user.marital_status
        : 'single'
      this.nok_name = this.$store.state.auth.user.nok_name

      this.nok_email = this.$store.state.auth.user.nok_email
      this.nok_phone_number = this.$store.state.auth.user.nok_phone_number
      this.fm_name = this.$store.state.auth.user.fm_name
      this.fm_phone_number = this.$store.state.auth.user.fm_phone_number
      this.fm_relationship = this.$store.state.auth.user.fm_relationship
      const returned_phone_number = this.$store.state.auth.user.home_phone
      // this.home_phone_code = returned_phone_number?.slice(0, 3)
      this.home_phone_code = this.$store.state.auth.user.home_phone
        ? returned_phone_number?.slice(0, -9)
        : '31'
      this.home_phone_number = returned_phone_number?.slice(-9)
      // this.home_phone_number = returned_phone_number?.slice(3)
      this.postalcode = this.$store.state.auth.user.postalcode
      this.state = this.$store.state.auth.user.state
      this.city = this.$store.state.auth.user.city
      this.street = this.$store.state.auth.user.street
      this.occupation = this.$store.state.auth.user.occupation
      this.gender = this.$store.state.auth.user.gender
      this.home_address = this.$store.state.auth.user.home_address
      
      // console.log('home_phone_code , home_phone_number', this.home_phone_code, this.home_phone_number)

      return toRaw(this.$store.state.auth.user)
    }
  },
  watch: {},
  setup() {
    const translations = inject('translation_v3')
    return {
      translations
    }
  },
  methods: {
    moment,
    setUpdateEmail(email) {
      this.email = email
    },
    getTranslations() {
      this.translations = JSON.parse(localStorage.getItem('translations'))
      console.log('my new profile update translations', this.translations)
    },
    setNotificationMessage(message) {
      this.notificationMessage = message
    },
    setCurrentUser(data) {
      console.log({ CurrentData: data })
      if (data) {
        if (data.country_code === null) {
          data.country_code = '+63'
        }
        if (data.country_id === null) {
          data.country_id = '168'
        }
        if (data.middle_name === null) {
          data.middle_name = ''
        }

        Object.assign(this.formData, data)
      }
    },

    // Profile Photo Upload
    handlePhotoUpload() {
      this.image = event.target.files[0]
      this.uploadFile = URL.createObjectURL(this.image)
    },
    // handleFrontIDUpload() {
    //   this.id = event.target.files[0]
    // }
    getCountry() {
      const token = localStorage.getItem('token')
      axios
        .get('/get-countries', {
          headers: {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'multipart/form-data',
            'X-Requested-With': 'XMLHttpRequest'
          }
        })
        .then((res) => {
          this.listCountry = res.data.data
          console.log('Country', this.selectedCountry)
        })
    },
    onchange() {
      console.log('selected nationality', this.nationality)
    }
  },
  created() {
    this.getTranslations()
  },
  mounted() {
    this.getTranslations()
  }
})
</script>
