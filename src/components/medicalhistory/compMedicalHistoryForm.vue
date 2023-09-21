<template>
  <div class="grid grid-cols-12 gap-6">
    <div class="card-header font-weight-bold text-primary">
      MEDICAL HISTORY FORM
    </div>
    <div class="card-body">
      <Form :validation-schema="schema" @submit="handleSubmit">
        <div class="row">
          <div class="col-md-12 pt-4 mb-3">
            <h6 class="text-primary lead">
              Physician Details (<small class="italic">
                Fill in all the information about the Physician</small
              >
              ).
            </h6>
          </div>
          <div class="form-group col-md-4">
            <label class="text-label"
              >Name of physician<small class="text-danger">(Required)</small></label
            >
            <Field type="text" class="form-control form-control-sm" name="name_of_physician" />
            <ErrorMessage name="name_of_physician" class="text-danger" />
          </div>

          <div class="form-group col-md-4">
            <label class="text-label"
              >Speciality if applicable <small class="text-danger">(Required)</small></label
            >
            <Field
              type="text"
              class="form-control form-control-sm"
              name="speciality_of_physician"
            />
            <ErrorMessage name="speciality_of_physician" class="text-danger" />
          </div>

          <div class="form-group col-md-4">
            <label class="text-label"
              >Building name <small class="text-danger">(Required)</small></label
            >
            <Field type="text" class="form-control form-control-sm" name="building_name" />
            <ErrorMessage name="building_name" class="text-danger" />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-4">
            <label class="text-label"
              >Office number <small class="text-danger">(Required)</small></label
            >
            <Field type="text" class="form-control form-control-sm" name="office_number" />
            <ErrorMessage name="office_number" class="text-danger" />
          </div>

          <div class="form-group col-md-4">
            <label class="text-label"
              >Office address <small class="text-danger">(Required)</small></label
            >
            <Field type="text" class="form-control form-control-sm" name="office_address" />
            <ErrorMessage name="office_address" class="text-danger" />
          </div>
        </div>

        <div class="row">
          <div class="col-md-12 pt-4">
            <h6 class="text-primary lead">
              Medical Information (<small class="italic">
                Fill in all the information about the medical situation of the patient</small
              >
              ).
            </h6>
          </div>

          <div class="row">
            <div class="col-md-4">
              <div class="form-group">
                <p>Are you in good health ?</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="maritalStatus"
                      v-model="are_you_in_good_health"
                      type="radio"
                      class="mr-2"
                      value="yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="maritalStatus"
                      v-model="are_you_in_good_health"
                      type="radio"
                      class="mr-2"
                      value="yes"
                    />No
                  </label>
                </div>
              </div>

              <div class="form-group">
                <p>Are you under medical treatment Now ?</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="are_you_under_medical_treatment_now"
                      v-model="are_you_under_medical_treatment_now"
                      type="radio"
                      class="mr-2"
                      value="yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="are_you_under_medical_treatment_now"
                      v-model="are_you_under_medical_treatment_now"
                      type="radio"
                      class="mr-2"
                      value="yes"
                    />No
                  </label>
                </div>
              </div>

              <div class="form-group">
                <p>Have you ever had a serious illness or medical operation ?</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="have_you_ever_had_serious_illness_or_surgical_operation"
                      v-model="have_you_ever_had_serious_illness_or_surgical_operation"
                      type="radio"
                      class="mr-2"
                      value="yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="have_you_ever_had_serious_illness_or_surgical_operation"
                      v-model="have_you_ever_had_serious_illness_or_surgical_operation"
                      type="radio"
                      class="mr-2"
                      value="No"
                    />No
                  </label>
                </div>
              </div>

              <div class="form-group">
                <p>Have you ever been hospitalized ?</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="have_you_ever_been_hospitalized"
                      v-model="have_you_ever_been_hospitalized"
                      type="radio"
                      class="mr-2"
                      value="Yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="have_you_ever_been_hospitalized"
                      v-model="have_you_ever_been_hospitalized"
                      type="radio"
                      class="mr-2"
                      value="No"
                    />No
                  </label>
                </div>
                <div class="mb-3">
                  <span class="form-label">If so, when and why ?</span>
                  <Field name="if_hospitalised_why" v-model="if_hospitalised_why" type="text" />
                </div>
              </div>
            </div>

            <div class="col-md-4">
              <div class="form-group">
                <p>Do you use tobacco products?:</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="do_you_use_tobacco_products"
                      v-model="do_you_use_tobacco_products"
                      type="radio"
                      class="mr-2"
                      value="Yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="do_you_use_tobacco_products"
                      v-model="do_you_use_tobacco_products"
                      type="radio"
                      class="mr-2"
                      value="No"
                    />No
                  </label>
                </div>
              </div>
              <div class="form-group">
                <p>Are you taking any prescription/ Non-prescription drugs?:</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="are_you_taking_prescription_or_non_prescription_medication"
                      v-model="are_you_taking_prescription_or_non_prescription_medication"
                      type="radio"
                      class="mr-2"
                      value="Yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="are_you_taking_prescription_or_non_prescription_medication"
                      v-model="are_you_taking_prescription_or_non_prescription_medication"
                      type="radio"
                      class="mr-2"
                      value="No"
                    />No
                  </label>
                </div>
              </div>

              <div class="form-group">
                <p>Do you use alcohol, cocaine or other dangerous drugs?:</p>
                <div class="form-check form-check-inline">
                  <label>
                    <Field
                      name="do_you_use_alcohol_cocain_or_other_dangerous_drugs"
                      v-model="do_you_use_alcohol_cocain_or_other_dangerous_drugs"
                      type="radio"
                      class="mr-2"
                      value="Yes"
                    />Yes
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="do_you_use_alcohol_cocain_or_other_dangerous_drugs"
                    value="0"
                  />
                  <label class="form-check-label" for="inlineRadio2">No</label>
                </div>
              </div>
            </div>

            <div class="col-md-4">

                <p>Are you alergic to any of the following?:</p>

                <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="1"
                  id="flexCheckDefault"
                  v-model="are_you_alergic"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  None of the listed allergies are applicable to patient
                </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="2"
                  id="flexCheckDefault"
                  v-model="are_you_alergic"
                />
                <label class="form-check-label" for="flexCheckDefault">
                  Local Anasthetic (ex. Lidocaine)
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="3"
                  id="flexCheckDefault"
                  v-model="are_you_alergic"
                />
                <label class="form-check-label" for="flexCheckDefault"> Other: </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="4"
                  id="flexCheckDefault"
                  v-model="are_you_alergic"
                />
                <label class="form-check-label" for="flexCheckDefault"> aspirin </label>
              </div>

              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  value="5"
                  id="flexCheckDefault"
                  v-model="are_you_alergic"
                />
                <label class="form-check-label" for="flexCheckDefault"> sulphur drugs </label>
              </div>

               <div class="form-group">
                <label class="form-label">Other:</label>
                <input type="text" class="form-control" v-model="if_yes_what_is_it" />
              </div>

              <div class="form-group">
                <label class="form-label">Bleeding time</label>
                <input
                  type="text"
                  class="form-control d-inline"
                  v-model="bleeding_time"
                  placeholder="mins(s)"
                />
              </div>

            </div>
          </div>

          <p class="text-primary lead mt-10">For women only: (<small class="italic">
               To be filled if the patient is female</small
              >
              ).</p>
          <div class=" row">

            <div class="col-md-4">

              <div class="form-group">
              <p>Are you pregnant ?:</p>

              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="are_you_pregnant" value="1" />
                <label class="form-check-label" for="inlineRadio1">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="are_you_pregnant" value="0" />
                <label class="form-check-label" for="inlineRadio2">No</label>
              </div>
            </div>

            <div class="form-group">
              <p>Are you nursing ?:</p>

              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="are_you_nursing" value="1" />
                <label class="form-check-label" for="inlineRadio1">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input class="form-check-input" type="radio" v-model="are_you_nursing" value="0" />
                <label class="form-check-label" for="inlineRadio2">No</label>
              </div>
            </div>

            <div class="form-group">
              <p>Are you taking birth control pills ?:</p>

              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="are_you_taking_birth_control_pills"
                  value="1"
                />
                <label class="form-check-label" for="inlineRadio1">Yes</label>
              </div>
              <div class="form-check form-check-inline">
                <input
                  class="form-check-input"
                  type="radio"
                  v-model="are_you_taking_birth_control_pills"
                  value="0"
                />
                <label class="form-check-label" for="inlineRadio2">No</label>
              </div>
            </div>

            </div>

            <div class="col-md-5">
                <div class="form-group">
              <label class="form-label-row">Blood type:</label>
              <input
                type="text"
                class="form-control d-inline"
                placeholder="0+"
                v-model="blood_type"
              />
            </div>

            <div class="form-group">
              <label class="form-label">Blood pressure:</label>
              <input
                type="text"
                class="form-control d-inline"
                placeholder="90/80"
                v-model="blood_pressure"
              />
            </div>
            </div>

          </div>

          <div class="row">
            <div class="col-lg-12 mt-3">
                <p class="text-primary lead mt-10">For all: (<small class="italic">
              Examine the following conditions</small
              >
              ).</p>
              <p>Are you alergic to any of the following?:</p>
            </div>

            <div class="col-lg-12">
              <div class="row">
                <div class="col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="1"
                      id="flexCheckDefault"
                      autocomplete="off"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      None of the listed items are applicable to patient
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="2"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      High Blood Pressure
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="3"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Low Blood Pressure
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="4"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Epilepsy/ Convulsions
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="5"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      AIDS or HIV Infection
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="6"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Sexually Transmitted Disease
                    </label>
                  </div>

                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="7"
                      v-model="are_you_alergic_2"
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Stomache Troubles/ Ulcers
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="8"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Fainting Spells </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="9"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Rapid Weight Gain/ Loss
                    </label>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="10"
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Radiation Therapy
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="11"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Joint Replacement/ Implant
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="12"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Heart Surgery </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="13"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Heart Attack </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="14"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Thyroid Problem </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="15"
                      v-model="are_you_alergic_2"
                      id="flexCheckDefault"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Heart Disease </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="16"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Heart Murmur </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="17"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Hepatitis Liver Disease
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="18"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Rheumatic Fever </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="19"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Hay Fever Allergies
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="20"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Hepatitis/ Liver
                    </label>
                  </div>
                </div>

                <div class="col-md-4">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="21"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Hepatitis/ Juandice
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="22"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Tuberclosis </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="23"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Swollen ankles </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="24"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Kidney Disease </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="25"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Diabetes </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="26"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Chest pain </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="27"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Stroke </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="28"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Bleeding Problems
                    </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="29"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Blood Disease </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="30"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault"> Head Injuries </label>
                  </div>
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="31"
                      id="flexCheckDefault"
                      v-model="are_you_alergic_2"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      Arthritis/ Rheumatism
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="form-group">
            <label>Comments</label>
            <textarea class="form-control" v-model="comments" cols="2" rows="6"></textarea>
          </div>

          <div class="col-2">
            <Button label="Submit Information" icon="fa fa-save" />
          </div>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import Button from '@/components/shared/buttons/Button.vue';

export default {
  name: 'medicalHistory',
  data() {
    const schema = yup.object({
      nationality: yup.string().required('Nationality is required'),
    });

    return {
      schema,
    };
  },
  components: {
    Field,
    Form,
    ErrorMessage,
    Button,
  },
  mounted() {
    console.log(this.profile);
  },
  props: ['profile'],
};
</script>
<style scoped>
.card{
  border-radius: 3px;
}
input[type="text"],
input[type="email"],
input[type="number"],
input[type="date"],
select,
textarea {
  width: 100%;
  padding: 12px 20px;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  box-sizing: border-box;
}

label {
  font-weight: bold !important;
  color: gray;
  text-transform: capitalize !important;
}
</style>
