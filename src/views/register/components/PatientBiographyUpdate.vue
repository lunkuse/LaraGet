<template>
  <div class="p-3 box">
    <div
              v-if="message"
              class="alert alert-outline-danger show flex items-center mb-2 mt-2"
              role="alert"
            >
             {{ message }}
            </div>
    <Form
      @submit="handleRegister"
      :validation-schema="schema"
      autocomplete="off"
      class="m-h-screen"
      :initial-values="formValues"
    >
      <input autocomplete="false" name="hidden" type="text" class="hidden" />
      <!-- <div class="grid grid-cols-1 lg:grid-cols-4 gap-4 2xl:gap-6">  -->

      <div
        class="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-2"
      >
        <div
          class="flex flex-col"
          v-for="element in formElements"
          :key="element.id"
        >
          <label class="createFormLabel" for=""
            >{{ element.label }}
            <span v-if="element.required" class="text-theme-43">*</span></label
          >
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            :name="element.name"
            :type="element.type"
            :placeholder="element.placeholder"
            disabled
          />
          <ErrorMessage
            style="font-size: 13px"
            class="text-theme-6"
            :name="element.name"
          />
        </div>
        <!-- gender -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.gender") }}
            <span class="text-theme-43">*</span></label
          >

          <TomSelect
            class="w-auto col-span-1 focus:border-theme-36"
            id="gender"
            name="gender"
            :placeholder="`${$t('translation.select_gender_text')}`"
            v-model="gender"
          >
            <option value="Male">
              {{ $t("translation.male_text") }}
            </option>
            <option value="Female">
              {{ $t("translation.female_text") }}
            </option>
            <option value="Uknown">
              {{ $t("translation.unknown_text") }}
            </option>
          </TomSelect>
          <ErrorMessage
            name="gender"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- dob -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.dateOfBirth") }}
            <span class="text-theme-43">*</span></label
          >

          <div class="flex w-full">
            <Litepicker
            disabled
              v-model="birthDate"
              placeholder="Date of birth*"
              name="birthDate"
              :options="{
                lang: lang,
                autoApply: true,
                showWeekNumbers: true,
                dropdowns: {
                  minYear: 1960,
                  maxYear: null,
                  months: true,
                  years: true,
                },
              }"
              class="w-full intro-x form-control py-3 px-4 block border-gray-200 focus:border-theme-36"
              style="box-shadow: 0px 3px 5px #00000007"
            />
          </div>
          <ErrorMessage class="createFormError" name="birthDate" />
        </div>

        <!--    place of birth-->
        <div class="flex flex-col">
          <label for="" class="createFormLabel">
            {{ t("translation.forms.placeOfBirth") }}
            <span class="text-theme-43">*</span></label
          >
          <div class="flex space-x-6 items-end">
            <Field
              class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
              name="placeOfBirth"
              type="text"
              :placeholder="t('translation.forms.placeOfBirth')"
            />
          </div>
          <ErrorMessage
            name="placeOfBirth"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- handicap -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.handicap_text") }}
            <span class="text-theme-43">*</span>
            <!-- <i
          class="fa fa-wheelchair text-yellow-650 font-semibold !h-2 !w-2 mx-1"
          aria-hidden="true"
        ></i> -->
          </label>
          <div class="flex space-x-6 items-end h-10">
            <label
              v-for="element in disabledFormElements"
              :key="element.id"
              for=""
              class="createFormCheckLabel"
              >{{ element.label }}
              <Field
                class="ml-1 h-4 w-4"
                :name="element.name"
                :type="element.type"
                :placeholder="element.placeholder"
                :value="element.value"
              />
            </label>
          </div>

          <ErrorMessage
            name="is_disabled"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- telephone phone -->
        <div class="flex flex-col">
          <label for="patientPhone" class="createFormLabel"
            >{{ t("translation.telephoneNumber")
            }}<span class="text-theme-43">*</span>
          </label>
          <!-- telephone phone -->
          <div
            class="input-group p-0 grid grid-flow-col grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid grid-cols-[50%_50%]"
          >
            <!-- v-model="phoneCountryCode.countryCode" -->
            <TomSelect
              class="w-auto col-span-1 focus:border-theme-36"
              as="select"
              name="country"
              id="country"
              v-model="TelephoneCode"
              @change="changeTelephoneCode"
            >
              <option value="93">Afghanistan +93</option>
              <option value="358">Aland Islands +358</option>
              <option value="355">Albania +355</option>
              <option value="213">Algeria +213</option>
              <option value="1684">American Samoa +1684</option>
              <option value="376">Andorra +376</option>
              <option value="244">Angola +244</option>
              <option value="1264">Anguilla +1264</option>
              <option value="672">Antarctica +672</option>
              <option value="1268">Antigua and Barbuda +1268</option>
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
              <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
              <option value="387">Bosnia and Herzegovina +387</option>
              <option value="267">Botswana +267</option>
              <option value="55">Bouvet Island +55</option>
              <option value="55">Brazil +55</option>
              <option value="246">British Indian Ocean Territory +246</option>
              <option value="673">Brunei Darussalam +673</option>
              <option value="359">Bulgaria +359</option>
              <option value="226">Burkina Faso +226</option>
              <option value="257">Burundi +257</option>
              <option value="855">Cambodia +855</option>
              <option value="237">Cameroon +237</option>
              <option value="1">Canada +1</option>
              <option value="238">Cape Verde +238</option>
              <option value="1345">Cayman Islands +1345</option>
              <option value="236">Central African Republic +236</option>
              <option value="235">Chad +235</option>
              <option value="56">Chile +56</option>
              <option value="86">China +86</option>
              <option value="61">Christmas Island +61</option>
              <option value="672">Cocos (Keeling) Islands +672</option>
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
              <option value="500">Falkland Islands (Malvinas) +500</option>
              <option value="298">Faroe Islands +298</option>
              <option value="679">Fiji +679</option>
              <option value="358">Finland +358</option>
              <option value="33">France +33</option>
              <option value="594">French Guiana +594</option>
              <option value="689">French Polynesia +689</option>
              <option value="262">French Southern Territories +262</option>
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
              <option value="0">Heard Island and Mcdonald Islands +0</option>
              <option value="39">Holy See (Vatican City State) +39</option>
              <option value="504">Honduras +504</option>
              <option value="852">Hong Kong +852</option>
              <option value="36">Hungary +36</option>
              <option value="354">Iceland +354</option>
              <option value="91">India +91</option>
              <option value="62">Indonesia +62</option>
              <option value="98">Iran, Islamic Republic of +98</option>
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
              <option value="856">Lao People's Democratic Republic +856</option>
              <option value="371">Latvia +371</option>
              <option value="961">Lebanon +961</option>
              <option value="266">Lesotho +266</option>
              <option value="231">Liberia +231</option>
              <option value="218">Libyan Arab Jamahiriya +218</option>
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
              <option value="691">Micronesia, Federated States of +691</option>
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
              <option value="1670">Northern Mariana Islands +1670</option>
              <option value="47">Norway +47</option>
              <option value="968">Oman +968</option>
              <option value="92">Pakistan +92</option>
              <option value="680">Palau +680</option>
              <option value="970">Palestinian Territory, Occupied +970</option>
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
              <option value="1869">Saint Kitts and Nevis +1869</option>
              <option value="1758">Saint Lucia +1758</option>
              <option value="590">Saint Martin +590</option>
              <option value="508">Saint Pierre and Miquelon +508</option>
              <option value="1784">
                Saint Vincent and the Grenadines +1784
              </option>
              <option value="684">Samoa +684</option>
              <option value="378">San Marino +378</option>
              <option value="239">Sao Tome and Principe +239</option>
              <option value="966">Saudi Arabia +966</option>
              <option value="221">Senegal +221</option>
              <option value="381">Serbia +381</option>
              <option value="381">Serbia and Montenegro +381</option>
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
              <option value="886">Taiwan, Province of China +886</option>
              <option value="992">Tajikistan +992</option>
              <option value="255">Tanzania, United Republic of +255</option>
              <option value="66">Thailand +66</option>
              <option value="670">Timor-Leste +670</option>
              <option value="228">Togo +228</option>
              <option value="690">Tokelau +690</option>
              <option value="676">Tonga +676</option>
              <option value="1868">Trinidad and Tobago +1868</option>
              <option value="216">Tunisia +216</option>
              <option value="90">Turkey +90</option>
              <option value="7370">Turkmenistan +7370</option>
              <option value="1649">Turks and Caicos Islands +1649</option>
              <option value="688">Tuvalu +688</option>
              <option value="256">Uganda +256</option>
              <option value="380">Ukraine +380</option>
              <option value="971">United Arab Emirates +971</option>
              <option value="44">United Kingdom +44</option>
              <option value="1">United States +1</option>
              <option value="1">United States Minor Outlying Islands +1</option>
              <option value="598">Uruguay +598</option>
              <option value="998">Uzbekistan +998</option>
              <option value="678">Vanuatu +678</option>
              <option value="58">Venezuela +58</option>
              <option value="84">Viet Nam +84</option>
              <option value="1284">Virgin Islands, British +1284</option>
              <option value="1340">Virgin Islands, U.s. +1340</option>
              <option value="681">Wallis and Futuna +681</option>
              <option value="212">Western Sahara +212</option>
              <option value="967">Yemen +967</option>
              <option value="260">Zambia +260</option>
              <option value="263">Zimbabwe +263</option>
            </TomSelect>

            <Field
              value=""
              type="text"
              name="home_phone"
              class="intro-x login__input form-control border-gray-200 focus:border-theme-36 block col-span-3"
             
              v-model="formValues.home_phone"
            />
          </div>

          <ErrorMessage
            name="telephoneNumber"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- mobile phone -->
        <div class="flex flex-col">
          <label for="patientPhone" class="createFormLabel"
            >{{ t("translation.mobile_number_text")
            }}<span class="text-theme-43">*</span>
          </label>
          <!-- mobile number -->
          <div
            class="input-group p-0 grid grid-flow-col grid-cols-1 md:grid-cols-1 sm:grid-cols-1 lg:grid grid-cols-[50%_50%]"
          >
            <TomSelect
              class="w-auto col-span-1 focus:border-theme-36"
              as="select"
              name="country"
              id="country"
              v-model="MobileCode"
              @change="changePhoneCode"
            >
              <option value="93">Afghanistan +93</option>
              <option value="358">Aland Islands +358</option>
              <option value="355">Albania +355</option>
              <option value="213">Algeria +213</option>
              <option value="1684">American Samoa +1684</option>
              <option value="376">Andorra +376</option>
              <option value="244">Angola +244</option>
              <option value="1264">Anguilla +1264</option>
              <option value="672">Antarctica +672</option>
              <option value="1268">Antigua and Barbuda +1268</option>
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
              <option value="599">Bonaire, Sint Eustatius and Saba +599</option>
              <option value="387">Bosnia and Herzegovina +387</option>
              <option value="267">Botswana +267</option>
              <option value="55">Bouvet Island +55</option>
              <option value="55">Brazil +55</option>
              <option value="246">British Indian Ocean Territory +246</option>
              <option value="673">Brunei Darussalam +673</option>
              <option value="359">Bulgaria +359</option>
              <option value="226">Burkina Faso +226</option>
              <option value="257">Burundi +257</option>
              <option value="855">Cambodia +855</option>
              <option value="237">Cameroon +237</option>
              <option value="1">Canada +1</option>
              <option value="238">Cape Verde +238</option>
              <option value="1345">Cayman Islands +1345</option>
              <option value="236">Central African Republic +236</option>
              <option value="235">Chad +235</option>
              <option value="56">Chile +56</option>
              <option value="86">China +86</option>
              <option value="61">Christmas Island +61</option>
              <option value="672">Cocos (Keeling) Islands +672</option>
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
              <option value="500">Falkland Islands (Malvinas) +500</option>
              <option value="298">Faroe Islands +298</option>
              <option value="679">Fiji +679</option>
              <option value="358">Finland +358</option>
              <option value="33">France +33</option>
              <option value="594">French Guiana +594</option>
              <option value="689">French Polynesia +689</option>
              <option value="262">French Southern Territories +262</option>
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
              <option value="0">Heard Island and Mcdonald Islands +0</option>
              <option value="39">Holy See (Vatican City State) +39</option>
              <option value="504">Honduras +504</option>
              <option value="852">Hong Kong +852</option>
              <option value="36">Hungary +36</option>
              <option value="354">Iceland +354</option>
              <option value="91">India +91</option>
              <option value="62">Indonesia +62</option>
              <option value="98">Iran, Islamic Republic of +98</option>
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
              <option value="856">Lao People's Democratic Republic +856</option>
              <option value="371">Latvia +371</option>
              <option value="961">Lebanon +961</option>
              <option value="266">Lesotho +266</option>
              <option value="231">Liberia +231</option>
              <option value="218">Libyan Arab Jamahiriya +218</option>
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
              <option value="691">Micronesia, Federated States of +691</option>
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
              <option value="1670">Northern Mariana Islands +1670</option>
              <option value="47">Norway +47</option>
              <option value="968">Oman +968</option>
              <option value="92">Pakistan +92</option>
              <option value="680">Palau +680</option>
              <option value="970">Palestinian Territory, Occupied +970</option>
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
              <option value="1869">Saint Kitts and Nevis +1869</option>
              <option value="1758">Saint Lucia +1758</option>
              <option value="590">Saint Martin +590</option>
              <option value="508">Saint Pierre and Miquelon +508</option>
              <option value="1784">
                Saint Vincent and the Grenadines +1784
              </option>
              <option value="684">Samoa +684</option>
              <option value="378">San Marino +378</option>
              <option value="239">Sao Tome and Principe +239</option>
              <option value="966">Saudi Arabia +966</option>
              <option value="221">Senegal +221</option>
              <option value="381">Serbia +381</option>
              <option value="381">Serbia and Montenegro +381</option>
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
              <option value="886">Taiwan, Province of China +886</option>
              <option value="992">Tajikistan +992</option>
              <option value="255">Tanzania, United Republic of +255</option>
              <option value="66">Thailand +66</option>
              <option value="670">Timor-Leste +670</option>
              <option value="228">Togo +228</option>
              <option value="690">Tokelau +690</option>
              <option value="676">Tonga +676</option>
              <option value="1868">Trinidad and Tobago +1868</option>
              <option value="216">Tunisia +216</option>
              <option value="90">Turkey +90</option>
              <option value="7370">Turkmenistan +7370</option>
              <option value="1649">Turks and Caicos Islands +1649</option>
              <option value="688">Tuvalu +688</option>
              <option value="256">Uganda +256</option>
              <option value="380">Ukraine +380</option>
              <option value="971">United Arab Emirates +971</option>
              <option value="44">United Kingdom +44</option>
              <option value="1">United States +1</option>
              <option value="1">United States Minor Outlying Islands +1</option>
              <option value="598">Uruguay +598</option>
              <option value="998">Uzbekistan +998</option>
              <option value="678">Vanuatu +678</option>
              <option value="58">Venezuela +58</option>
              <option value="84">Viet Nam +84</option>
              <option value="1284">Virgin Islands, British +1284</option>
              <option value="1340">Virgin Islands, U.s. +1340</option>
              <option value="681">Wallis and Futuna +681</option>
              <option value="212">Western Sahara +212</option>
              <option value="967">Yemen +967</option>
              <option value="260">Zambia +260</option>
              <option value="263">Zimbabwe +263</option>
            </TomSelect>

            <Field
              type="text"
              name="patient_phone"
              class="intro-x login__input form-control border-gray-200 focus:border-theme-36 block col-span-3"
              v-model="formValues.patient_phone"
            />
          </div>

          <ErrorMessage
            name="mobileNumber"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- bsn -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.bsn_text") }}
          </label>
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            name="BSN"
            type="number"
            min="0"
            :placeholder="t('translation.bsn_text')"
          />
          <ErrorMessage
            name="BSN"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- ***   document validation *** -->
        <!--    document type-->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.documentType") }}
            <span class="text-theme-43">*</span></label
          >
          <div class="flex w-full space-x-6 items-end h-10">
            <TomSelect
            
              class="w-full col-span-1 focus:border-theme-36"
              id="document_type"
              :placeholder="`${$t('translation.forms.documentType')}`"
              v-model="formValues.documentType"
            >
              <option value="National Identity Card">
                {{ $t("translation.forms.nationalIdentityCard") }}
              </option>
              <option value="Passport">
                {{ $t("translation.forms.passport") }}
              </option>
              <option value="Driver's License">
                {{ $t("translation.forms.driversLicense") }}
              </option>
              <option value="Residence Permit">
                {{ $t("translation.forms.residencePermit") }}
              </option>
            </TomSelect>
          </div>
          <ErrorMessage class="createFormError" name="documentType" />
        </div>
        <!--    document number-->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.documentNumber") }}
            <span class="text-theme-43">*</span></label
          >
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            name="documentNumber"
            type="text"
            min="0"
            :placeholder="t('translation.forms.documentNumber')"
           
            v-model="formValues.documentNumber"
          />
          <ErrorMessage name="documentNumber" class="text-theme-6" />
        </div>

        <!-- ***   document validation *** -->

        <!-- email -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ $t("translation.email_text") }}
          </label>
          <Field
            type="email"
            name="email"
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="email"
            :placeholder="`${$t('translation.email_text')}`"
            disabled
          />

          <ErrorMessage
            name="email"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- postal code, house number, street -->
        <div
          class="flex flex-col"
          v-for="element in addressformElements"
          :key="element.id"
        >
          <label class="createFormLabel" for=""
            >{{ element.label }}

            <span v-if="element.required" class="text-theme-43">*</span>
          </label>
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            :name="element.name"
            :type="element.type"
            :placeholder="element.placeholder"
            :v-model="element.vmodel"
            @blur.passive="getHomeDetails(element.name, $event)"
          />

          <ErrorMessage
            :name="element.name"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- street -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.streetAddress") }}

            <span class="text-theme-43">*</span>
          </label>
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            name="street"
            type="text"
            :placeholder="`${$t('translation.forms.streetAddress')}`"
            v-model="formValues.street"
            @blur.passive="getHomeDetails(street, $event)"
          />

          <ErrorMessage
            :name="street"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
        <!-- province if not passant -->

        <div class="flex flex-col">
          <label class="createFormLabel" for="">{{
            t("translation.forms.province")
          }}</label>
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            v-model="province"
            name="province"
            type="text"
            :placeholder="t('translation.forms.province')"
          />

          <ErrorMessage
            name="province"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

        <!-- country  -->
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.country") }}
            <span class="text-theme-43">*</span></label
          >
          <div class="flex space-x-6 items-end h-10">
            <Field
              class="form-control border-gray-200 focus:border-theme-36 col-span-1"
              name="country_code"
              v-model="country_code"
            />
            <Field
              class="form-control border-gray-200 focus:border-theme-36 col-span-4"
              name="country_name"
              v-model="country_name"
              type="text"
            />

            <br />
          </div>

          <ErrorMessage
            name="country_name"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

            <!-- gender -->
            <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t('translation.forms.maritalStatus') }}
            <span class="text-theme-43">*</span></label
          >

          <TomSelect
                      name="maritalStatus"
                      id="maritalStatus"
                   
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
                      <!-- <option value="engaged">
                        <p>
                          {{ $t('translation.engaged_text') }}
                        </p>
                      </option> -->
                      <option value="separated">
                        <p>
                          {{ $t('translation.separated_text') }}
                        </p>
                      </option>
                    </TomSelect>
          <ErrorMessage
            name="gender"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>

      </div>

      <!-- insurance info -->
      <div
        class="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-2 pt-6"
      >
        <div class="flex flex-col">
          <label class="createFormLabel" for=""
            >{{ t("translation.forms.patientInsurer") }}
            <span
              v-if="formValues?.passant === '0'"
              class="createFormRequired"
            ></span
          ></label>

          <TomSelect
            v-model="selectedInsurer"
            class="w-full"
            id="patientInsurer"
          >
            <option value>
              {{ $t("translation.forms.patientInsurer") }}
            </option>
            <option
              v-for="(company, name) in insuranceCompanies"
              :key="name"
              :value="company.value"
            >
              {{ company.value }}
            </option>
          </TomSelect>
          <div class="hidden">
            <Field name="insuranceUzoviCode" />
          </div>
          <ErrorMessage
            class="createFormError text-theme-43"
            name="patientInsurer"
          />
        </div>

        <div
          class="flex flex-col"
          v-for="element in insuranceformElements"
          :key="element.id"
        >
          <label class="createFormLabel truncate" for=""
            >{{ element.label }}
            <span
              :class="element.required === true && 'createFormRequired'"
            ></span
          ></label>
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            :name="element.name"
            :type="element.type"
            :placeholder="element.placeholder"
          />

          <ErrorMessage
            :name="element.name"
            style="font-size: 13px"
            class="text-theme-6"
          />
        </div>
      </div>

