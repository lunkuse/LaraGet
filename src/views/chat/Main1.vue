
<template>
  <div class="content">
    <div class="intro-y flex flex-col sm:flex-row items-center mt-8">
      <h2 class="text-lg font-medium mr-auto">Chat</h2>
      <div class="w-full sm:w-auto flex mt-4 sm:mt-0">
        <button class="btn bg-theme-36 shadow-md mr-2">Start New Chat</button>
        <div class="dropdown ml-auto sm:ml-0" data-tw-placement="bottom-end">
          <button
            class="dropdown-toggle btn px-2 box text-slate-500"
            aria-expanded="false"
            data-tw-toggle="dropdown"
          >
            <span class="w-5 h-5 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="lucide w-4 h-4"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          <div class="dropdown-menu w-40">
            <ul class="dropdown-content">
              <li>
                <a class="dropdown-item cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 mr-2"
                  >
                    <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 00-3-3.87" />
                    <path d="M16 3.13a4 4 0 010 7.75" />
                  </svg> Create Group
                </a>
              </li>
              <li>
                <a class="dropdown-item cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 mr-2"
                  >
                    <path
                      d="M12.22 2h-.44a2 2 0 00-2 2v.18a2 2 0 01-1 1.73l-.43.25a2 2 0 01-2 0l-.15-.08a2 2 0 00-2.73.73l-.22.38a2 2 0 00.73 2.73l.15.1a2 2 0 011 1.72v.51a2 2 0 01-1 1.74l-.15.09a2 2 0 00-.73 2.73l.22.38a2 2 0 002.73.73l.15-.08a2 2 0 012 0l.43.25a2 2 0 011 1.73V20a2 2 0 002 2h.44a2 2 0 002-2v-.18a2 2 0 011-1.73l.43-.25a2 2 0 012 0l.15.08a2 2 0 002.73-.73l.22-.39a2 2 0 00-.73-2.73l-.15-.08a2 2 0 01-1-1.74v-.5a2 2 0 011-1.74l.15-.09a2 2 0 00.73-2.73l-.22-.38a2 2 0 00-2.73-.73l-.15.08a2 2 0 01-2 0l-.43-.25a2 2 0 01-1-1.73V4a2 2 0 00-2-2z"
                    />
                    <circle cx="12" cy="12" r="3" />
                  </svg> Settings
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="intro-y chat grid grid-cols-12 gap-5 mt-5">
      <div class="col-span-12 lg:col-span-4 2xl:col-span-3">
        <div class="intro-y pr-1">
          <div class="box p-2">
            <ul class="nav nav-pills" role="tablist">
              <li class="nav-item flex-1" role="presentation">
                <button
                  class="nav-link w-full py-2 active"
                  type="button"
                  role="tab"
                  data-tw-target="#_xznd9f0uy"
                  aria-controls="_xznd9f0uy"
                  aria-selected="true"
                >Chats</button>
              </li>
              <li class="nav-item flex-1" role="presentation">
                <button
                  class="nav-link w-full py-2"
                  type="button"
                  role="tab"
                  aria-selected="false"
                  data-tw-target="#_z3cl23u3s"
                  aria-controls="_z3cl23u3s"
                >Emails</button>
              </li>
              <li class="nav-item flex-1" role="presentation">
                <button
                  class="nav-link w-full py-2"
                  type="button"
                  role="tab"
                  aria-selected="false"
                  data-tw-target="#_n0od3j2fh"
                  aria-controls="_n0od3j2fh"
                >Notifications</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="tab-content w-full">
          <div
            class="tab-pane active"
            role="tabpanel"
            id="_xznd9f0uy"
            aria-labelledby="_xznd9f0uy-tab"
            style
          >
            <div class="pr-1">
              <div class="box px-5 pt-5 pb-5 lg:pb-0 mt-5">
                <div class="relative text-slate-500">
                  <input
                    type="text"
                    class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                    placeholder="Search for messages or users..."
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <div class="overflow-x-auto scrollbar-hidden">
                  <div class="flex mt-5">
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-3.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div
                        class="text-xs text-slate-500 truncate text-center mt-2"
                      >Catherine Zeta-Jones</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-10.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div
                        class="text-xs text-slate-500 truncate text-center mt-2"
                      >Denzel Washington</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-4.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div class="text-xs text-slate-500 truncate text-center mt-2">Tom Cruise</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-14.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div class="text-xs text-slate-500 truncate text-center mt-2">Nicolas Cage</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-3.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div class="text-xs text-slate-500 truncate text-center mt-2">Kate Winslet</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-10.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div class="text-xs text-slate-500 truncate text-center mt-2">Morgan Freeman</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-1.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div
                        class="text-xs text-slate-500 truncate text-center mt-2"
                      >Arnold Schwarzenegger</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-13.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div
                        class="text-xs text-slate-500 truncate text-center mt-2"
                      >Catherine Zeta-Jones</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-12.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div class="text-xs text-slate-500 truncate text-center mt-2">Christian Bale</div>
                    </a>
                    <a href class="w-10 mr-4 cursor-pointer">
                      <div class="w-10 h-10 flex-none image-fit rounded-full">
                        <img
                          alt="profile picture"
                          class="rounded-full"
                          src="@/assets/images/profile-10.jpg"
                        />
                        <div
                          class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                        ></div>
                      </div>
                      <div class="text-xs text-slate-500 truncate text-center mt-2">Richard Gere</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div class="chat__chat-list overflow-y-auto scrollbar-hidden pr-1 pt-1 mt-4">
              <div class="intro-x cursor-pointer box relative flex items-center p-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-3.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Catherine Zeta-Jones</a>
                    <div class="text-xs text-slate-400 ml-auto">01:10 PM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</div>
                </div>
                <div
                  class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
                >6</div>
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-10.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Denzel Washington</a>
                    <div class="text-xs text-slate-400 ml-auto">04:50 AM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomi</div>
                </div>
                <!---->
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-4.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Tom Cruise</a>
                    <div class="text-xs text-slate-400 ml-auto">06:05 AM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</div>
                </div>
                <div
                  class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
                >2</div>
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-14.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Nicolas Cage</a>
                    <div class="text-xs text-slate-400 ml-auto">07:00 PM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</div>
                </div>
                <!---->
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-3.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Kate Winslet</a>
                    <div class="text-xs text-slate-400 ml-auto">07:00 PM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomi</div>
                </div>
                <!---->
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-10.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Morgan Freeman</a>
                    <div class="text-xs text-slate-400 ml-auto">05:09 AM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</div>
                </div>
                <div
                  class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
                >6</div>
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-1.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Arnold Schwarzenegger</a>
                    <div class="text-xs text-slate-400 ml-auto">04:50 AM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem</div>
                </div>
                <!---->
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-13.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Catherine Zeta-Jones</a>
                    <div class="text-xs text-slate-400 ml-auto">01:10 PM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20</div>
                </div>
                <div
                  class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
                >4</div>
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-12.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Christian Bale</a>
                    <div class="text-xs text-slate-400 ml-auto">06:05 AM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500</div>
                </div>
                <div
                  class="w-5 h-5 flex items-center justify-center absolute top-0 right-0 text-xs text-white rounded-full bg-primary font-medium -mt-1 -mr-1"
                >3</div>
              </div>
              <div class="intro-x cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-10.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href="javascript:;" class="font-medium">Richard Gere</a>
                    <div class="text-xs text-slate-400 ml-auto">06:05 AM</div>
                  </div>
                  <div
                    class="w-full truncate text-slate-500 mt-0.5"
                  >Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 20</div>
                </div>
                <!---->
              </div>
            </div>
          </div>
          <div class="tab-pane" role="tabpanel" id="_z3cl23u3s" aria-labelledby="_z3cl23u3s-tab">
            <div class="pr-1">
              <div class="box p-5 mt-5">
                <div class="relative text-slate-500">
                  <input
                    type="text"
                    class="form-control py-3 px-4 border-transparent bg-slate-100 pr-10"
                    placeholder="Search for messages or doctors..."
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 hidden sm:absolute my-auto inset-y-0 mr-3 right-0"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <button type="button" class="btn btn-primary w-full mt-3">Invite Friends</button>
              </div>
            </div>
            <div class="chat__user-list overflow-y-auto scrollbar-hidden pr-1 pt-1">
              <div class="mt-4 text-slate-500">A</div>
              <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-3.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href class="font-medium">Catherine Zeta-Jones</a>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
                </div>
                <div class="dropdown ml-auto" data-tw-placement="bottom-end">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                    href="javascript:;"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide w-5 h-5 text-slate-500"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </a>
                  <div class="dropdown-menu w-40">
                    <ul class="dropdown-content">
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg> Share Contact
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg> Copy Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-10.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href class="font-medium">Denzel Washington</a>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
                </div>
                <div class="dropdown ml-auto" data-tw-placement="bottom-end">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                    href="javascript:;"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide w-5 h-5 text-slate-500"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </a>
                  <div class="dropdown-menu w-40">
                    <ul class="dropdown-content">
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg> Share Contact
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg> Copy Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="mt-4 text-slate-500">B</div>
              <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-4.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href class="font-medium">Tom Cruise</a>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
                </div>
                <div class="dropdown ml-auto" data-tw-placement="bottom-end">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                    href="javascript:;"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide w-5 h-5 text-slate-500"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </a>
                  <div class="dropdown-menu w-40">
                    <ul class="dropdown-content">
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg> Share Contact
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg> Copy Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-14.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href class="font-medium">Nicolas Cage</a>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
                </div>
                <div class="dropdown ml-auto" data-tw-placement="bottom-end">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                    href="javascript:;"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide w-5 h-5 text-slate-500"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </a>
                  <div class="dropdown-menu w-40">
                    <ul class="dropdown-content">
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg> Share Contact
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg> Copy Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="cursor-pointer box relative flex items-center p-5 mt-5">
                <div class="w-12 h-12 flex-none image-fit mr-1">
                  <img
                    alt="profile picture"
                    class="rounded-full"
                    src="@/assets/images/profile-3.jpg"
                  />
                  <div
                    class="w-3 h-3 bg-success absolute right-0 bottom-0 rounded-full border-2 border-white dark:border-darkmode-600"
                  ></div>
                </div>
                <div class="ml-2 overflow-hidden">
                  <div class="flex items-center">
                    <a href class="font-medium">Kate Winslet</a>
                  </div>
                  <div class="w-full truncate text-slate-500 mt-0.5">Last seen 2 hours ago</div>
                </div>
                <div class="dropdown ml-auto" data-tw-placement="bottom-end">
                  <a
                    class="dropdown-toggle w-5 h-5 block"
                    aria-expanded="false"
                    data-tw-toggle="dropdown"
                    href="javascript:;"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide w-5 h-5 text-slate-500"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </a>
                  <div class="dropdown-menu w-40">
                    <ul class="dropdown-content">
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <circle cx="18" cy="5" r="3" />
                            <circle cx="6" cy="12" r="3" />
                            <circle cx="18" cy="19" r="3" />
                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                          </svg> Share Contact
                        </a>
                      </li>
                      <li>
                        <a class="dropdown-item cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="lucide w-4 h-4 mr-2"
                          >
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg> Copy Contact
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="tab-pane" role="tabpanel" id="_n0od3j2fh" aria-labelledby="_n0od3j2fh-tab">
            <div class="pr-1">
              <div class="box px-5 py-10 mt-5">
                <div class="w-20 h-20 flex-none image-fit rounded-full overflow-hidden mx-auto">
                  <img
                    alt="profile picture"
                    src="@/assets/images/profile-3.jpg"
                  />
                </div>
                <div class="text-center mt-3">
                  <div class="font-medium text-lg">Catherine Zeta-Jones</div>
                  <div class="text-slate-500 mt-1">Text</div>
                </div>
              </div>
              <div class="box p-5 mt-5">
                <div
                  class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"
                >
                  <div>
                    <div class="text-slate-500">Country</div>
                    <div class="mt-1">New York City, USA</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 text-slate-500 ml-auto"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path
                      d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"
                    />
                  </svg>
                </div>
                <div
                  class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
                >
                  <div>
                    <div class="text-slate-500">Phone</div>
                    <div class="mt-1">+32 19 23 62 24 34</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 text-slate-500 ml-auto"
                  >
                    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
                    <path d="M19 10v2a7 7 0 01-14 0v-2" />
                    <line x1="12" y1="19" x2="12" y2="23" />
                    <line x1="8" y1="23" x2="16" y2="23" />
                  </svg>
                </div>
                <div
                  class="flex items-center border-b border-slate-200/60 dark:border-darkmode-400 py-5"
                >
                  <div>
                    <div class="text-slate-500">Email</div>
                    <div class="mt-1">catherinezeta-jones@left4code.com</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 text-slate-500 ml-auto"
                  >
                    <path
                      d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <div class="flex items-center pt-5">
                  <div>
                    <div class="text-slate-500">Joined Date</div>
                    <div class="mt-1">20 January 2021</div>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="lucide w-4 h-4 text-slate-500 ml-auto"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="intro-y col-span-12 lg:col-span-8 2xl:col-span-9">
        <div class="chat__box box">
          <div class="h-full flex items-center">
            <div class="mx-auto text-center">
              <div class="w-16 h-16 flex-none image-fit rounded-full overflow-hidden mx-auto">
                <img alt="profile picture" src="@/assets/images/profile-3.jpg" />
              </div>
              <div class="mt-3">
                <div class="font-medium">Hey, Catherine Zeta-Jones!</div>
                <div class="text-slate-500 mt-1">Please select a chat to start messaging.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, toRaw } from 'vue'

export default defineComponent({
  setup() {
    const chatBox = ref(false)
    const showChatBox = () => {
      chatBox.value = !chatBox.value
    }

    return {
      chatBox,
      showChatBox
    }
  },
  computed: {
    currentUser() {
      console.log(toRaw(this.$store.state.auth.user))
      return toRaw(this.$store.state.auth.user)
    }
  }
})
</script>
