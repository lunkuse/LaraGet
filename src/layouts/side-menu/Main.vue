<template>
  <div>
    <DarkModeSwitcher />
    <MobileMenu />
    <!-- <Chart style="display: none;"/> -->
    <div class="flex">
      <!-- BEGIN: Side Menu -->
      <nav class="side-nav">
        <!-- BEGIN: Logo -->
        <router-link
          :to="{ name: 'side-menu-dashboard-overview' }"
          tag="a"
          class="intro-x flex items-center pl-5 pt-4"
        >
          <a href class="-intro-x hidden md:flex">
            <img class="w-6" src="@/assets/images/logoswhite1.png" />
            <p class="text-white text-lg ml-3 hidden xl:block">Metadent</p>
          </a>
        </router-link>
        <!-- END: Logo -->
        <div
          class="side-nav__devider my-6 bg-theme-3 text-theme-3 md:bg-theme-3"
        ></div>
        <ul>
          <!-- BEGIN: First Child -->
          <template v-for="(menu, menuKey) in formattedMenu">
            <li
              v-if="menu == 'devider'"
              :key="menu + menuKey"
              class="side-nav__devider my-6"
            ></li>
            <li v-else :key="menu + menuKey">
              <SideMenuTooltip
                tag="a"
                :content="`${$t(
                  `translation.${menu?.title
                    ?.toLowerCase()
                    .replace(' ', '_')}_text`
                )}`"
                :href="
                  menu.subMenu
                    ? 'javascript:;'
                    : router.resolve({ name: menu.pageName }).path
                "
                class="side-menu"
                :class="{
                  'side-menu--active ': menu.active,
                  'side-menu--open': menu.activeDropdown,
                }"
                @click="linkTo(menu, router, $event)"
              >
                <div class="side-menu__icon">
                  <component :is="menu.icon" />
                </div>
                <div class="side-menu__title">
                  <!-- {{ menu.title }}  -->
                  {{
                    capitalized(
                      $t(
                        `translation.${menu?.title
                          ?.toLowerCase()
                          .replace(" ", "_")}_text`
                      )
                    )
                  }}

                  <div
                    v-if="menu.subMenu"
                    class="side-menu__sub-icon"
                    :class="{ 'transform rotate-180 ': menu.activeDropdown }"
                  >
                    <ChevronDownIcon />
                  </div>
                </div>
              </SideMenuTooltip>
              <!-- BEGIN: Second Child -->
              <transition @enter="enter" @leave="leave">
                <ul v-if="menu.subMenu && menu.activeDropdown">
                  <li
                    v-for="(subMenu, subMenuKey) in menu.subMenu"
                    :key="subMenuKey"
                  >
                    <SideMenuTooltip
                      tag="a"
                      :content="`${$t(
                        `translation.${subMenu?.title
                          ?.toLowerCase()
                          .replace(' ', '_')}_text`
                      )}`"
                      :href="
                        subMenu.subMenu
                          ? 'javascript:;'
                          : router.resolve({ name: subMenu.pageName }).path
                      "
                      class="side-menu"
                      :class="{ 'side-menu--active': subMenu.active,
                      'bg-gray-300': subMenu.active,
                      '!text-gray-800': subMenu.active
                     }"
                      @click="linkTo(subMenu, router, $event)"
                    >
                      <div class="side-menu__icon">
                        <component :is="subMenu.icon" />
                      </div>
                      <div class="side-menu__title">
                      
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
                          class="side-menu__sub-icon"
                          :class="{
                            'transform rotate-180': subMenu.activeDropdown,
                          }"
                        >
                          <ChevronDownIcon />
                        </div>
                      </div>
                    </SideMenuTooltip>
                    <!-- BEGIN: Third Child -->
                    <transition @enter="enter" @leave="leave">
                      <ul v-if="subMenu.subMenu && subMenu.activeDropdown">
                        <li
                          v-for="(
                            lastSubMenu, lastSubMenuKey
                          ) in subMenu.subMenu"
                          :key="lastSubMenuKey"
                        >
                          <SideMenuTooltip
                            tag="a"
                            :content="`${$t(
                              `translation.${lastSubMenu.title
                                ?.toLowerCase()
                                .replace(' ', '_')}_text`
                            )}`"
                            :href="
                              lastSubMenu.subMenu
                                ? 'javascript:;'
                                : router.resolve({ name: lastSubMenu.pageName })
                                    .path
                            "
                            class="side-menu"
                            :class="{ 'side-menu--active': lastSubMenu.active }"
                            @click="linkTo(lastSubMenu, router, $event)"
                          >
                            <div class="side-menu__icon">
                              <ZapIcon />
                            </div>
                            <div class="side-menu__title text-gray-100">
                              <!-- {{ lastSubMenu.title }} -->
                              {{
                                capitalized(
                                  $t(
                                    `translation.${lastSubMenu.title
                                      ?.toLowerCase()
                                      .replace(" ", "_")}_text`
                                  )
                                )
                              }}
                            </div>
                          </SideMenuTooltip>
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
      </nav>
      <!-- END: Side Menu -->
      <!-- BEGIN: Content -->
      <div class="content">
        <TopBar />
        <router-view />
      </div>
      <!-- END: Content -->
    </div>
  </div>
</template>

<script>
import { defineComponent, computed, onMounted, ref, watch, inject } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "@/store";
import { helper as $h } from "@/utils/helper";
import TopBar from "@/components/top-bar/Main.vue";
import MobileMenu from "@/components/mobile-menu/Main.vue";
import DarkModeSwitcher from "@/components/dark-mode-switcher/Main.vue";
import SideMenuTooltip from "@/components/side-menu-tooltip/Main.vue";
import { linkTo, nestedMenu, enter, leave } from "./index";
import { useI18n } from "vue-i18n";
import $ from "cash-dom";
export default defineComponent({
  components: {
    TopBar,
    MobileMenu,
    DarkModeSwitcher,
    SideMenuTooltip,
    // Chart
  },
  methods: {
    onLogout: function () {
      localStorage.removeItem("tooth_sections");
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    capitalized(title) {
      const capitalizedFirst = title[0].toUpperCase();
      const rest = title?.slice(1)?.toLowerCase();
      console.log("capitalizedFirst", capitalizedFirst + rest);
      return capitalizedFirst + rest;
    },
  },
  watch: {},
  setup() {
    const route = useRoute();
    const router = useRouter();
    const store = useStore();
    const formattedMenu = ref([]);

    const { t } = useI18n({});
    const sideMenu = computed(() =>
      nestedMenu(store.state.sideMenu.menu, route)
    );

    watch(
      computed(() => route.path),
      () => {
        formattedMenu.value = $h.toRaw(sideMenu.value);
      }
    );

    onMounted(() => {
      $("body").removeClass("error-page").removeClass("login").addClass("main");
      formattedMenu.value = $h.toRaw(sideMenu.value);
      const user = JSON.parse(localStorage.getItem("user"));
      store.commit("auth/update", { user });
    });

    return {
      t,
      formattedMenu,
      router,
      linkTo,
      enter,
      leave,
    };
  },
});
</script>