<!-- next of kin -->
<div class="mt-6 border-t border-gray-300 w-full flex transition-all ease-in-out duration-300">
      <p class="py-1 text-yellow-650 font-sans">

        {{ t('translation.forms.nextOfKinInfo') }}<span
          class="italic text-sm ml-2">({{
          t('translation.forms.fillInNextOfKinInfo')
        }})</span>
      </p>
    </div>
<div
        class="grid grid-cols-1 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 gap-2 pt-6"
      >
      <div
          class="flex flex-col"
          v-for="element in nextOfKinFormElements"
          :key="element.id"
        >
          <label class="createFormLabel" for=""
            >{{ element.label }}
            <span v-if="element.required" class="text-theme-43">*</span></label
          >
          <Field
            class="intro-x login__input form-control py-3 px-4 border-gray-200 focus:border-theme-36 block"
            :name="element.name"
            :type="element.type"
            :placeholder="element.placeholder"
           
          />
          <ErrorMessage
            style="font-size: 13px"
            class="text-theme-6"
            :name="element.name"
          />
        </div>
      </div>



      <div class="intro-x mt-5 xl:mt-8 text-center justify-center">
        <div class="flex justify-between">
          <button
            type="reset"
            data-dismiss="modal"
            class="btn py-1 px-2 closeBTN btn-danger w-40 mr-auto"
          >
            {{ $t("translation.cancel_text") }}
          </button>
          <button
            class="btn py-1 px-2 ml-auto w-40 align-top bg-theme-32 text-white"
            type="submit"
          >
            <LoadingIcon
              v-if="loading"
              icon="spinning-circles"
              color="white"
              class="w-4 h-4 ml-2"
            />
            <span v-else> {{ $t("translation.submit_text") }}</span>
          </button>
        </div>
        <!-- <small class="text-theme-6 mt-2" v-if="error.message">{{
                  error.message
                }}</small> -->
      </div>
    </Form>

    <ProfileImageModal
      @close="closeProfileModal"
      v-if="isProfileVisible"
      @setImage="setImage"
    />
    <Field v-model="photo" name="photo" v-slot="{ value }">
      <input type="file" class="hidden" v-bind="value" />
    </Field>
  </div>
