
// this file is generated — do not edit it


/// <reference types="@sveltejs/kit" />

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module only includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/private';
 * 
 * console.log(ENVIRONMENT); // => "production"
 * console.log(PUBLIC_BASE_URL); // => throws error during build
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/private' {
	export const SHELL: string;
	export const npm_command: string;
	export const GUM_WRITE_CURSOR_BACKGROUND: string;
	export const GHOSTTY_BIN_DIR: string;
	export const GUM_FILTER_HEADER_FOREGROUND: string;
	export const COLORTERM: string;
	export const PI_CODING_AGENT: string;
	export const HYPRLAND_CMD: string;
	export const XDG_CONFIG_DIRS: string;
	export const GUM_FILE_FILE_SIZE_FOREGROUND: string;
	export const XDG_SESSION_PATH: string;
	export const XDG_MENU_PREFIX: string;
	export const TERM_PROGRAM_VERSION: string;
	export const GUM_SPIN_SPINNER_BACKGROUND: string;
	export const GUM_CONFIRM_PROMPT_FOREGROUND: string;
	export const BACKGROUND: string;
	export const XDG_BACKEND: string;
	export const GUM_FILE_FILE_BACKGROUND: string;
	export const TMUX: string;
	export const GUM_FILTER_SELECTED_PREFIX_FOREGROUND: string;
	export const npm_config_npm_globalconfig: string;
	export const GUM_FILTER_CURSOR_TEXT_FOREGROUND: string;
	export const GUM_LOG_VALUE_BACKGROUND: string;
	export const GUM_CHOOSE_ITEM_BACKGROUND: string;
	export const NODE: string;
	export const BORDER_BACKGROUND: string;
	export const INTELLI_EXEC_PROMPT: string;
	export const GUM_FILE_SELECTED_BACKGROUND: string;
	export const XDG_DATA_HOME: string;
	export const GUM_WRITE_PLACEHOLDER_FOREGROUND: string;
	export const npm_config_verify_deps_before_run: string;
	export const GUM_CONFIRM_SELECTED_BACKGROUND: string;
	export const GUM_LOG_TIME_FOREGROUND: string;
	export const INPUT_METHOD: string;
	export const GUM_FILTER_PROMPT_FOREGROUND: string;
	export const XCOMPOSEFILE: string;
	export const npm_config__jsr_registry: string;
	export const XDG_CONFIG_HOME: string;
	export const GUM_INPUT_PLACEHOLDER_FOREGROUND: string;
	export const OMARCHY_PATH: string;
	export const GUM_FILE_SYMLINK_BACKGROUND: string;
	export const GUM_PAGER_MATCH_HIGH_BACKGROUND: string;
	export const MEMORY_PRESSURE_WRITE: string;
	export const GUM_FILE_DIRECTORY_FOREGROUND: string;
	export const GUM_FILE_PERMISSIONS_BACKGROUND: string;
	export const XMODIFIERS: string;
	export const GUM_WRITE_LINE_NUMBER_BACKGROUND: string;
	export const BORDER_FOREGROUND: string;
	export const DESKTOP_SESSION: string;
	export const ELECTRON_OZONE_PLATFORM_HINT: string;
	export const HL_INITIAL_WORKSPACE_TOKEN: string;
	export const GUM_WRITE_CURSOR_LINE_FOREGROUND: string;
	export const XCURSOR_SIZE: string;
	export const npm_config_globalconfig: string;
	export const GUM_CHOOSE_SELECTED_FOREGROUND: string;
	export const EDITOR: string;
	export const GUM_LOG_KEY_FOREGROUND: string;
	export const GUM_LOG_PREFIX_FOREGROUND: string;
	export const GOBIN: string;
	export const INTELLI_HOME: string;
	export const XDG_SEAT: string;
	export const GUM_FILE_FILE_FOREGROUND: string;
	export const PWD: string;
	export const GUM_FILTER_MATCH_FOREGROUND: string;
	export const LOGNAME: string;
	export const XDG_SESSION_DESKTOP: string;
	export const GUM_SPIN_TITLE_FOREGROUND: string;
	export const XDG_SESSION_TYPE: string;
	export const GUM_WRITE_CURSOR_LINE_NUMBER_BACKGROUND: string;
	export const __FNOX_SESSION: string;
	export const GUM_FILE_CURSOR_FOREGROUND: string;
	export const GUM_INPUT_HEADER_FOREGROUND: string;
	export const GUM_FILE_SYMLINK_FOREGROUND: string;
	export const GUM_PAGER_MATCH_HIGH_FOREGROUND: string;
	export const GUM_FILTER_UNSELECTED_PREFIX_BACKGROUND: string;
	export const GUM_FILTER_SELECTED_BACKGROUND: string;
	export const SYSTEMD_EXEC_PID: string;
	export const GUM_FILTER_PLACEHOLDER_FOREGROUND: string;
	export const GUM_FILE_CURSOR_BACKGROUND: string;
	export const GUM_PAGER_LINE_NUMBER_FOREGROUND: string;
	export const TERMINAL: string;
	export const GUM_FILE_HEADER_BACKGROUND: string;
	export const QT_STYLE_OVERRIDE: string;
	export const MOTD_SHOWN: string;
	export const GHOSTTY_SHELL_FEATURES: string;
	export const HOME: string;
	export const GUM_WRITE_LINE_NUMBER_FOREGROUND: string;
	export const GUM_PAGER_MATCH_FOREGROUND: string;
	export const LANG: string;
	export const FNOX_SHELL: string;
	export const _JAVA_AWT_WM_NONREPARENTING: string;
	export const XDG_CURRENT_DESKTOP: string;
	export const GUM_TABLE_HEADER_FOREGROUND: string;
	export const npm_package_version: string;
	export const GUM_INPUT_CURSOR_FOREGROUND: string;
	export const GUM_CHOOSE_HEADER_FOREGROUND: string;
	export const GUM_PAGER_BACKGROUND: string;
	export const GUM_FILTER_CURSOR_TEXT_BACKGROUND: string;
	export const MEMORY_PRESSURE_WATCH: string;
	export const STARSHIP_SHELL: string;
	export const WAYLAND_DISPLAY: string;
	export const GUM_FILTER_HEADER_BACKGROUND: string;
	export const __MISE_DIFF: string;
	export const GUM_PAGER_HELP_BACKGROUND: string;
	export const GUM_INPUT_HEADER_BACKGROUND: string;
	export const GUM_WRITE_CURSOR_LINE_NUMBER_FOREGROUND: string;
	export const GUM_TABLE_CELL_BACKGROUND: string;
	export const MANROFFOPT: string;
	export const GUM_CHOOSE_HEADER_BACKGROUND: string;
	export const XDG_SEAT_PATH: string;
	export const GUM_PAGER_FOREGROUND: string;
	export const GUM_INPUT_CURSOR_BACKGROUND: string;
	export const pnpm_config_verify_deps_before_run: string;
	export const GUM_PAGER_LINE_NUMBER_BACKGROUND: string;
	export const MANAGERPID: string;
	export const GOROOT: string;
	export const BAT_THEME: string;
	export const GUM_LOG_MESSAGE_BACKGROUND: string;
	export const GUM_CHOOSE_SELECTED_BACKGROUND: string;
	export const INIT_CWD: string;
	export const GUM_LOG_TIME_BACKGROUND: string;
	export const STARSHIP_SESSION_KEY: string;
	export const QT_QPA_PLATFORM: string;
	export const UWSM_WAIT_VARNAMES: string;
	export const __MISE_ORIG_PATH: string;
	export const XDG_CACHE_HOME: string;
	export const npm_lifecycle_script: string;
	export const GUM_FILTER_INDICATOR_FOREGROUND: string;
	export const GUM_WRITE_BASE_BACKGROUND: string;
	export const SDL_IM_MODULE: string;
	export const GHOSTTY_RESOURCES_DIR: string;
	export const GUM_LOG_LEVEL_FOREGROUND: string;
	export const GUM_WRITE_HEADER_FOREGROUND: string;
	export const GUM_CHOOSE_ITEM_FOREGROUND: string;
	export const XDG_SESSION_CLASS: string;
	export const GUM_SPIN_TITLE_BACKGROUND: string;
	export const GUM_FILTER_PLACEHOLDER_BACKGROUND: string;
	export const TERM: string;
	export const TERMINFO: string;
	export const npm_package_name: string;
	export const GUM_INPUT_PLACEHOLDER_BACKGROUND: string;
	export const GUM_WRITE_PROMPT_BACKGROUND: string;
	export const USER: string;
	export const npm_config_frozen_lockfile: string;
	export const TMUX_PANE: string;
	export const SUDO_EDITOR: string;
	export const OP_SESSION_RREMXBS5UJARLJHGQNK4WZBHEY: string;
	export const GUM_FILTER_MATCH_BACKGROUND: string;
	export const OZONE_PLATFORM: string;
	export const GUM_INPUT_PROMPT_FOREGROUND: string;
	export const GUM_FILTER_PROMPT_BACKGROUND: string;
	export const GUM_CHOOSE_CURSOR_FOREGROUND: string;
	export const GUM_PAGER_MATCH_BACKGROUND: string;
	export const __MISE_SESSION: string;
	export const HYPRLAND_INSTANCE_SIGNATURE: string;
	export const GUM_LOG_KEY_BACKGROUND: string;
	export const MANPAGER: string;
	export const FOREGROUND: string;
	export const GUM_FILTER_SELECTED_PREFIX_BACKGROUND: string;
	export const GUM_FILE_DIRECTORY_BACKGROUND: string;
	export const DISPLAY: string;
	export const npm_lifecycle_event: string;
	export const GUM_WRITE_PROMPT_FOREGROUND: string;
	export const SHLVL: string;
	export const GUM_PAGER_HELP_FOREGROUND: string;
	export const MOZ_ENABLE_WAYLAND: string;
	export const GUM_CHOOSE_CURSOR_BACKGROUND: string;
	export const QT_IM_MODULE: string;
	export const XDG_VTNR: string;
	export const GUM_INPUT_PROMPT_BACKGROUND: string;
	export const GUM_TABLE_SELECTED_FOREGROUND: string;
	export const XDG_SESSION_ID: string;
	export const MANAGERPIDFDID: string;
	export const GUM_FILTER_TEXT_FOREGROUND: string;
	export const npm_config_user_agent: string;
	export const PNPM_SCRIPT_SRC_DIR: string;
	export const XDG_STATE_HOME: string;
	export const npm_execpath: string;
	export const XDG_RUNTIME_DIR: string;
	export const GUM_WRITE_CURSOR_FOREGROUND: string;
	export const GUM_TABLE_HEADER_BACKGROUND: string;
	export const NODE_PATH: string;
	export const DEBUGINFOD_URLS: string;
	export const GUM_FILE_FILE_SIZE_BACKGROUND: string;
	export const npm_package_json: string;
	export const GUM_LOG_VALUE_FOREGROUND: string;
	export const GUM_TABLE_CELL_FOREGROUND: string;
	export const GUM_LOG_SEPARATOR_FOREGROUND: string;
	export const GUM_FILTER_INDICATOR_BACKGROUND: string;
	export const GUM_LOG_LEVEL_BACKGROUND: string;
	export const GUM_WRITE_HEADER_BACKGROUND: string;
	export const GUM_WRITE_BASE_FOREGROUND: string;
	export const GUM_FILTER_SELECTED_FOREGROUND: string;
	export const MISE_SHELL: string;
	export const XDG_DATA_DIRS: string;
	export const GUM_CONFIRM_PROMPT_BACKGROUND: string;
	export const GDK_BACKEND: string;
	export const GUM_WRITE_END_OF_BUFFER_FOREGROUND: string;
	export const GUM_WRITE_END_OF_BUFFER_BACKGROUND: string;
	export const PATH: string;
	export const GUM_SPIN_SPINNER_FOREGROUND: string;
	export const GDK_SCALE: string;
	export const npm_config_node_gyp: string;
	export const GUM_TABLE_SELECTED_BACKGROUND: string;
	export const GUM_FILTER_UNSELECTED_PREFIX_FOREGROUND: string;
	export const GUM_FILE_PERMISSIONS_FOREGROUND: string;
	export const GUM_FILE_HEADER_FOREGROUND: string;
	export const GUM_WRITE_CURSOR_LINE_BACKGROUND: string;
	export const DBUS_SESSION_BUS_ADDRESS: string;
	export const GUM_FILTER_TEXT_BACKGROUND: string;
	export const MAIL: string;
	export const npm_config_registry: string;
	export const GUM_CONFIRM_UNSELECTED_FOREGROUND: string;
	export const GUM_TABLE_BORDER_FOREGROUND: string;
	export const UWSM_FINALIZE_VARNAMES: string;
	export const GUM_WRITE_PLACEHOLDER_BACKGROUND: string;
	export const GUM_CONFIRM_UNSELECTED_BACKGROUND: string;
	export const GUM_TABLE_BORDER_BACKGROUND: string;
	export const GUM_LOG_MESSAGE_FOREGROUND: string;
	export const GUM_LOG_PREFIX_BACKGROUND: string;
	export const GUM_FILE_SELECTED_FOREGROUND: string;
	export const npm_node_execpath: string;
	export const GUM_LOG_SEPARATOR_BACKGROUND: string;
	export const OLDPWD: string;
	export const GUM_CONFIRM_SELECTED_FOREGROUND: string;
	export const HYPRCURSOR_SIZE: string;
	export const TERM_PROGRAM: string;
}

