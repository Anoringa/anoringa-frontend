<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark top-navbar">
      <a class="navbar-brand loguito" href="/">
        <img
          v-if="windowWidth < 445"
          src="/anoringa_logo_centered.png"
          class="page-logo"
          height="45"
          alt="A"
        />

        <span v-if="windowWidth > 445" class="app-name-label">{{
          appName
        }}</span>

        <span v-if="!dev && windowWidth > 360" class="badge">alpha</span>
        <span v-if="dev && windowWidth > 360" class="badge">dev</span>
      </a>

      <b-collapse
        class="collapse navbar-collapse order-last order-md-0"
        :class="windowWidth < 700 ? 'collapsed-nav' : ''"
        id="nav-collapse"
        is-nav
      >
        <ul class="navbar-nav">
          <li
            class="nav-item"
            :class="windowSearch.includes('sort=newerpost') ? 'active' : ''"
          >
            <a class="nav-link linker" href="/?sort=newerpost">Inicio</a>
          </li>
          <li
            class="nav-item"
            :class="windowSearch.includes('sort=morecomments') ? 'active' : ''"
          >
            <a class="nav-link linker" href="/?sort=morecomments">Top</a>
          </li>
          <li
            class="nav-item"
            :class="windowSearch.includes('sort=newercomments') ? 'active' : ''"
          >
            <a class="nav-link linker" href="/?sort=newercomments">Recientes</a>
          </li>

          <li
            class="nav-item"
            :class="windowPathname.includes('tutorial') ? 'active' : ''"
          >
            <a class="nav-link linker" href="/tutorial">Como Usar</a>
          </li>
          <!--
          <li class="nav-item">
            <DarkModeSwitch></DarkModeSwitch>
          </li>
          -->
        </ul>
            <DarkModeSwitch></DarkModeSwitch>

        <button
          type="button"
          class="btn btn-lg btn-sm post-creation-button"
          :class="isDarkModeEnabled ? 'btn-dark' : 'btn-light'"
        >
          <ModalCreatePost>CREAR POST</ModalCreatePost>
        </button>
        <slot></slot>
      </b-collapse>

      <div style="display: flex">
        <b-dropdown
          v-if="loggedstate === true"
          size="sm"
          toggle-class="text-decoration-none"
          class="user-options"
          right
          :variant="isDarkModeEnabled ? 'dark' : 'light'"
        >
          <template #button-content>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 35.9 36"
              width="30"
              class="user-icon"
              style="display: inline-block"
            >
              <path
                d="M18 0a18 18 0 1 0 18 18A18 18 0 0 0 18 0Zm0 6c1.51 0 3.36 1.37 3.36 3a7.13 7.13 0 0 1-1.7 3.88 4.37 4.37 0 0 1-.68.68A1.66 1.66 0 0 1 18 14a1.67 1.67 0 0 1-1-.48 4.24 4.24 0 0 1-.67-.67A7.13 7.13 0 0 1 14.64 9c0-1.63 1.85-3 3.36-3Zm0 24c-4 0-8.73-1.15-8.73-4.41 0-2.95 3.19-8.76 6.53-10.89a3 3 0 0 0 4.4 0c3.34 2.13 6.53 7.94 6.53 10.89C26.73 28.85 22 30 18 30Z"
              />
            </svg>
            <span class="user-name">{{ usernameValue }}</span>
          </template>

          <b-dropdown-item>
            <ModalCreatePost>Crear Post</ModalCreatePost>
          </b-dropdown-item>
          <b-dropdown-item href="/pasaporte"
            >Loguearse en otro dispositivo</b-dropdown-item
          >
          <b-dropdown-item href="/perfil">Configuración</b-dropdown-item>
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item href="/reportar?type=Falla">Soporte</b-dropdown-item>
          <b-dropdown-item href="/reportar?type=Reporte"
            >Reportar</b-dropdown-item
          >
          <b-dropdown-item href="/reportar?type=Sugerencia"
            >Sugerir Cambios</b-dropdown-item
          >
          <b-dropdown-divider></b-dropdown-divider>
          <b-dropdown-item @click="cerrarSecion()"
            >Cerrar Sesión</b-dropdown-item
          >
        </b-dropdown>

        <ModalLogin v-else v-on:event_child="eventChild" />
        <b-navbar-toggle
          v-if="windowWidth > 300"
          class="navbar-toggler order-last order-md-0 collapsable-toggle"
          target="nav-collapse"
        ></b-navbar-toggle>
      </div>
    </nav>
  </div>
</template>

<script>
import { EventBus } from "../event-bus";
import swal from "sweetalert";
import axios from "axios";

axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

import ModalLogin from "./modals/ModalLogin";
import ModalCreatePost from "./modals/ModalCreatePost.vue";

