<template>
  <div
    :class="!powerOn ? 'default_background' : 'power_on_background'"
    class="h-full lg:overflow-hidden transition-all lg:h-screen flex items-center justify-center"
    id="app"
  >
    <div v-show="ready"
      class="grid z-10 grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3 max-h-full max-w-2xl mx-auto"
      id="container"
    >
      <div
        class="icon-animation power-icon"
        @click="() => (powerOn = !powerOn)"
      >
        <img v-show="powerOn" :src="powerIcon.onIcon" />
        <img v-show="!powerOn" :src="powerIcon.offIcon" />
      </div>

      <div
        :id="'icon_' + index"
        v-for="(icon, index) in icons"
        :key="icon.name"
        class="icon-animation device-icon"
        @click="switchDevicesPower(index)"
      >
        <img v-show="icon.on" :src="icon.onIcon" />
        <img v-show="!icon.on" :src="icon.offIcon" />
      </div>
      <!-- <img
        
        :id="'icon_' + index"
        v-for="(icon, index) in icons"
        :key="icon.name"
        @click="switchDevicesPower(index)"
        :src="icon.on ? icon.onIcon : icon.offIcon"
      /> -->
    </div>

    <!-- <div id="animated-background" class="lg:h-screen z-0 w-full transform scale-0 rounded-full  power_on_background h-full fixed"></div> -->
  </div>
</template>

<script>
import PowerOffIcon from "@/assets/img/icons/power_off.png";
import PowerOnIcon from "@/assets/img/icons/power_on.png";

import LampOffIcon from "@/assets/img/icons/lamp_off.png";
import LampOnIcon from "@/assets/img/icons/lamp_on.png";

import HarddriveOffIcon from "@/assets/img/icons/harddrive_off.png";
import HarddriveOnIcon from "@/assets/img/icons/harddrive_on.png";

import iMacOffIcon from "@/assets/img/icons/iMac_off.png";
import iMacOnIcon from "@/assets/img/icons/iMac_on.png";

import CameraOffIcon from "@/assets/img/icons/camera_off.png";
import CameraOnIcon from "@/assets/img/icons/camera_on.png";

import iPhoneOffIcon from "@/assets/img/icons/iPhone_off.png";
import iPhoneOnIcon from "@/assets/img/icons/iPhone_on.png";

import switchOffIcon from "@/assets/img/icons/switch_off.png";
import switchOnIcon from "@/assets/img/icons/switch_on.png";

import appleWatchOn from "@/assets/img/icons/applewatch_on.png";
import appleWatchOff from "@/assets/img/icons/applewatch_off.png";

import airPodsOn from "@/assets/img/icons/airpods_on.png";
import airPodsOff from "@/assets/img/icons/airpods_off.png";

import PowerOnSound from "@/assets/sound/power_on.mp3";
import OffSound from "@/assets/sound/off.mp3";
import noPowerSound from "@/assets/sound/no_power.mp3";
import lampOnSound from "@/assets/sound/lamp_on.mp3";
import macOnSound from "@/assets/sound/mac-os9-boot-sound.wav";
import cameraOnSound from "@/assets/sound/camera_on.mp3";
import switchOnSound from "@/assets/sound/switch_on.mp3";
import airpodsOnSound from "@/assets/sound/airpods_on.mp3";
import appleWatchOnSound from "@/assets/sound/applewatch_on.mp3";
import iPhoneOnSound from "@/assets/sound/iPhone_on.mp3";
import harddriveOnSound from "@/assets/sound/harddrive_on.mp3";
import { TweenMax } from "gsap";
var imagesLoaded = require('imagesloaded')

