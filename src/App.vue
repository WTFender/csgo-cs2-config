<script setup>
import BigText from './components/BigText.vue'
import ConfigConverter from './components/ConfigConverter.vue'

// old: the csgo command to replace
// new: the cs2 command to replace with
// default: the default value for the cs2 command, if the
//          value type has changed, the default will be set

const commands = [
  // migrated
  { old: 'voice_enable', new: 'sv_voiceenable', default: 'true' },
  { old: 'cl_netgraph', new: 'cq_netgraph'},
  // new commands & binds
  { old: null, new: 'bind "mouse_x"', default: 'yaw'},
  { old: null, new: 'bind "mouse_y"', default: 'pitch' },
  // old & unsupported commands (throw errors in console)
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
  { old: 'cl_buy_favorite_nowarn', new: null },
  { old: 'cl_buy_favorite_quiet', new: null },
  { old: 'cl_chatfilter_version', new: null },
  { old: 'cl_clock_24hour', new: null },
  { old: 'cl_cmdrate', new: null },
  { old: 'cl_crosshairscale', new: null },
  { old: 'cl_debugrumble', new: null },
  { old: 'cl_detail_avoid_force', new: null },
  { old: 'cl_detail_avoid_radius', new: null },
  { old: 'cl_detail_avoid_recover_speed', new: null },
  { old: 'cl_detail_max_sway', new: null },
  { old: 'cl_disablefreezecam', new: null },
  { old: 'cl_disablehtmlmotd', new: null },
  { old: 'cl_downloadfilter', new: null },
  { old: 'cl_error_message_check_xboxdvr', new: null },
  { old: 'cl_forcepreload', new: null },
  { old: 'cl_freezecampanel_position_dynamic', new: null },
  { old: 'cl_hud_background_alpha', new: null },
  { old: 'cl_hud_bomb_under_radar', new: null },
  { old: 'cl_hud_healthammo_style', new: null },
  { old: 'cl_hud_playercount_pos', new: null },
  { old: 'cl_hud_playercount_showcount', new: null },
  { old: 'cl_idealpitchscale', new: null },
  { old: 'cl_interp_ratio', new: null },
  { old: 'cl_interp', new: null },
  { old: 'cl_inv_showdividerline', new: null },
  { old: 'cl_inventory_saved_filter', new: null },
  { old: 'cl_inventory_saved_sort', new: null },
  { old: 'cl_loadout_colorweaponnames', new: null },
  { old: 'cl_minimal_rtt_shadows', new: null },
  { old: 'cl_observercrosshair', new: null },
  { old: 'cl_operation_premium_reminder_op0', new: null },
  { old: 'cl_operation_premium_reminder_op06', new: null },
  { old: 'cl_righthand', new: null },
  { old: 'cl_rumblescale', new: null },
  { old: 'cl_scalecrosshair', new: null },
  { old: 'cl_showhelp', new: null },
  { old: 'cl_showpluginmessages', new: null },
  { old: 'cl_spec_follow_grenade_key', new: null },
  { old: 'cl_spec_mode', new: null },
  { old: 'cl_teamid_overhead_name_alpha', new: null },
  { old: 'cl_teamid_overhead_name_fadetime', new: null },
  { old: 'cl_thirdperson', new: null },
  { old: 'cl_updaterate', new: null },
  { old: 'cl_viewmodel_shift_left_amt', new: null },
  { old: 'cl_viewmodel_shift_right_amt', new: null },
  { old: 'closeonbuy', new: null },
  { old: 'commentary_firstrun', new: null },
  { old: 'cursortimeout', new: null },
  { old: 'dsp_enhance_stereo', new: null },
  { old: 'econ_highest_baseitem_seen', new: null },
  { old: 'force_audio_english', new: null },
  { old: 'g15_update_msec', new: null },
  { old: 'hud_takesshots', new: null },
  { old: 'joy_accelmax', new: null },
  { old: 'joy_accelscale', new: null },
  { old: 'joy_accelscalepoly', new: null },
  { old: 'joy_autoaimdampen', new: null },
  { old: 'joy_autoAimDampenMethod', new: null },
  { old: 'joy_autoaimdampenrange', new: null },
  { old: 'joy_cfg_preset', new: null },
  { old: 'joy_circle_correct', new: null },
  { old: 'joy_curvepoint_1', new: null },
  { old: 'joy_curvepoint_2', new: null },
  { old: 'joy_curvepoint_3', new: null },
  { old: 'joy_curvepoint_4', new: null },
  { old: 'joy_curvepoint_end', new: null },
  { old: 'joy_diagonalpov', new: null },
  { old: 'joy_forwardsensitivity', new: null },
  { old: 'joy_forwardthreshold', new: null },
  { old: 'joy_gamma', new: null },
  { old: 'joy_inverty', new: null },
  { old: 'joy_lowend_linear', new: null },
  { old: 'joy_lowend', new: null },
  { old: 'joy_lowmap', new: null },
  { old: 'joy_no_accel_jump', new: null },
  { old: 'joy_pitchthreshold', new: null },
  { old: 'joy_response_look_pitch', new: null },
  { old: 'joy_sensitive_step0', new: null },
  { old: 'joy_sensitive_step1', new: null },
  { old: 'joy_sensitive_step2', new: null },
  { old: 'joy_sidethreshold', new: null },
  { old: 'joy_yawthreshold', new: null },
  { old: 'joystick_force_disabled_set_from_options', new: null },
  { old: 'joystick_force_disabled', new: null },
  { old: 'lobby_default_privacy_bits1', new: null },
  { old: 'lobby_voice_chat_enabled', new: null },
  { old: 'lookspring', new: null },
  { old: 'lookstrafe', new: null },
  { old: 'm_customaccel_exponent', new: null },
  { old: 'm_customaccel_max', new: null },
  { old: 'm_customaccel_scale', new: null },
  { old: 'm_customaccel', new: null },
  { old: 'm_forward', new: null },
  { old: 'm_mouseaccel1', new: null },
  { old: 'm_mouseaccel2', new: null },
  { old: 'm_mousespeed', new: null },
  { old: 'm_rawinput', new: null },
  { old: 'm_side', new: null },
  { old: 'mat_monitorgamma_tv_enabled', new: null },
  { old: 'mat_monitorgamma', new: null },
  { old: 'mat_powersavingsmode', new: null },
  { old: 'mat_queue_report', new: null },
  { old: 'mat_spewalloc', new: null },
  { old: 'mat_texture_list_content_path', new: null },
  { old: 'mc_accel_band_size', new: null },
  { old: 'mc_dead_zone_radius', new: null },
  { old: 'mc_max_pitchrate', new: null },
  { old: 'mc_max_yawrate', new: null },
  { old: 'muzzleflash_light', new: null },
  { old: 'net_graph', new: null },
  { old: 'net_graphheight', new: null },
  { old: 'net_graphholdsvframerate', new: null },
  { old: 'net_graphmsecs', new: null },
  { old: 'net_graphpos', new: null },
  { old: 'net_graphproportionalfont', new: null },
  { old: 'net_graphshowinterp', new: null },
  { old: 'net_graphshowlatency', new: null },
  { old: 'net_graphshowsvframerate', new: null },
  { old: 'net_graphsolid', new: null },
  { old: 'net_graphtext', new: null },
  { old: 'net_scale', new: null },
  { old: 'net_steamcnx_allowrelay', new: null },
  { old: 'npc_height_adjust', new: null },
  { old: 'play_distance', new: null },
  { old: 'player_competitive_maplist_8_6_0_DFED41DC', new: null },
  { old: 'player_gamemodelast_m', new: null },
  { old: 'player_gamemodelast_s', new: null },
  { old: 'player_gametypelast_m', new: null },
  { old: 'player_gametypelast_s', new: null },
  { old: 'player_last_leaderboards_filter', new: null },
  { old: 'player_last_leaderboards_mode', new: null },
  { old: 'player_last_leaderboards_panel', new: null },
  { old: 'player_last_medalstats_category', new: null },
  { old: 'player_last_medalstats_panel', new: null },
  { old: 'player_maplast_m', new: null },
  { old: 'player_maplast_s', new: null },
  { old: 'player_medalstats_most_recent_time', new: null },
  { old: 'r_drawmodelstatsoverlaymax', new: null },
  { old: 'r_drawmodelstatsoverlaymin', new: null },
  { old: 'r_eyegloss', new: null },
  { old: 'r_eyemove', new: null },
  { old: 'r_eyeshift_x', new: null },
  { old: 'r_eyeshift_y', new: null },
  { old: 'r_eyeshift_z', new: null },
  { old: 'r_eyesize', new: null },
  { old: 'sc_enable', new: null },
  { old: 'sc_joystick_map', new: null },
  { old: 'sc_pitch_sensitivity', new: null },
  { old: 'sc_yaw_sensitivity', new: null },
  { old: 'scene_showfaceto', new: null },
  { old: 'scene_showlook', new: null },
  { old: 'scene_showmovet', new: null },
  { old: 'scene_showmoveto', new: null },
  { old: 'scene_showunlock', new: null },
  { old: 'sf_ui_tint', new: null },
  { old: 'skill', new: null },
  { old: 'snd_ducking_off', new: null },
  { old: 'snd_legacy_surround', new: null },
  { old: 'snd_musicvolume_multiplier_inoverlay', new: null },
  { old: 'snd_pitchquality', new: null },
  { old: 'snd_use_hrtf', new: null },
  { old: 'ss_splitmode', new: null },
  { old: 'store_version', new: null },
  { old: 'suitvolume', new: null },
  { old: 'sv_forcepreload', new: null },
  { old: 'sv_pvsskipanimation', new: null },
  { old: 'sys_antialiasing', new: null },
  { old: 'sys_aspectratio', new: null },
  { old: 'sys_refldetail', new: null },
  { old: 'texture_budget_background_alpha', new: null },
  { old: 'texture_budget_panel_bottom_of_history_fraction', new: null },
  { old: 'texture_budget_panel_height', new: null },
  { old: 'texture_budget_panel_width', new: null },
  { old: 'texture_budget_panel_x', new: null },
  { old: 'texture_budget_panel_y', new: null },
  { old: 'tr_best_course_time', new: null },
  { old: 'tr_completed_training', new: null },
  { old: 'vgui_message_dialog_modal', new: null },
  { old: 'voice_caster_enable', new: null },
  { old: 'voice_caster_scale', new: null },
  { old: 'voice_forcemicrecord', new: null },
  { old: 'voice_mixer_boost', new: null },
  { old: 'voice_mixer_mut', new: null },
  { old: 'voice_mixer_mute', new: null },
  { old: 'voice_mixer_volume', new: null },
  { old: 'voice_system_enable', new: null },
  { old: 'vprof_graphheight', new: null },
  { old: 'vprof_graphwidth', new: null },
  { old: 'vprof_unaccounted_limit', new: null },
  { old: 'vprof_verbose', new: null },
  { old: 'vprof_warningmsec', new: null },
  { old: 'weapon_accuracy_logging', new: null },
  { old: 'windows_speaker_config', new: null },
  { old: 'xbox_autothrottle', new: null },
  { old: 'xbox_throttlebias', new: null },
  { old: 'xbox_throttlespoof', new: null },
  { old: 'zoom_sensitivity_ratio_joystick', new: null },
  { old: 'zoom_sensitivity_ratio_mouse', new: null },
]