/**
 * This module provides access to environment variables that are injected _statically_ into your bundle at build time and are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Static environment variables are [loaded by Vite](https://vitejs.dev/guide/env-and-mode.html#env-files) from `.env` files and `process.env` at build time and then statically injected into your bundle at build time, enabling optimisations like dead code elimination.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * For example, given the following build time environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { ENVIRONMENT, PUBLIC_BASE_URL } from '$env/static/public';
 * 
 * console.log(ENVIRONMENT); // => throws error during build
 * console.log(PUBLIC_BASE_URL); // => "http://site.com"
 * ```
 * 
 * The above values will be the same _even if_ different values for `ENVIRONMENT` or `PUBLIC_BASE_URL` are set at runtime, as they are statically replaced in your code with their build time values.
 */
declare module '$env/static/public' {
	
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are limited to _private_ access.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Private_ access:**
 * 
 * - This module cannot be imported into client-side code
 * - This module includes variables that _do not_ begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) _and do_ start with [`config.kit.env.privatePrefix`](https://svelte.dev/docs/kit/configuration#env) (if configured)
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://site.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/private';
 * 
 * console.log(env.ENVIRONMENT); // => "production"
 * console.log(env.PUBLIC_BASE_URL); // => undefined
 * ```
 */
declare module '$env/dynamic/private' {
	export const env: {
		SHELL: string;
		npm_command: string;
		GUM_WRITE_CURSOR_BACKGROUND: string;
		GHOSTTY_BIN_DIR: string;
		GUM_FILTER_HEADER_FOREGROUND: string;
		COLORTERM: string;
		PI_CODING_AGENT: string;
		HYPRLAND_CMD: string;
		XDG_CONFIG_DIRS: string;
		GUM_FILE_FILE_SIZE_FOREGROUND: string;
		XDG_SESSION_PATH: string;
		XDG_MENU_PREFIX: string;
		TERM_PROGRAM_VERSION: string;
		GUM_SPIN_SPINNER_BACKGROUND: string;
		GUM_CONFIRM_PROMPT_FOREGROUND: string;
		BACKGROUND: string;
		XDG_BACKEND: string;
		GUM_FILE_FILE_BACKGROUND: string;
		TMUX: string;
		GUM_FILTER_SELECTED_PREFIX_FOREGROUND: string;
		npm_config_npm_globalconfig: string;
		GUM_FILTER_CURSOR_TEXT_FOREGROUND: string;
		GUM_LOG_VALUE_BACKGROUND: string;
		GUM_CHOOSE_ITEM_BACKGROUND: string;
		NODE: string;
		BORDER_BACKGROUND: string;
		INTELLI_EXEC_PROMPT: string;
		GUM_FILE_SELECTED_BACKGROUND: string;
		XDG_DATA_HOME: string;
		GUM_WRITE_PLACEHOLDER_FOREGROUND: string;
		npm_config_verify_deps_before_run: string;
		GUM_CONFIRM_SELECTED_BACKGROUND: string;
		GUM_LOG_TIME_FOREGROUND: string;
		INPUT_METHOD: string;
		GUM_FILTER_PROMPT_FOREGROUND: string;
		XCOMPOSEFILE: string;
		npm_config__jsr_registry: string;
		XDG_CONFIG_HOME: string;
		GUM_INPUT_PLACEHOLDER_FOREGROUND: string;
		OMARCHY_PATH: string;
		GUM_FILE_SYMLINK_BACKGROUND: string;
		GUM_PAGER_MATCH_HIGH_BACKGROUND: string;
		MEMORY_PRESSURE_WRITE: string;
		GUM_FILE_DIRECTORY_FOREGROUND: string;
		GUM_FILE_PERMISSIONS_BACKGROUND: string;
		XMODIFIERS: string;
		GUM_WRITE_LINE_NUMBER_BACKGROUND: string;
		BORDER_FOREGROUND: string;
		DESKTOP_SESSION: string;
		ELECTRON_OZONE_PLATFORM_HINT: string;
		HL_INITIAL_WORKSPACE_TOKEN: string;
		GUM_WRITE_CURSOR_LINE_FOREGROUND: string;
		XCURSOR_SIZE: string;
		npm_config_globalconfig: string;
		GUM_CHOOSE_SELECTED_FOREGROUND: string;
		EDITOR: string;
		GUM_LOG_KEY_FOREGROUND: string;
		GUM_LOG_PREFIX_FOREGROUND: string;
		GOBIN: string;
		INTELLI_HOME: string;
		XDG_SEAT: string;
		GUM_FILE_FILE_FOREGROUND: string;
		PWD: string;
		GUM_FILTER_MATCH_FOREGROUND: string;
		LOGNAME: string;
		XDG_SESSION_DESKTOP: string;
		GUM_SPIN_TITLE_FOREGROUND: string;
		XDG_SESSION_TYPE: string;
		GUM_WRITE_CURSOR_LINE_NUMBER_BACKGROUND: string;
		__FNOX_SESSION: string;
		GUM_FILE_CURSOR_FOREGROUND: string;
		GUM_INPUT_HEADER_FOREGROUND: string;
		GUM_FILE_SYMLINK_FOREGROUND: string;
		GUM_PAGER_MATCH_HIGH_FOREGROUND: string;
		GUM_FILTER_UNSELECTED_PREFIX_BACKGROUND: string;
		GUM_FILTER_SELECTED_BACKGROUND: string;
		SYSTEMD_EXEC_PID: string;
		GUM_FILTER_PLACEHOLDER_FOREGROUND: string;
		GUM_FILE_CURSOR_BACKGROUND: string;
		GUM_PAGER_LINE_NUMBER_FOREGROUND: string;
		TERMINAL: string;
		GUM_FILE_HEADER_BACKGROUND: string;
		QT_STYLE_OVERRIDE: string;
		MOTD_SHOWN: string;
		GHOSTTY_SHELL_FEATURES: string;
		HOME: string;
		GUM_WRITE_LINE_NUMBER_FOREGROUND: string;
		GUM_PAGER_MATCH_FOREGROUND: string;
		LANG: string;
		FNOX_SHELL: string;
		_JAVA_AWT_WM_NONREPARENTING: string;
		XDG_CURRENT_DESKTOP: string;
		GUM_TABLE_HEADER_FOREGROUND: string;
		npm_package_version: string;
		GUM_INPUT_CURSOR_FOREGROUND: string;
		GUM_CHOOSE_HEADER_FOREGROUND: string;
		GUM_PAGER_BACKGROUND: string;
		GUM_FILTER_CURSOR_TEXT_BACKGROUND: string;
		MEMORY_PRESSURE_WATCH: string;
		STARSHIP_SHELL: string;
		WAYLAND_DISPLAY: string;
		GUM_FILTER_HEADER_BACKGROUND: string;
		__MISE_DIFF: string;
		GUM_PAGER_HELP_BACKGROUND: string;
		GUM_INPUT_HEADER_BACKGROUND: string;
		GUM_WRITE_CURSOR_LINE_NUMBER_FOREGROUND: string;
		GUM_TABLE_CELL_BACKGROUND: string;
		MANROFFOPT: string;
		GUM_CHOOSE_HEADER_BACKGROUND: string;
		XDG_SEAT_PATH: string;
		GUM_PAGER_FOREGROUND: string;
		GUM_INPUT_CURSOR_BACKGROUND: string;
		pnpm_config_verify_deps_before_run: string;
		GUM_PAGER_LINE_NUMBER_BACKGROUND: string;
		MANAGERPID: string;
		GOROOT: string;
		BAT_THEME: string;
		GUM_LOG_MESSAGE_BACKGROUND: string;
		GUM_CHOOSE_SELECTED_BACKGROUND: string;
		INIT_CWD: string;
		GUM_LOG_TIME_BACKGROUND: string;
		STARSHIP_SESSION_KEY: string;
		QT_QPA_PLATFORM: string;
		UWSM_WAIT_VARNAMES: string;
		__MISE_ORIG_PATH: string;
		XDG_CACHE_HOME: string;
		npm_lifecycle_script: string;
		GUM_FILTER_INDICATOR_FOREGROUND: string;
		GUM_WRITE_BASE_BACKGROUND: string;
		SDL_IM_MODULE: string;
		GHOSTTY_RESOURCES_DIR: string;
		GUM_LOG_LEVEL_FOREGROUND: string;
		GUM_WRITE_HEADER_FOREGROUND: string;
		GUM_CHOOSE_ITEM_FOREGROUND: string;
		XDG_SESSION_CLASS: string;
		GUM_SPIN_TITLE_BACKGROUND: string;
		GUM_FILTER_PLACEHOLDER_BACKGROUND: string;
		TERM: string;
		TERMINFO: string;
		npm_package_name: string;
		GUM_INPUT_PLACEHOLDER_BACKGROUND: string;
		GUM_WRITE_PROMPT_BACKGROUND: string;
		USER: string;
		npm_config_frozen_lockfile: string;
		TMUX_PANE: string;
		SUDO_EDITOR: string;
		OP_SESSION_RREMXBS5UJARLJHGQNK4WZBHEY: string;
		GUM_FILTER_MATCH_BACKGROUND: string;
		OZONE_PLATFORM: string;
		GUM_INPUT_PROMPT_FOREGROUND: string;
		GUM_FILTER_PROMPT_BACKGROUND: string;
		GUM_CHOOSE_CURSOR_FOREGROUND: string;
		GUM_PAGER_MATCH_BACKGROUND: string;
		__MISE_SESSION: string;
		HYPRLAND_INSTANCE_SIGNATURE: string;
		GUM_LOG_KEY_BACKGROUND: string;
		MANPAGER: string;
		FOREGROUND: string;
		GUM_FILTER_SELECTED_PREFIX_BACKGROUND: string;
		GUM_FILE_DIRECTORY_BACKGROUND: string;
		DISPLAY: string;
		npm_lifecycle_event: string;
		GUM_WRITE_PROMPT_FOREGROUND: string;
		SHLVL: string;
		GUM_PAGER_HELP_FOREGROUND: string;
		MOZ_ENABLE_WAYLAND: string;
		GUM_CHOOSE_CURSOR_BACKGROUND: string;
		QT_IM_MODULE: string;
		XDG_VTNR: string;
		GUM_INPUT_PROMPT_BACKGROUND: string;
		GUM_TABLE_SELECTED_FOREGROUND: string;
		XDG_SESSION_ID: string;
		MANAGERPIDFDID: string;
		GUM_FILTER_TEXT_FOREGROUND: string;
		npm_config_user_agent: string;
		PNPM_SCRIPT_SRC_DIR: string;
		XDG_STATE_HOME: string;
		npm_execpath: string;
		XDG_RUNTIME_DIR: string;
		GUM_WRITE_CURSOR_FOREGROUND: string;
		GUM_TABLE_HEADER_BACKGROUND: string;
		NODE_PATH: string;
		DEBUGINFOD_URLS: string;
		GUM_FILE_FILE_SIZE_BACKGROUND: string;
		npm_package_json: string;
		GUM_LOG_VALUE_FOREGROUND: string;
		GUM_TABLE_CELL_FOREGROUND: string;
		GUM_LOG_SEPARATOR_FOREGROUND: string;
		GUM_FILTER_INDICATOR_BACKGROUND: string;
		GUM_LOG_LEVEL_BACKGROUND: string;
		GUM_WRITE_HEADER_BACKGROUND: string;
		GUM_WRITE_BASE_FOREGROUND: string;
		GUM_FILTER_SELECTED_FOREGROUND: string;
		MISE_SHELL: string;
		XDG_DATA_DIRS: string;
		GUM_CONFIRM_PROMPT_BACKGROUND: string;
		GDK_BACKEND: string;
		GUM_WRITE_END_OF_BUFFER_FOREGROUND: string;
		GUM_WRITE_END_OF_BUFFER_BACKGROUND: string;
		PATH: string;
		GUM_SPIN_SPINNER_FOREGROUND: string;
		GDK_SCALE: string;
		npm_config_node_gyp: string;
		GUM_TABLE_SELECTED_BACKGROUND: string;
		GUM_FILTER_UNSELECTED_PREFIX_FOREGROUND: string;
		GUM_FILE_PERMISSIONS_FOREGROUND: string;
		GUM_FILE_HEADER_FOREGROUND: string;
		GUM_WRITE_CURSOR_LINE_BACKGROUND: string;
		DBUS_SESSION_BUS_ADDRESS: string;
		GUM_FILTER_TEXT_BACKGROUND: string;
		MAIL: string;
		npm_config_registry: string;
		GUM_CONFIRM_UNSELECTED_FOREGROUND: string;
		GUM_TABLE_BORDER_FOREGROUND: string;
		UWSM_FINALIZE_VARNAMES: string;
		GUM_WRITE_PLACEHOLDER_BACKGROUND: string;
		GUM_CONFIRM_UNSELECTED_BACKGROUND: string;
		GUM_TABLE_BORDER_BACKGROUND: string;
		GUM_LOG_MESSAGE_FOREGROUND: string;
		GUM_LOG_PREFIX_BACKGROUND: string;
		GUM_FILE_SELECTED_FOREGROUND: string;
		npm_node_execpath: string;
		GUM_LOG_SEPARATOR_BACKGROUND: string;
		OLDPWD: string;
		GUM_CONFIRM_SELECTED_FOREGROUND: string;
		HYPRCURSOR_SIZE: string;
		TERM_PROGRAM: string;
		[key: `PUBLIC_${string}`]: undefined;
		[key: `${string}`]: string | undefined;
	}
}

/**
 * This module provides access to environment variables set _dynamically_ at runtime and that are _publicly_ accessible.
 * 
 * |         | Runtime                                                                    | Build time                                                               |
 * | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
 * | Private | [`$env/dynamic/private`](https://svelte.dev/docs/kit/$env-dynamic-private) | [`$env/static/private`](https://svelte.dev/docs/kit/$env-static-private) |
 * | Public  | [`$env/dynamic/public`](https://svelte.dev/docs/kit/$env-dynamic-public)   | [`$env/static/public`](https://svelte.dev/docs/kit/$env-static-public)   |
 * 
 * Dynamic environment variables are defined by the platform you're running on. For example if you're using [`adapter-node`](https://github.com/sveltejs/kit/tree/main/packages/adapter-node) (or running [`vite preview`](https://svelte.dev/docs/kit/cli)), this is equivalent to `process.env`.
 * 
 * **_Public_ access:**
 * 
 * - This module _can_ be imported into client-side code
 * - **Only** variables that begin with [`config.kit.env.publicPrefix`](https://svelte.dev/docs/kit/configuration#env) (which defaults to `PUBLIC_`) are included
 * 
 * > [!NOTE] In `dev`, `$env/dynamic` includes environment variables from `.env`. In `prod`, this behavior will depend on your adapter.
 * 
 * > [!NOTE] To get correct types, environment variables referenced in your code should be declared (for example in an `.env` file), even if they don't have a value until the app is deployed:
 * >
 * > ```env
 * > MY_FEATURE_FLAG=
 * > ```
 * >
 * > You can override `.env` values from the command line like so:
 * >
 * > ```sh
 * > MY_FEATURE_FLAG="enabled" npm run dev
 * > ```
 * 
 * For example, given the following runtime environment:
 * 
 * ```env
 * ENVIRONMENT=production
 * PUBLIC_BASE_URL=http://example.com
 * ```
 * 
 * With the default `publicPrefix` and `privatePrefix`:
 * 
 * ```ts
 * import { env } from '$env/dynamic/public';
 * console.log(env.ENVIRONMENT); // => undefined, not public
 * console.log(env.PUBLIC_BASE_URL); // => "http://example.com"
 * ```
 * 
 * ```
 * 
 * ```
 */
declare module '$env/dynamic/public' {
	export const env: {
		[key: `PUBLIC_${string}`]: string | undefined;
	}
}