export default {
  name: "App",
  components: {},
  data() {
    return {
      ready: false,
      powerOn: false,
      lampOn: false,
      noPowerAttempts: 0,
      hintAnimating: false,
      harddriveOn: false,
      load: 0,
      powerIcon: {
        onIcon: PowerOnIcon,
        offIcon: PowerOffIcon
      },
      powerOnSound: new Audio(PowerOnSound),
      offSound: new Audio(OffSound),
      noPowerSound: new Audio(noPowerSound),
      icons: [
        {
          name: "lamp",
          on: false,

          onIcon: LampOnIcon,
          offIcon: LampOffIcon,
          onSound: new Audio(lampOnSound),
          // sfx: new Audio()
        },
        {
          name: "harddrive",
          on: false,
          onIcon: HarddriveOnIcon,
          offIcon: HarddriveOffIcon,
          onSound: new Audio(harddriveOnSound),
        },
        {
          name: "iMac",
          on: false,
          offIcon: iMacOffIcon,
          onIcon: iMacOnIcon,
          onSound: new Audio(macOnSound),
        },
        {
          name: "camera",
          on: false,
          onIcon: CameraOnIcon,
          offIcon: CameraOffIcon,
          onSound: new Audio(cameraOnSound),
        },
        {
          name: "iPhone",
          on: false,
          onIcon: iPhoneOnIcon,
          offIcon: iPhoneOffIcon,
          onSound: new Audio(iPhoneOnSound),
        },
        {
          name: "Switch",
          on: false,
          onIcon: switchOnIcon,
          offIcon: switchOffIcon,
          onSound: new Audio(switchOnSound),
        },
        {
          name: "AppleWatch",
          on: false,
          onIcon: appleWatchOn,
          offIcon: appleWatchOff,
          onSound: new Audio(appleWatchOnSound),
        },
        {
          name: "Airpods",
          on: false,
          onIcon: airPodsOn,
          offIcon: airPodsOff,
          onSound: new Audio(airpodsOnSound),
        },
      ],
    };
  },
  methods: {
    switchDevicesPower(deviceId) {
      if (!this.powerOn) {
        this.noPowerSound.play();
        // GSAP ANIMATION
        TweenMax.to("#icon_" + deviceId.toString(), 0.04, {
          x: "-=10",
          yoyo: true,
          repeat: 5,
          onComplete: () => {
            TweenMax.to("#icon_" + deviceId.toString(), 0, {
              x: "0",
            });
          },
        });

        this.noPowerAttempts++;
        if (this.noPowerAttempts >= 3) {
          if (!this.hintAnimating) {
            this.hintAnimating = true;
            TweenMax.from(".power-icon", 0.5, {
              scale: 1.2,
              repeat: 3,

              yoyo: true,
              ease: "power1.inOut",
              onComplete: () => {
                TweenMax.to(".power-icon", 0, {
                  scale: 1,
                });
                this.hintAnimating = false;
              },
            });
          }
        }

        return;
      }
      this.icons[deviceId].on = !this.icons[deviceId].on;
      if (this.icons[deviceId].on) {
        if (this.icons[deviceId].onSound) {
          this.icons[deviceId].onSound.cloneNode().play();
        }
        TweenMax.to("#icon_" + deviceId.toString(), 0.4, {
          scale: 1,
        });
      } else {
        TweenMax.to("#icon_" + deviceId.toString(), 0.4, {
          scale: 0.9,
        });
        this.offSound.play();
      }
    },
  },
  watch: {
    powerOn(on) {
      if (on) {
        TweenMax.to(".icon-animation", 0.4, {
          scale: 0.9,
        });
        this.noPowerAttempts = 0;
        this.powerOnSound.play();
        // TweenMax.to('#animated-background',0.4 ,{
        //   scale: 2
        // })
      }
      
      if (!on) {
        TweenMax.to(".icon-animation", 0.4, {
          scale: 1,
        });
        this.icons.forEach((icon) => {
          icon.on = false;
        });
        this.noPowerAttempts = 0;
        this.offSound.play();
        // TweenMax.to('#animated-background',0.4 ,{
        //   scale: 2
        // })
      }
    },
  },
  mounted() {
    this.powerOnSound.load();
    this.offSound.load();
    this.icons.forEach((icon) => {
      icon.onSound.load();
    });
    imagesLoaded('#container',()=> {
      this.ready = true
      TweenMax.from(".icon-animation", {
      delay: 0.3,
      scale: 0.1,
      opacity: 0.1,
      y: 40,
      ease: "power1.inOut",
      stagger: {
        grid: [3, 3],
        from: 0,
        amount: 0.3,
      },
    });
    })
    
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.default_background {
  background: #e3e3e3;
}

.power_on_background {
  background: #050931;
}

#container img {
  cursor: pointer;
  -webkit-filter: brightness(100%);
  // transition: 0.3s ease;
}

#container img:hover {
  -webkit-filter: brightness(90%);
}
</style>