const bind_keys = [
  { old: 'kp_slash', new: 'KP_DIVIDE' },
  { old: 'kp_ins', new: 'KP_0' },
  { old: 'kp_end', new: 'KP_1' },
  { old: 'kp_downarrow', new: 'KP_2' },
  { old: 'kp_pgdn', new: 'KP_3' },
  { old: 'kp_leftarrow', new: 'KP_4' },
  // kp_5 is the same
  { old: 'kp_rightarrow', new: 'KP_6' },
  { old: 'kp_home', new: 'KP_7' },
  { old: 'kp_uparrow', new: 'KP_8' },
  { old: 'kp_pgup', new: 'KP_9' },
  { old: 'u axis neg', new: null },
  { old: 'y axis neg', new: null },
  { old: 'z axis pos', new: null },
  { old: 'z axis neg', new: null },
]

const bind_values = [
  { old: 'radio3', new: 'radio' },
  { old: '+scorenet', new: '+showscores' },
  { old: '+moveleft', new: '+left' },
  { old: '+moveright', new: '+right' },
  { old: '+speed', new: '+sprint' },
  // weapon binds, not buy binds
  { old: 'weapon_hegrenade', new: 'slot6' },
  { old: 'weapon_flashbang', new: 'slot7' },
  { old: 'weapon_smokegrenade', new: 'slot8' },
  { old: 'weapon_decoy', new: 'slot9' },
  { old: 'weapon_molotov', new: 'slot10' },
  { old: 'weapon_incgrenade', new: 'slot10' },
  // old
  { old: 'jumpthrow', new: null }, // generic
]
</script>

<template>
  <header>
    <div class="wrapper">
      <BigText class="big-text" msg="CSGO Config Path"
        path="C:\Program Files (x86)\Steam\userdata\%UserId%\730\local\cfg" />
      <BigText class="big-text" msg="CS2 Config Path"
        path="C:\Program Files (x86)\Steam\steamapps\common\Counter-Strike Global Offensive\game\csgo\cfg" />
    </div>
  </header>

  <main>
    <ConfigConverter :commands="commands" :bind_keys="bind_keys" :bind_values="bind_values" />
  </main>
  <div style="float: right; padding-right: 25px;"><a href="https://github.com/WTFender/csgo-cs2-config/issues/new">🐛
      Missing Commands?</a></div><br>
  <div style="float: right; padding-right: 25px;"><a href="https://github.com/sponsors/WTFender">❤️ Donate</a></div>
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
  margin-bottom: 50px;
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
