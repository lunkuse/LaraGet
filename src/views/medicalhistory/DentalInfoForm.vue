<template>
<div>
  <!-- <div class="text-yellow-650 mb-3 font-semibold text-base">Dental questions</div> -->
  <h2 class="text-lg font-medium mr-auto">Dental questions</h2>
  <div class="grid grid-cols-12 ">


  
    <div id="dental_questions_1" class="col-span-12 2xl:col-span-6">
      <div
        class="p-2 rounded-sm w-full"
        v-for="(allergy, index) in info.questions.intake.slice(0, 7)"
        :key="allergy.id"
        :class="{ 'bg-gray-200': index % 2 == 0 }"
      >
        <h5 class="font-sans font-medium text-black text-xs lg:text-sm">
          {{ index + 1 }}. {{ allergy.question }}
        </h5>
        <form class="flex items-center mt-2">
          <label
            class="
              font-sans
              text-black text-xs
              lg:text-sm
              2xl:text-sm
              break-words
              ml-2
              input-disabled
            "
          >
            Yes
            <input
              type="radio"
              :name="allergy.id"
              value="true"
              v-model="allergy.status"
            />
          </label>
          <label
            class="
              font-sans
              text-black text-xs
              lg:text-sm
              2xl:text-sm
              break-words
              ml-2
              input-disabled
            "
          >
            No
            <input
              type="radio"
              :name="allergy.id"
              value="false"
              v-model="allergy.status"
            />
          </label>
        </form>
      </div>
    </div>
 


    <div id="dental_questions_2" class="col-span-12 2xl:col-span-6">
      <div
        class="p-2 rounded-sm w-full"
        v-for="(allergy, index) in info.questions.intake.slice(-4)"
        :key="allergy.id"
        :class="{ 'bg-gray-200': index % 2 == 0 }"
      >
        <h5 class="font-sans font-medium text-black text-xs lg:text-sm">
          {{index + 1 + 7 }}. {{ allergy.question }}
        </h5>
        <form class="flex items-center mt-2">
          <label
            class="
              font-sans
              text-black text-xs
              lg:text-sm
              2xl:text-sm
              break-words
              ml-2
              input-disabled
            "
          >
            Yes
            <input
              type="radio"
              :name="allergy.id"
              value="true"
              v-model="allergy.status"
            />
          </label>
          <label
            class="
              font-sans
              text-black text-xs
              lg:text-sm
              2xl:text-sm
              break-words
              ml-2
              input-disabled
            "
          >
            No
            <input
              type="radio"
              :name="allergy.id"
              value="false"
              v-model="allergy.status"
            />
          </label>
        </form>
      </div>
      <!-- jaw question -->
      <div class="flex flex-col w-full mt-1 space-y-2 bg-gray-200 p-2 rounded-sm">
        <h5 class="font-sans font-medium text-black text-xs lg:text-sm">
          12. {{ info.questions.jaw.question }}
        </h5>
        <div
          class="
            grid grid-cols-1
            md:grid-cols-2
            gap-1
          "
        >
          <div
            class="flex space-x-1 items-center justify-start"
            v-for="question in info.questions.jaw.options"
            :key="question.id"
          >
            <label
              :key="question.id"
              class="
                font-sans
                text-black text-xs
                lg:text-sm
                2xl:text-sm
                break-words
                input-disabled
                ml-2
              "
            >
              <input
                type="checkbox"
                class="mr-1"
                v-model="question.checked"
                name="health_allergies"
              />
              {{ question.name }}
            </label>
          </div>
        </div>
      </div>
      <!-- other specialists -->
      <div class="flex flex-col w-full mt-1 space-y-2 p-2">
        <h5 class="font-sans font-medium text-black text-xs lg:text-sm">
         13. {{ info.questions.specialists.question }}
        </h5>
        <div
          class="
            grid grid-cols-1
            md:grid-cols-2
            lg:grid-cols-3
            gap-1
          "
        >
          <div
            class="flex space-x-1 items-center justify-start"
            v-for="specialist in info.questions.specialists.options"
            :key="specialist.id"
          >
            <label
              :key="specialist.id"
              class="
                font-sans
                text-black text-xs
                lg:text-sm
                2xl:text-sm
                break-words
                input-disabled
                ml-2
              "
            >
              <input
                type="checkbox"
                class="mr-1"
                v-model="specialist.checked"
                name="health_allergies"
              />
              {{ specialist.name }}
            </label>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script >
export default {
  props: {
    info: {
      required: true,
    },
  },
};
</script>
<style scoped>
.input-disabled {
  pointer-events: none;
}
</style>
