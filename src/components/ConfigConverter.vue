<script>
import { saveAs } from 'file-saver';
import Config from './Config.vue'
import UploadIcon from './icons/IconUpload.vue'
import DownloadIcon from './icons/IconDownload.vue'
export default {
  props: {
    commands: {
      type: Array,
      required: true,
    },
    bind_keys: {
      type: Array,
      required: true,
    },
    bind_values: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      upload: '',
      copyText: 'Click to Copy',
    }
  },
  components: {
    Config,
    UploadIcon,
    DownloadIcon,
  },
  computed: {
    download() {
      return this.migrateConfig(this.upload);
    },
  },
  methods: {
    copy() {
      this.$refs.copy.focus();
      document.execCommand('copy');
      this.copyText = 'Copied!';
      setTimeout(() => {
        this.copyText = 'Click to Copy';
      }, 2000);
    },
    migrateConfig(cfg) {
      this.commands.forEach((cmd) => {
        if (cmd.new !== null && 'default' in cmd) {
          // replace command line with new command & default value
          let rex = new RegExp(`^${cmd.old} .*$`, 'gmi')
          cfg = cfg.replace(rex, `${cmd.new} "${cmd.default}"`)
        } else if (cmd.new !== null) {
          // replace with new command
          cfg = cfg.replaceAll(cmd.old, cmd.new)
        } else {
          // remove command line entirely
          // space after command is important
          // for similar commands
          let rex = new RegExp(`^${cmd.old} .*$`, 'gmi')
          cfg = cfg.replace(rex, "")
        }
      })

      this.bind_keys.forEach((bind) => {
        if (bind.new !== null) {
          // replace bind key with new key name
          let rex = new RegExp(`^bind \"\?${bind.old}\"\?`, 'gmi')
          cfg = cfg.replace(rex, `bind "${bind.new}"`)
        } else {
          // remove bind line entirely
          // TODO notify user
          let rex = new RegExp(`^bind \"\?${bind.old}\"\? .*$`, 'gmi')
          cfg = cfg.replace(rex, "")
        }
      })

      this.bind_values.forEach((v) => {
        if (v.new !== null) {
          // replace bind value with new value
          cfg = cfg.replaceAll(v.old, v.new)
        } else {
          // remove bind line entirely
          // TODO notify user
          let rex = new RegExp(`^bind \"\?(.+)\"\? \"\?${v.old}\"\? .*$`, 'gmi')
          cfg = cfg.replace(rex, "")
        }
      })

      // remove empty lines
      cfg = cfg.replace(/(^[ \t]*\n)/gmi, "")
      return cfg
    },
    downloadConfig() {
      const fileToSave = new Blob([this.upload], {
        type: 'text/plain',
      });
      saveAs(fileToSave, 'cs2.cfg');
    },
    uploadConfig() {
      document.getElementById("fileUpload").click()
    },
    setConfig() {
      const cfg = this.$refs.fileUpload.files[0]
      const reader = new FileReader();
      reader.onload = (res) => {
        this.upload = res.target.result;
      };
      reader.onerror = (err) => console.log(err);
      reader.readAsText(cfg);
    }
  },
};
</script>

<template>
  <Config :active="upload === ''">
    <template #icon>
      <UploadIcon :class="upload === '' ? 'active' : ''" @click="uploadConfig()" />
    </template>
    <template #heading>Paste CSGO Config</template>
    <textarea v-model="upload" class="config"></textarea>
    <input ref="fileUpload" id="fileUpload" type="file" hidden @change="setConfig()">
  </Config>

  <Config :active="upload !== ''">
    <template #icon>
      <DownloadIcon :class="upload !== '' ? 'active' : ''" @click="downloadConfig()" />
    </template>
    <template #heading>Copy CS2 Config</template>
    <Diff class="copy" @click="copy()" mode="unified" theme="dark" language="plaintext" :prev="upload" :current="download"
      :virtual-scroll="{ height: 250, lineMinHeight: 24, delay: 100 }" />
    <input v-on:focus="$event.target.select()" ref="copy" readonly :value="download" hidden />
    <p>{{ download !== '' ? copyText : '&nbsp' }}</p>
  </Config>
</template>
<style scoped>
.config {
  width: 500px;
  height: 150px;
  transition-duration: 2000ms;
}

.active {
  color: hsla(160, 100%, 37%, 1);
  transition-duration: 2000ms;
}

svg:hover, .copy:hover {
  cursor: pointer;
}
</style>