</template>

<script setup>
import { computed, ref, watch, toRaw } from "vue";
import moment from "moment";
import * as yup from "yup";
import axios from "axios";

import { Form, ErrorMessage, Field, useFormValues } from "vee-validate";
import ProfileImageModal from "./ProfileImageModal.vue";
import { useStore } from "vuex";

// import Button from "@components/shared/buttons/Button.vue";
import Button from "./Button.vue";
import { TrashIcon } from "@heroicons/vue/solid";
import { useI18n } from "vue-i18n";
import searchAddress from "../composables/searchAddress";
import insuranceCompanies from "../composables/insurance/insurance.js";
import $ from "cash-dom";
import countryRegionData from "./../countryRegionData.json";
import Toastify from "toastify-js";
// import router from '../../router'
import router from "../../../router";
const { t } = useI18n();
const store = useStore();
const currentUser = store.state.auth.user;
const first_name = ref("");
const lastName = currentUser?.last_name;
const birthDate = currentUser?.birth_date;
const document_type = ref("");
const message = ref("");
const regionData = ref();
const mobileNumber = ref(currentUser?.patient_phone);
// const formValues = useFormValues();
first_name.value = computed(() => currentUser?.first_name);
// computed(() =>  toRaw(
console.log("llll user", store.state.auth.user?.first_name);
const formValues = ref({
  firstName: currentUser?.first_name  ?? "",
  middleName: currentUser?.middle_name  ?? "",
  lastName: currentUser?.last_name  ?? "",
  email: currentUser?.email  ?? "",
  patientPhone: currentUser?.patient_phone  ?? "",
  BSN: currentUser?.BSN,
  passant: currentUser?.passant,
  homePhone: currentUser?.home_phone,
  patient_phone:currentUser?.patient_phone,
  home_phone:currentUser?.home_phone,
  secretNumber: "",
  privateNumber: "",
  birthDate: "",
  maritalStatus: currentUser?.marital_status,
  is_disabled: "No",
  gender: currentUser?.gender,
  nokName: currentUser?.nok_name !== 'null' ? currentUser?.nok_name : "",
  nokPhoneNumber: currentUser?.nok_phone_number !== 'null' ? currentUser?.nok_phone_number : "",
  nokEmail:currentUser?.nok_email !== 'null' ? currentUser?.nok_email : "",
  nationality: "Dutch",
  country: currentUser?.country ?? "",
  countryCode: currentUser?.country_code,
  city: currentUser?.city,
  province: currentUser?.province,
  ext: currentUser?.ext,
  guardianEmail: "",
  guardianPhone: "",
  guardianAddress: "",
  fillIfNotFilled: currentUser?.fill_if_not_filled,
  guardianName: "",
  guardianType: "",
  street: currentUser?.street,
  houseNumber: currentUser?.house_number,
  postalCode: currentUser?.postalcode,
  patientInsurer: insuranceCompanies?.value[0]?.label,
  insuranceUzoviCode: insuranceCompanies?.value[0]?.code,
  insurancePolicyNumber: currentUser?.insurance_policy_number,
  additionalInsurance: currentUser?.additional_insurance !== 'null' ? currentUser?.additional_insurance : "",
  additionalInsurancePolicyNo: currentUser?.additional_insurance_policy_no !== 'null' ? currentUser?.additional_insurance_policy_no : "",
  reviews: "",
  referredBy: "",
  referreeEmail: "",
  referreePhone: "",
  branchId: "",
  documentType:currentUser?.document_type ?? "",
  documentNumber: currentUser?.document_number ?? "",
  lastNameOfPartner: "",
  countryOfBirth: currentUser?.country_of_birth ?? "",
  placeOfBirth: currentUser?.place_of_birth ?? "",
  telephoneNumber: currentUser?.patient_phone ?? "",
});