global.jQuery = require("jquery");
var $ = global.jQuery;
window.$ = $;

import DarkModeSwitch from "./tools/DarkModeSwitch.vue";

import store from "../store";

export default {
  props: {
    appName: {
      required: true,
    },
  },
  name: "Header",
  components: {
    ModalLogin,
    ModalCreatePost,
    DarkModeSwitch,
  },
  data() {
    return {
      loggedstate: this.checkLocalStorage(
        localStorage.username,
        localStorage.password
      ),
      dev: false,
      check: false,
      isDarkModeEnabled: localStorage.getItem("darkMode") === "true",
      config: {
        // Get options from
        // https://alex-d.github.io/Trumbowyg/documentation
        tagsToRemove: ["script", "link"],
        removeformatPasted: false,
        imageWidthModalEdit: true,
        urlProtocol: true,

        btns: [
          ["formatting"],
          ["strong", "em", "del"],
          ["superscript", "subscript"],
          ["link"],
          ["insertImage"],
          ["justifyLeft", "justifyCenter", "justifyRight", "justifyFull"],
          ["unorderedList", "orderedList"],
          ["horizontalRule"],
          ["removeformat"],
        ],
      },
      windowHeight: null,
      windowWidth: window.innerWidth,
      windowPathname: window.location.pathname,
      windowSearch: window.location.search,
      appNamex: process.env.VUE_APP_NAME,
      isnotcargando: false,
      imagebase64: "",
      imageuploadedurl: "",
      remoteUrl: "",
      nuevoposttitulo: "",
      showPostModal: false,
      variants: [
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
        "info",
        "light",
        "dark",
      ],
      headerBgVariant: "dark",
      headerTextVariant: "light",
      bodyBgVariant: "light",
      bodyTextVariant: "dark",
      footerBgVariant: "warning",
      footerTextVariant: "dark",

      convertClicked: false,
      showModal: false,
      hcaptchatoken: "",
      jwt: "",
      credenciales: { username: "", password: "" },
      username: "",
      password: "",
      userid: "",
      loading: false,
      //loginurl:"http://mediawiki.test:8080/api/users"
      //loginurl: "http://localhost:3000/api/user/register",
      //loginurl: "https://agile-everglades-15507.herokuapp.com/api/user/register",
      loginurl: process.env.VUE_APP_API + "/api/user/register",
      //loginurl: "http://localhost:3000/api/user/register",
    };
  },
  mounted() {
    var css =
      "text-shadow: -1px -1px hsl(0,100%,50%), 1px 1px hsl(5.4, 100%, 50%), 3px 2px hsl(10.8, 100%, 50%), 5px 3px hsl(16.2, 100%, 50%), 7px 4px hsl(21.6, 100%, 50%), 9px 5px hsl(27, 100%, 50%), 11px 6px hsl(32.4, 100%, 50%), 13px 7px hsl(37.8, 100%, 50%), 14px 8px hsl(43.2, 100%, 50%), 16px 9px hsl(48.6, 100%, 50%), 18px 10px hsl(54, 100%, 50%), 20px 11px hsl(59.4, 100%, 50%), 22px 12px hsl(64.8, 100%, 50%), 23px 13px hsl(70.2, 100%, 50%), 25px 14px hsl(75.6, 100%, 50%), 27px 15px hsl(81, 100%, 50%), 28px 16px hsl(86.4, 100%, 50%), 30px 17px hsl(91.8, 100%, 50%), 32px 18px hsl(97.2, 100%, 50%), 33px 19px hsl(102.6, 100%, 50%), 35px 20px hsl(108, 100%, 50%), 36px 21px hsl(113.4, 100%, 50%), 38px 22px hsl(118.8, 100%, 50%), 39px 23px hsl(124.2, 100%, 50%), 41px 24px hsl(129.6, 100%, 50%), 42px 25px hsl(135, 100%, 50%), 43px 26px hsl(140.4, 100%, 50%), 45px 27px hsl(145.8, 100%, 50%), 46px 28px hsl(151.2, 100%, 50%), 47px 29px hsl(156.6, 100%, 50%), 48px 30px hsl(162, 100%, 50%), 49px 31px hsl(167.4, 100%, 50%), 50px 32px hsl(172.8, 100%, 50%), 51px 33px hsl(178.2, 100%, 50%), 52px 34px hsl(183.6, 100%, 50%), 53px 35px hsl(189, 100%, 50%), 54px 36px hsl(194.4, 100%, 50%), 55px 37px hsl(199.8, 100%, 50%), 55px 38px hsl(205.2, 100%, 50%), 56px 39px hsl(210.6, 100%, 50%), 57px 40px hsl(216, 100%, 50%), 57px 41px hsl(221.4, 100%, 50%), 58px 42px hsl(226.8, 100%, 50%), 58px 43px hsl(232.2, 100%, 50%), 58px 44px hsl(237.6, 100%, 50%), 59px 45px hsl(243, 100%, 50%), 59px 46px hsl(248.4, 100%, 50%), 59px 47px hsl(253.8, 100%, 50%), 59px 48px hsl(259.2, 100%, 50%), 59px 49px hsl(264.6, 100%, 50%), 60px 50px hsl(270, 100%, 50%), 59px 51px hsl(275.4, 100%, 50%), 59px 52px hsl(280.8, 100%, 50%), 59px 53px hsl(286.2, 100%, 50%), 59px 54px hsl(291.6, 100%, 50%), 59px 55px hsl(297, 100%, 50%), 58px 56px hsl(302.4, 100%, 50%), 58px 57px hsl(307.8, 100%, 50%), 58px 58px hsl(313.2, 100%, 50%), 57px 59px hsl(318.6, 100%, 50%), 57px 60px hsl(324, 100%, 50%), 56px 61px hsl(329.4, 100%, 50%), 55px 62px hsl(334.8, 100%, 50%), 55px 63px hsl(340.2, 100%, 50%), 54px 64px hsl(345.6, 100%, 50%), 53px 65px hsl(351, 100%, 50%), 52px 66px hsl(356.4, 100%, 50%), 51px 67px hsl(361.8, 100%, 50%), 50px 68px hsl(367.2, 100%, 50%), 49px 69px hsl(372.6, 100%, 50%), 48px 70px hsl(378, 100%, 50%), 47px 71px hsl(383.4, 100%, 50%), 46px 72px hsl(388.8, 100%, 50%), 45px 73px hsl(394.2, 100%, 50%), 43px 74px hsl(399.6, 100%, 50%), 42px 75px hsl(405, 100%, 50%), 41px 76px hsl(410.4, 100%, 50%), 39px 77px hsl(415.8, 100%, 50%), 38px 78px hsl(421.2, 100%, 50%), 36px 79px hsl(426.6, 100%, 50%), 35px 80px hsl(432, 100%, 50%), 33px 81px hsl(437.4, 100%, 50%), 32px 82px hsl(442.8, 100%, 50%), 30px 83px hsl(448.2, 100%, 50%), 28px 84px hsl(453.6, 100%, 50%), 27px 85px hsl(459, 100%, 50%), 25px 86px hsl(464.4, 100%, 50%), 23px 87px hsl(469.8, 100%, 50%), 22px 88px hsl(475.2, 100%, 50%), 20px 89px hsl(480.6, 100%, 50%), 18px 90px hsl(486, 100%, 50%), 16px 91px hsl(491.4, 100%, 50%), 14px 92px hsl(496.8, 100%, 50%), 13px 93px hsl(502.2, 100%, 50%), 11px 94px hsl(507.6, 100%, 50%), 9px 95px hsl(513, 100%, 50%), 7px 96px hsl(518.4, 100%, 50%), 5px 97px hsl(523.8, 100%, 50%), 3px 98px hsl(529.2, 100%, 50%), 1px 99px hsl(534.6, 100%, 50%), 7px 100px hsl(540, 100%, 50%), -1px 101px hsl(545.4, 100%, 50%), -3px 102px hsl(550.8, 100%, 50%), -5px 103px hsl(556.2, 100%, 50%), -7px 104px hsl(561.6, 100%, 50%), -9px 105px hsl(567, 100%, 50%), -11px 106px hsl(572.4, 100%, 50%), -13px 107px hsl(577.8, 100%, 50%), -14px 108px hsl(583.2, 100%, 50%), -16px 109px hsl(588.6, 100%, 50%), -18px 110px hsl(594, 100%, 50%), -20px 111px hsl(599.4, 100%, 50%), -22px 112px hsl(604.8, 100%, 50%), -23px 113px hsl(610.2, 100%, 50%), -25px 114px hsl(615.6, 100%, 50%), -27px 115px hsl(621, 100%, 50%), -28px 116px hsl(626.4, 100%, 50%), -30px 117px hsl(631.8, 100%, 50%), -32px 118px hsl(637.2, 100%, 50%), -33px 119px hsl(642.6, 100%, 50%), -35px 120px hsl(648, 100%, 50%), -36px 121px hsl(653.4, 100%, 50%), -38px 122px hsl(658.8, 100%, 50%), -39px 123px hsl(664.2, 100%, 50%), -41px 124px hsl(669.6, 100%, 50%), -42px 125px hsl(675, 100%, 50%), -43px 126px hsl(680.4, 100%, 50%), -45px 127px hsl(685.8, 100%, 50%), -46px 128px hsl(691.2, 100%, 50%), -47px 129px hsl(696.6, 100%, 50%), -48px 130px hsl(702, 100%, 50%), -49px 131px hsl(707.4, 100%, 50%), -50px 132px hsl(712.8, 100%, 50%), -51px 133px hsl(718.2, 100%, 50%), -52px 134px hsl(723.6, 100%, 50%), -53px 135px hsl(729, 100%, 50%), -54px 136px hsl(734.4, 100%, 50%), -55px 137px hsl(739.8, 100%, 50%), -55px 138px hsl(745.2, 100%, 50%), -56px 139px hsl(750.6, 100%, 50%), -57px 140px hsl(756, 100%, 50%), -57px 141px hsl(761.4, 100%, 50%), -58px 142px hsl(766.8, 100%, 50%), -58px 143px hsl(772.2, 100%, 50%), -58px 144px hsl(777.6, 100%, 50%), -59px 145px hsl(783, 100%, 50%), -59px 146px hsl(788.4, 100%, 50%), -59px 147px hsl(793.8, 100%, 50%), -59px 148px hsl(799.2, 100%, 50%), -59px 149px hsl(804.6, 100%, 50%), -60px 150px hsl(810, 100%, 50%), -59px 151px hsl(815.4, 100%, 50%), -59px 152px hsl(820.8, 100%, 50%), -59px 153px hsl(826.2, 100%, 50%), -59px 154px hsl(831.6, 100%, 50%), -59px 155px hsl(837, 100%, 50%), -58px 156px hsl(842.4, 100%, 50%), -58px 157px hsl(847.8, 100%, 50%), -58px 158px hsl(853.2, 100%, 50%), -57px 159px hsl(858.6, 100%, 50%), -57px 160px hsl(864, 100%, 50%), -56px 161px hsl(869.4, 100%, 50%), -55px 162px hsl(874.8, 100%, 50%), -55px 163px hsl(880.2, 100%, 50%), -54px 164px hsl(885.6, 100%, 50%), -53px 165px hsl(891, 100%, 50%), -52px 166px hsl(896.4, 100%, 50%), -51px 167px hsl(901.8, 100%, 50%), -50px 168px hsl(907.2, 100%, 50%), -49px 169px hsl(912.6, 100%, 50%), -48px 170px hsl(918, 100%, 50%), -47px 171px hsl(923.4, 100%, 50%), -46px 172px hsl(928.8, 100%, 50%), -45px 173px hsl(934.2, 100%, 50%), -43px 174px hsl(939.6, 100%, 50%), -42px 175px hsl(945, 100%, 50%), -41px 176px hsl(950.4, 100%, 50%), -39px 177px hsl(955.8, 100%, 50%), -38px 178px hsl(961.2, 100%, 50%), -36px 179px hsl(966.6, 100%, 50%), -35px 180px hsl(972, 100%, 50%), -33px 181px hsl(977.4, 100%, 50%), -32px 182px hsl(982.8, 100%, 50%), -30px 183px hsl(988.2, 100%, 50%), -28px 184px hsl(993.6, 100%, 50%), -27px 185px hsl(999, 100%, 50%), -25px 186px hsl(1004.4, 100%, 50%), -23px 187px hsl(1009.8, 100%, 50%), -22px 188px hsl(1015.2, 100%, 50%), -20px 189px hsl(1020.6, 100%, 50%), -18px 190px hsl(1026, 100%, 50%), -16px 191px hsl(1031.4, 100%, 50%), -14px 192px hsl(1036.8, 100%, 50%), -13px 193px hsl(1042.2, 100%, 50%), -11px 194px hsl(1047.6, 100%, 50%), -9px 195px hsl(1053, 100%, 50%), -7px 196px hsl(1058.4, 100%, 50%), -5px 197px hsl(1063.8, 100%, 50%), -3px 198px hsl(1069.2, 100%, 50%), -1px 199px hsl(1074.6, 100%, 50%), -1px 200px hsl(1080, 100%, 50%), 1px 201px hsl(1085.4, 100%, 50%), 3px 202px hsl(1090.8, 100%, 50%), 5px 203px hsl(1096.2, 100%, 50%), 7px 204px hsl(1101.6, 100%, 50%), 9px 205px hsl(1107, 100%, 50%), 11px 206px hsl(1112.4, 100%, 50%), 13px 207px hsl(1117.8, 100%, 50%), 14px 208px hsl(1123.2, 100%, 50%), 16px 209px hsl(1128.6, 100%, 50%), 18px 210px hsl(1134, 100%, 50%), 20px 211px hsl(1139.4, 100%, 50%), 22px 212px hsl(1144.8, 100%, 50%), 23px 213px hsl(1150.2, 100%, 50%), 25px 214px hsl(1155.6, 100%, 50%), 27px 215px hsl(1161, 100%, 50%), 28px 216px hsl(1166.4, 100%, 50%), 30px 217px hsl(1171.8, 100%, 50%), 32px 218px hsl(1177.2, 100%, 50%), 33px 219px hsl(1182.6, 100%, 50%), 35px 220px hsl(1188, 100%, 50%), 36px 221px hsl(1193.4, 100%, 50%), 38px 222px hsl(1198.8, 100%, 50%), 39px 223px hsl(1204.2, 100%, 50%), 41px 224px hsl(1209.6, 100%, 50%), 42px 225px hsl(1215, 100%, 50%), 43px 226px hsl(1220.4, 100%, 50%), 45px 227px hsl(1225.8, 100%, 50%), 46px 228px hsl(1231.2, 100%, 50%), 47px 229px hsl(1236.6, 100%, 50%), 48px 230px hsl(1242, 100%, 50%), 49px 231px hsl(1247.4, 100%, 50%), 50px 232px hsl(1252.8, 100%, 50%), 51px 233px hsl(1258.2, 100%, 50%), 52px 234px hsl(1263.6, 100%, 50%), 53px 235px hsl(1269, 100%, 50%), 54px 236px hsl(1274.4, 100%, 50%), 55px 237px hsl(1279.8, 100%, 50%), 55px 238px hsl(1285.2, 100%, 50%), 56px 239px hsl(1290.6, 100%, 50%), 57px 240px hsl(1296, 100%, 50%), 57px 241px hsl(1301.4, 100%, 50%), 58px 242px hsl(1306.8, 100%, 50%), 58px 243px hsl(1312.2, 100%, 50%), 58px 244px hsl(1317.6, 100%, 50%), 59px 245px hsl(1323, 100%, 50%), 59px 246px hsl(1328.4, 100%, 50%), 59px 247px hsl(1333.8, 100%, 50%), 59px 248px hsl(1339.2, 100%, 50%), 59px 249px hsl(1344.6, 100%, 50%), 60px 250px hsl(1350, 100%, 50%), 59px 251px hsl(1355.4, 100%, 50%), 59px 252px hsl(1360.8, 100%, 50%), 59px 253px hsl(1366.2, 100%, 50%), 59px 254px hsl(1371.6, 100%, 50%), 59px 255px hsl(1377, 100%, 50%), 58px 256px hsl(1382.4, 100%, 50%), 58px 257px hsl(1387.8, 100%, 50%), 58px 258px hsl(1393.2, 100%, 50%), 57px 259px hsl(1398.6, 100%, 50%), 57px 260px hsl(1404, 100%, 50%), 56px 261px hsl(1409.4, 100%, 50%), 55px 262px hsl(1414.8, 100%, 50%), 55px 263px hsl(1420.2, 100%, 50%), 54px 264px hsl(1425.6, 100%, 50%), 53px 265px hsl(1431, 100%, 50%), 52px 266px hsl(1436.4, 100%, 50%), 51px 267px hsl(1441.8, 100%, 50%), 50px 268px hsl(1447.2, 100%, 50%), 49px 269px hsl(1452.6, 100%, 50%), 48px 270px hsl(1458, 100%, 50%), 47px 271px hsl(1463.4, 100%, 50%), 46px 272px hsl(1468.8, 100%, 50%), 45px 273px hsl(1474.2, 100%, 50%), 43px 274px hsl(1479.6, 100%, 50%), 42px 275px hsl(1485, 100%, 50%), 41px 276px hsl(1490.4, 100%, 50%), 39px 277px hsl(1495.8, 100%, 50%), 38px 278px hsl(1501.2, 100%, 50%), 36px 279px hsl(1506.6, 100%, 50%), 35px 280px hsl(1512, 100%, 50%), 33px 281px hsl(1517.4, 100%, 50%), 32px 282px hsl(1522.8, 100%, 50%), 30px 283px hsl(1528.2, 100%, 50%), 28px 284px hsl(1533.6, 100%, 50%), 27px 285px hsl(1539, 100%, 50%), 25px 286px hsl(1544.4, 100%, 50%), 23px 287px hsl(1549.8, 100%, 50%), 22px 288px hsl(1555.2, 100%, 50%), 20px 289px hsl(1560.6, 100%, 50%), 18px 290px hsl(1566, 100%, 50%), 16px 291px hsl(1571.4, 100%, 50%), 14px 292px hsl(1576.8, 100%, 50%), 13px 293px hsl(1582.2, 100%, 50%), 11px 294px hsl(1587.6, 100%, 50%), 9px 295px hsl(1593, 100%, 50%), 7px 296px hsl(1598.4, 100%, 50%), 5px 297px hsl(1603.8, 100%, 50%), 3px 298px hsl(1609.2, 100%, 50%), 1px 299px hsl(1614.6, 100%, 50%), 2px 300px hsl(1620, 100%, 50%), -1px 301px hsl(1625.4, 100%, 50%), -3px 302px hsl(1630.8, 100%, 50%), -5px 303px hsl(1636.2, 100%, 50%), -7px 304px hsl(1641.6, 100%, 50%), -9px 305px hsl(1647, 100%, 50%), -11px 306px hsl(1652.4, 100%, 50%), -13px 307px hsl(1657.8, 100%, 50%), -14px 308px hsl(1663.2, 100%, 50%), -16px 309px hsl(1668.6, 100%, 50%), -18px 310px hsl(1674, 100%, 50%), -20px 311px hsl(1679.4, 100%, 50%), -22px 312px hsl(1684.8, 100%, 50%), -23px 313px hsl(1690.2, 100%, 50%), -25px 314px hsl(1695.6, 100%, 50%), -27px 315px hsl(1701, 100%, 50%), -28px 316px hsl(1706.4, 100%, 50%), -30px 317px hsl(1711.8, 100%, 50%), -32px 318px hsl(1717.2, 100%, 50%), -33px 319px hsl(1722.6, 100%, 50%), -35px 320px hsl(1728, 100%, 50%), -36px 321px hsl(1733.4, 100%, 50%), -38px 322px hsl(1738.8, 100%, 50%), -39px 323px hsl(1744.2, 100%, 50%), -41px 324px hsl(1749.6, 100%, 50%), -42px 325px hsl(1755, 100%, 50%), -43px 326px hsl(1760.4, 100%, 50%), -45px 327px hsl(1765.8, 100%, 50%), -46px 328px hsl(1771.2, 100%, 50%), -47px 329px hsl(1776.6, 100%, 50%), -48px 330px hsl(1782, 100%, 50%), -49px 331px hsl(1787.4, 100%, 50%), -50px 332px hsl(1792.8, 100%, 50%), -51px 333px hsl(1798.2, 100%, 50%), -52px 334px hsl(1803.6, 100%, 50%), -53px 335px hsl(1809, 100%, 50%), -54px 336px hsl(1814.4, 100%, 50%), -55px 337px hsl(1819.8, 100%, 50%), -55px 338px hsl(1825.2, 100%, 50%), -56px 339px hsl(1830.6, 100%, 50%), -57px 340px hsl(1836, 100%, 50%), -57px 341px hsl(1841.4, 100%, 50%), -58px 342px hsl(1846.8, 100%, 50%), -58px 343px hsl(1852.2, 100%, 50%), -58px 344px hsl(1857.6, 100%, 50%), -59px 345px hsl(1863, 100%, 50%), -59px 346px hsl(1868.4, 100%, 50%), -59px 347px hsl(1873.8, 100%, 50%), -59px 348px hsl(1879.2, 100%, 50%), -59px 349px hsl(1884.6, 100%, 50%), -60px 350px hsl(1890, 100%, 50%), -59px 351px hsl(1895.4, 100%, 50%), -59px 352px hsl(1900.8, 100%, 50%), -59px 353px hsl(1906.2, 100%, 50%), -59px 354px hsl(1911.6, 100%, 50%), -59px 355px hsl(1917, 100%, 50%), -58px 356px hsl(1922.4, 100%, 50%), -58px 357px hsl(1927.8, 100%, 50%), -58px 358px hsl(1933.2, 100%, 50%), -57px 359px hsl(1938.6, 100%, 50%), -57px 360px hsl(1944, 100%, 50%), -56px 361px hsl(1949.4, 100%, 50%), -55px 362px hsl(1954.8, 100%, 50%), -55px 363px hsl(1960.2, 100%, 50%), -54px 364px hsl(1965.6, 100%, 50%), -53px 365px hsl(1971, 100%, 50%), -52px 366px hsl(1976.4, 100%, 50%), -51px 367px hsl(1981.8, 100%, 50%), -50px 368px hsl(1987.2, 100%, 50%), -49px 369px hsl(1992.6, 100%, 50%), -48px 370px hsl(1998, 100%, 50%), -47px 371px hsl(2003.4, 100%, 50%), -46px 372px hsl(2008.8, 100%, 50%), -45px 373px hsl(2014.2, 100%, 50%), -43px 374px hsl(2019.6, 100%, 50%), -42px 375px hsl(2025, 100%, 50%), -41px 376px hsl(2030.4, 100%, 50%), -39px 377px hsl(2035.8, 100%, 50%), -38px 378px hsl(2041.2, 100%, 50%), -36px 379px hsl(2046.6, 100%, 50%), -35px 380px hsl(2052, 100%, 50%), -33px 381px hsl(2057.4, 100%, 50%), -32px 382px hsl(2062.8, 100%, 50%), -30px 383px hsl(2068.2, 100%, 50%), -28px 384px hsl(2073.6, 100%, 50%), -27px 385px hsl(2079, 100%, 50%), -25px 386px hsl(2084.4, 100%, 50%), -23px 387px hsl(2089.8, 100%, 50%), -22px 388px hsl(2095.2, 100%, 50%), -20px 389px hsl(2100.6, 100%, 50%), -18px 390px hsl(2106, 100%, 50%), -16px 391px hsl(2111.4, 100%, 50%), -14px 392px hsl(2116.8, 100%, 50%), -13px 393px hsl(2122.2, 100%, 50%), -11px 394px hsl(2127.6, 100%, 50%), -9px 395px hsl(2133, 100%, 50%), -7px 396px hsl(2138.4, 100%, 50%), -5px 397px hsl(2143.8, 100%, 50%), -3px 398px hsl(2149.2, 100%, 50%), -1px 399px hsl(2154.6, 100%, 50%); font-size: 40px;";

    //console.log("%cAnoringa.win %s", css, 'Hola Desarrolador!');
    console.log("%cAnoringa.win", css);
    //https://stackoverflow.com/questions/7505623/colors-in-javascript-console
    console.log("%c Hola Desarrolador! ", "background: #222; color: #bada55");
    console.log(
      "%c Si quieres ver el codigo fuente de Anoringa dirijete a:",
      "background: #222; color: #bada55"
    );
    console.log("https://github.com/Anoringa");

    window.addEventListener("resize", () => {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    });

    if (this.loggedstate) {
      //https://es.vuejs.org/v2/guide/conditional.html
      console.log("user has been logged previusly");
      this.username = localStorage.username;
      this.password = localStorage.password;
      this.userid = localStorage.userid;
    } else {
      console.log("user needs to log in");
    }

    console.log(
      "is dev: ",
      process.env.VUE_APP_NAME.toLowerCase().includes("dev")
    );

    this.dev = process.env.VUE_APP_NAME.toLowerCase().includes("dev");

    window.addEventListener("toggleDarkMode", () => {
      this.isDarkModeEnabled = localStorage.getItem("darkMode") === "true";
    });

    window.addEventListener("userDataEvent", (event) => {
      console.log("username localStorage change");
      console.log(event);
      console.log(this.loggedstate);
      console.log("localStorage");
      console.log(localStorage);
      this.loggedstate = this.checkLocalStorage(
        localStorage.username,
        localStorage.password
      );
      /*
      if (event.logged) {
        console.log(this.checkLocalStorage(localStorage.username, localStorage.password))
        this.loggedstate = event.logged;
      } else {
        this.loggedstate = event.logged;
      }
      */
    });
  },
  watch: {
    /*
    hcaptchatoken(newName) {
      localStorage.hcaptchatoken = newName;
    },*/
    username(newName) {
      localStorage.username = newName;
    },
    password(newName) {
      localStorage.password = newName;
    },
    userid(newName) {
      localStorage.userid = newName;
    },
  },
  computed: {
    /*
    loggedstate() {
    },
    */

    usernameValue() {
      return this.$store.state.username;
      //return localStorage.username;
    },

    postPhotoValue() {
      return this.$store.state.postImage;
    },
    postContentTextValue() {
      return this.$store.state.postContentText;
    },
    postPhotoLinkValue() {
      return this.$store.state.postPhotoLink;
    },
  },
  methods: {
    checkLocalStorage(myUsername, myPassword) {
      console.log("checkLocalStorage", myUsername, myPassword);
      if (
        myUsername &&
        myPassword &&
        /*
        localStorage.username != null &&
        localStorage.password != null &&
        localStorage.username != false &&
        localStorage.password != false &&
        */
        myUsername != "" &&
        myPassword != ""
      ) {
        return true;
      } else {
        return false;
      }
    },
    increment() {
      console.log("incrementing");

      store.commit("increment");
      console.log(store.state.count);
    },
    // Gets the checkbox information from the child component
    checkboxValue: function (params) {
      console.log("html text params");
      console.log(params);
      this.check = params;
      return params;
    },

    handleImage(e) {
      const selectedImage = e.target.files[0]; // get first file
      this.createBase64Image(selectedImage);
    },
    createBase64Image(fileObject) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagebase64 = e.target.result;
        console.log("this.image");
        console.log(this.imagebase64);
      };
      reader.readAsDataURL(fileObject);
    },
    setImageUploadedUrl(nameurl) {
      this.imageuploadedurl = nameurl;
    },
    uploadImage() {
      const { image } = this;
      axios
        .post("http://127.0.0.1:8081/upload", { image })
        .then((response) => {
          this.remoteUrl = response.data.url;
        })
        .catch((err) => {
          return new Error(err.message);
        });
    },
    postCreate(titulox, contenidox, photox) {
      /*
      {
        "username":"Afoxipeb",
        "password":"JJAsjChPvmwvc2qOcRpMoJnogtv9jcQe",
        "title":"Como ser como one punch man",
        "photo":"somepick",
        "content":"hola mundo este es mi nuevo blog"
      }
      */

      var data = {
        title: titulox,
        description: contenidox,
        _id: localStorage.userid,
        username: localStorage.username,
        password: localStorage.password,
        photo: photox,
      };

      this.$socket.emit("post", data, function (datos) {
        console.log("socket.io emit");
        console.log(datos);
        EventBus.$emit("sendPostP2P", "datos", datos);
        console.log("redirecting to the post");

        window.location.href = "./post/" + datos._id;
        return datos;
      });
    },
    toggleBind(attr) {
      this[attr] = !this[attr];
    },
    openForm() {
      this.showPostModal = true;
    },
    eventChild: function (content_from_child) {
      console.log("Event from child component emitted", content_from_child);
      this.hcaptchatoken = content_from_child;
      this.userCreate(this.hcaptchatoken);
    },
    clickConvert() {},
    convert() {},

    userStore(response) {
      console.log("User Created", response);
      var credenciales = response.data.data;
      this.username = credenciales.username;
      this.password = credenciales.password;
      this.userid = credenciales._id;

      this.credenciales["username"] = credenciales.username;
      this.credenciales["password"] = credenciales.password;
      console.log("credencial", this.credenciales);
      store.commit("SET_PRODUCTS", this.credenciales);
      dispatchEvent(new Event("userDataEvent"));

      console.log("RELOAD");
      window.location.reload(true);
    },
    userCreate(hcaptchatoken) {
      var params = new URLSearchParams();
      params.append("token", hcaptchatoken);

      axios
        .post(this.loginurl, params)
        .then((response) => this.userStore(response))
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log("Error", error.message);
          }
          console.log(error.config);
        });
    },

    cerrarSecion() {
      console.log("deslogueo");
      localStorage.username = "";
      localStorage.password = "";
      localStorage.userid = "";
      this.username = "";
      this.password = "";
      this.userid = "";

      let event = new Event("userDataEvent");

      dispatchEvent(event);
    },
    openCreatePostModal() {
      swal({
        title: "Log In to Continue",
        html: true,
        text: "Username: <input type='text'><br>Password: <input type='password'>",
      });
    },
    clicked() {
      window.location.href = "/";
    },
    openModal() {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this imaginary file!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          console.log("LOGGED IN");

          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
        } else {
          console.log("NOT LOGGED IN");
          swal("Your imaginary file is safe!");
        }
      });
    },
  },
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Sen&display=swap");
@import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200;300;400;500;600;700;800&family=Open+Sans&display=swap");
@import url("https://fonts.googleapis.com/css?family=Overpass+Mono:300,400,600,700|Overpass:100,100i,200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i&subset=latin-ext");

