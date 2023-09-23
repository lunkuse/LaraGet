<template>
  <!-- BEGIN: Mobile Menu -->
  <div class="mobile-menu md:hidden">
    <div class="mobile-menu-bar">
      <a href class="flex mr-auto">
        <img alt="Metadent" class="w-6" src="@/assets/images/shield1.png" />
      </a>
      <AlignJustifyIcon class="w-8 h-8 text-white" @click="toggleMobileMenu" />
    </div>
    <transition @enter="enter" @leave="leave">
      <ul v-if="activeMobileMenu" class="border-t border-theme-29 py-5">
        <!-- BEGIN: First Child -->
        <template v-for="(menu, menuKey) in formattedMenu">
          <li
            v-if="menu == 'devider'"
            :key="menu + menuKey"
            class="menu__devider my-6"
          ></li>
          <li v-else :key="menu + menuKey">
            <a
              href="javascript:;"
              class="menu"
              :class="{
                'menu--active': menu.active,
                'menu--open': menu.activeDropdown,
              }"
              @click="linkTo(menu, router)"
            >
              <div class="menu__icon text-white">
                <component :is="menu.icon" />
              </div>
              <div class="menu__title text-white">
                <!-- {{ menu.title }} -->
                {{
                  capitalized(
                    $t(
                      `translation.${menu?.title
                        ?.toLowerCase()
                        .replace(" ", "_")}_text`
                    )
                  )
                }}
                <!-- {{ capitalized(translations?.[`${menu?.title?.toLowerCase().replace(' ', '_')}_text`] ?? menu.title) }} -->
                <div
                  v-if="menu.subMenu"
                  class="menu__sub-icon text-white"
                  :class="{ 'transform rotate-180': menu.activeDropdown }"
                >
                  <ChevronDownIcon />
                </div>
              </div>
            </a>
            <!-- BEGIN: Second Child -->
            <transition @enter="enter" @leave="leave">
              <ul v-if="menu.subMenu && menu.activeDropdown">
                <li
                  v-for="(subMenu, subMenuKey) in menu.subMenu"
                  :key="subMenuKey"
                >
                  <a
                    href="javascript:;"
                    class="menu"
                    :class="{ 'menu--active': subMenu.active }"
                    @click="linkTo(subMenu, router)"
                  >
                    <div class="menu__icon text-white">
                      <ActivityIcon />
                    </div>
                    <div class="menu__title text-white">
                      <!-- {{ subMenu.title }} -->
                      {{
                        capitalized(
                          $t(
                            `translation.${subMenu?.title
                              ?.toLowerCase()
                              .replace(" ", "_")}_text`
                          )
                        )
                      }}
                      <div
                        v-if="subMenu.subMenu"
                        class="menu__sub-icon text-white"
                        :class="{
                          'transform rotate-180': subMenu.activeDropdown,
                        }"
                      >
                        <ChevronDownIcon />
                      </div>
                    </div>
                  </a>
                  <!-- BEGIN: Third Child -->
                  <transition @enter="enter" @leave="leave">
                    <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                      <li
                        v-for="(lastSubMenu, lastSubMenuKey) in subMenu.subMenu"
                        :key="lastSubMenuKey"
                      >
                        <a
                          href="javascript:;"
                          class="menu"
                          :class="{ 'menu--active': lastSubMenu.active }"
                          @click="linkTo(lastSubMenu, router)"
                        >
                          <div class="menu__icon text-white">
                            <ZapIcon />
                          </div>
                          <div class="menu__title text-white">
                            {{ lastSubMenu.title }}
                            {{
                              translations?.[
                                `${lastSubMenu.title
                                  ?.toLowerCase()
                                  .replace(" ", "_")}_text`
                              ] ?? lastSubMenu.title
                            }}
                          </div>
                        </a>
                      </li>
                    </ul>
                  </transition>
                  <!-- END: Third Child -->
                </li>
              </ul>
            </transition>
            <!-- END: Second Child -->
          </li>
        </template>
        <!-- END: First Child -->
      </ul>
    </transition>
  </div>
  <!-- END: Mobile Menu -->
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { helper as $h } from "@/utils/helper";
import {
  activeMobileMenu,
  toggleMobileMenu,
  linkTo,
  enter,
  leave,
} from "./index";
import { nestedMenu } from "@/layouts/side-menu";

export default defineComponent({
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const formattedMenu = ref([]);
    const translations = inject("translation_v3");
    const mobileMenu = computed(() =>
      nestedMenu(store.state.sideMenu.menu, route)
    );

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = $h.toRaw(mobileMenu.value);
      }
    );

    onMounted(() => {
      formattedMenu.value = $h.toRaw(mobileMenu.value);
    });

    return {
      activeMobileMenu,
      toggleMobileMenu,
      formattedMenu,
      router,
      linkTo,
      enter,
      leave,
      translations,
    };
  },
  methods: {
    capitalized(title) {
      const capitalizedFirst = title[0].toUpperCase();
      const rest = title?.slice(1)?.toLowerCase();
      console.log("capitalizedFirst", capitalizedFirst + rest);
      return capitalizedFirst + rest;
    },
  },
});
</script>