const resultsPatientPhone = ref();
const resultsHomePhone = ref();
const resultsSecretNumber = ref();
const resultsPrivateNumber = ref();
const resultsNok = ref();
const address = ref("");
const tempPostCode = ref("");
const tempHouseNumber = ref("");
const tempHouseExt = ref("");
// const maritalStatus = 
const branches = computed(() => store.getters.getBranches);
const selectedInsurer = ref(formValues?.value?.patientInsurer);
const selectedBranch = ref(formValues.value.branchId);

const today = moment().format("YYYY-MM-DD");
const photo = ref(null);
const imgSrc = ref(localStorage.getItem("profileImgUrl"));
const isProfileVisible = ref(false);
const country_code = ref(currentUser?.country_code ?? "");
const country_name = ref(currentUser?.country ?? "");
const province = ref(currentUser?.province ?? "");
const vmodel = ref("");
const city = ref("");
const street = ref("");
const municipality = ref("");
const firstName = ref("");
const TelephoneCode = ref(currentUser?.home_phone?.slice(0, -8) ?? "");
const MobileCode = ref(currentUser?.patient_phone?.slice(0, -8) ?? "");
const telephoneNumber = ref(currentUser?.home_phone ?? "");

const changeTelephoneCode = () => {
  console.log("telephone changed");
  telephoneNumber.value = TelephoneCode.value;
};
const changePhoneCode = () => {
  mobileNumber.value = MobileCode.value;
};

