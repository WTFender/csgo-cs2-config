<script setup>
import BigText from './components/BigText.vue'
import ConfigConverter from './components/ConfigConverter.vue'

// old: the csgo command to replace
// new: the cs2 command to replace with
// default: the default value for the cs2 command, if the
//          value type has changed, the default will be set

const commands = [
  { old: 'ai_report_task_timings_on_limit', new: null },
  { old: 'ai_think_limit_label', new: null },
  { old: 'budget_averages_window', new: null },
  { old: 'budget_background_alpha', new: null },
  { old: 'budget_bargraph_background_alpha', new: null },
  { old: 'budget_bargraph_range_ms', new: null },
  { old: 'budget_history_numsamplesvisible', new: null },
  { old: 'budget_history_range_ms', new: null },
  { old: 'budget_panel_bottom_of_history_fraction', new: null },
  { old: 'budget_panel_height', new: null },
  { old: 'budget_panel_width', new: null },
  { old: 'budget_panel_x', new: null },
  { old: 'budget_panel_y', new: null },
  { old: 'budget_peaks_window', new: null },
  { old: 'budget_show_averages', new: null },
  { old: 'budget_show_history', new: null },
  { old: 'budget_show_peaks', new: null },
  { old: 'bugreporter_uploadasync', new: null },
  { old: 'bugreporter_username', new: null },
  { old: 'cam_idealdistright', new: null },
  { old: 'cam_idealdistup', new: null },
  { old: 'cc_predisplay_time', new: null },
  { old: 'chet_debug_idle', new: null },
  { old: 'cl_allowdownload', new: null },
  { old: 'cl_allowupload', new: null },
  { old: 'cl_autowepswitch', new: null },
  { old: 'cl_bob_lower_amt', new: null },
  { old: 'cl_bobamt_lat', new: null },
  { old: 'cl_bobamt_vert', new: null },
  { old: 'cl_bobcycle', new: null },
  { old: 'skill', new: null },
  { old: 'voice_enable', new: 'sv_voiceenable', default: 'true' }
]

const bind_keys = [
  // slot6: he, slot7: flash, slot8: smoke, slot9: decoy, slot10: molly
]

const bind_values = [
  // slot6: he, slot7: flash, slot8: smoke, slot9: decoy, slot10: molly
  { old: '+speed', new: '+sprint' }
]
const issueUrl = 'https://github.com/WTFender/csgo-cs2-config/issues/new'
</script>

<template>
  <header>
    <div class="wrapper">
      <BigText class="big-text" msg="CSGO Config Path" path="C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\csgo\cfg" />
      <BigText class="big-text" msg="CS2 Config Path" path="C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg" />
      <BigText class="big-text link" msg="Missing Commands?" :issueUrl="issueUrl" />
    </div>
  </header>

  <main>
    <ConfigConverter :commands="commands" :bind_keys="bind_keys" :bind_values="bind_values" />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
.big-text {
  margin-top: 50px;
}
.link {
  cursor: pointer;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