$dark: #555;
$light: #fff;

.nav {
  list-style: none;
  margin-left: 0;
  margin-bottom: 0;
  padding-left: 0;
}

.nav > li,
.nav > li > a {
  display: inline-block;
  *display: inline;
  zoom: 1;
}
.linker {
  padding: 0px;
  margin: 0px;
}

html,
body {
  font-family: "Open Sans", sans-serif;
}

.top-navbar {
  @include dynamic-theme() {
    background-color: theme($primary-color);
  }
  z-index: 300;
}

.app-name-label {
  margin-right: 7px;

  @include dynamic-theme() {
    color: theme($normal-background-color);
  }
}
.loguito {
  font-family: "Manrope", sans-serif;
  font-weight: 700;
  font-size: 28px;
  font-weight: m;
  text-decoration: none;
  color: #212529;
}
.page-logo {
  display: inline-block;
  margin-right: 5px;
}

.collapsed-nav li,
.collapsed-nav button {
  margin: 10px 0 0 0;
}
.collapsed-nav {
  align-items: center;
  justify-content: center;
  padding-bottom: 10px;
}
.collapsable-toggle {
  margin-left: 7px;
}

.user-icon {
  display: inline-block;

  @include dynamic-theme() {
    fill: theme($primary-light-color);
  }
}
.user-name {
  @include dynamic-theme() {
    color: theme($foreground-color);
  }
}

.user-options button {
  height: 40px;
}
.user-options span {
  padding: 0 15px;
  box-sizing: border-box;
  vertical-align: middle;
  color: $dark;

  &:active,
  &focus {
    color: $dark;
  }
}

.user-options img {
  display: inline-block;
  vertical-align: middle;
}

.post-creation-button {
  margin-left: 15px;
}

.badge {
  padding: 2px 4px;
  line-height: 1rem;
  font-size: 0.875rem;
  position: relative;
  border-radius: 20px;
  padding: 2px 11px;
  font-size: 12px;
  vertical-align: middle;

  @include dynamic-theme() {
    color: theme($primary-color);
    background-color: theme($normal-background-color);
  }
}
</style>