const setImage = (img) => {
  imgSrc.value = URL.createObjectURL(img);
  localStorage.setItem("profileImgUrl", imgSrc.value);
  photo.value = img;
};

const deleteImage = () => {
  photo.value = null;
  imgSrc.value = "";
  localStorage.removeItem("profileImgUrl");
};

const openProfileModal = () => {
  isProfileVisible.value = true;
};

const closeProfileModal = () => {
  isProfileVisible.value = false;
};
const insuranceformElements = [
  {
    id: "insurancePolicyNumber",
    label: t("translation.forms.insurancePolicyNumber"),
    required: formValues.value?.passant === "1",
    name: "insurancePolicyNumber",
    placeholder: t("translation.forms.insurancePolicyNumber"),
    type: "text",
  },
  {
    id: "fillIfNotFilled",
    label: t("translation.forms.fillIfNotFilled"),
    required: false,
    name: "fillIfNotFilled",
    placeholder: t("translation.forms.fillIfNotFilled"),
    type: "text",
  },

  {
    id: "additionalInsurance",
    label: t("translation.forms.additionalInsurance"),
    required: false,
    name: "additionalInsurance",
    placeholder: t("translation.forms.additionalInsurance"),
    type: "text",
  },
  {
    id: "additionalInsurancePolicyNo",
    label: t("translation.forms.additionalInsurancePolicyNo"),
    required: false,
    name: "additionalInsurancePolicyNo",
    placeholder: t("translation.forms.additionalInsurancePolicyNo"),
    type: "text",
  },
];
const addressformElements = [
  {
    id: "postalCode",
    label: t("translation.forms.postalCode"),
    required: true,
    name: "postalCode",

    placeholder: t("translation.forms.postalCode"),
    type: "text",
  },
  {
    id: "houseNumber",
    label: t("translation.forms.houseNumber"),
    required: true,
    name: "houseNumber",

    placeholder: t("translation.forms.houseNumber"),
    type: "text",
  },
  {
    id: "ext",
    label: t("translation.forms.ext"),
    name: "ext",

    placeholder: t("translation.forms.ext"),
    type: "text",
  },
  // {
  //   id: "street",
  //   label: t("translation.forms.streetAddress"),
  //   required: true,
  //   name: "street",
  //   vmodel: ref(street.value),
  //   placeholder: t("translation.forms.streetAddress"),
  //   type: "text",
  // },
  {
    id: "city",
    label: t("translation.forms.city"),
    required: true,
    name: "city",

    placeholder: t("translation.forms.city"),
    type: "text",
  },
];
const formElements = [
  {
    id: "firstName",
    label: t("translation.forms.firstName"),
    required: true,
    name: "firstName",
    placeholder: t("translation.forms.firstName"),
    type: "text",
    vmodel: "firstName",
  },
  {
    id: "middleName",
    label: t("translation.forms.middleName"),
    required: false,
    name: "middleName",
    placeholder: t("translation.forms.middleName"),
    type: "text",
  },
  {
    id: "lastName",
    label: t("translation.forms.lastName"),
    required: true,
    name: "lastName",
    placeholder: t("translation.forms.lastName"),
    type: "text",
  },
];

const contactFormElements = [
  {
    id: "patientEmail",
    label: t("translation.auth.email"),
    required: false,
    name: "patientEmail",
    placeholder: t("translation.auth.email"),
    type: "email",
  },
];

const genderFormElements = ref([
  { label: t("translation.forms.male"), value: "Male" },
  { label: t("translation.forms.female"), value: "Female" },
  { label: t("translation.forms.nonBinary"), value: "Non-Binary" },
]);

const disabledFormElements = [
  {
    id: "is_disabled",
    label: t("translation.yes_text"),
    required: true,
    name: "is_disabled",
    placeholder: t("translation.yes_text"),
    type: "radio",

    value: "Yes",
  },
  {
    id: "is_disabled",
    label: t("translation.no_text"),
    required: true,
    name: "is_disabled",
    placeholder: t("translation.no_text"),
    type: "radio",

    value: "No",
  },
];

const passantFormElements = [
  {
    id: "passant",
    label: t("translation.yes"),
    required: true,
    name: "passant",
    placeholder: t("translation.yes"),
    type: "radio",
    value: "1",
  },
  {
    id: "passant",
    label: t("translation.no"),
    required: true,
    name: "passant",
    placeholder: t("translation.no"),
    type: "radio",
    value: "0",
  },
];

const maritalFormElements = ref([
  { label: t("translation.forms.single"), value: "single" },
  { label: t("translation.forms.married"), value: "married" },
  { label: t("translation.forms.divorced"), value: "divorced" },
  { label: t("translation.forms.separated"), value: "separated" },
]);

const maritalStatus = ref(formValues.value.maritalStatus);
 const documentType =  ref(formValues.value.document_type);
const documentNumber =  ref(formValues.value.document_number);

const gender = ref(formValues.value.gender);
const nokEmail= ref(formValues.value.nok_email
);

const nextOfKinFormElements = [
  {
    id: "nokName",
    label: t("translation.forms.fullName"),
    required: false,
    name: "nokName",
    placeholder: t("translation.forms.fullName"),
    type: "text",
  },
  {
    id: "nokEmail",
    label: t("translation.email_text"),
    required: false,
    name: "nokEmail",
    placeholder: t("translation.email_text"),
    type: "email",
  },
  {
    id: "nokPhoneNumber",
    label: t("translation.mobile_number_text"),
    required: false,
    name: "nokPhoneNumber",
    placeholder: t("translation.mobile_number_text"),
    type: "text",
  },
];

const documentTypes = ref([
  {
    id: 1,
    label: t("translation.forms.nationalIdentityCard"),
    value: "National Identity Card",
  },
  { id: 2, label: t("translation.forms.passport"), value: "Passport" },
  {
    id: 3,
    label: t("translation.forms.driversLicense"),
    value: "Driver's License",
  },
  {
    id: 4,
    label: t("translation.forms.residencePermit"),
    value: "Residence Permit",
  },
]);
const { searchHome } = searchAddress();
const resetData = (state, code) => {
  // refresh the array of regions according to the country returned from the api
  let data = countryRegionData.filter(
    (country) =>
      country.countryName === state && country.countryShortCode === code
  );
  regionData.value = data[0]?.regions;
};
const phoneCountryCode = {
  phone: "",
  countryCode: "256",
  countryCode: "31",
};
const getHomeDetails = async (field, value) => {
  if (field === "postalCode") {
    tempPostCode.value = value.target.value;
  }
  if (field === "houseNumber") {
    tempHouseNumber.value = value.target.value;
  }
  if (field === "ext") {
    tempHouseExt.value = value.target.value;
    address.value = await searchHome(
      tempPostCode.value,
      tempHouseNumber.value,
      tempHouseExt.value
    );
    if (address.value) {
      console.log("received address", address.value);
      country_name.value = address.country;
      country.value= address.country;
      country_code.value = address.value.countryCode;
      province.value = address.value.province;

      street.value = address.value.street;
      city.value = address.value.city;
      municipality.value = address.value.municipality;
      province.value = address.value.province;
      formValues.value.street = address.value.street;
      formValues.value.city = address.value.municipality;
      formValues.value.province = address.value.province;
      formValues.value.country = address.value.country;
      formValues.value.country_name = address.value.country;
      formValues.value.countryCode = address.value.countryCode;
      console.log("received address", formValues.value);
      resetData(address.value.country, address.value.countryCode);
    } else {
      console.log("received NO address");
      country_name.value = "";
      country_code.value = "";
      province.value = "";
      formValues.value.street = "";
      formValues.value.city = "";
      formValues.value.province = "";
      formValues.value.country = "";
      formValues.value.countryCode = "";
    }
  }
};
const setInsuranceCode = (value) => {
  formValues.value.insuranceUzoviCode = value?.code;
};
const storedLang = localStorage.getItem("lang");
const defaultLang = storedLang ?? "nl";
const lang = ref(defaultLang);
const type = ref("password");
const typeconfirm = ref("password");
const phoneRegExp = /^\d{9}$/;
// const password = ref("");
const last_name = ref("");
const email = currentUser?.email;
const successful = ref(false);
const loading = ref(false);
const messagefails = ref("");
// const password_confirmation = ref("");

const showPassword = () => {
  console.log("toggle password");
  if (type.value === "password") {
    type.value = "text";
    document.getElementById("toggler").className = "fa fa-eye-slash";
    //  toggler.removeClass('fa fa-eye');
    //   toggler.addClass('fa fa-eye-slash');
  } else {
    type.value = "password";
    document.getElementById("toggler").className = "fa fa-eye";
  }
};
const showPasswordconfirm = () => {
  console.log("toggle password");
  if (typeconfirm.value === "password") {
    typeconfirm.value = "text";
    document.getElementById("togglerconfirm").className = "fa fa-eye-slash";
    //  toggler.removeClass('fa fa-eye');
    //   toggler.addClass('fa fa-eye-slash');
  } else {
    typeconfirm.value = "password";
    document.getElementById("togglerconfirm").className = "fa fa-eye";
  }
};

// Define a validation schema

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^[^\s@#!$%*()\{\}\?\|><]+(\s[^\s@#!$%*()\{\}\?\|><\]-]+)*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .trim()
    .required(
      t("translation.requiredText")
      // t('translation.errors.firstNameRequired')
    ),
  lastName: yup
    .string()
    .matches(/^[^\s@#!$%*()\{\}\?\|><]+(\s[^\s@#!$%*()\{\}\?\|><\]-]+)*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .trim()
    .required(
      t("translation.requiredText")
      // t('translation.errors.lastNameRequired')
    ),
  middleName: yup
    .string()
    .matches(/^[^\s@#!$%*()\{\}\?\|><]+(\s[^\s@#!$%*()\{\}\?\|><\]-]+)*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .trim(),
  // first_name:yup.string().required('This field is required'),

  // last_name: yup.string().required(t("translation.lastnameRequired")),
  email: yup
    .string()
    .email(t("translation.errors.invalidEmail"))
    .required(t("translation.requiredText")),
  telephoneNumber: yup.string().test({
    name: "telephoneNumber",
    test: (value) => {
      if (!value) return true; // skip validation
      return /^(?:(?:\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?)?\d{3}[-. ]?\d{4}$/.test(
        value
      );
    },
    message: t("translation.errors.invalidPhoneNumber"),
  }),

  mobileNumber: yup.string().test({
    name: "telephoneNumber",
    test: (value) => {
      if (!value) return true; // skip validation
      return /^(?:(?:\+?\d{1,3}[-. ]?)?\(?\d{3}\)?[-. ]?)?\d{3}[-. ]?\d{4}$/.test(
        value
      );
    },
    message: t("translation.errors.invalidPhoneNumber"),
  }),
  // country_name:
  // yup
  //       .string()
  //       .required(
  //         t('translation.requiredText')
  // t('translation.errors.countryRequired')
  // ),
  // countryOfBirth: yup
  //     .string()
  //     .required(
  //         t('translation.errors.countryOfBirthRequired')
  //     ),
  is_disabled: yup
    .mixed()
    .oneOf(["Yes", "No"])
    .required(t("translation.requiredText")),
  // gender: yup
  //     .mixed()
  //     .oneOf(["Male", "Female", "Uknown"], t('translation.errors.choseOneOfThree'))
  //     .required(
  //         t('translation.errors.genderRequired')
  //     ),
  placeOfBirth: yup.string().required(
    t("translation.requiredText")
    // t('translation.errors.placeOfBirthRequired')
  ),
  city: yup
    .string()
    .matches(/^[a-zA-Z0-9_\-\. ]+$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .required(
      t("translation.requiredText")
      // t('translation.errors.cityRequired')
    ),
  province: yup.string().required(
    t("translation.requiredText")
    // t('translation.errors.provinceRequired')
  ),
  houseNumber: yup
    .string()
    .matches(/^[A-Za-z0-9\s]*$/, {
      excludeEmptyString: true,
      message: t("translation.errors.invalidCharacters"),
    })
    .required(
      t("translation.requiredText")
      // t('translation.errors.houseNumberRequired')
    ),
  street: yup.string().required(
    t("translation.requiredText")
    // t('translation.errors.houseNumberRequired')
  ),
  postalCode: yup
    .string()
    .required(
      t("translation.requiredText")
      // t('translation.errors.postalCodeRequired')
    )
    .matches(/^[0-9]{4}[a-zA-Z]{2}/gm, t("translation.errors.codeFormat")),

  BSN: yup
    .string()
    .matches(/^\d{9}$/, {
      excludeEmptyString: true,
      message: t("translation.errors.maxNineDigits"),
    })
    .required(
      t("translation.requiredText")
      // t("translation.errors.bsnRequired")
    ),

  ext: yup.string(),
  nokName:  yup.string(),
  // nokPhoneNumber: currentUser?.nok_phone_number,
  // nokEmail:currentUser?.nok_email,
});

const handleRegister = async (values) => {
  console.log("all values", values);

  const user = {
    first_name: values?.firstName,
    middle_name: values?.middleName,
    last_name: values?.lastName,
    patientPhone: values?.patientPhone,
    BSN: values?.BSN,
    email: values?.email,
    // password: password.value,
    // password_confirmation: password_confirmation.value,
    homePhone: values?.homePhone,
    secretNumber: values?.secretNumber,
    privateNumber: values?.privateNumber,
    birthDate: moment(birthDate.value).format("DD-MM-YYYY"),
    maritalStatus: values?.maritalStatus,
    is_disabled: values?.is_disabled,
    gender: values?.gender,
    address: "",
    nationality: values?.nationality,
    country: values?.country,
    countryCode: values?.countryCode,
    city: values?.city,
    province: values?.province,
    ext: values?.ext,
    street: values?.street,
    municipality: address.value?.municipality,
    mobileNumber: values?.patient_phone,
    fillIfNotFilled: values?.fillIfNotFilled,
    guardianName: values?.guardianName,
    guardianType: values?.guardianType,
    street: values?.street,
    telephoneNumber: values?.home_phone,
    houseNumber: values?.houseNumber,
    postalCode: values?.postalCode,
    patientInsurer: values?.patientInsurer,
    insuranceUzoviCode: values?.insuranceUzoviCode,

    insurancePolicyNumber: values?.insurancePolicyNumber,
    additionalInsurance: values?.additionalInsurance,
    additionalInsurancePolicyNo: values?.additionalInsurancePolicyNo,

    // 
    documentType: formValues.value.documentType,
    
    documentNumber: values?.documentNumber,

    countryOfBirth: values?.countryOfBirth,
    placeOfBirth: values?.placeOfBirth,



    nokName: values?.nokName,

    nokPhoneNumber: values?.nokPhoneNumber,
    nokEmail: values?.nokEmail,

  };
  console.log("user to update", user);
  const data = new FormData();

  // data.append('firstName', user?.first_name);
  // data.append('middleName', user?.middle_name);
  // data.append('lastName', user?.last_name);
  data.append("patient_phone", user?.patientPhone);
  data.append("BSN", user?.BSN);
  data.append("email", user?.email);

  data.append("homePhone", user?.homePhone);
  data.append("secretNumber", user?.secretNumber);
  data.append("privateNumber", user?.privateNumber);
  data.append("birthDate",  user?.birthDate);
  data.append("marital_status", maritalStatus.value);
  data.append("is_disabled", user?.is_disabled);
  data.append("gender", gender.value);
  data.append("address", user.address);
  data.append("street", user.street);
  data.append("nationality", user?.nationality);
  data.append("country", user?.country);
  data.append("country_code", user?.countryCode);
  data.append("city", user?.city);
  data.append("province", user?.province);
  data.append("ext", user?.ext);
  data.append("patient_phone", user?.mobileNumber);
  data.append("home_phone", user?.telephoneNumber);
  data.append("fill_if_not_filled", user?.fillIfNotFilled);
  data.append("guardian_name", user?.guardianName);
  data.append("guardianType", user?.guardianType);
  data.append("municipality", user?.municipality);
  data.append("house_number", user?.houseNumber);
  data.append("postalcode", user?.postalCode);
  data.append("patient_insurer", selectedInsurer.value);
  data.append("insurance_uzovi_code", user?.insuranceUzoviCode);
  data.append("insurance_policy_number", user?.insurancePolicyNumber);
  data.append("additional_insurance", user?.additionalInsurance);
  data.append("additional_insurance_policy_no", user?.additionalInsurancePolicyNo);
  data.append("document_type", documentType.value);
  data.append("document_number", user?.documentNumber);
  data.append("countryOfBirth", user?.countryOfBirth);
  data.append("place_of_birth", user?.placeOfBirth);

  data.append("nok_name", user?.nokName);
  data.append("nok_phone_number", user?.nokPhoneNumber);
  data.append("nok_email", user?.nokEmail);

  // const data={
  //   firstName: user?.first_name,
  //       middleName: user?.middle_name,
  //       lastName: user?.last_name,
  //       patientPhone: user?.patientPhone,
  //       BSN: user?.BSN,
  //       email: user?.email,

  //       homePhone: user?.homePhone,
  //       secretNumber: user?.secretNumber,
  //       privateNumber: user?.privateNumber,
  //       birthDate: user?.birthDate,
  //       maritalStatus: user?.maritalStatus,
  //       is_disabled: user?.is_disabled,
  //       gender: user?.gender,
  //       address: user.address,
  //       street: user.street,
  //       nationality: user?.nationality,
  //       country: user?.country,
  //       countryCode: user?.countryCode,
  //       city: user?.city,
  //       province: user?.province,
  //       ext: user?.ext,
  //       mobileNumber: user?.mobileNumber,
  //       telephoneNumber: user?.telephoneNumber,
  //       fillIfNotFilled: user?.fillIfNotFilled,
  //       guardianName: user?.guardianName,
  //       guardianType: user?.guardianType,
  //       street: user?.street,
  //       municipality: user?.municipality,

  //       houseNumber: user?.houseNumber,
  //       postalCode: user?.postalCode,
  //       patientInsurer: user?.patientInsurer,
  //       insuranceUzoviCode: user?.insuranceUzoviCode,

  //       insurancePolicyNumber: user?.insurancePolicyNumber,
  //       additionalInsurance: user?.additionalInsurance,
  //       additionalInsurancePolicyNo: user?.additionalInsurancePolicyNo,

  //       documentType: user?.documentType,
  //       documentNumber: user?.documentNumber,

  //       countryOfBirth: user?.countryOfBirth,
  //       placeOfBirth: user?.placeOfBirth,
  // }

  successful.value = false;
  const token = localStorage.getItem("token");
  loading.value = true;
  axios
    .post(
      "patients/auth/update_info",
      data,

      {
        headers: {
          Authorization: "Bearer " + token,

          "Content-Type": "multipart/form-data",
          "X-Requested-With": "XMLHttpRequest",
        },
      }
    )
    .then((response) => {
      const data = response.payload;
      const notification = document.querySelector(
        ".toastify-content .notification-message"
      );

      console.log(
        "my status, message, payload",
        response.data.status,
        response.data.message,
        response.data.payload
      );
      if (response.data.status == true) {
        const data = response.data.payload;
        loading.value = false;
        messagefails.value = response.data.message;

        console.log("Profile Profile Information Successfully Updated");
        Toastify({
          node: $("#successbio-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
        // this.$router.go('/dashboard/profile')
        store.commit("auth/update", { user: data, isUpdate: true });
        router.push({
          name: "side-menu-profile-overview",
        });
        document.querySelector(".closeBTN").click();
        //     this.$router.go({
        //   name: "side-menu-profile-overview",
        // });
      } else {
        loading.value = false;
        // this.messagesuccesss = response.data.message
        console.log("Profile Profile Information Failed to Update");
        Toastify({
          node: $("#failedbio-notification-content")
            .clone()
            .removeClass("hidden")[0],
          duration: 3000,
          newWindow: true,
          close: true,
          gravity: "top",
          position: "right",
          stopOnFocus: true,
        }).showToast();
      }
      // this.basicNonStickyNotificationToggle()
      console.log("response", response);

      return response.data.user_data;
    })
    .then((data) => {
   
      // Commiting to the updates to the store
      // this.$store.commit("auth/update", { user: data, isUpdate: true });
    })
    .catch((error) => {
      console.log("Error", error);
    });
};

// console.log('new this.$store.state.auth.user', toRaw(store.state.auth.user))

watch(street, (newStreetValue) => {
  // Perform any actions you want when the street value changes
});
</script>
<style scoped>
.form-control:focus {
  border-width: 1px !important; 
  box-shadow: none !important; 
}
</style>
